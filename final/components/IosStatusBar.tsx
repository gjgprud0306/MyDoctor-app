import Image from "next/image";

type IosStatusBarProps = {
  variant?: "default" | "home";
};

const statusBarSources = {
  default: "/assets/images/system/ios-status-bar.png",
  home: "/assets/images/system/ios-status-bar-home.png",
};

export function IosStatusBar({ variant = "default" }: IosStatusBarProps) {
  return (
    <div
      className={`relative h-[50px] w-full overflow-hidden ${
        variant === "home" ? "bg-appBg" : "bg-white"
      }`}
    >
      <Image
        src={statusBarSources[variant]}
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
