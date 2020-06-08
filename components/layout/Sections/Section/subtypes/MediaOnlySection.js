import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";
import Image from "../../../../ui/Image";
import AspectRatioBox from "../../../../ui/AspectRatioBox";

const MediaOnlySection = ({ section }) => {
  return (
    <Box className={cn("flex flex-col")}>
      {section?.media[0]?.image && (
        <AspectRatioBox
          ratio={[1, 1, 2]}
          sx={{ width: "100%" }}
          className={cn(
            section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
          )}
          keepAspectRatio={!section.offsetMedia}
        >
          <Image image={section?.media[0]?.image} />
        </AspectRatioBox>
      )}
    </Box>
  );
};

export default MediaOnlySection;
