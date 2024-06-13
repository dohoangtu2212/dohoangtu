import PageContainer from "@/components/Layout/PageContainer";
import ManagePage from "@/views/Manage/Page";
import Head from "next/head";

const ManageAccountPage = () => {
  return (
    <>
      <Head>
        <title>Quản lý trang chủ</title>
      </Head>
      <PageContainer>
        <ManagePage />
      </PageContainer>
    </>
  );
};

export default ManageAccountPage;
