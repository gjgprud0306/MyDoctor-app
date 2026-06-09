/* ================================================
   MyDoctor – App
   ================================================ */

// ─── Data ──────────────────────────────────────
const HOSPITALS = [
  { id: "asan",    name: "아산미래클리닉의원", rating: "4.8", reviews: "230+",  reorder: "재진 94%", close: "17:30까지", wait: "평균 8분",  distance: "7km", price: 324900, med: 309900 },
  { id: "suwon",   name: "수원다옴의원",       rating: "4.9", reviews: "999+",  reorder: "재진 94%", close: "19:00까지", wait: "평균 34분", distance: "4km", price: 290000, med: 275000 },
  { id: "hangaon", name: "한가온한방병원",      rating: "4.7", reviews: "21+",   reorder: "재진 95%", close: "09:00 시작", wait: "평균 10분", distance: "5km", price: 300000, med: 285000 },
  { id: "dongtan", name: "동탄하나한방병원",    rating: "4.6", reviews: "108+",  reorder: "재진 91%", close: "18:00까지", wait: "평균 18분", distance: "6km", price: 318000, med: 303000 },
];

const SYMPTOMS = [
  ["😷", "감기 · 비염"],  ["👶", "소아과"],  ["🧴", "탈모약 처방"],  ["⚖️", "다이어트"],
  ["🦵", "여드름"],       ["🩹", "피부질환"], ["🧪", "보습제"],       ["👁️", "인공눈물"],
  ["🤒", "긴장 · 면접약"], ["♀",  "여성질환"],  ["🌼", "무좀"],         ["🦠", "헤르페스"],
];

const NAV_ITEMS = [
  ["⌂", "홈", true, false],
  ["Ⓟ", "혜택", false, true],
  ["♡", "건강관리", false, false],
  ["▤", "의료기록", false, false],
  ["♙", "내 정보", false, false],
];

const DRUGS = [
  { name: "마운자로", type: "티제파타이드", desc: "식욕 조절 + 혈당 관리", cycle: "주 1회 주사", startDose: "2.5mg", doses: ["2.5mg", "5mg", "7.5mg", "10mg"] },
  { name: "위에비",   type: "세마글루타이드", desc: "체중 감량 집중",       cycle: "주 1회 주사", startDose: "0.25mg", doses: ["0.25mg", "0.5mg", "1mg", "1.7mg"] },
  { name: "삭다",    type: "리라글루타이드", desc: "하루 1회 투여",        cycle: "매일 주사",   startDose: "0.6mg", doses: ["0.6mg", "1.2mg", "1.8mg", "3mg"] },
];

