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

type NearbyPlaceFinderProps = {
  onUserLocationResolved?: (center: MapCenter) => void;
};

type Tile = {
  key: string;
  src: string;
  left: number;
  top: number;
};

const mapWidth = 390;
const mapHeight = 331;
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

function getDistanceMeters(from: MapCenter, to: MapCenter) {
  const earthRadius = 6371000;
  const latDelta = ((to.lat - from.lat) * Math.PI) / 180;
  const lngDelta = ((to.lng - from.lng) * Math.PI) / 180;
  const fromLat = (from.lat * Math.PI) / 180;
  const toLat = (to.lat * Math.PI) / 180;
  const value =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.cos(fromLat) *
      Math.cos(toLat) *
      Math.sin(lngDelta / 2) *
      Math.sin(lngDelta / 2);
  return Math.round(earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value)));
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
  const activePointersRef = useRef(new Map<number, { x: number; y: number }>());
  const dragRef = useRef<{
    x: number;
    y: number;
    centerPoint: { x: number; y: number };
  } | null>(null);
  const pinchRef = useRef<{
    distance: number;
    zoom: number;
  } | null>(null);
  const tiles = useMemo(() => getTiles(center, zoom), [center, zoom]);

  const getPinchDistance = () => {
    const pointers = Array.from(activePointersRef.current.values());
    if (pointers.length < 2) return 0;
    const deltaX = pointers[0].x - pointers[1].x;
    const deltaY = pointers[0].y - pointers[1].y;
    return Math.round(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
  };

  const clearPointer = (pointerId: number) => {
    activePointersRef.current.delete(pointerId);
    pinchRef.current = null;
    dragRef.current = null;
  };

  return (
    <div
      className="relative h-[331px] w-full overflow-hidden bg-[#eef5ff] touch-none"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        activePointersRef.current.set(event.pointerId, {
          x: event.clientX,
          y: event.clientY,
        });

        if (activePointersRef.current.size === 2) {
          pinchRef.current = {
            distance: getPinchDistance(),
            zoom,
          };
          dragRef.current = null;
          return;
        }

        if (activePointersRef.current.size === 1) {
          dragRef.current = {
            x: event.clientX,
            y: event.clientY,
            centerPoint: lngLatToPoint(center, zoom),
          };
        }
      }}
      onPointerMove={(event) => {
        if (activePointersRef.current.has(event.pointerId)) {
          activePointersRef.current.set(event.pointerId, {
            x: event.clientX,
            y: event.clientY,
          });
        }

        if (activePointersRef.current.size >= 2 && pinchRef.current) {
          const distance = getPinchDistance();
          const zoomDelta = Math.round((distance - pinchRef.current.distance) / 80);
          const nextZoom = Math.max(minZoom, Math.min(maxZoom, pinchRef.current.zoom + zoomDelta));
          if (nextZoom !== zoom) onZoomChange(nextZoom);
          return;
        }

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
      onPointerUp={(event) => {
        clearPointer(event.pointerId);
      }}
      onPointerCancel={(event) => {
        clearPointer(event.pointerId);
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
      <p className="absolute bottom-1 left-2 text-[8px] font-medium leading-[10px] text-[#4b5563]">
        © OpenStreetMap
      </p>
    </div>
  );
}

export function NearbyPlaceFinder({ onUserLocationResolved }: NearbyPlaceFinderProps) {
  const [selectedRegion, setSelectedRegion] = useState<TestRegionId>("seoul");
  const [selectedType, setSelectedType] = useState<TestPlaceType | "all">("all");
  const [zoom, setZoom] = useState(15);
  const [isLocating, setIsLocating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [userLocation, setUserLocation] = useState<MapCenter | null>(null);

  const selectedRegionInfo = testRegions.find((region) => region.id === selectedRegion) ?? testRegions[0];
  const [mapCenter, setMapCenter] = useState<MapCenter>(selectedRegionInfo.center);

  const places = useMemo(() => {
    const filteredPlaces = nearbyPlaceMockData
      .filter((place) => place.region === selectedRegion)
      .filter((place) => selectedType === "all" || place.type === selectedType);

    if (!userLocation) {
      return filteredPlaces.sort((a, b) => a.distanceMeters - b.distanceMeters);
    }

    return filteredPlaces.sort(
      (a, b) =>
        getDistanceMeters(userLocation, { lat: a.lat, lng: a.lng }) -
        getDistanceMeters(userLocation, { lat: b.lat, lng: b.lng }),
    );
  }, [selectedRegion, selectedType, userLocation]);

  useEffect(() => {
    if (!userLocation) setMapCenter(selectedRegionInfo.center);
  }, [selectedRegionInfo.center, userLocation]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleLocationSearch = () => {
    if (!("geolocation" in navigator)) {
      setToastMessage("위치 권한을 허용하면 내 주변 병원을 볼 수 있습니다.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMapCenter(nextCenter);
        setUserLocation(nextCenter);
        onUserLocationResolved?.(nextCenter);
        setZoom(16);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setToastMessage("위치 권한을 허용하면 내 주변 병원을 볼 수 있습니다.");
      },
      { enableHighAccuracy: false, maximumAge: 60000, timeout: 5000 },
    );
  };

  return (
    <section className="relative h-[355px] w-full" aria-label="주변 병원 및 약국 찾기">
      <InteractiveMap
        center={mapCenter}
        places={places}
        zoom={zoom}
        onCenterChange={setMapCenter}
        onZoomChange={setZoom}
      />

      <div className="absolute left-[22px] top-[22px] flex gap-3">
          {(["all", "hospital", "pharmacy"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`h-8 rounded-[16px] text-[11px] font-semibold leading-4 shadow-[0_2px_8px_rgba(17,24,39,0.08)] ${
                type === "all" ? "w-11" : "w-[50px]"
              } ${
                selectedType === type
                  ? "bg-[#2f70ff] text-white"
                  : "bg-white text-[#111827]"
              }`}
            >
              {typeLabels[type]}
            </button>
          ))}
      </div>

      <button
        type="button"
        onClick={handleLocationSearch}
        disabled={isLocating}
        aria-label="현재 위치"
        className="absolute bottom-11 right-5 grid h-8 w-8 place-items-center rounded-[16px] bg-white text-[#111827] shadow-[0_3px_10px_rgba(17,24,39,0.18)] disabled:text-[#9ca3af]"
      >
        {isLocating ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#dce3ee] border-t-[#2f70ff]" />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 3v3M12 18v3M3 12h3M18 12h3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        )}
      </button>

      {toastMessage ? (
        <div className="absolute bottom-[86px] left-5 right-5 rounded-[10px] bg-[#111827] px-3 py-2 text-center text-[11px] font-medium leading-4 text-white shadow-[0_8px_18px_rgba(17,24,39,0.18)]">
          {toastMessage}
        </div>
      ) : null}

      <div className="absolute bottom-0 left-0 h-6 w-full rounded-t-[18px] bg-white">
        <div className="absolute left-1/2 top-2 h-1 w-12 -translate-x-1/2 rounded-sm bg-[#6b7280]" />
      </div>
    </section>
  );
}
