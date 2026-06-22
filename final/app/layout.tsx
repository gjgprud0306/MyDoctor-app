import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { InstallPrompt } from "@/components/InstallPrompt";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-58KL1SR9DG";

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <ServiceWorkerRegister />
        <InstallPrompt />
        {children}
      </body>
    </html>
  );
}
