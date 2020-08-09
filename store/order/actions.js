import API from "../../utils/api";
import { push } from "connected-next-router";
import { pick, omit } from "lodash";
import moment from "moment";

export const selectPreset = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "@ORDER/SELECT_PRESET",
      payload,
    });
    dispatch(push("/order/customer-details"));
  };
};

export const clearOrder = () => {
  return {
    type: "@ORDER/CLEAR",
  };
};

export const toggleFoodItem = (payload) => {
  return {
    type: "@ORDER/TOGGLE_FOOD_ITEM",
    payload: {
      foodItem: payload.foodItem,
      enabled: payload.enabled,
    },
  };
};

export const changeOrderQuantity = (newQuantity) => {
  return {
    type: "@ORDER/CHANGE_QUANTITY",
    payload: newQuantity < 1 ? 1 : newQuantity,
  };
};

export const changeOrderDetails = (payload) => {
  return {
    type: "@ORDER/CHANGE_ORDER_DETAILS",
    payload,
  };
};

export const placeOrder = (payload) => {
  return async (dispatch, getState) => {
    dispatch(changeOrderDetails(payload));

    const state = getState();
    const orderDetails = state.order.orderDetails;

    const orderTime = moment(
      moment(orderDetails.orderDate, "L").format("YYYY-MM-DD") +
        " " +
        orderDetails.orderTime
    );

    const pl = {
      ...orderDetails,
      orderDate: orderTime.toISOString(),
      orderTime: orderTime.format("HH:mm:ss.SSS"),
      orderData: omit(state.order, ["orderDetails"]),
    };

    const response = await API.placeOrder(pl);

    dispatch({
      type: "@ORDER/SENT_ORDER_SUCCESS",
      payload: response,
    });

    // Make a call to production
    dispatch(push("/order/sent"));
    // dispatch(changeOrderDetails(payload));
  };
};
