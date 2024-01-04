import {
    Avatar,
    AvatarBadge,
    Flex,

    HTMLChakraProps,
    MenuButton,
    useColorMode,
  } from "@chakra-ui/react"
  import ky from "ky"
  import { useRouter } from "next/router"
  import useTranslation from "next-translate/useTranslation"
  import React from "react"

  import ChakraMenu from "./Menu"
import TorchIcon from "./Icons/torchIcon"
  
  export interface HeaderProps extends HTMLChakraProps<"header"> {
    understood?: boolean
    onInviteClick?: () => void
    is404?: boolean
    onSmallBoxToggle?: () => void
    onDrawerToggle?: () => void
  }
  
  export function Header() {
    const { t } = useTranslation("")
    const { toggleColorMode } = useColorMode()
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
  
   
  
    return (
    
  
         
          <Flex
            h="50"
            align="center"
            justify="end"
            // gridGap={{ base: "5", sm: "8" }}
            cursor="pointer"

          >
         
            <TorchIcon  onClick={toggleColorMode} />
          
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
      
    )
  }
  
  export default React.memo(Header)
  