import { chakra, HTMLChakraProps } from "@chakra-ui/react";

export const DownloadIcon = (props: HTMLChakraProps<"svg">) => {
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M3 9.16667V10C3 14.1421 6.35786 17.5 10.5 17.5C14.6421 17.5 18 14.1421 18 10V9.16667M7.16667 9.16667L10.5 12.5M10.5 12.5L13.8333 9.16667M10.5 12.5V2.5"
        stroke="#71D58D"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </chakra.svg>
  );
};

export default DownloadIcon;
