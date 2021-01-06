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

const OrderMenu = ({ page, presetType, foodPresets, sortedFoodItems }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  if (router.isFallback) {
    return <Loading />;
  }

  useEffect(() => {
    if (!router.query["keep-order"]) {
      dispatch(clearOrder());
    }
  }, []);

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

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, ...ctx }) => {
    const slug = ctx?.params?.slug;
    const presetType = await API.getFoodPresetTypeBySlug(slug);

    if (!presetType) {
      return {
        props: {},
        redirect: {
          destination: "/order",
        },
        revalidate: 1
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
        },
        revalidate: 1
      };
    }

    const processedPresets = getProcessedPresets(
      foodPresets,
      allowedFoodCategories,
      allowedFoodMenuItems
    );

    return {
      props: {
        page,
        presetType,
        foodPresets: processedPresets,
      },
      revalidate: 1
    };
  }
);

export default OrderMenu;
