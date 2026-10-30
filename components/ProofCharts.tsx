import type { ReactNode } from "react";
import { CountUp, InViewAnim } from "./client";
import { proofCharts as d } from "@/content/config";

// The four MLS proof stats, each with a small comparison chart. KW East Idaho is red;
// other brokerages are gray and shown by rank only, never by name.
const fmt = (m: number) => `$${Math.round(m)}M`;
const rankLabel = (i: number) =>
  i === 0 ? "KW East Idaho" : `#${i + 1} brokerage`;

function Card({
  children,
  title,
  detail,
}: {
  children: ReactNode;
  title: ReactNode;
  detail: string;
}) {
  return (
    <div className="border-t-4 border-black pt-4">
      {title}
      <dd className="mt-5">{children}</dd>
      <dd className="mt-3 text-sm text-kw-gray-medium">{detail}</dd>
    </div>
  );
}

function Big({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  return (
    <>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-5xl font-bold text-kw-red md:text-6xl">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </dd>
      <dd className="mt-2 font-bold leading-snug md:text-lg">{label}</dd>
    </>
  );
}

function Bar({
  value,
  max,
  kw,
  delay,
  label,
}: {
  value: number;
  max: number;
  kw?: boolean;
  delay: number;
  label: string;
}) {
  return (
    <span className="flex h-3 flex-1 items-center" title={label}>
      <span
        className={`grow-x block h-full rounded-r-[4px] ${kw ? "bg-kw-red" : "bg-kw-gray"}`}
        style={{
          width: `${(value / max) * 100}%`,
          ["--d" as string]: `${delay}ms`,
        }}
      />
    </span>
  );
}

function House({ kw, i }: { kw?: boolean; i: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`pop h-5 w-5 ${kw ? "fill-kw-red" : "fill-kw-gray"}`}
      style={{ ["--d" as string]: `${i * 90}ms` }}
      aria-hidden
    >
      <path d="M8 1.5 1 7.6V15h5v-4.5h4V15h5V7.6z" />
    </svg>
  );
}

