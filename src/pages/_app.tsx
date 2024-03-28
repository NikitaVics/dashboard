import "@fontsource/inter/500.css";
import React, {  useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { SWRConfig } from "swr";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";

import CustomChakraProvider from "./components/CustomChakraProvider";
import UserProvider from "@/hooks/useUser";
import NotificationIcon from "./components/Icons/notification";

export class CustomError extends Error {
  info;
  status;
  constructor(
    message: string,
    info?: {
      [key: string]: string;
    },
    status?: number
  ) {
    super(message);
    this.status = status;
    this.info = info;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const fetcher = async (url: string, queryParams: string) => {
    let urlWithParams = url;

    if (queryParams) {
      urlWithParams = url + queryParams;
    }
    const res = await fetch(urlWithParams);
    if (!res.ok) {
      const error = new CustomError(
        "An error occurred while fetching the data."
      );

      if (res.status === 401) {
        setIsLoginModalOpen(true);
        return;
      }

      // Attach extra info to the error object.
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    if (res.status === 204) {
      return null;
    }

    return res.json();
  };

  const handleLogin = () => {
    router.push("/login");
    setIsLoginModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };


  return (
    <SWRConfig value={{ fetcher }}>
      <CustomChakraProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
        <Modal isOpen={isLoginModalOpen} onClose={handleCloseModal} >
          <ModalOverlay />
          <ModalContent >
            <ModalBody >
              <Flex direction="column" align="center" justify="center"  >
                <Stack spacing={4} textAlign="center">
              <Center>  <NotificationIcon /></Center>  

                  <Text fontSize="32px" fontWeight="700">
                    Session Timeout
                  </Text>
                  <Text>
                    You have been logged out due to inactivity.
                  </Text>
                  <Text>Please Log In to continue</Text>
                </Stack>
             
                
              </Flex>
            </ModalBody>
            <ModalFooter maxW={"full"}>
              <Button
                  bgColor="rgba(78, 203, 113, 1)"
                  color="#fff"
                  fontWeight="700"
                  onClick={handleLogin}
                  w="100%"
                >
                  Log in Page
                </Button>
              </ModalFooter>
          </ModalContent>
        </Modal>
      </CustomChakraProvider>
    </SWRConfig>
  );
}
