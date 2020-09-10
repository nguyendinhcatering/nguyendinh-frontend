import React from "react";
import { Box } from "theme-ui";
import { chunk } from "lodash";
import cn from "classnames";
import Section from "../Section";
import Card from "../../../ui/Card";

const getWidth = (sections) => {
  // if (sections.length === 1) {
  //   return 100;
  // }

  const sectionsPerLine = 3;

  return (100 - 10) / sectionsPerLine;
};

const PartialWrapper = ({layout, sections }) => {
  const binnedSections = chunk(sections, 3);

  return (
    <>
      {binnedSections.map((binned, index) => {
        return (
          <Box
            className={cn(
              "flex flex-col md:flex-row w-full flex-wrap",
              binned.length === 3 ? "justify-between" : "justify-around"
            )}
            key={index}
          >
            {binned.map((section) => (
              <Card
                className="important:mb-5"
                sx={{ width: ["100%", "100%", `${getWidth(sections)}%`] }}
                key={section.id}
              >
                <Section layout={layout} section={section} key={section.id} />
              </Card>
            ))}
          </Box>
        );
      })}
    </>
  );
};

export default PartialWrapper;
