// Number formatting for NationScope: short human forms for big figures.
export function withCommas(value) {
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 1,450,935,791 -> "1.45 billion"; 3,760,813,470,501 -> "$3.76 trillion"
export function shortCount(value) {
  const abs = Math.abs(value);
  if (abs >= 1e12) return trimNum(value / 1e12) + " trillion";
  if (abs >= 1e9) return trimNum(value / 1e9) + " billion";
  if (abs >= 1e6) return trimNum(value / 1e6) + " million";
  if (abs >= 1e3) return trimNum(value / 1e3) + " thousand";
  return String(value);
}

export function shortMoney(value) {
  return "$" + shortCount(value);
}

export function trimNum(value, digits = 2) {
  const rounded = Number(value.toFixed(digits));
  return String(rounded);
}

// One value, formatted for its indicator kind.
export function formatValue(indicator, value) {
  if (value === null || value === undefined) return "Not reported";
  if (indicator.kind === "count") return withCommas(value);
  if (indicator.kind === "money") return "$" + withCommas(value);
  if (indicator.kind === "years") return trimNum(value) + " years";
  return trimNum(value) + "%";
}

// Short form for chart labels and table cells.
export function shortValue(indicator, value) {
  if (value === null || value === undefined) return "—";
  if (indicator.kind === "count") return shortCount(value);
  if (indicator.kind === "money") return shortMoney(value);
  if (indicator.kind === "years") return trimNum(value, 1) + " yrs";
  return trimNum(value) + "%";
}

export function yearNote(country, indicatorId) {
  const year = country.y[indicatorId];
  return year ? String(year) : "";
}
