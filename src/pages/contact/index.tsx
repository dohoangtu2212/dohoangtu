import Head from "next/head";
import PageContainer from "@/components/Layout/PageContainer";
import Contact from "@/views/Contact";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Liên hệ</title>
      </Head>
      <PageContainer>
        <Contact />
      </PageContainer>
    </>
  );
};

export default ContactPage;
