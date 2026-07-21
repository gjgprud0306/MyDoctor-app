"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IosStatusBar } from "@/components/IosStatusBar";
import { trackEvent } from "@/lib/analytics";
import { hospitalList } from "@/lib/hospital-list-data";

const highReturnHospitals = hospitalList.slice(0, 3);

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

function PriceBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="h-[54px] rounded-[10px] bg-[#f6f9ff] px-3 py-[8px]">
      <p className="text-[11px] font-medium leading-4 text-[#6b7280]">{label}</p>
      <p className="mt-[2px] text-[14px] font-bold leading-5 text-[#111827]">{value}</p>
    </div>
  );
}

function HighReturnHospitalCard({
  item,
  rank,
  onSelect,
}: {
  item: (typeof highReturnHospitals)[number];
  rank: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full rounded-[14px] border border-[#d7e3ff] bg-white p-4 text-left shadow-soft"
    >
      <div className="flex gap-3">
        <div className="relative h-[92px] w-20 shrink-0 overflow-hidden rounded-[8px]">
          <Image
            src={item.image}
            alt=""
            width={80}
            height={92}
            priority={rank === 1}
            unoptimized
            className="h-[92px] w-20 object-cover"
          />
          <span className="absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-[12px] bg-[#2f70ff] text-[11px] font-bold leading-4 text-white">
            {rank}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-[16px] font-bold leading-[22px] text-[#111827]">
                {item.name}
              </h2>
              <p className="mt-[3px] text-[12px] font-medium leading-[18px] text-[#6b7280]">
                {item.department}
              </p>
            </div>
            <span className="shrink-0 rounded-[12px] bg-[#F3F7FF] px-[10px] text-[12px] font-bold leading-6 text-[#5E82D9]">
              재진율 {item.revisitRate}
            </span>
          </div>
          <div className="mt-[7px] flex flex-wrap items-center gap-[6px] text-[11px] font-medium leading-4 text-[#6b7280]">
            <span>{item.distanceText}</span>
            <span className="h-1 w-1 rounded-full bg-[#d1d5db]" />
            <span>{item.reviewCount}</span>
            <span className="h-1 w-1 rounded-full bg-[#d1d5db]" />
            <span>{item.waitTime}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <PriceBox label="진료비" value={item.consultationFee} />
        <PriceBox label="약값" value={item.medicinePrice} />
      </div>

      <div className="mt-3 flex h-12 items-center justify-between rounded-[10px] bg-[#eff6ff] px-4">
        <span className="text-[13px] font-semibold leading-[18px] text-[#4b5563]">
          총 예상 금액
        </span>
        <strong className="text-[20px] font-bold leading-6 text-[#1268ff]">
          {item.totalPrice}
        </strong>
      </div>
    </button>
  );
}

export function HighReturnHospitalListScreen() {
  const router = useRouter();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-14 bg-white">
        <button
          type="button"
          aria-label="홈으로 돌아가기"
          onClick={() => {
            trackEvent("back_click", {
              screen_name: "cart",
              destination: "home",
            });
            router.push("/");
          }}
          className="absolute left-4 top-2 grid h-10 w-10 place-items-center"
        >
          <BackIcon />
        </button>
        <h1 className="absolute left-[106px] top-4 w-[181px] text-center text-[17px] font-bold leading-6">
          재진율 높은 병원
        </h1>
      </header>

      <section className="px-5 pb-10 pt-5">
        <p className="text-[15px] font-semibold leading-[22px] text-[#21242c]">
          다시 찾는 환자가 많은 병원을 비교해보세요
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {highReturnHospitals.map((item, index) => (
            <HighReturnHospitalCard
              key={item.id}
              item={item}
              rank={index + 1}
              onSelect={() => {
                trackEvent("cta_click", {
                  screen_name: "cart",
                  button_name: "high_return_hospital",
                  hospital_name: item.name,
                  rank: index + 1,
                });
                router.push(`/hospital-detail?hospital=${item.id}&from=high-return`);
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
