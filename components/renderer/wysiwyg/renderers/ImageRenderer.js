/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Image, { StyledImage } from "../../../ui/Image";
import { getImageUrl } from "../../../../utils/getImageSrc";

const ImageRenderer = ({ block }) => {
  return (
    <Styled.div className="relative flex justify-center">
      <StyledImage
        src={getImageUrl(block.data.file)}
        alt={block.data.alt}
        sx={{
          my: 2,
          pb: 1,
          maxWidth: "80%",
          height: "auto",
        }}
      />
    </Styled.div>
  );
};

export default ImageRenderer;
