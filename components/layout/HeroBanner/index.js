/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { Box, jsx } from "theme-ui";
import { isEmpty } from "lodash";
import Carousel from "../../ui/Carousel";
import { Slide } from "pure-react-carousel";
import Hero from "./Hero";
import { BREAKPOINTS } from "utils/useBreakpoint";
import { useBreakpointIndex } from "@theme-ui/match-media";

const HeroBanner = ({ banners, carouselName }) => {
  const breakpointIndex = useBreakpointIndex();
  const [aspectRatio, setAspectRatio] = useState([]);

  useEffect(() => {
    if (breakpointIndex > BREAKPOINTS.MD) {
      setAspectRatio([8, 16]);
    } else {
      setAspectRatio([4, 3]);
    }
  }, [breakpointIndex]);

  if (!banners || isEmpty(banners)) return <Box className="h-6" />;

  return (
    <Carousel
      totalSlides={banners.length}
      renderDots={false}
      aspectRatio={aspectRatio}
      name={carouselName}
    >
      {banners.map((banner) => (
        <Slide key={banner.id} innerClassName="no-ring">
          <Hero layout={banner.layout} banner={banner} />
        </Slide>
      ))}
    </Carousel>
  );
};

export default HeroBanner;
