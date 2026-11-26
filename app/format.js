// Number formatting for NationScope: short human forms for headlines and
// chart labels, full forms for tables, and one formatter per indicator so a
// figure of the same kind is always written the same way.

const grouped = new Intl.NumberFormat("en-US");

// Whole number with thousands separators: 1450935791 -> 1,450,935,791.
export function fmtInt(n) {
  return grouped.format(Math.round(n));
}

// Pick the largest scale in `steps` the number reaches. Each step is
// [threshold, divisor, suffix]. Returns { value, suffix } or null.
function pickScale(n, steps) {
  for (const step of steps) {
    if (n >= step[0]) return { value: n / step[1], suffix: step[2] };
  }
  return null;
}

function moneyLong(n) {
  const s = pickScale(n, [[1e12, 1e12, " trillion"], [1e9, 1e9, " billion"], [1e6, 1e6, " million"]]);
  if (!s) return `$${fmtInt(n)}`;
  return `$${s.value.toFixed(s.suffix === " trillion" ? 2 : 1)}${s.suffix}`;
}

function moneyShort(n) {
  const s = pickScale(n, [[1e12, 1e12, "T"], [1e9, 1e9, "B"]]);
  if (!s) return `$${fmtInt(n)}`;
  return `$${s.value.toFixed(s.suffix === "T" ? 2 : 0)}${s.suffix}`;
}

function popLong(n) {
  const s = pickScale(n, [[1e9, 1e9, " billion"], [1e6, 1e6, " million"]]);
  if (!s) return fmtInt(n);
  return `${s.value.toFixed(s.suffix === " billion" ? 2 : 1)}${s.suffix}`;
}

function popShort(n) {
  const s = pickScale(n, [[1e9, 1e9, "B"], [1e6, 1e6, "M"]]);
  if (!s) return fmtInt(n);
  return `${s.value.toFixed(s.suffix === "B" ? 2 : 0)}${s.suffix}`;
}

export { moneyLong as fmtMoney, moneyShort as fmtMoneyShort, popLong as fmtPop, popShort as fmtPopShort };

// A signed percentage with one decimal: 7.1 -> +7.1%, -0.5 -> -0.5%.
export function fmtSigned(n, decimals = 1) {
  return `${n > 0 ? "+" : ""}${n.toFixed(decimals)}%`;
}

// One indicator's value, written the way its page shows it.
const BY_INDICATOR = {
  pop: (v) => popLong(v),
  gdp: (v) => moneyLong(v),
  gdppc: (v) => `$${fmtInt(v)}`,
  growth: (v) => fmtSigned(v),
  life: (v) => `${v.toFixed(1)} years`,
  urban: (v) => `${v.toFixed(1)}%`,
  unemp: (v) => `${v.toFixed(1)}%`,
  internet: (v) => `${v.toFixed(1)}%`,
  age65: (v) => `${v.toFixed(1)}%`,
  fert: (v) => v.toFixed(2),
  area: (v) => `${fmtInt(v)} km²`,
};

export function fmtValue(key, value) {
  const fn = BY_INDICATOR[key];
  return fn ? fn(value) : String(value);
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
