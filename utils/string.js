export const padStart = (string, length, pad = "0") => {
  if (typeof string === "undefined") {
    return pad;
  }

  const padding = Array(length).fill(pad).join("");
  return (padding + string).slice(-padding.length);
};
