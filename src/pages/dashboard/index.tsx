import { Box, Center, Text, Grid, GridItem, HStack, Heading, Flex, Stack, Button } from "@chakra-ui/react"
import Layout from "../components/Layout"
import PageContainer from "../components/PageContainer"
import useTranslation from "next-translate/useTranslation"
import CalenderIcon from "../components/Icons/calenderIcon"
import useSWR from "swr"
import RevenueIcon from "../components/Icons/RevenueIcon"
import GrowthIcon from "../components/Icons/growthIcon"

import { useRouter } from "next/router"

import YearlyGraph from "../components/graph/yearlyGraph"
import Example from "../components/graph/yearlyGraph"
import TemperatureChart from "../components/graph/yearlyGraph"
import MonthlySalesChart from "../components/graph/yearlyGraph"
import { useState } from "react"
import MemberShip from "../components/Icons/memberShip"
import TodaysReports from "../components/Icons/ReportPic"
import BookingsPic from "../components/Icons/BookingsPic"
import MonthTabs from "../components/graph/yearlyGraph"


const Dashboard = () => {
    const { t } = useTranslation("dashboard")

    const { data: membersList } = useSWR("/api/dashboard/totalMembers")
    const { data: revenueList } = useSWR("/api/dashboard/totalRevenue")
    const { data: membershipGrowth } = useSWR("/api/dashboard/membershipGrowth")


   
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
                <Heading>{t(`dashboard.title`)}</Heading>
     
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
            <Text color="rgba(29, 29, 31, 1)">{t(`dashboard.totalMembers`)}</Text>
            <CalenderIcon />
            </Flex>
            <Flex justify={"space-between"} mt={10}>
              <HStack>
              <Text fontSize={"16px"} fontWeight={"700"}>{membersList}</Text>
              <Text fontSize={"13px"} fontWeight="400" color="rgba(67, 67, 69, 1)">{t(`dashboard.membersList`)}</Text>
              </HStack>
          
              <Text color="rgba(78, 203, 113, 1)" >{t(`dashboard.details`)}</Text>
            </Flex>
           
        </Box>
        </GridItem>
       
       
        <GridItem rowSpan={1} colSpan={1}>
        <Box boxShadow={"xl"} bgColor="#fff" h="139px"   borderRadius="20px" px={6} py={6}>
            <Flex justify="space-between">
            <Text color="rgba(29, 29, 31, 1)">{t(`dashboard.totalRevenue`)}</Text>
            <RevenueIcon />
            </Flex>
            <Flex justify={"space-between"} mt={10}>
            <HStack>
              <Text fontSize={"16px"} fontWeight={"700"}>${revenueList}</Text>
              <Text fontSize={"13px"} fontWeight="400" color="rgba(67, 67, 69, 1)">{t(`dashboard.year`)}</Text>
              </HStack>
          
              <Text color="rgba(78, 203, 113, 1)" >{t(`dashboard.details`)}</Text>
            </Flex>
           
        </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
        <Box boxShadow={"xl"} bgColor="#fff" h="139px"   borderRadius="20px" px={6} py={6}>
            <Flex justify="space-between">
            <Text color="rgba(29, 29, 31, 1)">{t(`dashboard.members`)}</Text>
            <GrowthIcon />
            </Flex>
            <Flex justify={"space-between"} mt={10}>
              
            <HStack>
              <Text fontSize={"16px"} fontWeight={"700"}>{membershipGrowth}</Text>
              <Text fontSize={"13px"} fontWeight="400" color="rgba(67, 67, 69, 1)">{t(`dashboard.month`)}</Text>
              </HStack>
              <Text color="rgba(78, 203, 113, 1)" >{t(`dashboard.details`)}</Text>
            </Flex>
           
        </Box>
        </GridItem>
        
      </Grid>
      <Box  bgColor="#fff">
     <MonthTabs />
      </Box>
      
      <Grid
         templateRows="repeat(2, 1fr)"
         templateColumns={{
           base: "repeat(1, 1fr)",
           md: "repeat(3, 1fr)",
           sm: "repeat(2, 1fr)",
         }}
         gap="5"
         mt="20">
        <GridItem rowSpan={1} colSpan={1}>
        <Box boxShadow={"xl"} bgColor="#fff" h="207px"   borderRadius="20px" px={6} py={6}>
            <Flex justify="space-between" >
              <Stack gap={8}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`dashboard.bookings`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>router.push(`/bookings`)}>{t(`dashboard.view`)}</Button>
            </Stack>
            <BookingsPic />
            </Flex>
           
        </Box>
        </GridItem>
       
       
        <GridItem rowSpan={1} colSpan={1}>
        <Box boxShadow={"xl"} bgColor="#fff" h="207px"   borderRadius="20px" px={6} py={6}>
        <Flex justify="space-between" >
              <Stack gap={8}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`dashboard.reports`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>router.push(`/reports`)}>{t(`dashboard.view`)}</Button>
            </Stack>
          <TodaysReports />
            </Flex>
           
        </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
         <Box boxShadow={"xl"} bgColor="#fff" h="207px"   borderRadius="20px" px={6} py={6}>
        <Flex justify="space-between" >
              <Stack gap={8}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`dashboard.application`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} maxW={"80%"} border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>router.push(`/application`)}>{t(`dashboard.view`)}</Button>
            </Stack> 
            <MemberShip />
            </Flex>
           
        </Box>
        </GridItem>
        
      </Grid>
        </PageContainer>
        </Layout>
    )
}

export default Dashboard