import { merge, cloneDeep } from "lodash";
import { x } from "./data";

const defaultOrder = {
  meta: {
    presetName: null,
    presetPrice: 0,
    presetType: {
      name: null,
      numberOfPeople: 0,
      type: null,
    },
    url: "",
  },
  presetItems: [],
  extraItems: [],
  extraServices: [],
  quantity: 0,
  unitPrice: 0,
  orderDetails: {
    title: "Ông",
    fullName: "",
    email: "",
    phone: "",
    alternativePhone: "",
    orderDate: "",
    orderTime: "",
    note: "",
    orderType: "",
    orderPlaceType: "",
  },
  savedOrder: {},
};

const initialState = {
  ...defaultOrder,
  // ...x,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@ORDER/SELECT_PRESET": {
      return merge(cloneDeep(state), {
        meta: action.payload.meta,
        presetItems: action.payload.presetItems,
        unitPrice: action.payload.meta.presetPrice,
        quantity: 1,
      });
    }
    case "@ORDER/CLEAR": {
      return {
        ...state,
        ...defaultOrder,
        orderDetails: { ...state.orderDetails },
      };
    }
    case "@ORDER/CHANGE_QUANTITY": {
      return {
        ...state,
        quantity: action.payload,
      };
    }
    case "@ORDER/CHANGE_ORDER_DETAILS": {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          ...action.payload,
        },
      };
    }
    case "@ORDER/SENT_ORDER_SUCCESS": {
      return {
        ...state,
        savedOrder: action.payload,
      };
    }
    case "@ORDER/TOGGLE_FOOD_ITEM": {
      if (action.payload.enabled) {
        return {
          ...state,
          presetItems: [...state.presetItems, action.payload.foodItem],
          unitPrice: state.unitPrice + action.payload.foodItem.price,
        };
      } else {
        return {
          ...state,
          presetItems: state.presetItems.filter(
            (item) => item.id !== action.payload.foodItem.id
          ),
          unitPrice: state.unitPrice - action.payload.foodItem.price,
        };
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
