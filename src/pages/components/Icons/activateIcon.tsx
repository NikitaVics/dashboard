import { chakra, HTMLChakraProps } from "@chakra-ui/react";

export const ActivateIcon = (props: HTMLChakraProps<"svg">) => {
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="0 0 10 24"
      fill="none"
      {...props}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 5.8332L7.49996 15.8332L2.91663 11.2499L4.09163 10.0749L7.49996 13.4749L16.325 4.6582L17.5 5.8332Z"
          fill="#27AE60"
        />
      </svg>
    </chakra.svg>
  );
};

export default ActivateIcon;
