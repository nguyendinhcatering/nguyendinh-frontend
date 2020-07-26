import { combineReducers } from "redux";
import orderReducer from "./order/reducer";
import { routerReducer } from "connected-next-router";
import { HYDRATE } from "next-redux-wrapper";

const combinedReducer = combineReducers({
  order: orderReducer,
  router: routerReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
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
