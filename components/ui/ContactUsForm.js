import React, { useState } from "react";
import { Box, Button, Input, jsx, Textarea } from "theme-ui";
import classnames from "classnames";
import API from "../../utils/api";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import FormError from "./Form/FormError";

const validationSchema = Yup.object().shape(
  {
    name: Yup.string().required("Mời quý khách nhập họ và tên"),
    email: Yup.string()
      .email("Mời quý khách để lại địa chỉ email hợp lệ")
      .required("Mời quý khách để lại địa chỉ email"),
    phone: Yup.string()
      .matches(/[0-9+ ().]+/g, {
        message: "Mời quý khách để lại số điện thoại hợp lệ",
        excludeEmptyString: true,
      })
      .min(6, "Mời quý khách để lại số điện thoại hợp lệ")
      .required("Mời quý khách để lại số điện thoại"),
    address: Yup.string(),
    message: Yup.string().required("Mời quý khách để lại lời nhắn"),
  },
  [["email", "phone"]]
);

const ContactUsForm = ({ onDone, sx }) => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const clear = () => {
    setName("");
    setAddress("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (data, formik) => {
    try {
      setLoading(true);

      console.log(data);
      console.log(data);

      await API.sendContactEmail(data);
      //
      // clear();

      if (onDone) {
        onDone();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={{
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      }}
    >
      <Form className="important:mt-3">
        <Box className="required important:mb-3">
          <Field as={Input} name="name" placeholder="Họ và tên" />
          <FormError name="name" />
        </Box>
        <Box className="required important:mb-3">
          <Field as={Input} name="email" placeholder="Email" />
          <FormError name="email" />
        </Box>
        <Box className="required important:mb-3">
          <Field as={Input} name="phone" placeholder="Số điện thoại" />
          <FormError name="phone" />
        </Box>
        <Box className="important:mb-3">
          <Field as={Input} name="address" placeholder="Địa chỉ" />
          <FormError name="address" />
        </Box>
        <Box className="required important:mb-3">
          <Field as={Textarea} name="message" placeholder="Lời nhắn" />
          <FormError name="message" />
        </Box>
        <Button
          className={classnames(
            "important:min-w-32",
            isLoading ? "opacity-75" : ""
          )}
          disabled={isLoading}
          type="submit"
        >
          Gửi
        </Button>
      </Form>
    </Formik>
  );
};

export default ContactUsForm;
