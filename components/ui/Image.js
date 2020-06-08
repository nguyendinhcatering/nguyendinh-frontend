/** @jsx jsx */

import React from "react";
import { jsx, useThemeUI, Image as ThemeUIImage } from "theme-ui";
import { getImageUrl } from "../../utils/getImageSrc";

const Image = ({ image, ...props }) => {
  const { theme } = useThemeUI();
  const breakpoints = theme.breakpoints;

  if (!image || !image.formats) {
    return null;
  }

  return (
    <picture>
      <source
        media={`(min-width: ${breakpoints[2]})`}
        srcSet={getImageUrl(image, "large")}
        type={image.formats.large.mime}
      />
      <source
        media={`(min-width: ${breakpoints[1]})`}
        srcSet={getImageUrl(image, "medium")}
        type={image.formats.medium.mime}
      />
      <source
        media={`(min-width: ${breakpoints[0]})`}
        srcSet={getImageUrl(image, "medium")}
        type={image.formats.medium.mime}
      />
      <source
        media={`(max-width: ${breakpoints[0]})`}
        srcSet={getImageUrl(image, "small")}
        type={image.formats.small.mime}
      />
      <StyledImage
        src={getImageUrl(image, "large")}
        alt={image.alternativeText || image.name}
        {...props}
      />
    </picture>
  );
};

export const StyledImage = ({ src, alt, sx, ...props }) => (
  <ThemeUIImage
    src={src}
    alt={alt}
    sx={{
      objectFit: "cover",
      objectPosition: "center",
      // position: "absolute",
      height: "100%",
      ...sx,
    }}
    {...props}
  />
);

export default Image;
