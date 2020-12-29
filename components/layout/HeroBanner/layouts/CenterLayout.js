import React, { useEffect, useState } from "react";
import { Box } from "theme-ui";
import { isEmpty } from "lodash";
import cx from "classnames";
import Wysiwyg from "../../../renderer/wysiwyg";
import { getWysiwygOverrides } from "../utils";
import { Image } from "pure-react-carousel";
import { getImageAlt, getImageUrl } from "../../../../utils/getImageSrc";
import { parseData } from "../../../renderer/wysiwyg/utils";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { BREAKPOINTS } from "../../../../utils/useBreakpoint";

const CenterLayout = ({ banner }) => {
  const blocks = parseData(banner.text);
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
      hasMasterSpinner={false}
      src={imageUrl}
      isBgImage
      tag="div"
      alt={imageAlt}
      className="bg-center"
    >
      <Box
        className={cx(
          "h-full max-h-screen text-white flex items-center justify-center select-none",
          isEmpty(blocks) ? "" : "bg-black bg-opacity-25"
        )}
      >
        <Wysiwyg data={banner.text} overrides={getWysiwygOverrides(banner)} />
      </Box>
    </Image>
  );
};

export default CenterLayout;
