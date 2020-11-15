import React from "react";
import { Box, Styled, Button } from "theme-ui";
import ManualSection from "../layout/Sections/Section/subtypes/ManualSection";
import { formatNumber } from "../../utils/number";

const IMAGE_URL = "/images/defaultBackground.jpg";

const PresetCardHeader = ({ preset, presetType, onOrder }) => {
  return (
    <ManualSection>
      <Box
        sx={{
          width: "full",
          px: [4, 4, 5],
          py: [2, 2, 4],
          backgroundImage: `url(${IMAGE_URL})`,
          display: "flex",
          flexDirection: ["column", "column", "row"],
          color: "white",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/*Preset information*/}
        <Box>
          <Styled.h3>{preset.name}</Styled.h3>
          <Styled.h4>
            <span>{formatNumber(preset.priceOverride)}</span>
            <span> VNĐ/</span>
            <span>
              {" "}
              {presetType.unit}/ {presetType.numberOfPeople} người
            </span>
          </Styled.h4>
        </Box>
        {/*Spacer*/}
        <Box
          sx={{
            flexGrow: 1,
            minHeight: 4,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="primary"
            sx={{
              backgroundColor: "transparent",
              borderColor: "white",
              width: "100%",
            }}
            onClick={onOrder}
          >
            Đặt thực đơn này
          </Button>
        </Box>
      </Box>
    </ManualSection>
  );
};

export default PresetCardHeader;
