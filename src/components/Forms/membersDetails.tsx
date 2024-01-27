import {
    Avatar,
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    HStack,
    Hide,
    Show,
    Stack,
    Text,
    useColorModeValue,
    useToast,
  } from "@chakra-ui/react"
  import { Form, Formik } from "formik"
  import ky, { HTTPError } from "ky"
  import useTranslation from "next-translate/useTranslation"
  import React from "react"
  import * as Yup from "yup"
import { CustomInput } from "../Input/customInput"
import useSWR, { mutate } from "swr"

  
  type FormItems = {
     // eslint-disable-next-line
    status: any
    memberId?:string
    memberData?: {
      name: string
      memberId?:string
      gender:string
      status?: string
      image:string
     phoneNo : string
    email:string
     memberSince : string
      membershipExpirationCountDown : string
    }
    onClose?: () => void
  }
  
  function MembersDetails({ memberData,memberId,onClose  }: FormItems) {
    const { t } = useTranslation("members")
    const toast = useToast()

    const { data: succesData } = useSWR(
      `/api/members/getSuccessBookings?id=${memberId}`,
    )

    const { data: cancelledData } = useSWR(
      `/api/members/getCancelledBookings?id=${memberId}`,
    )

    const color2  = useColorModeValue("rgba(67, 67, 69, 1)","rgba(224, 224, 226, 1)")

    const handleDeactivate = async (memberId: string | undefined) => {
      if (memberId) {
        try {
          const updatedValues = { memberId }
          if (memberId) {
            const response = await ky.post(
              `/api/members/Activate/${memberId}`,
              {
                json: updatedValues,
              },
            )
  
            if (response) {
              toast({
                description: "Successfully Activated",
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
              })
              await mutate(`/api/members`)
              onClose?.()
            }
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
    }
  

    const handleActivate = async (memberId: string | undefined) => {
      if (memberId) {
        try {
          const updatedValues = { memberId }
          if (memberId) {
            const response = await ky.post(
              `/api/members/Activate/${memberId}`,
              {
                json: updatedValues,
              },
            )
  
            if (response) {
              toast({
                description: "Successfully Deactivated",
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
              })
              await mutate(`/api/members`)
             onClose?.()
             
            }
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
    }
  
    const handleSubmit = async (values: FormItems) => { 
      console.log(values)
        try {
         ""
        } catch (error) {
        ""
        }
      
    }
  
    const validationSchema = Yup.object().shape({
      name: Yup.string().required(t(`common:errors.requiredError`)),
      status: Yup.string(),
      description: Yup.string()
        .max(500, t(`common:errors.shouldBe225Char`))
        .required(t(`common:errors.requiredError`)),
    })
  
   const bgColor = useColorModeValue("light.200","dark.300")
   const color  = useColorModeValue("light.50","dark.400")
    return (
      <Formik
        initialValues={{
          name: memberData?.name || "",
          image: memberData?.image || "",
          gender : memberData?.gender || "",
          email : memberData?.email || "",
          phoneNo : memberData?.phoneNo || "",
          memberSince : memberData?.memberSince || "",
          status : memberData?.status || "",
          membershipExpirationCountDown : memberData?.membershipExpirationCountDown || "",
         
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({  setFieldTouched,values }) => (
          <Form noValidate>
            <Show below="sm">
            <Avatar
  src={memberData?.image} 
  size="lg" 
/>   
</Show>
           <HStack  justify={"space-between"}> 

         
            <Flex alignItems={"center"} gap={6}>
            <Hide below="sm">
            <Avatar
  src={memberData?.image} 
  size="lg" 
/>   
</Hide>

<Text>{memberData?.name}</Text>

            </Flex>

            <Button bg="none" fontSize="16px" color="green.100" _hover={{bg:"none"}} fontWeight={"400"}>Edit Profile</Button>

</HStack>


            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap="8"
              mt={10}
              bgColor={bgColor}
              pt={7}
              pl={4}
              borderRadius={"20px"}
            >
              <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                  inputProps={{
                    type: "text",
                    placeholder: t(`members.name`),
                    fontSize: "md",
                    fontWeight: "medium",
                    color: {color},
                    border : "none",
                    h:"45px"
                  }}
                  name="name"
                  isReadOnly
                  onKeyUp={() => setFieldTouched("name")}
                />
              </GridItem>
  
              <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                  inputProps={{
                    type: "text",
                    placeholder: t(`members.gender`),
                    fontSize: "md",
                    fontWeight: "medium",
                    color: {color},
                    border:"none",
                    h:"45px"
                  }}
                  name="gender"
                  isReadOnly
                  onKeyUp={() => setFieldTouched("gender")}
                />
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                  inputProps={{
                    type: "text",
                    placeholder: t(`members.email`),
                    fontSize: "md",
                    fontWeight: "medium",
                    border:"none",
                    color: {color},
                    h:"45px"
                  }}
                  name="email"
                  isReadOnly
                  onKeyUp={() => setFieldTouched("email")}
                />
              </GridItem>
  
              <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                  inputProps={{
                    type: "text",
                    placeholder: t(`members.phone`),
                    fontSize: "md",
                    fontWeight: "medium",
                    color: {color},
                    border:"none",
                    h:"45px"
                  }}
                  name="phoneNo"
                  isReadOnly
                  onKeyUp={() => setFieldTouched("phoneNo")}
                />
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <CustomInput
                  inputProps={{
                    type: "text",
                    placeholder: t(`members.member`),
                    fontSize: "md",
                    fontWeight: "medium",
                    color: {color},
                    border:"none",
                    h:"45px",
                   
                  }}
                  name="memberSince"
                  onKeyUp={() => setFieldTouched("memberSince")}
                />
              </GridItem>
  
              <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                  inputProps={{
                    type: "text",
                    placeholder: t(`members.status`),
                    fontSize: "md",
                    fontWeight: "medium",
                    color: {color},
                    border:"none",
                    h:"45px",
                    value: values.status === true ? "Active" : "In-Active",
    style: {
      color: values.status === true ? "rgba(39, 174, 96, 1)" : "rgba(235, 87, 87, 1)",
    },
                  }}
                  name="status"
                 
                  isReadOnly
                  onKeyUp={() => setFieldTouched("status")}
                />
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <CustomInput
                  inputProps={{
                    type: "text",
                    placeholder: t(`members.name`),
                    fontSize: "md",
                    fontWeight: "medium",
                    color: "rgba(244, 166, 98, 1)",
                    border:"none",
                    h:"45px"
                  }}
                  name="membershipExpirationCountDown"
                  isReadOnly
                  onKeyUp={() => setFieldTouched("membershipExpirationCountDown")}
                />
              </GridItem>
  
             
              {/* <GridItem rowSpan={2} colSpan={2}>
                
              </GridItem> */}
            </Grid>


            <Grid
              templateRows="repeat(2, 1fr)"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap="8"
             
            
              p={7}
              borderRadius={"20px"}
            >
              <Box   bgColor={bgColor} h={"122px"} borderRadius={"12px"} px={4} py={3}>
             <GridItem rowSpan={1} colSpan={1} >
              <Stack>
              <Text fontSize={"43px"} fontWeight={"700"} color="green.300">{succesData}</Text>
              <Text fontSize={"14px"} color={color2}>Succesfull Booking</Text>
              </Stack>
              
             </GridItem>
             </Box>
             <Box   bgColor={bgColor} h={"122px"} borderRadius={"12px"} px={4} py={3}>
             <GridItem rowSpan={1} colSpan={1} >
              <Stack>
              <Text fontSize={"43px"} fontWeight={"700"} color="red.200">{cancelledData}</Text>
              <Text fontSize={"14px"} color={color2}>Cancelled Booking</Text>
              </Stack>
              
             </GridItem>
             </Box>
            </Grid>
  
           
  <Box maxW="full">
  {memberData?.status ? (
    <Button variant="outline" colorScheme="red" w="full" h={"80px"} onClick={() => handleActivate(memberId)}>
      DeActivate
    </Button>
    ) : (
      <Button variant="outline" colorScheme="green" w="full" h={"80px"} onClick={() => handleDeactivate(memberId)}>
      Activate
    </Button>
    )}
  </Box>




          </Form>
        )}
      </Formik>
    )
  }
  
  export default MembersDetails
  