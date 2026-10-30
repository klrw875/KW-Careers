#!/usr/bin/env bash
# Builds a static, click-through preview into ./preview (forms are simulated, nothing is sent).
# The production site is the normal `npm run build` (needs a server for /api/lead and the A/B proxy).
set -euo pipefail
cd "$(dirname "$0")/.."
stash=$(mktemp -d)
restore() { [ -d "$stash/api" ] && mv "$stash/api" app/api; [ -f "$stash/proxy.ts" ] && mv "$stash/proxy.ts" proxy.ts; [ -d "$stash/v" ] && mv "$stash/v" "app/(site)/v"; [ -d "$stash/lp" ] && mv "$stash/lp" app/lp; [ -f "$stash/headers" ] || true; }
trap restore EXIT
mv app/api "$stash/api"; mv proxy.ts "$stash/proxy.ts"; mv "app/(site)/v" "$stash/v"; mv app/lp "$stash/lp"
rm -rf .next out preview
STATIC_PREVIEW=1 NEXT_PUBLIC_PREVIEW=1 npx next build
node scripts/relativize-preview.mjs out
mv out preview
# RSC payload files aren't used (preview links are plain anchors)
find preview -name "*.txt" ! -name robots.txt -delete
find preview -type d -empty -delete
echo "Preview built in ./preview (open preview/index.html via any static server)"
