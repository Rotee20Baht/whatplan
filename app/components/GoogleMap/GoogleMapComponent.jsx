import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker, DirectionsRenderer } from "@react-google-maps/api";

function GoogleMapComponent(props) {
  const markers = props.data;

  const [activeMarker, setActiveMarker] = useState(null);
  const [directions, setDirections] = useState(null);

  const convertedLocation = markers?.map((data) => ({
    ...data,
    location: {
      lat: parseFloat(data.location.lat),
      lng: parseFloat(data.location.lng),
    },
  }));
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  useEffect(() => {
    if (convertedLocation && convertedLocation.length >= 2) {
      const waypoints = convertedLocation.slice(1, -1).map((marker) => ({ location: marker.location }));
      const origin = convertedLocation[0].location;
      const destination = convertedLocation[convertedLocation.length - 1].location;

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Error calculating directions:", status);
          }
        }
      );
    } else {
      setDirections(null); // Reset directions if there are not enough convertedLocation
    }
  }, [convertedLocation]);

  return (
    <GoogleMap
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={12} // Set your desired initial zoom level here
    >
      {directions && <DirectionsRenderer directions={directions} />}
      {convertedLocation &&
        convertedLocation.map(({ id, name, location }) => (
          <Marker
            key={id}
            position={location}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{name}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
    </GoogleMap>
  );
}

export default GoogleMapComponent;