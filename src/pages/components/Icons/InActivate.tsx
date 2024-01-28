import { chakra, HTMLChakraProps } from "@chakra-ui/react";

export const InActivateIcon = (props: HTMLChakraProps<"svg">) => {
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="#EB5757"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </chakra.svg>
  );
};

export default InActivateIcon;
