"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IosStatusBar } from "@/components/IosStatusBar";
import { hospitalList } from "@/lib/hospital-list-data";

function FilterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M4 7h16M8 12h8M10 17h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function HospitalCard({
  item,
  onSelect,
}: {
  item: (typeof hospitalList)[number];
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative h-[116px] w-[349px] rounded-[12px] border border-[#d7e3ff] bg-white text-left shadow-[0_6px_18px_rgba(47,112,255,0.08)]"
    >
      <Image
        src={item.image}
        alt=""
        width={80}
        height={92}
        unoptimized
        className="absolute left-3 top-3 h-[92px] w-20 rounded-[8px] object-cover"
      />
      <div className="absolute left-[104px] top-4">
        <h2 className="text-[14px] font-extrabold leading-[18px] text-[#111827]">
          {item.name}
        </h2>
        <div className="mt-[7px] flex items-center gap-[6px]">
          <span className="rounded-[8px] bg-[#e8fff2] px-[6px] text-[9px] font-bold leading-[16px] text-[#0bbf72]">
            가격 인증
          </span>
          <span className="text-[10px] font-medium leading-[16px] text-[#6b7280]">
            {item.hours}
          </span>
        </div>
        <p className="mt-[5px] text-[10px] font-medium leading-[14px] text-[#6b7280]">
          {item.distance}
        </p>
        <p className="mt-[6px] text-[10px] font-semibold leading-[14px] text-[#4b5563]">
          {item.wait}
        </p>
      </div>
      <div className="absolute right-4 top-[50px] rounded-[12px] bg-[#dcfce7] px-[10px] text-[10px] font-bold leading-6 text-[#00a866]">
        {item.saving}
      </div>
      <strong className="absolute bottom-[13px] right-4 text-[17px] font-extrabold leading-[22px] text-[#1268ff]">
        {item.price}
      </strong>
    </button>
  );
}

export function HospitalListScreen() {
  const router = useRouter();

  return (
    <main className="mx-auto h-screen w-full max-w-[393px] overflow-hidden bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-14">
        <button
          type="button"
          aria-label="수령 방법 선택으로 돌아가기"
          onClick={() => router.push("/pickup-method")}
          className="absolute left-5 top-2 grid h-10 w-10 place-items-center"
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
        <h1 className="absolute left-[134px] top-4 text-[16px] font-bold leading-6">
          다이어트 주사 예약
        </h1>
        <button
          type="button"
          aria-label="찜하기"
          className="absolute right-5 top-2 grid h-10 w-10 place-items-center"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M20.8 8.6c0 5.2-8.8 10.4-8.8 10.4S3.2 13.8 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </header>

      <div className="h-[calc(100vh-106px)] overflow-y-auto pb-28 mobile-scrollbar">
        <section className="relative mx-[22px] mt-[10px] h-[168px] w-[349px] overflow-hidden rounded-[14px]">
          <Image
            src="/assets/images/medicines/hospital-list-map.png"
            alt="병원 위치 지도"
            width={349}
            height={168}
            priority
            unoptimized
            className="h-[168px] w-[349px] rounded-[14px] object-cover"
          />
        </section>

        <section className="mx-[22px] mt-4 flex h-[38px] w-[349px] items-center gap-[10px]">
          <button className="h-8 w-[78px] rounded-[16px] bg-[#2f70ff] text-[12px] font-bold leading-4 text-white">
            추천순
          </button>
          <button className="h-8 w-[78px] rounded-[16px] border border-[#dce3ee] bg-white text-[12px] font-bold leading-4 text-[#111827]">
            가격순
          </button>
          <button className="h-8 w-[90px] rounded-[16px] border border-[#dce3ee] bg-white text-[12px] font-bold leading-4 text-[#111827]">
            대기 짧은순
          </button>
          <button
            aria-label="필터"
            className="grid h-8 w-[33px] place-items-center rounded-[16px] border border-[#dce3ee] bg-white text-[#6b7280]"
          >
            <FilterIcon />
          </button>
        </section>

        <section className="mx-[22px] mt-4 flex w-[349px] flex-col gap-4">
          {hospitalList.map((item) => (
            <HospitalCard
              key={item.name}
              item={item}
              onSelect={() => router.push("/hospital-detail")}
            />
          ))}
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto h-20 w-full max-w-[393px] bg-white pt-[10px] shadow-[0_-8px_24px_rgba(17,24,39,0.08)]">
        <button
          type="button"
          className="mx-[22px] h-14 w-[349px] rounded-[8px] bg-[#2f70ff] text-[16px] font-extrabold leading-6 text-white"
        >
          병원 선택하기
        </button>
      </div>
    </main>
  );
}
