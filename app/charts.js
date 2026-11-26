// Charts, drawn as plain SVG in code: no library, no network, and every
// number on a chart also appears as text beside it. One shared palette
// runs through all three chart kinds, so a colour keeps its meaning from
// page to page.

import { escapeHtml } from "./format.js";

const PALETTE = ["#0b5cad", "#0e7a5f", "#b3541e", "#6a4fa3", "#a31e4d", "#8a6d00"];

function colour(i) {
  return PALETTE[i % PALETTE.length];
}

function wrapSvg(width, height, label, inner) {
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(label)}" class="chart">\n${inner}\n</svg>`;
}

function axisNumber(v) {
  if (Math.abs(v) >= 1000) return Math.round(v).toLocaleString("en-US");
  if (Math.abs(v) >= 100) return v.toFixed(0);
  return v.toFixed(1);
}

// One horizontal bar per row: rows are { label, value, display }. The
// longest bar fills the width; the rest scale against it.
export function barChart(rows, options = {}) {
  const width = options.width ?? 640;
  const rowHeight = options.rowHeight ?? 34;
  const labelWidth = options.labelWidth ?? 110;
  const barX = labelWidth + 8;
  const barW = width - barX - 64;
  const max = Math.max(...rows.map((r) => r.value));
  const parts = rows.map((row, i) => {
    const y = 8 + i * rowHeight;
    const w = Math.max(2, (row.value / max) * barW);
    return [
      `<text x="0" y="${y + 15}" class="chart-label">${escapeHtml(row.label)}</text>`,
      `<rect x="${barX}" y="${y}" width="${w.toFixed(1)}" height="20" rx="3" fill="${colour(i)}"/>`,
      `<text x="${barX + w + 6}" y="${y + 15}" class="chart-value">${escapeHtml(row.display)}</text>`,
    ].join("\n");
  });
  return wrapSvg(width, rows.length * rowHeight + 8, "Bar chart", parts.join("\n"));
}

// One line over 2015-2024: values holds ten numbers, one per year.
// Gridlines, every other year labelled, latest value called out at the end.
export function lineChart(values, options = {}) {
  const width = options.width ?? 640;
  const height = options.height ?? 240;
  const color = options.color ?? "#0b5cad";
  const unit = options.unit ?? "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.15 || 1;
  const lo = min - pad;
  const hi = max + pad;
  const left = 52, right = 14, top = 14, bottom = 28;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const px = (i) => left + (i * plotW) / (values.length - 1);
  const py = (v) => top + ((hi - v) / (hi - lo)) * plotH;

  const gridLines = [0.25, 0.5, 0.75].map((f) => {
    const gy = top + f * plotH;
    const gv = hi - f * (hi - lo);
    return `<line x1="${left}" y1="${gy.toFixed(1)}" x2="${width - right}" y2="${gy.toFixed(1)}" class="grid"/>` +
      `<text x="${left - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" class="axis">${axisNumber(gv)}${unit}</text>`;
  }).join("\n");

  const yearLabels = values
    .map((_, i) => (i % 2 === 0
      ? `<text x="${px(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" class="axis">${2015 + i}</text>`
      : ""))
    .join("");

  const points = values.map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
  const dots = values
    .map((v, i) => `<circle cx="${px(i).toFixed(1)}" cy="${py(v).toFixed(1)}" r="3.5" fill="${color}"/>`)
    .join("");
  const last = values[values.length - 1];
  const lastLabel = `<text x="${px(values.length - 1).toFixed(1)}" y="${(py(last) - 10).toFixed(1)}" text-anchor="end" class="chart-value">${axisNumber(last)}${unit}</text>`;

  return wrapSvg(width, height, "Line chart, 2015 to 2024",
    `${gridLines}\n<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>\n${dots}\n${yearLabels}\n${lastLabel}`);
}

// Grouped bars for the compare page: one group per indicator, one bar per
// country. Values are normalised inside each group, so unlike units never
// mix. Labels use the short value forms and a wide right margin, so no
// label runs past the edge of the picture.
export function groupedBars(groups, options = {}) {
  const width = options.width ?? 640;
  const rowH = 30;
  const labelW = 150;
  const barX = labelW + 8;
  const barW = width - barX - 96;
  const height = groups.length * (rowH * 3 + 26) + 10;
  const lines = [];
  let y = 10;
  for (const group of groups) {
    lines.push(`<text x="0" y="${y + 12}" class="chart-label strong">${escapeHtml(group.label)}</text>`);
    y += 22;
    const max = Math.max(...group.values.map((v) => v.value));
    group.values.forEach((v, i) => {
      const w = Math.max(2, (v.value / max) * barW);
      lines.push(
        `<text x="0" y="${y + 14}" class="chart-label">${escapeHtml(v.name)}</text>`,
        `<rect x="${barX}" y="${y}" width="${w.toFixed(1)}" height="18" rx="3" fill="${colour(i)}"/>`,
        `<text x="${barX + w + 6}" y="${y + 14}" class="chart-value">${escapeHtml(v.display)}</text>`,
      );
      y += rowH;
    });
    y += 4;
  }
  return wrapSvg(width, height, "Comparison chart", lines.join("\n"));
}
