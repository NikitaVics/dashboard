import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import ky, { HTTPError } from "ky";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import * as Yup from "yup";
import { CustomInput } from "../Input/customInput";
import useSWR, { mutate } from "swr";

type FormItems = {
  // eslint-disable-next-line
  membershipStatus: any;
  // eslint-disable-next-line
  status: any;
  memberId?: string;
  memberData?: {
    name: string;
    id?: string;
    gender: string;
    isActive?: string;
    membershipLeft: string;
    countryCode : string
    age: string;
    image: string;
    phoneNumber: string;
    membershipStatus: string;
    email: string;
    registrationDate: string;
    membershipExpirationCountDown: string;
  };
  onClose?: () => void;
};

const getColorForStatus = (status: string) => {
  switch (status) {
    case "Rejected":
      return "rgba(235, 87, 87, 1)";
    case "Pending":
      return "rgba(237, 181, 73, 1)";
    default:
      return "rgba(39, 174, 96, 1)";
  }
};

function MembersDetails({ memberData, memberId, onClose }: FormItems) {
  const { t } = useTranslation("members");
  const toast = useToast();

  const { data: succesData } = useSWR(
    ` /api/members/getSuccessBookings?id=${memberId}`
  );

  const { data: cancelledData } = useSWR(
    `/api/members/getCancelledBookings?id=${memberId}`
  );

  const color2 = useColorModeValue(
    "rgba(67, 67, 69, 1)",
    "rgba(224, 224, 226, 1)"
  );

  const handleDeactivate = async (id: string | undefined) => {
    if (id) {
      try {
        const updatedValues = { id };

        if (
          memberData?.membershipStatus === "Rejected" ||
          memberData?.membershipStatus === "Pending"
        ) {
          const response = await ky.put(`/api/members/Approve/${id}`, {
            json: updatedValues,
          });

          if (response) {
            toast({
              description: "Successfully Updated",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            onClose?.();
            await mutate(`/api/members?searchTerm=${""}`);
          }
        } else {
          toast({
            description: "Already Approved",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
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
        } else {
          console.error(error);
        }
      }
    }
  };

  const handleActivate = async (id: string | undefined) => {
    if (id) {
      try {
        const updatedValues = { id };

        if (
          memberData?.membershipStatus === "Approved" ||
          memberData?.membershipStatus === "Pending"
        ) {
          const response = await ky.put(`/api/members/Approve/${id}`, {
            json: updatedValues,
          });

          if (response) {
            toast({
              description: "Successfully Updated",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            onClose?.();
            await mutate(`/api/members?searchTerm=${""}`);
          }
        } else {
          toast({
            description: "Already Rejected",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
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
        } else {
          console.error(error);
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t(`common:errors.requiredError`)),
    status: Yup.string(),
    description: Yup.string()
      .max(500, t(`common:errors.shouldBe225Char`))
      .required(t(`common:errors.requiredError`)),
  });

  const bgColor = useColorModeValue("light.200", "dark.300");
  const color = useColorModeValue("light.50", "dark.400");

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  }

  const id = memberData?.id;

  return (
    <Formik
      initialValues={{
        name: memberData?.name,
        image: memberData?.image,
        gender: memberData?.gender,
        email: memberData?.email,
        age: memberData?.age,
        countryCode : memberData?.countryCode,
        membershipLeft: memberData?.membershipLeft,
        phoneNumber: memberData?.phoneNumber,
        membershipStatus: memberData?.membershipStatus,
        registrationDate: formatDate(memberData?.registrationDate || ""),
        status: memberData?.isActive,
        membershipExpirationCountDown:
          memberData?.membershipExpirationCountDown,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldTouched, values }) => (
        <Form noValidate>
          {/* <Show below="sm">
            <Avatar src={memberData?.image} size="lg" />
          </Show> */}
          <HStack justify={"space-between"}>
            <Flex alignItems={"center"} gap={6}>
              {/* <Hide below="sm"> */}
                <Avatar src={memberData?.image} size="lg" />
              {/* </Hide> */}

              <Text>{memberData?.name}</Text>
            </Flex>

            {/* <Button
              bg="none"
              fontSize="16px"
              color="green.100"
              _hover={{ bg: "none" }}
              fontWeight={"400"}
            >
              Edit Profile
            </Button> */}
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
                  color: { color },
                  border: "none",
                  h: "45px",
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
                  placeholder: t(`members.age`),
                  fontSize: "md",
                  fontWeight: "medium",
                  border: "none",
                  color: { color },
                  h: "45px",
                }}
                name="age"
                isReadOnly
                onKeyUp={() => setFieldTouched("age")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`members.email`),
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
                  placeholder: t(`members.phone`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
                  value: `${memberData?.countryCode || ''} ${memberData?.phoneNumber || ''}`,
                }}
                name="phoneNumber"
                isReadOnly
                onKeyUp={() => setFieldTouched("phoneNumber")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`members.member`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
                }}
                name="registrationDate"
                isReadOnly
                onKeyUp={() => setFieldTouched("registrationDate")}
              />
            </GridItem>

            <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`members.request`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: getColorForStatus(values.membershipStatus),
                  border: "none",
               
                  h: "45px",
                }}
                name="membershipStatus"
                isReadOnly
                onKeyUp={() => setFieldTouched("membershipStatus")}
              />
            </GridItem>

            <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`members.status`),
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
            <GridItem rowSpan={2} colSpan={1}>
              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`members.membership`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "rgba(244, 166, 98, 1)",
                  border: "none",
                  h: "45px",
                }}
                name="membershipLeft"
                isReadOnly
                onKeyUp={() => setFieldTouched("membershipLeft")}
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
            <Box
              bgColor={bgColor}
              h={"122px"}
              borderRadius={"12px"}
              px={4}
              py={3}
            >
              <GridItem rowSpan={1} colSpan={1}>
                <Stack>
                  <Text fontSize={"43px"} fontWeight={"700"} color="green.300">
                    {succesData}
                  </Text>
                  <Text fontSize={"14px"} color={color2}>
                    Successful Booking
                  </Text>
                </Stack>
              </GridItem>
            </Box>
            <Box
              bgColor={bgColor}
              h={"122px"}
              borderRadius={"12px"}
              px={4}
              py={3}
            >
              <GridItem rowSpan={1} colSpan={1}>
                <Stack>
                  <Text fontSize={"43px"} fontWeight={"700"} color="red.200">
                    {cancelledData}
                  </Text>
                  <Text fontSize={"14px"} color={color2}>
                    Cancelled Booking
                  </Text>
                </Stack>
              </GridItem>
            </Box>
          </Grid>

          <Flex gap={4} maxW="full">
            <Button
              bgColor={"rgba(253, 238, 238, 1)"}
              color="rgba(238, 116, 116, 1)"
              border="1px solid rgba(238, 116, 116, 1)"
              w="full"
              h={"60px"}
              onClick={() => handleActivate(id)}
            >
              Reject
            </Button>

            <Button
              variant="outline"
              color={"white"}
              bgColor={"green.100"}
              w="full"
              _hover={{ color: "green.100", border: "1px solid rgba(78, 203, 113, 1)", bg:"none" }}
              h={"60px"}
              onClick={() => handleDeactivate(id)}
            >
              Approve
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default MembersDetails;
