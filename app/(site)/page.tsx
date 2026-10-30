import { HomePage } from "@/components/HomePage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Join Keller Williams in Idaho Falls & Pocatello",
  description: "The #1 brokerage in the Snake River MLS. Weekly training, KW MyWay plans you choose, and profit share. Book a confidential 20-minute career conversation.",
  path: "/",
});

export default function Page() {
  return <HomePage variant="a" />;
}
