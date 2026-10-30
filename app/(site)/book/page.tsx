import { Booking } from "@/components/Booking";
import { FormProof } from "@/components/FormProof";
import { Picture } from "@/components/Picture";
import { pageMeta } from "@/lib/meta";
import { booking, leadOwner, leaders, marketCenter } from "@/content/config";

export const metadata = pageMeta({
  title: "Book a Confidential Career Conversation",
  description: "20 minutes with KW East Idaho leadership. Confidential. No pressure, no hard sell. Or call or text Debbie Richards at (208) 590-7653.",
  path: "/book",
  og: "og-lobby",
});

export default function Page() {
  const lead = leaders[0];
  return (
    <section className="bg-kw-wash py-10 md:py-16">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="eyebrow text-kw-gray-medium">{booking.meetingName}</p>
          <h1 className="mt-3 text-4xl leading-tight font-bold md:text-5xl">Let’s talk about your career.</h1>
          <p className="mt-4 text-xl text-kw-gray-medium">Confidential. {booking.minutes} minutes. No pressure, no hard sell.</p>
          <div className="mt-8 flex items-center gap-4">
            <div className={`grid h-[100px] w-20 shrink-0 place-items-center overflow-hidden bg-kw-red text-2xl font-bold text-white ${lead.photo ? "" : "rounded-full"}`}>
              {lead.photo ? <img src={lead.photo} alt="" width={80} height={100} className="h-full w-full object-cover" /> : "DR"}
            </div>
            <div>
              <p className="text-lg font-bold">{lead.name}</p>
              <p className="text-kw-gray-medium">{lead.title}</p>
              <p className="mt-1">Questions first? Call or text <a className="font-bold underline" href={`tel:${leadOwner.phoneE164}`}>{leadOwner.phone}</a></p>
            </div>
          </div>
          {lead.bio && <p className="mt-4 text-kw-gray-medium">{lead.bio}</p>}
          {/* Phone: the form is the reason for this page, so it comes right after who you'll talk to */}
          <div className="mt-8 bg-white p-5 lg:hidden">
            <Booking />
          </div>
          <h2 className="mt-10 text-xl font-bold">What to expect</h2>
          <ol className="mt-3 space-y-2">
            {["Tell us where you are and where you want to go.", "See real numbers for your business on KW MyWay.", "Get honest answers. Then you decide."].map((t, i) => (
              <li key={t} className="flex gap-3"><span className="font-display font-bold text-kw-red">{i + 1}</span>{t}</li>
            ))}
          </ol>
          <h2 className="mt-10 text-xl font-bold">Where we’ll meet</h2>
          <p className="mt-1 text-kw-gray-medium">{marketCenter.street}, {marketCenter.city}, by phone, or on Zoom. Your choice.</p>
          <div className="relative mt-4 aspect-[16/10] overflow-hidden"><Picture k="lobby" alt="The Idaho Falls office lobby" sizes="(min-width:1024px) 40vw, 100vw" fill /></div>
        </div>
        <div className="hidden self-start bg-white p-5 md:p-8 lg:block">
          <Booking />
          <div className="mt-6 border-t border-kw-gray-light pt-5"><FormProof /></div>
        </div>
      </div>
    </section>
  );
}
