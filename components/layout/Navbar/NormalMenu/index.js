import React from "react";
import { Box } from "theme-ui";
import MenuItem from "./MenuItem";
import MenuContextProvider from "./MenuContext";

const NormalMenu = ({ menus }) => {
  const renderMenu = (menu) => <MenuItem menu={menu} key={menu.id} />;

  return (
    <MenuContextProvider>
      <Box className="items-center hidden md:flex h-full">
        {menus
          .filter((menu) => menu.isTopLevel && !menu.isHidden)
          .map(renderMenu)}
      </Box>
    </MenuContextProvider>
  );
};

export default NormalMenu;
