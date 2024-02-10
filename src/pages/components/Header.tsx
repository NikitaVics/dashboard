import {
  Avatar,
  Flex,
  HStack,
  HTMLChakraProps,
  IconButton,
  MenuButton,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import ky from "ky";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import ChakraMenu from "./Menu";
import TorchIcon from "./Icons/torchIcon";
import useSWR from "swr";
import LightIcon from "./Icons/lightMode";

export interface HeaderProps extends HTMLChakraProps<"header"> {
  understood?: boolean;
  onInviteClick?: () => void;
  is404?: boolean;
  onSmallBoxToggle?: () => void;
  onDrawerToggle?: () => void;
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { t } = useTranslation("");

  const { data: profile } = useSWR(`/api/profile`);

  const { colorMode,toggleColorMode } = useColorMode();
  const router = useRouter();

  const settings = [
    // {
    //   name: t("common:settings.profile"),
    // },
    {
      name: t("common:settings.logout"),
      onClick: async () => {
        const res = await ky.put("/api/logout");
        if (res) {
          router.push("/login");
        }
      },
    },
  ];
  const bgColor = useColorModeValue("light.300", "dark.600");
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
      gap={10}
    >
      <Text fontSize={"32px"} fontWeight="700">
        {" "}
        {title}
      </Text>

      <HStack gap={10}>
      <IconButton aria-label="Toggle Dark Mode" bgColor={bgColor} p={1} py={6} onClick={toggleColorMode}>
      {colorMode === "light" ? <LightIcon ml={2}/> : <TorchIcon ml={2}/>}
    </IconButton>

        <ChakraMenu items={settings}>
          <Flex gap={4} align={"center"}>
            <MenuButton
              as={Avatar}
              src={profile?.imageUrl}
              aria-label="Options"
              // size={{ base: "md", sm: "md" }}
              size="md"
            >
              {" "}
            </MenuButton>
            <Stack gap={0}>
              <Text fontSize={"18px"} fontWeight={"700"}>
                {profile?.name}
              </Text>
              <Text fontSize={"13px"} fontWeight={"400"}>
                {profile?.email}
              </Text>
            </Stack>
          </Flex>
        </ChakraMenu>
      </HStack>
    </Flex>
  );
}

export default React.memo(Header);
