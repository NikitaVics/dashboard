// import { Center, Heading } from "@chakra-ui/react"
// import Layout from "../components/Layout"
// import PageContainer from "../components/PageContainer"

// const Bookings = () => {
//     return (
//       <>
//       <Layout title={""} description={""}>
//         <PageContainer>
//       <Center>
//       <Heading>Bookings Page</Heading>
//       </Center>
//       </PageContainer>
//       </Layout>
//       </>
//     )
// }

// export default Bookings








import { Box, Center, Text, Grid, GridItem, HStack, Heading, Flex, Stack, Button } from "@chakra-ui/react"
import Layout from "../components/Layout"
import PageContainer from "../components/PageContainer"
import useTranslation from "next-translate/useTranslation"
import CalenderIcon from "../components/Icons/calenderIcon"
import useSWR from "swr"
import RevenueIcon from "../components/Icons/RevenueIcon"
import GrowthIcon from "../components/Icons/growthIcon"

import { useRouter } from "next/router"


import { useState } from "react"
import { Formik } from "formik"
import { type } from "os"



const Dashboard = () => {
    const { t } = useTranslation("bookings")

    const { data: membersList } = useSWR("/api/dashboard/totalMembers")
    const { data: revenueList } = useSWR("/api/dashboard/totalRevenue")
    const { data: membershipGrowth } = useSWR("/api/dashboard/membershipGrowth")

    const { data: totalbookingsList } = useSWR("/api/Management/BookingManagement/totalBookingsToday")
    const { data: todaycancelList } = useSWR("/api/Management/BookingManagement/totalCancelledBookingsToday")
    const { data: totalpeakList } = useSWR("/api/Management/BookingManagement/totalBookingsToday")
    
   
    const router = useRouter()

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const salesData = [5, 5, 5, 4, 5, 6, 5, 4,5, 5, 5, 5];

    const [clickedMonth, setClickedMonth] = useState<string | null>(null);
    const [clickedValue, setClickedValue] = useState<number | null>(null);
  
   
  const handleMonthClick = (monthIndex: number, value: number) => {
    console.log("index",monthIndex)
    const clickedMonthLabel = months[monthIndex];
    setClickedMonth(clickedMonthLabel);
    setClickedValue(value);
  };
  
  
    return (
        <Layout title={""} description={""}>
            <PageContainer>
                <Heading>{t(`bookings.title`)}</Heading>
     
        <Grid
         templateRows="repeat(2, 1fr)"
         templateColumns={{
           base: "repeat(1, 1fr)",
           md: "repeat(3, 2fr)",
           sm: "repeat(2, 1fr)",
         }}
         gap="5"
         mt="20">
        <GridItem rowSpan={1} colSpan={1}>
        <Box boxShadow={"xl"} bgColor="#fff" h="139px"   borderRadius="20px" px={6} py={6}>
            <Flex justify="space-between">
            <Text color="rgba(29, 29, 31, 1)">{t(`bookings.totalBookings`)}</Text>
            <CalenderIcon />
            </Flex>
            <Flex justify={"space-between"} mt={10}>
              <HStack>
              <Text fontSize={"16px"} fontWeight={"700"}>{totalbookingsList}</Text>
              <Text fontSize={"13px"} fontWeight="400" color="rgba(67, 67, 69, 1)">{t(`bookings.members`)}</Text>
              </HStack>
          
              <Text color="rgba(78, 203, 113, 1)" >{t(`bookings.view`)}</Text>
            </Flex>
           
        </Box>
        </GridItem>
       
       
        <GridItem rowSpan={1} colSpan={1}>
        <Box boxShadow={"xl"} bgColor="#fff" h="139px"   borderRadius="20px" px={6} py={6}>
            <Flex justify="space-between">
            <Text color="rgba(29, 29, 31, 1)">{t(`bookings.cancelledBookings`)}</Text>
            <RevenueIcon />
            </Flex>
            <Flex justify={"space-between"} mt={10}>
            <HStack>
              <Text fontSize={"16px"} fontWeight={"700"}>${todaycancelList}</Text>
              <Text fontSize={"13px"} fontWeight="400" color="rgba(67, 67, 69, 1)">{t(`bookings.year`)}</Text>
              </HStack>
          
              <Text color="rgba(78, 203, 113, 1)" >{t(`bookings.view`)}</Text>
            </Flex>
           
        </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
        <Box boxShadow={"xl"} bgColor="#fff" h="139px"   borderRadius="20px" px={6} py={6}>
            <Flex justify="space-between">
            <Text color="rgba(29, 29, 31, 1)">{t(`bookings.members`)}</Text>
            <GrowthIcon />
            </Flex>
            <Flex justify={"space-between"} mt={10}>
              
            <HStack>
              <Text fontSize={"16px"} fontWeight={"700"}>{totalpeakList}</Text>
              <Text fontSize={"13px"} fontWeight="400" color="rgba(67, 67, 69, 1)">{t(`bookings.month`)}</Text>
              </HStack>
              <Text color="rgba(78, 203, 113, 1)" >{t(`bookings.details`)}</Text>
            </Flex>
           
        </Box>
        
        </GridItem>
        

        
                        
                        
                        
                        
                      
        
      </Grid>
      
      
      
     
        </PageContainer>
        
        </Layout>
        
    )
}

export default Dashboard