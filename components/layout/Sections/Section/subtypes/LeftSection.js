import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";
import Image from "../../../../ui/Image";
import AspectRatioBox from "../../../../ui/AspectRatioBox";
import Wysiwyg from "../../../../renderer/wysiwyg";
import SectionAddon from "../../SectionAddons";
import { getWysiwygOverrides } from "../../../HeroBanner/utils";
import Multimedia from "../../../../ui/Multimedia";

const LeftSection = ({ section }) => {
  return (
    <Box className={cn("flex flex-col md:flex-row")} data-testid="left-section">
      {section?.media[0] && (
        <AspectRatioBox
          ratio={1}
          sx={{ width: "100%" }}
          className={cn(
            section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
          )}
          keepAspectRatio={!section.offsetMedia}
        >
          <Multimedia medium={section?.media[0]} />
        </AspectRatioBox>
      )}
      <Box className="w-full">
        <Box className="p-4 xl:px-6 xl:py-5 flex items-center justify-center flex-col h-full">
          <Box className="w-full">
            <Wysiwyg
              data={section.text}
              overrides={getWysiwygOverrides(section)}
            />
            {section?.addons.map((addon, index) => (
              <SectionAddon addon={addon} key={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSection;
