import { SystemIcon } from "@/components/SystemIcon";

const navItems = [
  {
    label: "홈",
    icon: "home" as const,
    active: true,
  },
  {
    label: "혜택",
    icon: "benefits" as const,
    active: false,
    badge: true,
  },
  {
    label: "건강관리",
    icon: "health" as const,
    active: false,
  },
  {
    label: "의료기록",
    icon: "records" as const,
    active: false,
  },
  {
    label: "내 정보",
    icon: "profile" as const,
    active: false,
  },
];

export function BottomNavigation() {
  return (
    <nav
      data-section="bottom-navigation"
      className="bottom-navigation sticky bottom-0 z-10 mt-[19px] h-[116px] overflow-hidden rounded-t-[24px] border-t border-[#e5e7eb] bg-white"
      aria-label="하단 탭"
    >
      <div className="grid h-[82px] grid-cols-5 px-[18px] pt-[14px]">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-current={item.active ? "page" : undefined}
            className="flex h-[68px] cursor-default flex-col items-center justify-start gap-[7px]"
            tabIndex={-1}
          >
            <span className="relative grid h-6 w-6 place-items-center">
              <SystemIcon
                name={item.icon}
                className={`h-6 w-6 ${
                  item.active ? "text-[#21242c]" : "text-[#c4c4c4]"
                }`}
                strokeWidth={item.active ? 2.4 : 2}
              />
              {item.badge ? (
                <span className="absolute right-[-3px] top-[-2px] h-[5px] w-[5px] rounded-full bg-[#f04242]" />
              ) : null}
            </span>
            <span
              className={`whitespace-nowrap text-[11px] leading-[17px] ${
                item.active
                  ? "font-bold text-[#21242c]"
                  : "font-medium text-[#c4c4c4]"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <div className="home-indicator relative h-[34px] bg-white">
        <div className="absolute bottom-2 left-1/2 h-[5px] w-36 -translate-x-1/2 rounded-full bg-black" />
      </div>
    </nav>
  );
}
