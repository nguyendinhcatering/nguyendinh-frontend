/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { Box, Button, jsx } from "theme-ui";
import API from "../../utils/api";
import { IoMdDownload } from "react-icons/io";

const DownloadButton = ({ src, title = "DOWNLOAD", sx, variant }) => {
  const handleClick = async () => {
    if (src) {
      try {
        await API.download(src);
      } catch (err) {}
    }
  };

  return (
    <Button
      as="a"
      href={src}
      target="_blank"
      // onClick={handleClick}
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        ...sx,
      }}
      variant={variant}
    >
      <span>{title}</span>
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
