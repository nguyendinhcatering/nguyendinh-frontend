import React from "react";
import Card from "../ui/Card";
import PresetCard from "./PresetCard";

const PresetOrderMenu = ({ foodPresets, presetType }) => {
  return (
    <Card
      sx={{
        marginBottom: 5,
        marginTop: [5, 5, 0],
      }}
    >
      {foodPresets.map((foodPreset) => (
        <PresetCard preset={foodPreset} presetType={presetType} />
      ))}
    </Card>
  );
};

export default PresetOrderMenu;
