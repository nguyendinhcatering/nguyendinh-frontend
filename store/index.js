import {applyMiddleware, createStore} from "redux";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
  tick: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE: {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
};

const makeStore = (ctx) => {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  // if (module.hot) {
  //   module.hot.accept("./reducers", () => {
  //     const createNextReducer = require("./reducers").default;
  //
  //     store.replaceReducer(createNextReducer(initialState));
  //   });
  // }

  return store;
};

export const wrapper = createWrapper(makeStore, {debug: true});
