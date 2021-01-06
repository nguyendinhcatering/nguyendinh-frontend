import React, { useRef, useState, useContext, useEffect } from "react";
import { Box, Styled } from "theme-ui";
import { useRouter } from "next/router";
import Link from "next/link";
import Popover from "react-tiny-popover";
import cn from "classnames";
import { isEmpty, sortBy } from "lodash";
import { getHref } from "utils/getHref";
import { MenuContext } from "./MenuContext";

const MenuItem = ({ menu }) => {
  const { currentHoveredMenu, setCurrentHoveredMenu } = useContext(MenuContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isHoverOverPopover, setIsHoverOverPopover] = useState(false);
  const timeoutRef = useRef(false);
  const router = useRouter();

  const isUrlActive = (url) => {
    return router.asPath === url;
  };

  const isChildMenusActive = () => {
    return menu?.childMenus.find(
      (childMenu) => childMenu.url === router.asPath
    );
  };

  const isActive = (url) => {
    return isUrlActive(url) || isChildMenusActive();
  };

  const handlePopoverEnter = (e) => {
    setIsOpen(true);
    setCurrentHoveredMenu(menu.id);
  };

  const handlePopoverLeave = (e) => {
    timeoutRef.current = setTimeout(() => {
      if (!isHoverOverPopover) {
        setIsOpen(false);
      }
    }, 300);
  };

  const handleContentEnter = (e) => {
    clearTimeout(timeoutRef.current);
    setIsHoverOverPopover(true);
  };

  const handleContentLeave = (e) => {
    setIsHoverOverPopover(false);
    setIsOpen(false);
  };

  useEffect(() => {
    if (currentHoveredMenu !== menu.id) {
      // Force popover to close sooner
      handleContentLeave();
    }
  }, [currentHoveredMenu]);

  const renderSubMenu = (currentMenu) => ({
    position,
    targetRect,
    popoverRect,
  }) => {
    if (!currentMenu.childMenus || isEmpty(currentMenu.childMenus)) return null;

    const sortedChildMenus = sortBy(
      currentMenu.childMenus.filter((childMenu) => !childMenu.isHidden),
      ["order"]
    );

    return (
      <Box
        position={position}
        targetRect={targetRect}
        popoverRect={popoverRect}
        className="bg-red-6 text-white"
        onMouseEnter={handleContentEnter}
        onMouseLeave={handleContentLeave}
      >
        {sortedChildMenus.map((childMenu) => (
          <Link
            href={childMenu.url}
            passHref
            key={childMenu.id}
          >
            <Box
              as="a"
              className={cn(
                "hover:bg-red-7 w-64 text-right block py-2 px-3",
                isUrlActive(childMenu.url) ? "bg-red-7" : ""
              )}
              sx={{ fontFamily: "heading" }}
            >
              {childMenu.name}
            </Box>
          </Link>
        ))}
      </Box>
    );
  };

  return (
    <Popover
      key={menu.id}
      isOpen={isOpen}
      position="bottom"
      align="end"
      content={renderSubMenu(menu)}
    >
      <Box
        className="h-full"
        onMouseEnter={handlePopoverEnter}
        onMouseLeave={handlePopoverLeave}
      >
        <Link href={getHref(menu.url)} as={menu.url} passHref>
          <Box
            as="a"
            className={cn(
              "h-full items-center justify-center flex hover:bg-red-7 px-3 border-b-1 pt-1 transition-colors duration-200",
              isActive(menu.url)
                ? "bg-red-7 border-white"
                : "border-transparent"
            )}
            sx={{ fontFamily: "heading" }}
          >
            {menu.name}
          </Box>
        </Link>
      </Box>
    </Popover>
  );
};

export default MenuItem;
