/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import ReactMarkdown from "../../ReactMarkdown";
import { WysiwygContext } from "../WysiwygContext";
import { useContext } from "react";

const getSx = (overrides, level) => {
  const headingOverrides = overrides?.heading || {};

  let variant = "text.heading";

  if (headingOverrides?.variant === "text.styled") {
    variant = `text.styledH${level}`;
  }

  return {
    ...headingOverrides,
    variant,
  };
};

const HeadingRenderer = ({ block }) => {
  const Heading = Styled[`h${block.data.level}`];
  const { overrides } = useContext(WysiwygContext);

  return (
    <Heading
      sx={{
        ...getSx(overrides, block.data.level),
      }}
    >
      <ReactMarkdown>{block.data.text}</ReactMarkdown>
    </Heading>
  );
};

export default HeadingRenderer;
