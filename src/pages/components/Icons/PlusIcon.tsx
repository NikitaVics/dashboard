import { chakra, HTMLChakraProps } from "@chakra-ui/react";

export const PlusIcon = (props: HTMLChakraProps<"svg">) => {
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="-10 -5 24 24"
      stroke="#71D58D"
      {...props}
    >
<<<<<<< HEAD
      <path
        d="M1 6H11M6 1V11"
        stroke="#71D58D"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
=======
   
  
<path d="M1 6H11M6 1V11" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>




>>>>>>> 7ba26a094e95714352b40b20db2a2c02f042f9e9
    </chakra.svg>
  );
};

export default PlusIcon;
