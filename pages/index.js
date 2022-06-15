/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import API from "../utils/api";
import { wrapper } from "../store";
import Page from "../components/layout/Page";

export default function Home({ page }) {
  return <Page page={page} />;
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const page = await API.getPage("/");

  return {
    props: {
      page,
    },
  };
});
