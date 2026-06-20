"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const doses = [
  { label: "2.5mg", stepperLeft: 207 },
  { label: "5mg", stepperLeft: 203 },
  { label: "7.5mg", stepperLeft: 203 },
  { label: "10mg", stepperLeft: 203 },
];

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

function DoseStepper({
  left,
  value,
  onDecrease,
  onIncrease,
}: {
  left: number;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div
      className="absolute top-[7px] h-[30px] w-[106px] rounded-[15px] border border-[#dce3ee] bg-[#f9fbff]"
      style={{ left }}
    >
      <button
        type="button"
        onClick={onDecrease}
        className="absolute left-0 top-0 h-[30px] w-[32px] text-[18px] font-bold leading-[30px] text-[#2f70ff]"
      >
        -
      </button>
      <span className="absolute left-[45px] top-0 h-[30px] w-4 text-center text-[16px] font-bold leading-[30px] text-[#111827]">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="absolute right-0 top-0 h-[30px] w-[32px] text-[18px] font-bold leading-[30px] text-[#2f70ff]"
      >
        +
      </button>
    </div>
  );
}

export function DietDoseSelectScreen() {
  const router = useRouter();
  const [doseCounts, setDoseCounts] = useState([0, 0, 0, 0]);
  const [isUnknownSelected, setIsUnknownSelected] = useState(false);
  const [isDoseExpanded, setIsDoseExpanded] = useState(true);

  const updateDoseCount = (index: number, delta: number) => {
    setIsUnknownSelected(false);
    setDoseCounts((current) =>
      current.map((count, countIndex) => {
        if (countIndex !== index) {
          return count;
        }

        return Math.min(2, Math.max(0, count + delta));
      }),
    );
  };

  const selectUnknownDose = () => {
    setIsUnknownSelected(true);
    setIsDoseExpanded(false);
    setDoseCounts([0, 0, 0, 0]);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <StatusBar />
      <header className="relative h-14">
        <button
          type="button"
          aria-label="홈으로 돌아가기"
          onClick={() => router.push("/")}
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
        <h1 className="absolute left-[158px] top-4 text-[16px] font-bold leading-6">
          주사제 선택
        </h1>
      </header>

      <section className="relative h-[650px]">
        <div className="absolute left-5 top-[16px] h-[132px] w-[353px]">
          <h2 className="whitespace-pre-line text-[23px] font-extrabold leading-[30px]">
            {"처방을 희망하는\n"}
            <span className="text-[#2f70ff]">주사제 종류를</span>
            {"\n선택해 주세요"}
          </h2>
          <p className="mt-3 text-[13px] font-medium leading-[19px] text-[#6b7280]">
            원하는 약과 용량을 선택해 주세요.
          </p>
          <Image
            src="/assets/images/medicines/diet-dose-hero.png"
            alt=""
            width={114}
            height={114}
            priority
            unoptimized
            className="absolute left-[238px] top-[9px] h-[114px] w-[114px] object-contain"
          />
        </div>

        <section className="absolute left-5 top-40 h-[66px] w-[353px] rounded-[14px] border border-[#2f70ff] bg-white">
          <div className="absolute left-4 top-[22px] grid h-[22px] w-[22px] place-items-center rounded-full bg-[#2f70ff]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[14px] w-[14px] text-white"
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
          </div>
          <div className="absolute left-12 top-[13px]">
            <p className="text-[16px] font-extrabold leading-[22px]">
              마OOO{" "}
              <span className="text-[13px] font-medium text-[#4b5563]">
                (티제파타이드)
              </span>
            </p>
            <p className="mt-[2px] text-[11px] font-bold leading-4 text-[#2f70ff]">
              선택됨
            </p>
          </div>
          <button
            type="button"
            aria-label="용량 선택 영역 열고 닫기"
            aria-expanded={isDoseExpanded}
            onClick={() => setIsDoseExpanded((current) => !current)}
            className="absolute left-[305px] top-[13px] grid h-10 w-10 place-items-center"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`h-6 w-6 text-[#111827] transition-transform ${
                isDoseExpanded ? "rotate-180" : ""
              }`}
              fill="none"
            >
              <path
                d="m8 10 4 4 4-4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </section>

        {isDoseExpanded ? (
          <section className="absolute left-5 top-[232px] h-[284px] w-[353px] rounded-[14px] border border-[#dce3ee] bg-white">
            <h2 className="absolute left-4 top-[13px] text-[14px] font-bold leading-[22px]">
              용량 선택
            </h2>
            {doses.map((dose, index) => (
              <div
                key={dose.label}
                className={`absolute left-4 h-11 w-[321px] rounded-[14px] border ${
                  index === 0 && !isUnknownSelected
                    ? "border-[#2f70ff] bg-[#f6f9ff]"
                    : "border-[#dce3ee] bg-white"
                }`}
                style={{ top: 48 + index * 58 }}
              >
                <span
                  className={`absolute left-[14px] top-[10px] text-[16px] font-extrabold leading-6 ${
                    index === 0 && !isUnknownSelected
                      ? "text-[#2f70ff]"
                      : "text-[#111827]"
                  }`}
                >
                  {dose.label}
                </span>
                <DoseStepper
                  left={dose.stepperLeft}
                  value={doseCounts[index]}
                  onDecrease={() => updateDoseCount(index, -1)}
                  onIncrease={() => updateDoseCount(index, 1)}
                />
              </div>
            ))}
          </section>
        ) : null}

        <button
          type="button"
          onClick={selectUnknownDose}
          className={`absolute left-5 h-16 w-[353px] rounded-[14px] border bg-white text-left ${
            isUnknownSelected
              ? "border-[#2f70ff]"
              : "border-[#dce3ee]"
          }`}
          style={{ top: isDoseExpanded ? 530 : 240 }}
        >
          <span
            className={`absolute left-4 top-[21px] grid h-[22px] w-[22px] place-items-center rounded-full border-2 ${
              isUnknownSelected
                ? "border-[#2f70ff] bg-[#2f70ff]"
                : "border-[#c9d1de]"
            }`}
          >
            {isUnknownSelected ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-[14px] w-[14px] text-white"
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
            ) : null}
          </span>
          <div className="absolute left-[49px] top-[14px]">
            <h2 className="text-[14px] font-extrabold leading-[19px]">
              잘 모르겠어요 (진료 후 결정할게요)
            </h2>
            <p className="mt-[2px] text-[10px] font-medium leading-4 text-[#8a94a6]">
              상담 후, 나에게 맞는 용량을 추천받을 수 있어요.
            </p>
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="absolute left-[317px] top-[22px] h-5 w-5 text-[#6b7280]"
            fill="none"
          >
            <path
              d="m9 6 6 6-6 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </section>

      <div className="fixed bottom-0 left-0 right-0 mx-auto h-24 w-full max-w-[393px] bg-white pt-3 shadow-[0_-8px_24px_rgba(17,24,39,0.08)]">
        <button
          type="button"
          className="mx-5 h-14 w-[353px] rounded-[8px] bg-[#2f70ff] text-[16px] font-extrabold leading-6 text-white"
        >
          병원 · 약국 선택하기
        </button>
      </div>
    </main>
  );
}
