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
      className="absolute left-5 w-[353px] rounded-[14px] border border-[#d7dde8] bg-white text-left"
      style={{ top, height: item.cardHeight }}
    >
      <Image
        src={item.image}
        alt=""
        width={item.imageSize}
        height={item.imageSize}
        unoptimized
        className="absolute object-contain"
        style={{
          left: item.imageLeft,
          top: item.imageTop,
          width: item.imageSize,
          height: item.imageSize,
        }}
      />
      <div
        className="absolute top-[5px] h-[81px] w-[190px]"
        style={{ left: item.contentLeft }}
      >
        <div className="absolute left-0 top-0 flex h-[43px] items-start">
          <h2 className="h-[43px] max-w-[135px] whitespace-nowrap px-[10px] pt-[10px] text-[17px] font-semibold leading-[23px] text-[#111827]">
            {item.name}
          </h2>
          <span className="mt-[13px] h-[17px] whitespace-nowrap rounded-[8px] border border-[#c8d0dc] px-[6px] text-[10px] font-medium leading-[15px] text-[#6b7280]">
            {item.ingredient}
          </span>
        </div>
        <p className="absolute left-[10px] top-[37px] whitespace-nowrap text-[10px] font-medium leading-[13px] text-[#4b5563]">
          {item.effect}
        </p>
        <div className="absolute left-[10px] top-[52px] flex h-[23px] items-start gap-2">
          <span className="pt-[5px] text-[10px] font-medium leading-[13px] text-[#6b7280]">
            처방 진료비
          </span>
          <strong className="text-[18px] font-bold leading-[23px] text-[#1c6cff]">
            {item.price}
          </strong>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute grid h-10 w-10 place-items-center rounded-full border border-[#e1e6ef] bg-white"
        style={{ left: item.buttonLeft, top: item.buttonTop }}
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
