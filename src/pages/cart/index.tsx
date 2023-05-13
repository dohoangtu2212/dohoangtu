import Head from "next/head";
import PageContainer from "@/components/Layout/PageContainer";
import Cart from "@/views/Cart";

const CartPage = () => {
  return (
    <>
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <PageContainer>
        <Cart />
      </PageContainer>
    </>
  );
};

export default CartPage;
