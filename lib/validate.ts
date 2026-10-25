export const ENTRY_TYPES = ["CHORE", "ERRAND", "WORKLOAD", "DIARY", "TASK", "HEALTH"] as const;
export type EntryType = (typeof ENTRY_TYPES)[number];

export const MAX_CONTENT_LENGTH = 2000;

export function isEntryType(value: unknown): value is EntryType {
  return (
    typeof value === "string" &&
    (ENTRY_TYPES as readonly string[]).includes(value)
  );
}

export function isEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

export function isNonEmptyString(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}
