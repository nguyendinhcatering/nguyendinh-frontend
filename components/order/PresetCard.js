import React from "react";
import PresetCardHeader from "./PresetCardHeader";
import { flatten } from "lodash";
import { selectPreset } from "../../store/order/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import PresetCardBody from "./PresetCardBody";

const PresetCard = ({ preset, presetType }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOrder = (e) => {
    dispatch(
      selectPreset({
        meta: {
          presetName: preset.name,
          presetPrice: preset.priceOverride,
          presetType: {
            name: presetType.name,
            numberOfPeople: presetType.numberOfPeople,
            type: presetType.type,
          },
          url: router.asPath.replace(/\?.*/g, ""),
          unit: presetType.unit,
        },
        presetItems: preset.foodMenuItems,
      })
    );
  };

  return (
    <React.Fragment>
      <PresetCardHeader
        preset={preset}
        presetType={presetType}
        onOrder={handleOrder}
      />
      <PresetCardBody preset={preset} />
    </React.Fragment>
  );
};

export default PresetCard;
