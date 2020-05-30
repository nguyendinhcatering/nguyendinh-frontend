export const getWysiwygOverrides = (banner) => {
  const headingOverrides = {
    variant: banner.headerStyle === "styled" ? "text.styled" : undefined,
    textAlign: banner.headerAlignment,
  };

  const paragraphOverrides = {
    variant: banner.textStyle === "styled" ? "text.styled" : undefined,
    textAlign: banner.textAlignment,
  };

  return {
    heading: headingOverrides,
    paragraph: paragraphOverrides,
  };
};
