/** @jsx jsx */
import React, { useContext } from "react";
import { CarouselContext } from "pure-react-carousel";
import { IconButton, jsx } from "theme-ui";
import { MdNavigateNext } from "react-icons/md";
import cn from "classnames";

const NextButton = ({ className, ...props }) => {
  const carouselContext = useContext(CarouselContext);

  const handleClick = () => {
    const isInfinite = carouselContext.state.infinite;
    const isLastSlide =
      carouselContext.state.currentSlide ===
      carouselContext.state.totalSlides - 1;

    let nextSlide;

    if (!isLastSlide) {
      nextSlide = carouselContext.state.currentSlide + 1;
    } else {
      nextSlide = isInfinite ? 0 : carouselContext.state.currentSlide;
    }

    carouselContext.setStoreState({
      currentSlide: nextSlide,
    });
  };

  return (
    <IconButton
      size="unset"
      aria-label="Next"
      onClick={handleClick}
      className={cn(
        "top-0 right-0 bottom-0 absolute bg-opacity-0 transition-all duration-200 hover:bg-black hover:bg-opacity-50 hover:text-white",
        className
      )}
      {...props}
    >
      <MdNavigateNext className="w-4 h-4" />
    </IconButton>
  );
};

export default NextButton;
