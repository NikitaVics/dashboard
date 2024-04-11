import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Image,
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

import ky from "ky";
import { AttachmentIcon } from "@chakra-ui/icons";

import { mutate } from "swr";


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

const GeneralAnnouncement = ({ Data, onClose }: FormItems) => {

 



  const toast = useToast();

  const [message, setMessage] = useState<string>(Data?.message || "");

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const [isImageAttached, setIsImageAttached] = useState(false);



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








  const bgColor = useColorModeValue("light.200", "dark.300");




  
 

  return (
    <Formik
      initialValues={{
        message: Data?.message || "",
        scheduledDateTime: Data?.scheduledDateTime || "",
        image: Data?.images || "",
      }}
      onSubmit={handleSendClick}
    
    >
      {( ) => (
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
                readOnly
                    border={showErrorBorder ? "2px solid red" : undefined} 
                    name="message"
                  />
                  {/* <input
                    type="file"
                    name={"Images"}
                    ref={fileInputRef}
                    style={{ display: "none"}}
                    onChange={handleChange}
                    accept="image/*"
                  /> */}
                  <Tooltip label="Attach Image" placement="top">
                    <IconButton
                      icon={<AttachmentIcon />}
                    //   onClick={handleFileAttach}
                      position="absolute"
                      left="10px"
                      bg="transparent"
                     
                      color ={ "gray.500"}
                      _hover={{ color: "gray.700" }}
                      aria-label="Attach Image"
                      zIndex={1} 
                    />
                  </Tooltip>
            
                </Box>
              </FormControl>
            </GridItem>
           </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default GeneralAnnouncement;
