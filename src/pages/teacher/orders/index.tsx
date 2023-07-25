import PageContainer from "@/components/Layout/PageContainer";
import Head from "next/head";
import TeacherOrders from "@/views/Teacher/Orders";

const TeacherOrdersPage = () => {
  return (
    <>
      <Head>
        <title>GV | Đơn hàng</title>
      </Head>
      <PageContainer w="100%">
        <TeacherOrders />
      </PageContainer>
    </>
  );
};

export default TeacherOrdersPage;
