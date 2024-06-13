import PageContainer from "@/components/Layout/PageContainer";
import ManageTeacher from "@/views/Manage/Teacher";
import Head from "next/head";

const ManageTeacherPage = () => {
  return (
    <>
      <Head>
        <title>Quản lý giáo viên</title>
      </Head>
      <PageContainer>
        <ManageTeacher />
      </PageContainer>
    </>
  );
};

export default ManageTeacherPage;
