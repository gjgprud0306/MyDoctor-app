export function PromoBanner() {
  return (
    <section
      data-section="promo-banner"
      className="-mt-[3px] h-[226px] bg-[#f4f4f4] px-5 pt-3"
    >
      <div
        data-section="promo-image"
        className="h-[202px] w-[352px] overflow-hidden rounded-[14px]"
      >
        <img
          src="/assets/images/banners/promo-diet-compare.png"
          alt="다이어트 최저가 병원 비교"
          className="h-[202px] w-full object-cover"
        />
      </div>
    </section>
  );
}
