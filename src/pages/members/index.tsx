import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Table from "@/components/Table";
import { Formik } from "formik";
import ky, { HTTPError } from "ky";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import Layout from "../components/Layout";
import PageContainer from "../components/PageContainer";
import { MemberProps } from "@/service/types";
import MoreVertIcon from "../components/Icons/MoreVertIcon";
import EditIcon from "../components/Icons/EditIcon";
import InActivateIcon from "../components/Icons/InActivate";
import MembersForm from "@/components/membersForm";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import SearchIcon from "../components/Icons/searchIcon";
import { InputControl } from "@/components/Input/Input";
import { useDebounce } from "use-debounce";
import ActivateIcon from "../components/Icons/activateIcon";

type EditTaxDetailsProps = {
  memberData: MemberProps;
};

function Member({ memberData }: EditTaxDetailsProps) {
  const { t } = useTranslation("members");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = (id: MemberProps | undefined) => {
    setIsEditModalOpen(true);
    if (id) {
      // eslint-disable-next-line
      //@ts-ignore
      setMemberId(id);
    }
  };

  const [memberId, setMemberId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 800);
  const { data: responseData } = useSWR(
    `/api/members?namefilter=${debouncedSearchInput}`
  );

  const data = responseData?.result;

  const background = useColorModeValue("#fff", "#0D0D0D");

  const hover = useColorModeValue("rgba(237, 250, 241, 1)", "#181818");
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
      // eslint-disable-next-line
      //@ts-ignore
      accessor: (row) => {
        const phone = row.phoneNumber
          ? `${row.countryCode} ${row.phoneNumber}`
          : "";
        return phone;
      },
    },
    {
      Header: t(`members.gender`),
      accessor: "gender",
    },
    {
      Header: t(`members.request`),
      accessor: "membershipStatus",
      Cell: ({ value }: { value: string }) => {
        let statusColor = "";
        let statusText = "";
        let borderColor = "";
        let textColor = "";

        if (value === "Approved") {
          statusColor = sentColor;
          borderColor = "rgba(39, 174, 96, 1)";
          textColor = "green.300";
          statusText = t("common:status.approved");
        } else if (value === "Pending") {
          statusColor = scheduleColor;
          borderColor = "rgba(244, 170, 105, 1)";
          textColor = "rgba(244, 170, 105, 1)";
          statusText = t("common:status.pending");
        } else {
          statusColor = cancelColor;
          borderColor = "rgba(235, 87, 87, 1)";
          textColor = "red.200";
          statusText = t("common:status.rejected");
        }

        return (
          <Flex
            h="34px"
            bgColor={statusColor}
            p={4}
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
      Header: t(`members.status`),
      accessor: "isActive",
      Cell: ({ value }: { value: boolean }) =>
        value === true ? (
          <Flex
            h="34px"
            bgColor={sentColor}
            maxW="90px"
            p={4}
            alignItems="center"
            justify="center"
            borderRadius={"35px"}
            border="1px solid"
            borderColor="green.200"
            color="green.300"
          >
            {t("common:status.active")}
          </Flex>
        ) : (
          <Flex
            h="34px"
            bgColor={cancelColor}
            p={4}
            maxW="90px"
            alignItems="center"
            justify="center"
            borderRadius={"35px"}
            border="1px solid"
            borderColor="red.100"
            color="red.200"
          >
            {t("common:status.inActive")}
          </Flex>
        ),
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
                onClick={() => handleEditModalOpen(row?.original?.id)}
              >
                {t("common:buttons.view")}
              </MenuItem>
              {row?.original?.isActive === true ? (
                <MenuItem
                  icon={<InActivateIcon />}
                  bgColor={background}
                  _hover={{ bgColor: hover }}
                  color="rgba(235, 87, 87, 1)"
                  onClick={() => handleDeactivate(row?.original?.id)}
                >
                  {t("common:buttons.inActivate")}
                </MenuItem>
              ) : (
                <MenuItem
                  icon={<ActivateIcon />}
                  bgColor={background}
                  _hover={{ bgColor: hover }}
                  color="rgba(39, 174, 96, 1)"
                  onClick={() => handleDeactivate(row?.original?.id)}
                >
                  {t("common:buttons.activate")}
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

  const handleDeactivate = async (id: string) => {
    if (id) {
      try {
        const updatedValues = { id };

        if (id) {
          const response = await ky.put(`/api/members/Activate/${id}`, {
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
            await mutate(`/api/members?namefilter=${""}`);
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
  const isDesktopView = useBreakpointValue({
    base: false,
    md: false,
    xl: true,
  });

  return (
    <>
      <Layout title={t("members.title")} description={t("page.description")}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <PageContainer
            as="section"
            maxW="full"
            px="0"
            mt={{ base: 8, md: 18, lg: 0 }}
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
                      cursor: "pointer",
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
                <Table columns={columnConfig} data={data} />
              </Box>
              {isEditModalOpen && (
                <>
                  <MembersForm
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
}

export default Member;
