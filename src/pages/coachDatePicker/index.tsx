import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import CalenderIcon from "../components/Icons/calenderIcon";
import { format } from "date-fns";

interface CustomDatePickerProps {
  onDateSelect: (date: Date) => void;
  onClear: () => void;
  value: string | null;
  placeholder: string;
  border: string;
  disabled?: boolean; // Add disabled prop
}

const DatePicker = ({
  onDateSelect,
  onClear,
  value,
  placeholder,
  border,
  disabled = false, // Default to false if disabled prop is not provided
}: CustomDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [formattedDate, setFormattedDate] = useState<string>(value || "");

  const [input, setInput] = useState("");

  const bgColor = useColorModeValue("light.200", "dark.300");

  const handleClear = () => {
    setSelectedDate(null);
    setFormattedDate("");
    setInput("");
    setShowDatePicker(false);
    onClear();
  };

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    const formatted = format(date, "yyyy-MM-dd");
    setFormattedDate(formatted);
    setInput(formatted);
  };

  const toggleDatePicker = () => {
    if (!disabled) {
      setShowDatePicker(!showDatePicker);
    }
  };

  const applyDateSelection = () => {
    setInput(formattedDate);
    if (selectedDate) {
      onDateSelect(selectedDate);
      setShowDatePicker(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="relative">
          <div onClick={toggleDatePicker} style={{ cursor: "pointer" }}>
            <InputGroup>
              <Input
                h="56px"
                placeholder={placeholder}
                value={value ? value : input}
                bgColor={bgColor}
                border={border ? border : undefined}
                readOnly
                _readOnly={{ cursor: disabled ? "not-allowed" : "pointer" }}
                isReadOnly={disabled}
                pointerEvents={disabled ? "none" : "auto"}
              />
              <InputRightElement>
                <CalenderIcon 
                mt={4} 
                />
              </InputRightElement>
            </InputGroup>
          </div>

          <Modal isOpen={showDatePicker} onClose={toggleDatePicker}>
            <ModalOverlay />
            <ModalContent bgColor={bgColor} color="black">
              <ModalHeader>Select Date</ModalHeader>
              <ModalCloseButton />
              <ModalBody bgColor={bgColor}>
                <Calendar
                // eslint-disable-next-line
                //@ts-ignore
                  date={selectedDate}
                  onChange={(date) => handleSelect(date as Date)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="rgba(20, 20, 20, 1)"
                  border="2px solid rgba(20, 20, 20, 1)"
                  onClick={handleClear}
                  mr={3}
                >
                  Clear
                </Button>
                <Button
                  color="#fff"
                  bgColor={"rgb(61, 145, 255)"}
                  _hover={{ bgColor: "#fff", color: "rgb(61, 145, 255)" }}
                  onClick={applyDateSelection}
                >
                  Apply
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
