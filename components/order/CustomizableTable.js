import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { Box, Styled, Checkbox } from "theme-ui";
import ManualSection from "../layout/Sections/Section/subtypes/ManualSection";
import { IMAGE_URL } from "../../utils/getImageSrc";
import { formatNumber } from "../../utils/number";
import { getSortedFoodItemsOrder } from "../../utils/order";
import { useSelector } from "react-redux";

const rowSx = {
  width: "full",
  px: [4, 4, 5],
  py: 2,
  display: "flex",
  // flexDirection: ["column", "column", "row"],
  justifyContent: "between",
  gap: 1,
};

const columnSxes = [
  {
    minWidth: "1/8",
    maxWidth: "1/8",
    display: ["none", "none", "initial"],
  },
  {
    minWidth: ["2/8", "2/8", "1/8"],
    maxWidth: ["2/8", "2/8", "1/8"],
  },
  {
    minWidth: ["4/8", "4/8", "5/8"],
    maxWidth: ["4/8", "4/8", "5/8"],
  },
  {
    minWidth: ["2/8", "2/8", "1/8"],
    maxWidth: ["2/8", "2/8", "1/8"],
    textAlign: "right",
  },
];

const CustomizableTable = ({ sortedFoodItems, onFoodItemSelected }) => {
  const [sortedItemsOrder, setSortedItemsOrder] = useState({});
  const currentOrder = useSelector((state) => state.order);

  useEffect(() => {
    setSortedItemsOrder(getSortedFoodItemsOrder(sortedFoodItems));
  }, [sortedFoodItems]);

  const renderPrice = (foodItem) => {
    if (foodItem.isSeasonal) {
      return "Liên hệ";
    }

    return foodItem.price ? formatNumber(foodItem.price) : 0;
  };

  return (
    <React.Fragment>
      <ManualSection>
        <Box
          sx={{
            ...rowSx,
            py: [2, 2, 4],
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${IMAGE_URL})`,
            color: "white",
          }}
        >
          <Box sx={columnSxes[0]}>STT</Box>
          <Box sx={columnSxes[1]}>Chọn</Box>
          <Box sx={columnSxes[2]}>Tên món ăn</Box>
          <Box sx={columnSxes[3]}>Giá (VNĐ)</Box>
        </Box>
        {sortedFoodItems.map((sortedCategory) => {
          if (isEmpty(sortedCategory.foodItems)) {
            return null;
          }

          return (
            <React.Fragment key={sortedCategory.name}>
              <Box sx={rowSx}>
                <Box sx={columnSxes[0]} />
                <Box sx={columnSxes[1]} />
                <Box sx={{ ...columnSxes[2], color: "red.5" }}>
                  {sortedCategory.name}
                </Box>
                <Box sx={columnSxes[3]} />
              </Box>
              {sortedCategory.foodItems.map((item) => (
                <Box sx={{ ...rowSx, py: 0 }} key={item.name}>
                  <Box sx={columnSxes[0]}>{sortedItemsOrder[item.id]}</Box>
                  <Box sx={columnSxes[1]}>
                    <label>
                      <Checkbox
                        checked={
                          !!(currentOrder.presetItems || []).find(
                            (presetItem) => item.id === presetItem.id
                          )
                        }
                        onChange={onFoodItemSelected(item)}
                      />
                    </label>
                  </Box>
                  <Box sx={columnSxes[2]}>{item.name}</Box>
                  <Box sx={columnSxes[3]}>{renderPrice(item)}</Box>
                </Box>
              ))}
              <Styled.hr />
            </React.Fragment>
          );
        })}
      </ManualSection>
    </React.Fragment>
  );
};

export default CustomizableTable;
