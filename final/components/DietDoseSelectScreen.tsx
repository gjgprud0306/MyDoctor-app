"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IosStatusBar } from "@/components/IosStatusBar";
import { sanitizeDoseId, trackEvent } from "@/lib/analytics";
import { medicines } from "@/lib/medicine-data";

function DoseStepper({
  left,
  dose,
  medicineName,
  value,
  onDecrease,
  onIncrease,
}: {
  left: number;
  dose: string;
  medicineName: string;
  value: number;
  onDecrease: () => number;
  onIncrease: () => number;
}) {
  const doseId = sanitizeDoseId(dose);

  return (
    <div
      className="absolute top-[7px] h-[30px] w-[106px] rounded-[15px] border border-[#dce3ee] bg-[#f9fbff]"
      style={{ left }}
    >
      <button
        type="button"
        data-gtm-id={`dose-minus-${doseId}`}
        aria-label={`${dose} 수량 줄이기`}
        onClick={() => {
          const quantity = onDecrease();
          trackEvent("medicine_dose_change", {
            medicine_name: medicineName,
            dose,
            action: "minus",
            quantity,
          });
        }}
        className="absolute left-0 top-0 h-[30px] w-[32px] text-[18px] font-semibold leading-[30px] text-[#2f70ff]"
      >
        -
      </button>
      <span className="absolute left-[45px] top-0 h-[30px] w-4 text-center text-[16px] font-semibold leading-[30px] text-[#111827]">
        {value}
      </span>
      <button
        type="button"
        data-gtm-id={`dose-plus-${doseId}`}
        aria-label={`${dose} 수량 늘리기`}
        onClick={() => {
          const quantity = onIncrease();
          trackEvent("medicine_dose_change", {
            medicine_name: medicineName,
            dose,
            action: "plus",
            quantity,
          });
        }}
        className="absolute right-0 top-0 h-[30px] w-[32px] text-[18px] font-semibold leading-[30px] text-[#2f70ff]"
      >
        +
      </button>
    </div>
  );
}

export function DietDoseSelectScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const medicineId = searchParams.get("medicine");
  const entryPoint = searchParams.get("entry_point") ?? "home_service_card";
  const selectedMedicine = useMemo(() => {
    return medicines.find((medicine) => medicine.id === medicineId && medicine.doses) ?? medicines[0];
  }, [medicineId]);
  const doses = selectedMedicine.doses ?? [];
  const [doseCounts, setDoseCounts] = useState<number[]>(() => doses.map(() => 0));
  const [isUnknownSelected, setIsUnknownSelected] = useState(false);
  const [isDoseExpanded, setIsDoseExpanded] = useState(true);
  const doseSectionHeight = 52 + doses.length * 58;
  const unknownDoseTop = isDoseExpanded ? 232 + doseSectionHeight + 14 : 240;

  useEffect(() => {
    setDoseCounts(doses.map(() => 0));
    setIsUnknownSelected(false);
    setIsDoseExpanded(true);
  }, [doses]);

  useEffect(() => {
    trackEvent("medicine_select_view", { page_name: "medicine_select" });
  }, []);

  const updateDoseCount = (index: number, delta: number) => {
    setIsUnknownSelected(false);
    let nextQuantity = 0;
    setDoseCounts((current) =>
      current.map((count, countIndex) => {
        if (countIndex !== index) {
          return count;
        }

        nextQuantity = Math.min(2, Math.max(0, count + delta));
        return nextQuantity;
      }),
    );

    return nextQuantity;
  };

  const selectUnknownDose = () => {
    setIsUnknownSelected(true);
    setIsDoseExpanded(false);
    setDoseCounts(doses.map(() => 0));
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-14">
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
        <h1 className="absolute left-[158px] top-4 text-[16px] font-semibold leading-6">
          주사제 선택
        </h1>
      </header>

      <section className="relative h-[650px]">
        <div className="absolute left-5 top-[16px] h-[132px] w-[353px]">
          <h2 className="whitespace-pre-line text-[23px] font-bold leading-[30px]">
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
            <p className="text-[16px] font-bold leading-[22px]">
              {selectedMedicine.name}{" "}
              <span className="text-[13px] font-medium text-[#4b5563]">
                ({selectedMedicine.ingredient})
              </span>
            </p>
            <p className="mt-[2px] text-[11px] font-semibold leading-4 text-[#2f70ff]">
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
          <section
            className="absolute left-5 top-[232px] w-[353px] rounded-[14px] border border-[#dce3ee] bg-white"
            style={{ height: doseSectionHeight }}
          >
            <h2 className="absolute left-4 top-[13px] text-[14px] font-semibold leading-[22px]">
              용량 선택
            </h2>
            {doses.map((dose, index) => (
              <div
                key={dose}
                className={`absolute left-4 h-11 w-[321px] rounded-[14px] border ${
                  index === 0 && !isUnknownSelected
                    ? "border-[#2f70ff] bg-[#f6f9ff]"
                    : "border-[#dce3ee] bg-white"
                }`}
                style={{ top: 48 + index * 58 }}
              >
                <span
                  className={`absolute left-[14px] top-[10px] text-[16px] font-bold leading-6 ${
                    index === 0 && !isUnknownSelected
                      ? "text-[#2f70ff]"
                      : "text-[#111827]"
                  }`}
                >
                  {dose}
                </span>
                <DoseStepper
                  left={203}
                  dose={dose}
                  medicineName={selectedMedicine.id}
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
          style={{ top: unknownDoseTop }}
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
            <h2 className="text-[14px] font-bold leading-[19px]">
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
          data-gtm-id="medicine-select-place-button"
          aria-label="병원 약국 선택하기"
          onClick={() => {
            const totalQuantity = doseCounts.reduce((sum, count) => sum + count, 0);

            trackEvent("cta_click", {
              screen_name: "cart",
              button_name: "place_select_start",
              medicine_name: selectedMedicine.id,
              total_quantity: totalQuantity,
            });
            router.push(
              `/pickup-method?medicine=${selectedMedicine.id}&entry_point=${entryPoint}&quantity=${totalQuantity}`,
            );
          }}
          className="mx-5 h-14 w-[353px] rounded-[8px] bg-[#2f70ff] text-[16px] font-bold leading-6 text-white"
        >
          병원 · 약국 선택하기
        </button>
      </div>
    </main>
  );
}
