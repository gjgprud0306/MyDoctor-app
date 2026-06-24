import { Suspense } from "react";
import { HospitalListScreen } from "@/components/HospitalListScreen";

export default function HospitalListPage() {
  return (
    <Suspense fallback={null}>
      <HospitalListScreen />
    </Suspense>
  );
}
