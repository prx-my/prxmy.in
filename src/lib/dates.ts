// Date helpers shared by the booking API routes and the booking form, so they
// must stay pure and browser-safe.

// `YYYY-MM-DD` for a Date's *local* calendar day.
export function localDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Adds days in local time, so it survives daylight-saving boundaries.
export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

// Parses `YYYY-MM-DD` as a local calendar day (not UTC midnight, which would
// land on the previous day for anyone west of Greenwich).
export function parseLocalDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isTimeZone(value: string): boolean {
  if (!value || value.length > 64) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}
