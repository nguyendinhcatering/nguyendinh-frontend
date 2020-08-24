import React from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => {
  return <div>{text}</div>;
};

var shape = {
  coords: [0, 0, 100, 100],
  type: "rect",
};

const Map = ({
  defaultCenter = { lat: 21.0288012, lng: 105.7983287 },
  defaultZoom = 15,
  markers = [
    {
      lat: 21.0288012,
      lng: 105.7983287,
      text: "Trụ sở Nguyên Đình",
    },
  ],
}) => {
  const apiKey =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
      : undefined;

  const renderMarkers = (map, maps) => {
    markers.map((marker) => {
      const image = {
        url:
          "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless2.png",
        // This marker is 20 pixels wide by 32 pixels high.
        // size: new maps.Size(100, 100),
        // The origin for this image is (0, 0).
        origin: new maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new maps.Point(0, 32),
        labelOrigin: new maps.Point(0, 50),
      };
      let m = new maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map,
        label: marker.text,
        animation: maps.Animation.DROP,
        shape: shape,
        icon: maps,
      });

      const inforWindow = new maps.InfoWindow({
        content: "Test",
        position: { lat: marker.lat, lng: marker.lng },
      });

      m.addListener("click", () => {
        inforWindow.open(map, m);
      });

      return m;
    });
  };

  return (
    <div style={{ height: "500px", width: "500px" }}>
      <GoogleMapReact
        bootstrapURLKeys={apiKey ? { key: apiKey } : undefined}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >
        {/*{markers.map((marker) => (*/}
        {/*  <Marker lat={marker.lat} lng={marker.lng} text={marker.text} />*/}
        {/*))}*/}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
