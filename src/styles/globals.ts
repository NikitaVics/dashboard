import { GlobalStyleProps, mode } from "@chakra-ui/theme-tools"

// Global style overrides.
const styles = {
  global: (props: GlobalStyleProps) => ({
    html: {
      height: "100%",
    },
    "#__next": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    main: {
      flex: "1 0 auto",
    },
    // Scrollbars.
    // "*::-webkit-scrollbar": {
    //   width: "7px",
    //   height: "7px",
    // },
    // "*::-webkit-scrollbar-track": {
    //   borderRadius: 12,
    //   background: "transparent",
    // },
    // "::-webkit-scrollbar-thumb": {
    //   borderRadius: 12,
    //   background: "gray.600",
    // },
    // "::-webkit-scrollbar-corner": {
    //   background: "transparent",
    // },
    // "input::-ms-reveal, input::-ms-clear": {
    //   display: "none",
    // },
    body: {
      height: "100%",
      color: mode("light.200", "dark.200")(props),
      background: mode("rgba(248, 248, 248, 1)", "dark.500")(props),
    },
  }),
}

export default styles
