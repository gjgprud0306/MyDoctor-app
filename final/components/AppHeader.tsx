"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IosStatusBar } from "@/components/IosStatusBar";
import { trackEvent } from "@/lib/analytics";

const notificationsReadKey = "mydoctor_notifications_read";

const headerIcons = [
  { label: "혜택", src: "/assets/icons/header/gift.png", right: 100 },
  { label: "검색", src: "/assets/icons/header/search.png", right: 60 },
  { label: "알림", src: "/assets/icons/header/notification.png", right: 20 },
];

export function AppHeader() {
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  useEffect(() => {
    const updateUnreadState = () => {
      setHasUnreadNotifications(window.localStorage.getItem(notificationsReadKey) !== "true");
    };

    updateUnreadState();
    window.addEventListener("focus", updateUnreadState);
    window.addEventListener("pageshow", updateUnreadState);
    window.addEventListener("notifications-read", updateUnreadState);

    return () => {
      window.removeEventListener("focus", updateUnreadState);
      window.removeEventListener("pageshow", updateUnreadState);
      window.removeEventListener("notifications-read", updateUnreadState);
    };
  }, []);

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
                {icon.label === "알림" && hasUnreadNotifications ? (
                  <span className="absolute right-0 top-0 h-[7px] w-[7px] rounded-full bg-[#f04242]" />
                ) : null}
              </>
            );

            if (icon.label === "검색") {
              return (
                <Link
                  key={icon.label}
                  href="/search"
                  aria-label="검색"
                  data-gtm-id="home-header-search"
                  onClick={() =>
                    trackEvent("search_click", {
                      screen_name: "home",
                      entry_point: "home_header_search",
                    })
                  }
                  className="absolute top-3 grid h-6 w-6 place-items-center"
                  style={{ right: icon.right }}
                >
                  {content}
                </Link>
              );
            }

            if (icon.label === "알림") {
              return (
                <Link
                  key={icon.label}
                  href="/notifications"
                  aria-label="알림"
                  data-gtm-id="home-notification-button"
                  onClick={() =>
                    trackEvent("cta_click", {
                      screen_name: "home",
                      button_name: "notification",
                    })
                  }
                  className="absolute top-3 grid h-6 w-6 place-items-center"
                  style={{ right: icon.right }}
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
                style={{ right: icon.right }}
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
