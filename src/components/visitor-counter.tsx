import { getVisitorStats } from "@/lib/visitors";
import { VisitStamp } from "@/components/visit-stamp";

export async function VisitorCounter() {
  const { snapshot } = await getVisitorStats();
  return (
    <section id="farewell" className="page-width visitor-farewell" aria-labelledby="farewell-heading">
      <div className="farewell-copy">
        <p className="eyebrow farewell-kicker"><span aria-hidden="true">✦</span> Before you go</p>
        <h2 id="farewell-heading">Glad our paths<br/><em>crossed.</em></h2>
        <p>Thanks for spending a little time in my corner of the internet.</p>
        <p className="farewell-count"><strong>{snapshot.visitors.toLocaleString("en-US")}</strong><span>curious {snapshot.visitors === 1 ? "mind has" : "minds have"} passed this way.</span></p>
      </div>
      <VisitStamp />
    </section>
  );
}
