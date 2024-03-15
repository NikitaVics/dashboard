import useTranslation from "next-translate/useTranslation"
import React from "react"

import Layout from "./components/Layout"
import PageContainer from "./components/PageContainer"
import { useUser } from "@/hooks/useUser"

function Home() {
  const { t } = useTranslation("")
  const { isLoading } = useUser()
  return (
    <>
      <Layout  description={t("page.description")} title={""}>
        
       <PageContainer
         isLoading={isLoading}
         as="section"
         maxW="full"
         height="100vh"
         px="0"
         mt={{ base: 8, md: 8, lg: 0 }}
         filter={isLoading ? "blur(3px)" : "none"}
        > 
        
        </PageContainer> 
      
      </Layout>
    </>
  )
}

export default Home
