import React, { cloneElement, Children } from "react";
import { isArray } from "lodash";
import { Box } from "theme-ui";

const calculatePaddingBottom = (aspectRatio) => {
  if (typeof aspectRatio === "string" || typeof aspectRatio === "object")
    return "initial";

  return `${(1 / aspectRatio) * 100}%`;
};

const AspectRatioBox = ({
  ratio = "original",
  keepAspectRatio = false,
  children,
  sx,
  ...props
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: keepAspectRatio ? undefined : "full",
        "&:after": {
          content: `""`,
          display: "block",
          paddingBottom: isArray(ratio)
            ? ratio.map(calculatePaddingBottom)
            : calculatePaddingBottom(ratio),
        },
        ...sx,
      }}
      {...props}
    >
      {cloneElement(Children.only(children), {
        sx: {
          position: "absolute",
          width: "full",
          height: "full",
          top: 0,
          left: 0,
        },
      })}
    </Box>
  );
};

export default AspectRatioBox;
