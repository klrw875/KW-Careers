import Link from "@/components/SmartLink";
import { Picture } from "./Picture";
import { TrackedLink } from "./client";
import type { MediaKey } from "@/content/media.generated";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  mobileImage,
  primary = { href: "/book", label: "Book a Confidential Conversation" },
  secondary = { href: "/quiz", label: "Find My Career Path" },
  alt = "",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: MediaKey;
  mobileImage?: MediaKey;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
  alt?: string;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-black text-white">
      <Picture k={image} mobile={mobileImage} alt={alt} sizes="100vw" fill priority className="-z-10" />
      <div className="absolute inset-0 -z-10 bg-black/60" aria-hidden />
      <div className="wrap flex min-h-[78svh] flex-col justify-end py-14 md:min-h-[34rem] md:py-20">
        <p className="eyebrow rise text-kw-gray-light">{eyebrow}</p>
        <h1 className="mt-4 max-w-[18ch] text-[2.5rem] leading-[1.03] font-bold md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-kw-gray-light md:text-xl">{intro}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <TrackedLink href={primary.href} event="cta_click" params={{ cta: "page_hero_primary" }} className="btn btn-red">{primary.label}</TrackedLink>
          {secondary && <Link href={secondary.href} className="btn btn-ghost text-white">{secondary.label}</Link>}
        </div>
      </div>
    </section>
  );
}

export function Split({ image, alt, children, reverse = false, dark = false, caption }: { image: MediaKey; alt: string; children: React.ReactNode; reverse?: boolean; dark?: boolean; caption?: string }) {
  return (
    <section className={`${dark ? "on-dark bg-black text-white" : ""} py-16 md:py-24`}>
      <div className="wrap grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <figure className={reverse ? "md:order-2" : ""}>
          <Picture k={image} alt={alt} sizes="(min-width:768px) 50vw, 100vw" />
          {caption && <figcaption className={`mt-2 text-sm ${dark ? "text-kw-gray" : "text-kw-gray-medium"}`}>{caption}</figcaption>}
        </figure>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function Checks({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center bg-kw-red text-xs font-bold text-white" aria-hidden>✓</span>
          <span className={dark ? "text-kw-gray-light" : ""}>{i}</span>
        </li>
      ))}
    </ul>
  );
}
