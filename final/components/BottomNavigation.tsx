"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  {
    label: "홈",
    icon: "home" as const,
    active: true,
    gtmId: "bottom-nav-home",
    tabName: "home",
  },
  {
    label: "혜택",
    icon: "benefits" as const,
    active: false,
    gtmId: "bottom-nav-reservation",
    tabName: "reservation",
  },
  {
    label: "건강관리",
    icon: "health" as const,
    active: false,
    gtmId: "bottom-nav-favorite",
    tabName: "favorite",
  },
  {
    label: "의료기록",
    icon: "records" as const,
    active: false,
    gtmId: "bottom-nav-my-clinic",
    tabName: "my_clinic",
  },
  {
    label: "내 정보",
    icon: "profile" as const,
    active: false,
    gtmId: "bottom-nav-my-page",
    tabName: "my_page",
  },
];

export function BottomNavigation({ currentPage = "home" }: { currentPage?: string }) {
  return (
    <nav
      data-section="bottom-navigation"
      className="bottom-navigation fixed bottom-0 left-0 right-0 z-10 mx-auto h-[94px] w-full max-w-[390px] bg-white"
      aria-label="하단 탭"
    >
      <div className="grid h-[60px] grid-cols-5 py-[6px]">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            data-gtm-id={item.gtmId}
            aria-label={`${item.label} 탭`}
            aria-current={item.active ? "page" : undefined}
            onClick={() =>
              trackEvent("tab_click", {
                screen_name: currentPage,
                tab_name: item.tabName,
                current_page: currentPage,
              })
            }
            className="flex h-[48px] flex-col items-center justify-center gap-[2px]"
          >
            <Image src={`/assets/icons/bottom-nav/${item.icon}.svg`} alt="" width={24} height={24} unoptimized />
            <span
              className={`whitespace-nowrap text-[10px] font-normal leading-[14px] ${
                item.active
                  ? "text-[#2f6eff]"
                  : "text-[#9ca3af]"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <div className="home-indicator relative h-[34px] bg-white">
        <div className="absolute bottom-2 left-1/2 h-[4px] w-36 -translate-x-1/2 rounded-full bg-black" />
      </div>
    </nav>
  );
}
