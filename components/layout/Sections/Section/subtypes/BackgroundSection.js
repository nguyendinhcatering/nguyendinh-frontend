/** @jsx jsx */
import React from "react";
import { Box, jsx } from "theme-ui";
import cn from "classnames";
import AspectRatioBox from "../../../../ui/AspectRatioBox";
import Wysiwyg from "../../../../renderer/wysiwyg";
import SectionAddon from "../../SectionAddons";
import { getImageUrl } from "../../../../../utils/getImageSrc";
import { getWysiwygOverrides } from "../../../HeroBanner/utils";

const BackgroundSection = ({ section }) => {
  const imageUrl = section.media[0]?.image
    ? getImageUrl(section.media[0]?.image)
    : "/images/defaultBackground.jpg";

  return (
    <Box className={cn("flex flex-col")}>
      <AspectRatioBox
        ratio={[1, 1, 2]}
        sx={{ width: "100%" }}
        className={cn(
          section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
        )}
        keepAspectRatio={!section.offsetMedia}
      >
        <Box
          className="w-full p-4 md:p-5 bg-center bg-cover"
          sx={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <Wysiwyg
            data={section.text}
            overrides={getWysiwygOverrides(section)}
          />
          {section.addons.map((addon, index) => (
            <SectionAddon addon={addon} key={index} />
          ))}
        </Box>
      </AspectRatioBox>
    </Box>
  );
};

export default BackgroundSection;
