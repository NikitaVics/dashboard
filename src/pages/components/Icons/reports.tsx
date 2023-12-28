import { chakra, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react"

export const ReportsIcon = (props: HTMLChakraProps<"svg">) => {
  const fillColor = useColorModeValue("#4C4E64", "#EAEAFF")
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="0 0 24 24"
      {...props}
    >
   
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 10C3 6.13401 6.13401 3 10 3V10H3Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.5 21C9.35786 21 6 17.6421 6 13.5H13.5V6C17.6421 6 21 9.35786 21 13.5C21 17.6421 17.6421 21 13.5 21Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>



    </chakra.svg>
  )
}

export default ReportsIcon
