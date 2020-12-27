import API from "utils/api";
import { Box, Styled, Button } from "theme-ui";
import { useRouter } from "next/router";
import Page from "components/layout/Page";
import { useSelector } from "react-redux";
import { fetchOrderMasterData } from "../../../store/global/actions";
import { wrapper } from "../../../store";
import Card from "../../../components/ui/Card";
import Wysiwyg from "../../../components/renderer/wysiwyg";

const OrderSent = ({ page }) => {
  const orderMasterData = useSelector((state) => state.global.orderMasterData);
  const savedOrder = useSelector((state) => state.order.savedOrder);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Page
      page={page}
      header={
        <Box className="important:min-h-96 nd-default-background flex justify-center items-center">
          <Box className="container flex justify-center items-center">
            <Styled.h1 className="text-white text-center">
              {orderMasterData.orderSuccessHeader}
            </Styled.h1>
          </Box>
        </Box>
      }
    >
      <Box className="flex justify-center items-center important:-mt-6 important:mb-5 relative">
        <Box className="container">
          <Card>
            <Box className="p-5">
              <Wysiwyg data={orderMasterData.orderSuccessText} />
              <Box className="flex justify-center flex-col md:flex-row important:mt-4">
                <Button
                  variant="secondary"
                  className="md:important:mr-2"
                  onClick={() => router.push("/")}
                >
                  Trở về trang chủ
                </Button>
                <Button
                  className="order-first md:order-last"
                  onClick={() =>
                    router.push(
                      `/order/detail/${savedOrder.id}?secret=${savedOrder.secret}`
                    )
                  }
                >
                  Chi tiết đơn hàng
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Page>
  );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const page = await API.getPage("/order/sent");

  await store.dispatch(fetchOrderMasterData());

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
});

export default OrderSent;
