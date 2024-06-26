import {
  Box,
  useBreakpointValue,
  Grid,
  useColorModeValue,
  Hide,
  Show,
} from "@chakra-ui/react";
import React from "react";

import useStore from "@/hooks/useStore";
import PageContainer from "./PageContainer";
import DesktopDrawer from "./Sidebar/DesktopDrawer";
import Header from "./Header";
import { MobileHeader } from "./MobileHeader";

type LayoutProps = {
  title: string;
  description: string;
  footerRequired?: boolean;
  showBackButton?: boolean;
  showBackButtonSubHeader?: boolean;
  showBackButtonTabletSubheader?: boolean;
  showBackButtonMobileSubheader?: boolean;
};

export function Layout(props: React.PropsWithChildren<LayoutProps>) {
  const { children } = props;
  const isDesktopView = useBreakpointValue({ base: false, md: true, xl: true });
  const [isDrawerOpen] = useStore((state) => [state.isDrawerOpen]);
  const bgColor2 = useColorModeValue(
    "rgba(248, 248, 248, 1)",
    "rgba(0, 0, 0, 0.02)"
  );

  const { title } = props;
  return (
    <>
      <Grid>
        <Hide below="md">
          <DesktopDrawer />
        </Hide>

        <Box
          display="flex"
          flexDirection="column"
          flex="1"
          minW="0"
          transition="margin 300ms cubic-bezier(0.2, 0, 0, 1) 0s"
          {...(isDesktopView && { ms: isDrawerOpen ? "300px" : "150px" })}
        >
          <Hide below="md">
            <Header title={title} />
          </Hide>
          <Show below="md">
            <MobileHeader title={title} />
          </Show>

          <PageContainer p="3" bgColor={bgColor2} overflow={"visible"}>
            {children}
          </PageContainer>
        </Box>
      </Grid>
    </>
  );
}

export default Layout;
