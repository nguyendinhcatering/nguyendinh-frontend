import React from "react";
import { Button, Box } from "theme-ui";
import {
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const ICONS = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  google: FaGoogle,
  youtube: FaYoutube,
  instagram: FaInstagram,
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
        display: "inline-flex",
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
