import { testimonials, roster, showPlaceholders, type Persona } from "@/content/config";
import { Picture } from "./Picture";

// "Social proof everywhere decisions happen": one short testimonial with face and name
// beside every form. Until real testimonials exist, show a real roster stat instead.
export function FormProof({ persona, dark = false }: { persona?: Persona; dark?: boolean }) {
  // Only show a quote that fits the reader; a new agent gets the roster stat until a new-agent quote exists
  const t = testimonials.find((x) => !persona || x.persona.includes(persona));
  const muted = dark ? "text-kw-gray-light" : "text-kw-gray-medium";
  if (t)
    return (
      <figure className="flex items-start gap-4">
        <img src={t.photo} alt="" width={64} height={80} className="h-20 w-16 shrink-0 object-cover" />
        <div>
          <blockquote className="font-serif text-lg leading-snug">“{t.quote}”</blockquote>
          <figcaption className={`mt-1 text-sm ${muted}`}>
            {t.name} · {t.detail}
          </figcaption>
        </div>
      </figure>
    );
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
        <Picture k="trainingSession" alt="" sizes="56px" fill />
      </div>
      <p className={`text-sm leading-snug ${muted}`}>
        <span className={`block text-base font-bold ${dark ? "text-white" : "text-black"}`}>
          {roster.joinedThisYear} agents joined KW East Idaho in 2026.
        </span>
        {showPlaceholders ? "TODO: swap in a real agent testimonial with photo." : `${roster.agents} agents, one team.`}
      </p>
    </div>
  );
}
