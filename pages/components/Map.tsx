import React, { useRef, useEffect, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../../styles/Map.module.css";
import { Stop } from "..";
import Marker from "./Marker";

type MapProps = {
  stops: Stop[];
  currentStopIndex: number;
};

export default function Map({ stops, currentStopIndex }: MapProps) {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const mapCenter = [-73.956609, 40.71681];
  const currentStop = stops[currentStopIndex] || null;
  const currentStopLongLat = useMemo(
    () => currentStop?.latLong?.toReversed(),
    [currentStop]
  );
  const [zoom] = useState(14);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!map.current) {
      mapboxgl.accessToken = mapboxToken;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/annawang7/clx7zlsds08xq01nxge7ud4oh",
        center: mapCenter,
        zoom: zoom,
      });
      map.current.scrollZoom.disable();
    }

    // Function to create or update markers
    const updateMarkers = () => {
      // Remove existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Add new markers
      stops.forEach((stop, index) => {
        const markerContainer = document.createElement("div");
        const root = createRoot(markerContainer);
        root.render(
          <Marker index={index} isCurrentStop={index === currentStopIndex} />
        );

        const marker = new mapboxgl.Marker({ element: markerContainer })
          .setLngLat(stop.latLong.toReversed())
          .addTo(map.current);

        markersRef.current.push(marker);
      });
    };

    // Initial creation of markers
    updateMarkers();

    // Fly to current stop if it exists
    if (map.current && currentStop) {
      const currentStopLongLat = currentStop.latLong.toReversed();
      map.current.flyTo({
        center: currentStopLongLat,
        essential: true,
        duration: 1000,
        easing: (t) => t,
      });
    }
  }, [stops, currentStopIndex, mapboxToken, zoom]);

  return <div ref={mapContainer} className={styles.mapContainer} />;
}
