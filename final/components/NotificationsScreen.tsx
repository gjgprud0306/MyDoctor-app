"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IosStatusBar } from "@/components/IosStatusBar";
import { trackEvent } from "@/lib/analytics";

const notificationsReadKey = "mydoctor_notifications_read";

const notifications = [
  {
    type: "예약 확정",
    message: "분당원클리닉 예약이 완료되었습니다.",
    time: "방금 전",
  },
  {
    type: "예약 안내",
    message: "내일 오전 9시 진료가 있습니다.",
    time: "1시간 전",
  },
  {
    type: "최저가 병원",
    message: "299,000원 병원이 새로 등록되었습니다.",
    time: "오늘 오전 10:20",
  },
  {
    type: "이벤트",
    message: "첫 예약 쿠폰이 지급되었습니다.",
    time: "어제 오후 6:10",
  },
];

export function NotificationsScreen() {
  const router = useRouter();

  useEffect(() => {
    window.localStorage.setItem(notificationsReadKey, "true");
    window.dispatchEvent(new Event("notifications-read"));
    trackEvent("notification_view", {
      page_name: "notifications",
      notification_count: notifications.length,
    });
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-14 bg-white">
        <button
          type="button"
          aria-label="홈으로 돌아가기"
          onClick={() => {
            trackEvent("back_click", {
              screen_name: "notifications",
              destination: "home",
            });
            router.push("/");
          }}
          className="absolute left-4 top-2 grid h-10 w-10 place-items-center"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="m15 18-6-6 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <h1 className="absolute left-[126px] top-4 w-[141px] text-center text-[18px] font-bold leading-6">
          알림
        </h1>
      </header>

      <section className="px-5 pt-5">
        <div className="flex flex-col gap-3">
          {notifications.map((notification) => (
            <article
              key={`${notification.type}-${notification.message}`}
              className="rounded-[14px] border border-[#eef2f7] bg-white p-4 shadow-soft"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-bold leading-[18px] text-[#2f70ff]">
                  {notification.type}
                </span>
                <time className="text-[11px] font-medium leading-4 text-[#9ca3af]">
                  {notification.time}
                </time>
              </div>
              <p className="mt-2 text-[14px] font-semibold leading-5 text-[#111827]">
                {notification.message}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
