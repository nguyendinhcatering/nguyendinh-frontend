import React from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Page from "../../components/layout/Page";
import API from "../../utils/api";

const Order = ({ layout, page }) => {
  return (
    <DefaultLayout layout={layout}>
      <Page page={page} />
    </DefaultLayout>
  );
};

export const getStaticProps = async ({ store }) => {
  const path = `/order`;
  const page = await API.getPage(encodeURI(path));
  const layout = await API.getLayoutData();

  return {
    props: {
      layout,
      page,
    },
    revalidate: 1,
  };
};

export default Order;
