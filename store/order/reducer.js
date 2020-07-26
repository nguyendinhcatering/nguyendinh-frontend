import { merge, cloneDeep } from "lodash";

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
  ...defaultOrder,
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
    default: {
      return state;
    }
  }
};

export default reducer;
