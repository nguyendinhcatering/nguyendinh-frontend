import React from "react";
import { Button, Box } from "theme-ui";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

const ICONS = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  google: FaGoogle,
};

const IconButton = ({ icon, src }) => {
  const Component = ICONS[icon] || Box;

  return (
    <Button
      as="a"
      sx={{
        color: "black",
        backgroundColor: "white",
        width: 10,
        height: 10,
        px: 0,
        py: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "9999px",
        boxShadow: "elevation-4",
      }}
      variant="none"
      href={src}
    >
      <Component />
    </Button>
  );
};

export default IconButton;
