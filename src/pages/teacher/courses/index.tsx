import Head from "next/head";
import TeacherCourses from "@/views/Teacher/Courses";
import PageContainer from "@/components/Layout/PageContainer";

const TeacherCoursesPage = () => {
  return (
    <>
      <Head>
        <title>GV | Khoá học</title>
      </Head>
      <PageContainer>
        <TeacherCourses />
      </PageContainer>
    </>
  );
};

export default TeacherCoursesPage;
