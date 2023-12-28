import { Center, Heading } from "@chakra-ui/react"
import Layout from "../components/Layout"
import PageContainer from "../components/PageContainer"

const Dashboard = () => {
    return (
        <Layout title={""} description={""}>
            <PageContainer>
        <Center>
        <Heading>Dashboard Page</Heading></Center>
        </PageContainer>
        </Layout>
    )
}

export default Dashboard