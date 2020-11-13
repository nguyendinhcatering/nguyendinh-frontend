/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Image, { StyledImage } from "../../../ui/Image";
import { getImageUrl } from "../../../../utils/getImageSrc";

const ImageRenderer = ({ block }) => {
  return (
    <Styled.div className="relative">
      <StyledImage
        src={getImageUrl(block.data.file)}
        alt={block.data.alt}
        sx={{
          width: "full",
          pb: 1,
        }}
      />
      {/*<Image image={block.data.file} className="w-full" />*/}
    </Styled.div>
  );
};

export default ImageRenderer;
