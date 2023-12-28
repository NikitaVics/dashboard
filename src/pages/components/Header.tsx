import {
    Avatar,
    AvatarBadge,
    Container,
    Flex,
    Hide,
    HTMLChakraProps,
    MenuButton,
    Spacer,
    useColorMode,
    useColorModeValue,
  } from "@chakra-ui/react"
  import { Button } from "@chakra-ui/react"
  import ky from "ky"
  import { useRouter } from "next/router"
  import useTranslation from "next-translate/useTranslation"
  import React, { useEffect, useState } from "react"
  
  // import BellIcon from "./Icons/BellIcon"
  // import LanguageSwitch from "./Icons/LanguageSwitchIcon"
  // import Logo from "./Icons/Logo"
  // import MoonIcon from "./Icons/MoonIcon"
  import ChakraMenu from "./Menu"
import DesktopDrawer from "./Sidebar/DesktopDrawer"
  // import Search from "./Search"
  // import Dropdown from "./SelectCountry"
  // import DesktopDrawer from "./Sidebar/DesktopDrawer"
  // import HorizontalDrawer from "./Sidebar/HorizontalDrawer"
  
  export interface HeaderProps extends HTMLChakraProps<"header"> {
    understood?: boolean
    onInviteClick?: () => void
    is404?: boolean
    onSmallBoxToggle?: () => void
    onDrawerToggle?: () => void
  }
  
  export function Header(props: HeaderProps) {
    const { is404 = false, onSmallBoxToggle } = props
    const { t } = useTranslation("")
    const { toggleColorMode } = useColorMode()
    const bgColor = useColorModeValue("white", "#282A42")
    const router = useRouter()
  
    const settings = [
      {
        name: t("common:settings.profile"),
      },
      {
        name: t("common:settings.change"),
        onClick: async () => {
          router.push(`/components/changePassword`)
        },
      },
      {
        name: t("common:settings.logout"),
        onClick: async () => {
          const res = await ky.put("/api/logout")
          if (res) {
            router.push("/login")
          }
        },
      },
    ]
  
    const [isHidden, setIsHidden] = useState(false)
    const [isLogoVisible, setIsLogoVisible] = useState(true)
  
    const handleClick = () => {
      setIsHidden(!isHidden)
      setIsLogoVisible(false)
  
      if (onSmallBoxToggle) {
        onSmallBoxToggle()
      }
    }
  
    const handleLogoClick = () => {
      if (router?.route !== "/") {
        router.push("/")
      }
    }
  
    useEffect(() => {
      setIsLogoVisible(!isHidden)
    }, [isHidden])
  
    return (
      <Container
        // maxW="full"
        w="50"
        height="64px"
        bgColor={bgColor}
        transition="margin 300ms cubic-bezier(0.2, 0, 0, 1) 0s"
        // zIndex="1"
        // position="fixed"
        // left="0"
        right="0"
        {...props}
      >
        <Flex
          justifyContent="space-between"
          align="center"
          h="full"
          height="100%"
          gap={"5"}
        >
          <Hide below="md">
            {/* {!isLogoVisible && (
              <Logo
                aria-label="logo"
                height="65px"
                top={["32px", "12px"]}
                cursor="pointer"
                onClick={handleLogoClick}
              />
            )} */}
  
            {!is404 && ""}
            <Spacer />
          </Hide>
  
         
          <Flex
            h="full"
            align="center"
            justify="flex-end"
            gridGap={{ base: "5", sm: "8" }}
            cursor="pointer"
          >
         
            {/* <MoonIcon onClick={toggleColorMode} /> */}
          
            <ChakraMenu items={settings}>
              <MenuButton
                as={Avatar}
                aria-label="Options"
                size={{ base: "sm", sm: "md" }}
              >
                {" "}
                <AvatarBadge
                  boxSize={{ base: "14px", sm: "20px" }}
                  bg={"rgba(114, 225, 40, 1)"}
                />{" "}
              </MenuButton>
            </ChakraMenu>
  
  
           
           
          </Flex>
        </Flex>
      </Container>
    )
  }
  
  export default React.memo(Header)
  