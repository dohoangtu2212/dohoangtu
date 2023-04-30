import PageContainer from "@/components/Layout/PageContainer";
import { Text } from "@chakra-ui/react";
import Head from "next/head";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <PageContainer>
        <Text>Trang bạn tìm không được hỗ trợ</Text>
      </PageContainer>
    </>
  );
};

export default NotFoundPage;
