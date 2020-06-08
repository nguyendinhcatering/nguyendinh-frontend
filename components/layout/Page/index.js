import React from "react";
import { Box } from "theme-ui";
import Metadata from "../../metadata/Metadata";
import HeroBanner from "../HeroBanner";
import Sections from "../Sections";

const splitBanners = (banners) => {
  return {
    heroes: banners.filter((banner) => banner.location === "hero"),
  };
};

const Page = ({ page: { metadata, banners, sections } }) => {
  const { heroes } = splitBanners(banners);

  return (
    <Box>
      <Metadata metadata={metadata} />
      <HeroBanner banners={heroes} />
      <Box className="flex items-center flex-col justify-center w-full">
        <Box className="container">
          <Sections sections={sections} />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
