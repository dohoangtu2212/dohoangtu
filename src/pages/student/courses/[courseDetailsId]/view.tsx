import Head from "next/head";
import StudentCourseView from "@/views/Student/CourseView";

const ViewCoursePage = () => {
  return (
    <>
      <Head>
        <title>Xem khoá học</title>
      </Head>
      <StudentCourseView />
    </>
  );
};

export default ViewCoursePage;
