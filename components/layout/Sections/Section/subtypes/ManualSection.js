import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";
import Wysiwyg from "../../../../renderer/wysiwyg";
import SectionAddon from "../../SectionAddons";
import { getWysiwygOverrides } from "../../../HeroBanner/utils";

const ManualSection = ({ children }) => {
  return (
    <Box className={cn("flex flex-col")}>
      <Box className="w-full">{children}</Box>
    </Box>
  );
};

export default ManualSection;
