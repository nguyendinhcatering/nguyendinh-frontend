import React, { useEffect, useState } from "react";
import { Box } from "theme-ui";
import { FaArrowCircleDown } from "react-icons/fa";

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollDown = () => {
    if (window.pageYOffset < Math.floor(window.document.body.offsetHeight)) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollDown = () => {
    window.scrollTo({
      top: window.document.body.offsetHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollDown);
    return () => {
      window.removeEventListener("scroll", checkScrollDown);
    };
  }, []);

  return (
    <Box
      sx={{
        display: showScroll ? ["flex", "flex", "none"] : "none",
        justifyContent: "end",
        alignItems: "end",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          height: "40px",
          opacity: 1,
          zIndex: 9999,
          color: "red.5",
        }}
      >
        <FaArrowCircleDown
          // className="scrollBottom"
          onClick={scrollDown}
          size={40}
        />
      </Box>
    </Box>
  );
};

export default ScrollArrow;
