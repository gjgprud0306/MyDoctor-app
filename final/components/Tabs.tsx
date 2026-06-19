const tabs = ["비대면 진료", "최저가 병원"];

export function Tabs() {
  return (
    <div data-section="tabs" className="mt-[22px] border-b-2 border-[#d1d5db] bg-appBg">
      <div className="grid h-10 grid-cols-2">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className="flex flex-col items-center justify-between px-3 pt-2 text-lg font-semibold leading-[23px] tracking-[-0.02em] text-black"
          >
            <span>{tab}</span>
            <span
              className={`h-0.5 w-full rounded-full ${
                index === 0 ? "bg-primary" : "bg-transparent"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
