import React, { ChangeEvent, useRef, useState } from "react";
import { Button, Drawer, DrawerBody, DrawerCloseButton, Image,DrawerContent, DrawerHeader,Text, DrawerOverlay, Grid, GridItem, IconButton, Input, Textarea, Tooltip,  useColorModeValue, useToast, Box, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import ky, { HTTPError } from "ky";
import { AttachmentIcon } from "@chakra-ui/icons";
import SuccessDrawer from "./successDrawer";
import { mutate } from "swr";

type FormItems = {
  // eslint-disable-next-line
  message: any;
  id : string
  Data?: {
    id?: string;
    message: string;
    scheduledDateTime: string;
    images:string;
    date: string;
    time: string;
  };
  onClose?: () => void;
};

const AnnouncementForm = ({ Data ,onClose,id}: FormItems) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [isSuccessDrawerOpen, setIsSuccessDrawerOpen] = useState(false);

  const handleCloseSuccessDrawer = () => {
    setIsSuccessDrawerOpen(false);
    onClose?.();
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDates = event.target.value;
    const [year, month, day] = selectedDates.split("-");
    const reversedDate = `${year}-${month}-${day}`;
    setSelectedDate(reversedDate);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleCloseDrawer = () => {
    setIsEditModalOpen(false);
  };


  const toast = useToast();
  const [formData, setFormData] = useState({
    message: '',
    scheduledDateTime: null,
    images:   [] as File[],
  });
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  
  



  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    if ('files' in e.target && e.target.files) {
    
      setFormData({
        ...formData,
        images: Array.from(e.target.files),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  


const handleSendClick = async () => {
    try {
     
     
      const data = new FormData();
      data.append('Message', message);


      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      }




      // if (formData.images) {
       
      //   data.append("Images", formData.images[0]);
        
      // }

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

      
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSchedule = async () => {
    try {
      
      const data = new FormData();
      data.append('Message', message);


      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      }




      if (formData.images) {
       
        data.append("Images", formData.images[0]);
        
      }

      const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}:00.000Z`).toISOString();

      data.append("ScheduledDateTime",scheduledDateTime)

      const response = await ky.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement/create Announcement`, {
        body: data,
      });
    

    
     
      if (response) {
        setIsSuccessDrawerOpen(true);
        await mutate(`/api/getAnnouncement`)
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
      data.append('Message', message);


      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      }


      data.append("Id",id)

      // if (formData.images) {
       
      //   data.append("Images", formData.images[0]);
        
      // }

      const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}:00.000Z`).toISOString();

      data.append("ScheduledDateTime",scheduledDateTime)

      const response = await ky.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement`, {
        body: data,
      });
    

    
     
      if (response) {
        setIsSuccessDrawerOpen(true);
        await mutate(`/api/getAnnouncement`)
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
      {() => (
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
           <Flex>
    {Data?.images && typeof Data.images === 'string' ? (
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
      top="10px"
      bg="transparent"
      color="gray.500"
      _hover={{ color: "gray.700" }}
      aria-label="Attach Image"
    />
  </Tooltip>
</Box>
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
      // type="submit"
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
        onClick={handleEditModalOpen}
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
        // onClick={handleSubmit}
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
                <DrawerContent >
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
                              <Input
                                type="date"
                                bgColor={bgColor}
                                value={selectedDate}
                                onChange={handleDateChange}
                              />
                            </GridItem>
                            <GridItem rowSpan={1} colSpan={1}>
                              <Input
                                type="time"
                                bgColor={bgColor}
                                value={selectedTime}
                                onChange={handleTimeChange}
                              />
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
