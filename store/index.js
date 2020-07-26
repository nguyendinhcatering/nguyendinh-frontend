import { applyMiddleware, createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

const makeStore = (ctx) => {
  const store = createStore(
    reducer,
    process.env.NODE_ENV !== "production"
      ? composeWithDevTools(applyMiddleware(thunk))
      : applyMiddleware(thunk)
  );

  if (module.hot) {
    module.hot.accept("./reducer", () => {
      const createNextReducer = require("./reducer").default;

      store.replaceReducer(createNextReducer(initialState));
    });
  }

  return store;
};

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
