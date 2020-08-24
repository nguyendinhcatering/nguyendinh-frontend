/** @jsx jsx */
import React from "react";
import { Box, jsx } from "theme-ui";
import { splitSections } from "./utils";
import SectionsWrapper from "./SectionsWrapper";

const Sections = ({ sections, sx }) => {
  const splittedSections = splitSections(sections);
  console.log(splittedSections);
  return (
    <Box className="flex flex-col" sx={sx}>
      {splittedSections.map((sectionGroup) => (
        <SectionsWrapper sectionGroup={sectionGroup} key={sectionGroup.id} />
      ))}
    </Box>
  );
};

export default Sections;
