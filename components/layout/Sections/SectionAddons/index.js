import React from "react";
import { Styled } from "theme-ui";
import ContactUsForm from "./ContactUsForm";

const DICTIONARY = {
  contactUsForm: ContactUsForm,
};

const DefaultSectionAddon = ({ addon }) => {
  return <div>{JSON.stringify(addon)}</div>;
};

const SectionAddon = ({ addon }) => {
  const Component = DICTIONARY[addon.type] || DefaultSectionAddon;

  return <Component data={addon.data} />;
};

export default SectionAddon;
