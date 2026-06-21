"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { hospitalList } from "@/lib/hospital-list-data";

const selectedHospital = hospitalList[0];
const timeSlots = ["13:00", "13:30", "14:00", "14:30", "15:00"];

function StatusBar() {
  return (
    <div className="relative h-[50px] text-black">
      <span className="absolute left-[55px] top-[21px] text-[17px] font-bold leading-[22px]">
        9:41
      </span>
      <div className="absolute right-[34px] top-[25px] flex h-[13px] items-start gap-[7px]">
        <span className="grid h-[13px] w-[19px] grid-cols-4 items-end gap-[2px]">
          <span className="h-[5px] rounded-[1px] bg-black" />
          <span className="h-[8px] rounded-[1px] bg-black" />
          <span className="h-[11px] rounded-[1px] bg-black" />
          <span className="h-[13px] rounded-[1px] bg-black" />
        </span>
        <span className="relative h-[13px] w-[18px]">
          <span className="absolute left-0 top-0 h-[8px] w-[18px] overflow-hidden">
            <span className="absolute left-0 top-0 h-[17px] w-[18px] rounded-t-full border-[4px] border-black border-b-0" />
          </span>
          <span className="absolute left-[4px] top-[5px] h-[6px] w-[10px] overflow-hidden">
            <span className="absolute left-0 top-0 h-[10px] w-[10px] rounded-t-full border-[4px] border-black border-b-0" />
          </span>
          <span className="absolute bottom-0 left-[7px] h-[4px] w-[4px] rounded-full bg-black" />
        </span>
        <span className="relative h-[13px] w-[27px] rounded-[4px] border border-black p-[2px]">
          <span className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
          <span className="block h-full w-full rounded-[2px] bg-black" />
        </span>
      </div>
    </div>
  );
}

export function HospitalDetailScreen() {
  const router = useRouter();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <StatusBar />
      <header className="relative h-[76px]">
        <button
          type="button"
          aria-label="병원 리스트로 돌아가기"
          onClick={() => router.push("/hospital-list")}
          className="absolute left-[16px] top-3 grid h-10 w-10 place-items-center"
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
        <h1 className="absolute left-[107px] top-4 w-[180px] text-center text-[18px] font-extrabold leading-7">
          병원 세부 정보
        </h1>
      </header>

      <section className="mx-4 h-[88px] w-[361px] rounded-[10px] border border-[#dce3ee] bg-white shadow-[0_6px_18px_rgba(17,24,39,0.04)]">
        <div className="relative h-full">
          <Image
            src={selectedHospital.image}
            alt=""
            width={62}
            height={72}
            priority
            unoptimized
            className="absolute left-3 top-2 h-[72px] w-[62px] rounded-[6px] object-cover"
          />
          <div className="absolute left-[98px] top-2">
            <h2 className="text-[20px] font-extrabold leading-7">
              {selectedHospital.name}
            </h2>
            <p className="mt-[3px] text-[13px] font-medium leading-[19px] text-[#6b7280]">
              내과 · 비만클리닉
            </p>
            <div className="mt-[3px] flex h-[18px] items-center text-[12px] font-medium leading-[18px] text-[#6b7280]">
              <span>95% (리뷰 999+)</span>
              <span className="mx-[6px] h-[10px] w-px bg-[#dce3ee]" />
              <span>평균대기 7분</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 mt-[14px] w-[361px]">
        <h2 className="text-[20px] font-extrabold leading-[26px]">
          진료 가능 시간
        </h2>
        <p className="mt-3 text-[14px] font-semibold leading-5 text-[#6b7280]">
          오늘 06.24 (화)
        </p>
        <div className="mt-2 flex h-12 gap-2">
          {timeSlots.map((time) => {
            const selected = time === "13:30";
            return (
              <button
                key={time}
                type="button"
                className={`h-12 w-[63px] rounded-[6px] border text-[14px] font-semibold leading-5 ${
                  selected
                    ? "border-[#2f70ff] bg-[#f0f6ff] text-[#2f70ff]"
                    : "border-[#dce3ee] bg-white text-[#111827]"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="mt-2 h-[38px] w-[361px] rounded-[8px] border border-[#dce3ee] bg-white text-[13px] font-semibold leading-[18px] text-[#4b5563]"
        >
          다른 날짜 보기
        </button>
      </section>

      <section className="mx-4 mt-6 h-[58px] w-[361px] rounded-[10px] bg-[#f6f9ff]">
        <div className="relative h-full">
          <div className="absolute left-3 top-[11px]">
            <p className="text-[10px] font-medium leading-[15px] text-[#6b7280]">
              나만의닥터 전용가
            </p>
            <h2 className="text-[14px] font-extrabold leading-[21px]">
              진료비 + 약제비
            </h2>
          </div>
          <strong className="absolute right-3 top-4 text-[22px] font-extrabold leading-[26px] text-[#1268ff]">
            315,000원
          </strong>
        </div>
      </section>

      <section className="mx-4 mt-3 h-[54px] w-[361px] rounded-[10px] border border-[#e5eaf3] bg-white">
        <div className="px-3 py-[9px]">
          <h2 className="text-[13px] font-bold leading-[18px] text-[#4b5563]">
            예약 변경 · 취소는 마이페이지에서 가능해요
          </h2>
          <p className="text-[11px] font-medium leading-4 text-[#8a94a6]">
            예약 시간 10분 전까지 변경/취소가 가능해요.
          </p>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 mx-auto h-40 w-full max-w-[393px] border-t border-[#eef2f7] bg-white px-4 pt-4">
        <div className="flex h-9 justify-between">
          <div>
            <p className="text-[10px] font-medium leading-[15px] text-[#6b7280]">
              선택한 시간
            </p>
            <p className="text-[16px] font-extrabold leading-[22px]">
              06.24 (화) 13:30
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium leading-[15px] text-[#6b7280]">
              총 결제 예상 금액
            </p>
            <p className="text-[22px] font-extrabold leading-6 text-[#1268ff]">
              315,000원
            </p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 h-12 w-[361px] rounded-[8px] bg-[#2f70ff] text-[16px] font-extrabold leading-6 text-white"
        >
          예약하기
        </button>
        <div className="mx-auto mt-8 h-[5px] w-[135px] rounded-full bg-black" />
      </div>
    </main>
  );
}
