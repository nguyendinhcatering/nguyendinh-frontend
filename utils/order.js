import {
  sortBy,
  flatMap,
  zipObject,
  cloneDeep,
  pick,
  omit,
  pickBy,
  identity,
  uniqBy,
} from "lodash";

export const arrayFromLength = (length) => {
  return Array(length)
    .fill(null)
    .map((_, i) => i);
};

const _getMatchedOverride = (presetType, foodCategory) => {
  return foodCategory.overrides.find((override) => {
    const isFoodPresetMatch = override.foodPresetTypes.some(
      (overridePresetType) => overridePresetType.id === presetType.id
    );
    const isTypeMatch = override.type === presetType.type;
    return isTypeMatch || isFoodPresetMatch;
  });
};

export const getAllowedFoodCategoriesFromPresetType = (
  presetType,
  foodCategories
) => {
  const allowedFoodCategories = [];

  foodCategories.forEach((category) => {
    const matchedOverride = _getMatchedOverride(presetType, category);

    if (matchedOverride) {
      allowedFoodCategories.push({
        ...cloneDeep(category),
        ...pick(matchedOverride, ["allowed", "order", "type"]),
      });
    }
  });

  const sortedFoodCategories = sortBy(
    allowedFoodCategories.filter((category) => category.allowed),
    "order"
  );

  const allowedAttributes = ["id", "type", "name", "order"];

  return sortedFoodCategories.map((category) =>
    pick(category, allowedAttributes)
  );
};

export const getAllowedFoodMenuItemsFromPresetType = (
  presetType,
  foodMenuItems
) => {
  const allowedFoodMenuItems = [];

  foodMenuItems.forEach((item) => {
    const matchedOverride = _getMatchedOverride(presetType, item);

    const allowedFoodCategories = getAllowedFoodCategoriesFromPresetType(
      presetType,
      item.foodCategories
    );

    if (matchedOverride) {
      allowedFoodMenuItems.push({
        ...cloneDeep(item),
        ...pickBy(omit(matchedOverride, ["id"]), (value) => {
          // In case price is 0
          return value === 0 || identity(value);
        }),
        foodCategory: allowedFoodCategories[0],
      });
    }
  });

  const sortedFoodMenuItems = sortBy(
    allowedFoodMenuItems.filter((category) => category.allowed),
    ["foodCategory.order", "order"]
  );

  const allowedAttributes = [
    "id",
    "type",
    "name",
    "order",
    "foodCategory",
    "price",
    "isSeasonal",
  ];

  return sortedFoodMenuItems.map((category) =>
    pick(category, allowedAttributes)
  );
};

export const getSortedFoodItemsNew = (foodItems, foodCategories) => {
  return foodCategories
    .map((category) => {
      return {
        name: category.name,
        foodItems: sortBy(
          foodItems.filter((item) => item?.foodCategory?.id === category.id),
          "order"
        ),
      };
    })
    .filter((category) => category.foodItems.length > 0);
};

const getProcessedPreset = (preset, allowedCategories, allowedFoodItems) => {
  const foodItems = sortBy(
    cloneDeep(preset.foodMenuItems)
      .map((item) =>
        allowedFoodItems.find((allowedItem) => allowedItem.id === item.id)
      )
      .filter(Boolean),
    ["foodCategory.order", "order"]
  );

  const sortedFoodItems = getSortedFoodItemsNew(foodItems, allowedCategories);

  return {
    ...cloneDeep(preset),
    foodMenuItems: foodItems,
    sortedFoodItems,
  };
};

export const getSortedFoodItemsOrder = (sortedItems) => {
  const sortedArray = flatMap(sortedItems, (s) => s.foodItems).map(
    (foodItem) => foodItem.id
  );

  return zipObject(
    sortedArray,
    arrayFromLength(sortedArray.length).map((i) => i + 1)
  );
};

export const getProcessedPresets = (
  presets,
  allowedCategories,
  allowedFoodItems
) => {
  return presets.map((preset) =>
    getProcessedPreset(preset, allowedCategories, allowedFoodItems)
  );
};

export const getSortedFoodItems = (foodItems) => {
  const categories = sortBy(
    uniqBy(
      foodItems.map((item) => item.foodCategory),
      "id"
    ),
    "order"
  );

  return categories.map((category) => ({
    name: category.name,
    foodItems: sortBy(
      foodItems.filter((item) => item?.foodCategory?.id === category.id),
      ["foodCategory.order", "order"]
    ),
  }));
};
