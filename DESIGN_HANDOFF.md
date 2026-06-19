# DESIGN_HANDOFF.md

> 이 문서는 Figma 디자인을 코드로 구현하기 위한 기준 문서입니다.
> 구현 시 Figma URL을 이미지 경로로 직접 사용하지 않고, 아래 로컬 export 에셋만 사용합니다.

## 구현 대상

| 항목 | 내용 |
|------|------|
| 구현 대상 화면 | 나만의닥터 APP 홈 화면 |
| 구현 버전 | final |
| Figma 파일 URL | https://www.figma.com/design/yHwf4Etj46iApZgzqkAY7N/-%ED%97%88%ED%98%9C%EA%B2%BD--%EB%82%98%EB%A7%8C%EC%9D%98%EB%8B%A5%ED%84%B0-APP---HANDOFF?node-id=24-92&t=Ulw9mklV0SxHcBo2-11 |
| Figma 기준 프레임명 | Screen/Home |
| Figma 파일 키 | yHwf4Etj46iApZgzqkAY7N |
| Figma 노드 링크 | node-id=24-92 |
| 기준 화면 크기 | 393 x 1181 PNG export 기준 |

## Assets

> 모든 시각 에셋은 Figma에서 직접 export한 파일만 사용합니다.
> Figma URL을 이미지 경로로 직접 사용하지 않습니다.
> 누락된 에셋은 대체 이미지를 만들지 않고 아래 누락 목록에 기록합니다.

| 항목 | 상태 | 저장 위치 |
|------|------|----------|
| 아이콘 export 완료 | 예 | final/public/assets/icons/ |
| 일러스트 export 완료 | 해당 없음 | final/public/assets/images/illustrations/ |
| 썸네일 export 완료 | 예 | final/public/assets/images/thumbnails/ |
| 배너 export 완료 | 예 | final/public/assets/images/banners/ |
| 로고 export 완료 | 예 | final/public/assets/logos/ |
| PWA 아이콘 export 완료 | 아니오 | final/public/assets/pwa/ |
| 기준 화면 캡처 export 완료 | 예 | final/public/assets/images/screens/ |

## Export 완료 에셋 목록

| 에셋명 | 유형 | 저장 위치 | 사용 화면 |
|--------|------|----------|----------|
| home.png | screen | final/public/assets/images/screens/home.png | 홈 화면 기준 캡처 |
| promo-diet-compare.png | banners | final/public/assets/images/banners/promo-diet-compare.png | 홈 프로모션 배너 |
| brand-mark.png | logos | final/public/assets/logos/brand-mark.png | 앱 헤더 브랜드 마크 |
| search.png | icons | final/public/assets/icons/header/search.png | 헤더 검색 |
| gift.png | icons | final/public/assets/icons/header/gift.png | 헤더 혜택/선물 |
| notification.png | icons | final/public/assets/icons/header/notification.png | 헤더 알림 |
| chevron-right.png | icons | final/public/assets/icons/common/chevron-right.png | 섹션 전체보기 |
| star.png | icons | final/public/assets/icons/common/star.png | 병원 평점 |
| location.png | icons | final/public/assets/icons/quick-menu/location.png | 병원,약국 찾기 |
| history.png | icons | final/public/assets/icons/quick-menu/history.png | 다이어트 주사기록 |
| phone.png | icons | final/public/assets/icons/quick-menu/phone.png | 소아과 119 지도 |
| diet-injection.png | icons | final/public/assets/icons/quick-menu/diet-injection.png | 많이 찾는 진료 - 다이어트 |
| hair-loss.png | icons | final/public/assets/icons/quick-menu/hair-loss.png | 많이 찾는 진료 - 탈모 |
| mask.png | icons | final/public/assets/icons/quick-menu/mask.png | 많이 찾는 진료 - 감기/비염 |
| eye.png | icons | final/public/assets/icons/quick-menu/eye.png | 많이 찾는 진료 - 눈 관련 카드 |
| hospital-rank-01.png | thumbnails | final/public/assets/images/thumbnails/hospital-rank-01.png | 추가 비용 없는 병원 TOP 3 |
| hospital-rank-02.png | thumbnails | final/public/assets/images/thumbnails/hospital-rank-02.png | 추가 비용 없는 병원 TOP 3 |
| hospital-rank-03.png | thumbnails | final/public/assets/images/thumbnails/hospital-rank-03.png | 추가 비용 없는 병원 TOP 3 |

