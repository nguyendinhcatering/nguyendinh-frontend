import React, { createContext } from "react";

export const CarouselHeightContext = createContext("0px");

const CarouselHeightProvider = ({ height, children }) => {
  return (
    <CarouselHeightContext.Provider value={height}>
      {children}
    </CarouselHeightContext.Provider>
  );
};

export default CarouselHeightProvider;
