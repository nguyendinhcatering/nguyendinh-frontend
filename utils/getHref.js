const PRESET_TYPES = [
  "table",
  "table-customizable",
  "buffet",
  "buffet-customizable",
];

export const getHref = (url) => {
  if (url.startsWith("/page")) {
    return "/page/[...slugs]";
  }

  if (url.startsWith("/order")) {
    if (PRESET_TYPES.some((type) => url.includes(type))) {
      const type = PRESET_TYPES.find((type) => url.includes(type));
      return `/order/${type}/[slug]`;
    }
  }

  return url;
};
