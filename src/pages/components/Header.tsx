import {
    Avatar,
    AvatarBadge,
    Flex,

    HStack,

    HTMLChakraProps,
    MenuButton,
    Text,
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
    title?:string
  }
  
  export function Header({title} : HeaderProps) {
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
            
            align="center"
            justify="space-between"
           
            cursor="pointer"
            pos="relative"
    
      pb="8"
      flex="1"
     
            p={2}
            py={10}
            gap ={10}
          >
            
            <Text fontSize={"32px"} fontWeight="700"> {title}</Text>
         
         <HStack>
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
            </HStack>
  
           
           
          </Flex>
      
    )
  }
  
  export default React.memo(Header)
  