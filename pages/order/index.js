import React from "react";
import Page from "../../components/layout/Page";
import API from "../../utils/api";

const Order = ({ page }) => {
  return <Page page={page} />;
};

export const getStaticProps = async ({ store }) => {
  const path = `/order`;
  const page = await API.getPage(encodeURI(path));

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
};

export default Order;
