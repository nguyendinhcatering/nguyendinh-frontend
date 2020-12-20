import React from "react";
import { Box } from "theme-ui";
import Card from "../ui/Card";
import CustomizableTable from "./CustomizableTable";
import CustomizableCurrentOrder from "./CustomizableCurrentOrder";
import { selectPreset, toggleFoodItem } from "../../store/order/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const CustomizableOrderMenu = ({ foodItems, presetType }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePlaceOrder = () => {
    dispatch(
      selectPreset({
        meta: {
          presetName: presetType.name,
          presetType: {
            name: presetType.name,
            numberOfPeople: presetType.numberOfPeople,
            type: presetType.type,
          },
          url: router.asPath.replace(/\?.*/g, ""),
          unit: presetType.unit,
        },
      })
    );
  };

  const handleFoodItemSelected = (foodItem) => (e) => {
    dispatch(
      toggleFoodItem({
        foodItem,
        enabled: e.target.checked,
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: ["column", "column", "row"] }}>
      <Card
        sx={{
          marginBottom: [4, 4, 5],
          marginTop: [5, 5, 0],
          width: "100%",
          order: [-9999, -9999, 9999],
        }}
      >
        <CustomizableTable
          sortedFoodItems={foodItems}
          onFoodItemSelected={handleFoodItemSelected}
        />
      </Card>
      <Box
        sx={{
          minWidth: 5,
        }}
      />
      <Box
        sx={{
          minWidth: ["full", "full", "1/3"],
          order: [9999, 9999, -9999],
          marginBottom: 5,
        }}
      >
        <Card>
          <CustomizableCurrentOrder
            presetType={presetType}
            onPlaceOrder={handlePlaceOrder}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default CustomizableOrderMenu;
