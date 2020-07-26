import React from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Page from "../../components/layout/Page";
import API from "../../utils/api";
import { kebabCase } from "lodash";

const Order = ({ layout, page, foodPresetTypes }) => {
  console.log(foodPresetTypes);

  const convertPresetTypesToSection = () => {
    return foodPresetTypes.map((presetType, index) => {
      const text = JSON.parse(presetType.description);

      text.blocks = [
        {
          type: "header",
          data: {
            alignment: "left",
            text: presetType.name,
            level: "2",
          },
        },
        {
          type: "paragraph",
          data: {
            alignment: "left",
            text: "&nbsp;",
          },
        },
        ...text.blocks,
        {
          type: "paragraph",
          data: {
            alignment: "left",
            text: "&nbsp;",
          },
        },
        {
          type: "linkButton",
          data: {
            url: `/order/${kebabCase(presetType.type)}/${presetType.slug}`,
            title: "Xem thêm",
          },
        },
      ];

      return {
        id: Math.random(),
        type: "SECTION",
        mediaPlacement: index % 2 === 0 ? "left" : "right",
        isFullWidth: true,
        offsetMedia: false,
        headerColor: "primary",
        textColor: "black",
        text: JSON.stringify(text),
        media: [presetType.media],
        addons: [],
      };
    });
  };

  return (
    <DefaultLayout layout={layout}>
      <Page
        page={page}
        preSections={convertPresetTypesToSection(foodPresetTypes)}
      />
    </DefaultLayout>
  );
};

export const getStaticProps = async ({ store }) => {
  const path = `/order`;
  const page = await API.getPage(encodeURI(path));
  const layout = await API.getLayoutData();
  const foodPresetTypes = await API.getFoodPresetTypes();

  return {
    props: {
      layout,
      page,
      foodPresetTypes,
    },
    unstable_revalidate: 1,
  };
};

export default Order;
