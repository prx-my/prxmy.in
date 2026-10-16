import type { NextRequest } from "next/server";
import { calErrorResponse, listSlots } from "@/lib/cal";
import { isTimeZone } from "@/lib/dates";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_RANGE_DAYS = 45;

function daysBetween(start: string, end: string) {
  const from = Date.parse(`${start}T00:00:00Z`);
  const to = Date.parse(`${end}T00:00:00Z`);
  return Math.round((to - from) / 86_400_000);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const eventTypeId = Number(params.get("eventTypeId"));
  const start = params.get("start")?.trim() ?? "";
  const end = params.get("end")?.trim() ?? "";
  const timeZone = params.get("timeZone")?.trim() ?? "";

  if (!Number.isInteger(eventTypeId) || eventTypeId <= 0) {
    return Response.json({ error: "eventTypeId must be a positive integer." }, { status: 400 });
  }

  if (!DATE.test(start) || !DATE.test(end)) {
    return Response.json({ error: "start and end must be YYYY-MM-DD." }, { status: 400 });
  }

  const span = daysBetween(start, end);
  if (span < 0 || span > MAX_RANGE_DAYS) {
    return Response.json(
      { error: `The date range must be between 0 and ${MAX_RANGE_DAYS} days.` },
      { status: 400 },
    );
  }

  if (!isTimeZone(timeZone)) {
    return Response.json({ error: "timeZone must be an IANA time zone." }, { status: 400 });
  }

  try {
    const slots = await listSlots({ eventTypeId, start, end, timeZone });
    return Response.json({ slots });
  } catch (error) {
    return calErrorResponse(error);
  }
}
