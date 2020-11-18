/** @jsx jsx */
import React from "react";
import { Box, Button, jsx } from "theme-ui";
import API from "../../utils/api";
import { IoMdDownload } from "react-icons/io";

const DownloadButton = ({ src, title, sx, variant }) => {
  const handleClick = async () => {
    if (src) {
      try {
        await API.download(src);
      } catch (err) {}
    }
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        ...sx,
        ...(variant === "transparent" && {
          color: "white",
          backgroundColor: "transparent",
          borderColor: "white",
          "&:hover": {
            color: "red.5",
          },
        }),
      }}
      variant="secondary"
    >
      <span>{title || "DOWNLOAD"}</span>
      <Box
        as="span"
        sx={{
          marginLeft: 10,
          borderLeft: "1px solid",
          height: "full",
        }}
      >
        <IoMdDownload sx={{ marginLeft: 10 }} size={24} />
      </Box>
    </Button>
  );
};

export default DownloadButton;
