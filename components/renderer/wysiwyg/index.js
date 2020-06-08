/** @jsx jsx */
import React from "react";
import { Styled, jsx, Box } from "theme-ui";
import ImageRenderer from "./renderers/ImageRenderer";
import ParagraphRenderer from "./renderers/ParagraphRenderer";
import HeadingRenderer from "./renderers/HeadingRenderer";
import ListRenderer from "./renderers/ListRenderer";
import { parseData, preprocessBlocks } from "./utils";
import WysiwygContextProvider from "./WysiwygContext";
import LinkButtonRenderer from "./renderers/LinkButtonRenderer";
import AccordionRenderer from "./renderers/AccordionRenderer";

const RendererMap = {
  image: ImageRenderer,
  paragraph: ParagraphRenderer,
  header: HeadingRenderer,
  list: ListRenderer,
  linkButton: LinkButtonRenderer,
  accordion: AccordionRenderer,
};

const Wysiwyg = ({ data, sx = {}, overrides }) => {
  const blockRows = preprocessBlocks(parseData(data));

  const renderBlock = (block) => {
    const Renderer = RendererMap[block.type];

    if (!Renderer) {
      if (process.env.NODE_ENV === "production") {
        return null;
      }
      return (
        <Box className="text-purple-5 font-bold">
          Sorry, block {block.type}'s renderer hasn't been implemented
        </Box>
      );
    }

    return <Renderer block={block} />;
  };

  return (
    <WysiwygContextProvider overrides={overrides}>
      <Styled.div className="flex-col md:flex-row flex" sx={sx}>
        {blockRows.map((blockCols, rowIndex) => {
          return (
            <Styled.div className="flex flex-col w-full" key={rowIndex}>
              {blockCols.map((block, colIndex) => (
                <Styled.div key={colIndex}>{renderBlock(block)}</Styled.div>
              ))}
            </Styled.div>
          );
        })}
      </Styled.div>
    </WysiwygContextProvider>
  );
};

export default Wysiwyg;
