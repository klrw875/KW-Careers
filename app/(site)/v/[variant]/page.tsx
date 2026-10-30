// A/B hero variants with full navigation. proxy.ts rewrites "/" here for the test split.
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { heroVariants, type HeroVariant } from "@/content/copy";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(heroVariants).map((variant) => ({ variant }));
}

export const metadata = {
  ...pageMeta({
    title: "Join Keller Williams in Idaho Falls & Pocatello",
    description: "The #1 brokerage in the Snake River MLS. Weekly training, KW MyWay plans you choose, and profit share.",
    path: "/",
  }),
};

export default async function Page({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!(variant in heroVariants)) notFound();
  return <HomePage variant={variant as HeroVariant} />;
}
