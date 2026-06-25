"use client";

import { trackEvent } from "@/lib/analytics";

const tabs = ["비대면 진료", "최저가 병원"];

export function Tabs() {
  return (
    <div data-section="tabs" className="relative mt-[22px] border-b-2 border-[#d1d5db] bg-appBg">
      <div className="grid h-10 grid-cols-2">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            onClick={() =>
              trackEvent("tab_click", {
                screen_name: "home",
                tab_name: index === 0 ? "telemedicine" : "lowest_price_hospital",
              })
            }
            className="flex items-start justify-center px-3 pt-2 text-lg font-medium leading-[23px] tracking-[-0.02em] text-black"
          >
            <span>{tab}</span>
          </button>
        ))}
      </div>
      <span aria-hidden="true" className="absolute bottom-[-2px] left-0 h-0.5 w-1/2 bg-primary" />
    </div>
  );
}
