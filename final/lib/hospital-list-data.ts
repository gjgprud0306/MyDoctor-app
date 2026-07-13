export type HospitalListItem = {
  id: string;
  name: string;
  department: string;
  hours: string;
  distance: string;
  reviewCount: string;
  distanceText: string;
  wait: string;
  waitTime: string;
  price: string;
  consultationFee: string;
  medicinePrice: string;
  totalPrice: string;
  saving: string;
  revisitRate: string;
  image: string;
  address: string;
};

export const hospitalList: HospitalListItem[] = [
  {
    id: "asan-immune-plus",
    name: "아산이문플러스의원",
    department: "내과 · 비만클리닉",
    hours: "영업 중 · 17:30까지",
    distance: "(리뷰 999+) · 2 km",
    reviewCount: "리뷰 999+",
    distanceText: "2 km",
    wait: "평균 대기 10분",
    waitTime: "평균 대기 10분",
    price: "315,000원",
    consultationFee: "29,000원",
    medicinePrice: "286,000원",
    totalPrice: "315,000원",
    saving: "재진 95%",
    revisitRate: "95%",
    image: "/assets/images/hospitals/hospital-list-01.png",
    address: "서울 강남구 테헤란로 123",
  },
  {
    id: "suwon-the-cell",
    name: "수원더셀의원",
    department: "가정의학과 · 비만클리닉",
    hours: "영업 중 · 19:00까지",
    distance: "(리뷰 648) · 3 km",
    reviewCount: "리뷰 648",
    distanceText: "3 km",
    wait: "평균 대기 15분",
    waitTime: "평균 대기 15분",
    price: "300,000원",
    consultationFee: "29,000원",
    medicinePrice: "271,000원",
    totalPrice: "300,000원",
    saving: "재진 92%",
    revisitRate: "92%",
    image: "/assets/images/hospitals/hospital-list-02.png",
    address: "경기 수원시 팔달구 권광로 210",
  },
  {
    id: "hangaon-oriental",
    name: "한가온한방병원",
    department: "한방내과 · 비만클리닉",
    hours: "(금) 09:00 시작",
    distance: "(리뷰 148) · 5 km",
    reviewCount: "리뷰 148",
    distanceText: "5 km",
    wait: "평균 대기 10분",
    waitTime: "평균 대기 10분",
    price: "325,000원",
    consultationFee: "29,000원",
    medicinePrice: "296,000원",
    totalPrice: "325,000원",
    saving: "재진 90%",
    revisitRate: "90%",
    image: "/assets/images/hospitals/hospital-list-03.png",
    address: "서울 서초구 서초대로 77",
  },
  {
    id: "gangnam-bareun",
    name: "강남바른의원",
    department: "내과 · 비만클리닉",
    hours: "영업 중 · 18:30까지",
    distance: "(리뷰 587) · 3 km",
    reviewCount: "리뷰 587",
    distanceText: "3 km",
    wait: "평균 대기 15분",
    waitTime: "평균 대기 15분",
    price: "310,000원",
    consultationFee: "29,000원",
    medicinePrice: "281,000원",
    totalPrice: "310,000원",
    saving: "재진 90%",
    revisitRate: "90%",
    image: "/assets/images/hospitals/hospital-list-04.png",
    address: "서울 강남구 강남대로 402",
  },
  {
    id: "seoul-slim",
    name: "서울슬림의원",
    department: "가정의학과 · 비만클리닉",
    hours: "영업 중 · 20:00까지",
    distance: "(리뷰 332) · 6 km",
    reviewCount: "리뷰 332",
    distanceText: "6 km",
    wait: "평균 대기 20분",
    waitTime: "평균 대기 20분",
    price: "320,000원",
    consultationFee: "29,000원",
    medicinePrice: "291,000원",
    totalPrice: "320,000원",
    saving: "재진 90%",
    revisitRate: "90%",
    image: "/assets/images/hospitals/hospital-list-05.png",
    address: "서울 송파구 올림픽로 300",
  },
];
