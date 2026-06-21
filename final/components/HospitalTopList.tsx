import Image from "next/image";
import type { Hospital } from "@/lib/home-data";
import { SystemIcon } from "@/components/SystemIcon";

type HospitalTopListProps = {
  hospitals: Hospital[];
};

export function HospitalTopList({ hospitals }: HospitalTopListProps) {
  return (
    <section className="px-[18px] pt-2">
      <div className="grid grid-cols-3 gap-4">
        {hospitals.map((hospital) => (
          <article
            key={hospital.name}
            className="relative h-[132px] overflow-hidden rounded-[14px] bg-white px-2.5 pb-2 pt-2.5"
          >
            <span className="absolute left-1.5 top-2 grid h-3.5 w-8 place-items-center rounded-[14px] bg-primary text-[8px] font-medium leading-none text-white">
              BEST
            </span>
            <Image
              src={hospital.image}
              alt=""
              width={44}
              height={44}
              unoptimized
              className="absolute right-1.5 top-2.5 h-11 w-11 rounded-xl object-cover"
            />
            <div className="pt-[44px]">
              <h3 className="truncate text-xs font-medium leading-[14px] text-black">
                {hospital.name}
              </h3>
              <p className="mt-0.5 line-clamp-2 min-h-[20px] text-[8px] font-medium leading-[10px] text-textMuted">
                {hospital.description}
              </p>
              <div className="mt-1 flex items-center gap-0.5 text-[8px] font-medium leading-[10px] text-[#6b7280]">
                <SystemIcon
                  name="star"
                  className="h-2 w-2 fill-[#ffcc00] text-[#ffcc00]"
                  strokeWidth={1.8}
                />
                <span className="truncate">{hospital.rating}</span>
              </div>
              <p className="mt-1 text-xs font-medium leading-[15px] text-black">
                {hospital.price}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
