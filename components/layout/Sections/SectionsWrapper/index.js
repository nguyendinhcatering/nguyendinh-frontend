import React from "react";
import { Box } from "theme-ui";
import FullWidthWrapper from "./FullWidthWrapper";
import PartialWrapper from "./PartialWrapper";

const SectionsWrapper = ({layout, sectionGroup }) => {
  return (
    <Box>
      {sectionGroup.isFullWidth ? (
        <FullWidthWrapper
            layout={layout}
          sections={sectionGroup.sections}
          offsetMedia={sectionGroup.offsetMedia}
          offsetDirection={sectionGroup.offsetDirection}
        />
      ) : (
        <PartialWrapper layout={layout} sections={sectionGroup.sections} />
      )}
    </Box>
  );
};

export default SectionsWrapper;
