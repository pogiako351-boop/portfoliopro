/**
 * Formats a number to a currency string with proper commas and $ sign.
 * e.g. 3735000 -> "$3,735,000"
 */
export function formatCurrency(value: number): string {
  return "$" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

/**
 * Formats a large number with abbreviation.
 * e.g. 3450000 -> "$3.45M"
 */
export function formatCurrencyShort(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return "$" + millions.toFixed(millions >= 10 ? 1 : 2) + "M";
  }
  if (value >= 1000) {
    const thousands = value / 1000;
    return "$" + thousands.toFixed(thousands >= 100 ? 0 : 1) + "k";
  }
  return "$" + value.toLocaleString("en-US");
}
