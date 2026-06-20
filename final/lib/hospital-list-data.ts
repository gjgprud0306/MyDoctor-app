export type HospitalListItem = {
  name: string;
  hours: string;
  distance: string;
  wait: string;
  price: string;
  saving: string;
  image: string;
};

export const hospitalList: HospitalListItem[] = [
  {
    name: "아산이뮨플러스의원",
    hours: "영업 중 · 17:30까지",
    distance: "(리뷰 999+) · 2.0 km",
    wait: "평균 대기 10분",
    price: "315,000원",
    saving: "제진 95%",
    image: "/assets/images/thumbnails/hospital-rank-01.png",
  },
  {
    name: "수원더셀의원",
    hours: "영업 중 · 19:00까지",
    distance: "(리뷰 648) · 3.0 km",
    wait: "평균 대기 15분",
    price: "300,000원",
    saving: "제진 92%",
    image: "/assets/images/thumbnails/hospital-rank-02.png",
  },
  {
    name: "한가온한방병원",
    hours: "(금) 09:00 시작",
    distance: "(리뷰 148) · 5.0 km",
    wait: "평균 대기 10분",
    price: "325,000원",
    saving: "제진 90%",
    image: "/assets/images/thumbnails/hospital-rank-03.png",
  },
  {
    name: "강남바른의원",
    hours: "영업 중 · 18:30까지",
    distance: "(리뷰 587) · 3.0 km",
    wait: "평균 대기 15분",
    price: "310,000원",
    saving: "제진 90%",
    image: "/assets/images/thumbnails/hospital-rank-01.png",
  },
  {
    name: "서울슬림의원",
    hours: "영업 중 · 20:00까지",
    distance: "(리뷰 332) · 6.0km",
    wait: "평균 대기 20분",
    price: "320,000원",
    saving: "제진 90%",
    image: "/assets/images/thumbnails/hospital-rank-02.png",
  },
];
