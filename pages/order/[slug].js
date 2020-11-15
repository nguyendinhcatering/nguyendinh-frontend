import React from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Page from "../../components/layout/Page";
import API from "../../utils/api";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import {
  getAllowedFoodCategoriesFromPresetType,
  getAllowedFoodMenuItemsFromPresetType,
  getProcessedPresets,
  getSortedFoodItemsNew,
} from "../../utils/order";
import PresetOrderMenu from "../../components/order/PresetOrderMenu";
import CustomizableOrderMenu from "../../components/order/CustomizableOrderMenu";

const OrderMenu = ({
  layout,
  page,
  presetType,
  foodPresets,
  sortedFoodItems,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <DefaultLayout layout={layout}>
      <Page page={page}>
        {presetType.type === "preset" && (
          <PresetOrderMenu presetType={presetType} foodPresets={foodPresets} />
        )}
        {presetType.type === "customizable" && (
          <CustomizableOrderMenu
            presetType={presetType}
            foodItems={sortedFoodItems}
          />
        )}
      </Page>
    </DefaultLayout>
  );
};

export const getStaticPaths = async () => {
  const foodPresetTypes = await API.getFoodPresetTypes();

  const paths = (foodPresetTypes || []).map((presetType) => ({
    params: {
      slug: presetType.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const slug = ctx?.params?.slug;
  const presetType = await API.getFoodPresetTypeBySlug(slug);

  if (!presetType) {
    return {
      props: {},
      redirect: {
        destination: "/order",
      },
    };
  }

  const path = `/order/${slug}`;
  const page = await API.getPage(encodeURI(path));
  const layout = await API.getLayoutData();
  const foodPresets = await API.getFoodPresetsByPresetTypeSlug(slug);
  const foodCategories = await API.getFoodCategories();
  const foodMenuItems = await API.getFoodItems();

  const allowedFoodCategories = getAllowedFoodCategoriesFromPresetType(
    presetType,
    foodCategories
  );

  const allowedFoodMenuItems = getAllowedFoodMenuItemsFromPresetType(
    presetType,
    foodMenuItems
  );

  if (presetType.type === "customizable") {
    const sortedFoodItems = getSortedFoodItemsNew(
      allowedFoodMenuItems,
      allowedFoodCategories
    );
    return {
      props: {
        layout,
        page,
        presetType,
        sortedFoodItems,
      },
    };
  }

  const processedPresets = getProcessedPresets(
    foodPresets,
    allowedFoodCategories,
    allowedFoodMenuItems
  );

  return {
    props: {
      layout,
      page,
      presetType,
      foodPresets: processedPresets,
    },
  };
};

export default OrderMenu;
