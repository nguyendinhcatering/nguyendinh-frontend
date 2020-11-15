/** @jsx jsx */
import React, { useMemo } from "react";
import { Box, Button, Input, jsx, Label, Styled, Textarea } from "theme-ui";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import API from "../../../utils/api";
import Card from "../../../components/ui/Card";
import { wrapper } from "../../../store";
import { fetchOrderMasterData } from "../../../store/global/actions";
import CurrentOrder from "../../../components/order/CurrentOrder";
import { Select } from "../../../components/ui/Select";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderQuantity, placeOrder } from "../../../store/order/actions";
import TimePicker from "../../../components/ui/TimePicker";
import DatePicker from "../../../components/ui/DatePicker";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
import FormError from "../../../components/ui/Form/FormError";
import { useRouter } from "next/router";
import { getHref } from "../../../utils/getHref";
import Loading from "../../../components/Loading";
import Page from "../../../components/layout/Page";

const paymentMethodTypes = [
  {
    title: "Thanh toán tiền mặt khi giao hàng",
    value: "Thanh toán tiền mặt khi giao hàng",
  },
  {
    title: "Chuyển khoản toàn bộ",
    value: "Chuyển khoản toàn bộ",
  },
];

const SelectExtra = ({ layout, page }) => {
  const router = useRouter();
  const orderQuantity = useSelector((state) => state.order?.quantity);
  const orderPlaceTypes = useSelector(
    (state) => state.global.orderMasterData.orderPlaceTypes
  );
  const orderTypes = useSelector(
    (state) => state.global.orderMasterData.orderTypes
  );
  const changeUrl = useSelector((state) => state.order.meta.url);
  const dispatch = useDispatch();

  const handleChange = () => {
    router.push(
      `${getHref(changeUrl)}?keep-order=true`,
      `${changeUrl}?keep-order=true`
    );
  };

  const handleSubmit = async (value) => {
    dispatch(placeOrder(value));
  };

  const handleChangeQuantity = (e) => {
    dispatch(changeOrderQuantity(e.target.value));
  };

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        fullName: Yup.string().required("Hãy nhập họ và tên của bạn."),
        email: Yup.string()
          .email("Hãy nhập một địa chỉ email chính xác.")
          .required("Hãy nhập email của bạn."),
        phone: Yup.string()
          .min(6, "Hãy nhập một số điện thoại hợp lệ.")
          .required("Hãy nhập số điện thoại của bạn."),
        alternativePhone: Yup.string(),
        orderType: Yup.string().required(
          "Hãy lựa chọn một trong những loại hình tiệc này"
        ),
        orderPlaceType: Yup.string().required(
          "Hãy lựa chọn một trong những đặc điểm nơi tổ chức tiệc này"
        ),
        orderDate: Yup.date()
          .min(
            moment().startOf("day").toDate(),
            "Hãy chọn một ngày giao hàng sau ngày hôm nay"
          )
          .nullable()
          .required("Hãy nhập ngày giao hàng"),
        orderTime: Yup.string()
          .nullable()
          .required("Hãy nhập thời gian giao hàng"),
        address: Yup.string().required("Hãy nhập địa chỉ giao hàng"),
        paymentMethod: Yup.object({
          type: Yup.string().required(),
          account: Yup.string().when("type", {
            is: "Chuyển khoản toàn bộ",
            then: Yup.string().required("Hãy nhập thông tin tài khoản của bạn"),
          }),
        }),
      }),
    []
  );

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <DefaultLayout layout={layout} pullUp={true}>
      <Page page={page}>
        <Box className="important:mx-auto flex important:mb-4 flex-col md:flex-row">
          <Box className="w-full md:w-1/3">
            <Card>
              <Box className="pt-2">
                <Styled.h3 className="important:mb-4 px-3 md:px-4">
                  Lựa chọn của bạn
                </Styled.h3>
                <CurrentOrder onChange={handleChange} />
              </Box>
            </Card>
          </Box>
          <Box className="w-8 py-4" />
          <Box className="w-full md:w-2/3">
            <Card>
              <Box className="pt-2">
                <Styled.h3 className="important:mb-4 px-3 md:px-4">
                  Chi tiết giao hàng
                </Styled.h3>
                <Box>
                  <Box className="w-full px-4 py-4">
                    <Box>
                      <Formik
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        initialValues={{
                          title: "Ông",
                          fullName: "",
                          email: "",
                          phone: "",
                          alternativePhone: "",
                          address: "",
                          orderType: orderTypes[0],
                          orderPlaceType: orderTypes[0],
                          orderDate: moment(),
                          orderTime: moment().set({ minute: 0 }),
                          note: "",
                          paymentMethod: {
                            type: "Chuyển khoản toàn bộ",
                            account: "",
                          },
                        }}
                      >
                        {(props) => (
                          <Form>
                            <Styled.h4 className="text-red-5 important:mb-3">
                              Thông tin khách hàng
                            </Styled.h4>
                            <Box className="flex flex-wrap">
                              <Box
                                className="important:mr-3 important:mb-3"
                                sx={{ minWidth: "1/6" }}
                              >
                                <Label>&nbsp;</Label>
                                <Field as={Select} fullName="title">
                                  <option value="Ông">Ông</option>
                                  <option value="Bà">Bà</option>
                                </Field>
                              </Box>
                              <Box className="flex-grow important:mb-3">
                                <Label>Họ và tên</Label>
                                <Field as={Input} name="fullName" />
                                <FormError name="fullName" />
                              </Box>
                            </Box>
                            <Box className="flex flex-wrap">
                              <Box
                                className="flex-1 important:mb-3"
                                sx={{ minWidth: "full" }}
                              >
                                <Label>Email</Label>
                                <Field as={Input} type="email" name="email" />
                                <FormError name="email" />
                              </Box>
                            </Box>
                            <Box className="flex flex-wrap">
                              <Box
                                className="flex-auto important:mb-3"
                                sx={{
                                  width: ["full", "full", "1/3"],
                                  marginRight: [0, 0, 3],
                                }}
                              >
                                <Label>Số điện thoại</Label>
                                <Field as={Input} name="phone" />
                                <FormError name="phone" />
                              </Box>
                              <Box
                                className="flex-auto important:mb-3"
                                sx={{ width: ["full", "full", "1/3"] }}
                              >
                                <Label>Số điện thoại nhà riêng</Label>
                                <Field as={Input} name="alternativePhone" />
                                <FormError name="alternativePhone" />
                              </Box>
                            </Box>
                            <Styled.h4 className="text-red-5 important:mb-3">
                              Thông tin đặt hàng
                            </Styled.h4>
                            <Box className="flex flex-wrap important:w-full">
                              <Box
                                className="flex-auto important:mb-3"
                                sx={{
                                  width: ["full", "full", "1/3"],
                                  marginRight: [0, 0, 3],
                                }}
                              >
                                <Label>Số lượng mâm</Label>
                                <Input
                                  type="number"
                                  value={orderQuantity}
                                  onChange={handleChangeQuantity}
                                />
                              </Box>
                              <Box
                                className="flex-auto important:mb-3"
                                sx={{
                                  width: ["full", "full", "1/3"],
                                }}
                              >
                                <Label>Loại hình tiệc</Label>
                                <Field as={Select} name="orderType">
                                  <option
                                    value=""
                                    selected
                                    disabled
                                    hidden
                                    style={{ display: "none" }}
                                  />
                                  {orderTypes.map((orderType, index) => (
                                    <option key={index}>{orderType}</option>
                                  ))}
                                </Field>
                                <FormError name="orderType" />
                              </Box>
                            </Box>
                            <Box className="flex flex-wrap important:w-full">
                              <Box className="flex-grow important:w-full important:mb-3">
                                <Label>Đặc điểm nơi tổ chức tiệc</Label>
                                <Field as={Select} name="orderPlaceType">
                                  <option
                                    value=""
                                    selected
                                    disabled
                                    hidden
                                    style={{ display: "none" }}
                                  />
                                  {orderPlaceTypes.map(
                                    (orderPlaceType, index) => (
                                      <option key={index}>
                                        {orderPlaceType}
                                      </option>
                                    )
                                  )}
                                </Field>
                                <FormError name="orderPlaceType" />
                              </Box>
                            </Box>
                            <Box className="flex flex-wrap important:w-full">
                              <Box className="flex-grow important:w-full important:mb-3">
                                <Label>Địa chỉ</Label>
                                <Field as={Input} name="address" />
                                <FormError name="address" />
                              </Box>
                            </Box>
                            <Box className="flex flex-wrap important:w-full">
                              <Box
                                className="flex-auto important:mb-3"
                                sx={{
                                  width: ["full", "full", "1/3"],
                                  marginRight: [0, 0, 3],
                                }}
                              >
                                <Label>Ngày giao hàng</Label>
                                <Field name="orderDate">
                                  {({
                                    field: {
                                      onChange,
                                      onFocus,
                                      onBlur,
                                      name,
                                      value,
                                      ...rest
                                    },
                                  }) => {
                                    const handleChange = (val) => {
                                      const currentDate = moment(
                                        val,
                                        [
                                          "DDMMYYYY",
                                          "DD/MM/YYYY",
                                          "DDMMYY",
                                          "DD/MM/YYYY",
                                        ],
                                        true
                                      );

                                      onChange({
                                        target: {
                                          name: name,
                                          value: currentDate.isValid()
                                            ? currentDate
                                            : val,
                                        },
                                      });
                                    };
                                    return (
                                      <DatePicker
                                        onChange={handleChange}
                                        value={value}
                                        {...rest}
                                      />
                                    );
                                  }}
                                </Field>
                                <FormError name="orderDate" />
                              </Box>
                              <Box
                                className="flex-auto important:mb-3"
                                sx={{
                                  width: ["full", "full", "1/3"],
                                }}
                              >
                                <Label>Thời gian giao hàng</Label>
                                <Field name="orderTime">
                                  {({
                                    field: {
                                      onChange,
                                      onFocus,
                                      onBlur,
                                      name,
                                      value,
                                      ...rest
                                    },
                                  }) => {
                                    const handleChange = (val) => {
                                      const currentDate = moment(
                                        val,
                                        ["HHmm", "HH:mm"],
                                        true
                                      );

                                      const currentMinute = currentDate.get(
                                        "minute"
                                      );
                                      const supposedMinute =
                                        Math.floor(currentMinute / 15) * 15;
                                      currentDate.set({
                                        minute: supposedMinute,
                                      });

                                      onChange({
                                        target: {
                                          name: name,
                                          value: currentDate.isValid()
                                            ? currentDate
                                            : val,
                                        },
                                      });
                                    };
                                    return (
                                      <TimePicker
                                        onChange={handleChange}
                                        value={value}
                                        {...rest}
                                      />
                                    );
                                  }}
                                </Field>
                                <FormError name="orderTime" />
                              </Box>
                            </Box>
                            <Box className="flex flex-wrap important:w-full">
                              <Box
                                className="flex-auto important:mb-3"
                                sx={{
                                  width: ["full", "full", "1/3"],
                                  marginRight: [0, 0, 3],
                                }}
                              >
                                <Label>Phương thức thanh toán</Label>
                                <Field name="paymentMethod.type" as={Select}>
                                  {paymentMethodTypes.map((paymentMethod) => (
                                    <option value={paymentMethod.value}>
                                      {paymentMethod.title}
                                    </option>
                                  ))}
                                </Field>
                                <FormError name="paymentMethod.type" />
                              </Box>
                            </Box>
                            {props.values["paymentMethod"].type ===
                              "Chuyển khoản toàn bộ" && (
                              <Box className="flex flex-wrap important:w-full">
                                <Box
                                  className="flex-auto important:mb-3"
                                  sx={{
                                    width: ["full", "full", "1/3"],
                                  }}
                                >
                                  <Label>Số tài khoản</Label>
                                  <Field
                                    name="paymentMethod.account"
                                    as={Input}
                                  />
                                  <FormError name="paymentMethod.account" />
                                </Box>
                              </Box>
                            )}

                            <Box className="flex flex-wrap">
                              <Box className="flex-grow">
                                <Label>Ghi chú</Label>
                                <Field as={Textarea} name="note" />
                              </Box>
                            </Box>
                            <Box sx={{ marginTop: 3 }}>
                              <Button type="submit" sx={{ borderWidth: 0 }}>
                                Đặt tiệc
                              </Button>
                            </Box>
                          </Form>
                        )}
                      </Formik>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      </Page>
    </DefaultLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params }) => {
    const layout = await API.getLayoutData();
    const page = await API.getPage("/order/customer-details");

    if (!store.getState().global.orderMasterData) {
      await store.dispatch(fetchOrderMasterData());
    }

    return {
      props: {
        layout,
        page,
      },
      revalidate: 1,
    };
  }
);

export default SelectExtra;
