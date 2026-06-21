import Image from "next/image";

export function IosStatusBar() {
  return (
    <div className="relative h-[50px] w-full overflow-hidden bg-white">
      <Image
        src="/assets/images/system/ios-status-bar.png"
        alt=""
        width={393}
        height={50}
        priority
        unoptimized
        className="h-[50px] w-full object-fill"
      />
    </div>
  );
}
