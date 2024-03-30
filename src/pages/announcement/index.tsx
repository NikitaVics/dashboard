import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
  Stack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useBreakpointValue,
  MenuItem,
  useDisclosure,
  DrawerContent,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  useToast,

} from "@chakra-ui/react";
import Layout from "../components/Layout";
import useTranslation from "next-translate/useTranslation";
import Maintanence from "../components/Icons/maintanence";
import PlusIcon from "../components/Icons/PlusIcon";
import Event from "../components/Icons/event";
import Announce from "../components/Icons/announce";
import MaintainenceForm from "@/components/maintainence";
import { useState } from "react";
import EventsForm from "@/components/events";
import Announcement from "@/components/announcement";
import Table from "@/components/Table";
import MoreVertIcon from "../components/Icons/MoreVertIcon";
import useSWR, { mutate } from "swr";
import PageContainer from "../components/PageContainer";

import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import { InputControl } from "@/components/Input/Input";
import SearchIcon from "../components/Icons/searchIcon";
import { useDebounce } from "use-debounce";
import { Formik } from "formik";
import EditIcon from "../components/Icons/EditIcon";
import CourtMaintainence from "@/components/Forms/maintainence";
import AnnouncementForm from "@/components/Forms/announcement";
import EventAnnouncement from "@/components/Forms/EventAnnouncement";
import InActivateIcon from "../components/Icons/InActivate";
import ky, { HTTPError } from "ky";
import FilterIcon from "../components/Icons/FilterIcon";


