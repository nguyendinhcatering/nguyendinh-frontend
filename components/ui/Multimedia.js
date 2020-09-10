/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, Embed } from "theme-ui";
import Image from "./Image";
import Map from "./Map";
import API from "../../utils/api";

const ImageComponent = ({layout, medium, ...props }) => {
  if (!medium.image) {
    return null;
  }
  return <Image image={medium.image} {...props} />;
};

const VideoComponent = ({layout, medium, ...props }) => {
  if (!medium.embeddedMedia) {
    return null;
  }

  return (
    <Embed
      src={medium.embeddedMedia}
      sx={{ height: "full", paddingBottom: "unset" }}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      {...props}
    />
  );
};

const MapComponent = ({layout, medium, ...props }) => {
  return (
      <Map layout={layout}
      />
  );
};

const COMPONENTS = {
  image: ImageComponent,
  video: VideoComponent,
  map: MapComponent,
};

const Multimedia = ({layout, medium, typeProps, ...props }) => {
  const [type, setType] = useState("image");
  const [typeSpecificProps, setTypeSpecificProps] = useState({
    image: {},
    video: {},
    map: {},
  });

  const getMediumType = () => {
    if (medium.type) {
      return medium.type;
    }

    if (medium.image) {
      return "image";
    }

    if (medium.embeddedMedia) {
      return "video";
    }
  };

  useEffect(() => {
    setType(getMediumType());
  }, []);

  useEffect(() => {
    setTypeSpecificProps({ ...typeSpecificProps, ...typeProps });
  }, [typeProps]);

  const Component = COMPONENTS[type];

  if (!Component || !medium) {
    return null;
  }

  return <Component layout={layout} medium={medium} {...props} {...typeSpecificProps[type]} />;
};

export default Multimedia;
