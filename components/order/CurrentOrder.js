/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { Box, Button, Styled, Input, jsx } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import { getSortedFoodItems } from "../../utils/order";
import { changeOrderQuantity } from "../../store/order/actions";
import Card from "../ui/Card";
import cn from "classnames";
import { formatNumber } from "../../utils/number";
import Accordion from "../ui/Accordion";

const IMAGE_URL = "/images/defaultBackground.jpg";

const CurrentOrder = ({ wrapperClassName, onChange }) => {
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedItemsOrder, setSortedItemsOrder] = useState([]);
  const order = useSelector((state) => state.order);
  const foodItems = useSelector((state) => state.order.presetItems);
  const foodCategories = useSelector((state) => state.global.foodCategories);

  useEffect(() => {
    const { sortedFoodItems, sortedFoodItemsOrder } = getSortedFoodItems(
      foodItems,
      foodCategories
    );
    setSortedItems(sortedFoodItems);
    setSortedItemsOrder(sortedFoodItemsOrder);
  }, [foodItems, foodCategories]);

  return (
    <Box className={wrapperClassName}>
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
          <Styled.h4 className="important:font-bold">
            {order.meta.presetName}
          </Styled.h4>
          <Styled.p className="font-heading">
            {formatNumber(order.unitPrice)} VND / mâm /&nbsp;
            {order.meta.presetType.numberOfPeople} người
          </Styled.p>
          <Button
            sx={{
              backgroundColor: "transparent",
              marginTop: 2,
              borderColor: "white",
            }}
            onClick={onChange}
          >
            Thay đổi lựa chọn
          </Button>
        </Box>
        <Box className="w-full p-3 md:p-4">
          {sortedItems.map((category) => {
            return (
              <Box className="important:mb-2" key={category.name}>
                <Styled.h5 className="text-red-5 important:mb-2">
                  {category.name}
                </Styled.h5>
                {category.foodItems.map((foodItem) => (
                  <Box key={foodItem.id}>
                    <span sx={{ minWidth: 8, display: "inline-block" }}>
                      {sortedItemsOrder[foodItem.id]}.
                    </span>
                    <span>{foodItem.name}</span>
                  </Box>
                ))}
              </Box>
            );
          })}
          <Box className="important:mt-4 px-4 py-3 bg-red-6 text-white">
            <Styled.p sx={{ fontSize: 3 }}>Tổng thanh toán</Styled.p>
            <Styled.p sx={{ fontSize: 3, fontWeight: "bold" }}>
              {formatNumber(order.quantity * order.unitPrice, ",")}đ
            </Styled.p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentOrder;
