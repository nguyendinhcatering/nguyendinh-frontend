/** @jsxRuntime classic */
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

  const hasDefaultBackground = imageUrl === "/images/defaultBackground.jpg";

  return (
    <Box className={cn("flex flex-col")}>
      <Box
        className={cn(
          "w-full p-4 md:p-5 bg-center bg-cover",
          hasDefaultBackground && "text-white"
        )}
        sx={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <Wysiwyg
          data={section.text}
          overrides={{ ...getWysiwygOverrides(section) }}
        />
        {section.addons.map((addon, index) => (
          <SectionAddon addon={addon} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default BackgroundSection;
