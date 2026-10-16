"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { CalBooking, CalEventType, CalSlot } from "@/lib/cal";
import { addDays, localDate, parseLocalDate } from "@/lib/dates";
import { booking as copy, profile } from "@/content";

const DAYS_AHEAD = 14;

// Slot timestamps come back with the offset of the visitor's own zone, so the
// browser's default locale and zone format them correctly. These are only used
// after the visitor's own zone is known, which keeps server and client markup
// identical.
const weekday = new Intl.DateTimeFormat(undefined, { weekday: "short" });
const dayOfMonth = new Intl.DateTimeFormat(undefined, { day: "numeric" });
const monthShort = new Intl.DateTimeFormat(undefined, { month: "short" });
const clock = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const full = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

// Values that only exist in a browser have to be read after hydration, or the
// prerendered markup won't match. `useSyncExternalStore` is the supported way
// to do that: `null` on the server, the real value in the browser.
const subscribeToNothing = () => () => {};
const serverSnapshot = () => null;
const currentTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
const currentLocalDate = () => localDate(new Date());

const chip = (active: boolean) =>
  [
    "rounded-md border px-3 py-2 text-sm transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    "disabled:cursor-not-allowed disabled:opacity-40",
    active
      ? "border-ink bg-ink text-ivory"
      : "border-line text-muted hover:border-ink hover:text-ink",
  ].join(" ");

const field =
  "rounded-md border border-line bg-ivory px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";

