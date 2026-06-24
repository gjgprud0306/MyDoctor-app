"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IosStatusBar } from "@/components/IosStatusBar";
import { trackEvent } from "@/lib/analytics";
import { findReservationHospital } from "@/lib/reservation-data";

function formatDate(date: string | null) {
  if (!date) {
    return "06월 24일 (화)";
  }

  const [monthDay, dayName = ""] = date.split(" ");
  const [month, day] = monthDay.split(".");
  return `${month}월 ${day}일 ${dayName}`.trim();
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9" fill="none">
      <path
        d="m6 12 4 4 8-8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-[12px] font-medium leading-[18px] text-[#6b7280]">
        {label}
      </span>
      <span className="text-right text-[13px] font-semibold leading-[18px] text-[#111827]">
        {value}
      </span>
    </div>
  );
}

export function ReservationCompleteScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hospital = findReservationHospital(searchParams.get("hospital"));
  const date = formatDate(searchParams.get("date"));
  const time = searchParams.get("time") ?? "13:30";
  const medicineName = searchParams.get("medicine") ?? "mounjaro";
  const reservationQuery = `hospital=${hospital.id}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;

  useEffect(() => {
    trackEvent("reservation_complete_view", {
      page_name: "reservation_complete",
      hospital_name: hospital.name,
      medicine_name: medicineName,
    });
  }, [hospital.name, medicineName]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-14 bg-white">
        <h1 className="absolute left-[126px] top-4 w-[141px] text-center text-[18px] font-bold leading-6">
          예약 완료
        </h1>
      </header>

      <div className="px-5 pb-32 pt-7">
        <section className="flex flex-col items-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-[32px] bg-[#2f70ff] text-white">
            <CheckIcon />
          </div>
          <h2 className="mt-5 text-[22px] font-bold leading-7">
            예약이 완료되었어요
          </h2>
          <p className="mt-2 text-[14px] font-medium leading-5 text-[#6b7280]">
            예약 시간에 맞춰 병원을 방문해주세요
          </p>
        </section>

        <section className="mt-7 rounded-[14px] bg-white p-4 shadow-soft">
          <div className="flex gap-3">
            <Image
              src={hospital.image}
              alt=""
              width={62}
              height={72}
              priority
              unoptimized
              className="h-[72px] w-[62px] rounded-[8px] object-cover"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-[18px] font-bold leading-6">{hospital.name}</h2>
              <p className="mt-1 text-[13px] font-medium leading-[18px] text-[#6b7280]">
                {hospital.department}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-[#eef2f7] pt-4">
            <InfoRow label="예약 일시" value={`${date} ${time}`} />
            <InfoRow label="평균 대기시간" value={hospital.waitTime} />
            <InfoRow label="병원 주소" value={hospital.address} />
          </div>
        </section>

        <section className="mt-4 rounded-[14px] bg-white p-4 shadow-soft">
          <h2 className="text-[16px] font-bold leading-[22px]">결제 정보</h2>
          <div className="mt-4 flex flex-col gap-3">
            <InfoRow label="진료비" value={hospital.consultationFee} />
            <InfoRow label="약제비" value={hospital.medicinePrice} />
            <div className="mt-1 flex h-12 items-center justify-between rounded-[10px] bg-[#eff6ff] px-4">
              <span className="text-[13px] font-semibold leading-[18px] text-[#4b5563]">
                총 결제 예상 금액
              </span>
              <strong className="text-[20px] font-bold leading-6 text-[#1268ff]">
                {hospital.totalPrice}
              </strong>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[14px] border border-[#e5eaf3] bg-white p-4">
          <h2 className="text-[14px] font-bold leading-5">
            예약 변경 및 취소 안내
          </h2>
          <p className="mt-2 text-[12px] font-medium leading-[18px] text-[#6b7280]">
            예약 시간 10분 전까지 변경/취소 가능해요.
          </p>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto h-[132px] w-full max-w-[393px] border-t border-[#eef2f7] bg-white px-4 pt-3">
        <button
          type="button"
          data-gtm-id="reservation-complete-detail-button"
          aria-label="예약 내역 보기"
          onClick={() => {
            trackEvent("cta_click", {
              screen_name: "cart",
              button_name: "reservation_detail",
              destination: "reservation_detail",
            });
            router.push(`/my-reservation?${reservationQuery}`);
          }}
          className="h-12 w-[361px] rounded-[8px] bg-[#2f70ff] text-[16px] font-bold leading-6 text-white"
        >
          예약 내역 보기
        </button>
        <button
          type="button"
          data-gtm-id="reservation-complete-home-button"
          aria-label="홈으로 가기"
          onClick={() => {
            trackEvent("cta_click", {
              screen_name: "cart",
              button_name: "home",
              destination: "home",
            });
            router.push("/");
          }}
          className="mt-2 h-11 w-[361px] rounded-[8px] border border-[#dce3ee] bg-white text-[15px] font-bold leading-5 text-[#111827]"
        >
          홈으로 가기
        </button>
      </div>
    </main>
  );
}
