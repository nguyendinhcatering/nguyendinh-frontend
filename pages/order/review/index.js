import React from "react";
import { wrapper } from "../../../store";
import API from "../../../utils/api";
import { fetchOrderMasterData } from "../../../store/global/actions";
import Page from "../../../components/layout/Page";

const ReviewPage = ({ page }) => {
  return <Page page={page}>Hi</Page>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    const page = await API.getPage("/order/review");

    await store.dispatch(fetchOrderMasterData());

    return {
      props: {
        page,
      },
    };
  }
);

export default ReviewPage;
