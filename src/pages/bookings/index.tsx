import { Center, Heading } from "@chakra-ui/react";
import Layout from "../components/Layout";
import PageContainer from "../components/PageContainer";

const Bookings = () => {
  return (
    <>
      <Layout title={""} description={""}>
        <PageContainer>
          <Center>
            <Heading>Bookings Page</Heading>
          </Center>
        </PageContainer>
      </Layout>
    </>
  );
};

export default Bookings;
