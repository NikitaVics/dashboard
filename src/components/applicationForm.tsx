import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
  Heading,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { MemberProps } from "@/service/types";
import useSWR from "swr";
import ApplicationDetails from "./Forms/ApplicationDetails";

type MemberFormProps = {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
  memberData: MemberProps;
};

const ApplicationForm = (props: MemberFormProps) => {
  const { isOpen, onClose, memberId } = props;

  const { data: memberDatas, isValidating } = useSWR<MemberProps>(
    `/api/application/getDetails?id=${memberId}`
  );
  // eslint-disable-next-line
  //@ts-ignore
  const memberData = memberDatas?.data;
  const color = useColorModeValue("dark.100", "dark.500");

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
          Members Details
        </DrawerHeader>

        <DrawerBody>
          {isValidating ? (
            <Flex alignItems="center" justifyContent="center" height="full">
              <Heading>Loading...</Heading>
            </Flex>
          ) : (
            <ApplicationDetails
                memberId={memberId}
                onClose={onClose}
                memberData={memberData} membershipStatus={undefined}            
            />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplicationForm;
