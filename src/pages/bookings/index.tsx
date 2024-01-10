import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Hide,
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
} from "@chakra-ui/react"
import Table from "@/components/Table"
import { Formik } from "formik"
import ky, { HTTPError } from "ky"
import useTranslation from "next-translate/useTranslation"
import React, { useState } from "react"
import useSWR, { mutate } from "swr"
import Layout from "../components/Layout"
import PageContainer from "../components/PageContainer"
import { BookingsProps, MemberProps } from "@/service/types"
import MoreVertIcon from "../components/Icons/MoreVertIcon"
import EditIcon from "../components/Icons/EditIcon"
import InActivateIcon from "../components/Icons/InActivate"
import MembersForm from "@/components/membersForm"
import TableSkeleton from "@/components/Skeleton/TableSkeleton"
import SearchIcon from "../components/Icons/searchIcon"
import { InputControl } from "@/components/Input/Input"
import { useRouter } from "next/router"
import CalenderIcon from "../components/Icons/calenderIcon"
import RevenueIcon from "../components/Icons/RevenueIcon"
import GrowthIcon from "../components/Icons/growthIcon"
import DownArrowIcon from "../components/Icons/downArrow"
import MonthTabs from "../components/graph/yearlyGraph"
import BookingsGraph from "../components/graph/bookingsGraph"
import BookingsPic from "../components/Icons/BookingsPic"
import TodaysReports from "../components/Icons/ReportPic"
import MemberShip from "../components/Icons/memberShip"
type EditTaxDetailsProps = {
  memberData: MemberProps
}

const bookings = () => {
  const { t } = useTranslation("bookings")

  const { data: totalbookingsList } = useSWR("/api/bookings/totalBookings")
  const bookings=totalbookingsList?.result
  const { data: cancelbookingsList } = useSWR("/api/bookings/cancelledBookings")
  const cancelbooking=cancelbookingsList?.result
  const { data: peakbookingsHour } = useSWR("/api/bookings/peakBookingHour")
  const peakbookhour=peakbookingsHour?.result
  const { data: totalbookingsList } = useSWR("/api/bookings/totalBookings")
  const peakbookhour=peakbookingsHour?.result

  
 const bgColor2 = useColorModeValue("rgba(248, 248, 248, 1)","rgba(0, 0, 0, 0.02)")
  const router = useRouter()

const [selectedComponent, setSelectedComponent] = useState('membershipGrowth');

const handleMenuItemClick = (component: string) => {
  setSelectedComponent(component);
};

const bgColor = useColorModeValue("light.300","dark.600")
const color  = useColorModeValue("dark.700","light.400")
const color2  = useColorModeValue("dark.400","light.50")
const menuBg = useColorModeValue("","rgba(20, 20, 20, 1)")

const [isEditModalOpen, setIsEditModalOpen] = useState(false)
const handleEditModalOpen = (memberId: BookingsProps | undefined) => {
 
  setIsEditModalOpen(true)
  if (memberId) {
     // eslint-disable-next-line
  //@ts-ignore
    setMemberId(memberId); 
  }
}



const [memberId, setMemberId] = useState("")

const { data: responseData } = useSWR(
  `/api/bookings`,
)

const background = useColorModeValue("#fff","#0D0D0D")


const hover  = useColorModeValue("rgba(237, 250, 241, 1)","#181818;")
const columnConfig = [
  {
    Header: t(`bookings.bookingName`),
    accessor: "name",
    // eslint-disable-next-line
    Cell: ({ row: { original } } : any ) => (
      <HStack align="center" spacing={2}>
        <Avatar
          src={original.image} 
          size="md" 
        />
        <Text>{original.name}</Text>
      </HStack>
    ),
  },
  {
    Header: t(`bookings.team`),
    accessor: "email",
  },
  {
    Header: t(`bookings.coach`),
    accessor: "phoneNo",
  },
  {
    Header: t(`bookings.court`),
    accessor: "gender",
  },
  {
    Header: t(`bookings.time`),
    accessor: "memberSince",
  },
  {
    Header: t("common:menu.status"),
    accessor: "status",
    Cell: ({ value }: { value: boolean }) => (
      value === true ? (
        <Flex h="34px" bgColor="green.50" maxW="90px"  alignItems="center" justify="center" borderRadius={"35px"} border="1px solid" borderColor="green.200" color="green.300">
          {t("common:status.active")}
        </Flex>
      ) : (
        <Flex h="34px" bgColor="red.50"  maxW="90px"  alignItems="center" justify="center" borderRadius={"35px"} border="1px solid" borderColor="red.100" color="red.200">
        {t("common:status.inActive")}
      </Flex>
      )
    ),
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
            <MenuItem
              icon={<EditIcon />}
             
              bgColor={background}
              _hover = {{bgColor : hover}}
              onClick={() => handleEditModalOpen(row?.original?.memberId)}
            >
              {t("common:buttons.view")}
            </MenuItem>
            {row?.original?.status === true ? 
            <MenuItem
              icon={<InActivateIcon />}
             
              bgColor={background}
              _hover = {{bgColor : hover}}
              color = "rgba(235, 87, 87, 1)"
              onClick={() => handleActivate(row?.original?.memberId)}
            >
              {t("common:buttons.inActivate")}
            </MenuItem> : 
             <MenuItem
            //  icon={<InActivateIcon />}
            
             bgColor={background}
             _hover = {{bgColor : hover}}
             color = "rgba(39, 174, 96, 1)"
             onClick={() => handleDeactivate(row?.original?.memberId)}
           >
             {t("common:buttons.activate")}
           </MenuItem>
             }
          
          </MenuList>
        </Menu>
      )
    },
    textAlign: "center",
  },
]

