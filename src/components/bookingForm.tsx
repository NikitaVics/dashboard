import {  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody,  useColorModeValue, Heading, Flex } from "@chakra-ui/react";
import React from "react";
import { BookingsProps } from "@/service/types";
import useSWR from "swr";
import BookingDetails from "./Forms/bookingDetails";


type BookingFormProps = {
    isOpen: boolean
    onClose: () => void
    memberId: string
    memberData: BookingsProps
  }

const BookingForm = (props: BookingFormProps) => {
    const { isOpen, onClose, memberId } = props

    const { data: memberData, isValidating } = useSWR<BookingsProps>(
      `/api/bookings/getbookingDetail?id=${memberId}`,
    )
    console.log(memberData)
  const color = useColorModeValue("dark.100","dark.500")

  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="md" >
      <DrawerOverlay />
      <DrawerContent bgColor={color}>

        <DrawerCloseButton  h="40px" w="40px" mt={3} bgColor="rgba(0, 0, 0, 0.08)"/>
        <DrawerHeader fontSize="28px" fontWeight="700">Booking  Details</DrawerHeader>

        <DrawerBody>
        {isValidating ? (
            <Flex alignItems="center" justifyContent="center" height="full">
            <Heading>Loading...</Heading>
          </Flex>
          ) : (
         <BookingDetails memberId={memberId} onClose={onClose} memberData={memberData} status={false} />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default BookingForm;
