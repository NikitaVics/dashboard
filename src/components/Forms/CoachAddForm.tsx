import {
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  useColorModeValue,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import ky, { HTTPError } from "ky";
import { ChangeEvent, useState } from "react";
import { mutate } from "swr";

import * as Yup from "yup";
import { InputControl } from "../Input/Input";
import DatePicker from "@/pages/coachDatePicker";
import { CloseIcon } from "@chakra-ui/icons";

type FormItems = {
  gender: string | Blob;
  email: string | Blob;
  phoneNumber: string | Blob;
  experience: string | Blob;
  lastName: string | Blob;
  firstName: string | Blob;
  // eslint-disable-next-line
  image: any;
  coachData?: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phoneNumber: string;
    experience: string;
    image: string;
  };
  onClose?: () => void;
};

const CoachAddForm = ({ coachData, onClose }: FormItems) => {
  const { t } = useTranslation("coach");
  const color = useColorModeValue(
    "rgba(254, 254, 254, 1)",
    "rgba(14, 14, 14, 1)"
  );
  const borderColor = useColorModeValue(
    "rgba(211, 211, 211, 1)",
    "rgba(57, 57, 57, 1)"
  );
  const bgColor = useColorModeValue("light.200", "dark.300");
  const toast = useToast();

  const [gender, setGender] = useState("");

  const handleGenderChange = (
    e: ChangeEvent<HTMLSelectElement>,
    setFieldTouched: (
      field: string,
      touched?: boolean,
      shouldValidate?: boolean
    ) => void
  ) => {
    setGender(e.target.value);
    setFieldTouched("gender", true);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [image, setImage] = useState<File | string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files) {
      const selectedImage = e.target.files[0];

      const allowedExtensions = ["jpg", "jpeg", "png", "svg"];
      const fileNameParts = selectedImage.name.split(".");
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        toast({
          description: "Only JPG, JPEG, PNG, and SVG files are allowed.",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setImage(selectedImage);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  const handleSubmit = async (values: FormItems) => {
    if (gender) {
      try {
        const data = new FormData();
        data.append("FirstName", values.firstName);
        data.append("LastName", values.lastName);
        data.append("Gender", gender);
        data.append("CoachFrom", selectedDate?.toISOString() || "");
        data.append("PhoneNumber", values.phoneNumber);
        data.append("Email", values.email);
        data.append("Image", image);

        const response = await ky.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Coach`,
          {
            body: data,
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
          onClose?.();
          await mutate(`/api/coach`);
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
    } else {
      toast({
        description: "Gender is required",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const emailRules = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .max(20, "First name must be at most 20 characters")
      .matches(
        /^[a-zA-Z]+$/,
        "First name must contain only letters and no spaces"
      ),
    lastName: Yup.string()
      .required("Last name is required")
      .max(20, "Last name must be at most 20 characters")
      .matches(
        /^[a-zA-Z]+$/,
        "Last name must contain only letters and no spaces"
      ),
    email: Yup.string()
      .required("Email is Required")
      .test("is-email", "Invalid Email address", function (value) {
        if (!value || value.trim() === "") {
          return false;
        }
        return emailRules.test(value);
      }),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .min(7, "Phone number must be at least 7 digits")
      .max(15,"Phone number must be at most 15 digits")
      .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
  };

  return (
    <Formik
      initialValues={{
        firstName: coachData?.firstName || "",
        lastName: coachData?.lastName || "",
        email: coachData?.email || "",
        gender: coachData?.gender || "",
        phoneNumber: coachData?.phoneNumber || "",
        experience: coachData?.experience || "",
        image: coachData?.image || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldTouched, touched }) => (
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
              <InputControl
                inputProps={{
                  h: "60px",
                  placeholder: t(`coach.firstName`),
                  bgColor: bgColor,
                  focusBorderColor: "rgba(78, 203, 113, 1)",
                  borderRadius: "10px",
                }}
                name="firstName"
                onKeyUp={() => setFieldTouched("firstName")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <InputControl
                inputProps={{
                  h: "60px",
                  borderRadius: "10px",
                  placeholder: t(`coach.lastName`),
                  bgColor: bgColor,
                  focusBorderColor: "rgba(78, 203, 113, 1)",
                }}
                name="lastName"
                onKeyUp={() => setFieldTouched("lastName")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <InputControl
                inputProps={{
                  h: "60px",
                  borderRadius: "10px",
                  placeholder: t(`coach.email`),
                  bgColor: bgColor,
                  focusBorderColor: "rgba(78, 203, 113, 1)",
                }}
                name="email"
                onKeyUp={() => setFieldTouched("email")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <InputControl
                inputProps={{
                  borderRadius: "10px",
                  h: "60px",
                  placeholder: t(`coach.phone`),
                  bgColor: bgColor,
                  focusBorderColor: "rgba(78, 203, 113, 1)",
                }}
                name="phoneNumber"
                onKeyUp={() => setFieldTouched("phoneNumber")}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <Select
                h="60px"
                placeholder={t(`coach.gender`)}
                value={gender}
                onChange={(e) => handleGenderChange(e, setFieldTouched)}
                bgColor={bgColor}
                borderRadius={"10px"}
                focusBorderColor="rgba(78, 203, 113, 1)"
                isInvalid={!gender && touched.gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              {touched.gender && !gender && (
                <Text color="red.500" fontSize="sm" mt={2}>
                  Gender is Required
                </Text>
              )}
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <DatePicker
                onDateSelect={handleDateSelect}
                onClear={handleClearDate}
                value={null}
                placeholder={"Coach From"}
                border={""}
              />
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <div
                style={{
                  position: "relative",
                  border: `1px solid ${borderColor}`,
                  borderRadius: "4px",
                  height: "120px",
                  backgroundColor: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {image ? (
                  <>
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt="Uploaded"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                    <IconButton
                      icon={<CloseIcon />}
                      aria-label="Remove Image"
                      onClick={handleRemoveImage}
                      position="absolute"
                      top="2"
                      right="2"
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                      color="red.500"
                      zIndex={2}
                    />
                  </>
                ) : (
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
                    <Flex></Flex>
                    <Text ml={2} color={"rgba(124, 124, 125, 1)"}>
                      + Images
                    </Text>
                  </label>
                )}
              </div>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <Button
                mt={20}
                w={{ base: "100%", md: "450px" }}
                bgColor="rgba(78, 203, 113, 1)"
                color="#fff"
                h="80px"
                _hover={{
                  bg: "none",
                  color: "rgba(78, 203, 113, 1)",
                  border: "1px solid rgba(78, 203, 113, 1)",
                }}
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
