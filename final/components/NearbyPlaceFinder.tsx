"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  nearbyPlaceMockData,
  testRegions,
  type NearbyPlace,
  type TestPlaceType,
  type TestRegionId,
} from "@/lib/location-place-data";

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

const mapWidth = 325;
const mapHeight = 168;
const tileSize = 256;
const minZoom = 13;
const maxZoom = 16;

const typeLabels: Record<TestPlaceType | "all", string> = {
  all: "전체",
  hospital: "병원",
  pharmacy: "약국",
};

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

function getTiles(center: MapCenter, zoom: number): Tile[] {
  const centerPoint = lngLatToPoint(center, zoom);
  const startX = centerPoint.x - mapWidth / 2;
  const startY = centerPoint.y - mapHeight / 2;
  const firstTileX = Math.floor(startX / tileSize);
  const firstTileY = Math.floor(startY / tileSize);
  const lastTileX = Math.floor((startX + mapWidth) / tileSize);
  const lastTileY = Math.floor((startY + mapHeight) / tileSize);
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

function projectMarker(place: NearbyPlace, center: MapCenter, zoom: number) {
  const centerPoint = lngLatToPoint(center, zoom);
  const placePoint = lngLatToPoint({ lat: place.lat, lng: place.lng }, zoom);
  return {
    left: Math.round(mapWidth / 2 + placePoint.x - centerPoint.x),
    top: Math.round(mapHeight / 2 + placePoint.y - centerPoint.y),
  };
}

function MapMarker({
  place,
  center,
  zoom,
}: {
  place: NearbyPlace;
  center: MapCenter;
  zoom: number;
}) {
  const position = projectMarker(place, center, zoom);
  const isHospital = place.type === "hospital";

  return (
    <span
      className={`absolute grid h-7 w-7 place-items-center rounded-[14px] border-2 border-white text-[10px] font-bold leading-none text-white shadow-[0_3px_8px_rgba(17,24,39,0.18)] ${
        isHospital ? "bg-[#2f70ff]" : "bg-[#00a866]"
      }`}
      style={{ left: position.left - 14, top: position.top - 28 }}
      aria-label={`${place.name} 지도 마커`}
    >
      {isHospital ? "H" : "P"}
    </span>
  );
}

function InteractiveMap({
  center,
  places,
  zoom,
  onCenterChange,
  onZoomChange,
}: {
  center: MapCenter;
  places: NearbyPlace[];
  zoom: number;
  onCenterChange: (center: MapCenter) => void;
  onZoomChange: (zoom: number) => void;
}) {
  const dragRef = useRef<{
    x: number;
    y: number;
    centerPoint: { x: number; y: number };
  } | null>(null);
  const tiles = useMemo(() => getTiles(center, zoom), [center, zoom]);

  const panBy = (deltaX: number, deltaY: number) => {
    const point = lngLatToPoint(center, zoom);
    onCenterChange(pointToLngLat({ x: point.x + deltaX, y: point.y + deltaY }, zoom));
  };

  return (
    <div
      className="relative mt-3 h-[168px] overflow-hidden rounded-[14px] bg-[#eef5ff] touch-none"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = {
          x: event.clientX,
          y: event.clientY,
          centerPoint: lngLatToPoint(center, zoom),
        };
      }}
      onPointerMove={(event) => {
        if (!dragRef.current) return;
        const deltaX = event.clientX - dragRef.current.x;
        const deltaY = event.clientY - dragRef.current.y;
        onCenterChange(
          pointToLngLat(
            {
              x: dragRef.current.centerPoint.x - deltaX,
              y: dragRef.current.centerPoint.y - deltaY,
            },
            zoom,
          ),
        );
      }}
      onPointerUp={() => {
        dragRef.current = null;
      }}
      onPointerCancel={() => {
        dragRef.current = null;
      }}
      role="application"
      aria-label="주변 병원과 약국 지도"
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
      {places.map((place) => (
        <MapMarker key={place.id} place={place} center={center} zoom={zoom} />
      ))}
      <div className="absolute left-3 top-3 rounded-[12px] bg-white px-3 py-2 shadow-[0_4px_12px_rgba(17,24,39,0.12)]">
        <p className="text-[10px] font-bold leading-[14px] text-[#111827]">
          실제 지도 타일
        </p>
        <p className="text-[9px] font-medium leading-3 text-[#6b7280]">
          드래그로 이동
        </p>
      </div>
      <div className="absolute bottom-3 right-3 grid grid-cols-3 overflow-hidden rounded-[10px] bg-white shadow-[0_4px_12px_rgba(17,24,39,0.12)]">
        <button
          type="button"
          aria-label="지도 왼쪽 이동"
          onClick={() => panBy(-80, 0)}
          className="grid h-8 w-8 place-items-center text-[14px] font-bold text-[#4b5563]"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="지도 확대"
          onClick={() => onZoomChange(Math.min(maxZoom, zoom + 1))}
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
        <button
          type="button"
          aria-label="지도 위로 이동"
          onClick={() => panBy(0, -80)}
          className="grid h-8 w-8 place-items-center border-t border-[#eef2f7] text-[14px] font-bold text-[#4b5563]"
        >
          ↑
        </button>
        <button
          type="button"
          aria-label="지도 축소"
          onClick={() => onZoomChange(Math.max(minZoom, zoom - 1))}
          className="grid h-8 w-8 place-items-center border-l border-t border-[#eef2f7] text-[16px] font-bold text-[#4b5563]"
        >
          -
        </button>
        <button
          type="button"
          aria-label="지도 아래로 이동"
          onClick={() => panBy(0, 80)}
          className="grid h-8 w-8 place-items-center border-l border-t border-[#eef2f7] text-[14px] font-bold text-[#4b5563]"
        >
          ↓
        </button>
      </div>
      <p className="absolute bottom-1 left-2 text-[8px] font-medium leading-[10px] text-[#4b5563]">
        © OpenStreetMap
      </p>
    </div>
  );
}

