# 프로젝트명

프로덕트 디자이너 포트폴리오를 위한 UX/UI 개선 프로젝트입니다.

이 프로젝트는 하나의 GitHub 레포지토리 안에서 `hifi` 버전과 `final` 버전을 분리하여 관리합니다.

- `hifi`: 사용성 테스트를 위한 첫 번째 고품질 구현 버전
- `final`: 테스트 결과를 반영한 최종 포트폴리오 구현 버전

## 사용자 테스트 UTM 링크

기준 배포 URL: https://my-doctor-app-mocha.vercel.app

| 구분 | 공유 링크 |
| --- | --- |
| tester_01 | https://my-doctor-app-mocha.vercel.app?utm_source=ut1&utm_content=tester_01 |
| tester_02 | https://my-doctor-app-mocha.vercel.app?utm_source=ut1&utm_content=tester_02 |
| tester_03 | https://my-doctor-app-mocha.vercel.app?utm_source=ut1&utm_content=tester_03 |
| dev 확인용 | https://my-doctor-app-mocha.vercel.app?utm_source=ut1&utm_content=dev |

기존 URL에 query string이 있으면 `?` 대신 `&utm_source=ut1&utm_content=...` 형식으로 붙입니다.

Analytics 연결 규칙:

- `utm_content`가 `tester_01`, `tester_02`, `tester_03`, `dev` 중 하나면 해당 값을 `tester_id`로 사용합니다.
- `utm_content`가 없거나 허용되지 않은 값이면 `tester_id`는 `dev`로 처리합니다.
- 모든 `trackEvent`/`trackUtEvent` 이벤트에는 `tester_id`, `screen_name`, `utm_source`, `utm_content`, `timestamp`가 자동 포함됩니다.

## 기술 스택

- Vite
- React
- TypeScript
- Tailwind CSS
- Vercel

## 프로젝트 구조

```text
project/
├── README.md
├── AGENTS.md
├── DESIGN_HANDOFF.md
├── HANDOFF.md
│
├── hifi/
│   ├── index.html
│   ├── package.json
│   ├── public/
│   │   └── assets/
│   │       ├── icons/
│   │       ├── images/
│   │       │   ├── illustrations/
│   │       │   ├── thumbnails/
│   │       │   └── banners/
│   │       ├── logos/
│   │       └── pwa/
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── components/
│       ├── routes/
│       ├── hooks/
│       ├── lib/
│       ├── data/
│       └── styles/
│
└── final/
    ├── index.html
    ├── package.json
    ├── public/
    │   └── assets/
    │       ├── icons/
    │       ├── images/
    │       │   ├── illustrations/
    │       │   ├── thumbnails/
    │       │   └── banners/
    │       ├── logos/
    │       └── pwa/
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── components/
        ├── routes/
        ├── hooks/
        ├── lib/
        ├── data/
        └── styles/
```

## 폴더 역할

### hifi/

사용성 테스트를 위한 첫 번째 고품질 구현 버전입니다.

Figma 디자인을 기준으로 반응형, 접근성, 라우팅, PWA, 배포까지 가능한 수준으로 구현합니다.

### final/

사용성 테스트 결과를 반영한 최종 포트폴리오 구현 버전입니다.

테스트 이후 디자인이 변경될 수 있으므로 `hifi`와 별도 폴더로 관리합니다.

### public/assets/

Figma에서 직접 export한 에셋만 저장합니다.

Codex나 AI 도구가 임의로 생성한 아이콘, 이미지, 로고는 사용하지 않습니다.

## 에셋 폴더 기준

각 버전의 에셋은 해당 버전 폴더 안의 `public/assets/`에 저장합니다.

```text
assets/
├── icons/
├── images/
│   ├── illustrations/
│   ├── thumbnails/
│   └── banners/
├── logos/
└── pwa/
```

### assets/icons/

시스템 아이콘을 저장합니다.

예시:

- 검색
- 알림
- 장바구니
- 홈
- 뒤로가기
- 닫기
- 위치
- 필터

### assets/images/illustrations/

3D 일러스트, 캐릭터, 장식 그래픽을 저장합니다.

예시:

- 쿠폰 3D 이미지
- 선물상자 이미지
- 주사기 이미지
- 계산기 이미지
- 카테고리 일러스트

### assets/images/thumbnails/

콘텐츠를 대표하는 썸네일 이미지를 저장합니다.

예시:

- 음식 이미지
- 상품 이미지
- 병원 이미지
- 매장 이미지
- 프로필 이미지

### assets/images/banners/

프로모션, 이벤트, 광고 배너 이미지를 저장합니다.

예시:

- 메인 프로모션 배너
- 이벤트 배너
- 할인 배너
- 광고 배너

### assets/logos/

서비스 로고, 브랜드 로고, 제휴사 로고를 저장합니다.

### assets/pwa/

홈 화면 추가용 앱 아이콘, PWA 아이콘을 저장합니다.

## src 폴더 기준

`src/`는 React 앱의 실제 코드가 들어가는 폴더입니다.

```text
src/
├── main.tsx
├── App.tsx
├── components/
├── routes/
├── hooks/
├── lib/
├── data/
└── styles/
```

### src/main.tsx

React 앱을 `index.html`의 root 요소에 연결하는 시작 파일입니다.

### src/App.tsx

앱 전체 구조를 잡는 최상위 컴포넌트입니다.

### src/components/

화면을 구성하는 재사용 컴포넌트를 저장합니다.

필요에 따라 아래처럼 나눌 수 있습니다.

```text
components/
├── layout/
├── ui/
├── sections/
└── features/
```

- `layout/`: Header, Footer, BottomNavigation 같은 레이아웃 컴포넌트
- `ui/`: Button, Card, Input, Modal 같은 기본 UI 컴포넌트
- `sections/`: HomeSection, EventSection 같은 화면 섹션 단위 컴포넌트
- `features/`: Search, Cart, Reservation 같은 기능 단위 컴포넌트

### src/routes/

페이지 단위 화면을 저장합니다.

### src/hooks/

React 커스텀 훅을 저장합니다.

### src/lib/

유틸 함수와 공통 로직을 저장합니다.

### src/data/

임시 데이터, 목업 데이터, 화면 표시용 정적 데이터를 저장합니다.

### src/styles/

전역 스타일, Tailwind 관련 CSS, 디자인 토큰을 저장합니다.

## 설치 및 실행

각 버전은 독립적인 앱입니다.

```bash
cd hifi
npm install
npm run dev
```

```bash
cd final
npm install
npm run dev
```

## 배포

Vercel에서 Root Directory를 기준으로 각각 배포할 수 있습니다.

```text
hifi 배포 Root Directory: hifi
final 배포 Root Directory: final
```

## 디자인 핸드오프 규칙

구현 전에 반드시 `DESIGN_HANDOFF.md`를 작성합니다.

아래 항목을 기준으로 Figma 디자인과 에셋 export 상태를 기록합니다.

- Figma 파일 URL
- 구현 대상 프레임
- export 완료한 에셋 목록
- 누락된 에셋 목록
- 주요 컬러와 폰트
- 구현 시 주의사항

## 중요 규칙

- 모든 시각 에셋은 Figma에서 직접 export합니다.
- 에셋은 반드시 각 버전의 `public/assets/` 아래에 저장합니다.
- Figma URL을 이미지 경로처럼 직접 사용하지 않습니다.
- Codex나 AI 도구는 없는 에셋을 임의로 생성하지 않습니다.
- 에셋이 없으면 대체 이미지를 만들지 않고 `DESIGN_HANDOFF.md`에 누락 항목으로 기록합니다.
