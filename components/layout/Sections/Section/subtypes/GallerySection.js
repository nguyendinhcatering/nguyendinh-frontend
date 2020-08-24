import React, { useState, useEffect } from "react";
import { Box, Button, Embed } from "theme-ui";
import cn from "classnames";
import { isEmpty } from "lodash";
import Wysiwyg from "../../../../renderer/wysiwyg";
import SectionAddon from "../../SectionAddons";
import Lightbox from "../../../../ui/Lightbox";
import { getWysiwygOverrides } from "../../../HeroBanner/utils";
import Carousel from "../../../../ui/Carousel";
import { Slide } from "pure-react-carousel";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { BREAKPOINTS } from "../../../../../utils/useBreakpoint";
import Multimedia from "../../../../ui/Multimedia";

const GallerySection = ({ section }) => {
  const [isOpen, setOpen] = useState(false);
  const breakpointIndex = useBreakpointIndex();
  const [aspectRatio, setAspectRatio] = useState([]);

  useEffect(() => {
    if (breakpointIndex > BREAKPOINTS.MD) {
      if (section.isFullWidth) {
        setAspectRatio([1, 2]);
      } else {
        setAspectRatio([3, 4]);
      }
    } else {
      setAspectRatio([1, 1]);
    }
  }, [breakpointIndex]);

  return (
    <>
      <Box className={cn("flex flex-col")}>
        {section?.media && (
          <Carousel
            isPlaying={!isOpen}
            totalSlides={section?.media.length}
            renderNavigation={false}
            aspectRatio={aspectRatio}
            renderDots={section?.media.length > 1}
          >
            {section?.media.map((medium) => (
              <Slide key={medium.id} innerClassName="no-ring">
                <Multimedia
                  medium={medium}
                  sx={{ width: "full" }}
                  onClick={() => setOpen(true)}
                />
              </Slide>
            ))}
          </Carousel>
        )}
        {section.text && !isEmpty(section.text.blocks) && (
          <Box className="w-full p-3 text-center">
            <Wysiwyg
              data={section.text}
              overrides={getWysiwygOverrides(section)}
            />
            <Button className="important:mt-3" onClick={() => setOpen(true)}>
              Xem thêm
            </Button>
            {section.addons.map((addon, index) => (
              <SectionAddon addon={addon} key={index} />
            ))}
          </Box>
        )}
      </Box>
      <Lightbox isOpen={isOpen} setOpen={setOpen} images={section.media} />
    </>
  );
};

export default GallerySection;
