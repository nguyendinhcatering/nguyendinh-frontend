import React from "react";
import { Box } from "theme-ui";
import Navbar from "../Navbar";
import Footer from "../Footer";
import DynamicBackground from "../../ui/DynamicBackground";
import { SiteDataContext } from "../../ui/Map/SiteDataContext";
import { CustomChat, FacebookProvider } from "react-facebook";

const DefaultLayout = ({ layout, pullUp, children }) => {
  const { menus, footer, siteData } = layout || {
    menus: [],
    footer: {},
    siteData: {
      backgroundImages: [],
      mapOptions: [],
      mainPageUrl: "",
      apiPageUrl: "",
      fbAppId: "fake-app-id",
      fbPageId: "fake-page-id",
      fbChatThemeColor: null,
      fbChatGreetingMessage: null,
    },
  };

  return (
    // <FacebookProvider appId={siteData.fbAppId} chatSupport>
    <SiteDataContext.Provider value={siteData}>
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
        {/*<CustomChat*/}
        {/*  pageId={siteData.fbPageId}*/}
        {/*  themeColor={siteData.fbChatThemeColor}*/}
        {/*  loggedInGreeting={siteData.fbChatGreetingMessage}*/}
        {/*  loggedOutGreeting={siteData.fbChatGreetingMessage}*/}
        {/*/>*/}
        <Footer footer={footer} />
      </div>
    </SiteDataContext.Provider>
    // </FacebookProvider>
  );
};

export default DefaultLayout;
