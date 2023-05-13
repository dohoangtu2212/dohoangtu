import PageContainer from "@/components/Layout/PageContainer";
import Head from "next/head";
import TeacherHome from "@/views/Teacher";

const TeacherHomePage = () => {
  return (
    <>
      <Head>
        <title>GV | Trang chủ</title>
      </Head>
      <PageContainer>
        <TeacherHome />
      </PageContainer>
    </>
  );
};

export default TeacherHomePage;