// ─── Store ─────────────────────────────────────
function createStore(initial) {
  let state = { ...initial };
  const listeners = new Set();
  return {
    get: () => state,
    set: (updater) => {
      state = updater(state);
      listeners.forEach((fn) => fn(state));
    },
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}

function defaultCounts(drugIndex = 0) {
  return Object.fromEntries(DRUGS[drugIndex].doses.map((d) => [d, 0]));
}

const store = createStore({
  screen: "home",
  overlay: null,
  selectedDrugIndex: 0,
  selectedMedicine: "마운자로",
  counts: defaultCounts(0),
  later: false,
  drugMenuOpen: false,
  method: null,
  sort: "near",
  selectedHospitalId: "asan",
  sheetSnap: 1,
});

// ─── Utilities ─────────────────────────────────
const formatWon = (v) => `${v.toLocaleString("ko-KR")}원~`;

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function selectedHospital() {
  return HOSPITALS.find((h) => h.id === store.get().selectedHospitalId) || HOSPITALS[0];
}

function sortedHospitals() {
  const { sort } = store.get();
  return [...HOSPITALS].sort((a, b) =>
    sort === "price"
      ? a.price - b.price
      : parseFloat(a.distance) - parseFloat(b.distance)
  );
}

// ─── Animation Helpers ─────────────────────────
function animate(el, keyframes, opts = {}) {
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  return el.animate(keyframes, { duration: 320, fill: "both", ...opts });
}

function slideInFromRight(el) {
  animate(el, [
    { opacity: 0.4, transform: "translateX(30px)" },
    { opacity: 1, transform: "translateX(0)" },
  ]);
}

function slideInFromLeft(el) {
  animate(el, [
    { opacity: 0.4, transform: "translateX(-20px)" },
    { opacity: 1, transform: "translateX(0)" },
  ]);
}

// ─── Component Helpers ─────────────────────────
function html(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");
}

// ─── Status Bar ────────────────────────────────
function StatusBar() {
  return html`
    <div class="status">
      <span>9:41</span>
      <span class="status-icons" aria-hidden="true">
        <span class="signal"></span>
        <span class="wifi"></span>
        <span class="battery"></span>
      </span>
    </div>`;
}

// ─── Top Bar ───────────────────────────────────
function Topbar(title, right = "") {
  return html`
    <header class="topbar">
      <button class="icon-btn" data-action="back" aria-label="뒤로">‹</button>
      <strong>${title}</strong>
      ${right || "<span></span>"}
    </header>`;
}

// ─── Bottom Navigation ─────────────────────────
function BottomNav() {
  return html`
    <nav class="bottom-nav">
      ${NAV_ITEMS
        .map(
          ([icon, label, active, badge], i) => `
        <button class="nav-item${active ? " active" : ""}" data-action="navigate" data-index="${i}">
          <span class="nav-icon${badge ? " nav-badge" : ""}">${icon}</span>
          <span>${label}</span>
        </button>`
        )
        .join("")}
    </nav>`;
}

// ─── Grabber ───────────────────────────────────
function Grabber() {
  return '<div class="grabber"></div>';
}

// ─── Screens ───────────────────────────────────

// ── Home Screen ──
function HomeScreen() {
  return html`
    <section class="screen home">
      ${StatusBar()}
      <div class="content">
        <div class="brand-row">
          <div class="brand">나만의Dr.</div>
          <div class="brand-actions" aria-hidden="true">
            <span>⌕</span><span>🎁</span><span class="bell">♩</span>
          </div>
        </div>
        <div class="quick-grid">
          <button class="quick-card" data-action="openMedicine">
            <span class="quick-icon">🏥</span><span>병원/약국<br />찾기</span>
          </button>
          <button class="quick-card" data-action="openMedicine">
            <span class="quick-icon">💉</span><span>다이어트<br />주사 기록</span>
          </button>
          <button class="quick-card" data-action="openMedicine">
            <span class="quick-icon">🚨</span><span>소아과<br />119 제도</span>
          </button>
        </div>
        <button class="insurance" data-action="openMedicine">
          <span>
            <strong>내 암보험료는 얼마일까?<br />(무)든든 암보험(비갱신형)</strong>
            <span>생명보험협회 심의필 제2025-05613호 (2025-08-26 ~ 2026-08-25)</span>
          </span>
          <span class="calc">🧮</span>
        </button>
        <section class="service-panel">
          <div class="tabs">
            <button class="tab active">비대면 진료</button>
            <button class="tab" data-action="openMedicine">
              최저가 병원 예약<span class="tab-dot"></span>
            </button>
          </div>
          <div class="symptom-grid">
            ${SYMPTOMS.map(
              ([icon, label]) => `
                <button class="symptom" data-action="openMedicine">
                  <span class="emoji">${icon}</span><span>${label}</span>
                </button>`
            ).join("")}
          </div>
        </section>
      </div>
      ${BottomNav()}
    </section>`;
}

// ── Medicine Select Screen ──
function MedicineSelectScreen() {
  const { counts, selectedDrugIndex, later, drugMenuOpen } = store.get();
  const drug = DRUGS[selectedDrugIndex];
  const doses = drug.doses;
  const hasCount = Object.values(counts).some((v) => v > 0);
  return html`
    <section class="screen select">
      ${StatusBar()}
      <div class="content">
        <div class="medicine-select">
          ${Grabber()}
          <button class="icon-btn" data-action="backHome" aria-label="뒤로">‹</button>
          <h1 class="headline">처방을 희망하는<br />주사제 종류를 선택해 주세요</h1>
          <p class="subcopy">의사의 진단에 따라 처방 및 단위가 변경될 수 있어요</p>
          <button class="drug-family${drugMenuOpen ? " open" : ""}" data-action="toggleDrugMenu">
            <span class="radio on"></span><span>${drug.name}</span>
            <span class="drug-switch">${drugMenuOpen ? "▲" : "▼"}</span>
          </button>
          ${drugMenuOpen ? html`
          <div class="drug-menu">
            ${DRUGS.map((d, i) => html`
              <button class="drug-option${i === selectedDrugIndex ? " active" : ""}" data-action="selectDrug" data-index="${i}">
                <span class="radio${i === selectedDrugIndex ? " on" : ""}"></span>
                <span class="drug-option-name">${d.name}</span>
                <span class="drug-option-type">${d.type}</span>
              </button>
            `).join("")}
          </div>` : ""}
          ${doses
            .map(
              (dose) => `
          <div class="dose-row${later ? " dim" : ""}">
            <span class="dose-label">${dose}</span>
            <button class="stepper" data-action="minusDose" data-dose="${dose}" ${later || counts[dose] === 0 ? "disabled" : ""}>−</button>
            <span class="count">${counts[dose]}</span>
            <button class="stepper" data-action="plusDose" data-dose="${dose}" ${later ? "disabled" : ""}>+</button>
          </div>`
            )
            .join("")}
          <button class="select-later${later ? " selected" : ""}" data-action="toggleLater">
            <span><span class="radio ${later ? "on" : ""}"></span> &nbsp; 진료후 결정할게요</span><span>${later ? "✓" : "⌄"}</span>
          </button>
        </div>
      </div>
      <button class="primary-fixed${!later && !hasCount ? " muted" : ""}" data-action="goMap">${later ? "진료 후 결정 · 병원 선택하기" : hasCount ? "병원·약국 선택하기" : "먼저 용량을 선택해 주세요"}</button>
    </section>`;
}

// ── Map / List Screen ──
const PIN_POSITIONS = [
  { left: "98px", top: "119px" },
  { left: "156px", top: "84px" },
  { right: "79px", top: "67px" },
  { right: "118px", top: "124px" },
];

const SNAP_POINTS = [0, 0.15, 0.5]; // expanded, mid (1/3 map), collapsed (fraction hidden)

function MapListScreen() {
  const { sort, sheetSnap } = store.get();
  const sorted = sortedHospitals();
  const cheapestId = [...HOSPITALS].sort((a, b) => a.price - b.price)[0].id;
  const nearestId = [...HOSPITALS].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))[0].id;
  return html`
    <section class="screen map-screen">
      ${Topbar("다이어트 주사 예약")}
      <div class="map-area" id="mapArea">
        <div class="map-inner" id="mapInner">
          <button class="map-chip">⌖ 내 주변 · <strong>역삼1동</strong>⌄</button>
          <button class="locate" aria-label="현재 위치">◎</button>
          <span class="district" style="left:216px;top:75px">강남구</span>
          <span class="district" style="right:58px;top:198px">서초구</span>
          ${HOSPITALS.map((h, i) => {
            const style = Object.entries(PIN_POSITIONS[i]).map(([k, v]) => `${k}:${v}`).join(";");
            const active = h.id === (sort === "price" ? cheapestId : nearestId);
            return `<span class="price-pin${active ? " active" : ""}" style="${style}">${Math.round(h.price / 10000)}만~</span>`;
          }).join("")}
        </div>
      </div>
      <section class="list-sheet" id="mapSheet" data-sheet-snap="${sheetSnap}">
        <div class="sheet-handle" id="sheetHandle">
          ${Grabber()}
        </div>
        <div class="sheet-body">
          <div class="sorts">
            <button class="pill${sort === "near" ? " active" : ""}" data-action="sort" data-sort="near">가까운 순</button>
            <button class="pill${sort === "price" ? " active" : ""}" data-action="sort" data-sort="price">최저가 순</button>
          </div>
          ${sorted.map(HospitalCard).join("")}
        </div>
      </section>
    </section>`;
}

