import { getVisitorStats } from "@/lib/visitors";

function date(value: string) {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export async function VisitorCounter() {
  const { snapshot } = await getVisitorStats();
  return (
    <aside className="page-width visitor-strip" aria-label="Portfolio visitor count">
      <div>
        <p className="eyebrow visitor-kicker"><span aria-hidden="true">✦</span> The plot thickens</p>
        <p className="visitor-total"><strong>{snapshot.visitors.toLocaleString("en-US")}</strong><span>curious minds have<br/>followed the trail.</span></p>
      </div>
      <p className="visitor-source">Recorded visitors since {date(snapshot.from)}.<br/>Vercel Analytics · counted through <time dateTime={snapshot.through}>{date(snapshot.through)}</time>.</p>
    </aside>
  );
}
