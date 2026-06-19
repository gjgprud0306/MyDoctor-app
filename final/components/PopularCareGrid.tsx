import type { CareItem } from "@/lib/home-data";

type PopularCareGridProps = {
  items: CareItem[];
};

export function PopularCareGrid({ items }: PopularCareGridProps) {
  const featured = items.filter((item) => !item.compact);
  const compact = items.filter((item) => item.compact);

  return (
    <section>
      <div className="grid grid-cols-2 gap-[17px] px-4 pb-3 pt-[5px]">
        {featured.map((item) => (
          <article
            key={item.title}
            className="flex h-[110px] items-end justify-between overflow-hidden rounded-[14px] bg-white px-1 py-[11px]"
          >
            <div className="flex h-[88px] w-[81px] flex-col justify-between rounded-[14px]">
              <span className="grid h-5 w-[37px] place-items-center rounded-[14px] bg-primary text-xs font-semibold leading-none tracking-[-0.02em] text-white">
                HOT
              </span>
              <div className="pl-2">
                <h3 className="text-sm font-semibold leading-[18px] tracking-[-0.02em] text-black">
                  {item.title}
                </h3>
                <p className="mt-0.5 whitespace-nowrap text-[10px] font-semibold leading-[13px] tracking-[-0.02em] text-figmaMuted">
                  {item.subtitle}
                </p>
              </div>
            </div>
            <img src={item.icon} alt="" className="h-[78px] w-[78px] object-contain" />
          </article>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-[14px] px-4 py-2.5">
        {compact.map((item) => (
          <article
            key={item.title}
            className="flex h-16 items-center justify-between overflow-hidden rounded-xl bg-white px-3 py-1.5"
          >
            <div>
              <h3 className="text-sm font-semibold leading-[18px] tracking-[-0.02em] text-black">
                {item.title}
              </h3>
              <p className="mt-0.5 text-[10px] font-semibold leading-[13px] tracking-[-0.02em] text-figmaMuted">
                {item.subtitle}
              </p>
            </div>
            <img src={item.icon} alt="" className="h-[52px] w-[52px] object-contain" />
          </article>
        ))}
      </div>
    </section>
  );
}
