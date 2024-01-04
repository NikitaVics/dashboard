import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export const BookingsIcon = (props: HTMLChakraProps<"svg">) => {
 
  return (
    <chakra.svg
      width="24px !important"
      height="24px !important"
      viewBox="0 0 24 24"
      {...props}
    >
   
   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 8H19M5 1V3M15 1V3M4.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V6.2C19 5.07989 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H4.2C3.0799 3 2.51984 3 2.09202 3.21799C1.71569 3.40973 1.40973 3.71569 1.21799 4.09202C1 4.51984 1 5.07989 1 6.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.07989 19 4.2 19Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


    </chakra.svg>
  )
}

export default BookingsIcon
