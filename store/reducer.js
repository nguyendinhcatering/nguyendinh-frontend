import { combineReducers } from "redux";
import orderReducer from "./order/reducer";
import globalReducer from "./global/reducer";
import { routerReducer } from "connected-next-router";
import { HYDRATE } from "next-redux-wrapper";
import { omit } from "lodash";

const combinedReducer = combineReducers({
  global: globalReducer,
  order: orderReducer,
  router: routerReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const pl = omit(action.payload, ["order"]);

    const nextState = {
      ...state,
      ...pl,
    };

    if (typeof window !== "undefined" && state?.router) {
      nextState.router = state.router;
    }

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default reducer;
