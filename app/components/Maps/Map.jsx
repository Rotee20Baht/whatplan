'use client';

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";

import { useState, useMemo, useCallback, useRef } from "react";

export default function Map() {
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }),[]);
  const options = useMemo(() => ({
      disableDefaultUI: true,
      clickableIcons: false,
  }), []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  console.log('Map rendered')

  return (
    <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="w-full h-full"
          options={options}
          onLoad={onLoad}
    >
    </GoogleMap>
  );
}