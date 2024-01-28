import {  Button,  Flex,  Grid, GridItem,  Input,  Select, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "../Input/Input";
import useTranslation from "next-translate/useTranslation";
import PlusIcon from "@/pages/components/Icons/PlusIcon";
import ky, { HTTPError } from "ky";

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
}

const CoachAddForm = ({coachData}:FormItems) => {
  const { t } = useTranslation("coach");

  const bgColor = useColorModeValue("light.200","dark.300")
const toast = useToast()



  const handleSubmit = async (values: FormItems) => {
    console.log("Values",values)
   

      try {
        const response = await ky.post(`/api/coach/AddCoach`, {
          json: values,
        })

        if (response) {
          toast({
            description: "Successfully added",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          })
         
         
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
      // validationSchema={}
      onSubmit={handleSubmit}
    >
      {({  setFieldTouched,setFieldValue,values }) => (
        <Form noValidate>
          <Grid
            templateRows="repeat(3, 1fr)"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
            }}
            gap="8"
            mt={5}
          >
            <GridItem rowSpan={2} colSpan={2}>
              <InputControl
                inputProps={{
                  type: "text",
                  placeholder: t(`coach.firstName`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "gray.500",
                  h: "60px",
                }}
                name="firstName"
                onKeyUp={() => setFieldTouched("firstName")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <InputControl
                inputProps={{
                  type: "text",
                  placeholder: t(`coach.lastName`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "gray.500",
                  h: "60px",
                }}
                name="lastName"
                onKeyUp={() => setFieldTouched("lastName")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <InputControl
                inputProps={{
                  type: "text",
                  placeholder: t(`coach.email`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "gray.500",
                  h: "60px",
                }}
                name="email"
                onKeyUp={() => setFieldTouched("email")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <InputControl
                inputProps={{
                  type: "text",
                  placeholder: t(`coach.phone`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "gray.500",
                  h: "60px",
                }}
                name="phoneNumber"
                onKeyUp={() => setFieldTouched("phoneNumber")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <Select
                placeholder="Select Gender"
                h="60px"
                onChange={(e) => setFieldValue("gender", e.target.value)} 
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
            {/* <Input
                type="Date"
                h="60px"
                onChange={(e) => setFieldValue("experience", e.target.value)} 
              /> */}
              <InputControl
                inputProps={{
                  type: "text",
                  placeholder: t(`coach.from`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "gray.500",
                  h: "60px",
                }}
                name="experience"
                onKeyUp={() => setFieldTouched("experience")}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
            <Flex
  alignItems="center"
  justifyContent="center"
  border="1px solid gra.500"
  borderRadius="4px"
  height="120px"
  backgroundColor={bgColor}
>
  <label htmlFor="image" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
    <Input
      type="file"
      id="image"
      name="image"
      onChange={(e) => {
        const file = e.currentTarget.files?.[0];
        if (file) {
          setFieldValue('image', file);
        }
      }}
      style={{ display: 'none' }}
    />
    <PlusIcon />
    <Text ml={2} color="gray.500">Images</Text>
  </label>
  {values.image && (
    <Text ml={2} color="gray.500">{values.image.name}</Text>
  )}
</Flex>

            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
            <Button
            w="full"
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
