import { Center, Heading } from "@chakra-ui/react"
import Layout from "../components/Layout"
import PageContainer from "../components/PageContainer"

const Application = () => {
    return (
      <>
      <Layout title={""} description={""}>
        <PageContainer>
      <Center>
      <Heading>Application Page</Heading>
      </Center>
      </PageContainer>
      </Layout>
      </>
    )
}

export default Application