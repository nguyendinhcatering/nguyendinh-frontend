import React, { useState, useEffect } from "react";
import { Box } from "theme-ui";
import Wysiwyg from "../../../renderer/wysiwyg";
import { getWysiwygOverrides } from "../utils";
import { Image } from "pure-react-carousel";
import { getImageUrl } from "../../../../utils/getImageSrc";

const CenterLayout = ({ banner }) => {
  return (
    <Image
      hasMasterSpinner={false}
      src={getImageUrl(banner?.media?.image)}
      isBgImage
      tag="div"
      className="bg-center"
    >
      <Box className="bg-black h-full max-h-screen bg-opacity-25 text-white flex items-center justify-center select-none">
        <Wysiwyg data={banner.text} overrides={getWysiwygOverrides(banner)} />
      </Box>
    </Image>
  );
};

export default CenterLayout;
