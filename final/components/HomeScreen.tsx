"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { BottomNavigation } from "@/components/BottomNavigation";
import { HospitalTopList } from "@/components/HospitalTopList";
import { MedicineBottomSheet } from "@/components/MedicineBottomSheet";
import { PopularCareGrid } from "@/components/PopularCareGrid";
import { PromoBanner } from "@/components/PromoBanner";
import { QuickAccess } from "@/components/QuickAccess";
import { SectionHeader } from "@/components/SectionHeader";
import { Tabs } from "@/components/Tabs";
import { hospitals, popularCare, quickActions } from "@/lib/home-data";

export function HomeScreen() {
  const [isMedicineSheetOpen, setIsMedicineSheetOpen] = useState(false);
  const router = useRouter();

  const handleMedicineSelect = (medicineId: string) => {
    setIsMedicineSheetOpen(false);
    router.push(`/diet-dose-select?medicine=${medicineId}`);
  };

  return (
    <main className="app-shell relative mx-auto min-h-screen w-full max-w-[390px] bg-appBg">
      <AppHeader />
      <QuickAccess actions={quickActions} />
      <PromoBanner />
      <Tabs />
      <SectionHeader title="많이 찾는 진료" />
      <PopularCareGrid
        items={popularCare}
        onDietClick={() => setIsMedicineSheetOpen(true)}
      />
      <SectionHeader
        title="추가 비용 없는 병원 TOP 3"
        viewAllHref="/no-extra-fee-hospital-list"
      />
      <HospitalTopList hospitals={hospitals} />
      <BottomNavigation />
      {isMedicineSheetOpen ? (
        <MedicineBottomSheet
          onClose={() => setIsMedicineSheetOpen(false)}
          onMedicineSelect={handleMedicineSelect}
        />
      ) : null}
    </main>
  );
}
