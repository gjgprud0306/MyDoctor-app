"use client";

export type ScreenName = "home" | "search" | "detail" | "cart" | "mypage";

type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsParameters = Record<string, AnalyticsValue>;

const DEFAULT_SCREEN_NAME: ScreenName = "home";
const DEFAULT_TESTER_ID = "dev";
const VALID_TESTER_IDS = ["tester_01", "tester_02", "tester_03", "dev"] as const;
const ENABLE_DIRECT_GA4_EVENTS = process.env.NEXT_PUBLIC_ENABLE_GA4_DIRECT_EVENTS !== "false";
const SCREEN_BY_PATH: Array<{ pattern: RegExp; screenName: ScreenName }> = [
  { pattern: /^\/$/, screenName: "home" },
  { pattern: /^\/search\/?$/, screenName: "search" },
  { pattern: /^\/hospital-detail\/?$/, screenName: "detail" },
  { pattern: /^\/my-reservation\/?$/, screenName: "mypage" },
  { pattern: /^\/(medicine-list|medicine-info|diet-dose-select|pickup-method|hospital-list|no-extra-fee-hospital-list|high-return-hospital-list|reservation-complete)\/?$/, screenName: "cart" },
];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, parameters?: AnalyticsParameters) => void;
  }
}

function getSearchParams() {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }

  return new URLSearchParams(window.location.search);
}

function getCurrentScreenName(): ScreenName {
  if (typeof window === "undefined") {
    return DEFAULT_SCREEN_NAME;
  }

  return (
    SCREEN_BY_PATH.find(({ pattern }) => pattern.test(window.location.pathname))?.screenName ??
    DEFAULT_SCREEN_NAME
  );
}

function getUtmContext() {
  const searchParams = getSearchParams();
  const utmSource = searchParams.get("utm_source") ?? "";
  const utmContent = searchParams.get("utm_content") ?? "";
  const testerId = VALID_TESTER_IDS.some((validTesterId) => validTesterId === utmContent)
    ? utmContent
    : DEFAULT_TESTER_ID;

  return {
    tester_id: testerId,
    utm_source: utmSource,
    utm_content: utmContent,
  };
}

function isDebugModeEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  const searchParams = getSearchParams();

  return (
    process.env.NODE_ENV !== "production" ||
    searchParams.get("debug_mode") === "true" ||
    searchParams.get("debug_mode") === "1" ||
    searchParams.has("gtm_debug") ||
    searchParams.has("gtm_preview")
  );
}

function buildEventParameters(parameters: AnalyticsParameters = {}) {
  const {
    screen_name: screenNameFromParams,
    tester_id: _testerId,
    utm_source: _utmSource,
    utm_content: _utmContent,
    timestamp: _timestamp,
    ...restParameters
  } = parameters;
  const commonParameters: AnalyticsParameters = {
    screen_name: screenNameFromParams ?? getCurrentScreenName(),
    ...getUtmContext(),
    timestamp: new Date().toISOString(),
  };
  const debugParameters: AnalyticsParameters = isDebugModeEnabled()
    ? { debug_mode: true }
    : {};

  return Object.fromEntries(
    Object.entries({
      ...commonParameters,
      ...debugParameters,
      ...restParameters,
    }).filter(([, value]) => value !== undefined),
  ) as AnalyticsParameters;
}

export function getScreenNameForPath(pathname: string): ScreenName {
  return SCREEN_BY_PATH.find(({ pattern }) => pattern.test(pathname))?.screenName ?? DEFAULT_SCREEN_NAME;
}

export function trackUtEvent(eventName: string, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const eventParameters = buildEventParameters(parameters);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventParameters,
  });

  if (ENABLE_DIRECT_GA4_EVENTS) {
    window.gtag?.("event", eventName, eventParameters);
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[UT Analytics]", eventName, eventParameters);
  }
}

export function trackPageView(screenName: ScreenName, parameters: AnalyticsParameters = {}) {
  trackUtEvent("page_view", {
    screen_name: screenName,
    page_path: typeof window === "undefined" ? undefined : `${window.location.pathname}${window.location.search}`,
    page_location: typeof window === "undefined" ? undefined : window.location.href,
    page_title: typeof document === "undefined" ? undefined : document.title,
    ...parameters,
  });
}

export function trackEvent(eventName: string, parameters: AnalyticsParameters = {}) {
  trackUtEvent(eventName, parameters);
}

export function sanitizeDoseId(dose: string) {
  return dose.toLowerCase().replace(".", "_").replace(/[^a-z0-9_]/g, "");
}
