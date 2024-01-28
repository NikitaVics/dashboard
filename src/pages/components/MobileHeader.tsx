import {
<<<<<<< HEAD
  Avatar,
  AvatarBadge,
  Flex,
  HTMLChakraProps,
  MenuButton,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import ky from "ky";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import ChakraMenu from "./Menu";
import MobileDrawer from "./Sidebar/MobileDrawer";
import Logo from "./Icons/Logo";
import { InputControl } from "@/components/Input/Input";
import { SearchIcon } from "@chakra-ui/icons";
import { Formik } from "formik";

export interface HeaderProps extends HTMLChakraProps<"header"> {
  understood?: boolean;
  onInviteClick?: () => void;
  is404?: boolean;
  onSmallBoxToggle?: () => void;
  onDrawerToggle?: () => void;
  title?: string;
}

export function MobileHeader({ title }: HeaderProps) {
  const { t } = useTranslation("");
  const router = useRouter();

  const settings = [
    {
      name: t("common:settings.profile"),
    },
    {
      name: t("common:settings.change"),
      onClick: async () => {
        router.push(`/components/changePassword`);
      },
    },
    {
      name: t("common:settings.logout"),
      onClick: async () => {
        const res = await ky.put("");
        if (res) {
          router.push("");
        }
      },
    },
  ];
=======
    Avatar,
    Flex,
    HTMLChakraProps,
    MenuButton,
    Stack,
    Text,
    Box,
  } from "@chakra-ui/react"
  import ky from "ky"
  import { useRouter } from "next/router"
  import useTranslation from "next-translate/useTranslation"
  import React from "react"

  import ChakraMenu from "./Menu"
import MobileDrawer from "./Sidebar/MobileDrawer"
import Logo from "./Icons/Logo"
import { InputControl } from "@/components/Input/Input"
import { SearchIcon } from "@chakra-ui/icons"
import { Formik } from "formik"
import useSWR from "swr"
  
  export interface HeaderProps extends HTMLChakraProps<"header"> {
    understood?: boolean
    onInviteClick?: () => void
    is404?: boolean
    onSmallBoxToggle?: () => void
    onDrawerToggle?: () => void
    title?:string
  }
  
  export function MobileHeader({title} : HeaderProps) {
    const { t } = useTranslation("")
    const router = useRouter()

    const { data : profile} = useSWR(`/api/profile`)
  
    const settings = [
    
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
    
        
        <Stack  p={2}>
              <Flex
            
            align="center"
            justify="space-between"
            h={40}
            cursor="pointer"
            pos="relative"
      pb="8"
      flex="1"
     
    
           
    
            gap ={10}
          >
               <ChakraMenu items={settings}>
              <MenuButton
                as={Avatar}
                src={profile?.imageUrl}
                aria-label="Options"
                size="lg"
              >
                {" "}
              
              </MenuButton>
            </ChakraMenu>
>>>>>>> 7ba26a094e95714352b40b20db2a2c02f042f9e9

  return (
    <Stack p={2}>
      <Flex
        align="center"
        justify="space-between"
        h={40}
        cursor="pointer"
        pos="relative"
        pb="8"
        flex="1"
        gap={10}
      >
        <ChakraMenu items={settings}>
          <MenuButton as={Avatar} aria-label="Options" size="md">
            {" "}
            <AvatarBadge
              boxSize={{ base: "18px", sm: "20px" }}
              bg={"rgba(114, 225, 40, 1)"}
            />{" "}
          </MenuButton>
        </ChakraMenu>

        <Logo w="25" />

        <MobileDrawer />
      </Flex>
      <Box>
        <Formik
          initialValues={{
            firstName: "",
          }}
          onSubmit={() => {}}
        >
          <Box px={3}>
            <InputControl
              inputProps={{
                type: "text",
                placeholder: t(`common:settings.search`),
                fontSize: "md",
                fontWeight: "medium",
                color: "gray.500",
                h: "50px",
                borderRadius: "34px",
              }}
              name="description"
              inputRightElement={<SearchIcon />}
            />
          </Box>
        </Formik>

        <Text fontSize={"20px"} fontWeight={"700"} mt={7}>
          {title}
        </Text>
      </Box>
    </Stack>
  );
}

export default React.memo(MobileHeader);
