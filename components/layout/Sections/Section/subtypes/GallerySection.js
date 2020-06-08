import React from "react";
import { Box, Button } from "theme-ui";
import cn from "classnames";
import Image from "../../../../ui/Image";
import AspectRatioBox from "../../../../ui/AspectRatioBox";
import Wysiwyg from "../../../../renderer/wysiwyg";
import SectionAddon from "../../SectionAddons";

const GallerySection = ({ section }) => {
  return (
    <Box className={cn("flex flex-col")}>
      {section?.media[0]?.image && (
        <AspectRatioBox
          ratio={[1, 1, 4 / 3]}
          sx={{ width: "100%" }}
          className={cn(
            section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
          )}
          keepAspectRatio={!section.offsetMedia}
        >
          <Image image={section?.media[0]?.image} />
        </AspectRatioBox>
      )}
      <Box className="w-full p-4 text-center">
        <Wysiwyg data={section.text} />
        <Button variant="primary" className="important:mt-3">
          Xem thêm
        </Button>
        {section.addons.map((addon) => (
          <SectionAddon addon={addon} />
        ))}
      </Box>
    </Box>
  );
};

export default GallerySection;
