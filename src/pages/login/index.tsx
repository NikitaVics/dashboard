import {
    Button,
    Center,
    Grid,
    GridItem,
    Hide,
    HStack,
    IconButton,
    InputGroup,
    InputRightElement,
    Text,
    useToast,
  } from "@chakra-ui/react"
  import { Box } from "@chakra-ui/react"
  import { Checkbox, FormControl } from "@chakra-ui/react"
  import { useColorModeValue } from "@chakra-ui/react"
  import { Formik } from "formik"
  import ky, { HTTPError } from "ky"
  import { useRouter } from "next/router"
  import useTranslation from "next-translate/useTranslation"
  import React, { useEffect, useRef, useState } from "react"
  import * as yup from "yup"
import { InputControl } from "@/components/Input/Input"
import Logo from "../components/Icons/Logo"
import LoginPic from "../components/Icons/LoginPicture"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
  
  
  
  function LoginScreen() {
    const bgCOlor = useColorModeValue("light.100", "rgba(14, 14, 14, 1)")
    const toast = useToast()
  
    const color2 = useColorModeValue("light.200", "light.100")
    const color3 = useColorModeValue("light.500", "light.100")
    const color4 = useColorModeValue("dark.50", "light.100")
    const color5 = useColorModeValue("dark.200", "light.100")
  
    const router = useRouter()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const loginSchema = yup.object().shape({
      userNameOrEmail: yup
        .string()
        .required("This Field is Required"),
      password: yup
        .string()
        .required("This Field is Required")
        .test("is-password", "Invalid Password", function (value) {
          if (!value || value.trim() === "") {
            return false
          }
          return true
        }),
    })
  
    useEffect(() => {
      const storedRememberMe = localStorage.getItem("rememberMe")
      if (storedRememberMe) {
        setRememberMe(JSON.parse(storedRememberMe))
      }
      const storedEmail = localStorage.getItem("myapp-email")
      if (storedEmail) {
        setEmail(storedEmail)
      }
      const storedPassword = localStorage.getItem("myapp-password")
      if (storedPassword) {
        setPassword(storedPassword)
      }
    }, [])

    const bgColor = useColorModeValue("rgba(248, 248, 248, 1)","rgba(20, 20, 20, 1)")

  
    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRememberMe(e.target.checked)
      remember()
    }
  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    }
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    }
  
    const rememberCheck = useRef<HTMLInputElement | null>(null)
  
    const remember = () => {
      if (rememberCheck.current && rememberCheck.current.checked) {
        localStorage.setItem("myapp-email", email)
        localStorage.setItem("myapp-password", password)
      } else {
        localStorage.setItem("myapp-email", "")
        localStorage.setItem("myapp-password", "")
      }
    }
  
    const handleSubmit = async () => {
      try {
        if (rememberMe) {
          localStorage.setItem("rememberMe", JSON.stringify(true))
          localStorage.setItem("myapp-email", email)
          localStorage.setItem("myapp-password", password)
        } else {
          localStorage.setItem("rememberMe", JSON.stringify(false))
          localStorage.removeItem("myapp-email")
          localStorage.removeItem("myapp-password")
        }
        const response = await ky
          .post("/api/login", { json: { userNameOrEmail : email, password : password } })
          .json()
        if (response) {
          router.push("/")
        }
      } catch (error) {
        if (error instanceof HTTPError && error.response.status === 401) {
          const messages = "Invalid Email or Password"
  
          toast({
            description: messages,
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          })
        }
      }
    }
  
    const { t } = useTranslation("auth")
  
    return (
      <>
        <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "1.7fr 1fr",
            }}
            gap="2"
          >
       <GridItem rowSpan={2} colSpan={{ base: 2, md: 1 }} bg="rgba(248, 248, 248, 1)" bgColor={bgColor}>
       
   <Box ml={{base:"20px",lg:100}} mt={{base:"20px",lg:30}} >
   <Logo  w={{base:"50px",md:"60px",lg:"78px"}} />
   </Box>
      
            <Center >
            <LoginPic w={{ base:"504px",md:"504px", lg :"704px"}} h={{ base:"200px",sm:"604px",lg:"740px"}}  />
            </Center>
          
         
       
          </GridItem>
          <GridItem rowSpan={2} colSpan={{ base: 2, md: 1 }}>
          
            <Box minW={"100%"} h={"100vh"} bgColor={bgCOlor} >
              <Center>
               
                <Box
                  p={5}
                  w={{ base: "100%", md: "420px", sm: "420px" }}
                  mt={{lg:20,sm:0}}
                  alignContent={"center"}
                  justifyItems={"center"}
                  h={490}
                  bgColor={bgCOlor}
                  fontSize={"3xl"}
                  fontWeight={650}
                  display="flex"
                  flexDirection="column"
                  
                  justifyContent="center"
                >
                    <Hide below="sm">
                  <Center><Logo w={132} h={102} mt={200}/></Center>   
                  </Hide>
                  <Text
                    color={color2}
                    fontWeight={"700"}
                    fontStyle={"satochi"}
                    mt={{lg:70,sm:20}}
                    fontSize={{md:"1xl",lg:"35px"}}
                    letterSpacing={"0.18px"}
                  >
                    {t("login.page.heading")}
                  </Text>
                  <Text
                    color={color2}
                    fontWeight={"700"}
                    fontStyle={"satochi"}
                    fontSize={{md:"1xl",lg:"35px"}}
                    letterSpacing={"0.18px"}
                  >
                    {t("login.page.heading1")}
                  </Text>
  
                  <Formik
                    enableReinitialize
                    initialValues={{
                      userNameOrEmail: email || "",
                      password: password || "",
                      rememberMe: rememberMe,
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <FormControl>
                        <form onSubmit={handleSubmit}>
                          <Box w={{ base: "100%", md: "380px", sm: "380px" }} mt={10}>
                            <InputGroup mt="20px">
                              <InputControl
                                name="userNameOrEmail"
                                inputProps={{
                                  type: "text",
                             
                                  bgColor:"rgba(248, 248, 248, 1)",
                                  _placeholder: { color: color5 },
                                  placeholder: t("login.page.email.placeholder"),
                                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleEmailChange(e)
                                    handleChange(e)
                                  },
                                  onBlur: handleBlur,
                                  value: email,
                                  borderRadius: "8px",
                                  w: "100%",
                                  h: "61px",
                                }}
                                labelProps={{
                                  color: "rgba(40, 42, 66, 1)",
                                }}
                              />
                            </InputGroup>
                          </Box>
  
                          <Box w={{ base: "100%", md: "380px", sm: "380px" }}>
                            <InputGroup mt="16px">
                              <InputControl
                                name="password"
                                inputProps={{
                                  type: show ? "text" : "password",
                                  _placeholder: { color: color5 },
                                  placeholder: t(
                                    "login.page.password.placeholder",
                                  ),
                                  bgColor:"dark.100",
                                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    handlePasswordChange(e)
                                    handleChange(e)
                                  },
                                  onBlur: handleBlur,
  
                                  borderRadius: "8px",
                                  w: "100%",
                                  h: "61px",
                                  value: password,
                                }}
                                labelProps={{
                                  color: "rgba(40, 42, 66, 1)",
                                }}
                              />
  
                              <InputRightElement>
                                <IconButton
                                  bg={"none"}
                                  color={color4}
                                  _hover={{ bg: "none" }}
                                  onClick={handleClick}
                                  mt={"20px"}
                                  aria-label={""}
                                >
                                  {show ? (
                                    <AiOutlineEyeInvisible size={25} />
                                  ) : (
                                    <AiOutlineEye size={25} />
                                  )}
                                </IconButton>
                              </InputRightElement>
                            </InputGroup>
                          </Box>
  
                          <Box w={{ base: "100%", md: "394px", sm: "394px" }}>
                            <HStack mt={2} justify={"start"}>
                              <Checkbox
                                borderColor={color3}
                                isChecked={rememberMe}
                                onChange={(e) => {
                                  handleRememberMeChange(e)
                                  handleChange(e)
                                }}
                              >
                                <Text
                                  fontSize={"sm"}
                                  fontWeight={"normal"}
                                  color={"green.100"}
                                >
                                  {t("login.page.rememberMe")}
                                </Text>
                              </Checkbox>
  
                            
                            </HStack>
                          </Box>
  
                          <Button
                            w={{ base: "100%", md: "385px", sm: "385px" }}
                            h={"65px"}
                            mt={"46px"}
                            bg={"green.100"}
                            color={"white"}
                            borderRadius={"8px"}
                            _hover={{
                              bg: "white",
                              color: "green.100",
                              borderWidth: 2,
                              borderColor: "black",
                            }}
                            type="submit"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                          >
                            {t("common:buttons.login")}
                          </Button>
                        </form>
                      </FormControl>
                    )}
                  </Formik>
  
                
                </Box>
              </Center>
            </Box>{" "}
        
          </GridItem>
       
        </Grid>
      </>
    )
  }
  
  export default LoginScreen
  