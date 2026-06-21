import { SystemIcon } from "@/components/SystemIcon";

type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex h-[49px] items-end justify-between px-4 pb-2">
      <h2 className="text-base font-medium leading-[21px] tracking-[-0.02em] text-black">
        {title}
      </h2>
      <button
        type="button"
        className="flex items-center gap-0.5 text-xs font-medium leading-4 text-[#9ca3af]"
      >
        전체보기
        <SystemIcon name="chevronRight" className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </div>
  );
}
