import Link from "next/link";
import React from "react";
import { Box, Flex, Link as ThemeLink, Image } from "theme-ui";

// "drop-shadow(0px, 7px, 8px, -4px, rgba(0, 0, 0, 0.2)) drop-shadow(0px,12px,17px,2px,rgba(0, 0, 0, 0.14)) drop-shadow(0px,5px,22px,4px,rgba(0, 0, 0, 0.12))",

const Logo = () => {
  return (
    <Flex className="bg-white w-6 justify-center h-full">
      <Flex className="w-6 px-3">
        <Link href="/" passHref>
          <ThemeLink className="h-full w-full flex justify-center align-center">
            <Image
              className="h-full w-full"
              src="/images/logo.svg"
              alt="Nguyên Đình"
            />
          </ThemeLink>
        </Link>
      </Flex>
      <Box
        className="absolute top-5"
        css={{
          filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2))",
        }}
      >
        <Box
          className="bg-white shadow-elevation-12 w-6 h-4"
          css={{
            clipPath: "polygon(100% 0, 100% 100%, 50% 25%, 0 100%, 0 0)",
          }}
        />
      </Box>
    </Flex>
  );
};

export default Logo;
