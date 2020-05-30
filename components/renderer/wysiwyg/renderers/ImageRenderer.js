/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Image from "../../../ui/Image";

const ImageRenderer = ({ block }) => {
  return (
    <Styled.div className="relative">
      <Image image={block.data.file} />
    </Styled.div>
  );
};

export default ImageRenderer;
