export const selectPreset = (payload) => {
  return {
    type: "@ORDER/SELECT_PRESET",
    payload,
  };
};

export const clearOrder = () => {
  return {
    type: "@ORDER/CLEAR",
  };
};
