import React from "react";
import { Flex, IconButton } from "theme-ui";
import Logo from "./Logo";
import NormalMenu from "./NormalMenu";
import { MdMenu } from "react-icons/md";
import SmallMenu from "./SmallMenu";

const Navbar = ({ menus = [] }) => {
  return (
    <Flex
      as="nav"
      className="bg-red-6 text-white h-5 w-full justify-center shadow-elevation-4 absolute z-50"
    >
      <Flex className="container items-center">
        <Logo />
        <Flex className="flex-grow" />
        <NormalMenu menus={menus} />
        <SmallMenu menus={menus} />
        {/*<MdMenu />*/}
      </Flex>
    </Flex>
  );
};

export default Navbar;
