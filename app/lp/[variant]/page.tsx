// Paid-traffic landing variants: same page, navigation hidden (one path: quiz or book).
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { Header, Footer } from "@/components/Chrome";
import { heroVariants, type HeroVariant } from "@/content/copy";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(heroVariants).map((variant) => ({ variant }));
}

export const metadata = pageMeta({
  title: "Your Real Estate Career in East Idaho",
  description: "Training, KW MyWay plans and profit share at the #1 brokerage in the Snake River MLS. Book a confidential conversation.",
  path: "/",
  noindex: true,
});

export default async function Page({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!(variant in heroVariants)) notFound();
  return (
    <>
      <Header bare />
      <main id="main"><HomePage variant={variant as HeroVariant} /></main>
      <Footer bare />
    </>
  );
}
