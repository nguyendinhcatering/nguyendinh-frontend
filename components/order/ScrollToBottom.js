import React, { useEffect, useState } from "react";
import { Box } from "theme-ui";
import { FaArrowCircleDown, FaCartArrowDown } from "react-icons/fa";

const ScrollArrow = ({ href }) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollDown = () => {
    if (window.pageYOffset < Math.floor(window.document.body.offsetHeight)) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollDown = () => {
    let top = window.document.body.offsetHeight;
    if (href) {
      const container = document.getElementById(href);
      if (container) {
        top = container.getBoundingClientRect().top + window.pageYOffset;
      }
    }
    window.scrollTo({
      top: top,
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
          left: "20px",
          height: "40px",
          opacity: 1,
          zIndex: 9999,
          color: "red.5",
        }}
      >
        <FaCartArrowDown
          // className="scrollBottom"
          onClick={scrollDown}
          size={40}
        />
      </Box>
    </Box>
  );
};

export default ScrollArrow;
