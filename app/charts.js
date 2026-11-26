// Charts, drawn in code as plain SVG: no library, no network, and every
// number on a chart also appears as text beside it. All three charts share
// the same palette so a colour keeps its meaning across pages.

import { escapeHtml } from './format.js';

const PALETTE = ['#0b5cad', '#0e7a5f', '#b3541e', '#6a4fa3', '#a31e4d', '#8a6d00'];

function svg(width, height, label, inner) {
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(label)}" class="chart">\n${inner}\n</svg>`;
}

function nice(v) {
  if (Math.abs(v) >= 1000) return Math.round(v).toLocaleString('en-US');
  if (Math.abs(v) >= 100) return v.toFixed(0);
  return v.toFixed(1);
}

// One horizontal bar per row: [{label, value, display}]. The longest bar
// fills the width; the rest scale against it.
export function barChart(rows, { width = 640, rowHeight = 34, labelWidth = 110 } = {}) {
  const max = Math.max(...rows.map((r) => r.value));
  const barX = labelWidth + 8;
  const barW = width - barX - 64;
  const lines = rows.flatMap((row, i) => {
    const y = 8 + i * rowHeight;
    const w = Math.max(2, (row.value / max) * barW);
    const colour = PALETTE[i % PALETTE.length];
    return [
      `<text x="0" y="${y + 15}" class="chart-label">${escapeHtml(row.label)}</text>`,
      `<rect x="${barX}" y="${y}" width="${w.toFixed(1)}" height="20" rx="3" fill="${colour}"/>`,
      `<text x="${barX + w + 6}" y="${y + 15}" class="chart-value">${escapeHtml(row.display)}</text>`,
    ];
  });
  return svg(width, rows.length * rowHeight + 8, 'Bar chart', lines.join('\n'));
}

// One line over 2015-2024: values is ten numbers, one per year. Gridlines,
// every other year labelled, and the latest value called out at the end.
export function lineChart(values, { width = 640, height = 240, color = '#0b5cad', unit = '' } = {}) {
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
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const gy = top + f * plotH;
    const gv = hi - f * (hi - lo);
    return `<line x1="${left}" y1="${gy.toFixed(1)}" x2="${width - right}" y2="${gy.toFixed(1)}" class="grid"/>` +
      `<text x="${left - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" class="axis">${nice(gv)}${unit}</text>`;
  });
  const years = values
    .map((_, i) => (i % 2 === 0
      ? `<text x="${px(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" class="axis">${2015 + i}</text>` : ''))
    .join('');
  const dots = values
    .map((v, i) => `<circle cx="${px(i).toFixed(1)}" cy="${py(v).toFixed(1)}" r="3.5" fill="${color}"/>`)
    .join('');
  const points = values.map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
  const last = values[values.length - 1];
  return svg(width, height, 'Line chart, 2015 to 2024', `${grid.join('\n')}
<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
${dots}
${years}
<text x="${px(values.length - 1).toFixed(1)}" y="${(py(last) - 10).toFixed(1)}" text-anchor="end" class="chart-value">${nice(last)}${unit}</text>`);
}

// Grouped bars for the compare page: one group per indicator, one bar per
// country. Values are normalised inside each group, so unlike units never
// mix. Labels use the short value forms and a wide right margin, so no
// label runs past the edge of the picture.
export function groupedBars(groups, { width = 640 } = {}) {
  const rowH = 30;
  const labelW = 150;
  const barX = labelW + 8;
  const barW = width - barX - 96;
  const height = groups.length * (rowH * 3 + 26) + 10;
  const lines = [];
  let y = 10;
  groups.forEach((group) => {
    lines.push(`<text x="0" y="${y + 12}" class="chart-label strong">${escapeHtml(group.label)}</text>`);
    y += 22;
    const max = Math.max(...group.values.map((v) => v.value));
    group.values.forEach((v, i) => {
      const w = Math.max(2, (v.value / max) * barW);
      lines.push(
        `<text x="0" y="${y + 14}" class="chart-label">${escapeHtml(v.name)}</text>`,
        `<rect x="${barX}" y="${y}" width="${w.toFixed(1)}" height="18" rx="3" fill="${PALETTE[i % PALETTE.length]}"/>`,
        `<text x="${barX + w + 6}" y="${y + 14}" class="chart-value">${escapeHtml(v.display)}</text>`,
      );
      y += rowH;
    });
    y += 4;
  });
  return svg(width, height, 'Comparison chart', lines.join('\n'));
}
