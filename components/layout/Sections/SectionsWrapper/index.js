import React from "react";
import { Box } from "theme-ui";
import FullWidthWrapper from "./FullWidthWrapper";
import PartialWrapper from "./PartialWrapper";

const SectionsWrapper = ({ sectionGroup }) => {
  return (
    <Box>
      {sectionGroup.isFullWidth ? (
        <FullWidthWrapper
          sections={sectionGroup.sections}
          offsetMedia={sectionGroup.offsetMedia}
          offsetDirection={sectionGroup.offsetDirection}
        />
      ) : (
        <PartialWrapper sections={sectionGroup.sections} />
      )}
    </Box>
  );
};

export default SectionsWrapper;