// ── Hospital Card Component ──
function HospitalCard(hospital) {
  return html`
    <article class="hospital-card" data-hospital-id="${hospital.id}">
      <h3>${hospital.name}</h3>
      <div class="meta">
        <span><span class="star">★</span> ${hospital.rating} <span class="muted">(${hospital.reviews})</span></span>
        <span>♡ ${hospital.reorder}</span>
      </div>
      <div class="meta" style="margin-top:10px">
        <span>◷ 영업 중 ${hospital.close}</span>
        <span>· ${hospital.wait}</span>
        <span>· ${hospital.distance}</span>
      </div>
      <div class="price-box">
        <small>예상 결제 금액</small>
        <div class="meta" style="margin-top:12px">
          <span>⌄ 진료비 포함</span>
          <span>⌄ 약제비 포함</span>
        </div>
        <div class="price-line">
          <span>최저 예상 금액</span>
          <strong>${formatWon(hospital.price)}</strong>
        </div>
        <small style="display:block;text-align:right;margin-top:14px">진료 후 선택 용량에 따라 달라질 수 있어요</small>
      </div>
      <button class="outline-btn" data-action="detail" data-id="${hospital.id}">용량별 가격 보기</button>
    </article>`;
}

// ── Detail Screen ──
function DetailScreen() {
  const hospital = selectedHospital();
  return html`
    <section class="screen detail">
      ${StatusBar()}
      <div class="content">
        <div class="detail-title">
          <span>예상 결제 금액 상세</span>
          <button class="icon-btn" data-action="goMap" aria-label="닫기">×</button>
        </div>
        <section class="info-banner">
          <span class="check">✓</span>
          <div>
            <strong>투명한 가격 구조</strong><br />
            <small class="muted">진료비와 약제비 외 추가 비용은 없습니다</small>
          </div>
        </section>
        <section class="choice-box">
          <small>선택 용량 기준</small>
          <strong>다이어트 주사 2.5mg × 1팩</strong>
          <small>진료 후 용량 조정 가능</small>
        </section>
        ${CostSection(hospital.name, "진료비", 15000, "초진 진료비 포함")}
        ${CostSection("연계 약국", "약제비", hospital.med, "약제비, 조제 수수료, 의료 소모품 모두 포함")}
        <section class="total-card">
          <div>
            <strong>예상 총 금액</strong><br />
            <small class="muted">진료비 15,000원 + 약제비 ${hospital.med.toLocaleString("ko-KR")}원</small>
          </div>
          <strong>${formatWon(hospital.price)}</strong>
        </section>
      </div>
      <div class="bottom-action"><button data-action="confirm">예약 진행하기</button></div>
    </section>`;
}

