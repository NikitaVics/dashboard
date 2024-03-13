import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Court1 from "@/pages/components/Icons/court1";
import Court2 from "@/pages/components/Icons/court2";
import Court3 from "@/pages/components/Icons/court3";
import Court4 from "@/pages/components/Icons/court4";
import Court5 from "@/pages/components/Icons/court5";
import Court6 from "@/pages/components/Icons/court6";
import useTranslation from "next-translate/useTranslation";
import { Form, Formik } from "formik";
import ky, { HTTPError } from "ky";
import SuccessDrawer from "./successDrawer";
import { mutate } from "swr";

interface ImageItem {
  id: number;
  name: string;
  icon: JSX.Element;
  selected: boolean;
}

type FormItems = {
  message: string | number | readonly string[] | undefined;
  courtId : string
  courtData?: {
    id?: string;
    message: string;
    scheduledDateTime: string;
    courts:string
    courtNames: string;
    date: string;
    time: string;
  };
  onClose?: () => void;
};




const CourtMaintainence: React.FC<FormItems> = ({ courtData, onClose,courtId }: FormItems) => {
  const { t } = useTranslation("announcement");
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

  const color = useColorModeValue("dark.100", "dark.500");


  const [images, setImages] = useState<ImageItem[]>([
    { id: 1, name: "Court1", icon: <Court1 />, selected: false },
    { id: 2, name: "Court2", icon: <Court2 />, selected: false },
    { id: 3, name: "Court3", icon: <Court3 />, selected: false },
    { id: 4, name: "Court4", icon: <Court4 />, selected: false },
    { id: 5, name: "Court5", icon: <Court5 />, selected: false },
    { id: 6, name: "Court6", icon: <Court6 />, selected: false },
  ]);

 {courtId ?  useEffect(() => {
  
  setImages(prevImages =>
    prevImages.filter(image => courtData?.courts?.includes(image.name))
  );
}, [courtData?.courts]) : ""}

  const handleImageClick = (imageId: number) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === imageId ? { ...image, selected: !image.selected } : image
      )
    );
  };

  const toast = useToast();

  const [message, setMessage] = useState<string>(courtData?.message || "");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const selectedImages = images.filter((image) => image.selected);
      const courtNames = selectedImages.map((image) => t(`announce.${image.name.toLowerCase()}`)).join(", ");

      const updatedValues = {
       
        message: message,
        courtNames,
      };
      const response = await ky.post(`/api/announcement/AddCourtMaintainence`, {
        json: updatedValues,
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

  const handleDelete = async (id: string) => {
    if (id) {
      try {
        const updatedValues = { id };
        if (id) {
          const response = await ky.put(`/api/announcement/delete/${id}`, {
            json: updatedValues,
          });

          if (response) {
            toast({
              description: "Successfully Deleted",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            await mutate(`/api/announcement/getAnnouncement`);
          }
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
    }
  };

  const handleSchedule = async () => {
    try {
      const selectedImages = images.filter((image) => image.selected);
      const courtNames = selectedImages.map((image) => t(`announce.${image.name.toLowerCase()}`)).join(", ");

      const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}:00.000Z`).toISOString();

      const updatedValues = {
        scheduledDateTime,
        message: message,
        courtNames,
      };
      const response = await ky.post(`/api/announcement/AddCourtMaintainence`, {
        json: updatedValues,
      });

      if (response) {
        setIsSuccessDrawerOpen(true);
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

  const handleEdits= async () => {
    try {
     
     
      const data = new FormData();
      data.append("Id",courtId)
      data.append('Message', message);
      

    

      const event = new Date(`${selectedDate}T${selectedTime}:00.000Z`).toISOString();
    
      data.append("EventDateTime",event)

  

      const response = await ky.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement`, {
        body: data,
      });

      if (response) {
        setIsSuccessDrawerOpen(true);
        await mutate(`/api/getAnnouncement`)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const bgColor = useColorModeValue("light.200", "dark.300");

  return (
    <Box>
      <Formik
        initialValues={{
          message: courtData?.message || "",
          scheduledTime: courtData?.scheduledDateTime || "",
          courtNames: courtData?.courtNames || "",
          courtId : ""
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldTouched }) => (
          <Form noValidate>
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap="4"
              mt={4}
              borderRadius={"20px"}
            >
              {images.map((image) => (
                <GridItem key={image.id} rowSpan={1} colSpan={1}>
                  <Stack
                    bgColor={bgColor}
                    border={
                      image.selected ? "1px solid rgba(78, 203, 113, 1)" : ""
                    }
                    p={4}
                    borderRadius={"20px"}
                    onClick={() => handleImageClick(image.id)}
                  >
                    {image.icon}
                    <Text fontSize={"18px"} fontWeight="700">
                      {t(`announce.${image.name.toLowerCase()}`)}
                    </Text>
                  </Stack>
                </GridItem>
              ))}
            </Grid>

            <Textarea
              h="174px"
              mt={10}
              placeholder={t(`announce.placeholder`)}
              name="message"
              value={message}
              onChange={handleTextareaChange}
              onBlur={() => setFieldTouched("message")}
              bgColor={bgColor}
            />

            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap="4"
              mt={8}
            >
              {courtId ? (
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
                <DrawerContent bgColor={color}>
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
                        scheduledDateTime: courtData?.scheduledDateTime || "",
                        message: courtData?.message || "",
                        courtNames: courtData?.courtNames || "",
                        date: courtData?.date || "",
                        time: courtData?.time || "",
                      }}
                      onSubmit={courtId ? handleEdits : handleSchedule}
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
    </Box>
  );
};

export default CourtMaintainence;
