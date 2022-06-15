/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import ReactMarkdown from "../../ReactMarkdown";

const ListRenderer = ({ block }) => {
  const List = Styled[block.data.style === "unordered" ? "ul" : "ol"];

  return (
    <List>
      {block.data.items.map((item, index) => (
        <Styled.li key={index}>
          <ReactMarkdown>{item}</ReactMarkdown>
        </Styled.li>
      ))}
    </List>
  );
};

export default ListRenderer;
