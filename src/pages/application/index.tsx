import Layout from "../components/Layout";
import PageContainer from "../components/PageContainer";
import {
  Box,
  Text,
  Grid,
  GridItem,
  HStack,
  Flex,
  Button,
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  IconButton,
  Avatar,
  useColorModeValue,
  Stack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import CalenderIcon from "../components/Icons/calenderIcon";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useTranslation from "next-translate/useTranslation";
import InActivateIcon from "../components/Icons/InActivate";
import EditIcon from "../components/Icons/EditIcon";
import MoreVertIcon from "../components/Icons/MoreVertIcon";
import { useDebounce } from "use-debounce";
import SearchIcon from "../components/Icons/searchIcon";
import { Formik } from "formik";
import Table from "@/components/Table";
import { InputControl } from "@/components/Input/Input";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import ApplicationForm from "@/components/applicationForm";
import { MemberProps } from "@/service/types";
import ky, { HTTPError } from "ky";

type EditTaxDetailsProps = {
  memberData: MemberProps;
};

const Application = ({ memberData }: EditTaxDetailsProps) => {
  const { t } = useTranslation("application");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = (memberId: MemberProps | undefined) => {
    setIsEditModalOpen(true);
    if (memberId) {
      // eslint-disable-next-line
      //@ts-ignore
      setMemberId(memberId);
    }
  };

  const [memberId, setMemberId] = useState("");
  const { data: memberList } = useSWR("/api/application/getApproved");
  const membersList = memberList?.data;
  const { data: revenueLists } = useSWR("/api/application/getPending");
  const revenueList = revenueLists?.data;
  const { data: membershipGrowths } = useSWR("/api/application/getRejected");
  const membershipGrowth = membershipGrowths?.data;
  const router = useRouter();
  const background = useColorModeValue("#fff", "#0D0D0D");

  const hover = useColorModeValue("rgba(237, 250, 241, 1)", "#181818;");

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 800);
  const { data: responseData } = useSWR(
    `/api/application?searchTerm=${debouncedSearchInput}`
  );
  const applicationData = responseData?.data;
  const isLoading = !responseData;
  const isDesktopView = useBreakpointValue({
    base: false,
    md: false,
    xl: true,
  });

  const handleDeactivate = async (memberId: string) => {
    if (memberId) {
      try {
        const updatedValues = { memberId };
        if (memberId) {
          const response = await ky.post(
            `/api/application/Deactivate/${memberId}`,
            {
              json: updatedValues,
            }
          );

          if (response) {
            toast({
              description: "Successfully Deactivated",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            await mutate(`/api/application`);
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

  const columnConfig = [
    {
      Header: t(`members.userName`),
      accessor: "name",
      // eslint-disable-next-line
      Cell: ({ row: { original } }: any) => (
        <HStack align="center" spacing={2}>
          <Avatar src={original.image} size="md" />
          <Text>{original.name}</Text>
        </HStack>
      ),
    },
    {
      Header: t(`members.email`),
      accessor: "email",
    },
    {
      Header: t(`members.phone`),
      accessor: "phoneNo",
    },
    {
      Header: t(`members.gender`),
      accessor: "gender",
    },
    {
      Header: t("common:menu.status"),
      accessor: "membershipStatus",
      Cell: ({ value }: { value: string }) => {
        let statusColor = "";
        let statusText = "";
        let borderColor = "";
        let textColor = "";

        if (value === "Approved") {
          statusColor = "green.50";
          borderColor = "rgba(39, 174, 96, 1)";
          textColor = "green.300";
          statusText = t("common:status.approved");
        } else if (value === "Pending") {
          statusColor = "rgba(254, 245, 237, 1)";
          borderColor = "rgba(244, 170, 105, 1)";
          textColor = "rgba(244, 170, 105, 1)";
          statusText = t("common:status.pending");
        } else {
          statusColor = "red.50";
          borderColor = "rgba(235, 87, 87, 1)";
          textColor = "red.200";
          statusText = t("common:status.rejected");
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

    {
      Header: t("common:menu.action"),
      // eslint-disable-next-line
      Cell: ({ row }: any) => {
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
                onClick={() => handleEditModalOpen(row?.original?.memberId)}
              >
                {t("common:buttons.view")}
              </MenuItem>

              {row?.original?.membershipStatus === "Approved" ? (
                <MenuItem
                  icon={<InActivateIcon />}
                  bgColor={background}
                  _hover={{ bgColor: hover }}
                  color="rgba(235, 87, 87, 1)"
                  onClick={() => handleDeactivate(row?.original?.memberId)}
                >
                  {t("common:buttons.reject")}
                </MenuItem>
              ) : (
                <MenuItem
                  bgColor={background}
                  _hover={{ bgColor: hover }}
                  color="rgba(39, 174, 96, 1)"
                  onClick={() => handleActivate(row?.original?.memberId)}
                >
                  {t("common:buttons.approve")}
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        );
      },
      textAlign: "center",
    },
  ];
  const toast = useToast();
  const handleActivate = async (memberId: string) => {
    if (memberId) {
      try {
        const updatedValues = { memberId };
        if (memberId) {
          const response = await ky.post(
            `/api/application/Activate/${memberId}`,
            {
              json: updatedValues,
            }
          );

          if (response) {
            toast({
              description: "Successfully Activated",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            await mutate(`/api/application`);
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
  return (
    <>
      <Layout title={""} description={""}>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 2fr)",
            sm: "repeat(2, 1fr)",
          }}
          gap="5"
          mt="10"
        >
          <GridItem rowSpan={1} colSpan={1}>
            <Box bgColor="#fff" h="139px" borderRadius="20px" px={6} py={6}>
              <Flex justify="space-between">
                <Text color="rgba(29, 29, 31, 1)">
                  {t(`application.totalMembers`)}
                </Text>
                <CalenderIcon />
              </Flex>
              <Flex
                justify={"space-between"}
                color={"rgba(39, 174, 96, 1)"}
                mt={10}
              >
                <HStack>
                  <Text fontSize={"16px"} fontWeight={"700"}>
                    {membersList}
                  </Text>
                  <Text fontSize={"13px"} fontWeight="400">
                    {t(`application.bookings`)}
                  </Text>
                </HStack>

                <Button
                  color="rgba(78, 203, 113, 1)"
                  p={"0"}
                  onClick={() => router.push("/members")}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  background={"none"}
                  _hover={{ bg: "none" }}
                >
                  {t(`application.details`)}
                </Button>
              </Flex>
            </Box>
          </GridItem>

          <GridItem rowSpan={1} colSpan={1}>
            <Box bgColor="#fff" h="139px" borderRadius="20px" px={6} py={6}>
              <Flex justify="space-between">
                <Text color="rgba(29, 29, 31, 1)">
                  {t(`application.totalRevenue`)}
                </Text>
                <CalenderIcon />
              </Flex>
              <Flex
                justify={"space-between"}
                color="rgba(244, 170, 105, 1)"
                mt={10}
              >
                <HStack>
                  <Text fontSize={"16px"} fontWeight={"700"}>
                    {revenueList}
                  </Text>
                  <Text fontSize={"13px"} fontWeight="400">
                    {t(`application.bookings`)}
                  </Text>
                </HStack>

                <Button
                  color="rgba(244, 170, 105, 1)"
                  p={"0"}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  background={"none"}
                  _hover={{ bg: "none" }}
                >
                  {t(`application.details`)}
                </Button>
              </Flex>
            </Box>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Box bgColor="#fff" h="139px" borderRadius="20px" px={6} py={6}>
              <Flex justify="space-between">
                <Text color="rgba(29, 29, 31, 1)">
                  {t(`application.members`)}
                </Text>
                <CalenderIcon />
              </Flex>
              <Flex
                justify={"space-between"}
                color="rgba(235, 87, 87, 1)"
                mt={10}
              >
                <HStack>
                  <Text fontSize={"16px"} fontWeight={"700"}>
                    {membershipGrowth}
                  </Text>
                  <Text fontSize={"13px"} fontWeight="400">
                    {t(`application.bookings`)}
                  </Text>
                </HStack>

                <Button
                  color="rgba(235, 87, 87, 1)"
                  p={"0"}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  background={"none"}
                  _hover={{ bg: "none" }}
                >
                  {t(`application.details`)}
                </Button>
              </Flex>
            </Box>
          </GridItem>
        </Grid>

        {isLoading ? (
          <TableSkeleton />
        ) : (
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
                <Box px={5}>
                  <InputControl
                    {...(isDesktopView && { width: "30%" })}
                    inputProps={{
                      type: "text",
                      placeholder: t(`members.search`),
                      fontSize: "md",
                      fontWeight: "medium",
                      color: "gray.500",
                      h: "64px",
                      value: searchInput,
                      onChange: (e) => setSearchInput(e.target.value),
                    }}
                    name="description"
                    inputRightElement={<SearchIcon />}
                  />
                </Box>
              </Formik>
              <Box mt={5}>
                <Table columns={columnConfig} data={applicationData} />
              </Box>
              {isEditModalOpen && (
                <>
                  <ApplicationForm
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    memberId={memberId}
                    memberData={memberData}
                  />
                </>
              )}
            </Stack>
          </PageContainer>
        )}
      </Layout>
    </>
  );
};

export default Application;
