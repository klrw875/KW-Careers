#!/usr/bin/env bash
# Web copies of the agent story and culture videos (originals in MEDIA_SRC, default /mnt/project-files).
# Vertical: 540x960. Horizontal: 960x540. H.264 + AAC, faststart. Keep each file under ~15 MB.
set -euo pipefail
SRC="${MEDIA_SRC:-/mnt/project-files}"
OUT=public/media
enc() { # src out filter crf [maxrate]  (maxrate caps busy handheld footage)
  local cap=(); [ -n "${5:-}" ] && cap=(-maxrate "$5" -bufsize "$5")
  ffmpeg -y -v error -i "$SRC/$1" -vf "$3,fps=30" -c:v libx264 -profile:v high -preset slow -crf "$4" "${cap[@]}" -pix_fmt yuv420p \
    -c:a aac -b:a 80k -ac 2 -movflags +faststart "$OUT/$2.mp4"
}
V="scale=540:960:force_original_aspect_ratio=increase,crop=540:960"
H="scale=960:540:force_original_aspect_ratio=increase,crop=960:540"
enc "Rebecca Running Testimonial.mp4" story-rebecca-running "crop=604:1074:658:3,scale=540:960" 25
enc "Allison Youngstrom Testimonial.mp4" story-allison-youngstrom "crop=604:1074:658:3,scale=540:960" 26
enc "They Saw More In Me - Karen.mov" story-karen "$V" 26
enc "Real Estate Income Rollercoaster_ From Zero to Hero! (1).mp4" story-income-rollercoaster "$V" 26
enc "Copy of Andrew Schneider v1.m4v" story-andrew-schneider "$H" 27
enc "Brittani Hobson Why Keller Williams v1 (1).mp4" story-brittani-hobson "$H" 28
enc "Jesse Baeza KW Hero Story (1).m4v" story-jesse-baeza "$H" 29
enc "Susannah Harris Hero Story (1).m4v" story-susannah-harris "$H" 29
enc "KW Hero Story Michele Robison.m4v" story-michele-robison "$H" 29
enc "Copy of Dave Nelson's Keller Williams Story.mp4" story-dave-nelson "$H" 29
enc "Skillshare Golden Nugget (1).mp4" skillshare-golden-nugget "$H" 28
enc "Skillshare Testimonials.mp4" skillshare-testimonials "$H" 28
enc "KW Cares and Habitat for Humanity (1).mp4" kw-cares-habitat "$H" 28 750k
enc "Pocatello KW Client Event (1).m4v" pocatello-client-event "$V" 28 650k
ls -lh "$OUT"/story-*.mp4 "$OUT"/skillshare-*.mp4 "$OUT"/kw-cares-habitat.mp4 "$OUT"/pocatello-client-event.mp4
