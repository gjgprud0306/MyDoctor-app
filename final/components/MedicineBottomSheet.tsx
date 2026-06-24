"use client";

import { MedicineListScreen } from "@/components/MedicineListScreen";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type MedicineBottomSheetProps = {
  onClose: () => void;
  onMedicineSelect: (medicineId: string) => void;
  entryPoint: string;
};

export function MedicineBottomSheet({
  onClose,
  onMedicineSelect,
  entryPoint,
}: MedicineBottomSheetProps) {
  useEffect(() => {
    trackEvent("diet_price_sheet_view", {
      page_name: "diet_price_sheet",
      entry_point: entryPoint,
    });
  }, [entryPoint]);

  return (
    <div
      className="fixed inset-0 z-50 mx-auto max-w-[390px] animate-[dim-fade_160ms_ease-out] bg-black/55"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="다이어트 진료 리스트"
        className="absolute bottom-0 left-0 h-[78dvh] max-h-[747px] min-h-[590px] w-full animate-[sheet-up_200ms_ease-out] overflow-hidden rounded-t-[24px] bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="h-full overflow-y-auto mobile-scrollbar">
          <MedicineListScreen onMedicineSelect={onMedicineSelect} entryPoint={entryPoint} />
        </div>
      </section>
    </div>
  );
}