## 누락된 에셋 목록

| 에셋명 | 유형 | 필요한 화면 | 비고 |
|--------|------|------------|------|
| banner-arrow-backward.png | icons | 홈 프로모션 배너 | Figma node 24:151 export 시 유효하지 않은 노드 응답. 필요 시 Figma에서 재확인 후 export |
| banner-arrow-forward.png | icons | 홈 프로모션 배너 | Figma node 24:153 export 필요 |
| bottom-navigation icons | icons | 하단 내비게이션 | 현재 구현 시 CSS/텍스트 또는 추가 Figma export 필요 |
| pwa icons | pwa | PWA 설정 | 이번 홈 화면 구현 범위 밖 |

## 디자인 토큰

| 항목 | 내용 |
|------|------|
| 사용 폰트 | Pretendard: Medium, SemiBold, Bold, ExtraBold |
| 주요 컬러 | #f3f4f7, #ffffff, #000000, #111827, #21242c, #6b7280, #6a6a7c, #9ca3af, #c4c4c4, #d1d5db, #e5e7eb, #3b82f6, #6faeff, #8ebffe, #f04242, #ffcc00 |
| 화면 배경 | #f3f4f7 |
| 포인트 컬러 | #3b82f6 |
| 경고/배지 컬러 | #f04242 |

## 주요 텍스트

| 영역 | 텍스트 |
|------|--------|
| 탭 | 비대면 진료 / 최저가 병원 |
| 브랜드 | 나만의 |
| 퀵 메뉴 | 병원,약국 찾기 / 다이어트 주사기록 / 소아과 119 지도 |
| 검색 | 병원, 진료 , 약 , 증상을 검색해보세요 |
| 섹션 | 많이 찾는 진료 / 추가 비용 없는 병원 TOP 3 |
| 진료 카드 | 다이어트, 탈모, 감기 · 비염 |
| 병원 카드 | 나만의내과, 메디라인의원, 서울웰이비인후과 |
| 하단 내비게이션 | 홈 / 혜택 / 건강관리 / 의료기록 / 내 정보 |

## 공통 컴포넌트 목록

| 컴포넌트명 | 사용 화면 | Figma 컴포넌트명 |
|-----------|---------|----------------|
| Tab | 홈 상단 탭 | Tab |
| AppHeader | 홈 헤더 | AppHeader |
| QuickActionCard | 홈 퀵 메뉴 | Card_Quick_PediatricMap |
| PromoBanner | 홈 프로모션 | Card_Promo_DietCompare |
| PopularCareCard | 많이 찾는 진료 | Card_Care_Diet, Card_Care_HairLoss, Card_Care_ColdRhinitis |
| SectionHeader | 홈 섹션 헤더 | SectionHeader |
| HospitalRankCard | 병원 TOP 3 | Card_Hospital_Rank01, Card_Hospital_Rank02, Card_Hospital_Rank03 |
| BottomNavigation | 하단 내비게이션 | BottomNavigation |

## 구현 시 주의사항

- Figma URL을 코드의 이미지 src로 직접 사용하지 않습니다.
- 시각 에셋은 반드시 final/public/assets/ 하위 파일만 사용합니다.
- 화면 기준 폭은 393px이며, 모바일 앱 화면으로 구현합니다.
- 홈 화면 캡처 파일 final/public/assets/images/screens/home.png는 구현 비교용 기준 이미지입니다.
- 루트 final/ 폴더에 있는 PNG 파일은 이번 핸드오프 export 경로가 아니므로 구현 에셋으로 사용하지 않습니다.
- 프로모션 배너의 좌우 화살표와 하단 내비게이션 개별 아이콘은 추가 export가 필요할 수 있습니다.
