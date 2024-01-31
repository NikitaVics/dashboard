import { chakra, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react";

export const HamburgerIcon = (props: HTMLChakraProps<"svg">) => {
  const fillColor = useColorModeValue("#4C4E64", "#EAEAFF");
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.6665 9.99996C1.6665 9.53972 2.0396 9.16663 2.49984 9.16663H17.4998C17.9601 9.16663 18.3332 9.53972 18.3332 9.99996C18.3332 10.4602 17.9601 10.8333 17.4998 10.8333H2.49984C2.0396 10.8333 1.6665 10.4602 1.6665 9.99996Z"
        fill={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.6665 4.99996C1.6665 4.53972 2.0396 4.16663 2.49984 4.16663H17.4998C17.9601 4.16663 18.3332 4.53972 18.3332 4.99996C18.3332 5.4602 17.9601 5.83329 17.4998 5.83329H2.49984C2.0396 5.83329 1.6665 5.4602 1.6665 4.99996Z"
        fill={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.6665 15C1.6665 14.5397 2.0396 14.1666 2.49984 14.1666H17.4998C17.9601 14.1666 18.3332 14.5397 18.3332 15C18.3332 15.4602 17.9601 15.8333 17.4998 15.8333H2.49984C2.0396 15.8333 1.6665 15.4602 1.6665 15Z"
        fill={fillColor}
      />
    </chakra.svg>
  );
};

export default HamburgerIcon;
