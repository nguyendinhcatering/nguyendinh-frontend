import React from "react";
import { Box } from "theme-ui";
import Navbar from "../Navbar";
import Footer from "../Footer";
import DynamicBackground from "../../ui/DynamicBackground";

const DefaultLayout = ({ layout, pullUp, children }) => {
  const { menus, footer, siteData } = layout || {
    menus: [],
    footer: {},
    siteData: {
      backgroundImages: [],
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar menus={menus} />
      <Box className="flex-grow relative overflow-hidden">
        <DynamicBackground images={siteData.backgroundImages} pullUp={pullUp} />
        {children}
        <Box className="flex-grow" />
      </Box>
      <Footer footer={footer} />
    </div>
  );
};

export default DefaultLayout;
