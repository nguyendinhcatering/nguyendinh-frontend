/** @jsx jsx */
import { Button, jsx } from "theme-ui";
import { useRouter } from "next/router";
import { getHref } from "../../utils/getHref";

const LinkButton = ({ src, children }) => {
  const router = useRouter();

  const href = getHref(src);

  const handleClick = () => {
    router.push(href, src);
  };

  return <Button onClick={handleClick}>{children}</Button>;
};

export default LinkButton;
