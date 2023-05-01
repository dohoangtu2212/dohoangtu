import PageContainer from "@/components/Layout/PageContainer";
import Head from "next/head";
import CoursesCreate from "@/views/Courses/Create";

const CoursesCreatePage = () => {
  return (
    <>
      <Head>
        <title>Khoá học | Tạo mới</title>
      </Head>
      <PageContainer>
        <CoursesCreate />
      </PageContainer>
    </>
  );
};

export default CoursesCreatePage;
