/** @jsx jsx */
import React, { useContext } from "react";
import { jsx, Styled } from "theme-ui";
import ReactMarkdown from "../../ReactMarkdown";
import { WysiwygContext } from "../WysiwygContext";
import { omitBy, isEmpty } from "lodash";

const getSx = (overrides) => {
  const paragraphOverrides = omitBy(overrides?.paragraph || {}, isEmpty);

  console.log(paragraphOverrides);

  return {
    ...paragraphOverrides,
  };
};

const ParagraphRenderer = ({ block }) => {
  console.log(block);
  const { overrides } = useContext(WysiwygContext);
  return (
    <Styled.p sx={{ textAlign: block.data.alignment, ...getSx(overrides) }}>
      <ReactMarkdown>{block.data.text}</ReactMarkdown>
    </Styled.p>
  );
};

export default ParagraphRenderer;
