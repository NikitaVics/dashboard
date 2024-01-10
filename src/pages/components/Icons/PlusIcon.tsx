import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export const PlusIcon = (props: HTMLChakraProps<"svg">) => {
 
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="0 0 24 24"
      {...props}
    >
   
   {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
<path d="M1 6H11M6 1V11" stroke="#71D58D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
{/* </svg> */}




    </chakra.svg>
  )
}

export default PlusIcon
