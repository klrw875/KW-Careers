import { pageMeta } from "@/lib/meta";
import { leadOwner, marketCenter, site } from "@/content/config";

export const metadata = pageMeta({ title: "Privacy Policy", description: `How ${site.brokerage} handles the information you share on this site.`, path: "/privacy" });

// TODO(legal): have counsel review before launch.
export default function Page() {
  return (
    <article className="wrap max-w-3xl py-14 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:mt-3 [&_p]:text-kw-gray-medium">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p>Draft for legal review. Last updated October 23, 2026.</p>
      <h2>What we collect</h2>
      <p>When you fill out a form, take the quiz or use the calculator, we collect what you enter (such as your name, mobile number, email and answers) plus how you found us (for example, ad campaign tags and the page you landed on).</p>
      <h2>How we use it</h2>
      <p>To contact you about real estate career opportunities at {site.brokerage}, send what you asked for, and improve this site. We don’t sell your information.</p>
      <h2>Text messages</h2>
      <p>If you check the consent box, we may send calls and texts, including automated messages, to the number you provided. Consent is not required to talk with us or to join. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help.</p>
      <h2>Cookies and analytics</h2>
      <p>We use cookies and similar tools (Google Analytics, Google Ads, Meta Pixel) to understand site use and show relevant ads. You can block cookies in your browser settings.</p>
      <h2>Contact</h2>
      <p>{site.brokerage}, {marketCenter.street}, {marketCenter.city}, ID {marketCenter.zip} · {marketCenter.phone} · {leadOwner.email}</p>
    </article>
  );
}
