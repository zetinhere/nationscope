// How numbers read on the site: short human forms for headlines and chart
// labels, full forms for tables, and one formatter per indicator so every
// figure of the same kind is written the same way everywhere.

const GROUPED = new Intl.NumberFormat('en-US');

// A whole number with thousands separators: 1450935791 -> 1,450,935,791.
export function fmtInt(n) {
  return GROUPED.format(Math.round(n));
}

// Scale a big number down to trillions / billions / millions, keeping the
// suffix the caller asked for. Returns [scaled value, suffix] or null when
// the number is too small to scale.
function scaled(n, steps) {
  for (const [atLeast, divisor, suffix] of steps) {
    if (n >= atLeast) return [n / divisor, suffix];
  }
  return null;
}

export function fmtMoney(n) {
  const s = scaled(n, [[1e12, 1e12, ' trillion'], [1e9, 1e9, ' billion'], [1e6, 1e6, ' million']]);
  if (!s) return `$${fmtInt(n)}`;
  const [v, suffix] = s;
  return `$${v.toFixed(suffix === ' trillion' ? 2 : 1)}${suffix}`;
}

export function fmtMoneyShort(n) {
  const s = scaled(n, [[1e12, 1e12, 'T'], [1e9, 1e9, 'B']]);
  if (!s) return `$${fmtInt(n)}`;
  const [v, suffix] = s;
  return `$${v.toFixed(suffix === 'T' ? 2 : 0)}${suffix}`;
}

export function fmtPop(n) {
  const s = scaled(n, [[1e9, 1e9, ' billion'], [1e6, 1e6, ' million']]);
  if (!s) return fmtInt(n);
  const [v, suffix] = s;
  return `${v.toFixed(suffix === ' billion' ? 2 : 1)}${suffix}`;
}

export function fmtPopShort(n) {
  const s = scaled(n, [[1e9, 1e9, 'B'], [1e6, 1e6, 'M']]);
  if (!s) return fmtInt(n);
  const [v, suffix] = s;
  return `${v.toFixed(suffix === 'B' ? 2 : 0)}${suffix}`;
}

// A signed percentage with one decimal: 7.1 -> +7.1%, -0.5 -> -0.5%.
export function fmtSigned(n, decimals = 1) {
  return `${n > 0 ? '+' : ''}${n.toFixed(decimals)}%`;
}

// One indicator's value, written the way its page shows it.
const VALUE_FORMATS = {
  pop: (v) => fmtPop(v),
  gdp: (v) => fmtMoney(v),
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
  const fn = VALUE_FORMATS[key];
  return fn ? fn(value) : String(value);
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
