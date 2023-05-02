import Head from "next/head";
import StudentCoursesView from "@/views/Student/Courses/View";

const ViewCoursePage = () => {
  return (
    <>
      <Head>
        <title>{/* Course name */}</title>
      </Head>
      <StudentCoursesView />
    </>
  );
};

export default ViewCoursePage;
