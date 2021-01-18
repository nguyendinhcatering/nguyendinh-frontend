/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { Box, Button, Styled, jsx } from "theme-ui";
import { useSelector } from "react-redux";
import { getSortedFoodItems, getSortedFoodItemsOrder } from "../../utils/order";
import cn from "classnames";
import { formatNumber } from "../../utils/number";
import { IMAGE_URL } from "../../utils/getImageSrc";
import ScrollArrow from "./ScrollToBottom";

const CustomizableCurrentOrder = ({ onPlaceOrder, presetType = {} }) => {
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedItemsOrder, setSortedItemsOrder] = useState({});
  const order = useSelector((state) => state.order);
  const foodItems = useSelector((state) => state.order.presetItems);

  useEffect(() => {
    const currentSortedItems = getSortedFoodItems(foodItems);

    setSortedItems(currentSortedItems);
    setSortedItemsOrder(getSortedFoodItemsOrder(currentSortedItems));
  }, [foodItems]);

  return (
    <Box>
      <ScrollArrow />
      <Box>
        <Box
          className={cn(
            "w-full px-3 py-3 md:px-4 md:py-4 bg-center bg-cover",
            "text-white"
          )}
          sx={{
            backgroundImage: `url(${IMAGE_URL})`,
          }}
        >
          <Styled.h4 sx={{ fontWeight: "bold" }}>{presetType.name}</Styled.h4>
          <Styled.p
            sx={{
              fontFamily: "heading",
            }}
          >
            <span sx={{ fontWeight: "bold" }}>
              {formatNumber(order.unitPrice)} VNĐ/ {presetType.unit}
            </span>
          </Styled.p>
        </Box>
        <Box
          sx={{
            width: "full",
            p: [3, 3, 4],
          }}
        >
          {order.presetItems.length === 0 && (
            <Box>
              Hiện tại thực đơn không có món ăn. Mời quý khách chọn món cho thực
              đơn
            </Box>
          )}
          {sortedItems.map((category) => {
            return (
              <Box sx={{ mb: 2 }} key={category.name}>
                <Styled.h5
                  sx={{
                    color: "red.5",
                    mb: 2,
                  }}
                >
                  {category.name}
                </Styled.h5>
                {category.foodItems.map((foodItem) => (
                  <Box
                    key={foodItem.id}
                    sx={{
                      display: "flex",
                      width: "full",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <span sx={{ minWidth: 8, display: "inline-block" }}>
                        {sortedItemsOrder[foodItem.id]}.
                      </span>
                      <span>{foodItem.name}</span>
                    </span>
                    <span>{formatNumber(foodItem.price)}</span>
                  </Box>
                ))}
              </Box>
            );
          })}
          <Box sx={{ mt: 4 }}>
            <Button
              sx={{
                width: "full",
                "&[disabled]": {
                  cursor: "not-allowed",
                  backgroundColor: "red.3",
                  borderColor: "red.3",
                },
              }}
              disabled={order.presetItems.length === 0}
              onClick={onPlaceOrder}
            >
              Đặt thực đơn này
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomizableCurrentOrder;
