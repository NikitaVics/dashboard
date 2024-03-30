import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import ky, { HTTPError } from "ky";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { CustomInput } from "../Input/customInput";
import { mutate } from "swr";

type FormItems = {
  // eslint-disable-next-line
  status: any;
  coachId?: string;
  coachData?: {
    name: string;
    coachId?: string;
    gender: string;
    successfulBookings: string;
    status?: string;
    image: File | string;
    phoneNo: string;
    email: string;
    experience: string;
  };
  onClose?: () => void;
};

function CoachDetails({ coachData, coachId, onClose }: FormItems) {
  const { t } = useTranslation("coach");
  const toast = useToast();

  const color2 = useColorModeValue(
    "rgba(67, 67, 69, 1)",
    "rgba(224, 224, 226, 1)"
  );

  const handleDeactivate = async (coachId: string | undefined) => {
    if (coachId) {
      try {
        const updatedValues = { coachId };
        if (coachId) {
          const response = await ky.put(`/api/coach/Activate/${coachId}`, {
            json: updatedValues,
          });

          if (response) {
            toast({
              description: "Successfully Activated",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            onClose?.();
            await mutate(`/api/coach?searchTerm=${""}`);
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

  const handleActivate = async (coachId: string | undefined) => {
    if (coachId) {
      try {
        const updatedValues = { coachId };
        if (coachId) {
          const response = await ky.put(`/api/coach/Activate/${coachId}`, {
            json: updatedValues,
          });

          if (response) {
            toast({
              description: "Successfully Deactivated",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            onClose?.();
            await mutate(`/api/coach?searchTerm=${""}`);
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

  const handleSubmit = async (values: FormItems) => {
    console.log(values);
    try {
      ("");
    } catch (error) {
      ("");
    }
  };

  const bgColor = useColorModeValue("light.200", "dark.300");
  const color = useColorModeValue("light.50", "dark.400");
  return (
    <Formik
      initialValues={{
        firstName: coachData?.name || "",
        image: coachData?.image || "",
        gender: coachData?.gender || "",
        email: coachData?.email || "",
        phoneNo: coachData?.phoneNo || "",
        experience: coachData?.experience || "",
        status: coachData?.status || "",
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldTouched, values }) => (
        <Form noValidate>
          {/* <Show below="sm">
            <Avatar
              src={
                typeof coachData?.image === "string"
                  ? coachData?.image
                  : undefined
              }
              size="lg"
            />
          </Show> */}
          <HStack justify={"space-between"}>
            <Flex alignItems={"center"} gap={6}>
              {/* <Hide below="sm"> */}
                <Avatar
                  src={
                    typeof coachData?.image === "string"
                      ? coachData?.image
                      : undefined
                  }
                  size="lg"
                />
              {/* </Hide> */}

              <Text>{coachData?.name}</Text>
            </Flex>

          
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
                  placeholder: t(`coach.name1`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
                }}
                name="firstName"
                isReadOnly
                onKeyUp={() => setFieldTouched("firstName")}
              />
            </GridItem>

            <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`coach.gender`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
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
                  placeholder: t(`coach.email`),
                  fontSize: "md",
                  fontWeight: "medium",
                  border: "none",
                  color: { color },
                  h: "45px",
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
                  placeholder: t(`coach.phone`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
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
                  placeholder: t(`coach.experience`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
                }}
                name="experience"
                onKeyUp={() => setFieldTouched("experience")}
              />
            </GridItem>

            <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`coach.status`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
                  value: values.status === true ? "Active" : "In-Active",
                  style: {
                    color:
                      values.status === true
                        ? "rgba(39, 174, 96, 1)"
                        : "rgba(235, 87, 87, 1)",
                  },
                }}
                name="status"
                isReadOnly
                onKeyUp={() => setFieldTouched("status")}
              />
            </GridItem>
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
            <GridItem
              rowSpan={1}
              colSpan={2}
              bgColor={bgColor}
              h={"75px"}
              borderRadius={"12px"}
              px={4}
              py={2}
            >
              <HStack gap={2}>
                <Text
                  fontSize={"43px"}
                  fontWeight={"700"}
                  color="rgba(39, 174, 96, 1)"
                >
                  {coachData?.successfulBookings}
                </Text>
                <Text fontSize={"14px"} color={color2}>
                  Succesfull Booking
                </Text>
              </HStack>
            </GridItem>
          </Grid>

          <Box maxW="full">
            {coachData?.status ? (
              <Button
                variant="outline"
                colorScheme="red"
                w="full"
                h={"80px"}
                onClick={() => handleActivate(coachId)}
              >
                Deactivate Coach
              </Button>
            ) : (
              <Button
                variant="outline"
                colorScheme="green"
                w="full"
                h={"80px"}
                onClick={() => handleDeactivate(coachId)}
              >
                Activate Coach
              </Button>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default CoachDetails;
