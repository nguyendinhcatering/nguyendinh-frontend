import React, { useState } from "react";
import { Box } from "theme-ui";
import { isEmpty } from "lodash";
import cx from "classnames";
import Wysiwyg from "../../../renderer/wysiwyg";
import { getWysiwygOverrides } from "../utils";
import { getImageUrl } from "../../../../utils/getImageSrc";
import { parseData } from "../../../renderer/wysiwyg/utils";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { BREAKPOINTS } from "../../../../utils/useBreakpoint";
import useDeepCompareEffect from "../../../../hooks/useDeepEffect";

const CenterLayout = ({ banner }) => {
  const blocks = parseData(banner.text);
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
      <Box
        className={cx(
          "h-full max-h-screen text-white flex items-center justify-center select-none",
          isEmpty(blocks) ? "" : "bg-black bg-opacity-25"
        )}
      >
        <Wysiwyg data={banner.text} overrides={getWysiwygOverrides(banner)} />
      </Box>
    </div>
  );
};

export default CenterLayout;
