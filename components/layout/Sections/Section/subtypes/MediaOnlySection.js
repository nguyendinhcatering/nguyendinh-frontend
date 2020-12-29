import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";
import AspectRatioBox from "../../../../ui/AspectRatioBox";
import Multimedia from "../../../../ui/Multimedia";

const MediaOnlySection = ({ section }) => {
  const hasMobileMedia = !!section?.mobileMedia;

  return (
    <Box className={cn("flex flex-row")}>
      {section?.media[0] && (
        <AspectRatioBox
          ratio={[1, 1, 2]}
          sx={{
            width: "100%",
            display: hasMobileMedia && ["none", "none", "initial"],
          }}
          className={cn(
            section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
          )}
          keepAspectRatio={!section.offsetMedia}
        >
          <Multimedia medium={section?.media[0]} />
        </AspectRatioBox>
      )}
      {hasMobileMedia && section?.mobileMedia && (
        <AspectRatioBox
          ratio={[1, 1, 2]}
          sx={{ width: "100%", display: ["initial", "initial", "none"] }}
          className={cn(
            section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
          )}
          keepAspectRatio={!section.offsetMedia}
        >
          <Multimedia
            medium={section?.mobileMedia}
            sx={{ objectFit: "contain", height: "auto" }}
          />
        </AspectRatioBox>
      )}
      <div />
    </Box>
  );
};

export default MediaOnlySection;
