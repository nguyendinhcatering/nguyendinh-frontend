export const getHref = (url) => {
  if (url.startsWith("/page")) {
    return "/page/[...slugs]";
  }

  return url;
};
