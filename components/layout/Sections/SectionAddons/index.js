import React from "react";
import ContactUsForm from "./ContactUsForm";
import ContactUsButton from "./ContactUsButton";
import DownloadMenuButton from "./DownloadMenuButton";

const DICTIONARY = {
  contactUsForm: ContactUsForm,
  contactUsButton: ContactUsButton,
  downloadMenuButton: DownloadMenuButton,
};

const DefaultSectionAddon = ({ addon }) => {
  return <div>{JSON.stringify(addon)}</div>;
};

const SectionAddon = ({ addon }) => {
  const Component = DICTIONARY[addon.type] || DefaultSectionAddon;

  return <Component data={addon?.data || {}} />;
};

export default SectionAddon;
