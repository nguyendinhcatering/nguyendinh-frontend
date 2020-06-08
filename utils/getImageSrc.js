export const getImageUrl = (image, quality, useOriginal = false) => {
  if (!image) return null;

  let src = image.url;

  if (quality) {
    return process.env.NEXT_PUBLIC_BACKEND_URL + image.formats[quality].url;
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
