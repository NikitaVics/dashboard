import Layout from "../components/Layout";
import PageContainer from "../components/PageContainer";
import {
  Box,
  Text,
  Grid,
  GridItem,
  HStack,
  Flex,
  Button,
} from "@chakra-ui/react";
import CalenderIcon from "../components/Icons/calenderIcon";
import RevenueIcon from "../components/Icons/RevenueIcon";
import GrowthIcon from "../components/Icons/growthIcon";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useTranslation from "next-translate/useTranslation";

const Application = () => {
  const { t } = useTranslation("application");

  const { data: memberList } = useSWR("/api/application/getApproved");
  const membersList = memberList?.data;
  const { data: revenueList } = useSWR("/api/dashboard/totalRevenue");
  const { data: membershipGrowth } = useSWR("/api/dashboard/membershipGrowth");

  const router = useRouter();

  const [selectedComponent, setSelectedComponent] =
    useState("membershipGrowth");

  const handleMenuItemClick = (component: string) => {
    setSelectedComponent(component);
  };
  return (
    <>
      <Layout title={""} description={""}>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 2fr)",
            sm: "repeat(2, 1fr)",
          }}
          gap="5"
          mt="10"
        >
          <GridItem rowSpan={1} colSpan={1}>
            <Box bgColor="#fff" h="139px" borderRadius="20px" px={6} py={6}>
              <Flex justify="space-between">
                <Text color="rgba(29, 29, 31, 1)">
                  {t(`application.totalMembers`)}
                </Text>
                <CalenderIcon />
              </Flex>
              <Flex justify={"space-between"} mt={10}>
                <HStack>
                  <Text fontSize={"16px"} fontWeight={"700"}>
                    {membersList}
                  </Text>
                  <Text
                    fontSize={"13px"}
                    fontWeight="400"
                    color="rgba(67, 67, 69, 1)"
                  >
                    {t(`application.bookings`)}
                  </Text>
                </HStack>

                <Button
                  color="rgba(78, 203, 113, 1)"
                  p={"0"}
                  onClick={() => router.push("/members")}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  background={"none"}
                  _hover={{ bg: "none" }}
                >
                  {t(`application.details`)}
                </Button>
              </Flex>
            </Box>
          </GridItem>

          <GridItem rowSpan={1} colSpan={1}>
            <Box bgColor="#fff" h="139px" borderRadius="20px" px={6} py={6}>
              <Flex justify="space-between">
                <Text color="rgba(29, 29, 31, 1)">
                  {t(`application.totalRevenue`)}
                </Text>
                <CalenderIcon />
              </Flex>
              <Flex justify={"space-between"} mt={10}>
                <HStack>
                  <Text fontSize={"16px"} fontWeight={"700"}>
                    ${revenueList}
                  </Text>
                  <Text
                    fontSize={"13px"}
                    fontWeight="400"
                    color="rgba(67, 67, 69, 1)"
                  >
                    {t(`application.bookings`)}
                  </Text>
                </HStack>

                <Button
                  color="rgba(78, 203, 113, 1)"
                  p={"0"}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  background={"none"}
                  _hover={{ bg: "none" }}
                >
                  {t(`application.details`)}
                </Button>
              </Flex>
            </Box>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Box bgColor="#fff" h="139px" borderRadius="20px" px={6} py={6}>
              <Flex justify="space-between">
                <Text color="rgba(29, 29, 31, 1)">
                  {t(`application.members`)}
                </Text>
                <CalenderIcon />
              </Flex>
              <Flex justify={"space-between"} mt={10}>
                <HStack>
                  <Text fontSize={"16px"} fontWeight={"700"}>
                    {membershipGrowth}
                  </Text>
                  <Text
                    fontSize={"13px"}
                    fontWeight="400"
                    color="rgba(67, 67, 69, 1)"
                  >
                    {t(`application.bookings`)}
                  </Text>
                </HStack>

                <Button
                  color="rgba(78, 203, 113, 1)"
                  p={"0"}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  background={"none"}
                  _hover={{ bg: "none" }}
                >
                  {t(`application.details`)}
                </Button>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
        <PageContainer></PageContainer>
      </Layout>
    </>
  );
};

export default Application;
