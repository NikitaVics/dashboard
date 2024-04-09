import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useEffect, useState } from "react";
import ky from "ky";
import SuccessDrawer from "./successDrawer";
import { mutate } from "swr";
import DatePicker from "@/pages/coachDatePicker";
import { CloseIcon } from "@chakra-ui/icons";
import CustomTimePicker from "../CustomTimePicker";

type FormItems = {
  id: string;
  eventData?: {
    message: string;
    eventDate: string;
    eventTime: string;
    eventName: string;
    images: string | string[]; // Changed to handle array of images
  };

  onClose: () => void;
};

const EventAnnouncement = ({ onClose, eventData, id }: FormItems) => {
  const [showErrorBorder, setShowErrorBorder] = useState(false);

  const { t } = useTranslation("announcement");
  const bgColor = useColorModeValue("light.200", "dark.300");
  const color = useColorModeValue(
    "rgba(254, 254, 254, 1)",
    "rgba(14, 14, 14, 1)"
  );
  const borderColor = useColorModeValue(
    "rgba(211, 211, 211, 1)",
    "rgba(57, 57, 57, 1)"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const [isSuccessDrawerOpen, setIsSuccessDrawerOpen] = useState(false);

  const handleCloseSuccessDrawer = () => {
    setIsSuccessDrawerOpen(false);
    onClose?.();
  };

  const formatTime = (timeString: string | undefined): string => {
    if (!timeString) return "";

    const trimmedTimeString = timeString.replace(/\s/g, "");

    const [hours, minutes] = trimmedTimeString.split(":");

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  const [eventName, setEventName] = useState<string>(
    eventData?.eventName || ""
  );

  const [selectedTime, setSelectedTime] = useState<string>(
    formatTime(eventData?.eventTime) || ""
  );

  const [message, setMessage] = useState<string>(eventData?.message || "");

  const [selectedScheduledTime, setSelectedScheduledTime] = useState("");

  const handleTimeChange = (time : string) => {
    const [hours, minutes] = time.split(':');
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);
    const formattedHours = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const formattedMinutes = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    setSelectedTime(formattedTime);
  };

  const handleScheduledTimeChange = (time : string) => {
    const [hours, minutes] = time.split(':');
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);
    const formattedHours = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const formattedMinutes = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    setSelectedScheduledTime(formattedTime);
  };
  

  // const handleScheduledTimeChange = (time :  string) => {
  //   setSelectedScheduledTime(time);
  // };

  const handleCloseDrawer = () => {
    setIsEditModalOpen(false);
  };

  const [formData, setFormData] = useState({
    message: "",
    scheduledDateTime: null,
    images: [] as File[],
  });

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const toast = useToast();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if ("files" in e.target && e.target.files) {
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

  const [eventError, setEventError] = useState(false);
  const [imageError,setImageError] = useState(false)
  const [dateError, setDateError] = useState(false);

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

      if (!selectedDate) {
        toast({
          description: "Event Date is required",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });

        setDateError(true);

        setTimeout(() => {
          setDateError(false);
        }, 3000);
      }

      if (formData.images.length === 0) {
        toast({
          description: "Please upload  image",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        setImageError(true);

        setTimeout(() => {
          setImageError(false);
        }, 3000);
      }

      if (eventName.trim() !== "") {
        data.append("EventName", eventName);
      } else {
        toast({
          description: "EventName is required",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        setEventError(true);

        setTimeout(() => {
          setEventError(false);
        }, 3000);
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
      
      data.append("EventDateTime", utcDate);
      

     

      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      } 

      const response = await ky.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement/create EventAnnouncement`,
        {
          body: data,
        }
      );

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



  const handleClearDate = () => {
    setSelectedDate(null);
    
  };

  const [selectedScheduleDate, setSelectedScheduleDate] = useState<Date | null>(
    null
  );

  const handleDateSelects = (date: Date) => {
    setSelectedScheduleDate(date);
  };

  const handleClearDates = () => {
    setSelectedScheduleDate(null);
    
  };

  console.log(selectedTime)

  const handleSchedule = async () => {
    try {
      const data = new FormData();
      data.append("Message", message);
      data.append("EventName", eventName);

    

      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      }
  

      const scheduledDateTimes = selectedDate
      ? `${selectedDate.getFullYear()}-${
          String(selectedDate.getMonth() + 1).padStart(2, "0")
        }-${String(selectedDate.getDate()).padStart(2, "0")}`
      : "";
    
      const times = selectedTime;
      const [hour, minute] = times.split(':');
      const utcTimess = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00Z`;
      
     
      
      const utcDates = `${scheduledDateTimes.split('T')[0]}T${utcTimess}`;
      
      data.append("EventDateTime", utcDates);




      const scheduledDate = selectedScheduleDate
      ? `${selectedScheduleDate.getFullYear()}-${
          String(selectedScheduleDate.getMonth() + 1).padStart(2, "0")
        }-${String(selectedScheduleDate.getDate()).padStart(2, "0")}`
      : "";
    
      const time = selectedScheduledTime;
      const [hours, minutes] = time.split(':');
      const utcTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00Z`;
      
      console.log("Time in UTC format:", utcTime);
      
      const utcDate = `${scheduledDate.split('T')[0]}T${utcTime}`;
    

      data.append("SceduledDataTime", utcDate);

      const response = await ky.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement/create EventAnnouncement`,
        {
          body: data,
        }
      );

      if (response) {
      
        setIsSuccessDrawerOpen(true);
        setIsSuccessDrawerOpen(true);
        await mutate(`/api/announcement/getAnnouncement?announcementType=${""}`);
       
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const [format, setFormat] = useState("");



  const handleEdits = async () => {
    try {
      const data = new FormData();
      data.append("Id", id);
      data.append("Message", message);
      data.append("EventName", eventName);

      // const event = new Date(
      //   `${selectedDate}T${selectedTime}:00.000Z`
      // ).toISOString();
      
      const scheduledDateTimes = selectedDate
      ? `${selectedDate.getFullYear()}-${
          String(selectedDate.getMonth() + 1).padStart(2, "0")
        }-${String(selectedDate.getDate()).padStart(2, "0")}`
      : "";
    
      const times = selectedTime;
      const [hour, minute] = times.split(':');
      const utcTimes = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00Z`;
      
     
      
      const utcDates = `${scheduledDateTimes ? scheduledDateTimes.split('T')[0] : format.split('T')[0] }T${utcTimes}`;
      
      data.append("EventDateTime", utcDates);

      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      }

      // const scheduledDate = selectedScheduleDate?.toISOString() || "";
      // const scheduledDateTime = new Date(
      //   `${scheduledDate}T${selectedScheduledTime}:00.000Z`
      // ).toISOString();

      const scheduledDate = selectedScheduleDate
      ? `${selectedScheduleDate.getFullYear()}-${
          String(selectedScheduleDate.getMonth() + 1).padStart(2, "0")
        }-${String(selectedScheduleDate.getDate()).padStart(2, "0")}`
      : "";
      // const event = new Date(
      //   `${selectedDate}T${selectedTime}:00.000Z`
      // ).toISOString();

      const time = selectedScheduledTime;
      const [hours, minutes] = time.split(':');
      const utcTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00Z`;
      

      
      const utcDate = `${scheduledDate.split('T')[0]}T${utcTime}`;



      data.append("SceduledDataTime", utcDate);

      const response = await ky.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement`,
        {
          body: data,
        }
      );

      if (response) {
        setIsSuccessDrawerOpen(true);
        setIsSuccessDrawerOpen(true);
        await mutate(`/api/announcement/getAnnouncement?announcementType=${""}`);
  
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };



const eventDate = eventData?.eventDate;

useEffect(() => {
  if (eventDate) {
    const eventDates = eventDate.trim(); 
    const months: { [key: string]: string } = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04',
      May: '05', Jun: '06', Jul: '07', Aug: '08',
      Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };


    const parts = eventDates.split(" ");
    const day = parts[0]; 
    const monthAbbreviation = parts[1].slice(0, 3); 
    const year = parts[2]; 

    const month = months[monthAbbreviation];

    const formattedDate = `${year}-${month}-${day}`;

  

    setFormat(formattedDate);
  }
}, [eventDate]);





  return (
    <Formik
      initialValues={{
        firstName: "",
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
            mt={10}
            pt={7}
            pl={4}
            borderRadius={"20px"}
          >
            <GridItem rowSpan={1} colSpan={2}>
              <Input
                type="text"
                h="60px"
                value={eventName}
                bgColor={bgColor}
                placeholder="Event Name"
                _placeholder={{ color: "rgba(124, 124, 125, 1)" }}
                onChange={handleMessageChange}
                border={eventError ? "2px solid red" : undefined}
              />
            </GridItem>

            <GridItem rowSpan={1} colSpan={1}>
            <DatePicker
  onDateSelect={(date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      setFormat(formattedDate);
    }
  }}
  onClear={handleClearDate}
  value={format || ""}
  placeholder="Date"
  isReadOnly={!!format} 
  // eslint-disable-next-line
  //@ts-ignore
  border={dateError ? "2px solid red" : undefined}
/>



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
              <div
                style={{
                  border: `${imageError ? "2px solid  red" : `1px solid ${borderColor}`}`, 
                  borderRadius: "4px",
                  height: "120px",
                  backgroundColor: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {formData.images &&
                  formData.images.map((image, index) => (
                   <>
                    <Flex key={index} position="relative">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Selected Image ${index}`}
                        ml={1}
                        w="150px"
                        h="100px"
                        objectFit="cover"
                      />
                     
                    </Flex>
                     <IconButton
                     icon={<CloseIcon />}
                     aria-label="Remove Image"
                     onClick={()=>handleRemoveImage(index)}
                     position="absolute"
                     top="2"
                     right="2"
                     bg="transparent"
                     _hover={{ bg: "transparent" }}
                     color="red.500"
                     zIndex={2}
                   />
                   </>
                  ))}
                <label
                  htmlFor="attachment"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 8px",
                  }}
                >
                  <Input
                    type="file"
                    id="attachment"
                    name="attachment"
                    display="none"
                    onChange={handleChange}
                    h="120px"
                  />
                  <Text ml={2} color={"rgba(124, 124, 125, 1)"}>
                    + Images
                  </Text>
                </label>
              </div>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <Textarea
                h="174px"
                placeholder="Type Message ..."
                _placeholder={{ color: "rgba(124, 124, 125, 1)" }}
                bgColor={bgColor}
                onChange={handleTextChange}
                value={message}
                name="message"
                border={showErrorBorder ? "2px solid red" : undefined}
              />
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
                      if (
                        message.trim() === "" &&
                        eventName.trim() === "" &&
                        !selectedDate && formData.images.length === 0
                      ) {
                        toast({
                          description:
                            "Message, Event Name, and Event Date,Images are required to schedule",
                          status: "error",
                          position: "top",
                          duration: 3000,
                          isClosable: true,
                        });
                        setShowErrorBorder(true);
                        setEventError(true);
                        setDateError(true);
                        setImageError(true)

                        setTimeout(() => {
                          setShowErrorBorder(false);
                          setEventError(false);
                          setDateError(false);
                          setImageError(false)
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
                      } else if (eventName.trim() === "") {
                        toast({
                          description: "Event Name is required to schedule",
                          status: "error",
                          position: "top",
                          duration: 3000,
                          isClosable: true,
                        });
                        setEventError(true);

                        setTimeout(() => {
                          setEventError(false);
                        }, 3000);
                      } else if (!selectedDate) {
                        toast({
                          description: "Event Date is required to schedule",
                          status: "error",
                          position: "top",
                          duration: 3000,
                          isClosable: true,
                        });
                        setDateError(true);

                        setTimeout(() => {
                          setDateError(false);
                        }, 3000);
                      } else if (formData.images.length === 0) {
                        toast({
                          description: "Image is required to schedule",
                          status: "error",
                          position: "top",
                          duration: 3000,
                          isClosable: true,
                        });
                        setImageError(true);

                        setTimeout(() => {
                          setImageError(false);
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
                    color="#fff"
                    h="80px"
                    _hover={{
                      bg: "none",
                      color: "rgba(78, 203, 113, 1)",
                      border: "1px solid rgba(78, 203, 113, 1)",
                    }}
                    onClick={handleSendClick}
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
                    initialValues={{}}
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
                              onDateSelect={handleDateSelects}
                              onClear={handleClearDates}
                              value={""}
                              placeholder="Date"
                              border={""}
                            />
                          </GridItem>
                          <GridItem rowSpan={1} colSpan={1}>
                            {/* <Input
                              type="time"
                              h={"60px"}
                              bgColor={bgColor}
                              value={selectedScheduledTime}
                              onChange={handleScheduledTimeChange}
                            
                            /> */}
                                <CustomTimePicker value={selectedScheduledTime} onChange={handleScheduledTimeChange} />
              
                
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
          {isSuccessDrawerOpen && (
            <SuccessDrawer
              isOpen={isSuccessDrawerOpen}
              onClose={handleCloseSuccessDrawer}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EventAnnouncement;
