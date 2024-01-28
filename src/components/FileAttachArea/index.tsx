// FileAttachTextarea.tsx
import React, { useRef, ChangeEvent } from "react";
import { Textarea, IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

interface FileAttachTextareaProps {
  name: string;
  onFileAttach: (file: File) => void;
}

const FileAttachTextarea: React.FC<FileAttachTextareaProps> = ({ name, onFileAttach, ...textareaProps }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const bgColor = useColorModeValue("light.200", "dark.300");

  const handleFileAttach = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileAttach(file);
    }
  };

  return (
    <>
      <Textarea h="174px" placeholder="Type Message ..." paddingLeft="40px" bgColor={bgColor} {...textareaProps} />
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
