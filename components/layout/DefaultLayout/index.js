import React from "react";
import { Box } from "theme-ui";
import Navbar from "../Navbar";
import Footer from "../Footer";

const DefaultLayout = ({ layout, children }) => {
  const { menus, footer } = layout;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar menus={menus} />
      {children}
      <Box className="flex-grow" />
      <Footer footer={footer} />
    </div>
  );
};

export default DefaultLayout;
