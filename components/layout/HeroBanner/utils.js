export const getWysiwygOverrides = (banner) => {
  const headingOverrides = {
    variant: banner.headerStyle === "styled" ? "text.styled" : undefined,
    color: getColor(banner.headerColor),
  };

  const paragraphOverrides = {
    variant: banner.textStyle === "styled" ? "text.styled" : undefined,
    color: getColor(banner.textColor),
  };

  return {
    heading: headingOverrides,
    paragraph: paragraphOverrides,
  };
};

const getColor = (color) => {
  if (!color) return undefined;
  return color === "primary" ? "red.6" : color;
};
