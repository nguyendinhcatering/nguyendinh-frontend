import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";
import Wysiwyg from "../../../../renderer/wysiwyg";
import SectionAddon from "../../SectionAddons";
import { getWysiwygOverrides } from "../../../HeroBanner/utils";

const NoneSection = ({ section }) => {
  return (
    <Box className={cn("flex flex-col")}>
      <Box className="w-full p-4 md:p-5">
        <Wysiwyg data={section.text} overrides={getWysiwygOverrides(section)} />
        {section.addons.map((addon, index) => (
          <SectionAddon addon={addon} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default NoneSection;
