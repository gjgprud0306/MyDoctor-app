"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getScreenNameForPath, trackPageView } from "@/lib/analytics";

export function GtmRouteEvents() {
  const pathname = usePathname();
  const trackedPathRef = useRef("");

  useEffect(() => {
    const pagePath = `${pathname}${window.location.search}`;

    if (trackedPathRef.current === pagePath) {
      return;
    }

    trackedPathRef.current = pagePath;
    trackPageView(getScreenNameForPath(pathname));
  }, [pathname]);

  return null;
}
