import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
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
import Behrain from "../Icons/Behrain"
import DashboardIcon from "../Icons/Dashboard"
import BookingsIcon from "../Icons/Bookings"
import ReportsIcon from "../Icons/reports"
import ApplicationIcon from "../Icons/Application"
import CoachIcon from "../Icons/CoachI"
import AnnouncementIcon from "../Icons/Announcement"
import { routePath } from "@/utils/routes"
import HamburgerIcon from "../Icons/HamburgerIcon"
import { CloseIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"
interface NavLink {
  name: string
  path: string
  icon: React.FC<HTMLChakraProps<"svg">>
}

export const dashboards: Array<NavLink> = [
  { name: "dashbords", path: routePath.dashboard, icon: DashboardIcon },
  { name: "bookings", path: routePath.booking, icon: BookingsIcon },
  { name: "reports", path: routePath.reports, icon: ReportsIcon },
  { name: "members", path: routePath.members, icon: ApplicationIcon },
  { name: "coach", path: routePath.coach, icon: CoachIcon },
  { name: "announcement", path: routePath.announcement, icon: AnnouncementIcon },
]



function MobileDrawer() {

  
  const hoverColor = useColorModeValue("#fff","black")
  const iconColor = useColorModeValue("rgba(252, 252, 252, 1)","black")

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation("home")





  const MenuItem = ({
    name,
    icon,
    path,
  }: {
    name: string
    icon: FunctionComponent<HTMLChakraProps<"svg">>
    path: string
  }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const isActive = path ? router.pathname.includes(path) : false
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
            bgColor: "green.100",
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
          {...(isActive && { background: "green.100", color: hoverColor })}
        >
          <ListIcon
            as={icon}
           
            justifyContent="center"
            stroke={isHovered ? iconColor : "rgba(124, 124, 125, 1)"}
            alignItems="center"
            textAlign="center"
         
          />
         
      
            <Box
              fontSize="sm"
              width="full"
              whiteSpace="nowrap"
              position="relative"
            >
              <Flex alignItems="center">{t(`sideMenus.${name}`)}</Flex>
            </Box>
        
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
    <Flex     
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
      
      color={"rgba(124, 124, 125, 1)"}
    >
      <Flex flexDirection="column" h="full">
        <HStack
          cursor="pointer"
          justifyContent="space-around"
          alignItems="end"
          height="64px"
        >
          
          <HamburgerIcon
          aria-label="logo"
          height="60px"
         
          // top={["32px", "12px"]}
          cursor="pointer"
          onClick={onOpen}
        />
        
        </HStack>
        
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bgColor={bgColor}>
        <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Behrain
              aria-label="logo"
              height="50px"
              top={["32px", "12px"]}
              cursor="pointer"
             
            />
            <CloseIcon onClick={onClose} cursor="pointer" />
          </DrawerHeader>
<DrawerBody>
        <List as="ul" spacing="2" styleType="none" flex="1" overflow="auto">
      
        <Title text={t("sideMenus.title")}  />
    
          {
            dashboards.map(({ path, icon, name }) => {
              return <MenuItem key={path} name={name} icon={icon} path={path} />
            })}
         
         
        </List>
        </DrawerBody>
        </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  )
}

export default MobileDrawer
