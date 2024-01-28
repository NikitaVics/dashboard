import { chakra, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react";

export const DotIcon = (props: HTMLChakraProps<"svg">) => {
  const fillColor = useColorModeValue("#4C4E64", "#EAEAFF");
  return (
    <chakra.svg
      width="24px !important"
      height="8px !important"
      viewBox="0 0 8 8"
      {...props}
    >
      <g clipPath="url(#clip0_81_2686)">
        <path
          d="M3.99984 0.666656C2.1565 0.666656 0.666504 2.15666 0.666504 3.99999C0.666504 5.84332 2.1565 7.33332 3.99984 7.33332C5.84317 7.33332 7.33317 5.84332 7.33317 3.99999C7.33317 2.15666 5.84317 0.666656 3.99984 0.666656Z"
          fill={fillColor}
          fillOpacity="0.6"
        />
      </g>
      <defs>
        <clipPath id="clip0_81_2686">
          <rect width="8" height="8" fill="white" />
        </clipPath>
      </defs>
    </chakra.svg>
  );
};

export default DotIcon;