function CostSection(title, label, value, help) {
  return html`
    <section class="cost-section">
      <div class="cost-heading"><span class="dot"></span>${title}</div>
      <div class="cost-row">
        <span class="muted">${label}</span>
        <strong>${value.toLocaleString("ko-KR")}원</strong>
      </div>
      <div style="padding:0 16px"><small class="muted">${help}</small></div>
    </section>`;
}

// ─── Overlays ──────────────────────────────────

// ── Medicine Sheet (Bottom Sheet) ──
function MedicineSheet() {
  return html`
    <div class="overlay" data-action="closeOverlay">
      <section class="bottom-sheet medicine-sheet" data-sheet="medicine" data-stop>
        ${Grabber()}
        <h2 class="sheet-title">다이어트 진료는<br />'최저가 병원예약'만 가능해요</h2>
        <p class="sheet-sub">비대면 만큼 저렴한 동네 병원을 예약해보세요!</p>
        <div class="drug-list">
          ${DRUGS
            .map(
              (drug, i) => `
            <button class="drug-card" data-action="chooseMedicine" data-name="${drug.name}" data-index="${i}">
              <span class="drug-thumb" style="background:${["#1d2939", "#0f9f8f", "#1f5eff"][i]}">▰</span>
              <span class="drug-info">
                <h3>${drug.name}</h3>
                <span class="drug-type">${drug.type}</span>
                <strong class="drug-desc">${drug.desc}</strong>
                <span class="tag-row">
                  <span class="tag">${drug.cycle}</span>
                  <span class="tag">${drug.startDose} 시작</span>
                </span>
              </span>
              <span class="drug-arrow">›</span>
            </button>`
            )
            .join("")}
        </div>
      </section>
    </div>`;
}

// ── Method Sheet (Bottom Sheet) ──
function MethodSheet() {
  const { method } = store.get();
  return html`
    <div class="overlay" data-action="closeOverlay">
      <section class="bottom-sheet method-sheet" data-sheet="method" data-stop>
        ${Grabber()}
        <h2 class="sheet-title" style="font-size:20px">약 수령 방법 선택</h2>
        <p class="sheet-sub">필요에 맞는 방법을 선택하세요</p>
        <button class="method-card${method === "same" ? " selected" : ""}" data-action="method" data-method="same">
          <span class="method-radio${method === "same" ? " on" : ""}"></span>
          <h3>병원에서 약 수령</h3>
          <p>진료 후, 같은 병원에서 바로 약을 수령합니다.</p>
          <ul><li>이동이 적어요</li><li>빠르게 예약 가능</li></ul>
        </button>
        <button class="method-card${method === "separate" ? " selected" : ""}" data-action="method" data-method="separate">
          <span class="method-radio${method === "separate" ? " on" : ""}"></span>
          <h3>병원과 약국을 각각 선택</h3>
          <p>진료 후, 원하는 약국에서 약을 수령합니다.</p>
          <ul><li>약국 가격 비교 가능</li><li>주변 약국 탐색 가능</li></ul>
        </button>
        <button class="sheet-primary${method ? " enabled" : ""}" data-action="completeMethod" ${method ? "" : "disabled"}>선택 완료</button>
      </section>
    </div>`;
}

