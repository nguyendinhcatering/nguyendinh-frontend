import { applyMiddleware, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import Router from "next/router";
import { format } from "url";
import reducer from "./reducer";

const bindMiddleware = (...middlewares) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return applyMiddleware(...middlewares);
};

const makeStore = (ctx) => {
  const routerMiddleware = createRouterMiddleware();
  const { asPath, pathname, query } = ctx.ctx || Router.router || {};

  let initialState = {};
  if (asPath) {
    const url = format({ pathname, query });

    initialState = {
      router: initialRouterState(url, asPath),
    };
  }

  const store = createStore(
    reducer,
    initialState,
    bindMiddleware(thunk, routerMiddleware)
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
  // debug: process.env.NODE_ENV !== "production",
  debug: false,
});
