// Cal.com API v2 client. Server-only: it reads CAL_API_KEY, so it must never be
// imported by a Client Component.
// Docs: https://cal.com/docs/api-reference/v2

const BASE_URL = "https://api.cal.com/v2";

// Cal.com versions each endpoint independently. These are the versions this
// client is written against.
const VERSION = {
  eventTypes: "2024-06-14",
  slots: "2024-09-04",
  bookings: "2024-08-13",
} as const;

export type CalEventType = {
  id: number;
  slug: string;
  title: string;
  lengthInMinutes: number;
  description: string;
};

export type CalSlot = { start: string };

export type CalBooking = {
  uid: string;
  title: string;
  status: string;
  start: string;
  end: string;
  duration: number;
  location: string | null;
  meetingUrl: string | null;
};

// `config` means this server is misconfigured; `upstream` means Cal.com replied
// with an error.
export class CalError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly kind: "config" | "upstream",
    readonly detail?: unknown,
  ) {
    super(message);
    this.name = "CalError";
  }
}

function apiKey() {
  const key = process.env.CAL_API_KEY;
  if (!key) {
    throw new CalError(500, "CAL_API_KEY is not set.", "config");
  }
  return key;
}

function upstreamMessage(body: unknown, fallback: string) {
  if (typeof body !== "object" || body === null) return fallback;

  const { error, message } = body as { error?: unknown; message?: unknown };
  if (typeof message === "string" && message) return message;

  if (typeof error === "string" && error) return error;
  if (typeof error === "object" && error !== null) {
    const nested = (error as { message?: unknown }).message;
    if (typeof nested === "string" && nested) return nested;
  }

  return fallback;
}

async function request<T>(
  path: string,
  version: string,
  init: {
    method?: string;
    body?: unknown;
    searchParams?: Record<string, string | number | undefined>;
  } = {},
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  for (const [name, value] of Object.entries(init.searchParams ?? {})) {
    if (value !== undefined) url.searchParams.set(name, String(value));
  }

  const res = await fetch(url, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "cal-api-version": version,
      ...(init.body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });

  const body: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    throw new CalError(
      res.status,
      upstreamMessage(body, `Cal.com responded with ${res.status}.`),
      "upstream",
      body,
    );
  }

  return (body as { data: T }).data;
}

type RawEventType = {
  id: number;
  slug: string;
  title: string;
  lengthInMinutes?: number | null;
  description?: string | null;
  hidden?: boolean;
};

// Public projection of the account's event types. Hidden ones (private or
// unlisted links) are dropped so they never reach a browser.
export async function listEventTypes(): Promise<CalEventType[]> {
  const raw = await request<RawEventType[]>("/event-types", VERSION.eventTypes);

  return (raw ?? [])
    .filter((eventType) => !eventType.hidden)
    .map((eventType) => ({
      id: eventType.id,
      slug: eventType.slug,
      title: eventType.title,
      lengthInMinutes: eventType.lengthInMinutes ?? 30,
      description: eventType.description ?? "",
    }));
}

// Available slots, keyed by date in `timeZone`. Dates are inclusive and must be
// `YYYY-MM-DD`; see the slots endpoint docs for why both are required.
export async function listSlots(input: {
  eventTypeId: number;
  start: string;
  end: string;
  timeZone: string;
}): Promise<Record<string, CalSlot[]>> {
  const data = await request<Record<string, CalSlot[]>>("/slots", VERSION.slots, {
    searchParams: input,
  });

  return data ?? {};
}

type RawBooking = {
  uid: string;
  title: string;
  status: string;
  start: string;
  end: string;
  duration: number;
  location?: string | null;
  meetingUrl?: string | null;
};

export async function createBooking(input: {
  eventTypeId: number;
  start: string;
  timeZone: string;
  name: string;
  email: string;
  notes?: string;
  guests?: string[];
}): Promise<CalBooking> {
  const booking = await request<RawBooking>("/bookings", VERSION.bookings, {
    method: "POST",
    body: {
      eventTypeId: input.eventTypeId,
      start: input.start,
      attendee: {
        name: input.name,
        email: input.email,
        timeZone: input.timeZone,
      },
      ...(input.notes ? { bookingFieldsResponses: { notes: input.notes } } : {}),
      ...(input.guests?.length ? { guests: input.guests } : {}),
    },
  });

  return {
    uid: booking.uid,
    title: booking.title,
    status: booking.status,
    start: booking.start,
    end: booking.end,
    duration: booking.duration,
    location: booking.location ?? null,
    meetingUrl: booking.meetingUrl ?? null,
  };
}

// Maps a thrown error to a JSON response. Cal.com's 5xx stays behind a 502 so a
// visitor never sees "this site is broken" when it is Cal.com that is down.
export function calErrorResponse(error: unknown) {
  if (!(error instanceof CalError)) {
    console.error("[cal] unexpected error", error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }

  const status =
    error.kind === "config" ? 500 : error.status >= 500 ? 502 : error.status;

  return Response.json({ error: error.message }, { status });
}
