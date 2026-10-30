// next/link everywhere, except the static click-through preview (NEXT_PUBLIC_PREVIEW=1),
// which needs plain anchors with relative .html URLs to work from any folder or host.
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { previewHref } from "@/lib/preview-link";

export default function Link(props: ComponentProps<typeof NextLink>) {
  if (process.env.NEXT_PUBLIC_PREVIEW === "1") {
    const { href, prefetch, replace, scroll, ...rest } = props;
    void prefetch; void replace; void scroll;
    const h = typeof href === "string" ? href : (href.pathname ?? "/");
    return <a href={previewHref(h)} {...(rest as ComponentProps<"a">)} />;
  }
  return <NextLink {...props} />;
}
