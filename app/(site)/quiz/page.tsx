import { Quiz } from "@/components/Quiz";
import { FormProof } from "@/components/FormProof";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Career Fit Quiz: Find Your Path in Real Estate",
  description: "Seven quick taps. Get a personalized real estate career plan for Idaho Falls or Pocatello, whether you’re new, experienced or leading a team.",
  path: "/quiz",
});

export default function Page() {
  return (
    <section className="min-h-[80svh] bg-kw-wash py-10 md:py-16">
      <div className="wrap max-w-3xl">
        <p className="eyebrow text-kw-gray-medium">Career Fit Quiz · 60 seconds</p>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">Find your path at KW East Idaho.</h1>
        <div className="mt-8 bg-white p-5 md:p-8"><Quiz /></div>
        <div className="mt-6"><FormProof /></div>
      </div>
    </section>
  );
}
