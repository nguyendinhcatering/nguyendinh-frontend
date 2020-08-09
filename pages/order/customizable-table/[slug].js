import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import { Box, Styled, Button, Checkbox } from "theme-ui";
import Page from "../../../components/layout/Page";
import Card from "../../../components/ui/Card";
import cn from "classnames";
import ManualSection from "../../../components/layout/Sections/Section/subtypes/ManualSection";
import { formatNumber } from "../../../utils/number";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import API from "../../../utils/api";
import { IMAGE_URL } from "../../../utils/getImageSrc";
import { getSortedFoodItems } from "../../../utils/order";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOrder,
  selectPreset,
  toggleFoodItem,
} from "../../../store/order/actions";
import { useRouter } from "next/router";

const CustomizableTable = ({ layout, page, foodCategories, foodItems }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentOrder = useSelector((state) => state.order);

  useEffect(() => {
    if (router.query["keep-order"] !== "true") {
      dispatch(clearOrder());
    }
  }, []);

  const sortedFoodCategories = getSortedFoodItems(
    foodItems,
    foodCategories,
    "customizable"
  );

  const handleToggleFoodItem = (foodItem) => (e) => {
    dispatch(
      toggleFoodItem({
        foodItem,
        enabled: e.target.checked,
      })
    );
  };

  const handleOrder = (e) => {
    dispatch(
      selectPreset({
        meta: {
          presetName: "Thực đơn tự chọn",
          presetType: {
            name: "Thực đơn tự chọn",
            numberOfPeople: 6,
            type: "customizable-table",
          },
          url: router.asPath.replace(/\?.*/g, ""),
        },
      })
    );
  };

  return (
    <DefaultLayout layout={layout}>
      <Page page={page}>
        <Card className={cn("important:mb-5")}>
          <ManualSection>
            <Box
              className={cn(
                "w-full px-4 py-2 md:px-5 md:py-4 bg-center bg-cover flex flex-col md:flex-row justify-between",
                "text-white"
              )}
              sx={{
                backgroundImage: `url(${IMAGE_URL})`,
              }}
            >
              <Box sx={{ minWidth: "1/8" }}>STT</Box>
              <Box sx={{ minWidth: "1/8" }}>Chọn</Box>
              <Box sx={{ minWidth: "5/8" }}>Tên món ăn</Box>
              <Box sx={{ minWidth: "1/8" }}>Giá (VNĐ)</Box>
            </Box>
          </ManualSection>
          {sortedFoodCategories.sortedFoodItems.map((sorted) => {
            if (isEmpty(sorted.foodItems)) {
              return null;
            }

            return (
              <Box
                className="px-4 md:px-5 py-2 md:py-2 first:py-4"
                key={sorted.name}
              >
                <Box className="flex justify-between">
                  <Box sx={{ minWidth: "1/8" }} />
                  <Box sx={{ minWidth: "1/8" }} />
                  <Box sx={{ minWidth: "5/8", color: "red.5" }}>
                    <Styled.h6>{sorted.name}</Styled.h6>
                  </Box>
                  <Box sx={{ minWidth: "1/8" }} />
                </Box>
                {sorted.foodItems.map((foodItem) => {
                  return (
                    <Box className="flex justify-between" key={foodItem.id}>
                      <Box sx={{ minWidth: "1/8" }}>
                        {sortedFoodCategories.sortedFoodItemsOrder[foodItem.id]}
                      </Box>
                      <Box sx={{ minWidth: "1/8" }}>
                        <label>
                          <Checkbox
                            checked={
                              (currentOrder.presetItems || []).find(
                                (item) => foodItem.id === item.id
                              )
                                ? true
                                : false
                            }
                            onChange={handleToggleFoodItem(foodItem)}
                          />
                        </label>
                      </Box>
                      <Box sx={{ minWidth: "5/8" }}>{foodItem.name}</Box>
                      <Box sx={{ minWidth: "1/8" }}>
                        {formatNumber(foodItem.price)}
                      </Box>
                    </Box>
                  );
                })}
                <Styled.hr />
              </Box>
            );
          })}
          <Box className="px-4 md:px-5 pt-2 pb-4">
            <Button onClick={handleOrder}>Đặt thực đơn này</Button>
          </Box>
        </Card>
      </Page>
    </DefaultLayout>
  );
};

export const getStaticPaths = async () => {
  const foodPresetTypes = await API.getFoodPresetTypes();

  return {
    paths: (foodPresetTypes || [])
      .filter((presetType) => presetType.type === "customizableTable")
      .map((presetType) => `/order/customizable-table/${presetType.slug}`),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const path = `/order/customizable-table/${params.slug}`;
  const page = await API.getPage(encodeURI(path));
  const layout = await API.getLayoutData();
  const foodCategories = await API.getFoodCategories();
  const foodItems = await API.getFoodItems();

  return {
    props: {
      layout,
      page,
      foodCategories,
      foodItems,
    },
    revalidate: 1,
  };
};

export default CustomizableTable;
