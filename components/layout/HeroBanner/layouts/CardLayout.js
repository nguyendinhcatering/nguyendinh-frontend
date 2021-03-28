import React, { useState } from "react";
import { Box } from "theme-ui";
import { getImageUrl } from "../../../../utils/getImageSrc";
import Card from "../../../ui/Card";
import Wysiwyg from "../../../renderer/wysiwyg";
import { getWysiwygOverrides } from "../utils";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { BREAKPOINTS } from "../../../../utils/useBreakpoint";
import useDeepCompareEffect from "../../../../hooks/useDeepEffect";

const CardLayout = ({ banner }) => {
  const [imageUrl, setImageUrl] = useState("");
  const breakpointIndex = useBreakpointIndex();

  useDeepCompareEffect(() => {
    if (breakpointIndex <= BREAKPOINTS.MD) {
      if (banner.mobileMedia) {
        setImageUrl(getImageUrl(banner?.mobileMedia?.image, undefined, true));
      } else {
        setImageUrl(getImageUrl(banner?.media?.image, undefined, true));
      }
    } else {
      setImageUrl(getImageUrl(banner?.media?.image, undefined, true));
    }
  }, [breakpointIndex, banner]);

  return (
    <div
      style={{
        backgroundImage: `url("${imageUrl}")`,
      }}
      className="bg-bottom w-full h-full bg-cover block"
    >
      <Box className="flex h-full max-h-screen items-center flex-col">
        <Box className="flex-grow" />
        <Card className="container p-5 hidden md:block">
          <Wysiwyg data={banner.text} overrides={getWysiwygOverrides(banner)} />
        </Card>
      </Box>
    </div>
  );
};

export default CardLayout;
