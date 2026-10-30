import { CityPage } from "@/components/CityPage";
import { cities } from "@/content/cities";
import { pageMeta } from "@/lib/meta";

const c = cities.find((x) => x.slug === "idaho-falls")!;
export const metadata = pageMeta({ title: c.title, description: c.description, path: "/idaho-falls", og: "og-default" });

export default function Page() {
  return <CityPage slug="idaho-falls" />;
}
