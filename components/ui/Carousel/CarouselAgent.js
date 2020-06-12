import React, { useContext, useEffect } from "react";
import { CarouselContext } from "pure-react-carousel";
import { NDCarouselContext } from "./NDCarouselContext";

const CarouselAgent = ({ name }) => {
  const carouselContext = useContext(CarouselContext);
  const ndCarouselContext = useContext(NDCarouselContext);

  useEffect(() => {
    function onChange() {
      if (name === ndCarouselContext.name) {
        ndCarouselContext.setCurrentIndex(carouselContext.state.currentSlide);
      }
    }

    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return <div />;
};

export default CarouselAgent;
