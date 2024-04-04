import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Table from "@/components/Table";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import Layout from "../components/Layout";
import CalenderIcon from "../components/Icons/calenderIcon";
import MoreVertIcon from "../components/Icons/MoreVertIcon";
import InActivateIcon from "../components/Icons/InActivate";

import ky, { HTTPError } from "ky";
import { BookingsProps, MemberProps } from "@/service/types";

import { InputControl } from "@/components/Input/Input";
import { Formik } from "formik";
import { useDebounce } from "use-debounce";

import BookingForm from "@/components/bookingForm";
import PeakBooking from "../components/graph/peakbookingHour";
import PageContainer from "../components/PageContainer";
import ClockIcon from "../components/Icons/clockIcon";
import DailyBooking from "../components/graph/dailyBooking";
import EditIcon from "../components/Icons/EditIcon";
import SearchIcon from "../components/Icons/searchIcon";
import CustomDateRangePicker from "../DatePicker";

type EditTaxDetailsProps = {
  memberData: BookingsProps;
};

function Bookings({ memberData }: EditTaxDetailsProps) {
  const { t } = useTranslation("bookings");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = (bookingId: MemberProps | undefined) => {
    setIsEditModalOpen(true);
    if (bookingId) {
      // eslint-disable-next-line
      //@ts-ignore
      setMemberId(bookingId);
    }
  };

  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inputValue, setInputValue] = useState("");
  // eslint-disable-next-line
  const handleDateRangeSelect = (dateRange: any) => {
    if (dateRange.length > 0) {
      const startDate = dateRange[0].startDate;
      const endDate = dateRange[0].endDate;

      const formattedStartDate = formatDate(startDate);

      const formattedEndDate = endDate ? formatEndDate(endDate) : "";

      const formatInput = formatInputDate(startDate);
      const formatendDate = formatInputDate(endDate);

      const formattedQueryDate = `${formattedStartDate}`;
      const formattedEndingDate = `${formattedEndDate}`;
      setInputValue(`${formatInput}-${formatendDate}`);
      setDate(formattedQueryDate);
      setEndDate(formattedEndingDate);
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} 00:00:00.0000000`;
    setDate(formattedDate);

    return formattedDate;
  };

  const formatInputDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  const formatEndDate = (endDate: Date): string => {
    const year = endDate.getFullYear();
    const month = String(endDate.getMonth() + 1).padStart(2, "0");
    const day = String(endDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} 00:00:00.0000000`;
    setEndDate(formattedDate);

    return formattedDate;
  };

  const [memberId, setMemberId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 900);
  const { data: responseData } = useSWR(
    `/api/bookings/bookingDetails?bookerName=${debouncedSearchInput}&fromBookingDate=${date}&toBookingDate=${endDate}`
  );

  const { data: totalbookingsList } = useSWR("/api/bookings/totalBookings");
  const totalbookings = totalbookingsList?.result;

  const { data: cancelbookingsList } = useSWR(`/api/bookings/bookings`);

  const cancelbooking = cancelbookingsList?.result;

  const background = useColorModeValue("#fff", "#0D0D0D");

  const hover = useColorModeValue("rgba(237, 250, 241, 1)", "#181818;");

  const columnConfig = [
    {
      Header: t(`bookings.bookingName`),
      // eslint-disable-next-line
      Cell: ({ row: { original } }: any) => {
        return (
          <HStack align="center" spacing={2}>
            {original.bookingPersonImage ? (
              <Avatar src={original.bookingPersonImage} size="md" />
            ) : (
              <Avatar size="md" />
            )}
            <Text>{original.bookingPerson}</Text>
          </HStack>
        );
      },
    },
    {
      Header: t(`bookings.team`),
      accessor: "teamMembersImage",
      // eslint-disable-next-line
      Cell: ({ row: { original } }: any) => (
        <AvatarGroup>
          {(original.teamMembersImage || []).map(
            (image: string, index: number) => (
              <Avatar key={index} src={image} size="md" />
            )
          )}
          {Array.from({
            length: Math.max(0, 3 - (original.teamMembersImage || []).length),
          }).map((_, index) => (
            <Avatar key={`default-${index}`} size="md" />
          ))}
        </AvatarGroup>
      ),
    },
    {
      Header: t(`bookings.coach`),
      accessor: "coachImage",
      // eslint-disable-next-line
      Cell: ({ row: { original } }: any) => (
        <>
          {original.coachImage ? (
            <Avatar src={original.bookingPersonImage} size="md" />
          ) : (
            <Avatar size="md" />
          )}
        </>
      ),
    },
    {
      Header: t(`bookings.court`),
      accessor: "courtName",
    },
    {
      Header: t(`bookings.time`),
      accessor: "slotTime",
    },
    {
      Header: t("common:menu.status"),
      accessor: "status",
      Cell: ({ value }: { value: string }) => {
        let statusColor = "";
        let statusText = "";
        let borderColor = "";
        let textColor = "";

        if (value === "Booked") {
          statusColor = sentColor;
          borderColor = "rgba(39, 174, 96, 1)";
          textColor = "green.300";
          statusText = t("common:status.booked");
        } else if (value === "Pending") {
          statusColor = scheduleColor;
          borderColor = "rgba(244, 170, 105, 1)";
          textColor = "rgba(244, 170, 105, 1)";
          statusText = t("common:status.pending");
        } else {
          statusColor = cancelColor;
          borderColor = "rgba(235, 87, 87, 1)";
          textColor = "red.200";
          statusText = t("common:status.cancel");
        }

        return (
          <Flex
            h="34px"
            bgColor={statusColor}
            maxW="90px"
            alignItems="center"
            p={4}
            justify="center"
            borderRadius={"35px"}
            border={`1px solid ${borderColor}`}
            color={textColor}
          >
            {statusText}
          </Flex>
        );
      },
    },
    {
      Header: t("common:menu.action"),

      // eslint-disable-next-line
      Cell: ({ row }: any) => {
        const bookingDate = new Date(row.original.bookingDate);
        const currentDate = new Date();

        const isPastDate = bookingDate < currentDate;
        return (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MoreVertIcon />}
              variant="ghost"
              _hover={{ bg: "none" }}
            />
            <MenuList
              right="0"
              minWidth="120px"
              position="fixed"
              bgColor={background}
              zIndex={9999}
              transform="translateY(20px)"
            >
              <MenuItem
                icon={<EditIcon />}
                bgColor={background}
                _hover={{ bgColor: hover }}
                onClick={() => handleEditModalOpen(row?.original?.bookingId)}
              >
                View Booking
              </MenuItem>
              {row?.original?.status === "Booked" && !isPastDate && (
                <MenuItem
                  icon={<InActivateIcon />}
                  bgColor={background}
                  _hover={{ bgColor: hover }}
                  color="rgba(235, 87, 87, 1)"
                  onClick={() => handleDeactivate(row?.original?.bookingId)}
                >
                  {t("common:buttons.cancel")}
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        );
      },
      textAlign: "center",
    },
  ];

  const scheduleColor = useColorModeValue("rgba(254, 245, 237, 1)", "");

  const sentColor = useColorModeValue("green.50", "");

  const cancelColor = useColorModeValue("rgba(253, 238, 238, 1)", "");

  const toast = useToast();
  const handleDeactivate = async (bookingId: string) => {
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
              `/api/bookings/bookingDetails?bookerName=${debouncedSearchInput}&fromBookingDate=${date}&toBookingDate=${endDate}`
            );
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

  const isLoading = !responseData;

  const bgColor = useColorModeValue("light.300", "dark.600");
  const color = useColorModeValue("dark.700", "light.400");
  const color2 = useColorModeValue("dark.400", "light.50");

  const handleClearDate = () => {
      setDate("");
    };

  const [showPeakBooking, setShowPeakBooking] = useState(true);

  const handleClockIconClick = () => {
    setShowPeakBooking(!showPeakBooking);
  };

  return (
    <>
      <Layout title={t("bookings.title")} description={t("page.description")}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Box>
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(3, 4fr)",
                sm: "repeat(2, 1fr)",
              }}
              gap="5"
              mt="10"
            >
              <GridItem rowSpan={1} colSpan={1}>
                <Box
                  bgColor={bgColor}
                  h="170px"
                  borderRadius="20px"
                  px={6}
                  py={6}
                >
                  <Stack>
                    <Flex justify="space-between">
                      <Text color={color}>{t(`bookings.totalBookings`)}</Text>
                      <CalenderIcon />
                    </Flex>
                    <Flex justify={"space-between"} mt={14}>
                      <HStack>
                        <Text fontSize={"32px"} fontWeight={"700"}>
                          {totalbookings}
                        </Text>
                        <Text fontSize={"13px"} fontWeight="400" color={color2}>
                          {t(`bookings.day`)}
                        </Text>
                      </HStack>
                    </Flex>
                  </Stack>
                </Box>
              </GridItem>

              <GridItem rowSpan={1} colSpan={1}>
                <Box
                  bgColor={bgColor}
                  h="170px"
                  borderRadius="20px"
                  px={6}
                  py={6}
                >
                  <Stack>
                    <Flex justify="space-between">
                      <Text color={color}>
                        {t(`bookings.cancelledBookings`)}
                      </Text>
                      <CalenderIcon />
                    </Flex>
                    <Flex justify={"space-between"} mt={14}>
                      <HStack>
                        <Text
                          fontSize={"32px"}
                          fontWeight={"700"}
                          color={"rgba(235, 87, 87, 1)"}
                        >
                          {cancelbooking}
                        </Text>
                        <Text
                          fontSize={"13px"}
                          fontWeight="400"
                          color="red.200"
                        >
                          {t(`bookings.day`)}
                        </Text>
                      </HStack>
                    </Flex>
                  </Stack>
                </Box>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Box
                  bgColor={bgColor}
                  h="170px"
                  borderRadius="20px"
                  px={6}
                  py={6}
                >
                  <Flex justify="space-between">
                    <Text color={color}>
                      {showPeakBooking
                        ? t(`bookings.members`)
                        : t(`bookings.daily`)}
                    </Text>
                    <ClockIcon
                      onClick={handleClockIconClick}
                      cursor="pointer"
                    />
                  </Flex>

                  {showPeakBooking ? <PeakBooking /> : <DailyBooking />}
                </Box>
              </GridItem>
            </Grid>

            <PageContainer
              as="section"
              maxW="full"
              px="0"
              mt={{ base: 8, md: 18, lg: 10 }}
            >
              <Stack py={{ base: 3, md: 5 }}>
                <Formik
                  initialValues={{
                    firstName: "",
                  }}
                  onSubmit={() => {}}
                >
                  <HStack
                    justifyContent="space-between"
                    my={{ base: 3, md: 5 }}
                    mx="10px"
                  >
                    <Formik
                      initialValues={{
                        firstName: "",
                      }}
                      onSubmit={() => {}}
                    >
                      <InputControl
                        inputProps={{
                          type: "text",
                          placeholder: t(`bookings.search`),
                          fontSize: "md",
                          fontWeight: "medium",
                          color: "gray.500",
                          cursor: "text",
                          h: "61px",
                          value: searchInput,
                          onChange: (e) => setSearchInput(e.target.value),
                        }}
                        name="description"
                        inputRightElement={<SearchIcon />}
                      />
                    </Formik>

                    <CustomDateRangePicker
                      inputValue={inputValue}
                      onDateRangeSelect={handleDateRangeSelect}
                      onClear={handleClearDate}
                    />
                  </HStack>
                </Formik>
                <Box mt={5}>
                  <Table columns={columnConfig} data={responseData} />
                </Box>
                {isEditModalOpen && (
                  <>
                    <BookingForm
                      isOpen={isEditModalOpen}
                      onClose={() => setIsEditModalOpen(false)}
                      memberId={memberId}
                      memberData={memberData}
                    />
                  </>
                )}
              </Stack>
            </PageContainer>
          </Box>
        )}
      </Layout>
    </>
  );
}

export default Bookings;
