export type QuickAction = {
  title: string;
  icon: string;
};

export type CareItem = {
  title: string;
  subtitle: string;
  icon: string;
  featured?: boolean;
  compact?: boolean;
};

export type Hospital = {
  rank: number;
  name: string;
  description: string;
  rating: string;
  price: string;
  image: string;
};

export const quickActions: QuickAction[] = [
  {
    title: "병원,약국\n찾기",
    icon: "/assets/icons/quick-menu/location.png",
  },
  {
    title: "다이어트\n주사기록",
    icon: "/assets/icons/quick-menu/history.png",
  },
  {
    title: "소아과\n119 지도",
    icon: "/assets/icons/quick-menu/phone.png",
  },
];

export const popularCare: CareItem[] = [
  {
    title: "다이어트",
    subtitle: "최저가 병원 비교",
    icon: "/assets/icons/quick-menu/diet-injection.png",
    featured: true,
  },
  {
    title: "탈모",
    subtitle: "야간 진료 병원 찾기",
    icon: "/assets/icons/quick-menu/hair-loss.png",
    featured: true,
  },
  {
    title: "감기 · 비염",
    subtitle: "비대면 빠른 진료",
    icon: "/assets/icons/quick-menu/mask.png",
    compact: true,
  },
  {
    title: "눈 건강",
    subtitle: "비대면 빠른 진료",
    icon: "/assets/icons/quick-menu/eye.png",
    compact: true,
  },
];

export const hospitals: Hospital[] = [
  {
    rank: 1,
    name: "나만의내과",
    description: "다이어트 진료 상담",
    rating: "4.9 (1,234)",
    price: "39,000원~",
    image: "/assets/images/thumbnails/hospital-rank-01.png",
  },
  {
    rank: 2,
    name: "메디라인의원",
    description: "탈모 진료 야간 진료 가능",
    rating: "4.7 (934)",
    price: "24,000원~",
    image: "/assets/images/thumbnails/hospital-rank-02.png",
  },
  {
    rank: 3,
    name: "서울웰이비인후과",
    description: "감기 · 비염 진료 당일 진료 가능",
    rating: "4.6 (1,014)",
    price: "19,000원~",
    image: "/assets/images/thumbnails/hospital-rank-03.png",
  },
];
