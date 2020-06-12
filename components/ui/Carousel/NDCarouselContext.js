import React, { createContext } from "react";

export const NDCarouselContext = createContext({
  items: [],
  currentIndex: 0,
  setItems: () => {},
  setCurrentIndex: () => {},
  name: "carouselContext",
});

const NDCarouselContextProvider = ({
  children,
  items,
  setItems,
  currentIndex,
  setCurrentIndex,
  name,
}) => {
  return (
    <NDCarouselContext.Provider
      value={{
        items,
        setItems,
        currentIndex,
        setCurrentIndex,
        name,
      }}
    >
      {children}
    </NDCarouselContext.Provider>
  );
};

export default NDCarouselContextProvider;
