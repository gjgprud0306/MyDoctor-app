"use client";

import Image from "next/image";
import type { MedicineItem } from "@/lib/medicine-data";

type MedicineCardProps = {
  item: MedicineItem;
  top: number;
  onSelect?: () => void;
};

export function MedicineCard({ item, top, onSelect }: MedicineCardProps) {
  const medicineName = item.id === "oral-diet" ? "pill" : item.id;

  return (
    <button
      type="button"
      onClick={onSelect}
      data-gtm-id={`medicine-option-${medicineName}`}
      aria-label={`${item.name} 선택`}
      className="absolute left-5 flex w-[353px] items-center gap-[10px] rounded-[14px] border border-[#d7dde8] bg-white px-3 py-[5px] text-left"
      style={{ top, height: item.cardHeight }}
    >
      <div className="grid h-[68px] w-[68px] shrink-0 place-items-center overflow-hidden bg-white">
        <Image
          src={item.image}
          alt=""
          width={item.imageSize}
          height={item.imageSize}
          unoptimized
          className="object-contain"
          style={{
            width: item.imageSize,
            height: item.imageSize,
          }}
        />
      </div>
      <div className="flex h-[76px] w-[202px] shrink-0 flex-col justify-center">
        <div className="flex min-h-6 items-center gap-3">
          <h2 className="shrink-0 whitespace-nowrap text-[17px] font-semibold leading-[22px] text-[#111827]">
            {item.name}
          </h2>
          <span className="inline-flex h-[18px] shrink-0 items-center justify-center rounded-[9px] border border-[#c8d0dc] px-2 py-0 text-center text-[10px] font-medium leading-[14px] text-[#6b7280] whitespace-nowrap">
            {item.ingredient}
          </span>
        </div>
        <p className="mt-1 w-full truncate text-[10px] font-medium leading-[13px] text-[#4b5563]">
          {item.effect}
        </p>
        <div className="mt-2 flex h-[22px] items-center gap-2">
          <span className="shrink-0 text-[10px] font-medium leading-[13px] text-[#6b7280]">
            처방 진료비
          </span>
          <strong className="shrink-0 text-[17px] font-bold leading-[22px] text-[#1c6cff]">
            {item.price}
          </strong>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#e1e6ef] bg-white"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[#98a2b3]"
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
      </span>
    </button>
  );
}
