// Static preview only: maps "/new-agents?x#y" to "new-agents.html?x#y".
export function previewHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const m = href.match(/^([^?#]*)(.*)$/)!;
  const path = m[1] === "/" ? "index" : m[1].replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-");
  return `${path}.html${m[2]}`;
}

