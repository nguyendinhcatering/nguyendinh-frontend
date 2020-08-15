import { sortBy, flatMap, zipObject } from "lodash";

const arrayFromLength = (length) => {
  return Array(length)
    .fill(null)
    .map((_, i) => i);
};

export const getSortedFoodItems = (
  foodItems = [],
  foodCategories = [],
  primaryCategory = "preset"
) => {
  let primaryCategories = [];
  let secondaryCategories = [];

  if (primaryCategory === "customizable") {
    primaryCategories = sortBy(
      (foodCategories || []).filter((category) => category.orderInCustomizable),
      ["orderInCustomizable"]
    );

    secondaryCategories = sortBy(
      (foodCategories || []).filter((category) => category.orderInPreset),
      ["orderInPreset"]
    );
  } else {
    primaryCategories = sortBy(
      (foodCategories || []).filter((category) => category.orderInPreset),
      ["orderInPreset"]
    );

    secondaryCategories = sortBy(
      (foodCategories || []).filter((category) => category.orderInCustomizable),
      ["orderInCustomizable"]
    );
  }

  const secondaryOrder = (foodItem) => {
    const secondaryCategory = secondaryCategories.find((category) =>
      foodItem.foodCategories.some(
        (foodCategory) => foodCategory.id === category.id
      )
    );

    const order =
      primaryCategory === "customizable"
        ? secondaryCategory.orderInPreset
        : secondaryCategory.orderInCustomizable;

    return secondaryCategory ? order : 9999;
  };

  const sortedFoodItems = primaryCategories.map((category) => {
    const foodItemsInCategory = (foodItems || []).filter((item) =>
      item.foodCategories.some(
        (foodCategory) => category.id === foodCategory.id
      )
    );

    const sortedFoodItems = sortBy(foodItemsInCategory, [
      secondaryOrder,
      "order",
      "name",
    ]);

    return {
      name: category.name,
      foodItems: sortedFoodItems,
    };
  });

  const sortedArray = flatMap(sortedFoodItems, (s) => s.foodItems).map(
    (foodItem) => foodItem.id
  );

  const sortedFoodItemsOrder = zipObject(
    sortedArray,
    arrayFromLength(sortedArray.length).map((i) => i + 1)
  );

  return {
    sortedFoodItems,
    sortedFoodItemsOrder,
  };
};
