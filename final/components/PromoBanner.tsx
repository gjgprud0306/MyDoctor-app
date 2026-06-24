"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export function PromoBanner() {
  const bannerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;

    if (!banner) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("home_banner_impression", {
            page_name: "home",
            banner_id: "diet_compare_main",
            position: "main",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(banner);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-section="promo-banner"
      className="-mt-[3px] h-[226px] bg-[#f4f4f4] px-5 pt-3"
    >
      <Link
        ref={bannerRef}
        href="/high-return-hospital-list"
        data-section="promo-image"
        data-gtm-id="home-banner-diet-compare"
        className="block h-[202px] w-[352px] overflow-hidden rounded-[14px]"
        aria-label="다이어트 병원 비교 배너"
        onClick={() => {
          trackEvent("cta_click", {
            screen_name: "home",
            button_name: "diet_compare_banner",
            banner_id: "diet_compare_main",
            entry_point: "home",
            destination: "diet_flow",
          });
        }}
      >
        <Image
          src="/assets/images/banners/promo-diet-compare.png"
          alt="다이어트 최저가 병원 비교"
          width={352}
          height={202}
          priority
          unoptimized
          className="h-[202px] w-full object-cover"
        />
      </Link>
    </section>
  );
}
