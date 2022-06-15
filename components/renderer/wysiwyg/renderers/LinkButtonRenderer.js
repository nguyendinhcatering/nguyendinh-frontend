/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, jsx } from "theme-ui";
import { useRouter } from "next/router";
import { getHref } from "../../../../utils/getHref";

const LinkButtonRenderer = ({ block }) => {
  const router = useRouter();

  const href = getHref(block.data.url);

  const handleClick = () => {
    router.push(href, block.data.url);
  };

  return <Button onClick={handleClick}>{block.data.title}</Button>;
};

export default LinkButtonRenderer;
