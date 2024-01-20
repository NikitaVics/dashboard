import { Box, Button, Flex, Grid, GridItem,Text, useColorModeValue, Stack, IconButton, Menu, MenuButton,  MenuList } from "@chakra-ui/react"
import Layout from "../components/Layout"
import useTranslation from "next-translate/useTranslation"
import Maintanence from "../components/Icons/maintanence"
import PlusIcon from "../components/Icons/PlusIcon"
import Event from "../components/Icons/event"
import Announce from "../components/Icons/announce"
import MaintainenceForm from "@/components/maintainence"
import { useState } from "react"
import EventsForm from "@/components/events"
import Announcement from "@/components/announcement"
import Table from "@/components/Table"
import MoreVertIcon from "../components/Icons/MoreVertIcon"
import useSWR from "swr"
import PageContainer from "../components/PageContainer"

import TableSkeleton from "@/components/Skeleton/TableSkeleton"




const Announcemnet = () => {
    const {t} = useTranslation("announcement")

    const { data: announcementData } = useSWR(
      `/api/announcement/getAnnouncement`,
    )
    const responseData = announcementData?.result;



    const bgColor = useColorModeValue("light.300","dark.600")
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const handleEditModalOpen = () => {
     
      setIsEditModalOpen(true)
     
    }

    const [isEventOpen, setIsEventOpen] = useState(false)
    const handleEventModalOpen = () => {
     
      setIsEventOpen(true)
     
    }

    const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)
    const handleAnnouncementOpen = () => {
     
      setIsAnnouncementOpen(true)
     
    }
    const isLoading = !responseData

    const background = useColorModeValue("#fff","#0D0D0D")





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
            statusColor = "green.50";
            borderColor = "rgba(39, 174, 96, 1)";
            textColor = "green.300";
            statusText = "sent";
          } else if (value === "Scheduled") {
            statusColor = "rgba(254, 245, 237, 1)";
            borderColor = "rgba(244, 170, 105, 1)";
            textColor = "rgba(244, 170, 105, 1)";
            statusText = "Scheduled";
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
        Header:  t("common:menu.action"),
         // eslint-disable-next-line
        Cell: ({ row }: any) => {
          return (
            <Menu >
              <MenuButton
                as={IconButton}
                icon={<MoreVertIcon />}
                variant="ghost"
                 _hover = {{bg:"none"}}
              />
              <MenuList
                right="0"
                minWidth="120px"
                position="fixed"
                bgColor={background}
               
                zIndex={9999}
                transform="translateY(20px)"
               
              >
                {/* <MenuItem
                  icon={<EditIcon />}
                 
                  bgColor={background}
                  _hover = {{bgColor : hover}}
                  // onClick={() => handleEditModalOpen(row?.original?.memberId)}
                >
                  {t("common:buttons.view")}
                </MenuItem>
                {row?.original?.status === true ? 
                <MenuItem
                  icon={<InActivateIcon />}
                 
                  bgColor={background}
                  _hover = {{bgColor : hover}}
                  color = "rgba(235, 87, 87, 1)"
                  // onClick={() => handleActivate(row?.original?.memberId)}
                >
                  {t("common:buttons.inActivate")}
                </MenuItem> : 
                 <MenuItem
                //  icon={<InActivateIcon />}
                
                 bgColor={background}
                 _hover = {{bgColor : hover}}
                 color = "rgba(39, 174, 96, 1)"
                //  onClick={() => handleDeactivate(row?.original?.memberId)}
               >
                 {t("common:buttons.activate")}
               </MenuItem>
                 } */}
              
              </MenuList>
            </Menu>
          )
        },
        textAlign: "center",
      },
    ]
    
    return (
        <>
        <Layout title={t(`announce.title`)} description={""}>
        {isLoading ? (
          <TableSkeleton  />
         
        ) : (
        <>
        <Grid
         templateRows="repeat(1, 1fr)"
         templateColumns={{
           base: "repeat(1, 1fr)",
           md: "repeat(3, 1fr)",
           sm: "repeat(2, 1fr)",
         }}
         gap="5"
         mt="10">
        <GridItem rowSpan={1} colSpan={1}>
        <Box  bgColor={bgColor} h="127px"   borderRadius="20px" px={6} py={6}>
            <Flex gap={20} >
            <Maintanence />
              <Stack gap={4} >
            <Text  fontSize={"18px"} fontWeight={"700"} >{t(`announce.maintain`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)"
             fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>handleEditModalOpen()} leftIcon={<PlusIcon />}>{t(`announce.create`)}</Button>
            </Stack>
          
            </Flex>
           
        </Box>
        </GridItem>
       
       
        <GridItem rowSpan={1} colSpan={1}>
        <Box  bgColor={bgColor} h="127px"   borderRadius="20px" px={6} py={6} pr={30}>
        <Flex gap={20}>
        <Event />
              <Stack gap={4}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`announce.event`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"}  textAlign={"center"}
             border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer"  onClick={()=>handleEventModalOpen()} leftIcon={<PlusIcon />}>{t(`announce.create`)}</Button>
            </Stack>
         
            </Flex>
           
        </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
         <Box  bgColor={bgColor} h="127px"   borderRadius="20px" px={6} py={6}>
        <Flex gap={20} >
             
           <Announce />
            <Stack gap={4}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`announce.announce`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)"
             fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>handleAnnouncementOpen()} leftIcon={<PlusIcon />}>{t(`announce.create`)}</Button>
            </Stack> 
            </Flex>
           
        </Box>
        </GridItem>
        
      </Grid>
      <PageContainer    as="section"
            maxW="full"
            px="0"
            mt={{ base: 8, md: 18, lg: 0 }}>
              <Stack py={{ base: 3, md: 5 }}>
   <Box>
                <Table columns={columnConfig} data={responseData} />
                </Box>

                {isEditModalOpen && (
              <><MaintainenceForm
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}  /></>
              )}
         
         {isEventOpen && (
              <><EventsForm
                    isOpen={isEventOpen}
                    onClose={() => setIsEventOpen(false)}  /></>
              )}
         
         {isAnnouncementOpen && (
              <><Announcement
                    isOpen={isAnnouncementOpen}
                    onClose={() => setIsAnnouncementOpen(false)}  /></>
              )}

                </Stack>
      </PageContainer>
        </>
        )}
    
     
              
         
       
        </Layout>
        </>
    )

}

export default Announcemnet
