import PageContainer from "@/components/Layout/PageContainer";
import AccountInfo from "@/views/AccountInfo";
import Head from "next/head";

const AccountInfoPage = () => {
  return (
    <>
      <Head>
        <title>Quản lý thông tin</title>
      </Head>
      <PageContainer>
        <AccountInfo />
      </PageContainer>
    </>
  );
};

export default AccountInfoPage;
