import customTheme from "@/styles/theme"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import React, { ReactNode } from "react"


interface props {
  children: ReactNode
}

export const CustomChakraProvider: React.FC<props> = ({ children }) => {
  const theme = extendTheme(customTheme)

  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export default CustomChakraProvider
