import React from "react";
import ReactModal from "react-modal";
import cn from "classnames";

const SideDrawer = ({ isOpen, setIsOpen, children, direction = "right" }) => {
  const openAnimationClassName =
    direction === "right" ? "animate__slideInRight" : "animate__slideInLeft";
  const closeAnimationClassName =
    direction === "right" ? "animate__slideOutRight" : "animate__slideOutLeft";
  const position = direction === "right" ? "right-0" : "left-0";

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={{
        base:
          "bg-black fixed top-0 left-0 right-0 bottom-0 bg-opacity-0 transition-all duration-500 z-top",
        afterOpen: "bg-opacity-25",
        beforeClose: "important:bg-opacity-0",
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={() => setIsOpen(false)}
      className={{
        base: cn(
          "h-screen absolute top-0 w-0 bg-red-6 text-white animate__animated animate__faster z-top",
          openAnimationClassName,
          position
        ),
        afterOpen: "w-7",
        beforeClose: closeAnimationClassName,
      }}
      closeTimeoutMS={500}
    >
      {children}
    </ReactModal>
  );
};

export default SideDrawer;
