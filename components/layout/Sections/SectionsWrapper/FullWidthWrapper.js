import React from "react";
import cn from "classnames";
import Section from "../Section";
import Card from "../../../ui/Card";

const FullWidthWrapper = ({layout, sections, offsetMedia, offsetDirection }) => {
  return (
    <Card
      className={cn(
        "important:mb-5",
        offsetMedia && "md:important:mt-5",
        offsetMedia && offsetDirection === "left" && "md:important:ml-5",
        offsetMedia && offsetDirection === "right" && "md:important:mr-5"
      )}
    >
      {sections.map((section) => (
        <Section layout={layout} section={section} key={section.id} />
      ))}
    </Card>
  );
};

export default FullWidthWrapper;
