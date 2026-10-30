import { trainingCalendarId } from "@/content/events";
import { showPlaceholders } from "@/content/config";
import { SectionHead } from "./sections";

const embed = (id: string, mode: "WEEK" | "AGENDA") =>
  `https://calendar.google.com/calendar/embed?${new URLSearchParams({
    src: id,
    ctz: "America/Denver",
    mode,
    showTitle: "0",
    showPrint: "0",
    showCalendars: "0",
    showTz: "0",
  })}`;

/** The live Google Calendar of ongoing weekly trainings: proof that training happens every week. */
export function TrainingCalendar() {
  if (!trainingCalendarId && !showPlaceholders) return null;
  return (
    <section id="training-calendar" className="scroll-mt-20 py-16 md:py-24">
      <div className="wrap">
        <SectionHead
          eyebrow="Every week"
          title="This is what a normal week of training looks like."
          intro="Our live training calendar for Idaho Falls, Pocatello and Zoom. It updates as classes are added, so what you see is what’s really on the schedule."
        />
        {trainingCalendarId ? (
          <div className="mt-10 border border-kw-gray-light bg-white">
            {/* Week view on wide screens, agenda list on phones where a week grid is too cramped */}
            <iframe
              title="KW East Idaho weekly training calendar"
              src={embed(trainingCalendarId, "WEEK")}
              loading="lazy"
              className="hidden h-[720px] w-full md:block"
            />
            <iframe
              title="KW East Idaho weekly training calendar"
              src={embed(trainingCalendarId, "AGENDA")}
              loading="lazy"
              className="h-[560px] w-full md:hidden"
            />
          </div>
        ) : (
          <p className="mt-10 max-w-3xl border-2 border-dashed border-kw-gray-medium p-4 text-sm text-kw-gray-medium">
            TODO: public Google Calendar of weekly trainings (set trainingCalendarId in content/events.ts).
          </p>
        )}
      </div>
    </section>
  );
}
