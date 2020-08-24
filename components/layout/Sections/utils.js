import { isEmpty, cloneDeep, isNil } from "lodash";
class MasterSection {
  sections = [];
  type = "full";

  changeType(newType) {
    this.type = type;
  }

  addSection(section) {
    this.sections.push(section);
  }
}

const preprocessSection = (section) => {
  if (!["left", "right"].includes(section.mediaPlacement)) {
    section.offsetMedia = false;
  }

  if (["top"].includes(section.mediaPlacement)) {
    section.isFullWidth = false;
  }

  return section;
};

const preprocessSections = (sections) => {
  sections.forEach((section, index) => {
    if (
      index - 1 >= 0 &&
      !isNil(sections[index - 1].isFullWidth) &&
      !isNil(section.isFullWidth) &&
      section.isFullWidth !== sections[index - 1].isFullWidth
    ) {
      section.isFullWidth = sections[index - 1].isFullWidth;
      if (!section.isFullWidth) {
        section.offsetMedia = false;
      }
    }
  });

  return sections;
};

const splitByBreak = (sections) => {
  const splittedSections = [];
  let currentSections = [];

  sections.forEach((section) => {
    if (section.type === "SECTION_BREAK") {
      if (!isEmpty(currentSections)) {
        splittedSections.push(currentSections);
        currentSections = [];
      }
    } else {
      currentSections.push(section);
    }
  });

  if (!isEmpty(currentSections)) {
    splittedSections.push(currentSections);
  }

  return splittedSections;
};

export const splitSections = (sections) => {
  return splitByBreak(
    preprocessSections(cloneDeep(sections).map(preprocessSection))
  ).map((sectionGroup) => ({
    id: sectionGroup[0].id,
    isFullWidth: sectionGroup[0].isFullWidth,
    offsetMedia: sectionGroup[0].offsetMedia,
    offsetDirection:
      ["left", "right"].includes(sectionGroup[0].mediaPlacement) &&
      sectionGroup[0].mediaPlacement,
    sections: sectionGroup,
  }));
};

export const getWysiwygOverrides = (section) => {
  const headingOverrides = {
    color: getColor(section.headerColor),
  };

  const paragraphOverrides = {
    color: getColor(section.textColor),
  };

  return {
    heading: headingOverrides,
    paragraph: paragraphOverrides,
  };
};

const getColor = (color) => {
  if (!color) return undefined;
  return color === "primary" ? "red.6" : color;
};
