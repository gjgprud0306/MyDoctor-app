import { Suspense } from "react";
import { MyReservationScreen } from "@/components/MyReservationScreen";

export default function MyReservationPage() {
  return (
    <Suspense fallback={null}>
      <MyReservationScreen />
    </Suspense>
  );
}
