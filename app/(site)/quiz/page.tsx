import { Quiz } from "@/components/Quiz";
import { FormProof } from "@/components/FormProof";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Career Fit Quiz: Find Your Path in Real Estate",
  description: "Seven quick taps to your real estate career snapshot for Idaho Falls or Pocatello, whether you’re new, experienced or leading a team. Then build your full plan with Debbie.",
  path: "/quiz",
});

export default function Page() {
  return (
    <section className="min-h-[80svh] bg-kw-wash py-10 md:py-16">
      <div className="wrap max-w-3xl">
        <p className="eyebrow text-kw-gray-medium">Career Fit Quiz · 60 seconds</p>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">Find your path at KW East Idaho.</h1>
        <p className="mt-3 max-w-2xl text-lg">See your career snapshot right away. Then Debbie builds your full personalized plan with you in a 20-minute conversation.</p>
        <div className="mt-8 bg-white p-5 md:p-8"><Quiz /></div>
        <div className="mt-6"><FormProof /></div>
      </div>
    </section>
  );
}
