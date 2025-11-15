import { toZonedTime } from "date-fns-tz";

const WARSAW_TZ = "Europe/Warsaw";

/**
 * Gets the current date/time in Warsaw timezone.
 * Essential for showing accurate "days until holiday" for Polish users.
 * 
 * Example: At 1 AM Dec 20 in Poland (midnight Dec 19 UTC):
 * - Without this: Shows "6 days until Dec 25" (wrong - using UTC Dec 19)
 * - With this: Shows "5 days until Dec 25" (correct - using Poland Dec 20)
 */
export function getNowInWarsaw(): Date {
  return toZonedTime(new Date(), WARSAW_TZ);
}

