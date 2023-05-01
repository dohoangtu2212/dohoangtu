import Head from "next/head";
import MyCourseView from "@/views/App/MyCourse/View";

const ViewCoursePage = () => {
  return (
    <>
      <Head>
        <title>{/* Course name */}</title>
      </Head>
      <MyCourseView/>
    </>
  );
};

export default ViewCoursePage;
