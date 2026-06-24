"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getScreenNameForPath, trackPageView } from "@/lib/analytics";

type GtmRouteEventsProps = {
  measurementId: string;
};

export function GtmRouteEvents({ measurementId }: GtmRouteEventsProps) {
  const pathname = usePathname();
  const trackedPathRef = useRef("");

  useEffect(() => {
    const pagePath = `${pathname}${window.location.search}`;

    if (trackedPathRef.current === pagePath) {
      return;
    }

    trackedPathRef.current = pagePath;
    trackPageView(getScreenNameForPath(pathname), {
      ga_measurement_id: measurementId,
    });
  }, [measurementId, pathname]);

  return null;
}
