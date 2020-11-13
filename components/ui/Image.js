/** @jsx jsx */

import React from "react";
import { jsx, useThemeUI, Image as ThemeUIImage } from "theme-ui";
import { getImageUrl } from "../../utils/getImageSrc";

const Image = ({ image, ...props }) => {
  const { theme } = useThemeUI();
  const breakpoints = theme.breakpoints;

  if (!image || !image.formats) {
    // if (image.url) {
    // }
    return null;
  }

  return (
    <picture>
      {image.formats.large && (
        <source
          media={`(min-width: ${breakpoints[2]})`}
          srcSet={getImageUrl(image, null, true)}
          type={image?.formats?.large?.mime}
        />
      )}
      {image.formats.medium && (
        <source
          media={`(min-width: ${breakpoints[1]})`}
          srcSet={getImageUrl(image, null, true)}
          type={image?.formats?.medium?.mime}
        />
      )}
      {image.formats.medium && (
        <source
          media={`(min-width: ${breakpoints[0]})`}
          srcSet={getImageUrl(image, "large")}
          type={image?.formats?.medium?.mime}
        />
      )}
      {image.formats.small && (
        <source
          media={`(max-width: ${breakpoints[0]})`}
          srcSet={getImageUrl(image, "medium")}
          type={image?.formats?.small?.mime}
        />
      )}
      <StyledImage
        src={getImageUrl(image, null, true)}
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
