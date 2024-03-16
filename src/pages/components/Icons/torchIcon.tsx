import { chakra, HTMLChakraProps,  useColorModeValue } from "@chakra-ui/react";

export const TorchIcon = (
  props: HTMLChakraProps<"div"> & { isLight?: boolean }
) => {
  const stroke =  useColorModeValue("#434345","rgba(224, 224, 226, 1)")
  return (
    <chakra.div
      display="flex"
      alignItems="center"
      width="40px"
      height="40px"
      {...props}
    >
      <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
        <path
          d="M13.5 4.5V10.5M13.5 4.5H4.5C3.56812 4.5 3.10218 4.5 2.73463 4.65224C2.24458 4.85523 1.85523 5.24458 1.65224 5.73463C1.5 6.10218 1.5 6.56812 1.5 7.5C1.5 8.43188 1.5 8.89782 1.65224 9.26537C1.85523 9.75542 2.24458 10.1448 2.73463 10.3478C3.10218 10.5 3.56812 10.5 4.5 10.5H13.5M13.5 4.5C15.9 1.5 19.5 1.5 19.5 1.5V13.5C15.9 13.5 13.5 10.5 13.5 10.5M7.5 7.5H9.5"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg width="9" height="19" viewBox="0 0 9 19" fill="none">
        <defs>
          <linearGradient
            id="paint0_linear_2998_591"
            x1="0.5"
            y1="9"
            x2="9"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#62D181" />
            <stop offset="1" stopColor="#62D181" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0.5 4.22222L8.5 0V19L0.5 14.7778V4.22222Z"
          fill="url(#paint0_linear_2998_591)"
        />
      </svg>
    </chakra.div>
  );
};

export default TorchIcon;
