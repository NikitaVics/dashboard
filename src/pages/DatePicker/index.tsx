import React, { useState } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {  Button, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue } from '@chakra-ui/react';
import CalenderIcon from '../components/Icons/calenderIcon';
import { format } from 'date-fns';



interface CustomDateRangePickerProps {
  onDateRangeSelect: (dateRange: Range[]) => void;
  onClear: () => void;
}


const CustomDateRangePicker = ({ onDateRangeSelect, onClear } :CustomDateRangePickerProps ) => {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
        // eslint-disable-next-line
      // @ts-ignore
      endDate: null,
      key: 'selection',
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isDateRangeSelected, setIsDateRangeSelected] = useState<boolean>(false);

  const handleClear = () => {
      // eslint-disable-next-line
        // @ts-ignore
    setDateRange([{ startDate: null, endDate: null, key: 'selection' }]);
    setIsDateRangeSelected(false);
    setShowDatePicker(false);
    onClear();
  };

  const handleSelect = (ranges: { selection: Range }) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([{ startDate, endDate: endDate || undefined, key: 'selection' }]);
    setIsDateRangeSelected(!!startDate && !!endDate);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const applyDateRange = () => {
    setShowDatePicker(false);
    onDateRangeSelect(dateRange);
  };

const bgColor = useColorModeValue("#fff","#fff")
const formatDate = (date: Date) => {
  return format(date, 'dd/MM/yyyy'); 
};


  return (
    <>
    <div className="w-full">
      <div className="relative">
        <div onClick={toggleDatePicker} style={{ cursor: 'pointer' }}>
          <InputGroup >
            <Input
            h="56px"
              placeholder="Select Date"
              value={dateRange[0]?.startDate ? `${formatDate(dateRange[0].startDate)} - ${formatDate(dateRange[0].endDate || new Date())}` : ''}
              readOnly
       
            />
            <InputRightElement>
              <CalenderIcon mt={4}/>
            </InputRightElement>
          </InputGroup>
        </div>

        <Modal isOpen={showDatePicker} onClose={toggleDatePicker} size="5xl">
          <ModalOverlay />
          <ModalContent  bgColor={bgColor} color = "black"  >
            <ModalHeader>Select Date Range</ModalHeader>
            <ModalCloseButton />
            <ModalBody bgColor={bgColor} >
              <DateRangePicker
              
                ranges={dateRange}
                onChange={(ranges) => handleSelect(ranges as { selection: Range })}
                months={2}
                direction="horizontal"
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
              
               
              />
            </ModalBody>

            <ModalFooter>
              <Button  color="rgba(20, 20, 20, 1)" border="2px solid rgba(20, 20, 20, 1)" onClick={handleClear} mr={3}>
                Clear
              </Button>
              <Button color="#fff" bgColor={"rgb(61, 145, 255)"} _hover={{bgColor: "#fff",color : "rgb(61, 145, 255)"}} onClick={applyDateRange} isDisabled={!isDateRangeSelected}>
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

export default CustomDateRangePicker;
