import React from "react";
import { Box } from "theme-ui";
import CenterLayout from "./layouts/CenterLayout";
import CardLayout from "./layouts/CardLayout";
import MediaLayout from "./layouts/MediaLayout";

const COMPONENT_LIBRARY = {
  center: CenterLayout,
  card: CardLayout,
  video: MediaLayout,
};

const Hero = ({ banner, layout }) => {
  const Component = COMPONENT_LIBRARY[layout] || Box;

  return <Component banner={banner} />;
};

export default Hero;
