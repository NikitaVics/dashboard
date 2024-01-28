import {  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody,  useColorModeValue, Heading, Flex } from "@chakra-ui/react";
import React from "react";
import { AddCoachProps } from "@/service/types";
import useSWR from "swr";
import CoachDetails from "./Forms/coachDetails";


type CoachFormProps = {
    isOpen: boolean
    onClose: () => void
    coachId: string
    coachData: AddCoachProps
  }

const CoachForm = (props: CoachFormProps) => {
    const { isOpen, onClose, coachId } = props

    const { data: coachData, isValidating } = useSWR<AddCoachProps>(
      `/api/coach/coach-details?name=${coachId}`,
    )

  const color = useColorModeValue("dark.100","dark.500")

  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="md" >
      <DrawerOverlay />
      <DrawerContent bgColor={color}>

        <DrawerCloseButton  h="40px" w="40px" mt={3} bgColor="rgba(0, 0, 0, 0.08)"/>
        <DrawerHeader fontSize="28px" fontWeight="700">Coach Details</DrawerHeader>

        <DrawerBody>
        {isValidating ? (
            <Flex alignItems="center" justifyContent="center" height="full">
            <Heading>Loading...</Heading>
          </Flex>
          ) : (
       
      <CoachDetails status={undefined}  coachData={coachData} coachId={coachId}/>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CoachForm;
