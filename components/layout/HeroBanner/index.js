/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, Box } from "theme-ui";
import Wysiwyg from "../../renderer/wysiwyg";
import Carousel from "../../ui/Carousel";
import { Slider, Slide } from "pure-react-carousel";
import CenterLayout from "./layouts/CenterLayout";
import Hero from "./Hero";
import { BREAKPOINTS } from "utils/useBreakpoint";
import { useBreakpointIndex } from "@theme-ui/match-media";

const HeroBanner = ({ banners }) => {
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
    <div>
      <Carousel
        totalSlides={banners.length}
        renderDots={false}
        aspectRatio={aspectRatio}
      >
        {banners.map((banner) => (
          <Slide key={banner.id}>
            <Hero layout={banner.layout} banner={banner} />
          </Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
