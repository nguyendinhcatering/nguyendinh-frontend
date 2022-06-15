/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { Styled, jsx } from "theme-ui";
import { ErrorMessage } from "formik";

const FormError = (props) => {
  return (
    <ErrorMessage {...props}>
      {(msg) => <Styled.p sx={{ color: "red.5" }}>{msg}</Styled.p>}
    </ErrorMessage>
  );
};

export default FormError;
