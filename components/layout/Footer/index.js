import React from "react";
import { Box, Flex } from "theme-ui";
import Wysiwyg from "../../renderer/wysiwyg";

const Footer = ({ footer }) => {
  return (
    <Box
      css={{
        backgroundImage: "url('/images/footer.png')",
        backgroundSize: "100% 100%",
      }}
      className="mt-4 h-7 bg-top bg-no-repeat flex items-end justify-center"
    >
      <Flex className="container h-6 text-white">
        <Wysiwyg
          data={footer.text}
          sx={{
            width: "100%",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        />
      </Flex>
    </Box>
  );
};

export default Footer;
