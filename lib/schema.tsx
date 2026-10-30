// JSON-LD builders. Only confirmed offices get LocalBusiness entries.
import { offices, site, videos } from "@/content/config";
import type { Faq } from "@/content/faqs";
import type { SiteEvent } from "@/content/events";
import { pickStories, type Story } from "@/content/stories";

const abs = (p: string) => (p.startsWith("http") ? p : `${site.url}${p}`);

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#org`,
    name: site.brokerage,
    url: site.url,
    image: abs("/media/og-default.jpg"),
    parentOrganization: { "@type": "Organization", name: "Keller Williams Realty, Inc.", url: "https://www.kw.com" },
    areaServed: ["Idaho Falls, ID", "Pocatello, ID", "Bonneville County, ID", "Bannock County, ID"],
    sameAs: [site.youtube].filter(Boolean),
  };
}

export function localBusinessSchemas() {
  return offices
    .filter((o) => o.confirmed && o.street)
    .map((o) => ({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "@id": `${site.url}/${o.slug}#office`,
      name: o.name,
      url: `${site.url}/${o.slug}`,
      telephone: o.phone,
      image: abs("/media/og-default.jpg"),
      address: { "@type": "PostalAddress", streetAddress: o.street, addressLocality: o.city, addressRegion: "ID", postalCode: o.zip, addressCountry: "US" },
      parentOrganization: { "@id": `${site.url}/#org` },
    }));
}

export function faqSchema(list: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function videoSchema(v: { title: string; description: string; poster: string; src: string; duration: string; uploadDate: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: v.description,
    thumbnailUrl: abs(v.poster),
    contentUrl: abs(v.src),
    uploadDate: v.uploadDate,
    duration: v.duration,
    publisher: { "@id": `${site.url}/#org` },
  };
}

export const storyVideoSchema = (s: Story) =>
  videoSchema({ title: `${s.name}: ${s.result}`, description: s.quote, poster: s.poster, src: s.video, duration: s.duration, uploadDate: s.uploadDate });

export const homeVideos = () => [videoSchema(videos.skilledAgents), videoSchema(videos.redDay), ...(({ wide, tall }) => [...wide, ...tall])(pickStories()).map(storyVideoSchema)];

export function eventSchema(e: SiteEvent) {
  const o = offices.find((x) => x.slug === e.officeSlug);
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: e.title,
    description: `${e.pitch} ${e.openTo}`,
    startDate: e.start,
    endDate: e.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: abs("/media/trainingFinancial-1024.webp"),
    isAccessibleForFree: true,
    location: o?.street
      ? { "@type": "Place", name: o.name, address: { "@type": "PostalAddress", streetAddress: o.street, addressLocality: o.city, addressRegion: "ID", postalCode: o.zip, addressCountry: "US" } }
      : { "@type": "Place", name: e.location },
    organizer: { "@type": "Organization", name: site.brokerage, url: site.url },
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${site.url}/events` },
  };
}

/** JobPosting-style schema for the career itself (independent-contractor role). */
export function careerSchema(city: string) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `Real Estate Agent (Independent Contractor), ${city}`,
    description: `<p>Build your real estate career with ${site.brokerage} in ${city}, Idaho. Weekly training, KW Command technology, mentorship, KW MyWay compensation plans and profit share.</p>`,
    datePosted: "2026-10-23",
    validThrough: "2027-10-23",
    employmentType: "CONTRACTOR",
    hiringOrganization: { "@type": "Organization", name: site.brokerage, sameAs: site.url },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: city, addressRegion: "ID", addressCountry: "US" } },
    directApply: false,
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
