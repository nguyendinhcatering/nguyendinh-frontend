/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState } from "react";
import { Box, Button, Input, jsx, Label, Styled, Textarea } from "theme-ui";
import API from "../../../utils/api";
import Card from "../../../components/ui/Card";
import { wrapper } from "../../../store";
import { fetchOrderMasterData } from "../../../store/global/actions";
import CurrentOrder from "../../../components/order/CurrentOrder";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderQuantity, placeOrder } from "../../../store/order/actions";
import DatePicker from "../../../components/ui/DatePicker";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
import FormError from "../../../components/ui/Form/FormError";
import { useRouter } from "next/router";
import { getHref } from "../../../utils/getHref";
import Loading from "../../../components/Loading";
import Page from "../../../components/layout/Page";
import Multimedia from "../../../components/ui/Multimedia";
import Wysiwyg from "../../../components/renderer/wysiwyg";
import SelectField from "../../../components/ui/SelectField";
import { arrayFromLength } from "../../../utils/order";
import { padStart } from "../../../utils/string";

const paymentMethodTypes = [
  {
    label: "Chuyển khoản đặt cọc",
    value: "Chuyển khoản đặt cọc",
  },
  {
    label: "Thanh toán tiền mặt khi giao hàng",
    value: "Thanh toán tiền mặt khi giao hàng",
  },
  {
    label: "Chuyển khoản toàn bộ",
    value: "Chuyển khoản toàn bộ",
  },
];

const getTimeOptions = () => {
  const hours = arrayFromLength(24).map((h) => padStart(h, 2));
  const minutes = arrayFromLength(4).map((h) => padStart(h * 15, 2));

  const timeOptions = [];

  hours.forEach((hour) => {
    minutes.forEach((minute) => {
      const hourMinute = `${hour}:${minute}`;

      timeOptions.push({
        value: hourMinute,
        label: hourMinute,
      });
    });
  });

  return timeOptions;
};

const timeOptions = getTimeOptions();

const BankInfo = () => {
  const bankInfo = useSelector(
    (state) => state.global.orderMasterData.bankInfo
  );

  return (
    <Box className="flex flex-wrap space-x-2 flex-col md:flex-row">
      {bankInfo.map((info) => (
        <Box
          key={info.id}
          sx={{
            width: ["full", "full", "1/2"],
            p: 4,
            my: 3,
            borderColor: "gray.5",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <Box className="flex flex-row justify-center">
            <Multimedia
              medium={info.image}
              sx={{ height: "auto", width: "200px", py: 3 }}
            />
          </Box>
          <Box className="flex flex-row">
            <Wysiwyg data={info.description} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const CustomerDetailsPage = ({ page }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const orderQuantity = useSelector((state) => state.order?.quantity);
  const order = useSelector((state) => state.order);
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
    setLoading(true);
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
        }),
      }),
    []
  );

  if (router.isFallback) {
    return <Loading />;
  }

  return (
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
                        orderTime: "00:00",
                        note: "",
                        paymentMethod: {
                          type: "Chuyển khoản đặt cọc",
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

                              <Field
                                name="title"
                                component={SelectField}
                                options={[
                                  {
                                    value: "Ông",
                                    label: "Ông",
                                  },
                                  {
                                    value: "Bà",
                                    label: "Bà",
                                  },
                                ]}
                                defaultValue={{
                                  value: "Ông",
                                  label: "Ông",
                                }}
                              />
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
                              }}
                            >
                              <Label>
                                Số lượng {order?.meta?.unit || "mâm"}
                              </Label>
                              <Input
                                type="number"
                                value={orderQuantity}
                                onChange={handleChangeQuantity}
                              />
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
                              <Label>Loại hình tiệc</Label>
                              <Field
                                name="orderType"
                                component={SelectField}
                                options={orderTypes.map((orderPlaceType) => ({
                                  value: orderPlaceType,
                                  label: orderPlaceType,
                                }))}
                                defaultValue={{
                                  value: orderTypes[0],
                                  label: orderTypes[0],
                                }}
                              />
                              <FormError name="orderType" />
                            </Box>
                            <Box
                              className="flex-grow important:mb-3"
                              sx={{
                                width: ["full", "full", "1/3"],
                              }}
                            >
                              <Label>Đặc điểm nơi tổ chức tiệc</Label>
                              <Field
                                name="orderPlaceType"
                                component={SelectField}
                                options={orderPlaceTypes.map(
                                  (orderPlaceType) => ({
                                    value: orderPlaceType,
                                    label: orderPlaceType,
                                  })
                                )}
                                defaultValue={{
                                  value: orderPlaceTypes[0],
                                  label: orderPlaceTypes[0],
                                }}
                              />
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
                              <Field
                                name="orderTime"
                                component={SelectField}
                                options={timeOptions}
                                defaultValue={timeOptions[0]}
                              />
                              <FormError name="orderTime" />
                            </Box>
                          </Box>
                          <Box className="flex flex-wrap important:w-full">
                            <Box className="flex-auto important:mb-3">
                              <Label>Phương thức thanh toán</Label>
                              <Field
                                name="paymentMethod.type"
                                component={SelectField}
                                options={paymentMethodTypes}
                                defaultValue={paymentMethodTypes[0]}
                              />
                              <FormError name="paymentMethod.type" />
                            </Box>
                          </Box>
                          {props.values["paymentMethod"].type !==
                            "Thanh toán tiền mặt khi giao hàng" && <BankInfo />}
                          <Box className="flex flex-wrap">
                            <Box className="flex-grow">
                              <Label>Ghi chú</Label>
                              <Field as={Textarea} name="note" />
                            </Box>
                          </Box>
                          <Box sx={{ marginTop: 3 }}>
                            <Button
                              type="submit"
                              sx={{ borderWidth: 0 }}
                              disabled={loading}
                            >
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
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    const page = await API.getPage("/order/customer-details");

    await store.dispatch(fetchOrderMasterData());

    return {
      props: {
        page,
      },
    };
  }
);

export default CustomerDetailsPage;
