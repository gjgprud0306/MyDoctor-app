"use client";

import { useMemo, useState } from "react";
import {
  nearbyPlaceMockData,
  testRegions,
  type NearbyPlace,
  type TestPlaceType,
  type TestRegionId,
} from "@/lib/location-place-data";

type PermissionState = "idle" | "granted" | "denied" | "failed";

const typeLabels: Record<TestPlaceType | "all", string> = {
  all: "전체",
  hospital: "병원",
  pharmacy: "약국",
};

function formatDistance(distanceMeters: number) {
  if (distanceMeters < 1000) return `${distanceMeters}m`;
  return `${Math.round(distanceMeters / 100) / 10}km`;
}

function MapMarker({
  place,
  index,
}: {
  place: NearbyPlace;
  index: number;
}) {
  const left = 54 + ((index * 57) % 218);
  const top = 34 + ((index * 41) % 86);
  const isHospital = place.type === "hospital";

  return (
    <span
      className={`absolute grid h-7 w-7 place-items-center rounded-[14px] border-2 border-white text-[10px] font-bold leading-none text-white shadow-[0_3px_8px_rgba(17,24,39,0.18)] ${
        isHospital ? "bg-[#2f70ff]" : "bg-[#00a866]"
      }`}
      style={{ left, top }}
      aria-label={`${place.name} 지도 마커`}
    >
      {isHospital ? "H" : "P"}
    </span>
  );
}

function PlaceRow({ place }: { place: NearbyPlace }) {
  const isHospital = place.type === "hospital";

  return (
    <li className="rounded-[12px] border border-[#e5eaf3] bg-white px-3 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-[8px] px-[6px] text-[9px] font-semibold leading-4 ${
                isHospital ? "bg-[#eff6ff] text-[#2f70ff]" : "bg-[#e8fff2] text-[#00a866]"
              }`}
            >
              {typeLabels[place.type]}
            </span>
            <span className="rounded-[8px] bg-[#f3f4f7] px-[6px] text-[9px] font-semibold leading-4 text-[#6b7280]">
              테스트용
            </span>
          </div>
          <h2 className="mt-2 truncate text-[13px] font-bold leading-[18px] text-[#111827]">
            {place.name}
          </h2>
          <p className="mt-1 text-[10px] font-medium leading-[14px] text-[#6b7280]">
            {place.department}
          </p>
          <p className="mt-1 truncate text-[10px] font-medium leading-[14px] text-[#6b7280]">
            {place.address}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <strong className="text-[12px] font-bold leading-4 text-[#1268ff]">
            {formatDistance(place.distanceMeters)}
          </strong>
          <p className={`mt-2 text-[10px] font-semibold leading-[14px] ${place.openNow ? "text-[#00a866]" : "text-[#9ca3af]"}`}>
            {place.openNow ? "운영 중" : "테스트 종료"}
          </p>
        </div>
      </div>
    </li>
  );
}

export function NearbyPlaceFinder() {
  const [selectedRegion, setSelectedRegion] = useState<TestRegionId>("seoul");
  const [selectedType, setSelectedType] = useState<TestPlaceType | "all">("all");
  const [permissionState, setPermissionState] = useState<PermissionState>("idle");
  const [zoom, setZoom] = useState(1);

  const selectedRegionInfo = testRegions.find((region) => region.id === selectedRegion) ?? testRegions[0];

  const places = useMemo(() => {
    return nearbyPlaceMockData
      .filter((place) => place.region === selectedRegion)
      .filter((place) => selectedType === "all" || place.type === selectedType)
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
  }, [selectedRegion, selectedType]);

  const handleLocationSearch = () => {
    if (!("geolocation" in navigator)) {
      setPermissionState("failed");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setPermissionState("granted");
      },
      () => {
        setPermissionState("denied");
      },
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

        <div className="relative mt-3 h-[168px] overflow-hidden rounded-[14px] bg-[#eef5ff]">
          <div className="absolute inset-0">
            <div
              className="h-full w-full bg-[linear-gradient(90deg,rgba(47,112,255,0.12)_1px,transparent_1px),linear-gradient(rgba(47,112,255,0.12)_1px,transparent_1px)] bg-[length:28px_28px]"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
          <div className="absolute left-3 top-3 rounded-[12px] bg-white px-3 py-2 shadow-[0_4px_12px_rgba(17,24,39,0.12)]">
            <p className="text-[10px] font-bold leading-[14px] text-[#111827]">
              {selectedRegionInfo.name} 중심
            </p>
            <p className="text-[9px] font-medium leading-3 text-[#6b7280]">
              {selectedRegionInfo.center.lat}, {selectedRegionInfo.center.lng}
            </p>
          </div>
          {places.map((place, index) => (
            <MapMarker key={place.id} place={place} index={index} />
          ))}
          <div className="absolute bottom-3 right-3 flex overflow-hidden rounded-[10px] bg-white shadow-[0_4px_12px_rgba(17,24,39,0.12)]">
            <button
              type="button"
              aria-label="지도 축소"
              onClick={() => setZoom((value) => Math.max(1, value - 1))}
              className="grid h-8 w-8 place-items-center text-[16px] font-bold text-[#4b5563]"
            >
              -
            </button>
            <button
              type="button"
              aria-label="지도 확대"
              onClick={() => setZoom((value) => Math.min(3, value + 1))}
              className="grid h-8 w-8 place-items-center border-l border-[#eef2f7] text-[16px] font-bold text-[#4b5563]"
            >
              +
            </button>
          </div>
        </div>

        <p className="mt-2 text-[10px] font-medium leading-[14px] text-[#6b7280]">
          {permissionState === "granted" && "위치 권한이 허용되었습니다. 테스트 데이터는 선택 지역 기준으로 표시됩니다."}
          {permissionState === "denied" && "위치 권한이 거부되어 선택 지역 기준으로 표시합니다."}
          {permissionState === "failed" && "현재 위치를 사용할 수 없어 선택 지역 기준으로 표시합니다."}
          {permissionState === "idle" && "검색 버튼을 눌러 위치 권한을 요청하거나 지역을 직접 선택하세요."}
        </p>

        {places.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-2">
            {places.map((place) => (
              <PlaceRow key={place.id} place={place} />
            ))}
          </ul>
        ) : (
          <div className="mt-3 rounded-[12px] bg-[#f9fafb] px-3 py-4 text-center text-[12px] font-semibold leading-4 text-[#6b7280]">
            테스트 결과가 없습니다
          </div>
        )}
      </div>
    </section>
  );
}
