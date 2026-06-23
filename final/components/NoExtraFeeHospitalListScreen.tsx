"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IosStatusBar } from "@/components/IosStatusBar";
import { SystemIcon } from "@/components/SystemIcon";
import { noExtraFeeHospitals } from "@/lib/no-extra-fee-hospital-data";

function BackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="m15 18-6-6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function NoExtraFeeHospitalCard({
  item,
  onSelect,
}: {
  item: (typeof noExtraFeeHospitals)[number];
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative h-[148px] w-full rounded-[14px] border border-[#e5e7eb] bg-white p-4 text-left shadow-soft"
    >
      <span className="absolute left-4 top-4 grid h-5 w-11 place-items-center rounded-[10px] bg-primary text-[10px] font-bold leading-4 text-white">
        {item.bestLabel}
      </span>
      <Image
        src={item.image}
        alt=""
        width={44}
        height={44}
        priority
        unoptimized
        className="absolute left-4 top-[45px] h-11 w-11 rounded-[12px] object-cover"
      />
      <div className="ml-[60px]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="truncate text-[16px] font-bold leading-[22px] text-[#111827]">
              {item.name}
            </h2>
            <p className="mt-[3px] line-clamp-2 text-[12px] font-medium leading-[17px] text-[#6b7280]">
              {item.department}
            </p>
          </div>
          <span className="shrink-0 rounded-[12px] bg-[#dcfce7] px-[9px] text-[11px] font-bold leading-6 text-[#00a866]">
            {item.extraFeeBadge}
          </span>
        </div>

        <div className="mt-[7px] flex items-center gap-[5px] text-[11px] font-medium leading-4 text-[#6b7280]">
          <SystemIcon
            name="star"
            className="h-3 w-3 fill-[#ffcc00] text-[#ffcc00]"
            strokeWidth={2}
          />
          <span>{item.rating}</span>
          <span className="h-1 w-1 rounded-full bg-[#d1d5db]" />
          <span>{item.reviewCount}</span>
        </div>

        <div className="mt-3 flex h-9 items-center justify-between rounded-[10px] bg-[#f6f9ff] px-3">
          <span className="text-[12px] font-semibold leading-4 text-[#4b5563]">
            진료비
          </span>
          <strong className="text-[17px] font-bold leading-[22px] text-[#1268ff]">
            {item.consultationFee}
          </strong>
        </div>
      </div>
    </button>
  );
}

export function NoExtraFeeHospitalListScreen() {
  const router = useRouter();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-14 bg-white">
        <button
          type="button"
          aria-label="홈으로 돌아가기"
          onClick={() => router.push("/")}
          className="absolute left-4 top-2 grid h-10 w-10 place-items-center"
        >
          <BackIcon />
        </button>
        <h1 className="absolute left-[96px] top-4 w-[201px] text-center text-[17px] font-bold leading-6">
          추가 비용 없는 병원
        </h1>
      </header>

      <section className="px-5 pb-10 pt-5">
        <p className="text-[15px] font-semibold leading-[22px] text-[#21242c]">
          진료비와 약값을 미리 확인하고 추가 비용 걱정 없이 예약해보세요
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {noExtraFeeHospitals.map((item) => (
            <NoExtraFeeHospitalCard
              key={item.id}
              item={item}
              onSelect={() =>
                router.push(`/hospital-detail?hospital=${item.id}&from=no-extra-fee`)
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
}
