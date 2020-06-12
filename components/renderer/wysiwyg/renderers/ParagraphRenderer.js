/** @jsx jsx */
import React, { useContext } from "react";
import { jsx, Styled } from "theme-ui";
import ReactMarkdown from "../../ReactMarkdown";
import { WysiwygContext } from "../WysiwygContext";

const getSx = (overrides) => {
  const paragraphOverrides = overrides?.paragraph || {};

  return {
    ...paragraphOverrides,
  };
};

const ParagraphRenderer = ({ block }) => {
  const { overrides } = useContext(WysiwygContext);
  return (
    <Styled.p sx={{ textAlign: block.data.alignment, ...getSx(overrides) }}>
      <ReactMarkdown>{block.data.text}</ReactMarkdown>
    </Styled.p>
  );
};

export default ParagraphRenderer;
