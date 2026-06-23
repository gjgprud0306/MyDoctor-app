"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { IosStatusBar } from "@/components/IosStatusBar";
import { hospitalList } from "@/lib/hospital-list-data";
import { noExtraFeeHospitals } from "@/lib/no-extra-fee-hospital-data";

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];
const dateOptions = [
  "06.24 (화)",
  "06.25 (수)",
  "06.26 (목)",
  "06.27 (금)",
  "06.28 (토)",
];

function getReviewText(distance: string) {
  return distance.split("·")[0]?.replace(/[()]/g, "").trim() || "리뷰 0";
}

function getRevisitRate(saving: string) {
  return saving.replace("제진", "").trim();
}

function getWaitText(wait: string) {
  return wait.replace("평균 대기", "평균대기").trim();
}

function getMetricText(hospital: (typeof hospitalList)[number] | (typeof noExtraFeeHospitals)[number]) {
  if ("rating" in hospital) {
    return `평점 ${hospital.rating} (${hospital.reviewCount})`;
  }

  return `${hospital.revisitRate || getRevisitRate(hospital.saving)} (${hospital.reviewCount || getReviewText(hospital.distance)})`;
}

export function HospitalDetailScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedHospital = useMemo(() => {
    const hospitalId = searchParams.get("hospital");
    const detailHospitals = [...hospitalList, ...noExtraFeeHospitals];
    return detailHospitals.find((hospital) => hospital.id === hospitalId) ?? hospitalList[0];
  }, [searchParams]);
  const backPath =
    searchParams.get("from") === "high-return"
      ? "/high-return-hospital-list"
      : searchParams.get("from") === "no-extra-fee"
        ? "/no-extra-fee-hospital-list"
        : "/hospital-list";
  const [selectedDate, setSelectedDate] = useState(dateOptions[0]);
  const [selectedTime, setSelectedTime] = useState("13:30");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-[76px]">
        <button
          type="button"
          aria-label="병원 리스트로 돌아가기"
          onClick={() => router.push(backPath)}
          className="absolute left-[16px] top-3 grid h-10 w-10 place-items-center"
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
        <h1 className="absolute left-[107px] top-4 w-[180px] text-center text-[18px] font-semibold leading-7">
          병원 세부 정보
        </h1>
      </header>

      <section className="mx-4 h-[88px] w-[361px] rounded-[10px] border border-[#dce3ee] bg-white shadow-[0_6px_18px_rgba(17,24,39,0.04)]">
        <div className="relative h-full">
          <Image
            src={selectedHospital.image}
            alt=""
            width={62}
            height={72}
            priority
            unoptimized
            className="absolute left-3 top-2 h-[72px] w-[62px] rounded-[6px] object-cover"
          />
          <div className="absolute left-[98px] top-2">
            <h2 className="text-[20px] font-semibold leading-7">
              {selectedHospital.name}
            </h2>
            <p className="mt-[3px] text-[13px] font-medium leading-[19px] text-[#6b7280]">
              {selectedHospital.department}
            </p>
            <div className="mt-[3px] flex h-[18px] items-center text-[12px] font-medium leading-[18px] text-[#6b7280]">
              <span>{getMetricText(selectedHospital)}</span>
              <span className="mx-[6px] h-[10px] w-px bg-[#dce3ee]" />
              <span>{getWaitText(selectedHospital.wait)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 mt-3 w-[361px]">
        <h2 className="text-[20px] font-semibold leading-6">
          진료 가능 시간
        </h2>
        <p className="mt-2 text-[14px] font-medium leading-[18px] text-[#6b7280]">
          {selectedDate === dateOptions[0] ? `오늘 ${selectedDate}` : selectedDate}
        </p>
        <div className="mt-2 flex h-12 touch-pan-x gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-1 mobile-scrollbar">
          {timeSlots.map((time) => {
            const selected = time === selectedTime;
            return (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`h-12 w-[63px] shrink-0 rounded-[6px] border text-[14px] font-medium leading-5 ${
                  selected
                    ? "border-[#2f70ff] bg-[#f0f6ff] text-[#2f70ff]"
                    : "border-[#dce3ee] bg-white text-[#111827]"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setIsDatePickerOpen((isOpen) => !isOpen)}
          className="mt-2 h-[38px] w-[361px] rounded-[8px] border border-[#dce3ee] bg-white text-[13px] font-medium leading-[18px] text-[#4b5563]"
        >
          {isDatePickerOpen ? "날짜 접기" : "다른 날짜 보기"}
        </button>
        {isDatePickerOpen ? (
          <div className="mt-2 flex h-[38px] w-[361px] touch-pan-x gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain mobile-scrollbar">
            {dateOptions.map((date) => {
              const selected = date === selectedDate;
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => {
                    setSelectedDate(date);
                    setIsDatePickerOpen(false);
                  }}
                  className={`h-9 w-[86px] shrink-0 rounded-[8px] border text-[12px] font-medium leading-4 ${
                    selected
                      ? "border-[#2f70ff] bg-[#f0f6ff] text-[#2f70ff]"
                      : "border-[#dce3ee] bg-white text-[#4b5563]"
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
        ) : null}
      </section>

      <section className="mx-4 mt-5 h-[58px] w-[361px] rounded-[10px] bg-[#f6f9ff]">
        <div className="relative h-full">
          <div className="absolute left-3 top-[11px]">
            <p className="text-[10px] font-medium leading-[15px] text-[#6b7280]">
              진료비 {selectedHospital.consultationFee}
            </p>
            <h2 className="text-[14px] font-semibold leading-[19px]">
              약값 {selectedHospital.medicinePrice}
            </h2>
          </div>
          <strong className="absolute right-3 top-4 text-[22px] font-semibold leading-[26px] text-[#1268ff]">
            {selectedHospital.totalPrice || selectedHospital.price}
          </strong>
        </div>
      </section>

      <section className="mx-4 mt-3 h-[54px] w-[361px] rounded-[10px] border border-[#e5eaf3] bg-white">
        <div className="px-3 py-[9px]">
          <h2 className="text-[13px] font-medium leading-[18px] text-[#4b5563]">
            예약 변경 · 취소는 마이페이지에서 가능해요
          </h2>
          <p className="text-[11px] font-medium leading-4 text-[#8a94a6]">
            예약 시간 10분 전까지 변경/취소가 가능해요.
          </p>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 mx-auto h-40 w-full max-w-[393px] border-t border-[#eef2f7] bg-white px-4 pt-4">
        <div className="flex h-9 justify-between">
          <div>
            <p className="text-[10px] font-medium leading-[15px] text-[#6b7280]">
              선택한 시간
            </p>
            <p className="text-[16px] font-semibold leading-[22px]">
              {selectedDate} {selectedTime}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium leading-[15px] text-[#6b7280]">
              총 결제 예상 금액
            </p>
            <p className="text-[22px] font-semibold leading-6 text-[#1268ff]">
              {selectedHospital.totalPrice || selectedHospital.price}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 h-12 w-[361px] rounded-[8px] bg-[#2f70ff] text-[16px] font-semibold leading-6 text-white"
        >
          예약하기
        </button>
        <div className="mx-auto mt-8 h-[5px] w-[135px] rounded-full bg-black" />
      </div>
    </main>
  );
}
