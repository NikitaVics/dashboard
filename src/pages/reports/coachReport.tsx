import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Table from "@/components/Table";
import { Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import React, { ChangeEvent, useState } from "react";
import useSWR from "swr";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import { Input } from "@chakra-ui/react";
import DownloadIcon from "../components/Icons/downloadIcon";

function CoachReportDetails() {
  const { t } = useTranslation("reports");

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDates = event.target.value;
    const [year, month, day] = selectedDates.split("-");
    const reversedDate = `${year}-${month}-${day}`;
    setSelectedDate(reversedDate);
  };

  const [selected, setSelected] = useState("");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCoach = event.target.value;
    setSelected(selectedCoach);
  };

  const { data: responseData } = useSWR(
    `/api/reports/getCoachReports?bookingDate=${selectedDate}&coach=${selected}`
  );

  const { data: dropdownData } = useSWR(`/api/reports/coachDropdown`);

  const bgColor2 = useColorModeValue("rgba(248, 248, 248, 1)", "");

  const columnConfig = [
    {
      Header: t(`reports.coachName`),
      accessor: "coachImage",
      // eslint-disable-next-line
      Cell: ({ row: { original } }: any) => (
        <>
          <HStack align="center" spacing={2}>
            {original.coachImage ? (
              <Avatar src={original.coachImage} size="md" />
            ) : (
              <Avatar size="md" />
            )}
            <Text>{original.coachName}</Text>
          </HStack>
        </>
      ),
    },
    {
      Header: t(`reports.bookingPerson`),
      accessor: "bookingPersonImage",
      // eslint-disable-next-line
      Cell: ({ row: { original } }: any) => (
        <HStack align="center" spacing={2}>
          {original.bookingPersonImage ? (
            <Avatar src={original.bookingPersonImage} size="md" />
          ) : (
            <Avatar size="md" />
          )}
          <Text>{original.bookingPerson}</Text>
        </HStack>
      ),
    },
    {
      Header: t(`reports.team`),
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
      Header: t(`reports.court`),
      accessor: "courtName",
    },
    {
      Header: t(`reports.time`),
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
          statusColor =cancelColor;
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
  ];

  const scheduleColor = useColorModeValue("rgba(254, 245, 237, 1)","")

  const sentColor = useColorModeValue("green.50","")
  
  const cancelColor = useColorModeValue("rgba(253, 238, 238, 1)","")

  const isLoading = !responseData;

  const handleExport = async () => {
    try {
      const response = await fetch(
        `/api/reports/exportCoachReport?bookingDate=${selectedDate}&coach=${selected}`
      );
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Coach Reports.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const handleClearDate = () => {
    setSelectedDate("");
  };

  const handleClearCourt = () => {
    setSelected("");
  };

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Stack py={{ base: 3, md: 5 }}>
          <Formik
            initialValues={{
              firstName: "",
            }}
            onSubmit={() => {}}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="center"
            >
              <HStack>
                <Input
                  placeholder="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  type="date"
                  mb={{ base: 4, md: 0 }}
                  maxW={{ md: "352px" }}
                  h="60px"
                />
                {selectedDate && (
                  <IconButton
                    onClick={handleClearDate}
                    color="red.400"
                    aria-label={""}
                    bg="none"
                  >
                    <CloseButton />
                  </IconButton>
                )}
              </HStack>

              <Flex direction={{ base: "column", md: "row" }} gap={8}>
                <Select
                  placeholder="Coach"
                  w={{ md: "165px" }}
                  onChange={handleSelectChange}
                  bgColor={bgColor2}
                >
                  {dropdownData?.map((value: string) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
                {selected && (
                  <IconButton
                    onClick={handleClearCourt}
                    color="red.400"
                    aria-label={""}
                    bg="none"
                  >
                    <CloseButton />
                  </IconButton>
                )}

                <Button
                  py={3}
                  w={{ md: "165px" }}
                  onClick={handleExport}
                  variant="outline"
                  color="green.400"
                  fontWeight={500}
                  borderColor="green.400"
                  borderRadius={"8px"}
                  rightIcon={<DownloadIcon />}
                >
                  {t(`common:buttons.download`)}
                </Button>
              </Flex>
            </Flex>
          </Formik>
          <Box mt={5}>
            <Table columns={columnConfig} data={responseData} />
          </Box>
        </Stack>
      )}
    </>
  );
}

export default CoachReportDetails;
