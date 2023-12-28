import { Box, useBreakpointValue, useColorModeValue,Text } from "@chakra-ui/react"
import React from "react"

import useStore from "@/hooks/useStore"
import PageContainer from "./PageContainer"
import DesktopDrawer from "./Sidebar/DesktopDrawer"

type LayoutProps = {
  title: string
  description: string
  footerRequired?: boolean
  showBackButton?: boolean
  showBackButtonSubHeader?: boolean
  showBackButtonTabletSubheader?: boolean
  showBackButtonMobileSubheader?: boolean
}

export function Layout(props: React.PropsWithChildren<LayoutProps>) {
  const { children } = props
  const isDesktopView = useBreakpointValue({ base: false, md: false, xl: true })
  const [isDrawerOpen] = useStore((state) => [state.isDrawerOpen])
  const containerShadow = useColorModeValue(
    "0px 2px 10px rgba(20, 21, 33, 0.18)",
    "0px 2px 10px rgba(20, 21, 33, 0.18)",
  )
  const bgColor = useColorModeValue("#FFFFFF", "#30334E")

  return (
    <>
      <DesktopDrawer />

      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        minW="0"
        transition="margin 300ms cubic-bezier(0.2, 0, 0, 1) 0s"
        {...(isDesktopView && { ms: isDrawerOpen ? "275px" : "90px" })}
      >
       
        <PageContainer
          mt={{
            base: "6",
            lg: "14",
          }}
          p="3"
        >
           {/* <Header
         
         {...(isDesktopView && { ms: isDrawerOpen ? "275px" : "90px" })}
         {...(!isDesktopView && { ms: "90px" })}
       /> */}
          <Box
            h={"100vh"}
            borderRadius="10px"
            boxShadow={containerShadow}
            bgColor={bgColor}
          >
            {children}
          
          </Box>
        </PageContainer>
      </Box>
    </>
  )
}

export default Layout