import React from "react";
import Markdown from "markdown-to-jsx";
import { Styled } from "theme-ui";

const ReactMarkdown = ({ options: overrideOptions, children }) => {
  const options = {
    overrides: {
      ...(overrideOptions || {}).overrides,
      ...Styled,
    },
    ...overrideOptions,
  };

  const fixWhitespaceBetweenTag = (textToFix) => {
    return textToFix
      .replace(/\>\s+\</g, ">&nbsp;<")
      .replace(/\>\s+([^<])/g, ">&nbsp;$1");
  };

  return (
    <Markdown options={options}>{fixWhitespaceBetweenTag(children)}</Markdown>
  );
};

export default ReactMarkdown;
