import Image from "next/image";

const headerIcons = [
  { label: "혜택", src: "/assets/icons/header/gift.png", left: 269 },
  { label: "검색", src: "/assets/icons/header/search.png", left: 309 },
  { label: "알림", src: "/assets/icons/header/notification.png", left: 349, badge: true },
];

function StatusBar() {
  return (
    <div className="device-status relative h-[50px] text-black">
      <span className="absolute left-[55px] top-[21px] text-[17px] font-bold leading-[22px]">
        9:41
      </span>
      <div className="absolute right-[34px] top-[25px] flex h-[13px] items-start gap-[7px]">
        <span className="grid h-[13px] w-[19px] grid-cols-4 items-end gap-[2px]">
          <span className="h-[5px] rounded-[1px] bg-black" />
          <span className="h-[8px] rounded-[1px] bg-black" />
          <span className="h-[11px] rounded-[1px] bg-black" />
          <span className="h-[13px] rounded-[1px] bg-black" />
        </span>
        <span className="relative h-[13px] w-[18px]">
          <span className="absolute left-0 top-0 h-[8px] w-[18px] overflow-hidden">
            <span className="absolute left-0 top-0 h-[17px] w-[18px] rounded-t-full border-[4px] border-black border-b-0" />
          </span>
          <span className="absolute left-[4px] top-[5px] h-[6px] w-[10px] overflow-hidden">
            <span className="absolute left-0 top-0 h-[10px] w-[10px] rounded-t-full border-[4px] border-black border-b-0" />
          </span>
          <span className="absolute bottom-0 left-[7px] h-[4px] w-[4px] rounded-full bg-black" />
        </span>
        <span className="relative h-[13px] w-[27px] rounded-[4px] border border-black p-[2px]">
          <span className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
          <span className="block h-full w-full rounded-[2px] bg-black" />
        </span>
      </div>
    </div>
  );
}

export function AppHeader() {
  return (
    <header data-section="header" className="app-header h-[98px] bg-appBg">
      <StatusBar />
      <div className="relative h-12">
        <Image
          src="/assets/logos/brand-logo.png"
          alt="나만의Dr."
          width={109}
          height={39}
          priority
          unoptimized
          className="absolute left-5 top-1 h-[39px] w-[109px] object-contain"
        />
        <div className="absolute left-0 top-0 h-12 w-full">
          {headerIcons.map((icon) => (
            <button
              key={icon.label}
              type="button"
              aria-label={icon.label}
              className="absolute top-3 grid h-6 w-6 place-items-center"
              style={{ left: icon.left }}
            >
              <Image
                src={icon.src}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="h-6 w-6 object-contain"
              />
              {icon.badge ? (
                <span className="absolute left-3 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#f04242] px-1 text-[10px] font-bold leading-none text-white">
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
