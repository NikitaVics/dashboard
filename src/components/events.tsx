import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import EventAnnouncement from "./Forms/EventAnnouncement";

type MaintainenceProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EventsForm = (props: MaintainenceProps) => {
  const { isOpen, onClose } = props;

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
          {t(`announce.eventAnnoun`)}
        </DrawerHeader>

        <DrawerBody>
          <EventAnnouncement />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default EventsForm;
