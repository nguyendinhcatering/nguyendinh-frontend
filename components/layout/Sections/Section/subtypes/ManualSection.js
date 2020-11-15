import React from "react";
import { Box } from "theme-ui";

const ManualSection = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "full" }}>
      <Box sx={{ width: "full" }}>{children}</Box>
    </Box>
  );
};

export default ManualSection;
