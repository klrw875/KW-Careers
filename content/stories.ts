import { showPlaceholders } from "./config";
// Agent stories hub. Real agents only, with written permission. Add newest first.
// video: Mux/Cloudflare/YouTube URL or /media path. result: one specific result in the agent's own words.
export type Story = {
  slug: string;
  name: string;
  city: string | null; // TODO when unknown
  yearsInBusiness: number | null;
  persona: "new" | "experienced" | "team";
  cameFrom: string | null; // e.g. "Switched from another brokerage"
  result: string;
  quote: string;
  video: string;
  poster: string;
  duration: string; // ISO 8601
  uploadDate: string;
  transcript: string;
  orientation?: "vertical" | "horizontal"; // default vertical
  tenure?: string; // e.g. "With KW since 2016"
  nameConfirmed?: boolean; // false = name still TODO; hidden when placeholders are off
};

// "PT1M32S" -> "1:32"
export const durationLabel = (iso: string) => {
  const m = /PT(?:(\d+)M)?(?:(\d+)S)?/.exec(iso);
  return `${Number(m?.[1] ?? 0)}:${String(m?.[2] ?? 0).padStart(2, "0")}`;
};

export const allStories: Story[] = [
  {
    slug: "rebecca-running",
    name: "Rebecca Running",
    city: null, // TODO: Rebecca's city
    yearsInBusiness: null, // TODO: years licensed
    persona: "experienced",
    cameFrom: "Switched from another brokerage",
    result: "Grew her business sevenfold in 9 months",
    quote: "I chose Keller Williams, and that made all the difference.",
    video: "/media/story-rebecca-running.mp4",
    poster: "/media/story-rebecca-running-poster.webp",
    duration: "PT1M32S",
    uploadDate: "2026-10-23", // TODO: real publish date
    // From the on-screen captions; confirm wording with Rebecca before launch.
    transcript:
      "My business has grown sevenfold. I have learned so much on how to be a very good agent, how to be a better agent. And I have learned foundation tools, steps, things to do that is true to me. It's what I believe in, and I feel like the knowledge that I have is gonna do nothing but help people be more confident in their buying and selling of a home, because they can feel more confident in me, just on what I've learned already. Huge difference. I had several people say, \"Don't go to Keller Williams. Why would you wanna go to Keller Williams? They take so much of your money.\" And I knew, because I had already been here and learned so much from Keller Williams, that you gotta know the whole picture, the whole story. The value that you're getting for the small amount of money, it's so important, and so worth it. Absolutely. Even though it's only been 9 months, looking back at my first year, with the amount of transactions, it was almost a full year before I had one, and I didn't know how to go get more. And to have so many transactions to bring me to a different place, professionally, emotionally, financially, personally, all those things is huge. Just huge. I'll always be thankful. I'm Rebecca Running, and I chose Keller Williams, and that made all the difference.",
  },
  // The stories below were transcribed by speech-to-text; confirm wording, city and years with each agent before launch.
  {
    slug: "andrew-schneider",
    name: "Andrew Schneider",
    city: null, // TODO
    yearsInBusiness: null, // TODO
    persona: "experienced",
    cameFrom: "Switched from another brokerage",
    result: "From no closings in April–June to about $1.1M in July",
    quote: "I’m busier than I imagined. It’s changed the way I approach business.",
    video: "/media/story-andrew-schneider.mp4",
    poster: "/media/story-andrew-schneider-poster.webp",
    duration: "PT1M27S",
    uploadDate: "2026-10-24", // TODO: real publish date
    orientation: "horizontal",
    transcript:
      "It's beyond what I imagined. Keller Williams has provided me a path and a solution that I never would have received outside of Keller Williams. I kept getting a phone call from a service that you had paid for. I ignored it and ignored it and ignored it, and finally one day, annoyed with it, I answered, and it was someone asking me if I wanted to come in and interview with another brokerage. My mindset was, \"I'm good. I'm going to stick with my previous brokerage, and I'm going to stick as a single agent.\" And so I came and interviewed with you. One of the things that stuck out to me was, how can we help you be successful? And that's where it all started. After going from no closings in April, May and June, I had three closings in July, so just about $1.1 million of volume. In August, I did over $1.2 million of volume, and I projected under contract over 1.5 right now in the month of September. I'm busier than I imagined. Way busy. It's changed my confidence. It's changed the way I approach business. It's changed the way I approach real estate. It's proven, and it works, and it works for a reason. And so people have got to at least consider that and look into that.",
  },
  {
    slug: "allison-youngstrom",
    name: "Allison Youngstrom",
    city: null, // TODO
    yearsInBusiness: null, // TODO: newly licensed?
    persona: "new",
    cameFrom: "Changed careers",
    result: "More coaching and support than she expected",
    quote: "It’s been way more than I even expected.",
    video: "/media/story-allison-youngstrom.mp4",
    poster: "/media/story-allison-youngstrom-poster.webp",
    duration: "PT2M14S",
    uploadDate: "2026-10-24", // TODO
    transcript:
      "The levels of support I've received have been huge, and that's why I joined Keller Williams: because I knew I was going to get that coaching and support and team help and education that I needed. It's been 100%, like, way more than I even expected. I've been in a lot of careers, and some have been where I haven't been guided enough and helped enough, and it's a struggle, and I didn't want that in this career. So this is why I came to Keller Williams, and there's been no disappointment. I'm 110% happy with what I have received for what I was hoping for. There's way more than one person that's helped me, even from Cindy at the front desk to McKenna. She answers lots of questions and does trainings. Steven, you've helped a lot. Paula's been amazing: her book club and the weekly meetings. She's very encouraging and very understanding and helpful. I met with Jodi today. She answers questions so thoroughly, and she asked for feedback on what we would like to learn about. One of the things for me was how to do a showing, how to do certain things with clients, and she is a very good teacher. Debbie's been amazing. She was absolutely instrumental in bringing me in, because she was so knowledgeable and helpful. So it's a team of people that really have been around me and guided me and helped me, and I meet with everybody weekly. It's very helpful in my journey to become a real estate agent. I'm Allison Youngstrom. I chose Keller Williams, and that made all the difference.",
  },
  {
    slug: "dave-nelson",
    name: "Dave Nelson",
    city: null, // TODO
    yearsInBusiness: 20,
    persona: "team",
    cameFrom: "Leads the Nelson Group",
    result: "Learned to leverage, and got his life back",
    quote: "There couldn’t be a bigger culture of sharing than what we have.",
    video: "/media/story-dave-nelson.mp4",
    poster: "/media/story-dave-nelson-poster.webp",
    duration: "PT4M22S",
    uploadDate: "2026-10-24", // TODO
    orientation: "horizontal",
    transcript:
      "My name is Dave Nelson, and I own the Nelson Group at Keller Williams Realty East Idaho. I've been licensed for 20 years, but I can't really even consider those first 10 years as being in real estate. I was kind of that agent that just couldn't quite figure it out, dabbled in other lines of work, and just held my real estate license. So when I was approached by Keller Williams the first time, I was definitely skeptical. I think when it clicked for me with KW was hearing repeatedly that the purpose of business is to fund the perfect life. And they wanted so badly to teach us how to do that at a really high level. The second I stopped resisting that coach and just decided, what's the worst that can happen? I'm going to take what she's telling me, implement it for three months, and see if it changes my world. And it did. As an individual agent, I was producing at a pretty high level, but I didn't have a life for five to 10 years. And I don't know that I could have ever seen the potential that existed by leveraging without the MREA, Gary Keller's book, and without the coaching and consulting within our company. I'm not an easy guy to adapt. I tend to resist; I push back before I'll buy in. And so I've been changing that about myself, and I love it. Now I'll just dive in and try it, because nothing has failed me yet. I find mentors within our organization and I follow what they're doing. You become who you surround yourself with. Some of my best memories were spending time up at my friends' cabins. We didn't grow up with a ton of money, but I've always wanted to own a cabin for my family, and it's taken some time, but we actually just got there last month. It's no secret that the perception of Keller Williams here in East Idaho is more of a closed door, that we keep everything inside. It's just crazy to me to continually hear that, because it's quite the opposite. There couldn't be a bigger culture of sharing than what we have. We are an open book. You can see everybody's production, and we're all happy to share. We've got ALC meetings. We've got classes. Our top producers are constantly putting on our Ignite sessions and trying to get the newer agents into production, because once somebody experiences that win, they know they can do it. If we're reaching down and helping everybody else and pulling them up, they're going to turn around and do the same. It's a healthy competitiveness within our agents. We all congratulate each other when we get a win, even when we're competing against each other. If I lose a listing on an appointment to another agent within our office, I'll go right to them and say, \"Hey, teach me what you did to get this one.\" And they're totally open about it. We never speak negatively. So that false perception that's out there in the industry about KW just couldn't be more false. Knowing what I know now, you'd be crazy not to come try it out. My name's Dave Nelson. I had a choice. I chose Keller Williams, and that made all the difference.",
  },
  {
    slug: "brittani-hobson",
    name: "Brittani Hobson",
    city: "Pocatello",
    yearsInBusiness: 4,
    persona: "new",
    cameFrom: "Came from managing a family business",
    result: "Four years in, and giving back to new agents",
    quote: "Training for sure has been the biggest tool that I have used in Keller Williams.",
    video: "/media/story-brittani-hobson.mp4",
    poster: "/media/story-brittani-hobson-poster.webp",
    duration: "PT2M53S",
    uploadDate: "2026-10-24", // TODO
    orientation: "horizontal",
    transcript:
      "I've been in real estate for four years with Keller Williams. Before Keller Williams, I managed a family business. When I came to Keller Williams, there were quite a few things that I wanted as a business. One of them was the technology, and the other was training. Training for sure has been the biggest tool that I have used in Keller Williams. When I was interviewing with other companies to decide where I was going to go in real estate, none of them had what Keller Williams had. You can get training from people in your office that are doing the same thing, right there in the area that you're working in, to people that have experience all over the country, to people they bring in who aren't even with Keller Williams but really know how to train in certain areas. It's amazing to be able to listen to these high-level performers and be trained by them. I love the culture here in Pocatello. Everybody works really well together. When I first started, I would go around to the experienced agents and ask, \"Hey, I've got this contract. What do you suggest?\" And every one of them helped. That's what I love, and that's what I try to give back to new agents: what the experienced agents gave to me. My top three reasons would be, first, the training. I don't think anywhere else has as good training as Keller Williams, and I've taken advantage of it. There are classes all the time, on a weekly basis. The second would be the technology. Keller Williams is putting a lot of effort and money into keeping up with the technology of the times. And the third would be the culture. I love the culture here, in the Pocatello office or the Idaho Falls office. The people I talk to are just genuinely nice, and they're my friends.",
  },
  {
    slug: "susannah-harris",
    name: "Susannah Harris",
    city: null, // TODO
    yearsInBusiness: null, // TODO (with KW almost 4 years)
    persona: "experienced",
    cameFrom: "Nelson Group team member",
    result: "From zero pendings in January to 11 pending today",
    quote: "It’s not a secret what we’re doing. They genuinely want to see you succeed.",
    video: "/media/story-susannah-harris.mp4",
    poster: "/media/story-susannah-harris-poster.webp",
    duration: "PT3M23S",
    uploadDate: "2026-10-24", // TODO
    orientation: "horizontal",
    tenure: "With KW almost 4 years",
    transcript:
      "Susannah Harris. I love to dance. I currently have 11 pendings right now. If you would have asked me a year ago, I would not have thought that was possible. In January, I didn't have any pendings, and to be close to 50 closings by the end of this year is mind-blowing. The biggest thing that held me back was in my head: that I wasn't good enough, or I wasn't smart enough, or everybody else was doing a better job than I was. I promised that I was going to do what he had asked of me for 30 days, and at the end of the month I actually saw a lot happen in my career. I haven't looked back since. When you work that hard, you're going to get rewarded. It's so easy to jump into that mindset of, this is exciting, I'm going to do this. And then two weeks later it's hard, and you're like, this is too hard, I've got to step back a little bit. When you've got somebody that knows your goals and what you're striving for, that's why it's so important to have those conversations to keep you focused on what you want. \"You are capable, you are smart, you do know what you're doing\" is what kept my mind focused, not just on work, but on believing in myself. I am a single mom, and this year was really scary for me: to believe in myself that I could not only do this career, but financially take care of myself and my kids. And I want people to know that even through the hardest times in our life, we can succeed, not only in our career, but in who we are as a person and in our mental health. It's hard to see into the future. Had I known this, I wouldn't have believed it last year at all. But it's a beautiful thing to be proud of myself. What I love so much about Keller Williams is that it's not a secret what we're doing. I have gone to so many other agents in Keller Williams who have offered their time and mentorship. I've scheduled appointments with them just so I can go talk. And in our Ignite classes, we're just sharing what we do. There's work out there for everybody, and they genuinely want to see you succeed. A lot of what I do in my career is from those Ignite classes: the mentorship, the classes, the camaraderie, and just helping each other. My name is Susannah Harris. I have been with Keller Williams for almost four years now, and I am on the Nelson Group team.",
  },
  {
    slug: "jesse-baeza",
    name: "Jesse Baeza",
    city: "Pocatello",
    yearsInBusiness: null, // TODO
    persona: "experienced",
    cameFrom: null,
    result: "Found the community he needed to succeed",
    quote: "You’re not just a number. They see you as a person, as a friend, as part of a family.",
    video: "/media/story-jesse-baeza.mp4",
    poster: "/media/story-jesse-baeza-poster.webp",
    duration: "PT3M38S",
    uploadDate: "2026-10-24", // TODO
    orientation: "horizontal",
    transcript:
      "It did change my life. It really did. My name is Jesse Baeza. I started doing real estate a while back. I had no idea what I was doing, but with the help of Keller Williams and everybody involved, I've really succeeded, and it's been a wonderful ride. When I first started going to team meeting in Pocatello and getting to meet everybody and hear their story, and how everybody helped each other, that was more or less my aha: this is the community that I need to be able to succeed. We do the soup party in the winter. Everybody in our office brings soup, and we invite all of our clients, friends and neighbors, and everybody talks about it for months. I think I've been asked about it probably five times since June. This Friday we're having our Halloween party. Having that friendship, that unity, team meeting and all these events brings us closer together. It's not just getting together and having parties. It's building a friendship, building a community, so we can trust each other at the end of the day. Every time I listen to Gary Keller, it just motivates me. Going to team meeting, we talk about how we help each other, and it translates to pretty much everything Keller Williams does. It's not just about business. It's about friendship. It's about helping people. I've never been to an event where they say, \"Thanks for coming. You guys need to sell more houses.\" They don't even bring that up. They say, let's find that balance: family and business. We're different. We have somewhere where we meet and get together. A lot of people tend to like the small brokerages, which I think limits you. With Keller Williams, we know we're one of the bigger brokerages in the area, and in the world, and having that network is always going to help you. They gave me a lot of tools in life, and yes, in business, but a lot of what we talk about doesn't just pertain to how to make more money. It's how to better yourself, how to be a better person, a better friend, partner, son. You're not just a number. They see you as a person, as a friend, as part of a family. Keller Williams is beneficial to me because of the culture and the unity, but also because it is a big business. When you go buy a vehicle, a lot of people want to go with a name that people know and trust, that's been around for years, decades. Keller Williams offers them that.",
  },
  {
    slug: "michele-robison",
    name: "Michele Robison",
    city: null, // TODO
    yearsInBusiness: null, // TODO
    persona: "experienced",
    cameFrom: null,
    result: "Built passive cash flow with what KW Wealth taught her",
    quote: "It goes into every part of my life. It’s not just business.",
    video: "/media/story-michele-robison.mp4",
    poster: "/media/story-michele-robison-poster.webp",
    duration: "PT3M31S",
    uploadDate: "2026-10-24", // TODO
    orientation: "horizontal",
    tenure: "With KW since 2016",
    transcript:
      "I'm Michele Robison, and I have been with Keller Williams Realty East Idaho since 2016. Looking back, I hadn't found my tribe. I remember I didn't want to call anybody. I didn't want to call the people in my phone. And I found a perfect combination for my personality in Keller Williams, and the tools I needed to get to where I wanted to go. It was when I read The Millionaire Real Estate Agent. I had read that book before I got my license, and it was interesting, because a broker from another brokerage encouraged me to read it. Why would I go work with you, when one of the guys who wrote the book runs this company over here? So when I sat down with what Keller Williams was exposing me to, and the ambition that I had come into the career with, it was very clear to me that all I had to do is what the book told me to do, and Ignite. I've been through Ignite at least a dozen times. I love it. Within two months, it was a dramatic impact, just from one exercise. Even if you have just a little bit of money, it's how much you can do with it with knowledge, and that's really what I've gotten from the beginning in Keller Williams. The foundation for the level of life that I want to live has all come from Keller Williams. We now have a ton of passive cash flow. KW Wealth has taught me things about passive cash flow: rental income, and a small development that we did really well with. The cash flow from that pays our payment for our dream home. Everybody knows you can make a lot of money in real estate if you work really hard and follow the system. But what do I do with my money after I've earned it? The business acumen that Keller Williams has taught me goes into every part of my life. It's not just business. It's my family life. There's a lot more to being a part of this organization than just the money. When I use the tools and exercises I've learned from Keller Williams when I'm having a bad time with one of the kids, it makes everything better, and it has nothing to do with anything financial. If you've been an agent for a really long time and you don't have cash flow, you've got to make sure you're taking care of yourself, because there's no 401(k) in real estate unless you're doing something for yourself. We've got some amazing groups that can tell you exactly what to do and help you, from the basics to the very complex things. I am Michele Robison, and I have been a part of Keller Williams for many years, and it has made all the difference and truly enriched my life.",
  },
  {
    slug: "jake-rosen",
    name: "Jake Rosen",
    city: null, // TODO
    yearsInBusiness: null, // TODO
    persona: "experienced",
    cameFrom: "Third time into real estate", // per Steven: tried twice and failed; the third time he plugged into the systems
    result: "15 closings so far this year, after going all in on the systems",
    quote: "Working out at home, I couldn’t get anything done. Having a physical office to go to every day is a huge game changer for me.",
    video: "/media/story-jake-rosen.mp4",
    poster: "/media/story-jake-rosen-poster.webp",
    duration: "PT2M42S",
    uploadDate: "2026-10-26", // TODO
    // Speech-to-text was patchy on this one (two voices, music); lines below are the clear passages. Confirm wording with Jake.
    transcript:
      "Coming back into it, I spent three months just doing it part time before I jumped in full time. When I first came into the industry, I had a different mindset. It was more of a negative mindset. Who's gonna use me when I'm brand new? This time I was reaching out to people to see how they're doing, and just having more conversations. I definitely got back into the habit of using systems, follow-up, making goals and being consistent with those goals. The first time, I was working out of Starbucks every day. Working out at home, I couldn't get anything done. Having a physical office to go to every day is a huge game changer for me, instead of working out of a coffee shop or working out of my home. Just having that different environment is a big deal. So far this year I've closed 15. I've been able to help 15 families. I have three currently pending and a listing that's live. My family is blessed. We focus on God and family, then business. My wife's not having to work as much, which takes some strain off her knees and back. More financial security, and being able to set more goals and grow the business. That's a huge thing for a family.",
  },
  {
    slug: "karen",
    name: "Karen", // TODO: last name
    city: null, // TODO
    yearsInBusiness: null, // TODO
    persona: "new",
    cameFrom: null,
    result: "Found leaders who saw more in her",
    quote: "The people here locally had a vision for my future that was bigger than I even knew.",
    video: "/media/story-karen.mp4",
    poster: "/media/story-karen-poster.webp",
    duration: "PT41S",
    uploadDate: "2026-10-24", // TODO
    nameConfirmed: false,
    transcript:
      "The leadership locally and nationally are unbelievable. I really believe that. It's the people here locally that had a vision for my future, and for where I could take my career, that was bigger than I even knew. It's like they gifted that to me: \"Hey, look at this mindset. Why haven't you thought about this for yourself?\" And they have a way of not just trying to sell you on it, but showing you how to do that. Start here, step one, step two, and showing you the way. So I'm like, OK, I can do this. I see the inspiration, and now I also have the roadmap. So that's been amazing. I seriously don't even know what I'd do without all that.",
  },
  {
    slug: "income-rollercoaster",
    name: "KW East Idaho agent", // TODO: agent's name (not said in the video)
    city: null, // TODO
    yearsInBusiness: null, // TODO
    persona: "experienced",
    cameFrom: null,
    result: "16 homes in his first two years; about 25 so far this year",
    quote: "I had no idea how big the world could be, how fast it could grow.",
    video: "/media/story-income-rollercoaster.mp4",
    poster: "/media/story-income-rollercoaster-poster.webp",
    duration: "PT48S",
    uploadDate: "2026-10-24", // TODO
    nameConfirmed: false,
    transcript:
      "Real estate income looks a lot like a roller coaster, and that's what the problem was. I was at the bottom of the income stream right there. But I took the chance and I did it, and now life is very different. I had no systems, and now I have systems. I have consistency. My first two years in real estate, I sold 16 houses, which was pretty decent. So far this year, I've sold about 25 houses. I had no idea how big the world could be, how fast it could grow. I count up active pieces of business between listings that I have, buyers that are coming and some upcoming listings: I have 22 active pieces of business right now. I'm shooting for 50 houses this year.",
  },
];

