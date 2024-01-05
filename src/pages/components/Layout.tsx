import { Box, useBreakpointValue, Grid } from "@chakra-ui/react"
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
  // const containerShadow = useColorModeValue(
  //   "0px 2px 10px rgba(20, 21, 33, 0.18)",
  //   "0px 2px 10px rgba(20, 21, 33, 0.18)",
  // )
 

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
        {...(isDesktopView && { ms: isDrawerOpen ? "300px" : "170px" })}
       
      >
          <Header />
       
        <PageContainer
       
          p="3"
        
        >
          
        
            {children}
          
       
        </PageContainer>
      </Box>
      </Grid>
    </>
  )
}

export default Layout