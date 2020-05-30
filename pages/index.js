/** @jsx jsx */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { jsx, Styled, Image as ThemeImage, Text, Heading } from "theme-ui";
import API from "../utils/api";
import { wrapper } from "../store";
import DefaultLayout from "../components/layout/DefaultLayout";
import Page from "../components/layout/Page";

export default function Home({ layout, page }) {
  return (
    <DefaultLayout layout={layout}>
      <Page page={page} />
    </DefaultLayout>
  );
}

export const getStaticProps = wrapper.getStaticProps(async (ctx) => {
  const layout = await API.getLayoutData();
  const page = await API.getPage("/");

  return {
    props: {
      layout,
      page,
    },
    unstable_revalidate: true,
  };
});