// ── Confirm Dialog ──
function ConfirmDialog() {
  const hospital = selectedHospital();
  return html`
    <div class="overlay dialog-wrap" data-action="closeOverlay">
      <section class="dialog" data-stop>
        <h2>예약을 신청할까요?</h2>
        <p>${hospital.name}에 다이어트 주사 예약을 요청합니다.</p>
        <div class="dialog-actions">
          <button class="secondary" data-action="closeOverlay">취소</button>
          <button class="primary" data-action="done">신청하기</button>
        </div>
      </section>
    </div>`;
}

// ── Done Dialog ──
function DoneDialog() {
  return html`
    <div class="overlay dialog-wrap" data-action="closeOverlay">
      <section class="dialog" data-stop>
        <h2>예약 신청 완료</h2>
        <p>병원 확인 후 알림으로 진행 상황을 안내드릴게요.</p>
        <div class="dialog-actions" style="grid-template-columns:1fr">
          <button class="primary" data-action="backHome">확인</button>
        </div>
      </section>
    </div>`;
}

// ─── Overlay Renderer ──────────────────────────
function renderOverlay() {
  const { overlay } = store.get();
  const root = $("#overlay-root");
  let html = "";

  if (overlay === "medicine") html = MedicineSheet();
  else if (overlay === "method") html = MethodSheet();
  else if (overlay === "confirm") html = ConfirmDialog();
  else if (overlay === "done") html = DoneDialog();

  root.innerHTML = html;

  const sheet = $("[data-sheet]", root);
  if (sheet) {
    const overlayEl = sheet.closest(".overlay");
    requestAnimationFrame(() => {
      overlayEl.classList.add("open");
      sheet.classList.add("open");
    });
    initBottomSheetTouch(sheet);
  } else {
    const overlayEl = $(".overlay", root);
    if (overlayEl) {
      requestAnimationFrame(() => overlayEl.classList.add("open"));
    }
  }
}

// ─── Screen Renderer ───────────────────────────
function render(direction = "forward") {
  const { screen } = store.get();
  const app = $("#app");

  const screens = {
    home: HomeScreen,
    select: MedicineSelectScreen,
    map: MapListScreen,
    detail: DetailScreen,
  };

  app.innerHTML = screens[screen]();

  const currentScreen = $(".screen", app);
  if (currentScreen) {
    if (direction === "forward") slideInFromRight(currentScreen);
    else slideInFromLeft(currentScreen);
  }

  renderOverlay();
  if (screen === "map") { initMapSheetDrag(); initMapDrag(); }
}

// ─── Bottom Sheet Touch ────────────────────────
function initBottomSheetTouch(sheetEl) {
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  let isDecelerating = false;
  const threshold = 100;

  function endDrag() {
    isDragging = false;
    sheetEl.classList.remove("dragging");

    if (currentY > threshold) {
      isDecelerating = true;
      sheetEl.style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
      sheetEl.style.transform = "translateY(100%)";
      const overlayEl = sheetEl.closest(".overlay");
      if (overlayEl) overlayEl.classList.remove("open");
      setTimeout(() => {
        isDecelerating = false;
        store.set((s) => ({ ...s, overlay: null }));
        renderOverlay();
      }, 350);
    } else {
      sheetEl.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      sheetEl.style.transform = "translateY(0)";
      setTimeout(() => { isDecelerating = false; }, 500);
    }
    currentY = 0;
  }

  sheetEl.addEventListener("touchstart", (e) => {
    if (isDecelerating) return;
    if (sheetEl.scrollTop > 0) return;
    startY = e.touches[0].clientY;
    isDragging = true;
    sheetEl.classList.add("dragging");
  }, { passive: true });

  sheetEl.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dy = e.touches[0].clientY - startY;
    currentY = Math.max(0, dy * (dy < 0 ? 1 : 0.6));
    sheetEl.style.transform = `translateY(${currentY}px)`;
  }, { passive: true });

  sheetEl.addEventListener("touchend", endDrag, { passive: true });
  sheetEl.addEventListener("touchcancel", endDrag, { passive: true });
}

