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
import { ChangeEvent, useState } from "react";
import ky from "ky";
import SuccessDrawer from "./successDrawer";
import { mutate } from "swr";
import DatePicker from "@/pages/coachDatePicker";
import { CloseIcon } from "@chakra-ui/icons";

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

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleScheduledTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedScheduledTime(event.target.value);
  };

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

      const scheduledDateTimes = selectedDate?.toISOString() || "";

      data.append("EventDateTime", scheduledDateTimes);

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

  const [selectedScheduleDate, setSelectedScheduleDate] = useState<Date | null>(
    null
  );

  const handleDateSelects = (date: Date) => {
    setSelectedScheduleDate(date);
  };

  const handleClearDates = () => {
    setSelectedScheduleDate(null);
    
  };

  const handleSchedule = async () => {
    try {
      const data = new FormData();
      data.append("Message", message);
      data.append("EventName", eventName);

      const scheduledDateTimes = selectedDate?.toISOString() || "";
      data.append("EventDateTime", scheduledDateTimes);

      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      }
      const scheduledDateTime = selectedScheduleDate?.toISOString() || "";

      data.append("SceduledDataTime", scheduledDateTime);

      const response = await ky.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement/create EventAnnouncement`,
        {
          body: data,
        }
      );

      if (response) {
      
        setIsSuccessDrawerOpen(true);
        setIsSuccessDrawerOpen(true);
  
       
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  const handleEdits = async () => {
    try {
      const data = new FormData();
      data.append("Id", id);
      data.append("Message", message);
      data.append("EventName", eventName);

      const event = new Date(
        `${selectedDate}T${selectedTime}:00.000Z`
      ).toISOString();

      data.append("EventDateTime", event);

      if (formData.images) {
        formData.images.forEach((image) => {
          data.append(`Images`, image);
        });
      }

      const scheduledDate = selectedScheduleDate?.toISOString() || "";
      const scheduledDateTime = new Date(
        `${scheduledDate}T${selectedScheduledTime}:00.000Z`
      ).toISOString();

      data.append("SceduledDataTime", scheduledDateTime);

      const response = await ky.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement`,
        {
          body: data,
        }
      );

      if (response) {
        setIsSuccessDrawerOpen(true);
        setIsEditModalOpen(false);
        await mutate(`/api/getAnnouncement`);
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
                onDateSelect={handleDateSelect}
                onClear={handleClearDate}
                value={eventData?.eventDate || null}
                placeholder="Select Date"
                
                    // eslint-disable-next-line
                //@ts-ignore
                border={dateError ? "2px solid red" : undefined}
              />
            </GridItem>

            <GridItem rowSpan={1} colSpan={1}>
              <Input
                type="time"
                h="60px"
                bgColor={bgColor}
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <div
                style={{
                  border: `1px solid ${borderColor}`,
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
                        !selectedDate
                      ) {
                        toast({
                          description:
                            "Message, Event Name, and Event Date are required to schedule",
                          status: "error",
                          position: "top",
                          duration: 3000,
                          isClosable: true,
                        });
                        setShowErrorBorder(true);
                        setEventError(true);
                        setDateError(true);

                        setTimeout(() => {
                          setShowErrorBorder(false);
                          setEventError(false);
                          setDateError(false);
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
                            <Input
                              type="time"
                              h={"60px"}
                              bgColor={bgColor}
                              value={selectedScheduledTime}
                              onChange={handleScheduledTimeChange}
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
