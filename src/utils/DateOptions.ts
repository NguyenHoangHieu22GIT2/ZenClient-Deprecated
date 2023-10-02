interface DateTimeFormatOptions {
  localeMatcher?: "best fit" | "lookup" | undefined;
  weekday?: "long" | "short" | "narrow" | undefined;
  era?: "long" | "short" | "narrow" | undefined;
  year?: "numeric" | "2-digit" | undefined;
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
  day?: "numeric" | "2-digit" | undefined;
  hour?: "numeric" | "2-digit" | undefined;
  minute?: "numeric" | "2-digit" | undefined;
  second?: "numeric" | "2-digit" | undefined;
  timeZoneName?:
    | "short"
    | "long"
    | "shortOffset"
    | "longOffset"
    | "shortGeneric"
    | "longGeneric"
    | undefined;
  formatMatcher?: "best fit" | "basic" | undefined;
  hour12?: boolean | undefined;
  timeZone?: string | undefined;
}
export const DateOptions: DateTimeFormatOptions = {
  weekday: "long", // Full weekday name (e.g., "Friday")
  year: "numeric",
  month: "long", // Full month name (e.g., "February")
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true, // Use 12-hour clock (e.g., "5:57 PM")
};