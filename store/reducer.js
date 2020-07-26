import { HYDRATE } from "next-redux-wrapper";
import { merge } from "lodash";

const defaultOrder = {
  meta: {
    presetName: null,
    presetPrice: 0,
    presetType: {
      name: null,
      numberOfPeople: 0,
    },
  },
  presetItems: [],
  extraItems: [],
  extraServices: [],
  quantity: 0,
  unitPrice: 0,
  orderDetails: {
    namePrefix: null,
    fullName: null,
    email: null,
    phoneNumber: null,
    alternativePhoneNumber: null,
    address: null,
    orderDate: null,
    orderTime: null,
    note: null,
  },
};

const initialState = {
  order: defaultOrder,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }
    case "@ORDER/SELECT_PRESET": {
      return merge(
        {
          ...state,
        },
        {
          order: {
            meta: action.payload.meta,
            presetItems: action.payload.presetItems,
            unitPrice: action.payload.meta.presetPrice,
            quantity: 1,
          },
        }
      );
    }
    case "@ORDER/CLEAR": {
      return {
        ...state,
        order: {
          ...defaultOrder,
          orderDetails: { ...state.order.orderDetails },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
