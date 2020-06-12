/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { Box, jsx } from "theme-ui";
import Carousel from "../../ui/Carousel";
import { Slide } from "pure-react-carousel";
import Hero from "./Hero";
import { BREAKPOINTS } from "utils/useBreakpoint";
import { useBreakpointIndex } from "@theme-ui/match-media";

const HeroBanner = ({ banners, carouselName }) => {
  if (!banners) return <Box className="h-6" />;
  const breakpointIndex = useBreakpointIndex();
  const [aspectRatio, setAspectRatio] = useState([]);

  useEffect(() => {
    if (breakpointIndex > BREAKPOINTS.MD) {
      setAspectRatio([9, 16]);
    } else {
      setAspectRatio([4, 3]);
    }
  }, [breakpointIndex]);

  return (
    <Carousel
      totalSlides={banners.length}
      renderDots={false}
      aspectRatio={aspectRatio}
      name={carouselName}
    >
      {banners.map((banner) => (
        <Slide key={banner.id}>
          <Hero layout={banner.layout} banner={banner} />
        </Slide>
      ))}
    </Carousel>
  );
};

export default HeroBanner;
