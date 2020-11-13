import React from "react";
import { Box } from "theme-ui";
import { isEmpty } from "lodash";
import cx from "classnames";
import Wysiwyg from "../../../renderer/wysiwyg";
import { getWysiwygOverrides } from "../utils";
import { Image } from "pure-react-carousel";
import { getImageUrl } from "../../../../utils/getImageSrc";
import { parseData } from "../../../renderer/wysiwyg/utils";

const CenterLayout = ({ banner }) => {
  const blocks = parseData(banner.text);

  return (
    <Image
      hasMasterSpinner={false}
      src={getImageUrl(banner?.media?.image, undefined, true)}
      isBgImage
      tag="div"
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
