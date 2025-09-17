"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-container {
        z-index: 1 !important;
      }
      .leaflet-popup {
        z-index: 1000 !important;
      }
      .leaflet-top, .leaflet-bottom {
        z-index: 1000 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div className="leaflet-container-wrapper">{children}</div>;
}
