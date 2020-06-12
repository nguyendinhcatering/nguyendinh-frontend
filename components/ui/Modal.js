import React, { useEffect } from "react";
import ReactModal from "react-modal";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import { MdClose } from "react-icons/md";
import { IconButton } from "theme-ui";

const Modal = ({ children, isOpen, setOpen, ...props }) => {
  let contentEl = null;

  useEffect(() => {
    return clearAllBodyScrollLocks;
  });

  const handleRequestClose = () => {
    enableBodyScroll(contentEl);
    setOpen(false);
  };

  const handleAfterOpen = () => {
    disableBodyScroll(contentEl);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={{
        base: "bg-black fixed top-0 left-0 right-0 bottom-0 bg-opacity-0 z-top",
        afterOpen: "bg-opacity-100 md:bg-opacity-75",
        beforeClose: "important:bg-opacity-0",
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onAfterOpen={handleAfterOpen}
      onRequestClose={handleRequestClose}
      className={{ base: "", afterOpen: "", beforeClose: "" }}
      contentRef={(element) => (contentEl = element)}
      ariaHideApp={false}
      {...props}
    >
      <IconButton
        size="unset"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "gray.5",
          transition: "all",
          transitionDuration: "200ms",
          "&:hover": {
            color: "white",
          },
        }}
        onClick={() => setOpen(false)}
      >
        <MdClose size="2em" />
      </IconButton>
      {children}
    </ReactModal>
  );
};

export default Modal;
