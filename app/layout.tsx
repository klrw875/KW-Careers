import type { Metadata, Viewport } from "next";
import { Roboto, EB_Garamond } from "next/font/google";
import "./globals.css";
import { site } from "@/content/config";
import { Analytics } from "@/components/Analytics";
import { ExitOffer, StickyCta } from "@/components/Overlays";
import { JsonLd, organizationSchema } from "@/lib/schema";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto", display: "swap" });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400"], style: ["italic", "normal"], variable: "--font-garamond", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Real Estate Careers in East Idaho | ${site.brokerage}`, template: `%s | ${site.brokerage}` },
  description: "Build your real estate career in Idaho Falls and Pocatello with Keller Williams Realty East Idaho. Training, KW MyWay plans and profit share.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable} ${garamond.variable}`}>
      <body className="min-h-screen bg-white">
        <JsonLd data={organizationSchema()} />
        {children}
        <StickyCta />
        <ExitOffer />
        <Analytics />
      </body>
    </html>
  );
}
