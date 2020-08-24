import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";

const ManualSection = ({ children }) => {
  return (
    <Box className={cn("flex flex-col")}>
      <Box className="w-full">{children}</Box>
    </Box>
  );
};

export default ManualSection;
