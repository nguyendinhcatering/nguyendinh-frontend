/** @jsx jsx */

import React from "react";
import { jsx, useThemeUI, Image as ThemeUIImage } from "theme-ui";

const getRealUrl = (src) => {
  const indexOfUploads = src.indexOf("/uploads");

  if (indexOfUploads === -1) return src;

  const uploadPath = src.slice(indexOfUploads);

  return process.env.APP_BACKEND_URL + uploadPath;
};

const Image = ({ image }) => {
  const { theme } = useThemeUI();
  const breakpoints = theme.breakpoints;

  return (
    <picture>
      <source
        media={`(min-width: ${breakpoints[2]})`}
        srcSet={getRealUrl(image.formats.large.url)}
        type={image.formats.large.mime}
      />
      <source
        media={`(min-width: ${breakpoints[1]})`}
        srcSet={getRealUrl(image.formats.medium.url)}
        type={image.formats.medium.mime}
      />
      <source
        media={`(min-width: ${breakpoints[0]})`}
        srcSet={getRealUrl(image.formats.medium.url)}
        type={image.formats.medium.mime}
      />
      <source
        media={`(max-width: ${breakpoints[0]})`}
        srcSet={getRealUrl(image.formats.small.url)}
        type={image.formats.small.mime}
      />
      <StyledImage
        src={getRealUrl(image.formats.large.url)}
        alt={image.alternativeText || image.name}
      />
    </picture>
  );
};

export const StyledImage = ({ src, alt }) => (
  <ThemeUIImage
    src={getRealUrl(src)}
    alt={alt}
    sx={{
      objectFit: "cover",
      objectPosition: "center",
      // position: "absolute",
      height: "100%",
    }}
  />
);

export default Image;
