import { chakra, HTMLChakraProps } from "@chakra-ui/react";

export const PlusIcon = (props: HTMLChakraProps<"svg">) => {
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="-10 -5 24 24"
      {...props}
    >
      <path
        d="M1 6H11M6 1V11"
        stroke="#71D58D"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </chakra.svg>
  );
};

export default PlusIcon;
