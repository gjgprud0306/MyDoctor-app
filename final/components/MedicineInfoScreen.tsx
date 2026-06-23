"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IosStatusBar } from "@/components/IosStatusBar";
import { medicines } from "@/lib/medicine-data";

const medicineDetails = [
  {
    id: "mounjaro",
    effect: "식욕 억제와 혈당 조절을 도와 체중 감량에 도움을 줄 수 있어요.",
    sideEffect: "메스꺼움, 구토, 설사, 변비, 복부 불편감이 나타날 수 있어요.",
    usage: "주 1회 정해진 요일에 피하 주사로 사용해요.",
  },
  {
    id: "wegovy",
    effect: "포만감을 높이고 식욕을 줄여 체중 관리에 도움을 줄 수 있어요.",
    sideEffect: "메스꺼움, 소화불량, 설사, 변비, 두통이 나타날 수 있어요.",
    usage: "주 1회 같은 요일에 단계적으로 용량을 조절해 사용해요.",
  },
  {
    id: "saxenda",
    effect: "식욕을 낮추고 포만감을 유지해 체중 감량에 도움을 줄 수 있어요.",
    sideEffect: "주사 부위 반응, 메스꺼움, 구토, 어지러움이 나타날 수 있어요.",
    usage: "하루 1회 피하 주사로 사용하며 상담 후 용량을 조절해요.",
  },
  {
    id: "oral-diet",
    effect: "식욕 조절 또는 체지방 감소를 보조해 체중 관리에 도움을 줄 수 있어요.",
    sideEffect: "입마름, 불면, 두근거림, 소화불량 등이 나타날 수 있어요.",
    usage: "처방에 따라 정해진 시간과 횟수에 맞춰 복용해요.",
  },
];

function BackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="m15 18-6-6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MedicineInfoCard({ detail }: { detail: (typeof medicineDetails)[number] }) {
  const medicine = medicines.find((item) => item.id === detail.id) ?? medicines[0];
  const isOral = medicine.id === "oral-diet";

  return (
    <article className="rounded-[18px] border border-[#e5eaf2] bg-white p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="grid h-[78px] w-[78px] place-items-center rounded-[18px] bg-[#f5f8ff]">
          <Image
            src={medicine.image}
            alt=""
            width={medicine.imageSize}
            height={medicine.imageSize}
            unoptimized
            className="object-contain"
            style={{
              width: medicine.imageSize,
              height: medicine.imageSize,
            }}
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-[18px] font-bold leading-6 text-[#111827]">{medicine.name}</h2>
          <p className="mt-1 text-[12px] font-semibold leading-[17px] text-[#6b7280]">
            {isOral ? "구분" : "성분"}: {medicine.ingredient}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="rounded-[14px] bg-[#f6f9ff] p-3">
          <h3 className="text-[12px] font-bold leading-4 text-[#1268ff]">효과</h3>
          <p className="mt-[5px] text-[12px] font-medium leading-[18px] text-[#4b5563]">
            {detail.effect}
          </p>
        </div>
        <div className="rounded-[14px] bg-[#fafbfc] p-3">
          <h3 className="text-[12px] font-bold leading-4 text-[#374151]">부작용</h3>
          <p className="mt-[5px] text-[12px] font-medium leading-[18px] text-[#4b5563]">
            {detail.sideEffect}
          </p>
        </div>
        <div className="rounded-[14px] bg-[#fafbfc] p-3">
          <h3 className="text-[12px] font-bold leading-4 text-[#374151]">
            {isOral ? "복용 방법" : "사용 방법"}
          </h3>
          <p className="mt-[5px] text-[12px] font-medium leading-[18px] text-[#4b5563]">
            {detail.usage}
          </p>
        </div>
      </div>
    </article>
  );
}

export function MedicineInfoScreen() {
  const router = useRouter();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[393px] bg-white text-[#111827]">
      <IosStatusBar />
      <header className="relative h-14 bg-white">
        <button
          type="button"
          aria-label="약 리스트로 돌아가기"
          onClick={() => router.push("/medicine-list")}
          className="absolute left-4 top-2 grid h-10 w-10 place-items-center"
        >
          <BackIcon />
        </button>
        <h1 className="absolute left-[96px] top-4 w-[201px] text-center text-[17px] font-bold leading-6">
          약 정보
        </h1>
      </header>

      <section className="px-5 pb-10 pt-5">
        <div className="rounded-[20px] bg-white p-5">
          <p className="text-[20px] font-bold leading-7 text-[#111827]">
            약 효과, 부작용, 복용법을 확인해보세요
          </p>
          <p className="mt-2 text-[13px] font-medium leading-[19px] text-[#6b7280]">
            처방 전 궁금한 정보를 한눈에 비교할 수 있도록 정리했어요.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {medicineDetails.map((detail) => (
            <MedicineInfoCard key={detail.id} detail={detail} />
          ))}
        </div>
      </section>
    </main>
  );
}
