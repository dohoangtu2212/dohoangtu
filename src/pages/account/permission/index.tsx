import PageContainer from "@/components/Layout/PageContainer";
import AccountInfo from "@/views/AccountInfo";
import AccountPermission from "@/views/AccountPermission";
import Head from "next/head";

const AccountPermissionPage = () => {
  return (
    <>
      <Head>
        <title>Quản lý phân quyền</title>
      </Head>
      <PageContainer>
        <AccountPermission />
      </PageContainer>
    </>
  );
};

export default AccountPermissionPage;
