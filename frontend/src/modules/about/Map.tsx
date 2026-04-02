"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

type Location = {
  name: string;
  coords: [number, number];
};

const locations: Location[] = [
  {
    name: "Techstaunch",
    coords: [72.771, 21.1894],
  },
  {
    name: "Matheran",
    coords: [73.2707, 18.989],
  },
];

const Map = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN as string;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [72.771, 21.1894],
      zoom: 6,
    });

    mapRef.current = map;

    locations.forEach((loc) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(loc.name);
      new mapboxgl.Marker().setLngLat(loc.coords).setPopup(popup).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  const handleFlyTo = (coords: [number, number]) => {
    mapRef.current?.flyTo({
      center: coords,
      zoom: 12,
      essential: true,
    });
  };

  return (
    <div className="relative w-full h-100">
      <div ref={mapContainerRef} className="w-full h-100" />
      <div className="absolute top-0 left-0 h-full md:w-64 bg-white/90 backdrop-blur-md shadow-lg p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Locations</h2>
        <div className="space-y-2">
          {locations.map((loc, index) => (
            <div
              key={index}
              onClick={() => handleFlyTo(loc.coords)}
              className="cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition"
            >
              {loc.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
