import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  Button,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdAccessTime } from "react-icons/md";

interface CustomTimePickerProps {
  value: string; // Assuming value is a string representing the selected time
  onChange: (value: string) => void; // Function that takes a string argument and returns void
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleHourSelect = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleMinuteSelect = (minute: string) => {
    setSelectedMinute(minute);
  };

  const handleConfirm = () => {
    onChange(`${selectedHour}:${selectedMinute}`);
    setIsOpen(false);
  };

  const bgColor = useColorModeValue("white","rgba(14, 14, 14, 1)")

  return (
    <InputGroup size="sm">
      <Input
        type="text"
        value={value}
        onChange={handleTimeChange}
        placeholder="Time"
        _placeholder={{fontSize:"16px"}}
        pr="2.5rem"
        h="58px"
        bgColor={bgColor}
        fontSize="sm"
        borderRadius="md"
      />
      <InputRightElement width="2.5rem">
        <IconButton
          aria-label="Select Time"
          mt={7}
          _hover={{bg:"none"}}
          icon={<MdAccessTime size="24px" />}
          variant="ghost"
          size="md"
          color="gray.500"
          onClick={() => setIsOpen(true)}
        />
      </InputRightElement>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Time</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box maxH="200px" overflowY="auto">
              <Grid templateColumns="repeat(2, 1fr)" gap="1">
               
              <Flex flexDirection="column">
  {[...Array(24)].map((_, index) => (
    <Button
      key={index}
      onClick={() => handleHourSelect((index + 1).toString())}
      variant={selectedHour === (index + 1).toString() ? "solid" : "ghost"}
      colorScheme="blue"
      size="sm"
    >
      {index + 1}
    </Button>
  ))}
</Flex>


                
                <Flex flexDirection="column">
                  {[...Array(60)].map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => handleMinuteSelect(index.toString())}
                      variant={selectedMinute === index.toString() ? "solid" : "ghost"}
                      colorScheme="blue"
                      size="sm"
                    >
                      {index < 10 ? `0${index}` : index}
                    </Button>
                  ))}
                </Flex>
              </Grid>
            </Box>
          </ModalBody>

          <ModalFooter gap={5}>
           
            <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="blue" mr={2} onClick={handleConfirm}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </InputGroup>
  );
};

export default CustomTimePicker;