const toast = useToast()

const handleActivate = async (memberId: string) => {
  if (memberId) {
    try {
      const updatedValues = { memberId }
      if (memberId) {
        const response = await ky.post(
          `/api/members/Activate/${memberId}`,
          {
            json: updatedValues,
          },
        )

        if (response) {
          toast({
            description: "Successfully Deactivated",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          })
          await mutate(`/api/members`)
        }
      }
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        const errorResponse = await error.response.json()
        const messages = errorResponse.error.messages
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
        })
      }
    }
  }
}

const handleDeactivate = async (memberId: string) => {
  if (memberId) {
    try {
      const updatedValues = { memberId }
      if (memberId) {
        const response = await ky.post(
          `/api/members/Activate/${memberId}`,
          {
            json: updatedValues,
          },
        )

        if (response) {
          toast({
            description: "Successfully Activated",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          })
          await mutate(`/api/bookings`)
        }
      }
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        const errorResponse = await error.response.json()
        const messages = errorResponse.error.messages
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
        })
      }
    }
  }
}



const isLoading = !responseData

const [searchInput, setSearchInput] = useState("")
const isDesktopView = useBreakpointValue({ base: false, md: false, xl: true })

  return (
      <Layout title = {t(`bookings.title`)} description={""} >
        <h1>hari</h1>
          <PageContainer bgColor={bgColor2}>
             
          
      <Grid
       templateRows="repeat(1, 1fr)"
       templateColumns={{
         base: "repeat(1, 1fr)",
         md: "repeat(3, 2fr)",
         sm: "repeat(2, 1fr)",
       }}
       gap="5"
       mt="10">
      <GridItem rowSpan={1} colSpan={1}>
      <Box  bgColor={bgColor} h="139px"   borderRadius="20px" px={6} py={6}>
          <Flex justify="space-between">
          <Text color={color}>{t(`dashboard.totalMembers`)}</Text>
          <CalenderIcon />
          </Flex>
          <Flex justify={"space-between"} mt={10}>
            <HStack>
            <Text fontSize={"16px"} fontWeight={"700"}>{bookings}</Text>
            <Text fontSize={"13px"} fontWeight="400" color={color2}>{t(`dashboard.membersList`)}</Text>
            </HStack>
        
            <Button color="rgba(78, 203, 113, 1)" p={"0"}  onClick={()=>router.push("/members")} fontSize={"14px"} fontWeight={"700"} background={"none"} _hover={{bg:"none"}}>{t(`dashboard.details`)}</Button>
          </Flex>
         
      </Box>
      </GridItem>
     
     
      <GridItem rowSpan={1} colSpan={1}>
      <Box  bgColor={bgColor} h="139px"   borderRadius="20px" px={6} py={6}>
          <Flex justify="space-between">
          <Text color={color}>{t(`dashboard.totalRevenue`)}</Text>
          <RevenueIcon />
          </Flex>
          <Flex justify={"space-between"} mt={10}>
          <HStack>
            <Text fontSize={"16px"} fontWeight={"700"}>${cancelbookingsList}</Text>
            <Text fontSize={"13px"} fontWeight="400" color={color2}>{t(`dashboard.year`)}</Text>
            </HStack>
        
            <Button color="rgba(78, 203, 113, 1)"p={"0"}   fontSize={"14px"} fontWeight={"700"} background={"none"} _hover={{bg:"none"}}>{t(`dashboard.details`)}</Button>
          </Flex>
         
      </Box>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
      <Box bgColor={bgColor} h="139px"   borderRadius="20px" px={6} py={6}>
          <Flex justify="space-between">
          <Text color={color}>{t(`dashboard.members`)}</Text>
          <GrowthIcon />
          </Flex>
          <Flex justify={"space-between"} mt={10}>
            
          <HStack>
            <Text fontSize={"16px"} fontWeight={"700"}>{peakbookingsHour}</Text>
            <Text fontSize={"13px"} fontWeight="400" color={color2}>{t(`dashboard.month`)}</Text>
            </HStack>
            
            <Button color="rgba(78, 203, 113, 1)" p={"0"}  fontSize={"14px"} fontWeight={"700"} background={"none"} _hover={{bg:"none"}}>{t(`dashboard.details`)}</Button>
          </Flex>
         
      </Box>
      </GridItem>
      
    </Grid>
    
   

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
                        placeholder: t(`bookings.search`),
                        fontSize: "md",
                        fontWeight: "medium",
                        color: "gray.500",
                        h:"64px",
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
              <><MembersForm
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)} memberId={memberId} memberData={memberData} /></>
              )} 
              
            </Stack>
   
      </PageContainer>
     
      </Layout>
  )
}

// function Member({memberData}:EditTaxDetailsProps) {

//   const { t } = useTranslation("bookings")
 

//   return (
//     <>
     
//       <Layout title={t("bookings.title")} description={t("page.description")}>
      
       
//         {isLoading ? (
//           <TableSkeleton  />
         
//         ) : (
//           <PageContainer
//             as="section"
//             maxW="full"
//             px="0"
//             mt={{ base: 8, md: 18, lg: 0 }}
//           >
           
            
//           </PageContainer>
//         )}
//       </Layout>
      
//     </>
//   )
// }


export default bookings


