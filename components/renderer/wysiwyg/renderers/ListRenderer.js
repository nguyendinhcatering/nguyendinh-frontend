/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

const ListRenderer = ({ block }) => {
  const List = Styled[block.data.style === "unordered" ? "ul" : "ol"];

  return (
    <List>
      {block.data.items.map((item, index) => (
        <Styled.li key={index}>{item}</Styled.li>
      ))}
    </List>
  );
};

export default ListRenderer;