// ─── Map Sheet Drag (iOS-style Bottom Sheet) ───
function initMapSheetDrag() {
  const sheet = document.getElementById("mapSheet");
  const handle = document.getElementById("sheetHandle");
  if (!sheet || !handle) return;

  let startY = 0;
  let currentFrac = SNAP_POINTS[store.get().sheetSnap];
  let isDragging = false;

  function setPosition(frac, animated = false) {
    currentFrac = Math.max(0, Math.min(1, frac));
    sheet.style.transition = animated ? "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none";
    sheet.style.transform = `translateY(${currentFrac * 100}%)`;
  }

  function snap() {
    const distances = SNAP_POINTS.map((p) => Math.abs(currentFrac - p));
    const nearestIdx = distances.indexOf(Math.min(...distances));
    const nearest = SNAP_POINTS[nearestIdx];
    store.set((s) => ({ ...s, sheetSnap: nearestIdx }));
    setPosition(nearest, true);
  }

  function moveSheet(dy) {
    const sheetH = sheet.offsetHeight;
    if (sheetH === 0) return;
    const deltaFrac = dy / sheetH;
    const friction = currentFrac < 0.2 && deltaFrac < 0 ? 0.6 : deltaFrac > 0 ? 0.5 : 1;
    currentFrac = Math.max(0, Math.min(1, currentFrac + deltaFrac * friction));
    setPosition(currentFrac);
  }

  handle.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    isDragging = true;
    setPosition(currentFrac);
  }, { passive: true });

  handle.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    moveSheet(e.touches[0].clientY - startY);
    startY = e.touches[0].clientY;
  }, { passive: true });

  handle.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    snap();
  }, { passive: true });

  handle.addEventListener("touchcancel", () => {
    isDragging = false;
    snap();
  }, { passive: true });

  setPosition(SNAP_POINTS[store.get().sheetSnap], false);
}

// ─── Mock Map Drag ─────────────────────────────
function initMapDrag() {
  const area = document.getElementById("mapArea");
  const inner = document.getElementById("mapInner");
  if (!area || !inner) return;

  let startX = 0, startY = 0;
  let mx = 0, my = 0;
  let isDragging = false;
  const LIMIT = 40;

  function applyPos(animated = false) {
    inner.style.transition = animated ? "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none";
    inner.style.transform = `translate(${mx}px, ${my}px)`;
  }

  function onMove(clientX, clientY) {
    if (!isDragging) return;
    let dx = clientX - startX;
    let dy = clientY - startY;
    mx = Math.max(-LIMIT, Math.min(LIMIT, dx));
    my = Math.max(-LIMIT, Math.min(LIMIT, dy));
    applyPos();
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    mx = 0;
    my = 0;
    applyPos(true);
  }

  // Touch
  area.addEventListener("touchstart", (e) => {
    if (e.target.closest(".list-sheet, .sheet-handle, .sheet-body")) return;
    const t = e.touches[0];
    startX = t.clientX - mx;
    startY = t.clientY - my;
    isDragging = true;
  }, { passive: true });

  area.addEventListener("touchmove", (e) => {
    if (e.target.closest(".list-sheet, .sheet-handle, .sheet-body")) return;
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
  }, { passive: true });

  area.addEventListener("touchend", onEnd, { passive: true });
  area.addEventListener("touchcancel", onEnd, { passive: true });

  // Mouse
  area.addEventListener("mousedown", (e) => {
    if (e.target.closest(".list-sheet, .sheet-handle, .sheet-body")) return;
    startX = e.clientX - mx;
    startY = e.clientY - my;
    isDragging = true;
  });

  document.addEventListener("mousemove", (e) => {
    onMove(e.clientX, e.clientY);
  });

  document.addEventListener("mouseup", onEnd);
}

