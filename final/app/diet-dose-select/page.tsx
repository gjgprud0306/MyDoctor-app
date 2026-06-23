import { Suspense } from "react";
import { DietDoseSelectScreen } from "@/components/DietDoseSelectScreen";

export default function DietDoseSelectPage() {
  return (
    <Suspense fallback={null}>
      <DietDoseSelectScreen />
    </Suspense>
  );
}
