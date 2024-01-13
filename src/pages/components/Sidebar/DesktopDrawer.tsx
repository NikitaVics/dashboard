import {
  Box,
  Flex,
  HStack,
  HTMLChakraProps,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import React, { FunctionComponent, ReactElement, useState } from "react"

import useStore from "@/hooks/useStore"
import MenuIcon from "../Icons/MenuIcon"
import Behrain from "../Icons/Behrain"
import DashboardIcon from "../Icons/Dashboard"
import BookingsIcon from "../Icons/Bookings"
import ReportsIcon from "../Icons/reports"
import ApplicationIcon from "../Icons/Application"
import MembersIcon from "../Icons/Members"
import CoachIcon from "../Icons/CoachI"
import AnnouncementIcon from "../Icons/Announcement"
import { routePath } from "@/utils/routes"
interface NavLink {
  name: string
  path: string
  icon: React.FC<HTMLChakraProps<"svg">>
}

export const dashboards: Array<NavLink> = [
  { name: "dashbords", path: routePath.dashboard, icon: DashboardIcon },
  { name: "bookings", path: routePath.booking, icon: BookingsIcon },
  { name: "reports", path: routePath.reports, icon: ReportsIcon },
  { name: "application", path:  routePath.application, icon: ApplicationIcon },
  { name: "members", path: routePath.members, icon: MembersIcon },
  { name: "coach", path: routePath.coach, icon: CoachIcon },
  { name: "announcement", path: routePath.announcement, icon: AnnouncementIcon },
]



function DesktopDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useStore((state) => [
    state.isDrawerOpen,
    state.setIsDrawerOpen,
  ])
  
  const hoverColor = useColorModeValue("#fff","black")
  const iconColor = useColorModeValue("rgba(252, 252, 252, 1)","black")

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: isDrawerOpen,
  })
  const { t } = useTranslation("home")

  // const menuTitleBg = useColorModeValue("#e6e6e6", "#53577a")
  const openDrawer = React.useCallback(() => {
    onOpen()
    setIsDrawerOpen(true)
  }, [onOpen, setIsDrawerOpen])

  const closeDrawer = React.useCallback(() => {
    onClose()
    setIsDrawerOpen(false)
  }, [onClose, setIsDrawerOpen])

  const toggleDrawer = React.useCallback(() => {
    if (isOpen) {
      closeDrawer()
    } else {
      openDrawer()
    }
  }, [closeDrawer, isOpen, openDrawer])

  const MenuItem = ({
    name,
    icon,
    path,
  }: {
    name: string
    icon: FunctionComponent<HTMLChakraProps<"svg">>
    path: string
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <ListItem mt="0 !important" key={path} listStyleType="none"  onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        <Link
          href={path}
          cursor="pointer"
          fontWeight="400"
          display="flex"
          alignItems="center"
          position="relative"
          pl="2"
          py="3"
          ml="4"
          borderRadius="4px"
          _hover={{
            bgColor: "green.500",
            color: hoverColor,
           
          }}
          _focus={{
            outline: "none",
          }}
          _activeLink={{
            color:hoverColor,
            bgColor: "gray.850",
            _before: {
              content: '""',
              position: "absolute",
              insetStart: "0",
              width: 3,
              height: 8,
            },
          }}
          // {...(isActive && { background: "blue.500", color: "light.100" })}
        >
          <ListIcon
            as={icon}
            mx={isDrawerOpen ? 5 : 4}
            justifyContent="center"
            stroke={isHovered ? iconColor : "rgba(124, 124, 125, 1)"}
            alignItems="center"
            textAlign="center"
         
          />
         
         {isDrawerOpen && (
            <Box
              fontSize="sm"
              width="full"
              whiteSpace="nowrap"
              position="relative"
            >
              <Flex alignItems="center">{t(`sideMenus.${name}`)}</Flex>
            </Box>
          )}
        </Link>
      </ListItem>
    )
  }

  const Title = ({
    leftIcon,
    text,
  }: {
    leftIcon?: ReactElement
    text: string
  }) => (
    <Flex     ml={isDrawerOpen ? 4 : ""} 
    px="5" py="3" alignItems="center">
      {leftIcon}
      { (
        <Text
          fontSize="sm"
          fontWeight="400"
          // background={menuTitleBg}
          borderRadius="4px"
        >
          {text}
        </Text>
      )}
    </Flex>
  )
const bgColor = useColorModeValue("#fff","rgba(14, 14, 14, 1)")
  return (
    <Box
      aria-label="leftNavigation"
      as="nav"
      w={isDrawerOpen ? "270px" : "120px"}
      transition="width 300ms cubic-bezier(0.2, 0, 0, 1) 0s"
      position="fixed"
      h="100vh"
      bgColor={bgColor}
      color={"rgba(124, 124, 125, 1)"}
    >
      <Flex flexDirection="column" h="full">
        <HStack
          cursor="pointer"
          justifyContent="space-around"
          alignItems="end"
          height="64px"
        >
          
         
        </HStack>
        <Flex ><MenuIcon ml={10}  onClick={toggleDrawer}/>{isDrawerOpen ?  <Behrain mt={2}/> : "" }</Flex>

        <List as="ul" spacing="2" styleType="none" flex="1" overflow="auto">
      
        <Title text={t("sideMenus.title")}  />
    
          {
            dashboards.map(({ path, icon, name }) => {
              return <MenuItem key={path} name={name} icon={icon} path={path} />
            })}
         
         
        </List>
      </Flex>
    </Box>
  )
}

export default DesktopDrawer