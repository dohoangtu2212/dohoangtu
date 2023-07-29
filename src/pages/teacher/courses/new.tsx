import Head from "next/head";
import TeacherCoursesNew from "@/views/Teacher/CoursesNew";
import PageContainer from "@/components/Layout/PageContainer";

const TeacherNewCoursePage = () => {
  return (
    <>
      <Head>
        <title>GV | Khoá học | Tạo mới</title>
      </Head>
      <PageContainer w="100%">
        <TeacherCoursesNew />
      </PageContainer>
    </>
  );
};

export default TeacherNewCoursePage;
