/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { Box, jsx } from "theme-ui";
import { random, times, flatten } from "lodash";
import { getImageUrl } from "../../utils/getImageSrc";

const Img = ({ image, index }) => {
  if (!image) {
    return null;
  }
  const boxHeight = random(8, 16);
  const width = random(16, 24);
  const margin = random(0, 24);
  const isLeft = index % 2;
  const fromBorder = random(-100, 100);
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
  const margin = random(-20, 200);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
