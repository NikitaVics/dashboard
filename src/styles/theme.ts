import { extendTheme, ThemeConfig } from "@chakra-ui/react"

import colors from "./foundations/colors"
import styles from "./globals"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "65em",
  xl: "80em",
  "2xl": "96em",
}

const customTheme = extendTheme({
  config,
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },

  colors,
  styles,
  breakpoints,
  components: {},
})

export default customTheme
