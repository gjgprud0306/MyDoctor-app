## 작업 현황 기록

### 현재 상태

- GitHub (브랜치/커밋): main, 병원 상세 시간 선택 UI 개선 변경사항 push 완료
- Vercel 배포 상태: 확인하지 않음
- 현재 진행 중인 작업: 병원 상세 시간 선택 시작 시간 조정 진행 중

### 완료된 작업

- 2026-06-18 Figma `Screen/Home` 기준으로 `DESIGN_HANDOFF.md` 작성
- 2026-06-18 Figma에서 홈 화면 구현용 에셋 18개 export 후 `final/public/assets/` 하위에 저장
- 2026-06-18 디자인 토큰, 주요 텍스트, 공통 컴포넌트, 누락 에셋 목록 정리
- 2026-06-19 Next.js App Router, TypeScript, Tailwind CSS 기반 final 홈 화면 구현
- 2026-06-19 `final/app/page.tsx`, `final/components/`, `final/lib/home-data.ts` 생성 및 컴포넌트 분리
- 2026-06-19 `final/package.json` 및 Next/Tailwind 설정 파일 생성
- 2026-06-19 Figma `Screen/Home` 기준으로 헤더, 퀵메뉴, 검색바, 배너 좌표/크기 재조정
- 2026-06-19 홈 화면 이미지 품질 점검 및 Retina 대응: 사용 중인 public/assets PNG 17개를 3x 크기로 재생성하고 Next.js Image 컴포넌트로 교체
- 2026-06-19 하단 탭바 UI를 Figma 기준으로 재조정: Home active 고정, inactive 회색 상태, 혜택 dot, safe area/home indicator 유지
- 2026-06-20 GitHub 이슈 확인: 열린 이슈 #1~#4, 닫힌 이슈 0개, 열린 PR 0개
- 2026-06-20 이슈 #2/#4 대응: 헤더, 검색바, 섹션 보조, 하단 내비게이션 시스템 아이콘을 SVG 컴포넌트로 교체해 선명도 및 검색바 아이콘 형태 개선
- 2026-06-20 이슈 #3 대응: `viewport-fit=cover`, PWA manifest, iOS web app metadata, safe-area CSS 및 실제 터치 기기에서 가짜 status/home indicator 숨김 처리 추가
- 2026-06-20 이슈 #1 대응: `hifi` 루트 PNG 화면 파일을 `hifi/public/assets/images/screens/`로 이동하고 `.DS_Store` 제거
- 2026-06-20 `DESIGN_HANDOFF.md` 최신화: 하단 내비게이션 export 에셋 현황 및 시스템 아이콘 SVG 렌더링 기준 반영
- 2026-06-20 GitHub 이슈 #1~#4에 변경사항, 검증 결과, 배포 URL 미확인 상태 댓글 작성 완료. push/배포 전이므로 이슈 close는 보류
- 2026-06-20 추가 수정: iOS 상단 상태바 아이콘을 CSS shape로 재구현하고 safe-area 중복 적용 제거
- 2026-06-20 추가 수정: 검색/돋보기 SVG path를 손잡이가 더 명확한 형태로 조정
- 2026-06-20 추가 수정: 헤더 좌측 로고의 흐릿한 PNG `brand-mark.png` 사용을 중단하고 `나만의Dr.` 텍스트 로고로 교체
- 2026-06-20 `92f7838 fix: resolve home screen issues` 커밋 후 `origin/main` push 완료
- 2026-06-20 프로모션 배너 화질 재수정: Figma `24:149` 배너 노드를 3x 임시 복제 후 1056x606 PNG로 재추출하여 `final/public/assets/images/banners/promo-diet-compare.png` 교체
- 2026-06-20 퀵메뉴 상단 3개 아이콘 화질 재수정: Figma `24:187`, `24:192`, `24:197` 아이콘 노드를 3x 임시 복제 후 144x144 PNG로 재추출하여 `location.png`, `history.png`, `phone.png` 교체
- 2026-06-20 헤더 상단 재수정: iOS 상태바를 Figma 좌표 기준 CSS로 재구현하고 Figma `24:125` 로고 노드를 3x 328x117 PNG로 재추출하여 `brand-logo.png`로 적용
- 2026-06-20 헤더 액션 아이콘 재수정: Figma `24:133`, `24:138`, `24:142` 아이콘 노드를 3x 72x72 PNG로 재추출하고 파일명 매핑 및 배치 순서(혜택, 검색, 알림)를 Figma 기준으로 교정
- 2026-06-20 Figma `52:90` `Screen_MedicineList` 구현: `/medicine-list` 페이지, `MedicineListScreen`, `MedicineCard`, `medicine-data` 추가 및 약 이미지 5개를 3x PNG로 export 후 `final/public/assets/images/medicines/`에 저장
- 2026-06-20 홈 화면 `다이어트` 카드 클릭 동작 구현: 새 페이지 이동 없이 홈 위에 딤드 오버레이와 하단 상승 바텀시트로 `MedicineListScreen` 표시, 딤드 영역 클릭 시 닫힘 처리
- 2026-06-20 바텀시트 약 리스트 UI 조정: 히어로 텍스트와 첫 카드 사이 여백을 24px 축소하고 카드 우측 chevron을 SVG로 교체해 원형 버튼 중앙 정렬
- 2026-06-20 바텀시트 약 카드 내부 간격 조정: 약효능 문구와 처방 진료비 라인 사이 간격을 줄이기 위해 가격 라인을 6px 위로 이동
- 2026-06-20 Figma `52:216` `Screen_DietDoseSelect` 구현: `/diet-dose-select` 페이지 추가, 마운자로 카드 클릭 시 바텀시트/딤드 닫힘 후 라우팅 이동, 뒤로가기 버튼 홈 이동, 2.5mg 선택 상태/수량 스테퍼/하단 고정 CTA 구현
- 2026-06-20 용량 선택 화면 인터랙션 구현: 각 용량 `- / 숫자 / +` 수량 조절을 0~2 범위로 제한, `잘 모르겠어요` 선택 활성화 및 수량 초기화, 마운자로 카드 chevron으로 용량 선택 영역 접기/펼치기 처리
- 2026-06-20 용량 선택 화면 겹침 수정: 주사제 카드와 용량 선택 영역 사이 간격을 12px 추가하고 `잘 모르겠어요` 선택 시 용량 선택 영역 자동 접힘 처리
- 2026-06-20 Figma `52:295` `Screen_PickupMethod_02` 구현: `/pickup-method` 페이지 추가, `Screen_DietDoseSelect` 하단 CTA에서 라우팅 이동, 뒤로가기 버튼 `/diet-dose-select` 이동, 지도/히어로 이미지 3x export 및 수령 방법 카드/하단 CTA 구현
- 2026-06-20 PickupMethod 히어로 문구 간격 조정: 제목 줄간격 34px→30px, 설명문 상단 여백 8px→4px 및 line-height 21px→18px로 축소
- 2026-06-20 PickupMethod 수령 방법 카드 수정: 카드 2개 폭/위치를 동일하게 맞추고 클릭 시 하나만 활성화되는 선택 상태 구현
- 2026-06-20 Figma `52:393` `Screen_HospitalList` 구현: `/hospital-list` 페이지 추가, PickupMethod 하단 CTA에서 라우팅 이동, 뒤로가기 버튼 `/pickup-method` 이동, 지도 3x export 및 필터 칩/병원 카드 5개/하단 고정 CTA 구현
- 2026-06-20 HospitalList 병원 썸네일 화질 수정: Figma 카드 썸네일 프레임 5개를 3x 240x276 PNG로 재추출하여 `final/public/assets/images/hospitals/`에 저장하고 병원 리스트 데이터 연결
- 2026-06-21 Figma wireframe `526:465` `Screen/HospitalDetail` 구현: `/hospital-detail` 페이지 추가, HospitalList 병원 카드 클릭 라우팅 연결, 뒤로가기 `/hospital-list` 이동, 병원 정보/시간 선택/가격/예약 안내/하단 고정 CTA 구현
- 2026-06-21 전체 iOS 상단바 수정: Figma StatusBar 노드 `52:296`을 3x 1179x150 PNG로 추출하여 `IosStatusBar` 공통 컴포넌트로 적용, 홈/주사제 선택/수령 방법/병원 리스트/병원 상세 화면의 CSS 상태바 중복 구현 제거
- 2026-06-21 홈 iOS 상단바 배경 수정: 3x 상단바 에셋 기반으로 홈 배경색 `#f3f4f7` 전용 `ios-status-bar-home.png`를 추가하고 홈 헤더에서만 적용
- 2026-06-21 홈 인기 진료 아이콘 화질 수정: Figma 홈 노드 `24:165`, `24:175`, `24:102`, `24:107`을 3x 임시 복제 후 `diet-injection.png`, `hair-loss.png`, `mask.png`, `eye.png`로 재추출하여 교체
- 2026-06-21 홈 병원 추천 썸네일 화질 수정: Figma 홈 노드 `24:218`, `24:235`, `24:250`을 3x 임시 복제 후 `hospital-rank-01.png`~`hospital-rank-03.png`로 재추출하여 교체
- 2026-06-21 병원 리스트 필터 인터랙션 구현: `가격순` 클릭 시 병원 카드가 가격 낮은 순으로 정렬되고, `추천순` 클릭 시 기존 추천 순서로 복귀하도록 연결
- 2026-06-21 병원 리스트 대기 짧은순 인터랙션 구현: `대기 짧은순` 클릭 시 병원 카드가 평균 대기시간 낮은 순으로 정렬되도록 연결
- 2026-06-21 전체 화면 텍스트 굵기 조정: `font-extrabold` 사용을 제거하고 큰 제목/가격/CTA는 `bold`, 카드/칩/섹션/보조 텍스트는 `semibold` 또는 `medium` 중심으로 낮춰 피그마 대비 과한 볼드감을 완화
- 2026-06-21 병원 상세 시간 선택 UI 조정: 병원 상세 화면 텍스트 굵기와 시간 영역 세로 간격을 추가 완화하고, 13:00~20:00 시간대를 30분 단위 가로 스크롤 리스트로 확장. 시간 버튼 클릭 시 선택 상태와 하단 선택 시간 표시가 함께 갱신되도록 구현
- 2026-06-21 병원 상세 시간 선택 범위 확장: 시간 선택 가로 스크롤 리스트를 09:00~20:00 30분 단위로 확장하고, 선택 시간 state가 하단 날짜 옆 예약시간 표기와 연동되는 구조 유지

