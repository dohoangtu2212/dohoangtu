import Head from "next/head";
import Home from "@/views/Home";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
        <meta name="description" content="Chinh phục môn TOÁN kì thi THPT QG cùng Đỗ Hoàng Tú" key="desc" />
        <meta property="og:title" content="Chinh phục môn TOÁN kì thi THPT QG cùng Đỗ Hoàng Tú" />
        <meta
          property="og:description"
          content="Chinh phục môn TOÁN kì thi THPT QG"
        />
        <meta
          property="og:image"
          content="https://www.dohoangtu.edu.vn/images/thumbnail.png"
        />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
