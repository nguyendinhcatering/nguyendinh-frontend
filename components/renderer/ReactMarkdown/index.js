import React from "react";
import Markdown from "markdown-to-jsx";
import { Styled } from "theme-ui";
import Link from "../../ui/Link";

const ReactMarkdown = ({ options: overrideOptions, children }) => {
  const options = {
    overrides: {
      ...(overrideOptions || {}).overrides,
      ...Styled,
      a: {
        component: Link,
      },
    },
    ...overrideOptions,
  };

  const fixWhitespaceBetweenTag = (textToFix) => {
    return textToFix
      .replace(/>\s+</g, ">&nbsp;<")
      .replace(/>\s+([^<])/g, ">&nbsp;$1");
  };

  return (
    <Markdown options={options}>{fixWhitespaceBetweenTag(children)}</Markdown>
  );
};

export default ReactMarkdown;
