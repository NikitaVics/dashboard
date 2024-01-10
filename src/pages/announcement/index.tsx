import { Box, Button, Flex, Grid, GridItem,Text, useColorModeValue, Stack } from "@chakra-ui/react"
import Layout from "../components/Layout"
import useTranslation from "next-translate/useTranslation"
import router from "next/router"
import MemberShip from "../components/Icons/memberShip"
import TodaysReports from "../components/Icons/ReportPic"
import Maintanence from "../components/Icons/maintanence"
import PlusIcon from "../components/Icons/PlusIcon"




const Announcemnet = () => {
    const {t} = useTranslation("announcement")

    const bgColor = useColorModeValue("light.300","dark.600")
    return (
        <>
        <Layout title={t(`announce.title`)} description={""}>
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
            <Flex justify="space-between" >
            <Maintanence />
              <Stack gap={6} >
            <Text  fontSize={"18px"} fontWeight={"700"} >{t(`announce.maintain`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>router.push(``)} leftIcon={<PlusIcon />}>{t(`announce.create`)}</Button>
            </Stack>
          
            </Flex>
           
        </Box>
        </GridItem>
       
       
        <GridItem rowSpan={1} colSpan={1}>
        <Box  bgColor={bgColor} h="127px"   borderRadius="20px" px={6} py={6}>
        <Flex justify="space-between" >
        <TodaysReports w={"100%"}/>
              <Stack gap={8}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`dashboard.reports`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>router.push(`/reports`)}>{t(`dashboard.view`)}</Button>
            </Stack>
         
            </Flex>
           
        </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
         <Box  bgColor={bgColor} h="127px"   borderRadius="20px" px={6} py={6}>
        <Flex justify="space-between" >
             
            <MemberShip w={"100%"}/>
            <Stack gap={8}>
            <Text  fontSize={"20px"} fontWeight={"700"}>{t(`dashboard.application`)}</Text>
            <Button bg="none" color="rgba(78, 203, 113, 1)" borderRadius={"51px"} maxW={"80%"} border="1px solid  rgba(78, 203, 113, 1)" fontWeight={"500"} fontSize="14px" cursor="pointer" onClick={()=>router.push(`/application`)}>{t(`dashboard.view`)}</Button>
            </Stack> 
            </Flex>
           
        </Box>
        </GridItem>
        
      </Grid>
         
       
        </Layout>
        </>
    )

}

export default Announcemnet
