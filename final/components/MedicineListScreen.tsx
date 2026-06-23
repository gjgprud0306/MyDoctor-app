"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MedicineCard } from "@/components/MedicineCard";
import { medicines } from "@/lib/medicine-data";

const cardTops = [160, 270, 390, 510];

type MedicineListScreenProps = {
  onMedicineSelect?: (medicineId: string) => void;
};

export function MedicineListScreen({ onMedicineSelect }: MedicineListScreenProps) {
  const router = useRouter();
  const selectMedicine = (medicineId: string) => {
    if (onMedicineSelect) {
      onMedicineSelect(medicineId);
      return;
    }

    router.push(`/diet-dose-select?medicine=${medicineId}`);
  };

  return (
    <main className="mx-auto h-[747px] w-full max-w-[393px] bg-white">
      <div className="relative h-full overflow-hidden">
        <div className="absolute left-0 top-0 h-[46px] w-full">
          <div className="absolute left-[173px] top-4 h-[6px] w-12 rounded-full bg-[#d1d5db]" />
        </div>

        <section className="absolute left-0 top-[46px] h-[116px] w-full px-5">
          <h1 className="h-16 whitespace-pre-line text-[23px] font-bold leading-8 text-[#111827]">
            {"다이어트 진료는\n'최저가 병원예약'만 가능해요"}
          </h1>
          <p className="mt-2 text-[13px] font-medium leading-5 text-[#6b7280]">
            비대면 만큼 저렴한 동네 병원을 예약해보세요!
          </p>
        </section>

        {medicines.map((item, index) => (
          <MedicineCard
            key={item.name}
            item={item}
            top={cardTops[index]}
            onSelect={item.doses ? () => selectMedicine(item.id) : undefined}
          />
        ))}

        <section className="absolute left-5 top-[634px] h-[61px] w-[353px] rounded-[14px] bg-[#f0f6ff]">
          <Image
            src="/assets/images/medicines/info-shield.png"
            alt=""
            width={52}
            height={52}
            unoptimized
            className="absolute left-3 top-1 h-[52px] w-[52px] object-contain"
          />
          <div className="absolute left-[82px] top-[14px]">
            <h2 className="text-[12px] font-semibold leading-4 text-[#374151]">
              약에 대해 궁금하신가요?
            </h2>
            <p className="mt-1 text-[10px] font-medium leading-[13px] text-[#6b7280]">
              약 효과, 부작용, 복용법을 확인해보세요.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/medicine-info")}
            className="absolute left-[258px] top-[18px] h-6 w-[77px] rounded-[12px] bg-white text-[11px] font-semibold leading-4 text-[#4b5563]"
          >
            약 정보 보기
          </button>
        </section>
      </div>
    </main>
  );
}
