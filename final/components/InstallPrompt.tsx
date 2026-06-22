"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type PromptMode = "android" | "ios";

function isIosDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIpadDesktopMode =
    window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;

  return /iphone|ipad|ipod/.test(userAgent) || isIpadDesktopMode;
}

function isIosStandalone() {
  return (
    typeof window !== "undefined" &&
    "standalone" in window.navigator &&
    Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

export function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [promptMode, setPromptMode] = useState<PromptMode | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isIosStandalone()) {
      return;
    }

    if (isIosDevice()) {
      setPromptMode("ios");
      setIsVisible(true);
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setPromptMode("android");
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setInstallEvent(null);
      setIsVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!installEvent) {
      return;
    }

    await installEvent.prompt();
    await installEvent.userChoice.catch(() => undefined);
    setInstallEvent(null);
    setPromptMode(null);
    setIsVisible(false);
  };

  if (!isVisible || !promptMode) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[353px] -translate-x-1/2 rounded-[12px] border border-[#dce3ee] bg-white px-4 py-3 shadow-[0_12px_28px_rgba(17,24,39,0.14)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[13px] font-semibold leading-[18px] text-[#111827]">
            나만의닥터를 홈 화면에 추가
          </p>
          <p className="mt-1 text-[11px] font-medium leading-4 text-[#6b7280]">
            {promptMode === "ios"
              ? "공유 버튼을 누른 뒤 홈 화면에 추가를 선택해주세요."
              : "더 빠르게 진료 예약을 시작할 수 있어요."}
          </p>
        </div>
        {promptMode === "android" ? (
          <button
            type="button"
            onClick={install}
            className="h-9 w-[76px] shrink-0 rounded-[8px] bg-[#2f70ff] text-[13px] font-semibold leading-5 text-white"
          >
            설치
          </button>
        ) : (
          <div className="grid h-9 w-[76px] shrink-0 place-items-center rounded-[8px] bg-[#f0f6ff] text-[13px] font-semibold leading-5 text-[#2f70ff]">
            공유
          </div>
        )}
      </div>
      <button
        type="button"
        aria-label="설치 안내 닫기"
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-2 grid h-5 w-5 place-items-center text-[#8a94a6]"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
          <path
            d="m5 5 10 10M15 5 5 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
}
