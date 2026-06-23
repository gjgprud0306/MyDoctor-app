import { Suspense } from "react";
import { ReservationCompleteScreen } from "@/components/ReservationCompleteScreen";

export default function ReservationCompletePage() {
  return (
    <Suspense fallback={null}>
      <ReservationCompleteScreen />
    </Suspense>
  );
}
