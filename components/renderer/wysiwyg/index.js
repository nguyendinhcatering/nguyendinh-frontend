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

  const renderBlock = (block, index) => {
    const Renderer = RendererMap[block.type];

    if (!Renderer) {
      if (process.env.NODE_ENV === "production") {
        return null;
      }
      return (
        <Box className="text-purple-5 font-bold" key={index}>
          Sorry, block {block.type}'s renderer hasn't been implemented
        </Box>
      );
    }

    return <Renderer block={block} key={index} />;
  };

  const renderColumn = (row, rowIndex) => {
    return (
      <Styled.div key={rowIndex} className="flex flex-col w-full">
        {row.blocks.map((block, index) => (
          <Styled.div key={index}>{renderBlock(block)}</Styled.div>
        ))}
      </Styled.div>
    );
  };

  const renderRow = (row, rowIndex) => {
    return (
      <Styled.div
        key={rowIndex}
        className="flex flex-col md:flex-row w-full print:flex-row"
      >
        {row.blocks.map((rowBlocks, index) => (
          <Styled.div
            key={index}
            className="flex flex-col w-full px-0 md:px-4 first:pl-0 last: pl-0"
          >
            {rowBlocks.map((block, blockIndex) =>
              renderBlock(block, blockIndex)
            )}
          </Styled.div>
        ))}
      </Styled.div>
    );
  };

  return (
    <WysiwygContextProvider overrides={overrides}>
      {blockRows.map((row, index) => {
        if (row.type === "col") {
          return renderColumn(row, index);
        } else {
          return renderRow(row, index);
        }
      })}
    </WysiwygContextProvider>
  );
};

export default Wysiwyg;