export function ProofCharts() {
  const max = d.volumeByRank[0];
  const [, two, three] = d.volumeByRank;
  const dots = Array.from({ length: d.top50.total }, (_, i) =>
    i < d.top50.kw ? "kw" : i < d.top50.kw + d.top50.nextBest ? "next" : "rest",
  );
  return (
    <InViewAnim>
      <dl className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title={
            <Big
              value={1}
              prefix="#"
              label="brokerage in the Snake River MLS"
            />
          }
          detail="Agent sales volume, top five brokerages."
        >
          <ol
            className="space-y-2 text-xs"
            aria-label="Agent sales volume by brokerage rank"
          >
            {d.volumeByRank.map((v, i) => (
              <li
                key={i}
                className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-2"
              >
                <span className={i === 0 ? "font-bold" : "text-kw-gray-medium"}>
                  {rankLabel(i)}
                </span>
                <Bar
                  value={v}
                  max={max}
                  kw={i === 0}
                  delay={i * 110}
                  label={`${rankLabel(i)}: ${fmt(v)}`}
                />
                <span
                  className={`text-right tabular-nums ${i === 0 ? "font-bold" : "text-kw-gray-medium"}`}
                >
                  {fmt(v)}
                </span>
              </li>
            ))}
          </ol>
        </Card>

        <Card
          title={
            <Big value={822} prefix="$" suffix="M" label="in agent volume" />
          }
          detail="More than the next two brokerages combined."
        >
          <ul
            className="space-y-3 text-xs"
            aria-label="KW East Idaho volume compared with the next two brokerages combined"
          >
            <li>
              <span className="font-bold">KW East Idaho</span>
              <span className="mt-1 flex items-center gap-2">
                <Bar
                  value={max}
                  max={max}
                  kw
                  delay={0}
                  label={`KW East Idaho: ${fmt(max)}`}
                />
                <span className="w-12 text-right font-bold tabular-nums">
                  {fmt(max)}
                </span>
              </span>
            </li>
            <li>
              <span className="text-kw-gray-medium">
                #2 and #3 brokerages combined
              </span>
              <span className="mt-1 flex items-center gap-2">
                <span className="flex h-3 flex-1 items-center gap-[2px]">
                  <span
                    className="grow-x block h-full bg-kw-gray"
                    style={{
                      width: `${(two / max) * 100}%`,
                      ["--d" as string]: "250ms",
                    }}
                    title={`#2 brokerage: ${fmt(two)}`}
                  />
                  <span
                    className="grow-x block h-full rounded-r-[4px] bg-kw-gray"
                    style={{
                      width: `${(three / max) * 100}%`,
                      ["--d" as string]: "500ms",
                    }}
                    title={`#3 brokerage: ${fmt(three)}`}
                  />
                </span>
                <span className="w-12 text-right text-kw-gray-medium tabular-nums">
                  {fmt(two + three)}
                </span>
              </span>
            </li>
          </ul>
        </Card>

        <Card
          title={
            <Big
              value={75}
              suffix="%"
              label="more closings for the typical agent"
            />
          }
          detail={`Median producing agent: ${d.medianSides.kw} sides at KW East Idaho vs. ${d.medianSides.elsewhere} elsewhere.`}
        >
          <ul
            className="space-y-3 text-xs"
            aria-label="Median closed sides per agent"
          >
            {[
              { l: "KW East Idaho", n: d.medianSides.kw, kw: true },
              { l: "Everywhere else", n: d.medianSides.elsewhere, kw: false },
            ].map((r) => (
              <li key={r.l} title={`${r.l}: ${r.n} sides`}>
                <span className={r.kw ? "font-bold" : "text-kw-gray-medium"}>
                  {r.l}
                </span>
                <span className="mt-1 flex items-center gap-1">
                  {Array.from({ length: r.n }, (_, i) => (
                    <House key={i} kw={r.kw} i={i + (r.kw ? 0 : 2)} />
                  ))}
                  <span
                    className={`ml-2 tabular-nums ${r.kw ? "font-bold" : "text-kw-gray-medium"}`}
                  >
                    {r.n}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title={<Big value={17} label="of the MLS’s top 50 producers" />}
          detail={`The next-best brokerage has ${d.top50.nextBest}.`}
        >
          <div
            className="grid w-max grid-cols-10 gap-1.5"
            role="img"
            aria-label={`Of the top 50 producers, ${d.top50.kw} are at KW East Idaho, ${d.top50.nextBest} at the next-best brokerage and ${d.top50.total - d.top50.kw - d.top50.nextBest} elsewhere.`}
          >
            {dots.map((k, i) => (
              <span
                key={i}
                className={`dot block h-3.5 w-3.5 rounded-full ${k === "kw" ? "dot-kw bg-kw-red" : k === "next" ? "bg-kw-gray-medium" : "bg-kw-gray-light"}`}
                style={{ ["--d" as string]: `${i * 28}ms` }}
              />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-kw-gray-medium">
            <li className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full bg-kw-red"
                aria-hidden
              />
              KW East Idaho {d.top50.kw}
            </li>
            <li className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full bg-kw-gray-medium"
                aria-hidden
              />
              Next-best {d.top50.nextBest}
            </li>
            <li className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full bg-kw-gray-light"
                aria-hidden
              />
              All others {d.top50.total - d.top50.kw - d.top50.nextBest}
            </li>
          </ul>
        </Card>
      </dl>
      <details className="mt-8 text-sm">
        <summary className="min-h-11 cursor-pointer py-2 font-bold">
          See these numbers as a table
        </summary>
        <table className="mt-2 w-full max-w-xl text-left text-sm">
          <thead>
            <tr className="border-b border-kw-gray-light">
              <th className="py-1 pr-4">Measure</th>
              <th className="py-1 pr-4">KW East Idaho</th>
              <th className="py-1">Comparison</th>
            </tr>
          </thead>
          <tbody className="text-kw-gray-medium">
            <tr className="border-b border-kw-gray-light">
              <td className="py-1 pr-4">Agent volume</td>
              <td className="pr-4">{fmt(max)} (#1)</td>
              <td>
                #2 {fmt(two)} · #3 {fmt(three)} · #4 {fmt(d.volumeByRank[3])} ·
                #5 {fmt(d.volumeByRank[4])}
              </td>
            </tr>
            <tr className="border-b border-kw-gray-light">
              <td className="py-1 pr-4">vs. next two combined</td>
              <td className="pr-4">{fmt(max)}</td>
              <td>{fmt(two + three)}</td>
            </tr>
            <tr className="border-b border-kw-gray-light">
              <td className="py-1 pr-4">Median sides per producing agent</td>
              <td className="pr-4">{d.medianSides.kw}</td>
              <td>{d.medianSides.elsewhere} at all other brokerages</td>
            </tr>
            <tr>
              <td className="py-1 pr-4">Top 50 producers by volume</td>
              <td className="pr-4">{d.top50.kw}</td>
              <td>{d.top50.nextBest} at the next-best brokerage</td>
            </tr>
          </tbody>
        </table>
      </details>
    </InViewAnim>
  );
}
