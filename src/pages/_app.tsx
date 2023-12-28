import "@fontsource/inter/500.css"

import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { SWRConfig } from "swr"


import CustomChakraProvider from "./components/CustomChakraProvider"
import UserProvider from "@/hooks/useUser"
import Layout from "./components/Layout"

export class CustomError extends Error {
  info
  status
  constructor(
    message: string,
    info?: {
      [key: string]: string
    },
    status?: number,
  ) {
    super(message)
    this.status = status
    this.info = info
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  const router = useRouter()

  // SWR data fetcher method
  const fetcher = async (url: string, queryParams: string) => {
    let urlWithParams = url

    if (queryParams) {
      urlWithParams = url + queryParams
    }
    const res = await fetch(urlWithParams)

    // If the status code is not in the range 200-299,
    if (!res.ok) {
      const error = new CustomError(
        "An error occurred while fetching the data.",
      )

      if (res.status === 401) {
        const forgotPasswordPageURL = "/forgot"
        const currentLocation = window.location.toString()
        if (!currentLocation.endsWith(forgotPasswordPageURL)) {
          const returnToPath =
            currentLocation.replace(new URL(currentLocation).origin, "") || "/"
          await router.replace(
            `/login?returnTo=${encodeURIComponent(returnToPath)}`,
          )
          return
        }
      }

      // Attach extra info to the error object.y
      error.info = await res.json()
      error.status = res.status
      throw error
    }

    // If the response is 204 (No Content), return null.
    if (res.status === 204) {
      return null
    }

    return res.json()
  }
  return (
    <SWRConfig value={{ fetcher }}>
      <CustomChakraProvider>
        <UserProvider>
         
          <Component {...pageProps} />
    
        </UserProvider>
      </CustomChakraProvider>
    </SWRConfig>
  )
}
