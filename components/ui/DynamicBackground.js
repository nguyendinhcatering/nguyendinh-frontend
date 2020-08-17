/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { Box, jsx } from "theme-ui";
import { random, times, flatten } from "lodash";
import { getImageUrl } from "../../utils/getImageSrc";

const Img = ({ image, index }) => {
  if (!image) {
    return null;
  }

  const [boxHeight, setBoxHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [margin, setMargin] = useState(0);
  const [isLeft, setIsLeft] = useState(false);
  const [fromBorder, setFromBorder] = useState(0);

  useEffect(() => {
    setBoxHeight(random(8, 16));
    setWidth(random(16, 24));
    setMargin(random(0, 24));
    setIsLeft(index % 2);
    setFromBorder(random(-100, 100));
  }, []);

  return (
    <Box
      className="relative"
      sx={{
        height: `${boxHeight}rem`,
        marginBottom: `${margin}rem`,
      }}
    >
      <Box
        as="img"
        src={getImageUrl(image, null, true)}
        alt={image.alt}
        className="inline-block absolute"
        sx={{
          width: `${width}rem`,
          height: `${width}rem`,
          ...(isLeft
            ? { left: `${fromBorder}px` }
            : { right: `${fromBorder}px` }),
          filter: "drop-shadow(5px 5px 40px rgba(0,0,0,0.20)",
        }}
      />
    </Box>
  );
};

const DynamicBackground = ({ images }) => {
  const [margin, setMargin] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMargin(random(-20, 200));
      setTop(window.innerHeight + margin);
    }
  }, []);

  return (
    <Box className="absolute w-full" sx={{ top: `${top}px` }}>
      {flatten(times(3, () => images)).map((image, index) => (
        <Img image={image} index={index} />
      ))}
    </Box>
  );
};

export default DynamicBackground;
