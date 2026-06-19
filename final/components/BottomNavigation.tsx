import Image from "next/image";

const navItems = [
  {
    label: "홈",
    icon: "/assets/icons/bottom-nav/home.png",
    active: true,
    iconClassName: "h-6 w-6",
    width: 24,
    height: 24,
  },
  {
    label: "혜택",
    icon: "/assets/icons/bottom-nav/benefits.png",
    active: false,
    iconClassName: "h-6 w-6",
    width: 32,
    height: 30,
  },
  {
    label: "건강관리",
    icon: "/assets/icons/bottom-nav/health.png",
    active: false,
    iconClassName: "h-6 w-6",
    width: 24,
    height: 24,
  },
  {
    label: "의료기록",
    icon: "/assets/icons/bottom-nav/records.png",
    active: false,
    iconClassName: "h-6 w-6",
    width: 24,
    height: 24,
  },
  {
    label: "내 정보",
    icon: "/assets/icons/bottom-nav/profile.png",
    active: false,
    iconClassName: "h-6 w-6",
    width: 24,
    height: 24,
  },
];

export function BottomNavigation() {
  return (
    <nav
      data-section="bottom-navigation"
      className="sticky bottom-0 z-10 mt-[19px] h-[116px] overflow-hidden rounded-t-[24px] border-t border-[#e5e7eb] bg-white"
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
            <Image
              src={item.icon}
              alt=""
              width={item.width}
              height={item.height}
              unoptimized
              className={item.iconClassName}
            />
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
      <div className="relative h-[34px] bg-white">
        <div className="absolute bottom-2 left-1/2 h-[5px] w-36 -translate-x-1/2 rounded-full bg-black" />
      </div>
    </nav>
  );
}
