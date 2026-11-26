// Small SVG charts for NationScope, built as strings — no library, no network.
import { shortValue } from "./format.js";

const NAVY = "#1b2a4a";
const GOLD = "#c9a227";
const INK = "#20242e";
const MUTED = "#6b7280";
const GRID = "#e3ddd0";

// Horizontal bars: rows of { label, value, display }.
export function barChart(rows, indicator, maxLabelWidth = 96) {
  const rowH = 34;
  const height = rows.length * rowH + 8;
  const width = 640;
  const max = Math.max(...rows.map((r) => r.value));
  let parts = [];
  parts.push(`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart" xmlns="http://www.w3.org/2000/svg">`);
  rows.forEach((row, i) => {
    const y = 8 + i * rowH;
    const barW = Math.max(2, Math.round((row.value / max) * (width - maxLabelWidth - 90)));
    const label = escapeHtml(row.label);
    parts.push(`<text x="0" y="${y + 15}" font-size="13" fill="${INK}">${label}</text>`);
    parts.push(`<rect x="${maxLabelWidth}" y="${y}" width="${barW}" height="20" rx="3" fill="${i === 0 ? GOLD : NAVY}" />`);
    parts.push(`<text x="${maxLabelWidth + barW + 8}" y="${y + 15}" font-size="13" font-weight="700" fill="${INK}">${escapeHtml(row.display)}</text>`);
  });
  parts.push("</svg>");
  return parts.join("");
}

// Line chart over 2015-2024: values is an array of 10 numbers, years the labels.
export function lineChart(values, years, label, color = NAVY) {
  const width = 640;
  const height = 220;
  const padL = 64;
  const padR = 16;
  const padT = 18;
  const padB = 30;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const lo = min - span * 0.12;
  const hi = max + span * 0.12;
  const x = (i) => padL + (i * (width - padL - padR)) / (values.length - 1);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * (height - padT - padB);
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  let parts = [];
  parts.push(`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart of ${escapeHtml(label)}" xmlns="http://www.w3.org/2000/svg">`);
  for (let g = 0; g <= 3; g++) {
    const gv = lo + ((hi - lo) * g) / 3;
    const gy = y(gv);
    parts.push(`<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="${GRID}" stroke-width="1" />`);
    parts.push(`<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" font-size="11" fill="${MUTED}" text-anchor="end">${escapeHtml(shortValue({ kind: "money" }, gv))}</text>`);
  }
  parts.push(`<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />`);
  values.forEach((v, i) => {
    parts.push(`<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.5" fill="${color}" />`);
  });
  [0, 4, 9].forEach((i) => {
    parts.push(`<text x="${x(i).toFixed(1)}" y="${height - 8}" font-size="11" fill="${MUTED}" text-anchor="middle">${years[i]}</text>`);
  });
  parts.push("</svg>");
  return parts.join("");
}

// Grouped bars for the compare page: one group per indicator, one bar per country.
export function groupedBars(groups, countries, indicatorOf) {
  const width = 640;
  const groupH = 86;
  const height = groups.length * groupH + 10;
  const colors = [NAVY, GOLD, "#7a4a21"];
  let parts = [];
  parts.push(`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Comparison chart" xmlns="http://www.w3.org/2000/svg">`);
  groups.forEach((group, gi) => {
    const gy = 10 + gi * groupH;
    const indicator = indicatorOf(group.id);
    const vals = countries.map((c) => c.v[group.id]).filter((v) => v !== null && v !== undefined);
    const max = vals.length ? Math.max(...vals) : 1;
    parts.push(`<text x="0" y="${gy + 14}" font-size="13" font-weight="700" fill="${INK}">${escapeHtml(indicator.label)}</text>`);
    countries.forEach((c, ci) => {
      const value = c.v[group.id];
      const by = gy + 22 + ci * 18;
      if (value === null || value === undefined) {
        parts.push(`<text x="0" y="${by + 11}" font-size="12" fill="${MUTED}">${escapeHtml(c.code)} — not reported</text>`);
        return;
      }
      const barW = Math.max(2, Math.round((value / max) * 430));
      parts.push(`<text x="0" y="${by + 11}" font-size="12" fill="${INK}">${escapeHtml(c.code)}</text>`);
      parts.push(`<rect x="44" y="${by}" width="${barW}" height="13" rx="2" fill="${colors[ci % colors.length]}" />`);
      parts.push(`<text x="${44 + barW + 6}" y="${by + 11}" font-size="12" fill="${INK}">${escapeHtml(shortValue(indicator, value))}</text>`);
    });
  });
  parts.push("</svg>");
  return parts.join("");
}

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
