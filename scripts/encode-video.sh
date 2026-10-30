#!/usr/bin/env bash
# Builds the web video files in public/media from the originals in MEDIA_SRC (default ../assets).
# Needs ffmpeg. For launch, upload the click-to-play videos to Mux, Cloudflare Stream or YouTube
# for adaptive streaming and put the URLs in content/config.ts (videos).
set -euo pipefail
SRC="${MEDIA_SRC:-../assets}"
OUT=public/media
mkdir -p "$OUT"

# Home hero background: 10s push-in to the Idaho Falls office at dusk (silent, 4:3, plays once).
HERO="$SRC/hero-office-dusk-source.mp4"
ffmpeg -y -v error -i "$HERO" -an -vf "scale=1280:960,fps=30" -c:v libx264 -profile:v high -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/hero-office.mp4"
ffmpeg -y -v error -i "$HERO" -an -vf "scale=1280:960,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 "$OUT/hero-office.webm"
ffmpeg -y -v error -i "$HERO" -frames:v 1 -vf scale=1280:960 "$OUT/hero-office-poster.png"
ffmpeg -y -v error -sseof -0.1 -i "$HERO" -frames:v 1 -vf scale=1280:960 "$OUT/hero-office-end.png"

# Click-to-play / culture videos (already web-sized, faststart)
# Pillarboxed 1920x1080 source: crop the vertical picture back out.
ffmpeg -y -v error -i "${MEDIA_SRC:-/mnt/project-files}/Mike talking about needing to grow with the market.mp4" -vf "crop=608:1080:656:0,scale=540:960,fps=30" \
  -c:v libx264 -profile:v high -preset slow -crf 25 -pix_fmt yuv420p -c:a aac -b:a 80k -ac 2 -movflags +faststart "$OUT/grow-with-the-market.mp4"
ffmpeg -y -v error -ss 1.5 -i "$OUT/grow-with-the-market.mp4" -frames:v 1 -c:v libwebp -quality 78 "$OUT/grow-with-the-market-poster.webp"
cp "$SRC/red-day-2026-vertical.mp4" "$OUT/red-day-2026.mp4"
ls -lh "$OUT"/*.mp4 "$OUT"/*.webm
python3 -c "from PIL import Image; [Image.open(f'$OUT/hero-office-{k}.png').convert('RGB').save(f'$OUT/hero-office-{k}.webp', quality=60) for k in ('poster', 'end')]"
rm -f "$OUT"/hero-office-*.png
