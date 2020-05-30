import React, { createContext } from "react";

export const WysiwygContext = createContext({
  overrides: {},
});

const WysiwygContextProvider = ({ overrides, children }) => {
  return (
    <WysiwygContext.Provider value={{ overrides }}>
      {children}
    </WysiwygContext.Provider>
  );
};

export default WysiwygContextProvider;
