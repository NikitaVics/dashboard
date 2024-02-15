import {  Button,  Flex,  Grid, GridItem,  Input,  Select, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import ky, { HTTPError } from "ky";
import { ChangeEvent, useState } from "react";
import { mutate } from "swr";

import * as Yup from "yup";
import { InputControl } from "../Input/Input";

type FormItems = {
      // eslint-disable-next-line
  image: any;
  coachData?: {
    id?: string
    firstName: string
    lastName: string
    email : string
    gender : string
    phoneNumber  : string
    experience  :string
    image : string
  }
  onClose?: () => void;
}



const CoachAddForm = ({coachData,onClose}:FormItems) => {
  const { t } = useTranslation("coach");
  const color = useColorModeValue("rgba(254, 254, 254, 1)","rgba(14, 14, 14, 1)")
  const borderColor = useColorModeValue("rgba(211, 211, 211, 1)","rgba(57, 57, 57, 1)")
  const bgColor = useColorModeValue("light.200", "dark.300");
const toast = useToast()

   const [firstName,setFirstName] = useState("")
   const [lastName,setLastName] = useState("")
   const [email,setEmail] = useState("")
   const [gender,setGender] = useState("")
   const [phone,setPhone] = useState("")
   const [experience,setExperience] = useState("")

   const handleFirstChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  
  };

  const handleLastChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value); 
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleExperienceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExperience(e.target.value);
  };

  const [image, setImage] = useState<File | string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file' && e.target.files) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    }
  };
  

  

  const handleSubmit = async () => {
   
   

    try {
       
       
      const data = new FormData();
      data.append('FirstName', firstName);
      data.append('LastName', lastName);
      data.append('Gender', gender);
      data.append('Experience', experience);
      data.append('PhoneNumber', phone);
      data.append('Email', email);
      data.append('Image', image);

      
      

    
  
      const response = await ky.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Coach`, {
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
        await mutate(`/api/coach`)
      
      }
    } catch (error) {
        if (error instanceof HTTPError && error.response.status === 400) {
          const errorResponse = await error.response.json()
          const messages = errorResponse.error.messages
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
          })
        }
      }

    }
   

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  experience: Yup.string().required("Experience is required"),
});


  return (
    <Formik
      initialValues={{
          firstName: coachData?.firstName || "",
          lastName: coachData?.lastName || "",
          email: coachData?.email || "",
          gender: coachData?.gender || "",
          phoneNumber : coachData?.phoneNumber || "",
          experience  :coachData?.experience || "",
          image : coachData?.image || ""
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(  ) => (
        <Form noValidate>
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
            }}
            gap="3"
           
          >
            <GridItem rowSpan={2} colSpan={2}>
              
              <InputControl name="firstName" inputProps = {
                 {
                  value : firstName, h :"60px" ,  placeholder : t(`coach.firstName`),
                 onChange : handleFirstChange , bgColor : bgColor, focusBorderColor : "rgba(78, 203, 113, 1)" ,borderRadius : "10px"
                 } }/>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
             
                <InputControl name="lastName" inputProps = {{  value : lastName , h:"60px", borderRadius : "10px" , placeholder : t(`coach.lastName`) ,onChange : handleLastChange,  bgColor :bgColor, focusBorderColor : "rgba(78, 203, 113, 1)" }}/>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
           
               <InputControl name="email" inputProps = {{ value : email, h :"60px", borderRadius : "10px", placeholder : t(`coach.email`), onChange : handleEmailChange,  bgColor : bgColor, focusBorderColor : "rgba(78, 203, 113, 1)"}}/>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
            
               <InputControl name="phoneNumber" inputProps = {{ value : phone, borderRadius : "10px", onChange : handlePhoneChange, h:"60px",   placeholder:t(`coach.phone`), bgColor:bgColor, focusBorderColor :"rgba(78, 203, 113, 1)"}}/>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <Select
               h="60px"   
               placeholder={t(`coach.gender`)}
                value={gender}
                onChange={handleGenderChange} 
                bgColor={bgColor}
                borderRadius={"10px"}
                focusBorderColor="rgba(78, 203, 113, 1)"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
               <InputControl name="experience" inputProps = {{value:experience, h:"60px", borderRadius:"10px",  placeholder:t(`coach.from`), onChange:handleExperienceChange, bgColor:bgColor, focusBorderColor:"rgba(78, 203, 113, 1)"}}/>
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
  }}
>
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
   <Flex>
  
  </Flex>
    <Text ml={2} color={"rgba(124, 124, 125, 1)"}>
     + Images
    </Text>
  </label>
</div>

            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
            <Button
            mt={20}
            w={{ base: "100%", md: "450px" }} 
            bgColor="rgba(78, 203, 113, 1)"
            color="#fff"
            h="80px"
          
            _hover={{ bg: 'none', color: 'rgba(78, 203, 113, 1)', border: '1px solid rgba(78, 203, 113, 1)' }}
            type="submit"
          >
               {t(`common:buttons.addCoach`)}
          </Button>
            </GridItem>
          </Grid>

         
        </Form>
      )}
    </Formik>
  );
};

export default CoachAddForm;
