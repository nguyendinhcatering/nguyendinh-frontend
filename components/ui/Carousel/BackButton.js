import React, { useContext } from "react";
import { CarouselContext } from "pure-react-carousel";
import { IconButton } from "theme-ui";
import { MdNavigateBefore } from "react-icons/md";

const BackButton = ({ ...props }) => {
  const carouselContext = useContext(CarouselContext);

  const handleClick = () => {
    const isInfinite = carouselContext.state.infinite;
    const isFirstSlide = carouselContext.state.currentSlide === 0;

    let nextSlide;

    if (!isFirstSlide) {
      nextSlide = carouselContext.state.currentSlide - 1;
    } else {
      nextSlide = isInfinite
        ? carouselContext.state.totalSlides - 1
        : carouselContext.state.currentSlide;
    }

    carouselContext.setStoreState({
      currentSlide: nextSlide,
    });
  };

  return (
    <IconButton
      size="unset"
      aria-label="Back"
      onClick={handleClick}
      className="top-0 left-0 bottom-0 absolute bg-opacity-0 transition-all duration-200 hover:bg-black hover:bg-opacity-50 hover:text-white"
      {...props}
    >
      <MdNavigateBefore className="w-4 h-4" />
    </IconButton>
  );
};

export default BackButton;
