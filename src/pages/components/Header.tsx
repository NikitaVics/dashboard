import {
  Avatar,
  Flex,
  HStack,
  HTMLChakraProps,
  MenuButton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import ky from "ky";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import ChakraMenu from "./Menu";
import TorchIcon from "./Icons/torchIcon";
import useSWR from "swr";

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

  const { toggleColorMode } = useColorMode();
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

      <HStack>
        <TorchIcon onClick={toggleColorMode} />

        <ChakraMenu items={settings}>
          <Flex gap={4} align={"center"}>
            <MenuButton
              as={Avatar}
              src={profile?.imageUrl}
              aria-label="Options"
              // size={{ base: "md", sm: "md" }}
              size="lg"
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
