import React from "react";
import Page from "../../components/layout/Page";
import API from "../../utils/api";
import { wrapper } from "../../store";

const Order = ({ page }) => {
  return <Page page={page} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const path = `/order`;
    const page = await API.getPage(encodeURI(path));

    return {
      props: {
        page,
      },
    };
  }
);

export default Order;
