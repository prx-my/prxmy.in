import type { NextRequest } from "next/server";
import { CalError, calErrorResponse, createBooking } from "@/lib/cal";
import { isTimeZone } from "@/lib/dates";

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_NOTES = 1000;
const MAX_GUESTS = 5;
// Deliberately loose. Cal.com's own confirmation email is the real check.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
// Best-effort only: this Map lives in one server instance, so it deters casual
// abuse rather than enforcing anything across a deployment.
const attempts = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((at) => now - at < RATE_WINDOW_MS);

  if (recent.length >= RATE_MAX) {
    attempts.set(key, recent);
    return true;
  }

  recent.push(now);
  attempts.set(key, recent);

  if (attempts.size > 1000) {
    for (const [candidate, times] of attempts) {
      if (times.every((at) => now - at >= RATE_WINDOW_MS)) attempts.delete(candidate);
    }
  }

  return false;
}

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

type BookingInput = Parameters<typeof createBooking>[0];

function parseBooking(body: unknown): BookingInput | string {
  if (typeof body !== "object" || body === null) return "Expected a JSON object.";
  const raw = body as Record<string, unknown>;

  // The booking form's hidden honeypot field; people never fill it in.
  if (text(raw.website)) return "That slot couldn't be booked. Try another one.";

  const eventTypeId = Number(raw.eventTypeId);
  if (!Number.isInteger(eventTypeId) || eventTypeId <= 0) {
    return "eventTypeId must be a positive integer.";
  }

  const start = text(raw.start);
  const startsAt = start ? Date.parse(start) : NaN;
  if (Number.isNaN(startsAt)) return "start must be an ISO 8601 timestamp.";

  const skew = startsAt - Date.now();
  if (skew < -60 * 60 * 1000) return "That slot is in the past. Pick another one.";
  if (skew > 180 * 24 * 60 * 60 * 1000) return "That slot is too far ahead to book.";

  const timeZone = text(raw.timeZone);
  if (!isTimeZone(timeZone)) return "timeZone must be an IANA time zone.";

  const name = text(raw.name);
  if (!name || name.length > MAX_NAME) {
    return `A name of up to ${MAX_NAME} characters is required.`;
  }

  const email = text(raw.email);
  if (!EMAIL.test(email) || email.length > MAX_EMAIL) return "A valid email is required.";

  const notes = text(raw.notes);
  if (notes.length > MAX_NOTES) {
    return `Notes must be under ${MAX_NOTES} characters.`;
  }

  const guests = Array.isArray(raw.guests)
    ? raw.guests
        .map((guest) => text(guest))
        .filter((guest) => EMAIL.test(guest))
        .slice(0, MAX_GUESTS)
    : [];

  return {
    eventTypeId,
    start,
    timeZone,
    name,
    email,
    notes: notes || undefined,
    guests,
  };
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) {
    return Response.json(
      { error: "Too many booking attempts. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const input = parseBooking(body);
  if (typeof input === "string") {
    return Response.json({ error: input }, { status: 400 });
  }

  try {
    const booking = await createBooking(input);
    return Response.json({ booking }, { status: 201 });
  } catch (error) {
    if (error instanceof CalError && error.kind === "upstream") {
      console.error("[cal] booking rejected", error.status, error.message);
    }
    return calErrorResponse(error);
  }
}
