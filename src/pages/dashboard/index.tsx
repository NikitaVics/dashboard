import { Box, Text, Grid, GridItem, HStack, Flex, Stack, Button, Menu, MenuButton, MenuItem, MenuList, Hide, useColorModeValue } from "@chakra-ui/react"
import Layout from "../components/Layout"
import PageContainer from "../components/PageContainer"
import useTranslation from "next-translate/useTranslation"
import CalenderIcon from "../components/Icons/calenderIcon"
import useSWR from "swr"
import RevenueIcon from "../components/Icons/RevenueIcon"
import GrowthIcon from "../components/Icons/growthIcon"

import { useRouter } from "next/router"

import { useState } from "react"
import MemberShip from "../components/Icons/memberShip"
import TodaysReports from "../components/Icons/ReportPic"
import BookingsPic from "../components/Icons/BookingsPic"
import MonthTabs from "../components/graph/yearlyGraph"
import BookingsGraph from "../components/graph/bookingsGraph"
import DownArrowIcon from "../components/Icons/downArrow"


const Dashboard = () => {
    const { t } = useTranslation("dashboard")

    const { data: membersList } = useSWR("/api/dashboard/totalMembers")
    const { data: revenueList } = useSWR("/api/dashboard/totalRevenue")
    const { data: membershipGrowth } = useSWR("/api/dashboard/membershipGrowth")


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
  
    return (
        <Layout title = {t(`dashboard.title`)} description={""} >
            <PageContainer bgColor={bgColor2}>
               
     
        <Grid
         templateRows="repeat(1, 1fr)"
         templateColumns={{
           base: "repeat(1, 1fr)",
           md: "repeat(3, 4fr)",
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
              <Text fontSize={"16px"} fontWeight={"700"}>{membersList}</Text>
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
              <Text fontSize={"16px"} fontWeight={"700"}>${revenueList}</Text>
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
              <Text fontSize={"16px"} fontWeight={"700"}>{membershipGrowth}</Text>
              <Text fontSize={"13px"} fontWeight="400" color={color2}>{t(`dashboard.month`)}</Text>
              </HStack>
              
              <Button color="rgba(78, 203, 113, 1)" p={"0"}  fontSize={"14px"} fontWeight={"700"} background={"none"} _hover={{bg:"none"}}>{t(`dashboard.details`)}</Button>
            </Flex>
           
        </Box>
        </GridItem>
    
        
      </Grid>
      <Hide  below="sm" >
      <Box bgColor={bgColor} mt={10}  borderRadius={"20px"}> 
      <Flex justify="end"  mr={5} >
        <Menu>
          <MenuButton as={Button} variant="outline" rightIcon={<DownArrowIcon />} mt={"10px"} backgroundColor={menuBg}>
            {selectedComponent === 'membershipGrowth' ? t(`dashboard.membershipGrowth`) : t(`dashboard.bookingsGrowth`) }
          </MenuButton>
          <MenuList backgroundColor={menuBg} >
            <MenuItem onClick={() => handleMenuItemClick('membershipGrowth')} backgroundColor={menuBg} >{ t(`dashboard.membershipGrowth`)}</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('bookingsGrowth')} backgroundColor={menuBg}>{t(`dashboard.bookingsGrowth`)}</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {selectedComponent === 'membershipGrowth' && <MonthTabs />}
      {selectedComponent === 'bookingsGrowth' && <BookingsGraph />}
    </Box>
      
      </Hide>
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
        <Box  bgColor={bgColor} h="207px"   borderRadius="20px" px={6} py={6}>
            <Flex justify="space-between" >
              <Stack gap={8}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`dashboard.bookings`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>router.push(`/bookings`)}>{t(`dashboard.view`)}</Button>
            </Stack>
            <BookingsPic w={"100%"}/>
            </Flex>
           
        </Box>
        </GridItem>
       
       
        <GridItem rowSpan={1} colSpan={1}>
        <Box  bgColor={bgColor} h="207px"   borderRadius="20px" px={6} py={6}>
        <Flex justify="space-between" >
              <Stack gap={8}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`dashboard.reports`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>router.push(`/reports`)}>{t(`dashboard.view`)}</Button>
            </Stack>
          <TodaysReports w={"100%"}/>
            </Flex>
           
        </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
         <Box  bgColor={bgColor} h="207px"   borderRadius="20px" px={6} py={6}>
        <Flex justify="space-between" >
              <Stack gap={8}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`dashboard.application`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} maxW={"80%"} border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>router.push(`/application`)}>{t(`dashboard.view`)}</Button>
            </Stack> 
            <MemberShip w={"100%"}/>
            </Flex>
           
        </Box>
        </GridItem>
        
      </Grid>
        </PageContainer>
        </Layout>
    )
}

export default Dashboard