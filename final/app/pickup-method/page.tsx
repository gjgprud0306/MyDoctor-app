import { Suspense } from "react";
import { PickupMethodScreen } from "@/components/PickupMethodScreen";

export default function PickupMethodPage() {
  return (
    <Suspense fallback={null}>
      <PickupMethodScreen />
    </Suspense>
  );
}
