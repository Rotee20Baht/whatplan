import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { GoogleMap, InfoWindow, Marker, DirectionsRenderer } from "@react-google-maps/api";

function GoogleMapComponent(props) {
  const markers = props.data || [];

  const [activeMarker, setActiveMarker] = useState([]);
  const [directions, setDirections] = useState(null);

  const handleActiveMarker = (marker) => {    
    setActiveMarker([...activeMarker, marker]);
  };

  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 13.7563309, lng: 100.5017651 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  // const convertedLocation = useMemo(() => {
  //     return markers?.map((data) => ({
  //       ...data,
  //       location: {
  //         lat: parseFloat(data.location.lat),
  //         lng: parseFloat(data.location.lng),
  //       },
  //     }))},
  //   [markers]
  // );

  // console.log(markers)
  // console.log(convertedLocation)

  useEffect(() => {
    if (markers?.length >= 2) {
      console.log("Re-Rendered")
      const waypoints = markers.slice(1, -1).map((marker) => ({ location: marker.location }));
      const origin = markers[0].location;
      const destination = markers[markers.length - 1].location;

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
            // console.log(result)
            setDirections(result);
          } else {
            console.error("Error calculating directions:", status);
          }
        }
      );
    } else {
      setDirections(null); // Reset directions if there are not enough convertedLocation
    }
  }, [markers]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={12} // Set your desired initial zoom level here
      center={center}
      onLoad={onLoad}
      options={options}
    >
      {markers &&
        markers.map(({ id, name, location }, index) => (
          <Marker
            key={id}
            position={location}
            onClick={() => handleActiveMarker(id)}
            onLoad={() => {
              setActiveMarker(prev => [...prev, id])
            }}
          >

            {/* <InfoWindow position={location} onCloseClick={() => setActiveMarker(null)} >
              <div>
                <div>{name}</div>
                <div>{id}</div>
              </div>
            </InfoWindow> */}

            {activeMarker?.includes(id) && (
              <InfoWindow onCloseClick={() => setActiveMarker(prev => prev.filter(_id => _id !== id))}>
                <div>{`${index+1}. ${name}`}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default GoogleMapComponent;