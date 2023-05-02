import { Text } from "@chakra-ui/react";
import StudentCourses from "@/views/Student/Courses";
import Head from "next/head";
import { MdClose } from "react-icons/md";
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
