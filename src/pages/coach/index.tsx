import {
  Avatar,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  Box,
  Stack,
  useBreakpointValue,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import PageContainer from "../components/PageContainer";
import useSWR, { mutate } from "swr";
import InActivateIcon from "../components/Icons/InActivate";
import MoreVertIcon from "../components/Icons/MoreVertIcon";
import useTranslation from "next-translate/useTranslation";
import Table from "@/components/Table";
import SearchIcon from "../components/Icons/searchIcon";
import { Formik } from "formik";
import { InputControl } from "@/components/Input/Input";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import PlusIcon from "../components/Icons/PlusIcon";
import EditIcon from "../components/Icons/EditIcon";
import { useState } from "react";
import CoachAddForm from "@/components/Forms/CoachAddForm";
import { AddCoachProps } from "@/service/types";
import CoachForm from "@/components/coachForm";
import ky, { HTTPError } from "ky";
import { useDebounce } from "use-debounce";

type EditCoachProps = {
  coaches: AddCoachProps;
};

const Coach = ({ coaches }: EditCoachProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 800);
  const { data: coachData } = useSWR(
    `/api/coach?searchTerm=${debouncedSearchInput}`
  );

  const { t } = useTranslation("coach");
  const background = useColorModeValue("#fff", "#0D0D0D");

  const [coachId, setCoachId] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditModalOpen = (coachId: AddCoachProps) => {
    setIsEditModalOpen(true);
    if (coachId) {
      // eslint-disable-next-line
      //@ts-ignore
      setCoachId(coachId);
    }
  };

  const hover = useColorModeValue("rgba(237, 250, 241, 1)", "#181818");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const columnConfig = [
    {
      Header: t(`coach.name`),
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
      Header: t(`coach.email`),
      accessor: "email",
    },
    {
      Header: t(`coach.phone`),
      accessor: "phoneNo",
    },
    {
      Header: t(`coach.gender`),
      accessor: "gender",
    },
    {
      Header: t(`coach.experience`),
      accessor: "exp",
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
                onClick={() => handleEditModalOpen(row?.original?.coachId)}
              >
                {t("common:buttons.view")}
              </MenuItem>
              {row?.original?.status === true ? (
                <MenuItem
                  icon={<InActivateIcon />}
                  bgColor={background}
                  _hover={{ bgColor: hover }}
                  color="rgba(235, 87, 87, 1)"
                  onClick={() => handleActivate(row?.original?.coachId)}
                >
                  {t("common:buttons.inActivate")}
                </MenuItem>
              ) : (
                <MenuItem
                  //  icon={<InActivateIcon />}

                  bgColor={background}
                  _hover={{ bgColor: hover }}
                  color="rgba(39, 174, 96, 1)"
                  onClick={() => handleDeactivate(row?.original?.coachId)}
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

  const toast = useToast();

  const handleActivate = async (coachId: string) => {
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
            await mutate(`/api/coach`);
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

  const handleDeactivate = async (coachId: string) => {
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
            await mutate(`/api/coach`);
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

  const isDesktopView = useBreakpointValue({
    base: false,
    md: false,
    xl: true,
  });
  const color = useColorModeValue("rgba(248, 248, 248, 1)", "dark.500");
  const isLoading = !coachData;
  return (
    <>
      <Layout title={t(`coach.title`)} description={""}>
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
                <HStack justifyContent="space-between" my={{ base: 3, md: 5 }}>
                  <Formik
                    initialValues={{
                      firstName: "",
                    }}
                    onSubmit={() => {}}
                  >
                    <InputControl
                      {...(isDesktopView && { width: "40%" })}
                      inputProps={{
                        type: "text",
                        placeholder: t(`coach.placeholder`),
                        fontSize: "md",
                        fontWeight: "medium",
                        color: "gray.500",
                        h: "61px",
                        value: searchInput,
                        onChange: (e) => setSearchInput(e.target.value),
                      }}
                      name="description"
                      inputRightElement={<SearchIcon />}
                    />
                  </Formik>

                  <Flex gap={5}>
                    <Button
                      leftIcon={<PlusIcon stroke={"#fff"} />}
                      bgColor={"rgba(78, 203, 113, 1)"}
                      fontSize="sm"
                      color="white"
                      textTransform="uppercase"
                      borderRadius={"51px"}
                      onClick={onOpen}
                    >
                      {t("common:buttons.addCoach")}
                    </Button>
                  </Flex>
                </HStack>
              </Formik>
              <Box mt={5}>
                <Table columns={columnConfig} data={coachData} />
              </Box>
              <Drawer
                placement="right"
                isOpen={isOpen}
                onClose={onClose}
                size="md"
              >
                <DrawerOverlay />
                <DrawerContent bgColor={color}>
                  <DrawerCloseButton
                    h="40px"
                    w="40px"
                    mt={3}
                    bgColor="rgba(0, 0, 0, 0.08)"
                  />
                  <DrawerHeader fontSize="28px" fontWeight="700">
                    {t(`coach.addTitle`)}
                  </DrawerHeader>

                  <DrawerBody px={8}>
                    <CoachAddForm image={undefined} onClose={onClose}/>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
              {isEditModalOpen && (
                <>
                  <CoachForm
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    coachId={coachId}
                    coachData={coaches}
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

export default Coach;
