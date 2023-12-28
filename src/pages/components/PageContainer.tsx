import { Container, ContainerProps } from "@chakra-ui/layout"
import { Portal, Progress, Spinner, useBreakpointValue } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React from "react"
import { Header } from "./Header"

interface PageContainerProps extends ContainerProps {
  isLoading?: boolean
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  function PageContainer(props, ref) {
    const { children, isLoading, ...rest } = props
    const isMobileView = useBreakpointValue({ base: true, md: false })

    return (
      <Container
        ref={ref}
        pos="relative"
        px={{ base: 2, md: 2, lg: 4 }}
        pb="8"
        flex="1"
        maxW="15xl"
        mx="0"
        {...rest}
      >
      
        {isLoading ? (
          <Portal>
            <Progress
              size="xs"
              isIndeterminate
              pos="fixed"
              left="0"
              top="0"
              right="0"
              zIndex="overlay"
            />
            <Spinner
              aria-label="spinner"
              thickness="8px"
              speed="0.65s"
              emptyColor="gray.700"
              color="primary.500"
              size="xl"
              zIndex="tooltip"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              {...(isMobileView && { marginLeft: "-40px" })}
              height="80px"
              width="80px"
            />
          </Portal>
        ) : (
          <>
         
          <motion.div
            style={{ height: "inherit" }}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
          
            {children}
         
          </motion.div>
          </>
        )}
      </Container>
    )
  },
)

export default PageContainer
