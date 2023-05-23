import StudentCourses from "@/views/Student/Courses";
import Head from "next/head";
import PageContainer from "@/components/Layout/PageContainer";

const StudentCoursesPage = () => {
  return (
    <>
      <Head>
        <title>HS | Khoá học</title>
      </Head>
      <PageContainer>
        <StudentCourses />
      </PageContainer>
    </>
  );
};

export default StudentCoursesPage;
