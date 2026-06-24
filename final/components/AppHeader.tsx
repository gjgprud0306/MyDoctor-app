"use client";

import Image from "next/image";
import Link from "next/link";
import { IosStatusBar } from "@/components/IosStatusBar";
import { trackEvent } from "@/lib/analytics";

const headerIcons = [
  { label: "혜택", src: "/assets/icons/header/gift.png", left: 269 },
  { label: "검색", src: "/assets/icons/header/search.png", left: 309 },
  { label: "알림", src: "/assets/icons/header/notification.png", left: 349, badge: true },
];

export function AppHeader() {
  return (
    <header data-section="header" className="app-header h-[98px] bg-appBg">
      <IosStatusBar variant="home" />
      <div className="relative h-12">
        <Image
          src="/assets/logos/brand-logo.png"
          alt="나만의Dr."
          width={109}
          height={39}
          priority
          unoptimized
          className="absolute left-5 top-1 h-[39px] w-[109px] object-contain"
        />
        <div className="absolute left-0 top-0 h-12 w-full">
          {headerIcons.map((icon) => {
            const content = (
              <>
                <Image
                  src={icon.src}
                  alt=""
                  width={24}
                  height={24}
                  unoptimized
                  className="h-6 w-6 object-contain"
                />
                {icon.badge ? (
                  <span className="absolute left-3 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#f04242] px-1 text-[10px] font-bold leading-none text-white">
                    N
                  </span>
                ) : null}
              </>
            );

            if (icon.label === "검색") {
              return (
                <Link
                  key={icon.label}
                  href="/search"
                  aria-label="홈 검색창"
                  data-gtm-id="home-search-bar"
                  onClick={() =>
                    trackEvent("search_click", {
                      screen_name: "home",
                      entry_point: "home_search_bar",
                    })
                  }
                  className="absolute top-3 grid h-6 w-6 place-items-center"
                  style={{ left: icon.left }}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={icon.label}
                type="button"
                aria-label={icon.label}
                className="absolute top-3 grid h-6 w-6 place-items-center"
                style={{ left: icon.left }}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
