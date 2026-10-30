import { FaqSection, FinalCta } from "@/components/sections";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "FAQ: Joining KW East Idaho",
  description: "Will I lose my listings? What does it cost? How does cap work? Do I have to recruit? Straight answers about joining Keller Williams Realty East Idaho.",
  path: "/faq",
});

export default function Page() {
  return (
    <>
      <div className="on-dark bg-black py-12 text-white md:py-16">
        <div className="wrap"><h1 className="text-4xl font-bold md:text-6xl">Questions agents ask us.</h1></div>
      </div>
      <FaqSection />
      <FinalCta />
    </>
  );
}
