"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type MapTileMarker = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  color?: "blue" | "green";
};

type MapCenter = {
  lat: number;
  lng: number;
};

type Tile = {
  key: string;
  src: string;
  left: number;
  top: number;
};

type OpenStreetMapViewProps = {
  center: MapCenter;
  markers: MapTileMarker[];
  width: number;
  height: number;
  zoom?: number;
  className?: string;
  ariaLabel: string;
  badgeText?: string;
  badgeTop?: number;
  showControls?: boolean;
};

const tileSize = 256;
const minZoom = 13;
const maxZoom = 16;

function lngLatToPoint(center: MapCenter, zoom: number) {
  const scale = tileSize * 2 ** zoom;
  const sinLat = Math.sin((center.lat * Math.PI) / 180);

  return {
    x: ((center.lng + 180) / 360) * scale,
    y:
      (0.5 -
        Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) *
      scale,
  };
}

function pointToLngLat(point: { x: number; y: number }, zoom: number): MapCenter {
  const scale = tileSize * 2 ** zoom;
  const lng = (point.x / scale) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * point.y) / scale;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));

  return { lat, lng };
}

function getTiles(center: MapCenter, zoom: number, width: number, height: number): Tile[] {
  const centerPoint = lngLatToPoint(center, zoom);
  const startX = centerPoint.x - width / 2;
  const startY = centerPoint.y - height / 2;
  const firstTileX = Math.floor(startX / tileSize);
  const firstTileY = Math.floor(startY / tileSize);
  const lastTileX = Math.floor((startX + width) / tileSize);
  const lastTileY = Math.floor((startY + height) / tileSize);
  const maxTile = 2 ** zoom;
  const tiles: Tile[] = [];

  for (let tileX = firstTileX; tileX <= lastTileX; tileX += 1) {
    for (let tileY = firstTileY; tileY <= lastTileY; tileY += 1) {
      if (tileY < 0 || tileY >= maxTile) continue;
      const wrappedX = ((tileX % maxTile) + maxTile) % maxTile;

      tiles.push({
        key: `${zoom}-${tileX}-${tileY}`,
        src: `https://tile.openstreetmap.org/${zoom}/${wrappedX}/${tileY}.png`,
        left: Math.round(tileX * tileSize - startX),
        top: Math.round(tileY * tileSize - startY),
      });
    }
  }

  return tiles;
}

function projectMarker(
  marker: MapTileMarker,
  center: MapCenter,
  zoom: number,
  width: number,
  height: number,
) {
  const centerPoint = lngLatToPoint(center, zoom);
  const markerPoint = lngLatToPoint({ lat: marker.lat, lng: marker.lng }, zoom);

  return {
    left: Math.round(width / 2 + markerPoint.x - centerPoint.x),
    top: Math.round(height / 2 + markerPoint.y - centerPoint.y),
  };
}

export function OpenStreetMapView({
  center,
  markers,
  width,
  height,
  zoom = 15,
  className = "",
  ariaLabel,
  badgeText,
  badgeTop = 28,
  showControls = true,
}: OpenStreetMapViewProps) {
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(zoom);
  const dragRef = useRef<{
    x: number;
    y: number;
    centerPoint: { x: number; y: number };
  } | null>(null);
  const tiles = useMemo(
    () => getTiles(mapCenter, mapZoom, width, height),
    [height, mapCenter, mapZoom, width],
  );

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  const panBy = (deltaX: number, deltaY: number) => {
    const point = lngLatToPoint(mapCenter, mapZoom);
    setMapCenter(pointToLngLat({ x: point.x + deltaX, y: point.y + deltaY }, mapZoom));
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#eef5ff] touch-none ${className}`}
      style={{ width, height }}
      role="application"
      aria-label={ariaLabel}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = {
          x: event.clientX,
          y: event.clientY,
          centerPoint: lngLatToPoint(mapCenter, mapZoom),
        };
      }}
      onPointerMove={(event) => {
        if (!dragRef.current) return;
        const deltaX = event.clientX - dragRef.current.x;
        const deltaY = event.clientY - dragRef.current.y;

        setMapCenter(
          pointToLngLat(
            {
              x: dragRef.current.centerPoint.x - deltaX,
              y: dragRef.current.centerPoint.y - deltaY,
            },
            mapZoom,
          ),
        );
      }}
      onPointerUp={() => {
        dragRef.current = null;
      }}
      onPointerCancel={() => {
        dragRef.current = null;
      }}
    >
      {tiles.map((tile) => (
        <img
          key={tile.key}
          src={tile.src}
          alt=""
          draggable={false}
          className="absolute h-64 w-64 select-none"
          style={{ left: tile.left, top: tile.top }}
        />
      ))}

      {markers.map((marker) => {
        const position = projectMarker(marker, mapCenter, mapZoom, width, height);

        return (
          <span
            key={marker.id}
            className={`absolute grid h-7 w-7 place-items-center rounded-[14px] border-2 border-white text-[10px] font-bold leading-none text-white shadow-[0_3px_8px_rgba(17,24,39,0.18)] ${
              marker.color === "green" ? "bg-[#00a866]" : "bg-[#2f70ff]"
            }`}
            style={{ left: position.left - 14, top: position.top - 28 }}
            aria-label={`${marker.label} 지도 마커`}
          >
            {marker.label}
          </span>
        );
      })}

      {badgeText ? (
        <div
          className="absolute left-[139px] rounded-[18px] bg-[#2f70ff] px-5 py-[9px] text-[12px] font-bold leading-[18px] text-white shadow-[0_4px_12px_rgba(47,112,255,0.28)]"
          style={{ top: badgeTop }}
        >
          {badgeText}
        </div>
      ) : null}

      {showControls ? (
        <div className="absolute bottom-3 right-3 flex overflow-hidden rounded-[10px] bg-white shadow-[0_4px_12px_rgba(17,24,39,0.12)]">
          <button
            type="button"
            aria-label="지도 축소"
            onClick={() => setMapZoom((value) => Math.max(minZoom, value - 1))}
            className="grid h-8 w-8 place-items-center text-[16px] font-bold text-[#4b5563]"
          >
            -
          </button>
          <button
            type="button"
            aria-label="지도 확대"
            onClick={() => setMapZoom((value) => Math.min(maxZoom, value + 1))}
            className="grid h-8 w-8 place-items-center border-l border-[#eef2f7] text-[16px] font-bold text-[#4b5563]"
          >
            +
          </button>
          <button
            type="button"
            aria-label="지도 오른쪽 이동"
            onClick={() => panBy(80, 0)}
            className="grid h-8 w-8 place-items-center border-l border-[#eef2f7] text-[14px] font-bold text-[#4b5563]"
          >
            →
          </button>
        </div>
      ) : null}

      <p className="absolute bottom-1 left-2 text-[8px] font-medium leading-[10px] text-[#4b5563]">
        © OpenStreetMap
      </p>
    </div>
  );
}
