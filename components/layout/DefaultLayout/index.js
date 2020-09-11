import React from "react";
import { Box } from "theme-ui";
import Navbar from "../Navbar";
import Footer from "../Footer";
import DynamicBackground from "../../ui/DynamicBackground";
import { MapContext } from "../../ui/Map/MapContext";

const DefaultLayout = ({ layout, pullUp, children }) => {
  const { menus, footer, siteData } = layout || {
    menus: [],
    footer: {},
    siteData: {
      backgroundImages: [],
      mapOptions: [],
    },
  };

  return (
    <MapContext.Provider value={siteData.mapOptions}>
      <div className="min-h-screen flex flex-col">
        <Navbar menus={menus} />
        <Box className="flex-grow relative overflow-hidden">
          <DynamicBackground
            images={siteData.backgroundImages}
            pullUp={pullUp}
          />
          {children}
          <Box className="flex-grow" />
        </Box>
        <Footer footer={footer} />
      </div>
    </MapContext.Provider>
  );
};

export default DefaultLayout;
