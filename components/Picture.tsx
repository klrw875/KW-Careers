import { media, type MediaKey } from "@/content/media.generated";

// <picture> with pre-built AVIF + WebP srcsets (scripts/optimize-media.mjs) instead of
// next/image: identical output on Vercel and on any static host, no per-request image
// optimization cost, explicit width/height (no CLS) and a blur placeholder.
export function Picture({
  k,
  alt,
  sizes = "100vw",
  className = "",
  imgClassName = "",
  priority = false,
  fill = false,
  mobile,
}: {
  k: MediaKey;
  alt: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  fill?: boolean;
  mobile?: MediaKey; // art-directed crop for phones (<768px), one download either way
}) {
  const m = media[k];
  const setFor = (key: MediaKey, ext: string) => media[key].widths.map((w) => `/media/${key}-${w}.${ext} ${w}w`).join(", ");
  const set = (ext: string) => setFor(k, ext);
  return (
    <picture className={fill ? `absolute inset-0 block ${className}` : `block ${className}`}>
      {mobile && <source media="(max-width: 767px)" type="image/avif" srcSet={setFor(mobile, "avif")} sizes="100vw" />}
      {mobile && <source media="(max-width: 767px)" type="image/webp" srcSet={setFor(mobile, "webp")} sizes="100vw" />}
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/media/${k}-${m.widths[0]}.webp`}
        alt={alt}
        width={m.width}
        height={m.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        style={{ backgroundImage: `url(${m.blur})`, backgroundSize: "cover", backgroundPosition: "center" }}
        className={fill ? `h-full w-full object-cover ${imgClassName}` : `h-auto w-full ${imgClassName}`}
      />
    </picture>
  );
}
