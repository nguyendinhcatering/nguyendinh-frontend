import React from "react";
import NextLink from "next/link";
import { Styled } from "theme-ui";
import { getHref } from "../../utils/getHref";

const Link = ({ href, children, ...props }) => {
  const realHref = getHref(href);

  if (!realHref.startsWith("/")) {
    return <Styled.a href={realHref}>{children}</Styled.a>;
  }

  return (
    <NextLink as={href} href={realHref} passHref>
      <Styled.a {...props}>{children}</Styled.a>
    </NextLink>
  );
};

export default Link;
