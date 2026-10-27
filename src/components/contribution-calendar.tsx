"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { ContributionCalendar as Calendar, ContributionDay } from "@/lib/github-client";

function dateLabel(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function dayLabel(day: ContributionDay) {
  return `${day.contributionCount.toLocaleString("en-US")} ${day.contributionCount === 1 ? "contribution" : "contributions"} on ${dateLabel(day.date)}`;
}

function CalendarPanel({ weeks, peak }: { weeks: Calendar["weeks"]; peak: number }) {
  const days = weeks.flatMap((week) => week.contributionDays);
  const [activeDate, setActiveDate] = useState(days.at(-1)!.date);
  const [inspected, setInspected] = useState<ContributionDay>(days.at(-1)!);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const helpId = useId();

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const offsets: Record<string, number> = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = days.length - 1;
    else if (event.key in offsets) next = index + offsets[event.key];
    else return;
    event.preventDefault();
    next = Math.max(0, Math.min(days.length - 1, next));
    setActiveDate(days[next].date);
    setInspected(days[next]);
    buttons.current.get(days[next].date)?.focus();
  }

  return (
    <div className="calendar-panel">
      <p id={helpId} className="sr-only">Use arrow keys to explore days. Left and right move one week; up and down move one day. Home and End go to the first and last day. Tab leaves the calendar.</p>
      <div className="calendar-body">
        <div className="calendar-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
        <div className="calendar-main" style={{ "--week-count": weeks.length } as CSSProperties}>
          <div className="calendar-months" aria-hidden="true">
            {weeks.map((week, index) => {
              const date = week.contributionDays[0].date;
              const month = date.slice(0, 7);
              const previous = weeks[index - 1]?.contributionDays[0].date.slice(0, 7);
              const firstIsShort = index === 0 && weeks[1]?.contributionDays[0].date.slice(0, 7) !== month;
              if (month === previous || firstIsShort || index > weeks.length - 3) return null;
              return <span key={date} style={{ gridColumn: `${index + 1} / span 3` }}>{new Date(date + "T00:00:00Z").toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}</span>;
            })}
          </div>
          <div className="calendar-weeks" role="group" aria-label={`Daily contributions from ${dateLabel(days[0].date)} to ${dateLabel(days.at(-1)!.date)}`} aria-describedby={helpId}>
            {weeks.map((week) => (
              <div key={week.contributionDays[0].date} className="calendar-week">
                {week.contributionDays.map((day) => {
                  const index = days.findIndex((item) => item.date === day.date);
                  const level = day.contributionCount === 0 ? 0 : Math.max(1, Math.ceil(day.contributionCount / peak * 4));
                  return (
                    <button key={day.date} type="button" className="calendar-day"
                      data-level={level} data-date={day.date}
                      style={{ gridRow: new Date(day.date + "T00:00:00Z").getUTCDay() + 1 }}
                      ref={(element) => { if (element) buttons.current.set(day.date, element); else buttons.current.delete(day.date); }}
                      tabIndex={activeDate === day.date ? 0 : -1}
                      title={dayLabel(day)} aria-label={dayLabel(day)}
                      onMouseEnter={() => setInspected(day)}
                      onFocus={() => { setActiveDate(day.date); setInspected(day); }}
                      onClick={() => { setActiveDate(day.date); setInspected(day); }}
                      onKeyDown={(event) => navigate(event, index)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="calendar-caption">
        <p className="calendar-detail" aria-live="polite" aria-atomic="true">{dayLabel(inspected)}</p>
        <div className="calendar-legend" aria-label="Contribution intensity from fewer to more"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} />)}<span>More</span></div>
      </div>
    </div>
  );
}

export function ContributionCalendar({ calendar }: { calendar: Calendar }) {
  const peak = Math.max(1, ...calendar.weeks.flatMap((week) => week.contributionDays.map((day) => day.contributionCount)));
  const middle = Math.ceil(calendar.weeks.length / 2);
  return (
    <div className="contribution-calendar">
      <div className="calendar-desktop"><CalendarPanel weeks={calendar.weeks} peak={peak} /></div>
      <div className="calendar-mobile">
        <CalendarPanel weeks={calendar.weeks.slice(0, middle)} peak={peak} />
        <CalendarPanel weeks={calendar.weeks.slice(middle)} peak={peak} />
      </div>
    </div>
  );
}
