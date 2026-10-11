import Image from "next/image";

type IosStatusBarProps = {
  variant?: "default" | "home" | "hospital";
};

const statusBarSources = {
  hospital: "/assets/images/system/ios-status-bar-hospital.png",
  default: "/assets/images/system/ios-status-bar.png",
  home: "/assets/images/system/ios-status-bar-home.png",
};

export function IosStatusBar({ variant = "default" }: IosStatusBarProps) {
  return (
    <div
      className={`ios-status-bar relative w-full overflow-hidden ${variant === "hospital" ? "h-[62px]" : "h-[50px]"} ${
        variant === "home" ? "bg-appBg" : "bg-white"
      }`}
    >
      <Image
        src={statusBarSources[variant]}
        alt=""
        width={variant === "hospital" ? 402 : 393}
        height={variant === "hospital" ? 62 : 50}
        priority
        unoptimized
        className="h-full w-full object-fill"
      />
    </div>
  );
}
