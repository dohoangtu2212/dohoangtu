import Head from "next/head";
import PageContainer from "@/components/Layout/PageContainer";
import RegisterTeacher from "@/views/RegisterTeacher";

const RegisterTeacherPage = () => {
  return (
    <>
      <Head>
        <title>Đăng ký giáo viên</title>
      </Head>
      <PageContainer>
        <RegisterTeacher />
      </PageContainer>
    </>
  );
};

export default RegisterTeacherPage;
