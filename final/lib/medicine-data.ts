export type MedicineItem = {
  name: string;
  ingredient: string;
  effect: string;
  price: string;
  image: string;
  imageSize: number;
  imageLeft: number;
  imageTop: number;
  contentLeft: number;
  cardHeight: number;
  buttonLeft: number;
  buttonTop: number;
};

export const medicines: MedicineItem[] = [
  {
    name: "마OOO",
    ingredient: "티제파타이드",
    effect: "식욕 억제 · 체중 감량 · 혈당 조절 효과",
    price: "29,000원~",
    image: "/assets/images/medicines/mounjaro.png",
    imageSize: 68,
    imageLeft: 12,
    imageTop: 9,
    contentLeft: 96,
    cardHeight: 88,
    buttonLeft: 292,
    buttonTop: 24,
  },
  {
    name: "위OO",
    ingredient: "세마글루타이드",
    effect: "포만감 증가 · 식욕 감소 · 체중 감량 효과",
    price: "39,000원~",
    image: "/assets/images/medicines/wegovy.png",
    imageSize: 68,
    imageLeft: 14,
    imageTop: 12,
    contentLeft: 94,
    cardHeight: 93,
    buttonLeft: 295,
    buttonTop: 26,
  },
  {
    name: "삭OO",
    ingredient: "리라글루타이드",
    effect: "식욕 억제 · 체중 감량 · 혈당 조절 효과",
    price: "20,000원~",
    image: "/assets/images/medicines/saxenda.png",
    imageSize: 68,
    imageLeft: 16,
    imageTop: 12,
    contentLeft: 96,
    cardHeight: 93,
    buttonLeft: 297,
    buttonTop: 26,
  },
  {
    name: "먹는 다이어트 약",
    ingredient: "알약 · 캡슐",
    effect: "식욕 억제 · 체지방 감소",
    price: "5,000원~",
    image: "/assets/images/medicines/oral-diet.png",
    imageSize: 62,
    imageLeft: 21,
    imageTop: 15,
    contentLeft: 95,
    cardHeight: 93,
    buttonLeft: 296,
    buttonTop: 26,
  },
];
