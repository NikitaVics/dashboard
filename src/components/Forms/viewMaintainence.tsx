import React, {  useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
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
import { mutate } from "swr";


interface ImageItem {
  id: number;
  name: string;
  icon: JSX.Element;
  selected: boolean;
}

type FormItems = {
  message: string | number | readonly string[] | undefined;
  courtId: string;
  courtData?: {
    id?: string;
    message: string;
    scheduledDateTime: string;
    courts: string;
    courtNames: string;
    date: string;
    time: string;
  };
  onClose?: () => void;
};

const Maintainence: React.FC<FormItems> = ({
  courtData,
  onClose,
  courtId,
}: FormItems) => {
  const { t } = useTranslation("announcement");




  const [showErrorBorder, setShowErrorBorder] = useState(false);

 

 

  const [images, setImages] = useState<ImageItem[]>([
    { id: 1, name: "Court1", icon: <Court1 />, selected: false },
    { id: 2, name: "Court2", icon: <Court2 />, selected: false },
    { id: 3, name: "Court3", icon: <Court3 />, selected: false },
    { id: 4, name: "Court4", icon: <Court4 />, selected: false },
    { id: 5, name: "Court5", icon: <Court5 />, selected: false },
    { id: 6, name: "Court6", icon: <Court6 />, selected: false },
  ]);

  {
    courtId
      ? useEffect(() => {
          setImages((prevImages) =>
            prevImages.filter(
              (image) => courtData?.courts?.includes(image.name)
            )
          );
        }, [courtData?.courts])
      : "";
  }

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
    setShowErrorBorder(false); 
  };

  const handleSubmit = async () => {
    try {
      const selectedImages = images.filter((image) => image.selected);
      const courtNames = selectedImages
        .map((image) => t(`announce.${image.name.toLowerCase()}`))
        .join(", ");

      if (message.trim() !== "") {
        const updatedValues = {
          message: message,
          courtNames,
        };

        const response = await ky.post(
          `/api/announcement/AddCourtMaintainence`,
          {
            json: updatedValues,
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
          await mutate(`/api/announcement/getAnnouncement?announcementType=${""}`);
          onClose?.();
   
         
        }
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



  const bgColor = useColorModeValue("light.200", "dark.300");

  return (
    <Box>
      <Formik
        initialValues={{
          message: courtData?.message || "",
          scheduledTime: courtData?.scheduledDateTime || "",
          courtNames: courtData?.courtNames || "",
          courtId: "",
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
                    border={`2px solid ${image.selected ? 'rgba(78, 203, 113, 1)' : 'transparent'}`}
                    p={4}
                    
                    borderRadius={"20px"}
                    onClick={() => handleImageClick(image.id)}
                    _hover={{
                      cursor: "pointer",
                      border: "2px solid rgba(78, 203, 113, 1)",
                    }}
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
              border={showErrorBorder ? "2px solid red" : undefined}
              readOnly
            />

       
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Maintainence;
