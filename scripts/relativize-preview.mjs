// Rewrites root-absolute URLs in the static export to relative ones (all pages are top-level .html files).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "out");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const pageHref = (p) => {
  const m = p.match(/^([^?#]*)(.*)$/);
  const base = m[1] === "/" ? "index" : m[1].replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-");
  return `${base}.html${m[2]}`;
};

for (const f of walk(root)) {
  const ext = path.extname(f);
  if (![".html", ".js", ".css", ".txt"].includes(ext)) continue;
  let s = fs.readFileSync(f, "utf8");
  const before = s;
  if (ext === ".css") s = s.replace(/url\(\.\/_next\/static\/media\//g, "url(../media/");
  s = s.replace(/(?<=[\s"'(,=])\/media\//g, "./media/");
  s = s.replace(/(?<=[\s"'(,=])\/brand\//g, "./brand/");
  s = s.replace(/(?<=[\s"'(,=])\/icon\.svg/g, "./icon.svg");
  if (ext === ".html") {
    s = s.replace(/href="(\/[^"/][^"]*|\/)"/g, (m0, h) => (h.startsWith("/_next") ? `href=".${h}"` : `href="${pageHref(h)}"`));
    s = s.replace(/(src|href)="\/_next\//g, '$1="./_next/');
  }
  // Literal U+FFFD in minified string literals -> escape (some uploaders reject the raw character)
  if (ext === ".js") s = s.replace(/\uFFFD/g, "\\uFFFD");
  if (s !== before) fs.writeFileSync(f, s);
}
console.log("relativized", root);