export function NearbyPlaceFinder() {
  const [selectedRegion, setSelectedRegion] = useState<TestRegionId>("seoul");
  const [selectedType, setSelectedType] = useState<TestPlaceType | "all">("all");
  const [zoom, setZoom] = useState(15);

  const selectedRegionInfo = testRegions.find((region) => region.id === selectedRegion) ?? testRegions[0];
  const [mapCenter, setMapCenter] = useState<MapCenter>(selectedRegionInfo.center);

  const places = useMemo(() => {
    return nearbyPlaceMockData
      .filter((place) => place.region === selectedRegion)
      .filter((place) => selectedType === "all" || place.type === selectedType)
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
  }, [selectedRegion, selectedType]);

  useEffect(() => {
    setMapCenter(selectedRegionInfo.center);
  }, [selectedRegionInfo.center]);

  const handleLocationSearch = () => {
    if (!("geolocation" in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {},
      { enableHighAccuracy: false, maximumAge: 60000, timeout: 5000 },
    );
  };

  return (
    <section className="mx-[22px] mt-[10px] w-[349px]" aria-label="주변 병원 및 약국 찾기">
      <div className="rounded-[14px] border border-[#d7e3ff] bg-white p-3 shadow-[0_6px_18px_rgba(47,112,255,0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-bold leading-5 text-[#111827]">
              주변 병원·약국 찾기
            </h2>
            <p className="mt-1 text-[10px] font-medium leading-[14px] text-[#6b7280]">
              mock 데이터 기준으로 표시됩니다
            </p>
          </div>
          <button
            type="button"
            onClick={handleLocationSearch}
            className="h-8 rounded-[16px] bg-[#2f70ff] px-3 text-[11px] font-bold leading-4 text-white"
          >
            현재 위치
          </button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {testRegions.map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={() => setSelectedRegion(region.id)}
              className={`h-8 rounded-[16px] text-[11px] font-semibold leading-4 ${
                selectedRegion === region.id
                  ? "bg-[#eff6ff] text-[#2f70ff]"
                  : "bg-[#f3f4f7] text-[#6b7280]"
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          {(["all", "hospital", "pharmacy"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`h-8 rounded-[16px] px-3 text-[11px] font-semibold leading-4 ${
                selectedType === type
                  ? "bg-[#2f70ff] text-white"
                  : "border border-[#dce3ee] bg-white text-[#111827]"
              }`}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>

        <InteractiveMap
          center={mapCenter}
          places={places}
          zoom={zoom}
          onCenterChange={setMapCenter}
          onZoomChange={setZoom}
        />
      </div>
    </section>
  );
}
