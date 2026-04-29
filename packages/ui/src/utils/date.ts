/**
 * Formats a Date object or ISO string to Vietnamese date format (dd/mm/yyyy)
 */
export function formatDateVN(dateInput: Date | string | number | null | undefined): string {
  if (!dateInput) return "";
  
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Parses a Vietnamese date string (dd/mm/yyyy) to an ISO date string (yyyy-mm-dd)
 */
export function parseDateVN(dateStr: string): string | null {
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = dateStr.match(regex);

  if (!match) return null;

  const day = match[1].padStart(2, "0");
  const month = match[2].padStart(2, "0");
  const year = match[3];

  return `${year}-${month}-${day}`;
}

/**
 * Converts ISO date string (yyyy-mm-dd) to Vietnamese format (dd/mm/yyyy)
 * Specifically for handling input value changes from native date inputs
 */
export function isoToVN(isoStr: string): string {
  if (!isoStr) return "";
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return "";
  return formatDateVN(date);
}
