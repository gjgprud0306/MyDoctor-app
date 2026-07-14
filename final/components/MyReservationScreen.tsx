"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { IosStatusBar } from "@/components/IosStatusBar";
import { trackEvent } from "@/lib/analytics";
import { findReservationHospital } from "@/lib/reservation-data";

export function MyReservationScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hospital = findReservationHospital(searchParams.get("hospital"));
  const date = searchParams.get("date") ?? "06월 24일 (화)";
  const time = searchParams.get("time") ?? "13:30";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[393px] flex-col bg-white text-[#111827]">
      <IosStatusBar />
      <header className="flex h-14 items-center justify-center bg-white">
        <button
          type="button"
          aria-label="홈으로 돌아가기"
          onClick={() => {
            trackEvent("back_click", {
              screen_name: "mypage",
              destination: "home",
            });
            router.push("/");
          }}
          className="absolute left-4 grid h-10 w-10 place-items-center"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path d="m15 18-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
        <h1 className="text-center text-[18px] font-bold leading-6">
          예약 내역
        </h1>
      </header>
      <div className="flex-1 overflow-y-auto px-5 pt-5 mobile-scrollbar">
        <article className="w-full rounded-[14px] bg-white p-4 shadow-soft">
          <div className="flex gap-3">
            <Image
              src={hospital.image}
              alt=""
              width={62}
              height={72}
              priority
              unoptimized
              className="h-[72px] w-[62px] shrink-0 rounded-[8px] object-cover"
            />
            <div>
              <h2 className="text-[18px] font-bold leading-6">{hospital.name}</h2>
              <p className="mt-1 text-[13px] font-medium leading-[18px] text-[#6b7280]">
                {hospital.department}
              </p>
              <p className="mt-3 text-[14px] font-bold leading-5 text-[#1268ff]">
                {date} {time}
              </p>
            </div>
          </div>
        </article>
      </div>
      <div className="fixed bottom-0 left-0 right-0 mx-auto h-24 w-full max-w-[393px] bg-white px-5 pt-3 shadow-[0_-8px_24px_rgba(17,24,39,0.08)]">
        <button
          type="button"
          data-gtm-id="my-reservation-home-button"
          aria-label="홈으로 이동"
          onClick={() => {
            trackEvent("cta_click", {
              screen_name: "mypage",
              button_name: "home",
            });
            router.push("/");
          }}
          className="h-14 w-full rounded-[8px] bg-[#2f70ff] text-[16px] font-bold leading-6 text-white"
        >
          홈으로 이동
        </button>
      </div>
    </main>
  );
}
