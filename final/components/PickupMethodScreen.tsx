"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function StatusBar() {
  return (
    <div className="relative h-[50px] text-black">
      <span className="absolute left-[55px] top-[21px] text-[17px] font-bold leading-[22px]">
        9:41
      </span>
      <div className="absolute right-[34px] top-[25px] flex h-[13px] items-start gap-[7px]">
        <span className="grid h-[13px] w-[19px] grid-cols-4 items-end gap-[2px]">
          <span className="h-[5px] rounded-[1px] bg-black" />
          <span className="h-[8px] rounded-[1px] bg-black" />
          <span className="h-[11px] rounded-[1px] bg-black" />
          <span className="h-[13px] rounded-[1px] bg-black" />
        </span>
        <span className="relative h-[13px] w-[18px]">
          <span className="absolute left-0 top-0 h-[8px] w-[18px] overflow-hidden">
            <span className="absolute left-0 top-0 h-[17px] w-[18px] rounded-t-full border-[4px] border-black border-b-0" />
          </span>
          <span className="absolute left-[4px] top-[5px] h-[6px] w-[10px] overflow-hidden">
            <span className="absolute left-0 top-0 h-[10px] w-[10px] rounded-t-full border-[4px] border-black border-b-0" />
          </span>
          <span className="absolute bottom-0 left-[7px] h-[4px] w-[4px] rounded-full bg-black" />
        </span>
        <span className="relative h-[13px] w-[27px] rounded-[4px] border border-black p-[2px]">
          <span className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
          <span className="block h-full w-full rounded-[2px] bg-black" />
        </span>
      </div>
    </div>
  );
}

type MethodCardProps = {
  title: string;
  description: string;
  meta: string[];
  selected?: boolean;
  recommended?: boolean;
  onSelect: () => void;
};

function MethodCard({
  title,
  description,
  meta,
  selected = false,
  recommended = false,
  onSelect,
}: MethodCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`absolute left-0 h-24 w-full rounded-[14px] border bg-white text-left ${
        selected ? "border-[#2f70ff]" : "border-[#dce3ee]"
      }`}
    >
      <div className="absolute left-4 top-[11px]">
        <div className="flex h-6 items-center gap-2">
          <h3 className="text-[16px] font-extrabold leading-6 text-[#111827]">
            {title}
          </h3>
          {recommended ? (
            <span className="inline-flex h-6 items-center gap-1 rounded-[12px] bg-[#edf4ff] px-[10px] text-[11px] font-bold leading-4 text-[#2f70ff]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-[14px] w-[14px]"
                fill="none"
              >
                <path
                  d="m6 12 4 4 8-8"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </svg>
              추천
            </span>
          ) : (
            <span className="inline-flex h-6 items-center rounded-[12px] bg-[#f1f4f8] px-[10px] text-[11px] font-bold leading-4 text-[#8a94a6]">
              비교 가능
            </span>
          )}
        </div>
        <p className="mt-[7px] text-[13px] font-medium leading-[19px] text-[#6b7280]">
          {description}
        </p>
        <div className="mt-[7px] flex items-center gap-2">
          {meta.map((item) => (
            <span
              key={item}
              className="relative pl-[10px] text-[11px] font-semibold leading-[18px] text-[#6b7280]"
            >
              <span className="absolute left-0 top-[7px] h-[5px] w-[5px] rounded-full bg-[#94a3b8]" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <span
        className={`absolute right-4 top-9 grid h-6 w-6 place-items-center rounded-full border-2 ${
          selected ? "border-[#2f70ff]" : "border-[#c9d1de]"
        }`}
      >
        {selected ? (
          <span className="h-4 w-4 rounded-full bg-[#2f70ff]" />
        ) : null}
      </span>
    </button>
  );
}

export function PickupMethodScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<"hospital" | "pharmacy">(
    "hospital",
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <StatusBar />
      <header className="relative h-14">
        <button
          type="button"
          aria-label="주사제 선택으로 돌아가기"
          onClick={() => router.push("/diet-dose-select")}
          className="absolute left-[18px] top-2 grid h-10 w-10 place-items-center"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
          >
            <path
              d="m15 18-6-6 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <h1 className="absolute left-[138px] top-4 text-[16px] font-bold leading-6">
          다이어트 주사 예약
        </h1>
      </header>

      <section className="relative h-[650px]">
        <section className="absolute left-4 top-4 h-[118px] w-[361px]">
          <div className="absolute left-3 top-[11px]">
            <h2 className="whitespace-pre-line text-[23px] font-extrabold leading-[30px]">
              {"어디서 약을\n"}
              <span className="text-[#2f70ff]">받을까요?</span>
            </h2>
            <p className="mt-1 text-[12px] font-medium leading-[18px] text-[#6b7280]">
              진료 후 약을 받을 방법을 선택해 주세요.
            </p>
          </div>
          <Image
            src="/assets/images/medicines/pickup-hero.png"
            alt=""
            width={108}
            height={108}
            priority
            unoptimized
            className="absolute left-[241px] top-[5px] h-[108px] w-[108px] object-contain"
          />
        </section>

        <section className="absolute left-5 top-[156px] h-[168px] w-[353px]">
          <div className="flex h-[22px] items-center justify-between">
            <h2 className="text-[16px] font-extrabold leading-[22px]">
              가까운 병원 위치
            </h2>
            <span className="text-[12px] font-medium leading-[18px] text-[#6b7280]">
              내 주변 기준
            </span>
          </div>
          <Image
            src="/assets/images/medicines/pickup-map.png"
            alt="가까운 병원 위치 지도"
            width={353}
            height={136}
            unoptimized
            className="mt-[10px] h-[136px] w-[353px] rounded-[14px] object-cover"
          />
        </section>

        <section className="absolute left-5 top-[346px] h-[257px] w-[353px]">
          <h2 className="text-[16px] font-extrabold leading-[22px]">
            수령 방법 선택
          </h2>
          <div className="absolute left-[5px] top-[38px] h-24 w-[344px]">
            <MethodCard
              title="병원만 방문"
              description="진료 후 병원에서 바로 약을 받아요."
              meta={["동선 최소", "가장 빠른 수령"]}
              selected={selectedMethod === "hospital"}
              recommended
              onSelect={() => setSelectedMethod("hospital")}
            />
          </div>
          <div className="absolute left-[5px] top-[150px] h-24 w-[344px]">
            <MethodCard
              title="병원 + 약국 방문"
              description="진료 후 가까운 약국에서 약을 받아요."
              meta={["약국 선택", "가격 비교"]}
              selected={selectedMethod === "pharmacy"}
              onSelect={() => setSelectedMethod("pharmacy")}
            />
          </div>
        </section>
      </section>

      <div className="fixed bottom-0 left-0 right-0 mx-auto h-24 w-full max-w-[393px] bg-white pt-3 shadow-[0_-8px_24px_rgba(17,24,39,0.08)]">
        <button
          type="button"
          onClick={() => router.push("/hospital-list")}
          className="mx-5 h-14 w-[353px] rounded-[8px] bg-[#2f70ff] text-[16px] font-extrabold leading-6 text-white"
        >
          선택 완료
        </button>
      </div>
    </main>
  );
}
