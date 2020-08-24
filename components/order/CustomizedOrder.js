/** @jsx jsx */
import React, { createRef, useEffect, useState } from "react";
import { Box, Button, Styled, Input, jsx, Checkbox } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import { getSortedFoodItems } from "../../utils/order";
import {
  changeOrderQuantity,
  selectPreset,
  toggleFoodItem,
} from "../../store/order/actions";
import Card from "../ui/Card";
import cn from "classnames";
import { formatNumber } from "../../utils/number";
import Accordion from "../ui/Accordion";
import { fetchFoodCategories } from "../../store/global/actions";

const IMAGE_URL = "/images/defaultBackground.jpg";

const CustomizedOrder = ({ wrapperClassName }) => {
  const dispatch = useDispatch();
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedItemsOrder, setSortedItemsOrder] = useState([]);
  const order = useSelector((state) => state.order);
  const foodItems = useSelector((state) => state.order.presetItems);
  const foodCategories = useSelector((state) => state.global.foodCategories);

  useEffect(() => {
    dispatch(fetchFoodCategories());
    const { sortedFoodItems, sortedFoodItemsOrder } = getSortedFoodItems(
      foodItems,
      foodCategories
    );
    setSortedItems(sortedFoodItems);
    setSortedItemsOrder(sortedFoodItemsOrder);
  }, [foodItems, foodCategories]);

  const handleToggleFoodItem = (foodItem) => (e) => {
    dispatch(
      toggleFoodItem({
        foodItem,
        enabled: e.target.checked,
      })
    );
  };

  return (
    <Box className="justify-center items-center">
      <Box
        className={cn(
          "w-full px-3 py-3 md:px-4 md:py-4 bg-center bg-cover justify-center",
          "text-white"
        )}
        sx={{
          backgroundImage: `url(${IMAGE_URL})`,
        }}
      >
        <Styled.h4 className="font-heading text-center">
          Thực đơn cho mâm 6 người
        </Styled.h4>
      </Box>
      <Box className="w-full p-3 md:p-4 justify-center">
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
                  <span>
                    {foodItem.name}
                    <div className="w-3 float-right">
                      <label>
                        <Checkbox
                          checked={
                            (order.presetItems || []).find(
                              (item) => foodItem.id === item.id
                            )
                              ? true
                              : false
                          }
                          onChange={handleToggleFoodItem(foodItem)}
                        />
                      </label>
                    </div>
                  </span>
                </Box>
              ))}
            </Box>
          );
        })}
        <Box className="important:mt-4 px-4 py-3 bg-red-6 text-white content-center text-center">
          <Styled.p sx={{ fontSize: 3 }}>Đơn hàng</Styled.p>
          <Styled.p sx={{ fontSize: 3, fontWeight: "bold" }}>
            {formatNumber(order.unitPrice, ",")}đ
          </Styled.p>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomizedOrder;
