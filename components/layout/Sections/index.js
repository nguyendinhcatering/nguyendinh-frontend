import React from "react";
import { Box } from "theme-ui";
import { splitSections } from "./utils";
import SectionsWrapper from "./SectionsWrapper";

const Sections = ({ sections }) => {
  const splittedSections = splitSections(sections);
  console.log(splittedSections);
  return (
    <Box className="flex flex-col">
      {splittedSections.map((sectionGroup) => (
        <SectionsWrapper sectionGroup={sectionGroup} key={sectionGroup.id} />
      ))}
    </Box>
  );
};

export default Sections;
