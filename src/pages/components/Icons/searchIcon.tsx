import { chakra, HTMLChakraProps } from "@chakra-ui/react";

export const SearchIcon = (props: HTMLChakraProps<"svg">) => {
  return (
    <chakra.svg
      width="40px !important"
      height="40px !important"
      viewBox="-5 -22 40 40"
      fill="none"
      {...props}
    >
      <path
        d="M11.4614 11.4549L16.5 16.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
        stroke="#7C7C7D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </chakra.svg>
  );
};

export default SearchIcon;
