import { SystemIcon } from "@/components/SystemIcon";

const headerIcons = [
  { label: "혜택", icon: "benefits" as const },
  { label: "검색", icon: "search" as const },
  { label: "알림", icon: "bell" as const, badge: true },
];

function StatusBar() {
  return (
    <div className="device-status flex h-[50px] items-end justify-between px-8 pb-[7px] text-[17px] font-bold leading-[22px] text-black">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="grid h-[13px] w-[19px] grid-cols-4 items-end gap-[2px]">
          <span className="h-[4px] rounded-[1px] bg-black" />
          <span className="h-[7px] rounded-[1px] bg-black" />
          <span className="h-[10px] rounded-[1px] bg-black" />
          <span className="h-[13px] rounded-[1px] bg-black" />
        </span>
        <span className="relative h-[13px] w-[18px] overflow-hidden">
          <span className="absolute left-0 top-[4px] h-[15px] w-[18px] rounded-t-full border-[2px] border-black border-b-0" />
          <span className="absolute bottom-0 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-black" />
        </span>
        <span className="relative h-[13px] w-[27px] rounded-[3px] border border-black p-[2px]">
          <span className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black" />
          <span className="block h-full w-[18px] rounded-[2px] bg-black" />
        </span>
      </div>
    </div>
  );
}

export function AppHeader() {
  return (
    <header data-section="header" className="app-header h-[98px] bg-appBg">
      <StatusBar />
      <div className="flex h-12 items-center justify-between px-5">
        <div className="flex items-baseline gap-[1px]" aria-label="나만의닥터">
          <span className="text-[26px] font-extrabold leading-none text-figmaMuted">
            나만의
          </span>
          <span className="text-[25px] font-extrabold leading-none text-figmaMuted">
            Dr.
          </span>
        </div>
        <div className="flex items-center gap-4">
          {headerIcons.map((icon) => (
            <button
              key={icon.label}
              type="button"
              aria-label={icon.label}
              className="relative grid h-6 w-6 place-items-center"
            >
              <SystemIcon
                name={icon.icon}
                className="h-6 w-6 text-[#21242c]"
                strokeWidth={2.1}
              />
              {icon.badge ? (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#f04242] px-1 text-[10px] font-bold leading-none text-white">
                  N
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
