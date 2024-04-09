import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  Image,
  DrawerContent,
  DrawerHeader,
  Text,
  DrawerOverlay,
  Grid,
  GridItem,
  IconButton,
  Textarea,
  Tooltip,
  useColorModeValue,
  useToast,
  Box,
  Flex,
  FormControl,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import ky, { HTTPError } from "ky";
import { AttachmentIcon } from "@chakra-ui/icons";
import SuccessDrawer from "./successDrawer";
import { mutate } from "swr";
import DatePicker from "@/pages/coachDatePicker";
import CustomTimePicker from "../CustomTimePicker";

type FormItems = {
  // eslint-disable-next-line
  message: any;
  id: string;
  Data?: {
    id?: string;
    message: string;
    scheduledDateTime: string;
    images: string;
    date: string;
    time: string;
  };
  onClose?: () => void;
};

const AnnouncementForm = ({ Data, onClose, id }: FormItems) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const[attachImage,setAttachImage] = useState(false)

  const [selectedTime, setSelectedTime] = useState("");

  const [isSuccessDrawerOpen, setIsSuccessDrawerOpen] = useState(false);

  const handleCloseSuccessDrawer = () => {
    setIsSuccessDrawerOpen(false);
    onClose?.();
  };

  const handleTimeChange = (time : string) => {
    const [hours, minutes] = time.split(':');
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);
    const formattedHours = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const formattedMinutes = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    setSelectedTime(formattedTime);
  };

  const handleCloseDrawer = () => {
    setIsEditModalOpen(false);
  };

  const toast = useToast();
  const [formData, setFormData] = useState({
    message: "",
    scheduledDateTime: null,
    images: [] as File[],
  });
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const [isImageAttached, setIsImageAttached] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    if ("files" in e.target && e.target.files) {
      setFormData({
        ...formData,
        images: Array.from(e.target.files),
      });
      setIsImageAttached(true); 
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (isImageAttached) {
      toast({
        description: "Image Attached Successfully",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      setIsImageAttached(false); 
    }
  }, [isImageAttached]);
  



  const [showErrorBorder, setShowErrorBorder] = useState(false);

  const handleSendClick = async () => {
    try {
      const data = new FormData();
     if (message.trim() !== "") {
        data.append("Message", message);
      } else {
        toast({
          description: "Message is required",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });

        setShowErrorBorder(true);


        setTimeout(() => {
          setShowErrorBorder(false);
        }, 3000);
      }

      if (formData.images.length === 0) {
        toast({
          description: "Please attach an image",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        setAttachImage(true)

        setTimeout(() => {
          setAttachImage(false);
        }, 3000);
        return;
      }

      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      }

      const response = await ky.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement/create Announcement`, {
        body: data,
      });

      if (response) {
        toast({
          description: "Successfully added",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        onClose?.();
        await mutate(`/api/announcement/getAnnouncement?announcementType=${""}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
  };

  const handleSchedule = async () => {
    try {
      const data = new FormData();
      data.append("Message", message);

      // if (formData.images) {
      //   formData.images.forEach((image) => {
      //     data.append(`Images`, image);
      //   });
      // }

      if (formData.images) {
        data.append("Images", formData.images[0]);
      }

      const scheduledDateTimes = selectedDate
      ? `${selectedDate.getFullYear()}-${
          String(selectedDate.getMonth() + 1).padStart(2, "0")
        }-${String(selectedDate.getDate()).padStart(2, "0")}`
      : "";
    
      const time = selectedTime;
      const [hours, minutes] = time.split(':');
      const utcTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00Z`;
     
      
      const utcDate = `${scheduledDateTimes.split('T')[0]}T${utcTime}`;

      data.append("ScheduledDateTime", utcDate);

      const response = await ky.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement/create Announcement`, {
        body: data,
      });

      if (response) {
        setIsSuccessDrawerOpen(true);
        await mutate(`/api/announcement/getAnnouncement?announcementType=${""}`);
      }
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        const errorResponse = await error.response.json();
        const messages = errorResponse.error.messages;
        toast({
          description: (
            <>
              {messages.map((message: string, index: number) => (
                <Text key={index}>{message}</Text>
              ))}
            </>
          ),
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleEdits = async () => {
    try {
      const data = new FormData();
      
      data.append("Message", message);

      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      }

      data.append("Id", id);

      const scheduledDateTimes = selectedDate
      ? `${selectedDate.getFullYear()}-${
          String(selectedDate.getMonth() + 1).padStart(2, "0")
        }-${String(selectedDate.getDate()).padStart(2, "0")}`
      : "";
    
      const time = selectedTime;
      const [hours, minutes] = time.split(':');
      const utcTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00Z`;
     
      
      const utcDate = `${scheduledDateTimes.split('T')[0]}T${utcTime}`;

      data.append("ScheduledDateTime", utcDate);

      const response = await ky.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement`, {
        body: data,
      });

      if (response) {
        setIsSuccessDrawerOpen(true);
        await mutate(`/api/announcement/getAnnouncement?announcementType=${""}`);
      }
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        const errorResponse = await error.response.json();
        const messages = errorResponse.error.messages;
        toast({
          description: (
            <>
              {messages.map((message: string, index: number) => (
                <Text key={index}>{message}</Text>
              ))}
            </>
          ),
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const { t } = useTranslation("announcement");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const bgColor = useColorModeValue("light.200", "dark.300");

  const handleFileAttach = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
     
  };


  
 

  return (
    <Formik
      initialValues={{
        message: Data?.message || "",
        scheduledDateTime: Data?.scheduledDateTime || "",
        image: Data?.images || "",
      }}
      onSubmit={handleSendClick}
    
    >
      {({ errors }) => (
        <Form noValidate>
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
            }}
            gap="8"
            mt={6}
            pt={7}
            pl={4}
            borderRadius={"20px"}
          >
            <GridItem rowSpan={1} colSpan={2}>
              <FormControl >
                <Flex>
                  {Data?.images && typeof Data.images === "string" ? (
                    <Image src={Data.images} alt="Attached Image" ml={1} w="150px" />
                  ) : (
                    Data?.images && Array.isArray(Data.images) && (
                      <>
                        {Data.images.map((imageUrl, index) => (
                          <Image key={index} src={imageUrl} alt={`Attached Image ${index}`} ml={1} w="150px" />
                        ))}
                      </>
                    )
                  )}
                </Flex>
                <Box position="relative">
                  <Textarea
                    h="174px"
                    placeholder="Type Message ..."
                    paddingLeft="40px"
                    bgColor={bgColor}
                    onChange={handleMessageChange}
                    value={message || Data?.message}
               
                    border={showErrorBorder ? "2px solid red" : undefined} 
                    name="message"
                  />
                  <input
                    type="file"
                    name={"Images"}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleChange}
                    accept="image/*"
                  />
                  <Tooltip label="Attach Image" placement="top">
                    <IconButton
                      icon={<AttachmentIcon />}
                      onClick={handleFileAttach}
                      position="absolute"
                      left="10px"
                      bg="transparent"
                      // color="gray.500"
                      color ={attachImage ? "red" : "gray500"}
                      _hover={{ color: "gray.700" }}
                      aria-label="Attach Image"
                    />
                  </Tooltip>
                  <Text mt={2} color="#E53E3E">{errors.message}</Text>
                </Box>
              </FormControl>
            </GridItem>
            {id ? (
              <>
                <GridItem rowSpan={1} colSpan={1}>
                  <Button
                    w="full"
                    bg="none"
                    variant={"outline"}
                    borderColor="rgba(78, 203, 113, 1)"
                    border="1px solid"
                    color="rgba(78, 203, 113, 1)"
                    h="80px"
                    onClick={handleEditModalOpen}
                  >
                    {t(`common:buttons.reSchedule`)}
                  </Button>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <Button
                    w="full"
                    bgColor="rgba(78, 203, 113, 1)"
                    color="#fff"
                    h="80px"
                    _hover={{
                      bg: "none",
                      color: "rgba(78, 203, 113, 1)",
                      border: "1px solid rgba(78, 203, 113, 1)",
                    }}
                  >
                    {t(`common:buttons.cancelSchedule`)}
                  </Button>
                </GridItem>
              </>
            ) : (
              <>
              <GridItem rowSpan={1} colSpan={1}>
  <Button
    w="full"
    bg="none"
    variant={"outline"}
    borderColor="rgba(78, 203, 113, 1)"
    border="1px solid"
    color="rgba(78, 203, 113, 1)"
    h="80px"
    onClick={() => {
      if (message.trim() === "" && formData.images.length === 0) {
        toast({
          description: "Message  are required to schedule",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        toast({
          description: "Please Attach Image to schedule",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        setShowErrorBorder(true);
     setAttachImage(true)
        
        setTimeout(() => {
          setShowErrorBorder(false);
          setAttachImage(false)
        }, 3000);
      } else if (message.trim() === "") {
        toast({
          description: "Message is required to schedule",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        setShowErrorBorder(true);
    
       
        setTimeout(() => {
          setShowErrorBorder(false);
        }, 3000);
      } else if (formData.images.length === 0) {
        toast({
          description: "Please Attach image",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        setAttachImage(true);
    
       
        setTimeout(() => {
          setAttachImage(false);
        }, 3000);
      } else {
        handleEditModalOpen();
      }
    }}
    
  >
    {t(`common:buttons.schedule`)}
  </Button>
</GridItem>

                <GridItem rowSpan={1} colSpan={1}>
                  <Button
                    w="full"
                    bgColor="rgba(78, 203, 113, 1)"
                    type="submit"
                    color="#fff"
                    h="80px"
                    _hover={{
                      bg: "none",
                      color: "rgba(78, 203, 113, 1)",
                      border: "1px solid rgba(78, 203, 113, 1)",
                    }}
                  >
                    {t(`common:buttons.send`)}
                  </Button>
                </GridItem>
              </>
            )}
          </Grid>
          {isEditModalOpen && (
            <Drawer
              placement="right"
              isOpen={isEditModalOpen}
              onClose={handleCloseDrawer}
              size="md"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton
                  h="40px"
                  w="40px"
                  mt={3}
                  bgColor="rgba(0, 0, 0, 0.08)"
                />
                <DrawerHeader fontSize="28px" fontWeight="700">
                  Schedule Announcement
                </DrawerHeader>

                <DrawerBody maxW="full">
                  <Formik
                    initialValues={{
                      scheduledDateTime: Data?.scheduledDateTime || "",
                      message: Data?.message || "",
                      date: Data?.date || "",
                      time: Data?.time || "",
                    }}
                    onSubmit={id ? handleEdits : handleSchedule}
                  >
                    {() => (
                      <Form noValidate>
                        <Grid
                          templateRows="repeat(1, 1fr)"
                          templateColumns={{
                            base: "repeat(1, 1fr)",
                            md: "repeat(2, 1fr)",
                          }}
                          gap="8"
                          mt={10}
                          pt={7}
                          pl={4}
                          borderRadius={"20px"}
                        >
                          <GridItem rowSpan={1} colSpan={1}>
                            <DatePicker
                              onDateSelect={handleDateSelect}
                              onClear={handleClearDate}
                              value={""}
                              placeholder={"Date"} border={""}                            />
                          </GridItem>
                          <GridItem rowSpan={1} colSpan={1}>
                            {/* <Input
                              type="time"
                              h="60px"
                              bgColor={bgColor}
                              value={selectedTime}
                              onChange={handleTimeChange}
                            /> */}
                              <CustomTimePicker value={selectedTime} onChange={handleTimeChange} />
                          </GridItem>

                          <GridItem rowSpan={1} colSpan={2}>
                            <Button
                              w="full"
                              bgColor="rgba(78, 203, 113, 1)"
                              color="#fff"
                              h="80px"
                              _hover={{
                                bg: "none",
                                color: "rgba(78, 203, 113, 1)",
                                border: "1px solid rgba(78, 203, 113, 1)",
                              }}
                              type="submit"
                            >
                              {t(`common:buttons.schedule`)}
                            </Button>
                          </GridItem>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          )}
          {isSuccessDrawerOpen && <SuccessDrawer isOpen={isSuccessDrawerOpen} onClose={handleCloseSuccessDrawer} />}
        </Form>
      )}
    </Formik>
  );
};

export default AnnouncementForm;
