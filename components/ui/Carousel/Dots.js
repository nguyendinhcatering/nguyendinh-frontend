import React, { useContext, useState, useEffect } from "react";
import { CarouselContext } from "pure-react-carousel";
import { Box, IconButton } from "theme-ui";
import { GoPrimitiveDot } from "react-icons/go";
import cn from "classnames";

const arrayFrom = (number) => Array.from(Array(number).keys());

const Dots = ({ ...props }) => {
  const carouselContext = useContext(CarouselContext);
  const [slideIndexArray, setSlideIndexArray] = useState(
    arrayFrom(carouselContext.state.totalSlides)
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(
    carouselContext.state.currentSlide
  );

  useEffect(() => {
    function onChange() {
      setSlideIndexArray(arrayFrom(carouselContext.state.totalSlides));
      setCurrentSlideIndex(carouselContext.state.currentSlide);
    }

    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  const handleClick = (index) => (e) => {
    carouselContext.setStoreState({
      currentSlide: index,
    });
  };

  const isActive = (index) => currentSlideIndex === index;

  return (
    <Box className="absolute z-top bottom-0 flex w-full justify-center">
      {slideIndexArray.map((index) => (
        <IconButton
          className={cn(
            "transition-all duration-200 hover:text-white",
            isActive(index) ? "important:text-white" : ""
          )}
          size="unset"
          key={index}
          onClick={handleClick(index)}
        >
          <GoPrimitiveDot className="w-3 h-3" />
        </IconButton>
      ))}
    </Box>
  );
};

export default Dots;
