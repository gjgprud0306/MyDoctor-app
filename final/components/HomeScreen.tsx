"use client";

import { useEffect, useRef, useState } from "react";
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
import { trackEvent } from "@/lib/analytics";
import { hospitals, popularCare, quickActions } from "@/lib/home-data";

export function HomeScreen() {
  const [isMedicineSheetOpen, setIsMedicineSheetOpen] = useState(false);
  const trackedScrollDepths = useRef(new Set<number>());
  const router = useRouter();

  const handleMedicineSelect = (medicineId: string) => {
    setIsMedicineSheetOpen(false);
    router.push(`/diet-dose-select?medicine=${medicineId}&entry_point=home_service_card`);
  };

  useEffect(() => {
    trackEvent("home_view", { page_name: "home" });

    const trackScrollDepth = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        scrollableHeight <= 0
          ? 100
          : Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));

      [25, 50, 75, 100].forEach((depth) => {
        if (scrollPercent >= depth && !trackedScrollDepths.current.has(depth)) {
          trackedScrollDepths.current.add(depth);
          trackEvent("home_scroll_depth", {
            page_name: "home",
            scroll_percent: depth,
          });
        }
      });
    };

    trackScrollDepth();
    window.addEventListener("scroll", trackScrollDepth, { passive: true });

    return () => window.removeEventListener("scroll", trackScrollDepth);
  }, []);

  return (
    <main className="app-shell relative mx-auto min-h-screen w-full max-w-[390px] bg-appBg">
      <AppHeader />
      <QuickAccess actions={quickActions} />
      <PromoBanner />
      <Tabs />
      <SectionHeader title="많이 찾는 진료" analyticsSectionName="popular_services" />
      <PopularCareGrid
        items={popularCare}
        onDietClick={() => {
          trackEvent("cta_click", {
            screen_name: "home",
            button_name: "diet_entry",
            entry_point: "home_service_card",
          });
          setIsMedicineSheetOpen(true);
        }}
      />
      <SectionHeader
        title="추가 비용 없는 병원 TOP 3"
        viewAllHref="/no-extra-fee-hospital-list"
        analyticsSectionName="nearby_top3"
      />
      <HospitalTopList hospitals={hospitals} />
      <BottomNavigation currentPage="home" />
      {isMedicineSheetOpen ? (
        <MedicineBottomSheet
          onClose={() => setIsMedicineSheetOpen(false)}
          entryPoint="home_service_card"
          onMedicineSelect={handleMedicineSelect}
        />
      ) : null}
    </main>
  );
}
