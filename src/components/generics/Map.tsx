"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center: [number, number];
  zoom: number;
  marker?: [number, number];
  markerText?: string;
  className?: string;
  onMapClick?: (coords: { latitude: number; longitude: number }) => void;
}

export default function Map({
  center,
  zoom,
  marker,
  markerText,
  className = "",
  onMapClick,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerInstance = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      mapRef.current &&
      !mapInstance.current
    ) {
      mapInstance.current = L.map(mapRef.current).setView(center, zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      if (onMapClick) {
        mapInstance.current.on("click", (e: L.LeafletMouseEvent) => {
          onMapClick({
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          });
        });
        if (mapRef.current) {
          mapRef.current.style.cursor = "pointer";
        }
      }

      if (marker) {
        markerInstance.current = L.marker(marker).addTo(mapInstance.current);
        if (markerText) {
          markerInstance.current.bindPopup(markerText);
        }
      }
    }

    if (mapInstance.current && marker) {
      if (markerInstance.current) {
        markerInstance.current.setLatLng(marker);
      } else {
        markerInstance.current = L.marker(marker).addTo(mapInstance.current);
        if (markerText) {
          markerInstance.current.bindPopup(markerText);
        }
      }
    }

    if (mapInstance.current) {
      mapInstance.current.setView(center, zoom);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerInstance.current = null;
      }
    };
  }, [center, zoom, marker, markerText, onMapClick]);

  return <div ref={mapRef} className={className} />;
}
