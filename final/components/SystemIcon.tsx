import type { SVGProps } from "react";

type SystemIconProps = SVGProps<SVGSVGElement> & {
  name:
    | "benefits"
    | "bell"
    | "chevronRight"
    | "health"
    | "home"
    | "profile"
    | "records"
    | "search"
    | "star";
};

const paths = {
  benefits: (
    <>
      <path d="M4 11h16v9H4z" />
      <path d="M3 7h18v4H3z" />
      <path d="M12 7v13" />
      <path d="M12 7H8.5a2 2 0 1 1 1.6-3.2L12 7Z" />
      <path d="M12 7h3.5a2 2 0 1 0-1.6-3.2L12 7Z" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
      <path d="M10 21h4" />
    </>
  ),
  chevronRight: <path d="m9 18 6-6-6-6" />,
  health: (
    <>
      <path d="M20.8 8.6c0 5.2-8.8 10.4-8.8 10.4S3.2 13.8 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
      <path d="M8 12h2.5l1-2.5 2 5 1-2.5H16" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  records: (
    <>
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v5h4" />
      <path d="M10 12h6" />
      <path d="M10 16h6" />
    </>
  ),
  search: (
    <>
      <path d="M10.5 5.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
      <path d="m14.4 14.4 5.1 5.1" />
    </>
  ),
  star: (
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
  ),
};

export function SystemIcon({ name, className, ...props }: SystemIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
