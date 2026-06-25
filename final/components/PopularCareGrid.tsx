"use client";

import Image from "next/image";
import type { CareItem } from "@/lib/home-data";
import { trackEvent } from "@/lib/analytics";

type PopularCareGridProps = {
  items: CareItem[];
  onDietClick?: () => void;
};

export function PopularCareGrid({ items, onDietClick }: PopularCareGridProps) {
  const featured = items.filter((item) => !item.compact);
  const compact = items.filter((item) => item.compact);
  const getAnalyticsMeta = (title: string, index: number) => {
    if (title === "다이어트") {
      return { serviceType: "diet", gtmId: "home-service-diet", position: "popular_1" };
    }

    if (title === "탈모") {
      return { serviceType: "hair_loss", gtmId: "home-service-hair-loss", position: "popular_2" };
    }

    if (title === "감기 · 비염") {
      return { serviceType: "cold", gtmId: "home-service-cold", position: "popular_3" };
    }

    if (title === "인공눈물") {
      return {
        serviceType: "artificial_tears",
        gtmId: "home-service-artificial-tears",
        position: "popular_4",
      };
    }

    return { serviceType: "general", gtmId: "home-service-general", position: `popular_${index + 1}` };
  };

  const trackServiceClick = (title: string, index: number) => {
    const meta = getAnalyticsMeta(title, index);

    trackEvent("cta_click", {
      screen_name: "home",
      button_name: "home_service",
      service_type: meta.serviceType,
      section_name: "popular_services",
      position: meta.position,
      entry_point: "service_card",
    });
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-[17px] px-4 pb-3 pt-[5px]">
        {featured.map((item, index) => {
          const meta = getAnalyticsMeta(item.title, index);

          return (
          <button
            key={item.title}
            type="button"
            data-gtm-id={meta.gtmId}
            aria-label={`${item.title} 진료 카드`}
            onClick={() => {
              trackServiceClick(item.title, index);
              if (item.title === "다이어트") {
                onDietClick?.();
              }
            }}
            className="flex h-[110px] items-end justify-between overflow-hidden rounded-[14px] bg-white px-1 py-[11px] text-left"
          >
            <div className="flex h-[88px] w-[81px] flex-col justify-between rounded-[14px]">
              <span className="grid h-5 w-[37px] place-items-center rounded-[14px] bg-primary text-xs font-medium leading-none tracking-[-0.02em] text-white">
                HOT
              </span>
              <div className="pl-2">
                <h3 className="text-sm font-medium leading-[18px] tracking-[-0.02em] text-black">
                  {item.title}
                </h3>
                <p className="mt-0.5 whitespace-nowrap text-[10px] font-medium leading-[13px] tracking-[-0.02em] text-figmaMuted">
                  {item.subtitle}
                </p>
              </div>
            </div>
            <Image
              src={item.icon}
              alt=""
              width={78}
              height={78}
              unoptimized
              className="h-[78px] w-[78px] object-contain"
            />
          </button>
        );
        })}
      </div>
      <div className="grid grid-cols-2 gap-[14px] px-4 py-2.5">
        {compact.map((item, index) => {
          const itemIndex = featured.length + index;
          const meta = getAnalyticsMeta(item.title, itemIndex);

          return (
          <button
            key={item.title}
            type="button"
            data-gtm-id={meta.gtmId}
            aria-label={`${item.title} 진료 카드`}
            onClick={() => trackServiceClick(item.title, itemIndex)}
            className="relative h-16 overflow-hidden rounded-xl bg-white text-left"
          >
            <div className="absolute left-3 top-[15px] w-[88px]">
              <h3 className="text-sm font-medium leading-[18px] tracking-[-0.02em] text-black">
                {item.title}
              </h3>
              <p className="mt-0.5 whitespace-nowrap text-[10px] font-medium leading-[13px] tracking-[-0.02em] text-figmaMuted">
                {item.subtitle}
              </p>
            </div>
            <Image
              src={item.icon}
              alt=""
              width={52}
              height={52}
              unoptimized
              className="absolute right-5 top-1.5 h-[52px] w-[52px] object-contain"
            />
          </button>
        );
        })}
      </div>
    </section>
  );
}
