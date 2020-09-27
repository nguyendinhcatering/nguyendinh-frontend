/** @jsx jsx */
import React from "react";
import Markdown from "markdown-to-jsx";
import { Styled, jsx } from "theme-ui";
import Link from "../../ui/Link";
import LinkButton from "../../ui/LinkButton";

const Color = ({ color, children }) => {
  return <span sx={{ color }}>{children}</span>;
};

const ReactMarkdown = ({ options: overrideOptions, children }) => {
  const options = {
    overrides: {
      ...(overrideOptions || {}).overrides,
      ...Styled,
      a: {
        component: Link,
      },
      font: {
        component: Color,
      },
      LinkButton: {
        component: LinkButton,
      },
    },
    ...overrideOptions,
  };

  const fixWhitespaceBetweenTag = (textToFix) => {
    return textToFix
      .replace(/>\s+</g, ">&nbsp;<")
      .replace(/>\s+([^<])/g, ">&nbsp;$1")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  };

  console.log(fixWhitespaceBetweenTag(children));

  return (
    <Markdown options={options}>{fixWhitespaceBetweenTag(children)}</Markdown>
  );
};

export default ReactMarkdown;
