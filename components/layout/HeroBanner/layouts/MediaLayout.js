import React, { useContext } from "react";
import { Embed, Box } from "theme-ui";
import { CarouselHeightContext } from "../../../ui/Carousel/CarouselHeightContext";

const MediaLayout = ({ banner }) => {
  const containerHeight = useContext(CarouselHeightContext);

  return (
    <Box className="relative top-5 h-full">
      <Box sx={{ height: `calc(${containerHeight} - 4rem)` }}>
        <Embed
          src={banner?.media?.embeddedMedia}
          sx={{ height: "100%", paddingBottom: "unset" }}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </Box>
    </Box>
  );
};

export default MediaLayout;
