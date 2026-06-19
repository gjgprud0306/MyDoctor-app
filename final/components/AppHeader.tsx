import Image from "next/image";

const headerIcons = [
  { label: "혜택", src: "/assets/icons/header/gift.png" },
  { label: "검색", src: "/assets/icons/header/search.png" },
  { label: "알림", src: "/assets/icons/header/notification.png", badge: true },
];

function StatusBar() {
  return (
    <div className="flex h-[50px] items-end justify-between px-8 pb-[7px] text-[17px] font-bold leading-[22px] text-black">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-[18px] rounded-sm border-2 border-black" />
        <span className="h-3 w-[17px] rounded-[3px] border-2 border-black" />
        <span className="h-[13px] w-[27px] rounded-[3px] border border-black p-[2px]">
          <span className="block h-full w-4 rounded-[2px] bg-black" />
        </span>
      </div>
    </div>
  );
}

export function AppHeader() {
  return (
    <header data-section="header" className="h-[98px] bg-appBg">
      <StatusBar />
      <div className="flex h-12 items-center justify-between px-5">
        <div className="flex items-center gap-1">
          <span className="text-[26px] font-extrabold leading-[39px] text-figmaMuted">
            나만의
          </span>
          <Image
            src="/assets/logos/brand-mark.png"
            alt="닥터"
            width={40}
            height={24}
            unoptimized
            className="h-6 w-10 object-contain"
          />
        </div>
        <div className="flex items-center gap-4">
          {headerIcons.map((icon) => (
            <button
              key={icon.label}
              type="button"
              aria-label={icon.label}
              className="relative grid h-6 w-6 place-items-center"
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
