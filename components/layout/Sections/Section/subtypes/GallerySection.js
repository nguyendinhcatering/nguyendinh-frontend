import React, { useState } from "react";
import { Box, Button } from "theme-ui";
import cn from "classnames";
import Image from "../../../../ui/Image";
import AspectRatioBox from "../../../../ui/AspectRatioBox";
import Wysiwyg from "../../../../renderer/wysiwyg";
import SectionAddon from "../../SectionAddons";
import Lightbox from "../../../../ui/Lightbox";
import { getWysiwygOverrides } from "../../../HeroBanner/utils";

const GallerySection = ({ section }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
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
          <Wysiwyg
            data={section.text}
            overrides={getWysiwygOverrides(section)}
          />
          <Button className="important:mt-3" onClick={() => setOpen(true)}>
            Xem thêm
          </Button>
          {section.addons.map((addon) => (
            <SectionAddon addon={addon} />
          ))}
        </Box>
      </Box>
      <Lightbox isOpen={isOpen} setOpen={setOpen} images={section.media} />
    </>
  );
};

export default GallerySection;
