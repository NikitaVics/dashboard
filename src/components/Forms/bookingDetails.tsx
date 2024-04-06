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
  Text,
  useColorModeValue,
  useToast,
  Image,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import ky, { HTTPError } from "ky";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import * as Yup from "yup";
import { CustomInput } from "../Input/customInput";
import { mutate } from "swr";
import BookingsIcon from "@/pages/components/Icons/Bookings";

type FormItems = {
  memberId?: string;
  memberData?: {
    bookingStatus?: string;
    userName: string;
    userImage: string;
    bookingId: string;
    slot: string;
    bookingDate: string;
    tennisCourt?: {
      name: string;
      courtImages: string;
    };
    participatingMembers?: {
      name: string;
      imageUrl: string;
    };
  };
  onClose?: () => void;
};

function BookingDetails({ memberData, onClose }: FormItems) {
  const { t } = useTranslation("bookings");
  const toast = useToast();

  const handleDeActivate = async (bookingId: string | undefined) => {
    if (bookingId) {
      try {
        const updatedValues = { bookingId };
        if (bookingId) {
          const response = await ky.put(
            `/api/bookings/DeActivate/${bookingId}`,
            {
              json: updatedValues,
            }
          );

          if (response) {
            toast({
              description: "Successfully Cancelled",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            await mutate(
              `/api/bookings/bookingDetails?searchTerm=${``}&bookingDate=${``}`
            );
            onClose?.();
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
    try {
      console.log(values);
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 500) {
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t(`common:errors.requiredError`)),
    status: Yup.string(),
    description: Yup.string()
      .max(500, t(`common:errors.shouldBe225Char`))
      .required(t(`common:errors.requiredError`)),
  });

  const bgColor = useColorModeValue("light.200", "dark.300");
  const color = useColorModeValue("light.50", "dark.400");

  const isBookingDatePast =
    new Date(memberData?.bookingDate ?? "") < new Date();
  return (
    <Formik
      initialValues={{
        bookingId: memberData?.bookingId || "",
        slot: memberData?.slot || "",
        bookingDate: memberData?.bookingDate || "",
        bookingStatus: memberData?.bookingStatus || "",
        userName: memberData?.userName || "",
        userImage: memberData?.userImage || "",
        court: memberData?.tennisCourt?.name || "",
        courtImages: memberData?.tennisCourt?.courtImages || "",
        participatingMembers: memberData?.participatingMembers?.imageUrl || "",
        participatingName: memberData?.participatingMembers?.name || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldTouched }) => (
        <Form noValidate>
          <Show below="sm">
            <Avatar src={memberData?.userImage} size="lg" />
          </Show>
          <HStack justify={"space-between"}>
            <Flex alignItems={"center"} gap={6}>
              <Hide below="sm">
                <Avatar src={memberData?.userImage} size="lg" />
              </Hide>

              <Text>{memberData?.userName}</Text>
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

          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "stretch", md: "flex-start" }}
            justify={{ base: "flex-start", md: "space-between" }}
            mt={10}
            bgColor={bgColor}
            p={7}
            borderRadius="20px"
          >
            <Stack gap={memberData?.tennisCourt?.courtImages.length === 3 ? 20 : "" || memberData?.tennisCourt?.courtImages.length === 2 ? 8 : 8  } pt={8}>
              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`bookings.court`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
                }}
                name="court"
                isReadOnly
                onKeyUp={() => setFieldTouched("court")}
              />

              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`bookings.bookingid`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
                }}
                name="bookingId"
                isReadOnly
                onKeyUp={() => setFieldTouched("bookingId")}
              />

              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`bookings.date`),
                  fontSize: "md",
                  fontWeight: "medium",
                  border: "none",
                  color: { color },
                  h: "45px",
                }}
                name="bookingDate"
                isReadOnly
                onKeyUp={() => setFieldTouched("bookingDate")}
              />

              <CustomInput
                inputProps={{
                  type: "text",
                  placeholder: t(`bookings.time`),
                  fontSize: "md",
                  fontWeight: "medium",
                  color: { color },
                  border: "none",
                  h: "45px",
                }}
                name="slot"
                isReadOnly
                onKeyUp={() => setFieldTouched("slot")}
              />
            </Stack>

            <Box pt={8}>
              {Array.isArray(memberData?.tennisCourt?.courtImages) && (
                <>
                  {memberData.tennisCourt.courtImages.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Court Image ${index + 1}`}
                    />
                  ))}
                </>
              )}
            </Box>
          </Flex>

          <Grid
            templateRows="repeat(auto-fill, 1fr)"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
            }}
            gap="5"
            p={5}
            mt={5}
            borderRadius={"15px"}
            bgColor={bgColor}
          >
            <GridItem rowSpan={1} colSpan={2}>
              <Text fontSize="18px" fontWeight={"700"}>
                Team
              </Text>
            </GridItem>

           
            {Array.isArray(memberData?.participatingMembers) &&
  memberData.participatingMembers.map((participatingMember, index) => (
    <React.Fragment key={index}>
      {participatingMember.name === memberData?.userName ? (
        <GridItem rowSpan={1} colSpan={1}>
          <Flex align="center" gap={5}>
            <Avatar src={participatingMember.imageUrl} name={participatingMember.name} />
            <Text mt={2}>{participatingMember.name}</Text>
            <BookingsIcon stroke={"rgba(78, 203, 113, 1)"} mt={2} />
          </Flex>
        </GridItem>
      ) : (
        <GridItem key={index} rowSpan={1} colSpan={1}>
          <Flex align="center" gap={5}>
            <Avatar src={participatingMember.imageUrl} name={participatingMember.name} />
            <Text mt={2}>{participatingMember.name}</Text>
          </Flex>
        </GridItem>
      )}
    </React.Fragment>
  ))}

          </Grid>

          {!isBookingDatePast && memberData?.bookingStatus === "Booked" && (
            <Box maxW="full" mt={20}>
              <Button
                bgColor={"rgba(253, 238, 238, 1)"}
                color="rgba(238, 116, 116, 1)"
                border="1px solid rgba(238, 116, 116, 1)"
                w="full"
                h={"80px"}
                onClick={() => handleDeActivate(memberData?.bookingId)}
              >
                Cancel Bookings
              </Button>
            </Box>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default BookingDetails;