// Slots shown while NEXT_PUBLIC_SHOW_PLACEHOLDERS is on, so leadership can see where stories go.
export const storyPlaceholders = [
  { label: "New agent, Idaho Falls", note: "First-year agent: first closing story" },
  { label: "Team leader, Idaho Falls", note: "Grew a team: leverage + profit share" },
  { label: "Experienced agent, Pocatello", note: "Local producer: what changed" },
];

export const storyDisclaimer = "Individual results vary and are not typical or guaranteed.";

export const storyMeta = (s: Story) => [s.city, s.yearsInBusiness != null ? `${s.yearsInBusiness} yrs in real estate` : null, s.tenure, s.cameFrom].filter(Boolean).join(" · ");

// Stories whose agent name is still TODO only show while placeholders are on.
export const stories = allStories.filter((s) => s.nameConfirmed !== false || showPlaceholders);
export const findStory = (slug: string) => stories.find((s) => s.slug === slug);

// Which stories a section shows: wide (16:9 long-form) and tall (9:16 shorts), best match first.
export function pickStories({ persona, city, all = false }: { persona?: Story["persona"]; city?: string; all?: boolean } = {}) {
  const rank = (s: Story) => Number(!!persona && s.persona === persona) + 2 * Number(!!city && s.city === city);
  const list = [...stories].sort((a, b) => rank(b) - rank(a));
  const wide = list.filter((s) => s.orientation === "horizontal");
  const tall = list.filter((s) => s.orientation !== "horizontal");
  return all ? { wide, tall } : { wide: wide.slice(0, 3), tall: tall.slice(0, 3) };
}
