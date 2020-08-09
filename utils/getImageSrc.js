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

export const getImageUrl = (image, quality, useOriginal = false) => {
  if (!image) return null;

  let src = image.url;

  if (quality) {
    if (image.formats) {
      const bestAvailableQuality = getBestAvailableQuality(image);

      if (bestAvailableQuality) {
        return (
          process.env.NEXT_PUBLIC_BACKEND_URL +
          image.formats[bestAvailableQuality].url
        );
      }

      return process.env.NEXT_PUBLIC_BACKEND_URL + src;
    }
  }

  if (useOriginal) {
    return process.env.NEXT_PUBLIC_BACKEND_URL + src;
  }

  if (image.formats) {
    if (image.formats.large) src = image.formats.large.url;
    else if (image.formats.medium) src = image.formats.medium.url;
    else if (image.formats.small) src = image.formats.small.url;
  }

  return process.env.NEXT_PUBLIC_BACKEND_URL + src;
};

export const getImageAlt = (image) => {
  if (!image) return undefined;

  return image.caption || image.alternativeText;
};

export const IMAGE_URL = "/images/defaultBackground.jpg";
