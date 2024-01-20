import React, { useState } from "react";
import { Button, Grid, GridItem, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import ky from "ky";
import { InputControl } from "../Input/Input";

type FormItems = {
      // eslint-disable-next-line
  message: any;
  Data?: {
    id?: string
   message : string
   scheduledDateTime  : string
    image : string
  }
}

const AnnouncementForm = ({Data}:FormItems) => {
  const [fileAttachment, setFileAttachment] = useState<File | null>(null);

  // const handleFileAttach = (file: File) => {
  //   console.log("File attached:", file);
  //   setFileAttachment(file);
  // };

  const toast = useToast()

  const handleSendClick = async (values: FormItems) => {
    try {
      console.log("Message:", values.message);
  
      const formData = new FormData();
      
      
      if (values.message) {
        formData.append("message", values.message);
      } else {
        console.error("Error: Message is empty or undefined");
        return; 
      }
  
      if (fileAttachment) {
        formData.append("image", fileAttachment, fileAttachment.name);
  
        console.log("Appended Image in FormData:", {
          name: fileAttachment.name,
          type: fileAttachment.type,
          size: fileAttachment.size,
        });
      }
  
      console.log("FormData Entries:", [...formData.entries()]);
  
      const response = await ky.post("/api/announcement/AddAnnouncement", {
        body: formData,
      });
  
      if (response) {
        toast({
          description: "Successfully added",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
  
        setFileAttachment(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  const { t } = useTranslation("announcement");

  return (
    <Formik
      initialValues={{
        message : Data?.message || "",
        scheduledDateTime  : Data?.scheduledDateTime || "",
        image : Data?.image || ""
      }}
      onSubmit={(values) => handleSendClick(values)}
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
              {/* <FileAttachTextarea  name="message" onFileAttach={handleFileAttach} /> */}
              <InputControl name="message" />
            </GridItem>

            <GridItem rowSpan={1} colSpan={1}>
              <Button
                type="submit"
                w="full"
                bg="none"
                variant={"outline"}
                borderColor="rgba(78, 203, 113, 1)"
                border="1px solid"
                color="rgba(78, 203, 113, 1)"
                h="80px"
              >
                {t(`common:buttons.schedule`)}
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                type="submit"
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
                {t(`common:buttons.send`)}
              </Button>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AnnouncementForm;