// ─── Actions Map ───────────────────────────────
const actions = {
  openMedicine() {
    store.set((s) => ({ ...s, overlay: "medicine" }));
    renderOverlay();
  },

  closeOverlay() {
    const { overlay } = store.get();
    if (!overlay) return;

    const sheet = $("[data-sheet]", $("#overlay-root"));
    if (sheet) {
      sheet.style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
      sheet.style.transform = "translateY(100%)";
      const overlayEl = sheet.closest(".overlay");
      if (overlayEl) overlayEl.classList.remove("open");
      setTimeout(() => {
        store.set((s) => ({ ...s, overlay: null }));
        renderOverlay();
      }, 350);
    } else {
      const overlayEl = $(".overlay", $("#overlay-root"));
      if (overlayEl) overlayEl.classList.remove("open");
      setTimeout(() => {
        store.set((s) => ({ ...s, overlay: null }));
        renderOverlay();
      }, 300);
    }
  },

  backHome() {
    store.set((s) => ({ ...s, screen: "home", overlay: null }));
    render("back");
  },

  back() {
    const { screen } = store.get();
    store.set((s) => ({ ...s, screen: screen === "map" ? "select" : "home", overlay: null }));
    render("back");
  },

  chooseMedicine(target) {
    const index = parseInt(target.dataset.index) || 0;
    store.set((s) => ({
      ...s,
      selectedDrugIndex: index,
      selectedMedicine: DRUGS[index].name,
      counts: defaultCounts(index),
      later: false,
      drugMenuOpen: false,
      screen: "select",
      overlay: null,
    }));
    render("forward");
  },

  plusDose(target) {
    const { later } = store.get();
    if (later) return;
    const dose = target.dataset.dose;
    store.set((s) => ({ ...s, counts: { ...s.counts, [dose]: s.counts[dose] + 1 } }));
    render("forward");
  },

  minusDose(target) {
    const { later } = store.get();
    if (later) return;
    const dose = target.dataset.dose;
    store.set((s) => ({
      ...s,
      counts: { ...s.counts, [dose]: Math.max(0, s.counts[dose] - 1) },
    }));
    render("forward");
  },

  goMap() {
    const { screen, later, counts } = store.get();
    if (screen === "select") {
      const hasCount = Object.values(counts).some((v) => v > 0);
      if (!later && !hasCount) return;
      store.set((s) => ({ ...s, screen: "map", overlay: "method" }));
      render("forward");
    } else {
      store.set((s) => ({ ...s, screen: "map" }));
      render("forward");
    }
  },

  method(target) {
    const method = target.dataset.method;
    store.set((s) => ({ ...s, method }));
    renderOverlay();
  },

  completeMethod() {
    actions.closeOverlay();
  },

  sort(target) {
    const sort = target.dataset.sort;
    store.set((s) => ({ ...s, sort }));
    render("forward");
  },

  detail(target) {
    store.set((s) => ({ ...s, selectedHospitalId: target.dataset.id, screen: "detail", overlay: null }));
    render("forward");
  },

  confirm() {
    store.set((s) => ({ ...s, overlay: "confirm" }));
    renderOverlay();
  },

  done() {
    store.set((s) => ({ ...s, overlay: "done" }));
    renderOverlay();
  },

  toggleLater() {
    const { later, selectedDrugIndex } = store.get();
    const newLater = !later;
    store.set((s) => ({
      ...s,
      later: newLater,
      drugMenuOpen: false,
      counts: newLater ? defaultCounts(selectedDrugIndex) : s.counts,
    }));
    render("forward");
  },

  toggleDrugMenu() {
    const { drugMenuOpen } = store.get();
    store.set((s) => ({ ...s, drugMenuOpen: !drugMenuOpen }));
    render("forward");
  },

  selectDrug(target) {
    const index = parseInt(target.dataset.index);
    if (index === store.get().selectedDrugIndex) {
      store.set((s) => ({ ...s, drugMenuOpen: false }));
      render("forward");
      return;
    }
    store.set((s) => ({
      ...s,
      selectedDrugIndex: index,
      selectedMedicine: DRUGS[index].name,
      counts: defaultCounts(index),
      later: false,
      drugMenuOpen: false,
    }));
    render("forward");
  },

  navigate(target) {
    const index = parseInt(target.dataset.index);
    if (index === 1) {
      store.set((s) => ({ ...s, screen: "select", overlay: null }));
      render("forward");
    } else {
      store.set((s) => ({ ...s, screen: "home", overlay: null }));
      render("forward");
    }
  },
};

// ─── Event Delegation ──────────────────────────
document.addEventListener("click", (e) => {
  const stopTarget = e.target.closest("[data-stop]");
  if (stopTarget) e.stopPropagation();

  const target = e.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  if (actions[action]) {
    actions[action](target);
  }
});

// ─── Init ──────────────────────────────────────
render();
