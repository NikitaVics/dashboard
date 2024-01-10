import { useState } from "react";
import PageContainer from "../components/PageContainer";
import Layout from "../components/Layout";
import { Box, Button, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import CourtReportDetails from "./courtReports";
import CoachReportDetails from "./coachReport";

const Reports = () => {
  const { t } = useTranslation("reports");


  const [selectedReport, setSelectedReport] =useState<string | null>("court");


  const handleReportClick = (report : string) => {
    setSelectedReport(report);
  };

  const bgColor = useColorModeValue("light.300","dark.300")


  return (
    <>
      <Layout title={t(`reports.title`)} description={""}>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 2fr)",
            sm: "repeat(2, 1fr)",
          }}
          gap="5"
        >
          <GridItem rowSpan={1} colSpan={1}>
            <Box maxW="full">
             
              <Button w="full" onClick={() => handleReportClick("court")} borderRadius="12px"  h="65px" 
               _hover={{bgColor :"rgba(78, 203, 113, 1)" , color:"rgba(252, 252, 252, 1)"}} 
               _focus={{bgColor :"rgba(78, 203, 113, 1)" ,color:"rgba(252, 252, 252, 1)"}}
               bgColor={selectedReport === "court" ? "rgba(78, 203, 113, 1)" : bgColor}
               color={selectedReport === "court" ? "rgba(252, 252, 252, 1)" : undefined}>
                Court Reports
              </Button>
            </Box>
          </GridItem>

          <GridItem rowSpan={1} colSpan={1}>
            <Box maxW="full" h="70px">
             
              <Button w="full" onClick={() => handleReportClick("coach")} borderRadius="12px"  h="65px" 
              _hover={{bgColor :"rgba(78, 203, 113, 1)",color:"rgba(252, 252, 252, 1)"}} 
              _focus={{bgColor :"rgba(78, 203, 113, 1)" , color:"rgba(252, 252, 252, 1)"}}
              bgColor={selectedReport === "coach" ? "rgba(78, 203, 113, 1)" : bgColor}
              color={selectedReport === "coach" ? "rgba(252, 252, 252, 1)" : undefined}
             >
                Coach Reports
              </Button>
            </Box>
          </GridItem>
        </Grid>

        <PageContainer mt={6}>
         
          {selectedReport === "court" && <CourtReportDetails />}
          {selectedReport === "coach" &&  <CoachReportDetails />}
        </PageContainer>
      </Layout>
    </>
  );
};



export default Reports;