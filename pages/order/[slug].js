import React, { useEffect } from "react";
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
import { fetchOrderMasterData } from "../../store/global/actions";
import { wrapper } from "../../store";
import { useDispatch } from "react-redux";
import { clearOrder } from "../../store/order/actions";

const OrderMenu = ({ page, presetType, foodPresets, sortedFoodItems, slug }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  if (router.isFallback) {
    return <Loading />;
  }

  useEffect(() => {
    if (!router.query["keep-order"]) {
      dispatch(clearOrder());
    }
  }, [slug]);

  return (
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
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, ...ctx }) => {
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
    await store.dispatch(fetchOrderMasterData());

    if (presetType.type === "customizable") {
      const sortedFoodItems = getSortedFoodItemsNew(
        allowedFoodMenuItems,
        allowedFoodCategories
      );
      return {
        props: {
          page,
          presetType,
          sortedFoodItems,
          slug,
        },
      };
    }

    const processedPresets = getProcessedPresets(
      foodPresets,
      allowedFoodCategories,
      allowedFoodMenuItems
    );

    console.log(processedPresets.map((preset) => preset.foodMenuItems));

    return {
      props: {
        page,
        presetType,
        foodPresets: processedPresets,
        slug,
      },
    };
  }
);

export default OrderMenu;
