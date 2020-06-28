import React from "react";
import { Box } from "theme-ui";
import Section from "../Section";
import Card from "../../../ui/Card";

const getWidth = (sections) => {
  if (sections.length === 1) {
    return 100;
  }

  // const sectionsPerLine = sections.length > 3 ? 3 : sections.length;
  const sectionsPerLine = 3;

  return (100 - 10) / sectionsPerLine;
};

const PartialWrapper = ({ sections }) => {
  return (
    <Box className="flex flex-col md:flex-row w-full justify-between flex-wrap">
      {sections.map((section) => (
        <Card
          className="important:mb-5 "
          sx={{ width: ["100%", "100%", `${getWidth(sections)}%`] }}
          key={section.id}
        >
          <Section section={section} key={section.id} />
        </Card>
      ))}
    </Box>
  );
};

export default PartialWrapper;
