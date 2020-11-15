import React from "react";
import ManualSection from "../layout/Sections/Section/subtypes/ManualSection";
import { Box, Styled } from "theme-ui";

const PresetCardBody = ({ preset }) => {
  return (
    <ManualSection>
      <Box
        sx={{
          px: [4, 4, 5],
          py: [2, 2, 4],
          mb: 2,
          display: "flex",
          flexDirection: ["column", "column", "row"],
        }}
      >
        {preset.sortedFoodItems.map((category) => (
          <Box sx={{ width: "full" }} key={category.id}>
            <Styled.h3>{category.name}</Styled.h3>
            {(category.foodItems || []).map((item) => (
              <Styled.p key={item.id}>{item.name}</Styled.p>
            ))}
          </Box>
        ))}
      </Box>
    </ManualSection>
  );
};

export default PresetCardBody;
