import React from "react";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { wrapper } from "../../../store";
import API from "../../../utils/api";
import { fetchOrderMasterData } from "../../../store/global/actions";
import Page from "../../../components/layout/Page";

const ReviewPage = ({ layout, page }) => {
  return (
    <DefaultLayout layout={layout}>
      <Page page={page}>Hi</Page>
    </DefaultLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params }) => {
    const layout = await API.getLayoutData();
    const page = await API.getPage("/order/review");

    await store.dispatch(fetchOrderMasterData());

    return {
      props: {
        layout,
        page,
      },
      revalidate: 1,
    };
  }
);

export default ReviewPage;
