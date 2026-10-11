"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { emptyHospitalFilters, type HospitalFilters } from "@/lib/hospital-filters";

function Chip({ selected, children, onClick, compact = false }: { selected: boolean; children: ReactNode; onClick: () => void; compact?: boolean }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick}
      className={`flex h-11 min-w-0 items-center justify-between rounded-xl border-2 text-left text-[14px] font-medium leading-6 ${compact ? "gap-1 px-2" : "gap-2 px-3"} ${selected ? "border-[#2f70ff] bg-[#f3f7ff] text-[#2f70ff]" : "border-[#dce3ee] bg-white text-[#111827]"}`}>
      <span className="whitespace-nowrap">{children}</span>
      {selected && <img src="/assets/icons/hospital-filter/check.svg" alt="" className="shrink-0" />}
    </button>
  );
}

export function HospitalFilterSheet({ value, count, onChange, onClose, onApply }: {
  value: HospitalFilters; count: number; onChange: (value: HospitalFilters) => void;
  onClose: () => void; onApply: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current!;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, []);
  return (
    <dialog ref={dialogRef} aria-labelledby="hospital-filter-title" className="hospital-filter-sheet"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientY < bounds.top || event.clientX < bounds.left || event.clientX > bounds.right) onClose();
      }}>
      <div className="mx-auto h-1 w-10 shrink-0 rounded-sm bg-[#6b7280]" />
      <h2 id="hospital-filter-title" className="flex h-10 shrink-0 items-center text-[22px] font-medium leading-8">병원 필터</h2>
      <fieldset className="min-w-0">
        <legend className="mb-2 text-[16px] font-medium leading-6">진료 여부</legend>
        <div className="grid grid-cols-2 gap-3">
          <Chip selected={value.status === "open"} onClick={() => onChange({ ...value, status: value.status === "open" ? null : "open" })}>진료 중</Chip>
          <Chip selected={value.status === "today"} onClick={() => onChange({ ...value, status: value.status === "today" ? null : "today" })}>오늘 진료 가능</Chip>
        </div>
      </fieldset>
      <fieldset className="min-w-0">
        <legend className="mb-2 text-[16px] font-medium leading-6">진료 방식</legend>
        <div className="grid grid-cols-2 gap-3">
          {(["in_person", "remote"] as const).map((method) => <Chip key={method} selected={value.methods.includes(method)} onClick={() => onChange({ ...value, methods: value.methods.includes(method) ? value.methods.filter((item) => item !== method) : [...value.methods, method] })}>{method === "in_person" ? "대면 진료" : "비대면 진료"}</Chip>)}
        </div>
      </fieldset>
      <fieldset className="min-w-0">
        <legend className="mb-2 text-[16px] font-medium leading-6">거리</legend>
        <div className="grid grid-cols-3 gap-3">
          {([1, 3, 5] as const).map((km) => <Chip compact key={km} selected={value.distanceKm === km} onClick={() => onChange({ ...value, distanceKm: value.distanceKm === km ? null : km })}>{km}km 이내</Chip>)}
        </div>
      </fieldset>
      <div className="flex flex-col gap-2">
        <button type="button" onClick={onApply} className="h-12 rounded-xl bg-[#2f70ff] text-[16px] font-medium leading-6 text-white">병원 {count}곳 보기</button>
        <button type="button" onClick={() => onChange({ ...emptyHospitalFilters, methods: [] })} className="h-8 text-[14px] font-medium leading-6 text-[#6b7280]">초기화</button>
      </div>
    </dialog>
  );
}
