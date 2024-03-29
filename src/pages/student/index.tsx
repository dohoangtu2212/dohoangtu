import PageContainer from "@/components/Layout/PageContainer";
import Head from "next/head";
import StudentHome from "@/views/Student";

const StudentHomePage = () => {
  return (
    <>
      <Head>
        <title>HS | Trang chủ</title>
      </Head>
      <PageContainer>
        <StudentHome />
      </PageContainer>
    </>
  );
};

export default StudentHomePage;
