import { chakra, HTMLChakraProps } from "@chakra-ui/react";

export const AttachIcon = (props: HTMLChakraProps<"svg">) => {
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M16.8278 9.24379L9.70741 16.3642C7.75479 18.3168 4.58896 18.3168 2.63634 16.3642C0.683719 14.4116 0.68372 11.2457 2.63634 9.29312L9.47171 2.45776C10.7735 1.15601 12.884 1.15601 14.1858 2.45776C15.4875 3.7595 15.4875 5.87005 14.1858 7.1718L7.36135 13.9962C6.71048 14.6471 5.6552 14.6471 5.00433 13.9962C4.35345 13.3453 4.35345 12.2901 5.00433 11.6392L11.2258 5.41774"
        stroke="#979797"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </chakra.svg>
  );
};

export default AttachIcon;
