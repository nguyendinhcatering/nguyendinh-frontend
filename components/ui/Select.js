import React from "react";
import { Box } from "theme-ui";
import SVG from "./SVG";

const DownArrow = (props) => (
  <SVG {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SVG>
);

export const getProps = (test) => (props) => {
  const next = {};
  for (const key in props) {
    if (test(key || "")) next[key] = props[key];
  }
  return next;
};

const MRE = /^m[trblxy]?$/;

export const getMargin = getProps((k) => MRE.test(k));
export const omitMargin = getProps((k) => !MRE.test(k));

export const Select = React.forwardRef((props, ref) => (
  <Box
    {...getMargin(props)}
    sx={{
      display: "flex",
      width: "100%",
    }}
  >
    <Box
      ref={ref}
      as="select"
      variant="select"
      {...omitMargin(props)}
      __themeKey="forms"
      __css={{
        display: "block",
        width: "100%",
        p: 2,
        appearance: "none",
        fontSize: "inherit",
        lineHeight: "inherit",
        border: "1px solid",
        borderRadius: 4,
        color: "inherit",
        bg: "transparent",
      }}
    />
    <DownArrow
      sx={{
        ml: -28,
        alignSelf: "center",
        pointerEvents: "none",
      }}
    />
  </Box>
));
