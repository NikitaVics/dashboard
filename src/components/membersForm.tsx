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
import MembersDetails from "./Forms/membersDetails";
import { MemberProps } from "@/service/types";
import useSWR from "swr";

type MemberFormProps = {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
  memberData: MemberProps;
};

const MembersForm = (props: MemberFormProps) => {
  const { isOpen, onClose, memberId } = props;

  const { data: responseData, isValidating } = useSWR<MemberProps>(
    `/api/members/member-detail?id=${memberId}`
  );
// eslint-disable-next-line
  //@ts-ignore
  const memberData = responseData?.result;

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
          View Details
        </DrawerHeader>

        <DrawerBody>
          {isValidating ? (
            <Flex alignItems="center" justifyContent="center" height="full">
              <Heading>Loading...</Heading>
            </Flex>
          ) : (
         <MembersDetails memberId={memberId} onClose={onClose} memberData={memberData} status={undefined} membershipStatus={""}  />
      
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MembersForm;
