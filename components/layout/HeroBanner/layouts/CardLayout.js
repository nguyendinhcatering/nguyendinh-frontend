import React from "react";
import { Box } from "theme-ui";
import { Image } from "pure-react-carousel";
import { getImageAlt, getImageUrl } from "../../../../utils/getImageSrc";
import Card from "../../../ui/Card";
import Wysiwyg from "../../../renderer/wysiwyg";
import { getWysiwygOverrides } from "../utils";

const CardLayout = ({ banner }) => {
  return (
    <Image
      src={getImageUrl(banner?.media?.image)}
      isBgImage
      tag="div"
      alt={getImageAlt(banner?.media?.image)}
      className="bg-center"
    >
      <Box className="flex h-full max-h-screen items-center flex-col">
        <Box className="flex-grow" />
        <Card className="container p-5">
          <Wysiwyg data={banner.text} overrides={getWysiwygOverrides(banner)} />
        </Card>
      </Box>
    </Image>
  );
};

export default CardLayout;
