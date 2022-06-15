/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import cn from "classnames";
import { Box, jsx } from "theme-ui";
import { MdKeyboardArrowUp } from "react-icons/md";
import AnimateHeight from "react-animate-height";

const Accordion = ({ header, children, isInitiallyOpen, sx, className }) => {
  const [isOpen, setOpen] = useState(isInitiallyOpen || false);
  const [height, setHeight] = useState(isInitiallyOpen ? "auto" : 0);

  const handleClick = () => {
    setOpen(!isOpen);
    setHeight(height === 0 ? "auto" : 0);
  };

  return (
    <Box>
      <Box
        className={cn(
          "flex flex-row py-2 px-2 font-heading items-center transition-all duration-200 select-none",
          className
        )}
        sx={{
          borderBottomWidth: "1px",
          borderBottomColor: "gray.7",
          "&:hover": {
            backgroundColor: "gray.1",
          },
          ...sx,
        }}
        onClick={handleClick}
      >
        <Box sx={{ fontSize: 2 }}>{header}</Box>
        <Box className="flex-grow" />
        <MdKeyboardArrowUp
          size="2em"
          className={cn(
            isOpen ? "rotate-180" : "rotate-0",
            "transform transition-all duration-200"
          )}
        />
      </Box>
      <Box className="px-2 pt-1 pb-2">
        <AnimateHeight duration={300} height={height}>
          {children}
        </AnimateHeight>
      </Box>
    </Box>
  );
};

export default Accordion;
