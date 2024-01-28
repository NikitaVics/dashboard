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

type EditTaxDetailsProps = {
  memberData: MemberProps;
};

function Member({ memberData }: EditTaxDetailsProps) {
  const { t } = useTranslation("members");
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
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 800);
  const { data: responseData } = useSWR(
    `/api/members?searchTerm=${debouncedSearchInput}`
  );

  const background = useColorModeValue("#fff", "#0D0D0D");

<<<<<<< HEAD
  const hover = useColorModeValue("rgba(237, 250, 241, 1)", "#181818;");
=======
 
const hover  = useColorModeValue("rgba(237, 250, 241, 1)","#181818")
>>>>>>> 7ba26a094e95714352b40b20db2a2c02f042f9e9
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
      Header: t(`members.member`),
      accessor: "memberSince",
    },
    {
      Header: t("common:menu.status"),
      accessor: "status",
      Cell: ({ value }: { value: boolean }) =>
        value === true ? (
          <Flex
            h="34px"
            bgColor="green.50"
            maxW="90px"
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
            bgColor="red.50"
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
                onClick={() => handleEditModalOpen(row?.original?.memberId)}
              >
                {t("common:buttons.view")}
              </MenuItem>
              {row?.original?.status === true ? (
                <MenuItem
                  icon={<InActivateIcon />}
                  bgColor={background}
                  _hover={{ bgColor: hover }}
                  color="rgba(235, 87, 87, 1)"
                  onClick={() => handleActivate(row?.original?.memberId)}
                >
                  {t("common:buttons.inActivate")}
                </MenuItem>
              ) : (
                <MenuItem
                  //  icon={<InActivateIcon />}

                  bgColor={background}
                  _hover={{ bgColor: hover }}
                  color="rgba(39, 174, 96, 1)"
                  onClick={() => handleDeactivate(row?.original?.memberId)}
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
<<<<<<< HEAD
  ];

  const toast = useToast();
=======
  ]
 
  const toast = useToast()
 

>>>>>>> 7ba26a094e95714352b40b20db2a2c02f042f9e9

  const handleActivate = async (memberId: string) => {
    if (memberId) {
      try {
        const updatedValues = { memberId };
        if (memberId) {
          const response = await ky.post(`/api/members/Activate/${memberId}`, {
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
            await mutate(`/api/members`);
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

  const handleDeactivate = async (memberId: string) => {
    if (memberId) {
      try {
        const updatedValues = { memberId };
        if (memberId) {
          const response = await ky.post(`/api/members/Activate/${memberId}`, {
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
            await mutate(`/api/members`);
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
                <Table columns={columnConfig} data={responseData} />
              </Box>
              {isEditModalOpen && (
                <>
                  <MembersForm
                    isOpen={isEditModalOpen}
<<<<<<< HEAD
                    onClose={() => setIsEditModalOpen(false)}
                    memberId={memberId}
                    memberData={memberData}
                  />
                </>
=======
                    onClose={() => setIsEditModalOpen(false)} memberId={memberId} memberData={memberData} /></>
             
>>>>>>> 7ba26a094e95714352b40b20db2a2c02f042f9e9
              )}
            </Stack>
          </PageContainer>
        )}
      </Layout>
    </>
  );
}

export default Member;
