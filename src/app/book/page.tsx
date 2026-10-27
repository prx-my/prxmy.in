import type { Metadata } from "next";
import { Booking } from "@/components/booking";
import { EditorialPage } from "@/components/editorial-page";
import { booking, profile } from "@/content";

export const metadata: Metadata = {
  title: booking.navLabel,
  description: booking.intro,
  alternates: { canonical: "/book" },
};

export default function Book() {
  return (
    <EditorialPage current="book">
      <header className="editorial-heading">
        <p className="eyebrow">A little time. A good conversation.</p>
        <h1>Book a call<span>.</span></h1>
      </header>
      <div className="booking-layout">
        <aside className="booking-intro">
          <p className="editorial-lead">Let’s put something<br/>on the calendar.</p>
          <p>{booking.intro}</p>
          <ol className="booking-guide" aria-label="How booking works">
            <li><span>01</span>Choose a meeting length.</li>
            <li><span>02</span>Find a date and time.</li>
            <li><span>03</span>Leave your details. You’re booked.</li>
          </ol>
          <dl className="meeting-facts">
            <div><dt>With</dt><dd>{profile.name}</dd></div>
            <div><dt>Where</dt><dd>Google Meet</dd></div>
            <div><dt>Time zone</dt><dd>Shown in your local time</dd></div>
          </dl>
          <p className="booking-email">Prefer a note?<br/><a href={`mailto:${profile.email}`} className="link">{profile.email} ↗</a></p>
        </aside>
        <section className="booking-sheet" aria-label="Choose a time and book a call">
          <div className="sheet-rule" aria-hidden="true" />
          <div className="booking-sheet-heading"><span className="eyebrow">Your next conversation</span><span className="eyebrow">01 / Schedule</span></div>
          <Booking />
        </section>
      </div>
    </EditorialPage>
  );
}
