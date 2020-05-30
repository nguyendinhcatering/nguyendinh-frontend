import React, { createContext, useState } from "react";

export const MenuContext = createContext({
  currentHoveredMenu: null,
  setCurrentHoveredMenu: () => {},
});

const MenuContextProvider = ({ children }) => {
  const [currentHoveredMenu, setCurrentHoveredMenu] = useState(null);

  return (
    <MenuContext.Provider value={{ currentHoveredMenu, setCurrentHoveredMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
