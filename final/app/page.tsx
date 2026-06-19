import { AppHeader } from "@/components/AppHeader";
import { BottomNavigation } from "@/components/BottomNavigation";
import { HospitalTopList } from "@/components/HospitalTopList";
import { PopularCareGrid } from "@/components/PopularCareGrid";
import { PromoBanner } from "@/components/PromoBanner";
import { QuickAccess } from "@/components/QuickAccess";
import { SectionHeader } from "@/components/SectionHeader";
import { Tabs } from "@/components/Tabs";
import { hospitals, popularCare, quickActions } from "@/lib/home-data";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-appBg">
      <AppHeader />
      <QuickAccess actions={quickActions} />
      <PromoBanner />
      <Tabs />
      <SectionHeader title="많이 찾는 진료" />
      <PopularCareGrid items={popularCare} />
      <SectionHeader title="추가 비용 없는 병원 TOP 3" />
      <HospitalTopList hospitals={hospitals} />
      <BottomNavigation />
    </main>
  );
}
