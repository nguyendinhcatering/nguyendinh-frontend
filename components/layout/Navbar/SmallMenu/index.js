import React, { useEffect, useState } from "react";
import { Box, IconButton } from "theme-ui";
import { MdMenu } from "react-icons/md";
import ReactModal from "react-modal";
import { useRouter } from "next/router";
import MenuItem from "./MenuItem";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { BREAKPOINTS } from "../../../../utils/useBreakpoint";
import SideDrawer from "../../../ui/SideDrawer";

const SmallMenu = ({ menus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const breakpointIndex = useBreakpointIndex();

  useEffect(() => {
    if (breakpointIndex > BREAKPOINTS.MD) setIsOpen(false);
  }, [breakpointIndex]);

  return (
    <>
      <IconButton
        size="unset"
        aria-label="Menu"
        onClick={() => setIsOpen(true)}
        className="flex md:important:hidden"
      >
        <MdMenu className="w-4 h-4" />
      </IconButton>
      <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box sx={{ "&:focus": { outline: "none" } }}>
          <Box className="py-3">
            {menus
              .filter((menu) => menu.isTopLevel && !menu.isHidden)
              .map((menu) => (
                <MenuItem menu={menu} key={menu.id} />
              ))}
          </Box>
        </Box>
      </SideDrawer>
    </>
  );
};

export default SmallMenu;
