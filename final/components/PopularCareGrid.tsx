import Image from "next/image";
import type { CareItem } from "@/lib/home-data";

type PopularCareGridProps = {
  items: CareItem[];
  onDietClick?: () => void;
};

export function PopularCareGrid({ items, onDietClick }: PopularCareGridProps) {
  const featured = items.filter((item) => !item.compact);
  const compact = items.filter((item) => item.compact);

  return (
    <section>
      <div className="grid grid-cols-2 gap-[17px] px-4 pb-3 pt-[5px]">
        {featured.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={item.title === "다이어트" ? onDietClick : undefined}
            className="flex h-[110px] items-end justify-between overflow-hidden rounded-[14px] bg-white px-1 py-[11px] text-left"
          >
            <div className="flex h-[88px] w-[81px] flex-col justify-between rounded-[14px]">
              <span className="grid h-5 w-[37px] place-items-center rounded-[14px] bg-primary text-xs font-medium leading-none tracking-[-0.02em] text-white">
                HOT
              </span>
              <div className="pl-2">
                <h3 className="text-sm font-medium leading-[18px] tracking-[-0.02em] text-black">
                  {item.title}
                </h3>
                <p className="mt-0.5 whitespace-nowrap text-[10px] font-medium leading-[13px] tracking-[-0.02em] text-figmaMuted">
                  {item.subtitle}
                </p>
              </div>
            </div>
            <Image
              src={item.icon}
              alt=""
              width={78}
              height={78}
              unoptimized
              className="h-[78px] w-[78px] object-contain"
            />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-[14px] px-4 py-2.5">
        {compact.map((item) => (
          <article
            key={item.title}
            className="flex h-16 items-center justify-between overflow-hidden rounded-xl bg-white px-3 py-1.5"
          >
            <div>
              <h3 className="text-sm font-medium leading-[18px] tracking-[-0.02em] text-black">
                {item.title}
              </h3>
              <p className="mt-0.5 text-[10px] font-medium leading-[13px] tracking-[-0.02em] text-figmaMuted">
                {item.subtitle}
              </p>
            </div>
            <Image
              src={item.icon}
              alt=""
              width={52}
              height={52}
              unoptimized
              className="h-[52px] w-[52px] object-contain"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
