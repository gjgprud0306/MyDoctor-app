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
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-14 bg-white">
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
          className="absolute left-4 top-2 grid h-10 w-10 place-items-center"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path d="m15 18-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
        <h1 className="absolute left-[126px] top-4 w-[141px] text-center text-[18px] font-bold leading-6">
          예약 내역
        </h1>
      </header>
      <section className="px-5 pt-5">
        <article className="rounded-[14px] bg-white p-4 shadow-soft">
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
      </section>
    </main>
  );
}
