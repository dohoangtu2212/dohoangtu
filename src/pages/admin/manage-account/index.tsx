import PageContainer from "@/components/Layout/PageContainer";
import ManageAccount from "@/views/Manage/Account";
import Head from "next/head";

const ManageAccountPage = () => {
  return (
    <>
      <Head>
        <title>Quản lý tài khoản</title>
      </Head>
      <PageContainer>
        <ManageAccount />
      </PageContainer>
    </>
  );
};

export default ManageAccountPage;
