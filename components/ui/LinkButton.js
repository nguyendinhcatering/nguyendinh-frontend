/** @jsx jsx */
import { Button, jsx } from "theme-ui";
import { useRouter } from "next/router";
import { getHref } from "../../utils/getHref";

const LinkButton = ({ src, sx, variant = "primary", children }) => {
  const router = useRouter();

  const href = getHref(src);

  const handleClick = () => {
    router.push(href, src);
  };

  return (
    <Button onClick={handleClick} sx={sx} variant={variant}>
      {children}
    </Button>
  );
};

export default LinkButton;
