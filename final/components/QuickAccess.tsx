"use client";

import Image from "next/image";
import Link from "next/link";
import type { QuickAction } from "@/lib/home-data";
import { SystemIcon } from "@/components/SystemIcon";
import { trackEvent } from "@/lib/analytics";

type QuickAccessProps = {
  actions: QuickAction[];
};

export function QuickAccess({ actions }: QuickAccessProps) {
  return (
    <section data-section="quick-access" className="h-[178px] px-5 pt-[11px]">
      <div
        data-section="quick-row"
        className="grid h-[108px] w-[352px] grid-cols-[104px_112px_112px] gap-3"
      >
        {actions.map((action, index) => (
          <button
            key={action.title}
            type="button"
            className="flex h-[108px] flex-col items-center rounded-[14px] bg-white px-2 pb-2 pt-3 shadow-soft"
          >
            <Image
              src={action.icon}
              alt=""
              width={48}
              height={48}
              unoptimized
              className={`h-12 w-12 object-contain ${index === 0 ? "mt-0" : ""}`}
            />
            <span className="mt-1 whitespace-pre-line text-center text-sm font-medium leading-[18px] text-textPrimary">
              {action.title}
            </span>
          </button>
        ))}
      </div>
      <Link
        href="/search"
        data-section="search-bar"
        data-gtm-id="home-search-bar"
        aria-label="홈 검색창"
        onClick={() =>
          trackEvent("search_click", {
            screen_name: "home",
            entry_point: "home_search_bar",
          })
        }
        className="mt-3 flex h-10 w-[353px] items-center rounded-[14px] bg-white px-[15px] text-left shadow-soft"
      >
        <SystemIcon
          name="search"
          className="mr-2 h-5 w-5 shrink-0 text-[#6b7280]"
          strokeWidth={2}
        />
        <span className="w-full text-sm font-medium leading-[14px] text-textMuted">
          병원, 진료 , 약 , 증상을 검색해보세요
        </span>
      </Link>
    </section>
  );
}
