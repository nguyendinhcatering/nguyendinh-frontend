import React from "react";
import { Box, Flex } from "theme-ui";
import Wysiwyg from "../../renderer/wysiwyg";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { BREAKPOINTS } from "../../../utils/useBreakpoint";

const Footer = ({ footer }) => {
  const breakpointIndex = useBreakpointIndex();

  return (
    <Box
      css={{
        backgroundImage: "url('/images/footer.png')",
        backgroundSize: "100% 100%",
      }}
      className="mt-4 h-8 md:h-7 bg-top bg-no-repeat flex items-end justify-center"
    >
      <Flex className="container text-white pb-5 w-full">
        <Wysiwyg
          data={footer.text}
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
          overrides={{
            paragraph: {
              textAlign:
                breakpointIndex <= BREAKPOINTS.MD ? "center" : undefined,
              width: "100%",
            },
          }}
        />
      </Flex>
    </Box>
  );
};

export default Footer;
