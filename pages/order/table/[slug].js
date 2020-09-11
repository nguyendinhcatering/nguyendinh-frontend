import DefaultLayout from "../../../components/layout/DefaultLayout";
import Page from "../../../components/layout/Page";
import API from "../../../utils/api";
import { kebabCase, sortBy } from "lodash";
import ManualSection from "../../../components/layout/Sections/Section/subtypes/ManualSection";
import Card from "../../../components/ui/Card";
import cn from "classnames";
import React from "react";
import { Box, Styled, Button } from "theme-ui";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { selectPreset } from "../../../store/order/actions";
import { formatNumber } from "../../../utils/number";

const IMAGE_URL = "/images/defaultBackground.jpg";

const TablePreset = ({
  layout,
  page,
  foodPresets,
  foodPresetType,
  foodCategories,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const allowedFoodCategories = sortBy(
    foodCategories.filter((category) => category.orderInPreset),
    ["orderInPreset"]
  );

  const handleOrder = (foodPreset) => (e) => {
    dispatch(
      selectPreset({
        meta: {
          presetName: foodPreset.name,
          presetPrice: foodPreset.priceOverride,
          presetType: {
            name: foodPresetType.name,
            numberOfPeople: foodPresetType.numberOfPeople,
            type: foodPresetType.type,
          },
          url: router.asPath.replace(/\?.*/g, ""),
        },
        presetItems: foodPreset.foodMenuItems,
      })
    );
  };

  return (
    <DefaultLayout layout={layout} pullUp={true}>
      <Page page={page}>
        <Card className={cn("important:mb-5 important:mt-5 md:important:mt-0")}>
          {foodPresets.map((foodPreset) => (
            <React.Fragment key={foodPreset.id}>
              <ManualSection>
                <Box
                  className={cn(
                    "w-full px-4 py-2 " +
                      "md:px-5 md:py-4 bg-center bg-cover flex flex-col md:flex-row",
                    "text-white"
                  )}
                  sx={{
                    backgroundImage: `url(${IMAGE_URL})`,
                  }}
                >
                  <Box>
                    <Styled.h3>{foodPreset.name}</Styled.h3>
                    <Styled.h4>
                      {formatNumber(foodPreset.priceOverride)} VND/mâm/
                      {foodPresetType?.numberOfPeople} người
                    </Styled.h4>
                  </Box>
                  <Box className="flex-grow min-h-4" />
                  <Box className="flex items-center justify-center">
                    <Button
                      variant="primary"
                      sx={{
                        backgroundColor: "transparent",
                        borderColor: "white",
                        width: ["100%", "100%"],
                      }}
                      onClick={handleOrder(foodPreset)}
                    >
                      Đặt thực đơn này
                    </Button>
                  </Box>
                </Box>
              </ManualSection>
              <ManualSection>
                <Box className="px-5 py-3 flex flex-col md:flex-row">
                  {allowedFoodCategories.map((foodCategory) => {
                    const foodItems = foodPreset.foodMenuItems.filter((item) =>
                      item.foodCategories.some(
                        (category) => category.id === foodCategory.id
                      )
                    );

                    if (foodItems.length === 0) {
                      return null;
                    }

                    return (
                      <Box className="w-full" key={foodCategory.id}>
                        <Styled.h3>{foodCategory.name}</Styled.h3>
                        {foodItems.map((item) => (
                          <Styled.p key={item.id}>{item.name}</Styled.p>
                        ))}
                      </Box>
                    );
                  })}
                </Box>
              </ManualSection>
            </React.Fragment>
          ))}
        </Card>
      </Page>
    </DefaultLayout>
  );
};

export const getStaticPaths = async () => {
  const foodPresetTypes = await API.getFoodPresetTypes();

  return {
    paths: foodPresetTypes
      .filter((presetType) => presetType.type === "table")
      .map(
        (presetType) =>
          `/order/${kebabCase(presetType.type)}/${presetType.slug}`
      ),
    fallback: true,
  };
};

export const getStaticProps = async ({ store, params }) => {
  const path = `/order/table/${params.slug}`;
  const page = await API.getPage(encodeURI(path));
  const layout = await API.getLayoutData();
  const foodCategories = await API.getFoodCategories();
  const foodPresetType = await API.getFoodPresetType(params.slug);
  const foodPresets = await API.getFoodPresetsByPresetTypeSlug(params.slug);

  return {
    props: {
      layout,
      page,
      foodPresets,
      foodPresetType,
      foodCategories,
    },
    revalidate: 1,
  };
};

export default TablePreset;
