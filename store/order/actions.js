import { push } from "connected-next-router";

export const selectPreset = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "@ORDER/CLEAR",
    });
    dispatch({
      type: "@ORDER/SELECT_PRESET",
      payload,
    });
    dispatch(push("/"));
  };
};
