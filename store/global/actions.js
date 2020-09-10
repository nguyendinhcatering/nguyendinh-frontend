import API from "../../utils/api";

export const fetchFoodCategories = () => {
  return async (dispatch) => {
    try {
      const foodCategories = await API.getFoodCategories();

      dispatch({
        type: "@GLOBAL/FETCH_FOOD_CATEGORIES_SUCCESS",
        payload: foodCategories,
      });
    } catch (err) {
      dispatch({
        type: "@GLOBAL/FETCH_FOOD_CATEGORIES_SUCCESS",
      });
    }
  };
};

export const fetchOrderMasterData = () => {
  return async (dispatch) => {
    try {
      const orderData = await API.getOrderData();

      dispatch({
        type: "@GLOBAL/FETCH_ORDER_MASTER_DATA_SUCCESS",
        payload: orderData,
      });
    } catch (err) {
      dispatch({
        type: "@GLOBAL/FETCH_ORDER_MASTER_DATA_FAILURE",
      });
    }
  };
};




