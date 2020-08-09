import React from "react";
import { Button } from "theme-ui";
import axios from "axios";
import API from "../../../../utils/api";

const DownloadMenuButton = ({ data }) => {
  const handleClick = async () => {
    if (data && data.url) {
      try {
        await API.download(data.url);
      } catch (err) {}
    }
  };
  return (
    <Button variant="secondary" onClick={handleClick}>
      Download
    </Button>
  );
};

export default DownloadMenuButton;