export function Booking() {
  const timeZone = useSyncExternalStore(subscribeToNothing, currentTimeZone, serverSnapshot);
  const today = useSyncExternalStore(subscribeToNothing, currentLocalDate, serverSnapshot);

  const [eventTypes, setEventTypes] = useState<CalEventType[]>([]);
  const [eventTypeId, setEventTypeId] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [slots, setSlots] = useState<Record<string, CalSlot[]>>({});
  const [slotsError, setSlotsError] = useState<string | null>(null);
  // The request key whose slots are in `slots`, so "loading" stays derived.
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [booked, setBooked] = useState<CalBooking | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/cal/event-types")
      .then((res) => res.json())
      .then((data: { eventTypes?: CalEventType[]; error?: string }) => {
        if (cancelled) return;

        const types = data.eventTypes ?? [];
        if (types.length === 0) {
          setLoadError(data.error ?? "No meeting types are available right now.");
          return;
        }

        const preferred = types.find((type) => type.slug === copy.preferredSlug);
        setEventTypes(types);
        setEventTypeId((preferred ?? types[0]).id);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Couldn't load the meeting types.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // The strip of selectable days, as `YYYY-MM-DD` in the visitor's zone.
  const days = useMemo(() => {
    if (!today) return [];
    const anchor = parseLocalDate(today);
    return Array.from({ length: DAYS_AHEAD }, (_, index) => localDate(addDays(anchor, index)));
  }, [today]);

  const first = days[0];
  const last = days[days.length - 1];
  const requestKey =
    eventTypeId && timeZone && first && last
      ? `${eventTypeId}|${first}|${last}|${timeZone}|${reload}`
      : null;

  useEffect(() => {
    if (!requestKey || !eventTypeId || !first || !last || !timeZone) return;

    const controller = new AbortController();

    // Cal.com reads `start`/`end` as UTC days, so pad by one day on each side;
    // the keys it returns are local to `timeZone`, which is what we look up.
    const params = new URLSearchParams({
      eventTypeId: String(eventTypeId),
      start: localDate(addDays(parseLocalDate(first), -1)),
      end: localDate(addDays(parseLocalDate(last), 1)),
      timeZone,
    });

    fetch(`/api/cal/slots?${params}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { slots?: Record<string, CalSlot[]>; error?: string }) => {
        const available = data.slots ?? {};

        setSlotsError(data.error ?? null);
        setSlots(available);
        setSlot(null);
        setDay((current) => {
          if (current && (available[current]?.length ?? 0) > 0) return current;
          return days.find((candidate) => (available[candidate]?.length ?? 0) > 0) ?? first;
        });
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setSlotsError("Couldn't load availability.");
        setSlots({});
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadedKey(requestKey);
      });

    return () => controller.abort();
  }, [requestKey, eventTypeId, first, last, timeZone, days]);

  const slotsLoading = requestKey !== null && loadedKey !== requestKey;
  const daySlots = day ? (slots[day] ?? []) : [];
  const ready = Boolean(timeZone && today);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!eventTypeId || !slot || submitting) return;

    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/cal/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventTypeId, start: slot, timeZone, name, email, notes }),
      });
      const data: { booking?: CalBooking; error?: string } = await res.json();

      if (!res.ok || !data.booking) {
        setFormError(data.error ?? "That slot couldn't be booked. Try another one.");
        setSubmitting(false);
        // The slot may have been taken while the form was open.
        setReload((count) => count + 1);
        return;
      }

      setBooked(data.booking);
    } catch {
      setFormError("Couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (booked) {
    // Cal.com puts the conferencing link in `location` for some integrations
    // and `meetingUrl` for others; take whichever is a URL.
    const joinUrl =
      [booked.meetingUrl, booked.location].find((url) => url?.startsWith("http")) ?? null;

    return (
      <div className="mt-10 border-y border-line py-8">
        <p className="font-mono text-xs tracking-wide text-faint uppercase">Confirmed</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight">
          {full.format(new Date(booked.start))}
        </h2>
        <p className="mt-3 max-w-md leading-relaxed text-muted">{copy.confirmed}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {joinUrl && (
            <a href={joinUrl} className="link" target="_blank" rel="noopener noreferrer">
              {joinUrl.includes("meet.google.com") ? "Join Google Meet" : "Join link"}{" "}
              <span aria-hidden className="text-faint">↗</span>
            </a>
          )}
          <button
            type="button"
            className="link text-muted hover:text-ink"
            onClick={() => {
              setBooked(null);
              setSubmitting(false);
              setSlot(null);
              setNotes("");
              setReload((count) => count + 1);
            }}
          >
            {copy.another}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      {loadError && (
        <p role="alert" className="mb-6 text-sm text-muted">
          {loadError}{" "}
          <a href={`mailto:${profile.email}`} className="link">
            {profile.email}
          </a>
        </p>
      )}

      {eventTypes.length > 1 && (
        <fieldset>
          <legend className="font-mono text-xs tracking-wide text-faint uppercase">Length</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                aria-pressed={type.id === eventTypeId}
                disabled={submitting}
                onClick={() => setEventTypeId(type.id)}
                className={chip(type.id === eventTypeId)}
              >
                {type.title}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8">
        <p className="font-mono text-xs tracking-wide text-faint uppercase">Date</p>
        <ul className="-mx-1 mt-3 flex gap-1 overflow-x-auto pb-1">
          {!ready && <li className="text-sm text-faint">Loading availability…</li>}
          {ready &&
            days.map((candidate) => {
              const date = parseLocalDate(candidate);
              const available = (slots[candidate]?.length ?? 0) > 0;
              return (
                <li key={candidate}>
                  <button
                    type="button"
                    disabled={!available || slotsLoading || submitting}
                    aria-pressed={candidate === day}
                    onClick={() => {
                      setDay(candidate);
                      setSlot(null);
                    }}
                    className={`${chip(candidate === day)} w-14 px-0 text-center leading-tight`}
                  >
                    <span className="block text-[0.65rem] tracking-wide uppercase">
                      {weekday.format(date)}
                    </span>
                    <span className="block text-base">{dayOfMonth.format(date)}</span>
                    <span className="block text-[0.65rem] uppercase text-faint">
                      {monthShort.format(date)}
                    </span>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="mt-8">
        <p className="font-mono text-xs tracking-wide text-faint uppercase">
          Time{timeZone && <span className="normal-case"> · {timeZone.replace(/_/g, " ")}</span>}
        </p>
        {slotsLoading ? (
          <p className="mt-3 text-sm text-faint">Checking…</p>
        ) : slotsError ? (
          <p role="alert" className="mt-3 text-sm text-muted">
            {slotsError}
          </p>
        ) : daySlots.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{copy.empty}</p>
        ) : (
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {daySlots.map((option) => (
              <li key={option.start}>
                <button
                  type="button"
                  aria-pressed={option.start === slot}
                  disabled={submitting}
                  onClick={() => setSlot(option.start)}
                  className={`${chip(option.start === slot)} w-full px-0 text-center`}
                >
                  {clock.format(new Date(option.start))}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-10 border-t border-line pt-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            Name
            <input
              required
              maxLength={100}
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={field}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            Email
            <input
              required
              type="email"
              maxLength={200}
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={field}
            />
          </label>
        </div>

        <label className="mt-4 flex flex-col gap-1.5 text-sm">
          <span>
            Anything to share? <span className="text-faint">Optional</span>
          </span>
          <textarea
            rows={3}
            maxLength={1000}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className={`${field} resize-y`}
          />
        </label>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="submit"
            disabled={!slot || submitting}
            className="rounded-md border border-ink bg-ink px-4 py-2 text-sm text-ivory transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting
              ? "Booking…"
              : slot
                ? `Book ${clock.format(new Date(slot))}`
                : "Pick a time"}
          </button>
          <p className="text-xs text-faint">
            {copy.fallback}{" "}
            <a href={`mailto:${profile.email}`} className="link">
              {profile.email}
            </a>
          </p>
        </div>

        {formError && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {formError}
          </p>
        )}
      </form>
    </div>
  );
}