### 검증 결과

- assets: `file` 명령으로 export PNG 18개 정상 인식 확인
- install: `npm install` 완료, 취약점 0개 확인
- build: `npm run build` 성공
- dev: `npm run dev -- --hostname 127.0.0.1 --port 3000` 실행, `curl -I http://127.0.0.1:3000` 200 OK 확인
- visual: 브라우저 390px 모바일 기준에서 헤더 y=0 h=98, 퀵메뉴 y=98 h=178, 검색바 x=20 y=229 w=353 h=40, 배너 y=273 h=226, 배너 이미지 x=20 y=285 w=352 h=202 확인
- image-quality: 브라우저 390px 기준 렌더링 이미지 20개 모두 자연 크기 >= 렌더 크기 3x 확인, aspect mismatch 없음, transform/scale 없음
- bottom-nav: 브라우저 390px 기준 탭바 h=116, 아이콘 24px, Home `aria-current=page`, inactive 텍스트 #c4c4c4, home indicator 유지 확인
- 2026-06-20 build: `final/`에서 `npm run build` 성공, `/manifest.webmanifest` static route 생성 확인
- 2026-06-20 rebuild: 추가 수정 후 `final/`에서 `npm run build` 재성공
- 2026-06-20 assets-structure: `hifi/public/assets/images/screens/` 하위로 화면 PNG 17개 이동 확인, `final/public/assets/` 하위 `.DS_Store` 제거 확인
- 2026-06-20 dev: 현재 실행 환경에서 `npm run dev -- --hostname 127.0.0.1 --port 3000/3001` 모두 `listen EPERM`으로 포트 바인딩 실패. 브라우저 렌더링 QA는 이번 턴에서 미실행
- 2026-06-20 lint: 별도 ESLint 구성 없음. `npm run lint`는 안내 메시지 출력 후 정상 종료하도록 정리, 추가 수정 후 재확인 완료
- 2026-06-20 banner-quality: `promo-diet-compare.png`가 Figma 3x export 기반 1056x606 PNG임을 `sips`/`file`로 확인
- 2026-06-20 quick-icon-quality: `location.png`, `history.png`, `phone.png`가 Figma 3x export 기반 144x144 PNG임을 `sips`/`file`로 확인
- 2026-06-20 header-quality: `brand-logo.png`가 Figma 3x export 기반 328x117 PNG임을 `sips`/`file`로 확인
- 2026-06-20 header-action-quality: `gift.png`, `search.png`, `notification.png`가 Figma 3x export 기반 72x72 PNG임을 `sips`/`file`로 확인
- 2026-06-20 medicine-list-assets: `mounjaro.png`, `wegovy.png`, `saxenda.png` 204x204, `oral-diet.png` 186x186, `info-shield.png` 156x156 확인
- 2026-06-20 medicine-list-build: `final/`에서 `npm run build` 성공, `/medicine-list` static route 생성 확인
- 2026-06-20 medicine-bottom-sheet-build: 홈 화면 바텀시트 연결 후 `final/`에서 `npm run build` 성공
- 2026-06-20 medicine-list-spacing-build: 약 리스트 간격/chevron 조정 후 `final/`에서 `npm run build` 성공
- 2026-06-20 medicine-card-price-spacing-build: 약 카드 내부 가격 라인 간격 조정 후 `final/`에서 `npm run build` 성공
- 2026-06-20 diet-dose-select-assets: `diet-dose-hero.png`가 Figma 3x export 기반 342x342 PNG임을 `sips`로 확인
- 2026-06-20 diet-dose-select-build: `final/`에서 `npm run build` 성공, `/diet-dose-select` static route 생성 확인
- 2026-06-20 diet-dose-select-interaction-build: 용량 수량 조절/잘 모르겠어요 활성화/chevron 토글 구현 후 `final/`에서 `npm run build` 성공
- 2026-06-20 diet-dose-select-overlap-build: 용량 선택 영역 간격 및 `잘 모르겠어요` 자동 접힘 수정 후 `final/`에서 `npm run build` 성공
- 2026-06-20 pickup-method-assets: `pickup-hero.png` 324x324, `pickup-map.png` 1059x408 확인
- 2026-06-20 pickup-method-build: `final/`에서 `npm run build` 성공, `/pickup-method` static route 생성 확인
- 2026-06-20 pickup-method-copy-spacing-build: 히어로 문구 간격 조정 후 `final/`에서 `npm run build` 성공
- 2026-06-20 pickup-method-card-select-build: 수령 방법 카드 폭 및 선택 상태 수정 후 `final/`에서 `npm run build` 성공
- 2026-06-20 hospital-list-assets: `hospital-list-map.png` 1047x504 확인
- 2026-06-20 hospital-list-build: `final/`에서 `npm run build` 성공, `/hospital-list` static route 생성 확인
- 2026-06-20 hospital-list-thumbnail-assets: `hospital-list-01.png`~`hospital-list-05.png`가 모두 240x276 PNG임을 `sips`/`file`로 확인
- 2026-06-20 hospital-list-thumbnail-build: 병원 썸네일 교체 후 `final/`에서 `npm run build` 성공
- 2026-06-21 hospital-detail-build: `final/`에서 `npm run build` 성공, `/hospital-detail` static route 생성 확인
- 2026-06-21 ios-status-bar-assets: `ios-status-bar.png`가 Figma 3x export 기반 1179x150 PNG임을 `sips`로 확인
- 2026-06-21 ios-status-bar-build: 공통 iOS 상단바 적용 후 `final/`에서 `npm run build` 성공
- 2026-06-21 home-ios-status-bar-assets: `ios-status-bar-home.png`가 3x 기준 1179x150 PNG임을 `sips`로 확인
- 2026-06-21 home-ios-status-bar-build: 홈 전용 iOS 상단바 적용 후 `final/`에서 `npm run build` 성공
- 2026-06-21 home-care-icon-assets: `diet-injection.png`, `hair-loss.png` 234x234, `mask.png`, `eye.png` 156x156 확인. 홈 헤더/퀵메뉴/하단 탭 아이콘도 렌더 크기 대비 3x 이상 확인
- 2026-06-21 home-care-icon-build: 홈 인기 진료 아이콘 교체 후 `final/`에서 `npm run build` 성공
- 2026-06-21 home-hospital-thumbnail-assets: `hospital-rank-01.png`~`hospital-rank-03.png`가 Figma 3x export 기반 132x132 PNG임을 `sips`로 확인
- 2026-06-21 home-hospital-thumbnail-build: 홈 병원 추천 썸네일 교체 후 `final/`에서 `npm run build` 성공
- 2026-06-21 hospital-list-price-sort-logic: 현재 병원 데이터 기준 가격순 정렬 결과가 `240000`, `300000`, `310000`, `315000`, `325000` 순서임을 코드 로직으로 확인
- 2026-06-21 hospital-list-price-sort-build: 병원 리스트 가격순 정렬 인터랙션 구현 후 `final/`에서 `npm run build` 성공
- 2026-06-21 hospital-list-wait-sort-logic: 현재 병원 데이터 기준 대기 짧은순 정렬 결과가 `10`, `10`, `15`, `15`, `20` 순서임을 코드 로직으로 확인
- 2026-06-21 hospital-list-wait-sort-build: 병원 리스트 대기 짧은순 정렬 인터랙션 구현 후 `final/`에서 `npm run build` 성공
- 2026-06-21 typography-weight-scan: `rg \"font-(extrabold|bold)\"`로 `font-extrabold` 제거 및 강조 텍스트만 `font-bold` 유지 확인
- 2026-06-21 typography-weight-build: 전체 화면 텍스트 굵기 조정 후 `final/`에서 `npm run build` 성공
- 2026-06-21 hospital-detail-time-slot-check: Figma `69:158` `Screen/HospitalDetail` 구조 확인 후 시간 선택 영역을 기존 5개 버튼 높이에 맞춘 가로 스크롤 구조로 확장
- 2026-06-21 hospital-detail-time-slot-build: 병원 상세 시간 선택/텍스트 굵기 조정 후 `final/`에서 `npm run build` 성공
- 2026-06-21 hospital-detail-time-range-check: 시간 선택 배열이 총 23개이며 첫 시간 `09:00`, 마지막 시간 `20:00`임을 확인
- 2026-06-21 hospital-detail-time-range-build: 병원 상세 시간 선택 범위 확장 후 `final/`에서 `npm run build` 성공

### 남은 작업

- 프로모션 배너 좌우 화살표 개별 export 필요 여부 확인
- PWA 앱 아이콘이 필요하면 Figma에서 별도 export 후 `final/public/assets/pwa/` 저장
- 로컬 포트 실행 가능한 환경 또는 실기기에서 모바일/PWA 시각 QA
- 변경사항 push 후 이슈 #1~#4에 변경사항, 검증 결과, 배포 URL 댓글 작성 및 완료 조건 충족 시 close
