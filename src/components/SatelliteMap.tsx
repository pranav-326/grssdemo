"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MapLibreMap } from "maplibre-gl";

interface SatelliteMapProps {
  scrollProgress: number; // 0 to 1
  isInteractive: boolean;
  spectralMode: "rgb" | "ndvi" | "sar" | "thermal";
  onProgressChange?: (progress: number) => void;
}

// Camera keyframe coordinates:
// 0.0 -> Space / Subcontinent View
// 0.5 -> Karnataka Agro-Zone (Atmosphere)
// 1.0 -> Srirangapatna / Mysuru Agricultural Fields (Ground 3D view)
const KEYFRAMES = {
  space: {
    center: [78.9629, 20.5937] as [number, number],
    zoom: 2.6,
    pitch: 0,
    bearing: 0,
  },
  atmosphere: {
    center: [76.85, 12.8] as [number, number],
    zoom: 9.2,
    pitch: 45,
    bearing: -15,
  },
  ground: {
    center: [76.6433, 12.4042] as [number, number], // Srirangapatna Cauvery Ag-Belt
    zoom: 16.6,
    pitch: 66,
    bearing: 32,
  },
};

// Linear interpolation helper
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

// Easing function for smoother camera transitions
function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export const SatelliteMap: React.FC<SatelliteMapProps> = ({
  scrollProgress,
  isInteractive,
  spectralMode,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const isLoadedRef = useRef<boolean>(false);
  const [mapReady, setMapReady] = useState<boolean>(false);

  // Initialize MapLibre GL instance
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Enable high parallel downloads for raster tiles on mobile connections
    if (typeof maplibregl.setMaxParallelImageRequests === "function") {
      maplibregl.setMaxParallelImageRequests(32);
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          "esri-imagery": {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
            tileSize: 256,
            attribution: "Esri, Maxar, Earthstar Geographics",
          },
        },
        layers: [
          {
            id: "esri-layer",
            type: "raster",
            source: "esri-imagery",
            minzoom: 0,
            maxzoom: 20,
          },
        ],
      },
      center: KEYFRAMES.space.center,
      zoom: KEYFRAMES.space.zoom,
      pitch: KEYFRAMES.space.pitch,
      bearing: KEYFRAMES.space.bearing,
      interactive: isInteractive,
      attributionControl: false,
      renderWorldCopies: true,
      fadeDuration: 0, // Instant tile display without 300ms transition lag
    });

    map.on("load", () => {
      isLoadedRef.current = true;
      setMapReady(true);

      // Add a subtle agro-boundary highlight polygon around the Mysuru target fields
      map.addSource("agri-target-poly", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                name: "Mysuru Agri-Zone Precision Belt",
                crop: "Sugarcane / Paddy",
              },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [76.638, 12.408],
                    [76.649, 12.408],
                    [76.652, 12.399],
                    [76.639, 12.399],
                    [76.638, 12.408],
                  ],
                ],
              },
            },
          ],
        },
      });

      // Target field border line
      map.addLayer({
        id: "agri-target-line",
        type: "line",
        source: "agri-target-poly",
        paint: {
          "line-color": "#adc178",
          "line-width": 1.5,
          "line-dasharray": [3, 2],
        },
      });

      // Target field fill
      map.addLayer({
        id: "agri-target-fill",
        type: "fill",
        source: "agri-target-poly",
        paint: {
          "fill-color": "#adc178",
          "fill-opacity": 0.14,
        },
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map interactivity (pointer events / pan-zoom controls)
  useEffect(() => {
    if (!mapRef.current) return;
    if (isInteractive) {
      mapRef.current.boxZoom.enable();
      mapRef.current.scrollZoom.enable();
      mapRef.current.dragPan.enable();
      mapRef.current.dragRotate.enable();
      mapRef.current.keyboard.enable();
      mapRef.current.doubleClickZoom.enable();
      mapRef.current.touchZoomRotate.enable();
    } else {
      mapRef.current.boxZoom.disable();
      mapRef.current.scrollZoom.disable();
      mapRef.current.dragPan.disable();
      mapRef.current.dragRotate.disable();
      mapRef.current.keyboard.disable();
      mapRef.current.doubleClickZoom.disable();
      mapRef.current.touchZoomRotate.disable();
    }
  }, [isInteractive]);

  // Scrub camera based on scrollProgress
  useEffect(() => {
    if (!mapRef.current || !isLoadedRef.current || isInteractive) return;

    const p = Math.max(0, Math.min(1, scrollProgress));
    let centerLng: number, centerLat: number, zoom: number, pitch: number, bearing: number;

    if (p <= 0.5) {
      // Stage 1: Space -> Atmosphere (0% to 50%)
      const t = easeInOutQuad(p / 0.5);
      centerLng = lerp(KEYFRAMES.space.center[0], KEYFRAMES.atmosphere.center[0], t);
      centerLat = lerp(KEYFRAMES.space.center[1], KEYFRAMES.atmosphere.center[1], t);
      zoom = lerp(KEYFRAMES.space.zoom, KEYFRAMES.atmosphere.zoom, t);
      pitch = lerp(KEYFRAMES.space.pitch, KEYFRAMES.atmosphere.pitch, t);
      bearing = lerp(KEYFRAMES.space.bearing, KEYFRAMES.atmosphere.bearing, t);
    } else {
      // Stage 2: Atmosphere -> Mysuru Agri Fields (50% to 100%)
      const t = easeInOutQuad((p - 0.5) / 0.5);
      centerLng = lerp(KEYFRAMES.atmosphere.center[0], KEYFRAMES.ground.center[0], t);
      centerLat = lerp(KEYFRAMES.atmosphere.center[1], KEYFRAMES.ground.center[1], t);
      zoom = lerp(KEYFRAMES.atmosphere.zoom, KEYFRAMES.ground.zoom, t);
      pitch = lerp(KEYFRAMES.atmosphere.pitch, KEYFRAMES.ground.pitch, t);
      bearing = lerp(KEYFRAMES.atmosphere.bearing, KEYFRAMES.ground.bearing, t);
    }

    mapRef.current.jumpTo({
      center: [centerLng, centerLat],
      zoom,
      pitch,
      bearing,
    });
  }, [scrollProgress, isInteractive]);

  // Get CSS filter based on selected spectral mode
  const getFilterStyle = () => {
    switch (spectralMode) {
      case "ndvi":
        // High contrast green false-color simulation
        return "contrast(175%) saturate(260%) hue-rotate(50deg) brightness(105%)";
      case "sar":
        // Monochrome microwave radar backscatter
        return "grayscale(100%) contrast(220%) brightness(85%)";
      case "thermal":
        // High thermal gradient simulation
        return "contrast(200%) saturate(300%) hue-rotate(180deg) invert(15%)";
      case "rgb":
      default:
        return "none";
    }
  };

  return (
    <div
      className={`fixed inset-0 z-0 bg-earth-950 transition-[filter] duration-500 ${
        isInteractive ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ filter: getFilterStyle() }}
    >
      {/* Instant orbital atmosphere glow before WebGL tiles arrive */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          mapReady ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(35, 30, 25, 0.7) 0%, rgba(13, 11, 9, 0.95) 70%, #0d0b09 100%)"
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-copper/30 animate-pulse-slow" />
          <span className="text-[10px] font-mono text-tea tracking-widest uppercase mt-4">
            Earth Observation Feed Initializing...
          </span>
        </div>
      </div>

      <div 
        ref={mapContainerRef} 
        className={`w-full h-full transition-opacity duration-500 ${
          mapReady ? "opacity-100" : "opacity-0"
        }`} 
      />
    </div>
  );
};
