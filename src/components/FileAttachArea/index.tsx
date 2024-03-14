// FileAttachTextarea.tsx
import React, { useRef, ChangeEvent, useState } from "react";
import { Input, IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

interface FileAttachTextareaProps {
  name: string;
  onFileAttach: (file: File, message: string) => void;
}

const FileAttachTextarea: React.FC<FileAttachTextareaProps> = ({ name, onFileAttach, ...textareaProps }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState<string>("");

  const bgColor = useColorModeValue("light.200", "dark.300");

  const handleFileAttach = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
    
      onFileAttach(file, message);
    }
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <Input
        h="174px"
        placeholder="Type Message ..."
        paddingLeft="40px"
        bgColor={bgColor}
        onChange={handleMessageChange}
        value={message}
        {...textareaProps}
        name="message"
      />
      <input
        type="file"
     
        name={name}
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <Tooltip label="Attach Image" placement="top">
        <IconButton
          icon={<AttachmentIcon />}
          onClick={handleFileAttach}
          position="absolute"
          left="10"
          bg="transparent"
          color="gray.500"
          _hover={{ color: "gray.700" }}
          aria-label="Attach Image"
        />
      </Tooltip>
    </>
  );
};

export default FileAttachTextarea;
