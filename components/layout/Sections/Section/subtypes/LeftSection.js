import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";
import Image from "../../../../ui/Image";
import AspectRatioBox from "../../../../ui/AspectRatioBox";
import Wysiwyg from "../../../../renderer/wysiwyg";
import SectionAddon from "../../SectionAddons";
import { getWysiwygOverrides } from "../../../HeroBanner/utils";

const LeftSection = ({ section }) => {
  console.log(section.media[0]);
  return (
    <Box className={cn("flex flex-col md:flex-row")} data-testid="left-section">
      {section?.media[0]?.image && (
        <AspectRatioBox
          ratio={1}
          sx={{ width: "100%" }}
          className={cn(
            section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
          )}
          keepAspectRatio={!section.offsetMedia}
        >
          <Image image={section?.media[0]?.image} />
        </AspectRatioBox>
      )}
      <Box className="w-full">
        <Box className="p-4 xl:p-5">
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
  );
};

export default LeftSection;
