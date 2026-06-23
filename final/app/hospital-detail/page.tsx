import { Suspense } from "react";
import { HospitalDetailScreen } from "@/components/HospitalDetailScreen";

export default function HospitalDetailPage() {
  return (
    <Suspense fallback={null}>
      <HospitalDetailScreen />
    </Suspense>
  );
}
