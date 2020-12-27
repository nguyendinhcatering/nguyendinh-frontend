/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { Box, Styled, Button, jsx } from "theme-ui";
import { wrapper } from "../../../store";
import API from "../../../utils/api";
import { fetchOrderMasterData } from "../../../store/global/actions";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import Card from "../../../components/ui/Card";
import Wysiwyg from "../../../components/renderer/wysiwyg";
import { padStart } from "../../../utils/string";
import moment from "moment";
import { startCase, get } from "lodash";
import { formatNumber } from "../../../utils/number";
import { useSelector } from "react-redux";
import {
  getSortedFoodItems,
  getSortedFoodItemsOrder,
} from "../../../utils/order";
import { useRouter } from "next/router";
import Page from "../../../components/layout/Page";

const Field = ({ header, data }) => {
  if (!data) {
    return null;
  }

  return (
    <Box>
      <Styled.h6 className="text-red-5 important:mb-0">{header}</Styled.h6>
      <Styled.p className="important:mb-2">{data}</Styled.p>
    </Box>
  );
};

const OrderDetail = ({ order, layout, page }) => {
  const router = useRouter();
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedItemsOrder, setSortedItemsOrder] = useState({});
  const masterData = useSelector((state) => state.global.orderMasterData);

  useEffect(() => {
    const currentSortedItems = getSortedFoodItems(order.orderData.presetItems);

    setSortedItems(currentSortedItems);
    setSortedItemsOrder(getSortedFoodItemsOrder(currentSortedItems));
  }, [order.orderData.presetItems]);

  console.log(order);

  const orderDate = moment(order.orderDateText, "DD/MM/YYYY");

  return (
    <DefaultLayout layout={layout}>
      <Page
        page={page}
        header={
          <Box className="print:pt-6">
            <Box className="important:min-h-96 nd-default-background flex justify-center items-center print:hidden">
              <Box className="container flex justify-center items-center" />
            </Box>
          </Box>
        }
      >
        <Box className="flex justify-center items-stretch important:-mt-6 important:mb-5 relative">
          <Box className="container">
            <Card>
              <Box className="p-5 print:p-4">
                <Box className="flex flex-col">
                  <Box className="important:mb-4">
                    Cảm ơn Quý khách đã gửi đơn hàng tới Nguyên Đình. Dưới đây
                    là thông tin đặt hàng của quý khách
                  </Box>
                  <Box className="flex flex-col md:flex-row">
                    <Box className="flex-1">
                      <Styled.p>Mã đơn hàng của bạn</Styled.p>
                      <Styled.h4
                        sx={{
                          color: "red.5",
                          fontWeight: "bold",
                          fontFamily: "body",
                        }}
                      >
                        ND{padStart(order.id, 6)}
                      </Styled.h4>
                    </Box>
                    <Box className="flex-1">
                      <Box>Ngày giao hàng | Thời gian giao hàng</Box>
                      <Box>
                        <Styled.h4
                          sx={{
                            color: "red.5",
                            fontWeight: "bold",
                            fontFamily: "body",
                          }}
                        >
                          <span>
                            {orderDate.format("L")} (
                            {startCase(orderDate.format("dddd"))})
                          </span>
                          <span>{" | "}</span>
                          <span>{order.orderTimeText}</span>
                        </Styled.h4>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
            <Box className="flex important:mt-4 md:space-x-4 flex-col md:flex-row items-stretch">
              <Box sx={{ minWidth: ["full", "full", "1/3"] }}>
                <Card sx={{ height: "full" }}>
                  <Box className="p-4">
                    <Box>
                      <Styled.h4 className="text-red-5">
                        Thông tin khách hàng
                      </Styled.h4>
                      <Box sx={{ marginTop: 3 }}>
                        <Field header="Họ và tên" data={order.fullName} />
                        <Field header="Email" data={order.email} />
                        <Field header="Số điện thoại" data={order.phone} />
                        <Field
                          header="Số điện thoại nhà"
                          data={order.alternativePhone}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ marginTop: 4 }}>
                      <Styled.h4 className="text-red-5">
                        Thông tin đặt hàng
                      </Styled.h4>
                      <Box sx={{ marginTop: 3 }}>
                        <Field
                          header="Địa chỉ đặt hàng"
                          data={get(order, "address")}
                        />
                        <Field
                          header={
                            "Số lượng " + get(order, "orderData.meta.unit", "")
                          }
                          data={`${order.orderData.quantity} ${get(
                            order,
                            "orderData.meta.unit",
                            ""
                          )}`}
                        />
                        <Field header="Loại hình tiệc" data={order.orderType} />
                        <Field
                          header="Đặc điểm nơi tổ chức tiệc"
                          data={order.orderPlaceType}
                        />
                        <Field
                          header="Ngày giao hàng"
                          data={orderDate.format("L")}
                        />
                        <Field
                          header="Thời gian giao hàng"
                          data={order.orderTimeText}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Box>
              <Box className="flex-1 important:mt-4 md:important:mt-0">
                <Card className="flex-1">
                  <Box className="p-4">
                    <Box className="text-red-5">
                      <Styled.h4 className="important:font-bold">
                        {order.orderData.meta.presetName}
                      </Styled.h4>
                      <Styled.p className="font-heading">
                        {formatNumber(order.orderData.unitPrice)} VND /{" "}
                        {get(order, "orderData.meta.unit", "mâm")}
                        /&nbsp;
                        {get(
                          order,
                          "orderData.meta.presetType.numberOfPeople",
                          6
                        )}{" "}
                        người
                      </Styled.p>
                    </Box>
                    <Styled.hr />
                    <Box>
                      {sortedItems.map((category) => {
                        if (category.foodItems.length === 0) {
                          return;
                        }
                        return (
                          <Box className="important:mb-2" key={category.name}>
                            <Styled.h5 className="text-red-5 important:mb-2">
                              {category.name}
                            </Styled.h5>
                            {category.foodItems.map((foodItem) => (
                              <Box key={foodItem.id}>
                                <span
                                  sx={{ minWidth: 8, display: "inline-block" }}
                                >
                                  {sortedItemsOrder[foodItem.id]}.
                                </span>
                                <span>{foodItem.name}</span>
                              </Box>
                            ))}
                          </Box>
                        );
                      })}
                    </Box>
                    <Styled.hr />
                    <Box>
                      <Box className="flex important:w-full justify-between items-center">
                        <Styled.h5 sx={{ color: "red.5" }}>
                          Số {get(order, "orderData.meta.unit", "mâm")}
                        </Styled.h5>
                        <Box>{order.orderData.quantity}</Box>
                      </Box>
                      <Box className="flex important:w-full justify-between items-center">
                        <Styled.h4 sx={{ color: "red.5" }}>
                          Tổng thanh toán
                        </Styled.h4>
                        <Box>
                          {formatNumber(
                            order.orderData.unitPrice * order.orderData.quantity
                          )}{" "}
                          VNĐ
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              <Card>
                <Box className="p-5 print:p-4">
                  <Wysiwyg data={masterData.responsibility} />
                  <Box className="flex items-center w-full justify-center md:space-x-2 flex-col md:flex-row important:mt-4 print:hidden">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        window.print();
                      }}
                    >
                      In đơn hàng{" "}
                    </Button>
                    <Button
                      onClick={() => router.push("/")}
                      className="order-first md:order-last"
                    >
                      Trở về trang chủ
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      </Page>
    </DefaultLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, ...ctx }) => {
    const { id, secret } = ctx.query;

    const data = await API.getOrderById(id, secret);

    const layout = await API.getLayoutData();
    const page = await API.getPage("/order/detail/[id]");

    await store.dispatch(fetchOrderMasterData());

    return {
      props: {
        layout,
        page,
        order: data ? data : {},
      },
    };
  }
);

export default OrderDetail;
