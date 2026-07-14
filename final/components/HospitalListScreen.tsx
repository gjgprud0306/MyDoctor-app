"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { IosStatusBar } from "@/components/IosStatusBar";
import { NearbyPlaceFinder } from "@/components/NearbyPlaceFinder";
import { trackEvent } from "@/lib/analytics";
import { hospitalList } from "@/lib/hospital-list-data";

type SortOption = "recommended" | "price" | "wait";

type MapCenter = {
  lat: number;
  lng: number;
};

const hospitalCoordinates: Record<string, MapCenter> = {
  "asan-immune-plus": { lat: 37.5002, lng: 127.0308 },
  "suwon-the-cell": { lat: 37.2664, lng: 127.0311 },
  "hangaon-oriental": { lat: 37.4919, lng: 127.0341 },
  "gangnam-bareun": { lat: 37.4986, lng: 127.0267 },
  "seoul-slim": { lat: 37.5135, lng: 127.1002 },
  "yeoksam-diet-clinic": { lat: 37.5033, lng: 127.0368 },
  "seocho-fit-clinic": { lat: 37.4936, lng: 127.0259 },
  "jamsil-wellness": { lat: 37.5082, lng: 127.0874 },
  "pangyo-slim-care": { lat: 37.3947, lng: 127.1112 },
  "bundang-one-clinic": { lat: 37.3671, lng: 127.1084 },
  "songpa-diet-medical": { lat: 37.5007, lng: 127.1125 },
  "guro-fit-family": { lat: 37.4851, lng: 126.8958 },
  "mapo-light-clinic": { lat: 37.5564, lng: 126.9236 },
  "yongsan-balance": { lat: 37.5299, lng: 126.9647 },
};

