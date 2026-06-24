"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (
    command: "config",
    measurementId: string,
    parameters: Record<string, string | boolean>,
  ) => void;
};

type GtmRouteEventsProps = {
  measurementId: string;
};

export function GtmRouteEvents({ measurementId }: GtmRouteEventsProps) {
  const pathname = usePathname();
  const trackedPathRef = useRef("");

  useEffect(() => {
    const analyticsWindow = window as AnalyticsWindow;
    const pagePath = `${pathname}${window.location.search}`;

    if (trackedPathRef.current === pagePath) {
      return;
    }

    trackedPathRef.current = pagePath;
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
    analyticsWindow.gtag?.("config", measurementId, {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
      send_page_view: true,
    });
  }, [measurementId, pathname]);

  return null;
}
