import React, { useContext } from "react";
import { Box } from "theme-ui";
import GoogleMapReact from "google-map-react";
import { SiteDataContext } from "./SiteDataContext";

const shape = {
  coords: [0, 0, 100, 100],
  type: "rect",
};

const Map = ({
  defaultCenter = { lat: 21.0288012, lng: 105.7983287 },
  defaultZoom = 12,
}) => {
  const siteData = useContext(SiteDataContext);

  const apiKey = siteData?.googleMapApiKey;

  const renderMarkers = (map, maps) => {
    siteData.mapOptions.map((marker) => {
      let googleMarker = new maps.Marker({
        position: { lat: marker.latitude, lng: marker.longitude },
        map,
        // label: marker.name,
        animation: maps.Animation.DROP,
        shape,
        icon: maps,
      });

      const infoWindow = new maps.InfoWindow({
        content: `<div style="text-align: center;"><b>${marker.name}</b><br/><p>${marker.description}</p></div>`,
        position: { lat: marker.latitude, lng: marker.longitude },
      });

      googleMarker.addListener("click", () => {
        infoWindow.open(map, googleMarker);
      });

      return googleMarker;
    });
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={
          apiKey
            ? { key: apiKey, language: "vi" }
            : { undefined, language: "vi" }
        }
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      />
    </Box>
  );
};

export default Map;
