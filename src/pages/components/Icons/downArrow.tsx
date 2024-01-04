import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export const DownArrowIcon = (props: HTMLChakraProps<"svg">) => {
 
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="-3 -8 24 24"
      fill="none"
      {...props}
    >
   
   
<path d="M1 1L7 7L13 1" stroke="#434345" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>





    </chakra.svg>
  )
}

export default DownArrowIcon
