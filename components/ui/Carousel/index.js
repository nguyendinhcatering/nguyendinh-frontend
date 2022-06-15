/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { CarouselProvider, Slider } from "pure-react-carousel";
import { jsx, Box } from "theme-ui";
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import Dots from "./Dots";
import CarouselHeightProvider from "./CarouselHeightContext";
import CarouselAgent from "./CarouselAgent";

const Carousel = ({
  aspectRatio = [9, 16],
  totalSlides,
  interval = 10000,
  infinite = true,
  touchEnabled = false,
  dragEnabled = false,
  isPlaying = true,
  renderDots = true,
  renderNavigation = true,
  isIntrinsicHeight = false,
  buttonProps,
  name,
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
      <Box
        className="relative max-h-screen overflow-hidden h-full"
        ref={containerRef}
      >
        <CarouselProvider
          naturalSlideHeight={aspectRatio[0]}
          naturalSlideWidth={aspectRatio[1]}
          touchEnabled={touchEnabled}
          dragEnabled={dragEnabled}
          infinite={infinite}
          interval={interval}
          isPlaying={isPlaying}
          totalSlides={totalSlides}
          isIntrinsicHeight={isIntrinsicHeight}
          className="h-full"
        >
          <Slider
            className="h-full"
            classNameTray="h-full"
            classNameTrayWrap="h-full"
          >
            {children}
          </Slider>
          {renderNavigation && !hasOneSlide && <BackButton {...buttonProps} />}
          {renderNavigation && !hasOneSlide && <NextButton {...buttonProps} />}
          {renderDots && !hasOneSlide && <Dots />}
          <CarouselAgent name={name} />
        </CarouselProvider>
      </Box>
    </CarouselHeightProvider>
  );
};

export default Carousel;
