const navItems = ["홈", "혜택", "건강관리", "의료기록", "내 정보"];

export function BottomNavigation() {
  return (
    <nav className="sticky bottom-0 z-10 mt-7 overflow-hidden rounded-t-[24px] border-t border-[#e5e7eb] bg-white pb-2 shadow-[0_-6px_18px_rgba(17,24,39,0.05)]">
      <div className="grid h-[82px] grid-cols-5 items-end px-3 pb-[18px] pt-3">
        {navItems.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`flex h-full flex-col items-center justify-end gap-2 text-[11px] leading-[16px] ${
              index === 0 ? "font-bold text-[#21242c]" : "font-medium text-[#c4c4c4]"
            }`}
          >
            <span
              className={`h-6 w-6 rounded-full ${
                index === 0 ? "bg-[#3b82f6]" : "bg-[#eef1f5]"
              }`}
              aria-hidden="true"
            />
            <span>{item}</span>
          </button>
        ))}
      </div>
      <div className="mx-auto h-[5px] w-36 rounded-full bg-black" />
    </nav>
  );
}
