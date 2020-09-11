import React from "react";
import { Box } from "theme-ui";
import LeftSection from "./subtypes/LeftSection";
import RightSection from "./subtypes/RightSection";
import TopSection from "./subtypes/TopSection";
import GallerySection from "./subtypes/GallerySection";
import BackgroundSection from "./subtypes/BackgroundSection";
import NoneSection from "./subtypes/NoneSection";
import MediaOnlySection from "./subtypes/MediaOnlySection";

const DICTIONARY = {
  left: LeftSection,
  right: RightSection,
  top: TopSection,
  gallery: GallerySection,
  background: BackgroundSection,
  none: NoneSection,
  mediaOnly: MediaOnlySection,
};

const Section = ({ section }) => {
  const Component = DICTIONARY[section.mediaPlacement] || NoneSection;
  return <Component section={section}>HI</Component>;
};

export default Section;
