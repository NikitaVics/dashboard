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
}

const DatePicker = ({
  onDateSelect,
  onClear,
  value,
  placeholder,
  border,
}: CustomDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [formattedDate, setFormattedDate] = useState<string>(value || "");

  const bgColor = useColorModeValue("light.200", "dark.300");

  const handleClear = () => {
    setSelectedDate(null);
    setFormattedDate("");
    setShowDatePicker(false);
    onClear();
  };

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    const formatted = format(date, "yyyy-MM-dd");
    setFormattedDate(formatted);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const [input, setInput] = useState("");
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
                value={input}
                bgColor={bgColor}
                border={border ? border : undefined}
                readOnly
              />
              <InputRightElement>
                <CalenderIcon mt={4} />
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
