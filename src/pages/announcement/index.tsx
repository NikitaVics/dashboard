import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import useTranslation from "next-translate/useTranslation";
import router from "next/router";
import Maintanence from "../components/Icons/maintanence";
import PlusIcon from "../components/Icons/PlusIcon";
import Event from "../components/Icons/event";
import Announce from "../components/Icons/announce";
import MaintainenceForm from "@/components/maintainence";
import { useState } from "react";
import EventsForm from "@/components/events";

const Announcemnet = () => {
  const { t } = useTranslation("announcement");

  const bgColor = useColorModeValue("light.300", "dark.600");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const [isEventOpen, setIsEventOpen] = useState(false);
  const handleEventModalOpen = () => {
    setIsEventOpen(true);
  };
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
          mt="10"
        >
          <GridItem rowSpan={1} colSpan={1}>
            <Box bgColor={bgColor} h="127px" borderRadius="20px" px={6} py={6}>
              <Flex gap={20}>
                <Maintanence />
                <Stack gap={4}>
                  <Text fontSize={"18px"} fontWeight={"700"}>
                    {t(`announce.maintain`)}
                  </Text>
                  <Button
                    bg="none"
                    color="rgba(78, 203, 113, 1)"
                    borderRadius={"51px"}
                    border="1px solid  rgba(78, 203, 113, 1)"
                    fontWeight={"500"}
                    fontSize="14px"
                    cursor="pointer"
                    onClick={() => handleEditModalOpen()}
                    leftIcon={<PlusIcon />}
                  >
                    {t(`announce.create`)}
                  </Button>
                </Stack>
              </Flex>
            </Box>
          </GridItem>

          <GridItem rowSpan={1} colSpan={1}>
            <Box
              bgColor={bgColor}
              h="127px"
              borderRadius="20px"
              px={6}
              py={6}
              pr={30}
            >
              <Flex gap={20}>
                <Event />
                <Stack gap={4}>
                  <Text fontSize={"20px"} fontWeight={"700"}>
                    {t(`announce.event`)}
                  </Text>
                  <Button
                    bg="none"
                    color="rgba(78, 203, 113, 1)"
                    borderRadius={"51px"}
                    textAlign={"center"}
                    border="1px solid  rgba(78, 203, 113, 1)"
                    fontWeight={"500"}
                    fontSize="14px"
                    cursor="pointer"
                    onClick={() => handleEventModalOpen()}
                    leftIcon={<PlusIcon />}
                  >
                    {t(`announce.create`)}
                  </Button>
                </Stack>
              </Flex>
            </Box>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Box bgColor={bgColor} h="127px" borderRadius="20px" px={6} py={6}>
              <Flex gap={20}>
                <Announce />
                <Stack gap={4}>
                  <Text fontSize={"20px"} fontWeight={"700"}>
                    {t(`announce.announce`)}
                  </Text>
                  <Button
                    bg="none"
                    color="rgba(78, 203, 113, 1)"
                    borderRadius={"51px"}
                    border="1px solid  rgba(78, 203, 113, 1)"
                    fontWeight={"500"}
                    fontSize="14px"
                    cursor="pointer"
                    onClick={() => router.push(``)}
                    leftIcon={<PlusIcon />}
                  >
                    {t(`announce.create`)}
                  </Button>
                </Stack>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
        {isEditModalOpen && (
          <>
            <MaintainenceForm
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            />
          </>
        )}

        {isEventOpen && (
          <>
            <EventsForm
              isOpen={isEventOpen}
              onClose={() => setIsEventOpen(false)}
            />
          </>
        )}
      </Layout>
    </>
  );
};

export default Announcemnet;
