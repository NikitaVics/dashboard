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
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdAccessTime } from "react-icons/md";

interface CustomTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  border: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  border,
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [values,setValues] = useState(true)

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
    setValues(true)
  };

  const handleCancel = () => {
    setValues(false)
    setSelectedHour('');
    setSelectedMinute('');
    setIsOpen(false);
   
  };

  const bgColor = useColorModeValue("white", "rgba(14, 14, 14, 1)");

  return (
    <InputGroup size="sm">
      <Input
        type="text"
        value={values ? value : ""}
        onChange={handleTimeChange}
        placeholder="Time"
        _placeholder={{ fontSize: "16px" }}
        pr="2.5rem"
        h="58px"
        bgColor={bgColor}
        fontSize="sm"
        borderRadius="md"
        isReadOnly={disabled}
        border={border ? border : undefined}
        readOnly
      />
      <InputRightElement width="2.5rem">
        <IconButton
          aria-label="Select Time"
          mt={7}
          _hover={{ bg: "none" }}
          icon={<MdAccessTime size="24px" />}
          variant="ghost"
          size="md"
          color="gray.500"
          onClick={() => !disabled && setIsOpen(true)}
        />
      </InputRightElement>

      <Modal isOpen={isOpen && !disabled} onClose={() => setIsOpen(false)} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Time</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="row">
              <Box flex="1" overflowY="auto" maxHeight="200px">
                {[...Array(24)].map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handleHourSelect((index + 1).toString())}
                    variant={selectedHour === (index + 1).toString() ? "solid" : "ghost"}
                    colorScheme="blue"
                    size="sm"
                    isDisabled={disabled} // Disable hour buttons if disabled
                    w="100%"
                    textAlign="center"
                  >
                    {index + 1}
                  </Button>
                ))}
              </Box>

              <Box flex="1" overflowY="auto" maxHeight="200px">
                {[...Array(60)].map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handleMinuteSelect(index.toString())}
                    variant={selectedMinute === index.toString() ? "solid" : "ghost"}
                    colorScheme="blue"
                    size="sm"
                    isDisabled={disabled} // Disable minute buttons if disabled
                    w="100%"
                    textAlign="center"
                  >
                    {index < 10 ? `0${index}` : index}
                  </Button>
                ))}
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter gap={5}>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
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
