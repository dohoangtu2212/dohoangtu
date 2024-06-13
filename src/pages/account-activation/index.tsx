import Head from "next/head";
import PageContainer from "@/components/Layout/PageContainer";
import AccountActivation from "@/views/AccountActivation";

const AccountActivationPage = () => {
  return (
    <>
      <Head>
        <title>Kích hoạt tài khoản</title>
      </Head>
      <PageContainer>
        <AccountActivation />
      </PageContainer>
    </>
  );
};

export default AccountActivationPage;
