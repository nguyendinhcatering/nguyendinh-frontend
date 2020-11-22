const initialState = {
  foodCategories: [],
  orderMasterData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@GLOBAL/FETCH_FOOD_CATEGORIES_SUCCESS": {
      return {
        ...state,
        foodCategories: action.payload,
      };
    }
    case "@GLOBAL/FETCH_FOOD_CATEGORIES_FAILURE": {
      return {
        ...state,
        foodCategories: [],
      };
    }
    case "@GLOBAL/FETCH_ORDER_MASTER_DATA_SUCCESS": {
      return {
        ...state,
        orderMasterData: {
          ...state.orderMasterData,
          ...action.payload,
          orderTypes: action.payload.orderType.split("\n"),
          orderPlaceTypes: action.payload.orderPlaceType.split("\n"),
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
