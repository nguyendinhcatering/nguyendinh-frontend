/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { Box, Flex, IconButton, jsx, useThemeUI } from "theme-ui";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";
import { getHref } from "../../../../utils/getHref";
import { useRouter } from "next/router";
import cn from "classnames";
import { sortBy } from "lodash";

const ITEM_HEIGHT = 48;

const MenuItem = ({ menu, setIsOpen }) => {
  const router = useRouter();

  const [showChildMenu, setShowChildMenu] = useState(false);
  const sortedChildMenus = sortBy(menu.childMenus, ["order"]).filter(
    (childMenu) => !childMenu.isHidden
  );

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

  useEffect(() => {
    if (isChildMenusActive()) {
      setShowChildMenu(true);
    } else {
      setShowChildMenu(false);
    }
  }, [router.asPath]);

  const hasChildMenus = () => menu.childMenus && menu.childMenus.length > 0;

  const handleToggleShowChildMenu = () => {
    setShowChildMenu(!showChildMenu);
  };

  return (
    <>
      <Flex key={menu.id} sx={{ height: `${ITEM_HEIGHT}px` }}>
        <Link href={getHref(menu.url)} as={menu.url} passHref>
          <Box
            as="a"
            className={cn(
              "h-full items-center justify-start flex hover:bg-red-7 pl-2 py-2 border-l-1 transition-colors duration-200 flex-grow",
              isActive(menu.url)
                ? "bg-red-7 border-white"
                : "border-transparent"
            )}
            sx={{ fontFamily: "heading" }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {menu.name}
          </Box>
        </Link>
        {hasChildMenus() && (
          <IconButton
            size="unset"
            className={cn(
              isActive(menu.url) && "important:bg-red-7",
              "hover:bg-red-7"
            )}
            onClick={handleToggleShowChildMenu}
          >
            {showChildMenu ? (
              <MdKeyboardArrowUp size="2em" />
            ) : (
              <MdKeyboardArrowDown size="2em" />
            )}
          </IconButton>
        )}
      </Flex>
      <Box
        sx={{
          maxHeight: showChildMenu
            ? `${menu.childMenus.length * ITEM_HEIGHT}px`
            : "0px",
          opacity: showChildMenu ? "100%" : "0",
          visibility: showChildMenu ? "visible" : "hidden",
          transitionProperty: "max-height, opacity, visibility",
        }}
        className="duration-200"
      >
        {sortedChildMenus.map((childMenu) => (
          <Link
            href={getHref(childMenu.url)}
            as={childMenu.url}
            passHref
            key={childMenu.id}
          >
            <Box
              as="a"
              sx={{
                height: `${ITEM_HEIGHT}px`,
              }}
              className={cn(
                "items-center justify-start flex hover:bg-red-7 pl-4 py-2 border-l-1 transition-colors duration-200 flex-grow",
                isUrlActive(childMenu.url)
                  ? "bg-red-7 border-white"
                  : "border-transparent"
              )}
              sx={{ fontFamily: "heading" }}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {childMenu.name}
            </Box>
          </Link>
        ))}
      </Box>
    </>
  );
};

export default MenuItem;
