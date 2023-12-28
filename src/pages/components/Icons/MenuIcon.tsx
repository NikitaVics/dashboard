import { chakra, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react"

export const MenuIcon = (props: HTMLChakraProps<"svg">) => {
  const fillColor = useColorModeValue("#4C4E64", "#EAEAFF")
  return (
    <chakra.svg
      width="50px !important"
      height="45 !important"
      viewBox="0 0 50 45"
      {...props}
    >


<line x1="1" y1="14" x2="24" y2="14" stroke="black" stroke-width="2" stroke-linecap="round"/>
<line x1="1" y1="22" x2="24" y2="22" stroke="black" stroke-width="2" stroke-linecap="round"/>
<line x1="1" y1="30" x2="24" y2="30" stroke="black" stroke-width="2" stroke-linecap="round"/>
<defs>
<linearGradient id="paint0_linear_1908_1287" x1="46.3426" y1="3.89423" x2="196.046" y2="3.89424" gradientUnits="userSpaceOnUse">
<stop stop-color="#4ECB71"/>
<stop offset="1" stop-color="#259445"/>
</linearGradient>
</defs> 




    </chakra.svg>
  )
}

export default MenuIcon
