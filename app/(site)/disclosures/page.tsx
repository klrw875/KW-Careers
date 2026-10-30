import { pageMeta } from "@/lib/meta";
import { profitShare, site, mlsSource } from "@/content/config";
import { compensationDisclaimer } from "@/content/compensation";

export const metadata = pageMeta({ title: "Disclosures", description: "Income, profit share and data disclosures for the KW East Idaho careers site.", path: "/disclosures" });

// TODO(compliance): operating principal / MCA approval; link the official KW profit share disclosure.
export default function Page() {
  return (
    <article className="wrap max-w-3xl py-14 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:mt-3 [&_p]:text-kw-gray-medium">
      <h1 className="text-4xl font-bold">Disclosures</h1>
      <h2>Income examples</h2>
      <p>{compensationDisclaimer} Results depend on your effort, skill, market conditions and many other factors.</p>
      <h2>Profit share</h2>
      <p>The ${profitShare.amount.toLocaleString("en-US")} figure is the total profit share paid to {site.brokerage} agents for {profitShare.period}. {profitShare.disclaimer} Participation, vesting and payments are governed by the official Keller Williams profit share plan documents.</p>
      <h2>Market data</h2>
      <p>{mlsSource} Agent counts come from the {site.brokerage} roster, not the MLS.</p>
      <h2>Brokerage</h2>
      <p>{site.brokerage} is a licensed Idaho real estate brokerage{site.brokerageLicense ? ` (license #${site.brokerageLicense})` : ""}.{site.designatedBroker ? ` Designated broker: ${site.designatedBroker}.` : ""} Each Keller Williams office is independently owned and operated. Equal Housing Opportunity.</p>
    </article>
  );
}
