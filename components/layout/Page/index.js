import React from "react";
import { Box } from "theme-ui";
import Metadata from "../../metadata/Metadata";
import HeroBanner from "../HeroBanner";

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
      {/*{JSON.stringify(page)}*/}
    </Box>
  );
};

export default Page;
