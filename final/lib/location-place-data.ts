export type TestPlaceType = "hospital" | "pharmacy";

export type TestRegionId = "seoul" | "cheonan" | "suwon";

export type TestRegion = {
  id: TestRegionId;
  name: string;
  center: {
    lat: number;
    lng: number;
  };
};

export type NearbyPlace = {
  id: string;
  type: TestPlaceType;
  name: string;
  region: TestRegionId;
  address: string;
  lat: number;
  lng: number;
  distanceMeters: number;
  department: string;
  openNow: boolean;
  source: "mock";
};

export const testRegions: TestRegion[] = [
  { id: "seoul", name: "서울", center: { lat: 37.4979, lng: 127.0276 } },
  { id: "cheonan", name: "천안", center: { lat: 36.8151, lng: 127.1139 } },
  { id: "suwon", name: "수원", center: { lat: 37.2636, lng: 127.0286 } },
];

export const nearbyPlaceMockData: NearbyPlace[] = [
  {
    id: "mock-hospital-seoul-01",
    type: "hospital",
    name: "테스트내과 서울 01",
    region: "seoul",
    address: "서울 테스트구 샘플로 101",
    lat: 37.5002,
    lng: 127.0308,
    distanceMeters: 420,
    department: "테스트 진료 · 병원",
    openNow: true,
    source: "mock",
  },
  {
    id: "mock-pharmacy-seoul-01",
    type: "pharmacy",
    name: "샘플약국 서울 01",
    region: "seoul",
    address: "서울 테스트구 샘플로 115",
    lat: 37.4958,
    lng: 127.0249,
    distanceMeters: 680,
    department: "테스트 조제 · 약국",
    openNow: true,
    source: "mock",
  },
  {
    id: "mock-hospital-seoul-02",
    type: "hospital",
    name: "테스트의원 서울 02",
    region: "seoul",
    address: "서울 테스트구 임시로 22",
    lat: 37.4919,
    lng: 127.0341,
    distanceMeters: 1180,
    department: "비대면 테스트 · 병원",
    openNow: false,
    source: "mock",
  },
  {
    id: "mock-hospital-cheonan-01",
    type: "hospital",
    name: "테스트내과 천안 01",
    region: "cheonan",
    address: "천안 테스트동 샘플로 12",
    lat: 36.8182,
    lng: 127.1165,
    distanceMeters: 530,
    department: "테스트 진료 · 병원",
    openNow: true,
    source: "mock",
  },
  {
    id: "mock-pharmacy-cheonan-01",
    type: "pharmacy",
    name: "샘플약국 천안 01",
    region: "cheonan",
    address: "천안 테스트동 샘플로 31",
    lat: 36.8119,
    lng: 127.1084,
    distanceMeters: 910,
    department: "테스트 조제 · 약국",
    openNow: false,
    source: "mock",
  },
  {
    id: "mock-hospital-suwon-01",
    type: "hospital",
    name: "테스트의원 수원 01",
    region: "suwon",
    address: "수원 테스트구 샘플로 44",
    lat: 37.2664,
    lng: 127.0311,
    distanceMeters: 390,
    department: "테스트 진료 · 병원",
    openNow: true,
    source: "mock",
  },
  {
    id: "mock-pharmacy-suwon-01",
    type: "pharmacy",
    name: "샘플약국 수원 01",
    region: "suwon",
    address: "수원 테스트구 임시로 78",
    lat: 37.2595,
    lng: 127.0251,
    distanceMeters: 760,
    department: "테스트 조제 · 약국",
    openNow: true,
    source: "mock",
  },
];
