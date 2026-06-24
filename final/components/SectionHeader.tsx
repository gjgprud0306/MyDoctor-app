"use client";

import Link from "next/link";
import { SystemIcon } from "@/components/SystemIcon";
import { trackEvent } from "@/lib/analytics";

type SectionHeaderProps = {
  title: string;
  viewAllHref?: string;
  analyticsSectionName?: "popular_services" | "nearby_top3";
};

export function SectionHeader({ title, viewAllHref, analyticsSectionName }: SectionHeaderProps) {
  const actionClassName =
    "flex items-center gap-0.5 text-xs font-medium leading-4 text-[#9ca3af]";
  const actionLabel =
    analyticsSectionName === "popular_services"
      ? "많이 찾는 진료 전체보기"
      : analyticsSectionName === "nearby_top3"
        ? "가까운 병원 전체보기"
        : `${title} 전체보기`;
  const actionContent = (
    <>
      전체보기
      <SystemIcon name="chevronRight" className="h-4 w-4" strokeWidth={2.2} />
    </>
  );

  return (
    <div className="flex h-[49px] items-end justify-between px-4 pb-2">
      <h2 className="text-base font-medium leading-[21px] tracking-[-0.02em] text-black">
        {title}
      </h2>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          data-gtm-id={analyticsSectionName === "nearby_top3" ? "home-section-nearby-more" : undefined}
          aria-label={actionLabel}
          onClick={() => {
            if (analyticsSectionName) {
              trackEvent("cta_click", {
                screen_name: "home",
                button_name: "section_more",
                section_name: analyticsSectionName,
              });
            }
          }}
          className={actionClassName}
        >
          {actionContent}
        </Link>
      ) : (
        <button
          type="button"
          data-gtm-id={analyticsSectionName === "popular_services" ? "home-section-popular-more" : undefined}
          aria-label={actionLabel}
          onClick={() => {
            if (analyticsSectionName) {
              trackEvent("cta_click", {
                screen_name: "home",
                button_name: "section_more",
                section_name: analyticsSectionName,
              });
            }
          }}
          className={actionClassName}
        >
          {actionContent}
        </button>
      )}
    </div>
  );
}