const Announcemnet = () => {
  const { t } = useTranslation("announcement");
  const [selectedMenuItem, setSelectedMenuItem] = useState(""); 

  const handleMenuItemClick = (menuItem : string) => {
    setSelectedMenuItem(menuItem);
  };
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 800);
  const { data: announcementData } = useSWR(
    ` /api/announcement/getAnnouncement?announcementType=${debouncedSearchInput}${selectedMenuItem}`
  );
  const responseData = announcementData?.result;

  const [announcementId, setAnnouncementId] = useState("");
  const [courtId, setCourtId] = useState("");
  const [eventId, setEventId] = useState("");

  const handleAnnouncement = (id: string, announcementType: string) => {
    if (announcementType === "CourtMaintenance") {
      handleEditModalOpen();
      if (id) {
        // eslint-disable-next-line
        //@ts-ignore
        setCourtId(id);
      }
    } else if (announcementType === "EventAnnouncement") {
      handleEventModalOpen();
      if (id) {
        // eslint-disable-next-line
        //@ts-ignore
        setEventId(id);
      }
    } else if (announcementType === "Announcement") {
      handleAnnouncementOpen();
      if (id) {
        // eslint-disable-next-line
        //@ts-ignore
        setAnnouncementId(id);
      }
    }
  };

  const color = useColorModeValue("rgba(248, 248, 248, 1)", "dark.500");
  
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue("light.300", "dark.600");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const [isEventOpen, setIsEventOpen] = useState(false);
  const handleEventModalOpen = () => {
    setIsEventOpen(true);
  };
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState(false);
  const handleEvent = () => {
    setIsEventDrawerOpen(true);
  };
  

  const [addAnnouncementDrawerOpen, setAddAnnouncementDrawerOpen] = useState(false);

  const AddAnnouncementOpen = () => {
    setAddAnnouncementDrawerOpen(true);
  };
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const handleAnnouncementOpen = () => {
    setIsAnnouncementOpen(true);
  };
  const isLoading = !responseData;

  const background = useColorModeValue("#fff", "#0D0D0D");
  const isDesktopView = useBreakpointValue({
    base: false,
    md: false,
    xl: true,
  });

  
  const hover = useColorModeValue("rgba(237, 250, 241, 1)", "#181818");

  const toast = useToast()

  const handleDelete = async (id: string) => {
    if (id) {
      try {
        const updatedValues = { id };
        if (id) {
          const response = await ky.put(`/api/announcement/delete/${id}`, {
            json: updatedValues,
          });

          if (response) {
            toast({
              description: "Successfully Deleted",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            await mutate(`/api/announcement/getAnnouncement`);
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
      Header: t(`announce.type`),
      accessor: "announcementType",
    },
    {
      Header: t(`announce.message`),
      accessor: "message",
    },
    {
      Header: t(`announce.date`),
      accessor: "scheduledDate",
    },
    {
      Header: t(`announce.time`),
      accessor: "scheduledTime",
    },

    {
      Header: t("common:menu.status"),
      accessor: "eventStatus",
      Cell: ({ value }: { value: string }) => {
        let statusColor = "";
        let statusText = "";
        let borderColor = "";
        let textColor = "";

        if (value === "Sent") {
          statusColor = sentColor;
          borderColor = "rgba(39, 174, 96, 1)";
          textColor = "green.300";
          statusText = "sent";
        } else if (value === "Scheduled") {
          statusColor = scheduleColor;
          borderColor = "rgba(244, 170, 105, 1)";
          textColor = "rgba(244, 170, 105, 1)";
          statusText = "Scheduled";
        } else {
          statusColor = cancelColor;
          borderColor = "rgba(238, 110, 110, 1)";
          textColor = "rgba(238, 110, 110, 1)";
          statusText = "Cancelled";
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
      Header: t("common:menu.action"),
      // eslint-disable-next-line
      Cell: ({ row }: any) => {
        const eventStatus = row.original.eventStatus; 
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
                onClick={() => handleAnnouncement(row?.original?.id, row?.original?.announcementType)}
              >
                {t("common:buttons.view")}
              </MenuItem>
              {eventStatus === "Scheduled" && 
              <MenuItem
                icon={<InActivateIcon />}
                bgColor={background}
                _hover={{ bgColor: hover }}
               color = "rgba(235, 87, 87, 1)"
               onClick={() => handleDelete(row?.original?.id)}
              >
                {t("common:buttons.cancelSchedule")}
              </MenuItem>}
            </MenuList>
          </Menu>
        );
      },
      textAlign: "center",
    },
  ];

  const scheduleColor = useColorModeValue("rgba(254, 245, 237, 1)","")

const sentColor = useColorModeValue("green.50","")

const cancelColor = useColorModeValue("rgba(253, 238, 238, 1)","")

const borderColor = useColorModeValue("rgba(211, 211, 211, 1)","rgba(57, 57, 57, 1)")


  return (
    <>
      <Layout title={t(`announce.title`)} description={""}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
        <>
        <Grid
         templateRows="repeat(1, 1fr)"
         templateColumns={{
          //  base: "repeat(1, 1fr)",
          lg :"repeat(3, 1fr)",
           md: "repeat(2, 1fr)",
           sm: "repeat(1, 1fr)",
         }}
         gap="5"
         mt="10">
        <GridItem rowSpan={1} colSpan={1}>
        <Box  bgColor={bgColor} h="150px"   borderRadius="20px" px={3} py={8}>
            <Flex gap={10}>
            <Maintanence  />
              <Stack gap={4} >
            <Text  fontSize={"18px"} fontWeight={"700"} >{t(`announce.maintain`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)"
             fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={onOpen} leftIcon={<PlusIcon />}>{t(`announce.create`)}</Button>
            </Stack>
          
            </Flex>
           
        </Box>
        </GridItem>
       
       
        <GridItem rowSpan={1} colSpan={1}>
        <Box  bgColor={bgColor} h="150px"   borderRadius="20px" px={3} py={8} >
        <Flex gap={10}>
        <Event />
              <Stack gap={4}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`announce.event`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"}  textAlign={"center"}
             border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer"  onClick={()=>handleEvent()} leftIcon={<PlusIcon />}>{t(`announce.create`)}</Button>
            </Stack>
         
            </Flex>
           
        </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
         <Box  bgColor={bgColor} h="150px"   borderRadius="20px" px={3} py={8}>
         <Flex gap={10}>
             
           <Announce />
            <Stack gap={4}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`announce.announce`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)"
             fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>AddAnnouncementOpen()} leftIcon={<PlusIcon />}>{t(`announce.create`)}</Button>
            </Stack> 
            </Flex>
           
        </Box>
        </GridItem>
        
      </Grid>
      <PageContainer    as="section"
            maxW="full"
            p="3"
            mt={{ base: 8, md: 18, lg: 8 }}>
              <Stack py={{ base: 3, md: 5 }}>
                <Formik
                  initialValues={{
                    firstName: "",
                  }}
                  onSubmit={() => {}}
                >
                
                  <Flex px={5} align="center" gap={10}>
                    <InputControl
                      {...(isDesktopView && { width: "30%" })}
                      inputProps={{
                        type: "text",
                        placeholder: t(`announce.search`),
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


<Menu>
      <MenuButton
        as={IconButton}
        icon={<FilterIcon />}
        variant="ghost"
        _hover={{ bg: "none" }}
        h={"55px"}
        w={"60px"}
        border="1px solid"
        borderColor={borderColor}
      />
      <MenuList
        left="0"
        position="fixed"
        bgColor={background}
               
        zIndex={9999}
        transform="translateY(20px)"
      >
        <MenuItem
           bgColor={background}
           _hover={{ bgColor: hover }}
          onClick={() => handleMenuItemClick("CourtMaintenance")}
        >
          Court Maintenance
        </MenuItem>
        <MenuItem
         bgColor={background}
         _hover={{ bgColor: hover }}
          onClick={() => handleMenuItemClick("EventAnnouncement")}
        >
          Event Announcement
        </MenuItem>
        <MenuItem
           bgColor={background}
           _hover={{ bgColor: hover }}
          onClick={() => handleMenuItemClick("Announcement")}
        >
          Announcement
        </MenuItem>
      </MenuList>
    </Menu>
                  </Flex>
                 
                </Formik>
                <Box>
                 <Table columns={columnConfig} data={responseData} /> 
                </Box>
                <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bgColor={color}>
        <DrawerCloseButton
          h="40px"
          w="40px"
          mt={3}
          bgColor="rgba(0, 0, 0, 0.08)"
        />
        <DrawerHeader fontSize="28px" fontWeight="700">
          {t(`announce.courtAnnouncement`)}
        </DrawerHeader>

        <DrawerBody>
       
       
       <CourtMaintainence message={undefined} onClose={onClose} courtId={""} />
          
        </DrawerBody>
      </DrawerContent>
    </Drawer>

   {addAnnouncementDrawerOpen &&  <Drawer placement="right"  isOpen={addAnnouncementDrawerOpen}
        onClose={() => setAddAnnouncementDrawerOpen(false)} size="md" >
      <DrawerOverlay />
      <DrawerContent bgColor={color}>

        <DrawerCloseButton  h="40px" w="40px" mt={3} bgColor="rgba(0, 0, 0, 0.08)"/>
        <DrawerHeader fontSize="28px" fontWeight="700">{t(`announce.announce`)}</DrawerHeader>

        <DrawerBody>
      
   <AnnouncementForm message={undefined} onClose={onClose} id={""}   />
          
        </DrawerBody>
      </DrawerContent>
    </Drawer> }

    {isEventDrawerOpen && 
    <Drawer placement="right" isOpen={isEventDrawerOpen}
    onClose={() => setIsEventDrawerOpen(false)} size="md">
    <DrawerOverlay />
    <DrawerContent bgColor={color}>
      <DrawerCloseButton
        h="40px"
        w="40px"
        mt={3}
        bgColor="rgba(0, 0, 0, 0.08)"
      />
      <DrawerHeader fontSize="28px" fontWeight="700">
        {t(`announce.eventAnnoun`)}
      </DrawerHeader>

      <DrawerBody>
        <EventAnnouncement  onClose={onClose} id={""} />
      </DrawerBody>
    </DrawerContent>
  </Drawer>}



                {isEditModalOpen && (
                  <>
                    <MaintainenceForm
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)} id={courtId}                      
                    />
                  </>
                )}

                {isEventOpen && (
                  <>
                    <EventsForm
                      isOpen={isEventOpen}
                      onClose={() => setIsEventOpen(false)}
                      id={eventId}
                    />
                  </>
                )}

                {isAnnouncementOpen && (
                  <>
                    <Announcement
                      isOpen={isAnnouncementOpen}
                      onClose={() => setIsAnnouncementOpen(false)}
                      id={announcementId}
                      
                    />
                  </>
                )}
              </Stack>
            </PageContainer>
          </>
        )}
      </Layout>
    </>
  );
};

export default Announcemnet;
