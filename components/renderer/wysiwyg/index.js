/** @jsx jsx */
import React from "react";
import { Styled, jsx } from "theme-ui";
import ImageRenderer from "./renderers/ImageRenderer";
import ParagraphRenderer from "./renderers/ParagraphRenderer";
import HeadingRenderer from "./renderers/HeadingRenderer";
import ListRenderer from "./renderers/ListRenderer";
import { parseData, preprocessBlocks } from "./utils";
import WysiwygContextProvider from "./WysiwygContext";

const RendererMap = {
  image: ImageRenderer,
  paragraph: ParagraphRenderer,
  header: HeadingRenderer,
  list: ListRenderer,
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
        <div>Sorry, block {block.type}'s renderer hasn't been implemented</div>
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
