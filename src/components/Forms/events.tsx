import {
    Flex,
    Grid,
    GridItem,
    Input,
    Textarea,
    useColorModeValue,
    useToast,
    Image,
  } from "@chakra-ui/react";
  import { Form, Formik } from "formik";
  import { ChangeEvent, useEffect, useState } from "react";
  import ky from "ky";
  import { mutate } from "swr";
  import DatePicker from "@/pages/coachDatePicker";
  import CustomTimePicker from "../CustomTimePicker";
  
  type FormItems = {
    id: string;
    eventData?: {
      message: string;
      eventDate: string;
      eventTime: string;
      eventName: string;
      images: string | string[]; // Changed to handle array of images
    };
  
    onClose: () => void;
  };
  
  const EventView = ({ onClose, eventData }: FormItems) => {
    const [showErrorBorder, setShowErrorBorder] = useState(false);
  
   
    const bgColor = useColorModeValue("light.200", "dark.300");
    const color = useColorModeValue(
      "rgba(254, 254, 254, 1)",
      "rgba(14, 14, 14, 1)"
    );
    const borderColor = useColorModeValue(
      "rgba(211, 211, 211, 1)",
      "rgba(57, 57, 57, 1)"
    );
   
    const formatTime = (timeString: string | undefined): string => {
      if (!timeString) return "";
  
      const trimmedTimeString = timeString.replace(/\s/g, "");
  
      const [hours, minutes] = trimmedTimeString.split(":");
  
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
  
      return `${formattedHours}:${formattedMinutes}`;
    };
  
    const [eventName, setEventName] = useState<string>(
      eventData?.eventName || ""
    );
  
    const [selectedTime, setSelectedTime] = useState<string>(
      formatTime(eventData?.eventTime) || ""
    );
  
    const [message, setMessage] = useState<string>(eventData?.message || "");
  

  
    const handleTimeChange = (time : string) => {
      const [hours, minutes] = time.split(':');
      const hoursInt = parseInt(hours, 10);
      const minutesInt = parseInt(minutes, 10);
      const formattedHours = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
      const formattedMinutes = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
      const formattedTime = `${formattedHours}:${formattedMinutes}`;
      setSelectedTime(formattedTime);
    };
 


  
   
  
    const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEventName(e.target.value);
    };
  
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    };
  
    const toast = useToast();
  
  
    const [eventError, setEventError] = useState(false);

    const [dateError, setDateError] = useState(false);
  
    const handleSendClick = async () => {
      try {
        const data = new FormData();
        if (message.trim() !== "") {
          data.append("Message", message);
        } else {
          toast({
            description: "Message is required",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
          setShowErrorBorder(true);
  
          setTimeout(() => {
            setShowErrorBorder(false);
          }, 3000);
        }
  
        if (!selectedDate) {
          toast({
            description: "Event Date is required",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
  
          setDateError(true);
  
          setTimeout(() => {
            setDateError(false);
          }, 3000);
        }
  
  
        if (eventName.trim() !== "") {
          data.append("EventName", eventName);
        } else {
          toast({
            description: "EventName is required",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
          setEventError(true);
  
          setTimeout(() => {
            setEventError(false);
          }, 3000);
        }
  
     
  
        const scheduledDateTimes = selectedDate
        ? `${selectedDate.getFullYear()}-${
            String(selectedDate.getMonth() + 1).padStart(2, "0")
          }-${String(selectedDate.getDate()).padStart(2, "0")}`
        : "";
      
        const time = selectedTime;
        const [hours, minutes] = time.split(':');
        const utcTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00Z`;
        
       
        
        const utcDate = `${scheduledDateTimes.split('T')[0]}T${utcTime}`;
        
        data.append("EventDateTime", utcDate);
        
  
       

  
        const response = await ky.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Management/Announcement/create EventAnnouncement`,
          {
            body: data,
          }
        );
  
        if (response) {
          toast({
            description: "Successfully added",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
          
          onClose?.();
          await mutate(`/api/announcement/getAnnouncement?announcementType=${""}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  
  
    const handleClearDate = () => {
      setSelectedDate(null);
      
    };
  
  

  
  
  
    
    const [format, setFormat] = useState("");
  
  
  
 
  
  
  const eventDate = eventData?.eventDate;
  
  useEffect(() => {
    if (eventDate) {
      const eventDates = eventDate.trim(); 
      const months: { [key: string]: string } = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04',
        May: '05', Jun: '06', Jul: '07', Aug: '08',
        Sep: '09', Oct: '10', Nov: '11', Dec: '12'
      };
  
  
      const parts = eventDates.split(" ");
      const day = parts[0]; 
      const monthAbbreviation = parts[1].slice(0, 3); 
      const year = parts[2]; 
  
      const month = months[monthAbbreviation];
  
      const formattedDate = `${year}-${month}-${day}`;
  
    
  
      setFormat(formattedDate);
    }
  }, [eventDate]);
  
  
  
  
  
    return (
      <Formik
        initialValues={{
          firstName: "",
        }}
        onSubmit={handleSendClick}
      >
        {() => (
          <Form noValidate>
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap="8"
              mt={10}
              pt={7}
              pl={4}
              borderRadius={"20px"}
            >
              <GridItem rowSpan={1} colSpan={2}>
                <Input
                  type="text"
                  h="60px"
                  value={eventName}
                  bgColor={bgColor}
                  placeholder="Event Name"
                  _placeholder={{ color: "rgba(124, 124, 125, 1)" }}
                  onChange={handleMessageChange}
                  border={eventError ? "2px solid red" : undefined}
                  readOnly
                />
              </GridItem>
  
              <GridItem rowSpan={1} colSpan={1}>
              <DatePicker
    onDateSelect={(date) => {
      setSelectedDate(date);
      if (date) {
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setFormat(formattedDate);
      }
    }}
    onClear={handleClearDate}
    value={format || ""}
    placeholder="Date"
    isReadOnly 
    disabled={true}
    // eslint-disable-next-line
    //@ts-ignore
    border={dateError ? "2px solid red" : undefined}
    
  />
  
  
  
              </GridItem>
  
              <GridItem rowSpan={1} colSpan={1}>
                {/* <Input
                  type="time"
                  h="60px"
                  bgColor={bgColor}
                  value={selectedTime}
                  onChange={handleTimeChange}
                /> */}
                  <CustomTimePicker value={selectedTime} onChange={handleTimeChange} disabled={true} border={""} />
                
              </GridItem>
  
              <GridItem rowSpan={1} colSpan={2}>
  <div
    style={{
      border: `${ `1px solid ${borderColor}`}`,
      borderRadius: "4px",
      height: "120px",
      backgroundColor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}
  >
    {eventData?.images && Array.isArray(eventData.images) && (
  eventData.images.map((imageUrl, index) => (
    <Flex key={index} position="relative">
      <Image
        src={imageUrl}
        alt={`Selected Image ${index}`}
        ml={1}
        w="150px"
        h="100px"
        objectFit="cover"
      />
      
      
    </Flex>
  ))
)}

    <label
      htmlFor="attachment"
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "4px 8px",
      }}
    >
      
    </label>
  </div>
</GridItem>

  
              <GridItem rowSpan={1} colSpan={2}>
                <Textarea
                  h="174px"
                  placeholder="Type Message ..."
                  _placeholder={{ color: "rgba(124, 124, 125, 1)" }}
                  bgColor={bgColor}
                  onChange={handleTextChange}
                  value={message}
                  readOnly
                  name="message"
                  border={showErrorBorder ? "2px solid red" : undefined}
                />
              </GridItem>
            </Grid>
          </Form>
        )}
      </Formik>
    );
  };
  
  export default EventView;
  