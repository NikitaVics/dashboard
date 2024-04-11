import {  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody,  useColorModeValue, Heading, Flex} from "@chakra-ui/react";
import React from "react";
import useTranslation from "next-translate/useTranslation";

import useSWR from "swr";
import Maintainence from "./Forms/viewMaintainence";


type MaintainenceProps = {
  isOpen: boolean;
  onClose: () => void;
  id : string
};

const ViewCourt = (props: MaintainenceProps) => {
  const { isOpen, onClose,id } = props;
  const { data: Data, isValidating } = id ? useSWR(
    `/api/announcement/announcement-detail?id=${id}`
  ) : { data: undefined, isValidating: false };
  

  const responseData  =  Data?.result
  const color = useColorModeValue("rgba(248, 248, 248, 1)", "dark.500");
  const { t } = useTranslation("announcement");

  return (
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
        {isValidating ? (
            <Flex alignItems="center" justifyContent="center" height="full">
            <Heading>Loading...</Heading>
          </Flex>
          ) : (
       <Maintainence message={undefined} courtId={id} onClose={onClose} courtData={responseData} />
    //    <Maintainence message={undefined} onClose={onClose} courtData={responseData} courtId={id} />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ViewCourt;
