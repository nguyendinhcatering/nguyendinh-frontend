const qualities = ["large", "medium", "small", "thumbnail"];

const getBestAvailableQuality = (image) => {
  if (!image.formats) {
    return null;
  }

  const imageQualities = qualities
    .map((quality) => {
      if (image.formats[quality]) {
        return quality;
      }
    })
    .filter(Boolean);

  return imageQualities[0];
};

const appendUrl = (url) => {
  if (url.startsWith("http")) {
    return url;
  }

  return process.env.NEXT_PUBLIC_BACKEND_URL + url;
};

export const getImageUrl = (image, quality, useOriginal = false) => {
  if (!image) return null;

  let src = image.url;

  if (quality) {
    if (image.formats) {
      const bestAvailableQuality = getBestAvailableQuality(image);

      if (bestAvailableQuality) {
        return appendUrl(image.formats[bestAvailableQuality].url);
      }

      return appendUrl(src);
    }
  }

  if (useOriginal) {
    return appendUrl(src);
  }

  if (image.formats) {
    if (image.formats.large) src = image.formats.large.url;
    else if (image.formats.medium) src = image.formats.medium.url;
    else if (image.formats.small) src = image.formats.small.url;
  }

  return appendUrl(src);
};

export const getImageAlt = (image) => {
  if (!image) return undefined;

  return image.caption || image.alternativeText || "";
};

export const IMAGE_URL = "/images/defaultBackground.jpg";
