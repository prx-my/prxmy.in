import { connection } from "next/server";
import { calErrorResponse, listEventTypes } from "@/lib/cal";

// Request-time on purpose: the API key and the event list live on Cal.com, not
// in the build, so `connection()` keeps this out of prerendering.
export async function GET() {
  await connection();

  try {
    return Response.json({ eventTypes: await listEventTypes() });
  } catch (error) {
    return calErrorResponse(error);
  }
}
