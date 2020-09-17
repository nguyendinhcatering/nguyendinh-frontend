import React, { useEffect } from "react";
import ReactModal from "react-modal";
import cn from "classnames";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";

const SideDrawer = ({ isOpen, setIsOpen, children, direction = "right" }) => {
  const openAnimationClassName =
    direction === "right" ? "animate__slideInRight" : "animate__slideInLeft";
  const closeAnimationClassName =
    direction === "right" ? "animate__slideOutRight" : "animate__slideOutLeft";
  const position = direction === "right" ? "right-0" : "left-0";

  let contentEl = null;

  useEffect(() => {
    return clearAllBodyScrollLocks;
  });

  const handleRequestClose = () => {
    enableBodyScroll(contentEl);
    setIsOpen(false);
  };

  const handleAfterOpen = () => {
    disableBodyScroll(contentEl);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={{
        base:
          "bg-black fixed top-0 left-0 right-0 bottom-0 bg-opacity-0 transition-all duration-200 z-top",
        afterOpen: "bg-opacity-25",
        beforeClose: "important:bg-opacity-0",
      }}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onAfterOpen={handleAfterOpen}
      onRequestClose={handleRequestClose}
      contentRef={(element) => (contentEl = element)}
      className={{
        base: cn(
          "h-screen absolute top-0 w-0 bg-red-6 text-white animate__animated z-top overflow-scroll",
          openAnimationClassName,
          position
        ),
        afterOpen: "w-64",
        beforeClose: closeAnimationClassName,
      }}
      closeTimeoutMS={500}
    >
      {children}
    </ReactModal>
  );
};

export default SideDrawer;
