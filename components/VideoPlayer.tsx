"use client";
import { useRef, useState } from "react";
import { track } from "@/lib/analytics";

// Click-to-play only (never autoplay with sound). Fires video_play / video_50 / video_complete.
export function VideoPlayer({
  src,
  poster,
  title,
  label,
  vertical = false,
  captions,
  phoneFrame = false,
}: {
  src: string;
  poster: string;
  title: string;
  label?: string;
  vertical?: boolean;
  captions?: string;
  phoneFrame?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const fired = useRef({ half: false, done: false });

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play());
    track("video_play", { video: title });
  };

  return (
    <div className={`${phoneFrame ? "mx-auto max-w-[300px] rounded-[2.2rem] border-[10px] border-black bg-black" : ""}`}>
      <div className={`relative overflow-hidden bg-black ${vertical ? "aspect-[9/16]" : "aspect-video"} ${phoneFrame ? "rounded-[1.6rem]" : ""}`}>
        <video
          ref={ref}
          src={playing ? src : undefined}
          poster={poster}
          controls={playing}
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={title}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (!v.duration) return;
            if (!fired.current.half && v.currentTime / v.duration >= 0.5) {
              fired.current.half = true;
              track("video_50", { video: title });
            }
          }}
          onEnded={() => {
            if (!fired.current.done) {
              fired.current.done = true;
              track("video_complete", { video: title });
            }
          }}
        >
          {captions && captions !== "burned-in" && <track kind="captions" src={captions} srcLang="en" label="English" default />}
        </video>
        {!playing && (
          <button type="button" onClick={start} className="group absolute inset-0 flex flex-col items-center justify-end bg-black/25 p-0 text-left text-white" aria-label={`Play video: ${title}`}>
            <span className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kw-red transition-transform group-hover:scale-110" aria-hidden>
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white"><path d="M8 5v14l11-7z" /></svg>
            </span>
            {label && <span className="w-full bg-black px-4 py-3 text-sm font-bold">{label}</span>}
          </button>
        )}
      </div>
    </div>
  );
}
