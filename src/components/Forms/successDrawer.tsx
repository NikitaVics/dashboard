import Scheduled from "@/pages/components/Icons/scheduled";
import {
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  DrawerBody,
  Flex,
  Stack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

interface SuccessDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessDrawer: React.FC<SuccessDrawerProps> = ({ isOpen, onClose }) => {
  const bgColor = useColorModeValue("light.200", "dark.300");
  const { t } = useTranslation("announcement");
  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bgColor={bgColor}>
        <DrawerCloseButton
          h="40px"
          w="40px"
          mt={3}
          bgColor="rgba(0, 0, 0, 0.08)"
        />
        <DrawerBody maxW="full">
          <Flex
            direction="column"
            justify="center"
            align="center"
            h="80%"
            gap={8}
          >
            <Scheduled />
            <Stack textAlign={"center"} px={20}>
              <Text
                fontSize={"32px"}
                fontWeight={"700"}
                color="rgba(78, 203, 113, 1)"
              >
                {t(`announce.schedule`)}{" "}
              </Text>
              <Text>{t(`announce.successMessage`)}</Text>
            </Stack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SuccessDrawer;
