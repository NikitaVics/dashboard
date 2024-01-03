import { Box, useBreakpointValue, useColorModeValue,Text, Grid } from "@chakra-ui/react"
import React from "react"

import useStore from "@/hooks/useStore"
import PageContainer from "./PageContainer"
import DesktopDrawer from "./Sidebar/DesktopDrawer"
import Header from "./Header"

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
  const isDesktopView = useBreakpointValue({ base: false, md: true, xl: true })
  const [isDrawerOpen] = useStore((state) => [state.isDrawerOpen])
  const containerShadow = useColorModeValue(
    "0px 2px 10px rgba(20, 21, 33, 0.18)",
    "0px 2px 10px rgba(20, 21, 33, 0.18)",
  )
  const bgColor = useColorModeValue("rgba(248, 248, 248, 1)", "#30334E")

  return (
    <>
    <Grid >
      
      <DesktopDrawer />

      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        minW="0"
        transition="margin 300ms cubic-bezier(0.2, 0, 0, 1) 0s"
        {...(isDesktopView && { ms: isDrawerOpen ? "275px" : "95px" })}
      
      >
       
        <PageContainer
        bgColor="rgba(248, 248, 248, 1)"
          p="3"
        
        >
            <Header />
        
            {children}
          
       
        </PageContainer>
      </Box>
      </Grid>
    </>
  )
}

export default Layout