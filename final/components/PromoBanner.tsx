import Image from "next/image";
import Link from "next/link";

export function PromoBanner() {
  return (
    <section
      data-section="promo-banner"
      className="-mt-[3px] h-[226px] bg-[#f4f4f4] px-5 pt-3"
    >
      <Link
        href="/high-return-hospital-list"
        data-section="promo-image"
        className="block h-[202px] w-[352px] overflow-hidden rounded-[14px]"
        aria-label="재진율 높은 병원 리스트 보기"
      >
        <Image
          src="/assets/images/banners/promo-diet-compare.png"
          alt="다이어트 최저가 병원 비교"
          width={352}
          height={202}
          priority
          unoptimized
          className="h-[202px] w-full object-cover"
        />
      </Link>
    </section>
  );
}
