import Head from "next/head";
import PageContainer from "@/components/Layout/PageContainer";
import Courses from "@/views/Courses";

const CoursePage = () => {
  return (
    <>
      <Head>
        <title>Khoá học</title>
      </Head>
      <PageContainer>
        <Courses />
      </PageContainer>
    </>
  );
};

export default CoursePage;
