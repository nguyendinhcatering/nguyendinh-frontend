import React, { useState, useEffect } from "react";
import { Box } from "theme-ui";
import { Image } from "pure-react-carousel";
import { getImageAlt, getImageUrl } from "../../../../utils/getImageSrc";
import Card from "../../../ui/Card";
import Wysiwyg from "../../../renderer/wysiwyg";
import { getWysiwygOverrides } from "../utils";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { BREAKPOINTS } from "../../../../utils/useBreakpoint";

const CardLayout = ({ banner }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const breakpointIndex = useBreakpointIndex();

  useEffect(() => {
    if (breakpointIndex <= BREAKPOINTS.MD) {
      if (banner.mobileMedia) {
        setImageUrl(getImageUrl(banner?.mobileMedia?.image, undefined, true));
        setImageAlt(getImageAlt(banner?.mobileMedia?.image));
      } else {
        setImageUrl(getImageUrl(banner?.media?.image, undefined, true));
        setImageAlt(getImageAlt(banner?.media?.image));
      }
    } else {
      setImageUrl(getImageUrl(banner?.media?.image, undefined, true));
      setImageAlt(getImageAlt(banner?.media?.image));
    }
  }, [breakpointIndex]);

  return (
    <Image
      src={imageUrl}
      isBgImage
      tag="div"
      alt={imageAlt}
      className="bg-bottom"
    >
      <Box className="flex h-full max-h-screen items-center flex-col">
        <Box className="flex-grow" />
        <Card className="container p-5 hidden md:block">
          <Wysiwyg data={banner.text} overrides={getWysiwygOverrides(banner)} />
        </Card>
      </Box>
    </Image>
  );
};

export default CardLayout;
