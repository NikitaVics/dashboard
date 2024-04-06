import { chakra, HTMLChakraProps } from "@chakra-ui/react";

export const ClockIcon = (props: HTMLChakraProps<"svg">) => {
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M10 5V10L12.5 11.5M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
        stroke="rgba(78, 203, 113, 1)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </chakra.svg>
  );
};

export default ClockIcon;
