import React, { FC, useRef, useEffect, useState } from "react";
import styles from "../../styles/Map.module.css";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Stop } from "..";

type MapProps = {
  stops: Stop[];
  currentStopIndex: number;
};

export default function Map({ stops, currentStopIndex }: MapProps) {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const [lng, setLng] = useState(-73.956609);
  const [lat, setLat] = useState(40.71681);
  const mapCenter = [-73.956609, 40.71681];
  const [zoom, setZoom] = useState(14);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/annawang7/clx7zlsds08xq01nxge7ud4oh",
      center: mapCenter,
      zoom: zoom,
    });

    // Create a default Marker and add it to the map.
    stops.map((stop) => {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(stop.latLong.reverse())
        .addTo(map.current);

      return marker;
    });
  }, []);

  return <div ref={mapContainer} className={styles.mapContainer} />;
}
