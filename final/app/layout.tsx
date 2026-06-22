import type { Metadata, Viewport } from "next";
import { InstallPrompt } from "@/components/InstallPrompt";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "나만의닥터",
  description: "나만의닥터 홈 화면",
  applicationName: "나만의닥터",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "나만의닥터",
    statusBarStyle: "default",
  },
  icons: {
    apple: [
      {
        url: "/assets/pwa/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#f3f4f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ServiceWorkerRegister />
        <InstallPrompt />
        {children}
      </body>
    </html>
  );
}