function getDistanceKm(from: MapCenter, to: MapCenter) {
  const earthRadius = 6371;
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

function FilterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M4 7h16M8 12h8M10 17h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function HospitalCard({
  item,
  rank,
  distance,
  onSelect,
}: {
  item: (typeof hospitalList)[number];
  rank: number;
  distance: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-gtm-id="hospital-card"
      data-gtm-rank={rank}
      aria-label={`${item.name} 병원 카드`}
      onClick={onSelect}
      className="relative h-[116px] w-[349px] shrink-0 rounded-[12px] border border-[#d7e3ff] bg-white text-left shadow-[0_6px_18px_rgba(47,112,255,0.08)]"
    >
      <Image
        src={item.image}
        alt=""
        width={80}
        height={92}
        unoptimized
        className="absolute left-3 top-3 h-[92px] w-20 rounded-[8px] object-cover"
      />
      <div className="absolute left-[104px] top-4">
        <h2 className="text-[14px] font-bold leading-[18px] text-[#111827]">
          {item.name}
        </h2>
        <div className="mt-[7px] flex items-center gap-[6px]">
          <span className="rounded-[8px] bg-[#F4F5F7] px-[6px] text-[9px] font-semibold leading-[16px] text-[#6B7280]">
            가격 인증
          </span>
          <span className="text-[10px] font-medium leading-[16px] text-[#6b7280]">
            {item.hours}
          </span>
        </div>
        <p className="mt-[5px] text-[10px] font-medium leading-[14px] text-[#6b7280]">
          {distance}
        </p>
        <p className="mt-[6px] text-[10px] font-semibold leading-[14px] text-[#4b5563]">
          {item.wait}
        </p>
      </div>
      <div className="absolute right-4 top-[50px] rounded-[12px] bg-[#F3F7FF] px-[10px] text-[10px] font-semibold leading-6 text-[#5E82D9]">
        {item.saving}
      </div>
      <strong className="absolute bottom-[13px] right-4 text-[17px] font-bold leading-[22px] text-[#1268ff]">
        {item.price}
      </strong>
    </button>
  );
}

export function HospitalListScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const medicineName = searchParams.get("medicine") ?? "mounjaro";
  const receiveMethod = searchParams.get("receive_method") ?? "hospital_only";
  const entryPoint = searchParams.get("entry_point") ?? "home_service_card";
  const [sortOption, setSortOption] = useState<SortOption>("recommended");
  const [userLocation, setUserLocation] = useState<MapCenter | null>(null);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const sheetDragStartYRef = useRef<number | null>(null);

  const sortedHospitals = useMemo(() => {
    if (sortOption === "price") {
      return [...hospitalList].sort(
        (a, b) => Number(a.price.replace(/\D/g, "")) - Number(b.price.replace(/\D/g, "")),
      );
    }

    if (sortOption === "wait") {
      return [...hospitalList].sort(
        (a, b) => Number(a.wait.replace(/\D/g, "")) - Number(b.wait.replace(/\D/g, "")),
      );
    }

    if (userLocation) {
      return [...hospitalList].sort((a, b) => {
        const aPosition = hospitalCoordinates[a.id];
        const bPosition = hospitalCoordinates[b.id];
        if (!aPosition || !bPosition) return 0;
        return getDistanceKm(userLocation, aPosition) - getDistanceKm(userLocation, bPosition);
      });
    }

    return hospitalList;
  }, [sortOption, userLocation]);

  const isPriceSort = sortOption === "price";
  const isWaitSort = sortOption === "wait";
  const isRecommendedSort = sortOption === "recommended";
  const trackSortClick = (sortType: "recommend" | "price" | "wait") => {
    trackEvent("sort_click", {
      screen_name: "cart",
      sort_type: sortType,
    });
  };
  const trackFilterClick = (filterType: "more") => {
    trackEvent("filter_click", {
      screen_name: "cart",
      filter_type: filterType,
    });
  };

  const getCardDistance = (item: (typeof hospitalList)[number]) => {
    const position = hospitalCoordinates[item.id];
    if (!userLocation || !position) return item.distance;
    return `${item.reviewCount} · ${getDistanceKm(userLocation, position)} km`;
  };

  const handleSheetPointerDown = (clientY: number) => {
    sheetDragStartYRef.current = clientY;
  };

  const handleSheetPointerEnd = (clientY: number) => {
    if (sheetDragStartYRef.current === null) return;
    const deltaY = clientY - sheetDragStartYRef.current;
    if (deltaY < -40) setIsSheetExpanded(true);
    if (deltaY > 40) setIsSheetExpanded(false);
    sheetDragStartYRef.current = null;
  };

  useEffect(() => {
    trackEvent("hospital_list_view", {
      page_name: "hospital_list",
      medicine_name: medicineName,
      receive_method: receiveMethod,
    });
  }, [medicineName, receiveMethod]);

  return (
    <main className="mx-auto h-screen w-full max-w-[393px] overflow-hidden bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-14">
        <button
          type="button"
          aria-label="수령 방법 선택으로 돌아가기"
          onClick={() => {
            trackEvent("back_click", {
              screen_name: "cart",
              destination: "pickup_method",
            });
            router.push("/pickup-method");
          }}
          className="absolute left-5 top-2 grid h-10 w-10 place-items-center"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="m15 18-6-6 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <h1 className="absolute left-[134px] top-4 text-[16px] font-semibold leading-6">
          다이어트 주사 예약
        </h1>
        <button
          type="button"
          aria-label="찜하기"
          className="absolute right-5 top-2 grid h-10 w-10 place-items-center"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M20.8 8.6c0 5.2-8.8 10.4-8.8 10.4S3.2 13.8 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </header>

      <div className="relative h-[calc(100vh-106px)] overflow-hidden">
        <NearbyPlaceFinder onUserLocationResolved={setUserLocation} />

        <section
          className={`absolute bottom-0 left-0 right-0 rounded-t-[18px] bg-white shadow-[0_-8px_24px_rgba(17,24,39,0.10)] transition-[top] duration-200 ease-out ${
            isSheetExpanded ? "top-28" : "top-[331px]"
          }`}
          aria-label="병원 리스트 바텀시트"
        >
          <div
            className="flex h-8 touch-none items-center justify-center"
            role="button"
            tabIndex={0}
            aria-label="병원 리스트 높이 조절"
            onPointerDown={(event) => handleSheetPointerDown(event.clientY)}
            onPointerUp={(event) => handleSheetPointerEnd(event.clientY)}
            onPointerCancel={() => {
              sheetDragStartYRef.current = null;
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") setIsSheetExpanded(true);
              if (event.key === "ArrowDown") setIsSheetExpanded(false);
            }}
          >
            <span className="h-1 w-12 rounded-sm bg-[#c5ccd8]" />
          </div>

          <section className="mx-[22px] flex h-[54px] w-[349px] items-start gap-[10px] pt-[11px]">
            <button
              type="button"
              data-gtm-id="hospital-filter-recommend"
              aria-label="추천순 정렬"
              onClick={() => {
                setSortOption("recommended");
                trackSortClick("recommend");
              }}
              className={`h-8 w-[78px] rounded-[16px] text-[12px] font-semibold leading-4 ${
                isRecommendedSort
                  ? "bg-[#2f70ff] text-white"
                  : "border border-[#dce3ee] bg-white text-[#111827]"
              }`}
            >
              추천순
            </button>
            <button
              type="button"
              data-gtm-id="hospital-filter-price"
              aria-label="가격순 정렬"
              onClick={() => {
                setSortOption("price");
                trackSortClick("price");
              }}
              className={`h-8 w-[78px] rounded-[16px] text-[12px] font-semibold leading-4 ${
                isPriceSort
                  ? "bg-[#2f70ff] text-white"
                  : "border border-[#dce3ee] bg-white text-[#111827]"
              }`}
            >
              가격순
            </button>
            <button
              type="button"
              data-gtm-id="hospital-filter-revisit"
              aria-label="대기 짧은순 정렬"
              onClick={() => {
                setSortOption("wait");
                trackSortClick("wait");
              }}
              className={`h-8 w-[90px] rounded-[16px] text-[12px] font-semibold leading-4 ${
                isWaitSort
                  ? "bg-[#2f70ff] text-white"
                  : "border border-[#dce3ee] bg-white text-[#111827]"
              }`}
            >
              대기 짧은순
            </button>
            <button
              type="button"
              aria-label="필터"
              data-gtm-id="hospital-filter-more"
              onClick={() => trackFilterClick("more")}
              className="grid h-8 w-[33px] place-items-center rounded-[16px] border border-[#dce3ee] bg-white text-[#6b7280]"
            >
              <FilterIcon />
            </button>
          </section>

          <section className="mx-[22px] mt-3 flex h-[calc(100%-95px)] w-[349px] flex-col gap-4 overflow-y-auto pb-28 mobile-scrollbar">
            {sortedHospitals.map((item, index) => (
              <HospitalCard
                key={item.id}
                item={item}
                rank={index + 1}
                distance={getCardDistance(item)}
                onSelect={() => {
                  trackEvent("hospital_card_click", {
                    page_name: "hospital_list",
                    hospital_name: item.name,
                    rank: index + 1,
                    price: item.price,
                    distance: getCardDistance(item),
                    revisit_rate: item.revisitRate,
                  });
                  router.push(
                    `/hospital-detail?hospital=${item.id}&medicine=${medicineName}&receive_method=${receiveMethod}&entry_point=${entryPoint}`,
                  );
                }}
              />
            ))}
          </section>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto h-20 w-full max-w-[393px] bg-white pt-[10px] shadow-[0_-8px_24px_rgba(17,24,39,0.08)]">
        <button
          type="button"
          data-gtm-id="hospital-select-button"
          aria-label="병원 선택하기"
          onClick={() =>
            trackEvent("cta_click", {
              screen_name: "cart",
              button_name: "hospital_select",
              selected_hospital_count: 1,
              hospital_name: sortedHospitals[0]?.name,
            })
          }
          className="mx-[22px] h-14 w-[349px] rounded-[8px] bg-[#2f70ff] text-[16px] font-bold leading-6 text-white"
        >
          병원 선택하기
        </button>
      </div>
    </main>
  );
}
