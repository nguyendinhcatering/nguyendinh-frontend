/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { CarouselProvider, Slider } from "pure-react-carousel";
import { jsx, Box } from "theme-ui";
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import Dots from "./Dots";
import CarouselHeightProvider from "./CarouselHeightContext";

const Carousel = ({
  aspectRatio = [9, 16],
  totalSlides,
  interval = 10000,
  infinite = true,
  touchEnabled = false,
  dragEnabled = false,
  isPlaying = false,
  renderDots = true,
  renderNavigation = true,
  children,
}) => {
  const [hasOneSlide, setHasOneSlide] = useState(false);
  const [containerHeight, setContainerHeight] = useState("0px");
  const containerRef = useRef();

  useEffect(() => {
    const updateContainerHeight = () => {
      setContainerHeight(
        window.getComputedStyle(containerRef.current).height || "0px"
      );
    };

    setTimeout(updateContainerHeight, 0);
    // updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);

    return () => window.removeEventListener("resize", updateContainerHeight);
  }, []);

  useEffect(() => {
    setHasOneSlide(totalSlides === 1);
  }, [totalSlides]);

  return (
    <CarouselHeightProvider height={containerHeight}>
      <Box className="relative max-h-screen overflow-hidden" ref={containerRef}>
        <CarouselProvider
          naturalSlideHeight={aspectRatio[0]}
          naturalSlideWidth={aspectRatio[1]}
          touchEnabled={touchEnabled}
          dragEnabled={dragEnabled}
          infinite={infinite}
          interval={interval}
          isPlaying={isPlaying}
          totalSlides={totalSlides}
        >
          <Slider>{children}</Slider>
          {renderNavigation && !hasOneSlide && <BackButton />}
          {renderNavigation && !hasOneSlide && <NextButton />}
          {renderDots && !hasOneSlide && <Dots />}
        </CarouselProvider>
      </Box>
    </CarouselHeightProvider>
  );
};

export default Carousel;
