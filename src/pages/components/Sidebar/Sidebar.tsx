import { useBreakpointValue } from "@chakra-ui/react"
import React from "react"
import DesktopDrawer from "./DesktopDrawer"
import MobileDrawer from "./MobileDrawer"


export function Sidebar() {
  const isMobileView = useBreakpointValue({ base: true, md: true, xl: false })

  return isMobileView ? <MobileDrawer /> : <DesktopDrawer />
}

export default React.memo(Sidebar)
