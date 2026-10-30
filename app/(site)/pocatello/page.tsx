import { CityPage } from "@/components/CityPage";
import { cities } from "@/content/cities";
import { pageMeta } from "@/lib/meta";

const c = cities.find((x) => x.slug === "pocatello")!;
export const metadata = pageMeta({ title: c.title, description: c.description, path: "/pocatello", og: "og-training" });

export default function Page() {
  return <CityPage slug="pocatello" />;
}
