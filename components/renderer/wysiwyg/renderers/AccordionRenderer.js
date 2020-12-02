/** @jsx jsx */
import React, { useState } from "react";
import cn from "classnames";
import { Box, jsx } from "theme-ui";
import { MdKeyboardArrowDown } from "react-icons/md";
import AnimateHeight from "react-animate-height";
import ReactMarkdown from "../../ReactMarkdown";

const AccordionRenderer = ({ block }) => {
  const [isOpen, setOpen] = useState(false);
  const [height, setHeight] = useState(0);

  const handleClick = () => {
    setOpen(!isOpen);
    setHeight(height === 0 ? "auto" : 0);
  };

  return (
    <Box>
      <Box
        className="flex flex-row py-2 px-2 font-heading items-center transition-all duration-200 select-none"
        sx={{
          borderTopWidth: "1px",
          borderTopColor: "gray.7",
          "&:hover": {
            backgroundColor: "gray.1",
          },
        }}
        onClick={handleClick}
      >
        <Box>
          <ReactMarkdown options={{ forceInline: true }}>
            {block.data.header}
          </ReactMarkdown>
        </Box>
        <Box className="flex-grow" />
        <MdKeyboardArrowDown
          size="2em"
          className={cn(
            isOpen ? "rotate-180" : "rotate-0",
            "transform transition-all duration-200"
          )}
        />
      </Box>
      <Box className="px-2 pt-1 pb-2">
        <AnimateHeight duration={300} height={height}>
          <ReactMarkdown options={{ forceBlock: true }}>
            {block.data.content.replace(/<br>/g, "\n").replace(/<br >/g, "\n")}
          </ReactMarkdown>
        </AnimateHeight>
      </Box>
    </Box>
  );
};

export default AccordionRenderer;
