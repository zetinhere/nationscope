// The pages of NationScope: dashboard, one profile per country, the
// comparison tool, the rankings table, the indicator guide and about. Every
// page is a string of HTML built from the data in data.js; nothing is
// fetched from anywhere else.

import { COUNTRIES, INDICATORS, DATA_YEAR, WORLD_POPULATION_2024, byCode, density, rankOf, sortedBy } from './data.js';
import { fmtInt, fmtMoney, fmtMoneyShort, fmtPop, fmtPopShort, fmtSigned, fmtValue, escapeHtml } from './format.js';
import { barChart, lineChart, groupedBars } from './charts.js';

const SOURCE = `Source: World Bank, World Development Indicators, ${DATA_YEAR}.`;

function ordinal(n) {
  return `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`;
}

// A headline figure: label on top, the number big, a note underneath.
function stat(label, value, sub) {
  return `<div class="stat"><span class="stat-label">${escapeHtml(label)}</span><span class="stat-value">${escapeHtml(value)}</span><span class="stat-sub">${escapeHtml(sub)}</span></div>`;
}

function rankNote(country, key, what) {
  return `${ordinal(rankOf(country, key))} of 12 in ${what}`;
}

// Short forms for chart labels, where the full wording would not fit.
function chartValue(key, value) {
  if (key === 'pop') return fmtPopShort(value);
  if (key === 'gdp') return fmtMoneyShort(value);
  if (key === 'gdppc') return `$${fmtInt(value)}`;
  return fmtValue(key, value);
}

function countryCard(c) {
  return `<article class="country-card">
<a href="#/country/${c.code}" class="country-link">
<span class="country-name">${escapeHtml(c.name)}</span>
<span class="country-region">${escapeHtml(c.region)} &middot; capital ${escapeHtml(c.capital)}</span>
<span class="country-figures"><strong>${fmtPop(c.pop)}</strong> people &middot; <strong>${fmtMoney(c.gdp)}</strong> GDP</span>
<span class="country-blurb">${escapeHtml(c.blurb)}</span>
<span class="country-more">See the full profile &rarr;</span>
</a></article>`;
}

// ---- Dashboard ------------------------------------------------------------

export function dashboard() {
  const totalPop = COUNTRIES.reduce((s, c) => s + c.pop, 0);
  const totalGdp = COUNTRIES.reduce((s, c) => s + c.gdp, 0);
  const share = ((totalPop / WORLD_POPULATION_2024) * 100).toFixed(0);
  const byPop = sortedBy('pop').slice(0, 5);
  const byGdp = sortedBy('gdp').slice(0, 5);
  const longestLived = sortedBy('life')[0];
  const fastestGrowing = sortedBy('growth')[0];
  const richest = sortedBy('gdppc')[0];

  const heroStats = [
    ['People in this atlas', fmtPop(totalPop), `${share}% of the world’s 8.2 billion`],
    ['Combined GDP', fmtMoney(totalGdp), `Current US$, ${DATA_YEAR}`],
    ['Longest-lived', longestLived.name, fmtValue('life', longestLived.life)],
    ['Fastest-growing economy', fastestGrowing.name, `${fmtValue('growth', fastestGrowing.growth)} GDP growth`],
    ['Richest per person', richest.name, fmtValue('gdppc', richest.gdppc)],
  ].map(([label, value, sub]) => stat(label, value, sub)).join('\n');

  return `<section class="hero">
<h1>The world in numbers</h1>
<p class="lede">Twelve countries, eleven headline indicators, one decade of change. Every figure comes from the World Bank’s World Development Indicators for ${DATA_YEAR}, with its source and year shown beside it.</p>
<div class="hero-stats">
${heroStats}
</div>
</section>

<section class="panel">
<h2>Biggest populations, ${DATA_YEAR}</h2>
${barChart(byPop.map((c) => ({ label: c.name, value: c.pop, display: fmtPopShort(c.pop) })))}
<p class="note">India passed China as the world’s most populous country in 2023 and keeps pulling away. ${SOURCE}</p>
</section>

<section class="panel">
<h2>Biggest economies, ${DATA_YEAR}</h2>
${barChart(byGdp.map((c) => ({ label: c.name, value: c.gdp, display: fmtMoneyShort(c.gdp) })))}
<p class="note">The United States is larger than the next three economies in this atlas combined. <a href="#/rankings/gdp">See the full GDP ranking &rarr;</a> ${SOURCE}</p>
</section>

<section class="panel">
<h2>Find a country</h2>
<label class="search-label" for="country-search">Search the twelve countries</label>
<input id="country-search" type="search" placeholder="Type a name, region or capital&hellip;" autocomplete="off">
<div class="country-grid" id="country-grid">
${COUNTRIES.map(countryCard).join('\n')}
</div>
<p class="note" id="search-empty" hidden>No country matches that search. Try a region such as Europe or Asia.</p>
</section>

<section class="panel">
<h2>Three things the numbers say</h2>
<ol class="findings">
<li><strong>Ageing against youth.</strong> Japan has the oldest population here (29.8% aged 65+); Nigeria the youngest (3.1%). South Korea’s fertility, 0.75 children per woman, is the lowest ever recorded for a large country.</li>
<li><strong>Growth has moved south and east.</strong> India grew 7.1% and Indonesia 5.0% in ${DATA_YEAR}; Germany shrank 0.5% and Japan 0.2%.</li>
<li><strong>Being connected is now normal almost everywhere.</strong> Internet use tops 90% in South Korea, the United Kingdom, the United States and Germany &mdash; and is still under half the population in Nigeria.</li>
</ol>
<p class="note"><a href="#/compare">Compare any three countries side by side &rarr;</a></p>
</section>`;
}

// ---- Country profile ------------------------------------------------------

export function country(code) {
  const c = byCode(code);
  if (!c) return missing();
  const popChange = ((c.popSeries[9] / c.popSeries[0] - 1) * 100).toFixed(1);
  const gdpChange = ((c.gdpSeries[9] / c.gdpSeries[0] - 1) * 100).toFixed(0);
  const popGrew = c.popSeries[9] >= c.popSeries[0];
  const gdpGrew = c.gdpSeries[9] >= c.gdpSeries[0];
  const others = COUNTRIES.filter((o) => o.code !== c.code).slice(0, 5);

  const figures = [
    ['Population', fmtPop(c.pop), rankNote(c, 'pop', 'population')],
    ['GDP', fmtMoney(c.gdp), rankNote(c, 'gdp', 'GDP')],
    ['GDP per person', fmtValue('gdppc', c.gdppc), rankNote(c, 'gdppc', 'GDP per person')],
    ['GDP growth', fmtValue('growth', c.growth), rankNote(c, 'growth', 'growth')],
    ['Life expectancy', fmtValue('life', c.life), rankNote(c, 'life', 'life expectancy')],
    ['Urban population', fmtValue('urban', c.urban), rankNote(c, 'urban', 'urban share')],
    ['Unemployment', fmtValue('unemp', c.unemp), rankNote(c, 'unemp', 'unemployment')],
    ['Fertility rate', fmtValue('fert', c.fert), rankNote(c, 'fert', 'fertility')],
    ['Internet users', fmtValue('internet', c.internet), rankNote(c, 'internet', 'internet use')],
    ['Aged 65 and over', fmtValue('age65', c.age65), rankNote(c, 'age65', 'share aged 65+')],
  ].map(([label, value, sub]) => stat(label, value, sub)).join('\n');

  return `<p class="crumbs"><a href="#/">&larr; All countries</a> &middot; <a href="#/rankings/pop">Rankings</a> &middot; <a href="#/compare/${c.code}">Compare ${escapeHtml(c.name)}</a></p>
<header class="country-head">
<h1>${escapeHtml(c.name)}</h1>
<p class="lede">${escapeHtml(c.blurb)}</p>
<p class="facts"><strong>Capital:</strong> ${escapeHtml(c.capital)} &middot; <strong>Region:</strong> ${escapeHtml(c.region)} &middot; <strong>Currency:</strong> ${escapeHtml(c.currency)} &middot; <strong>Land area:</strong> ${fmtValue('area', c.area)} &middot; <strong>Density:</strong> ${fmtInt(density(c))} people per km&sup2;</p>
</header>

<section class="panel">
<h2>Headline figures, ${DATA_YEAR}</h2>
<div class="stat-grid">
${figures}
</div>
<p class="note">${SOURCE} Ranks are among the twelve countries in this atlas.</p>
</section>

<section class="panel">
<h2>Population, 2015&ndash;${DATA_YEAR}</h2>
${lineChart(c.popSeries, { color: '#0b5cad', unit: 'M' })}
<p class="note">${escapeHtml(c.name)}’s population ${popGrew ? 'grew' : 'fell'} ${Math.abs(popChange)}% over the decade, from ${c.popSeries[0].toFixed(1)} million in 2015 to ${c.popSeries[9].toFixed(1)} million in ${DATA_YEAR}. ${SOURCE}</p>
</section>

<section class="panel">
<h2>GDP, 2015&ndash;${DATA_YEAR} (US$ billions)</h2>
${lineChart(c.gdpSeries, { color: '#0e7a5f', unit: '' })}
<p class="note">GDP ${gdpGrew ? 'rose' : 'fell'} ${Math.abs(gdpChange)}% in current dollars over the decade, from $${fmtInt(c.gdpSeries[0])} billion in 2015 to $${fmtInt(c.gdpSeries[9])} billion in ${DATA_YEAR}. The 2020 dip is the pandemic year. ${SOURCE}</p>
</section>

<section class="panel">
<h2>Keep exploring</h2>
<p>Compare ${escapeHtml(c.name)} with two others on every indicator: <a href="#/compare/${c.code}">open the comparison tool &rarr;</a></p>
<p>Or browse another country:</p>
<ul class="inline-links">${others.map((o) => `<li><a href="#/country/${o.code}">${escapeHtml(o.name)}</a></li>`).join('')}</ul>
</section>`;
}

// ---- Compare --------------------------------------------------------------

function picker(id, selected, label) {
  const options = COUNTRIES.map(
    (c) => `<option value="${c.code}"${c.code === selected ? ' selected' : ''}>${escapeHtml(c.name)}</option>`,
  ).join('');
  return `<label class="picker"><span>${escapeHtml(label)}</span><select id="${id}">${options}</select></label>`;
}

export function compare(codes) {
  const picked = [];
  for (const code of codes) {
    const c = byCode(code);
    if (c && !picked.includes(c)) picked.push(c);
  }
  while (picked.length < 3) picked.push(COUNTRIES.find((c) => !picked.includes(c)));
  const [a, b, c] = picked;

  const glance = [
    { label: 'Population', key: 'pop', short: true },
    { label: 'GDP', key: 'gdp', short: true },
    { label: 'GDP per person', key: 'gdppc', short: true },
    { label: 'Life expectancy', key: 'life', short: false },
  ].map((g) => ({
    label: g.label,
    values: picked.map((country) => ({
      name: country.name,
      value: country[g.key],
      display: g.short ? chartValue(g.key, country[g.key]) : fmtValue(g.key, country[g.key]),
    })),
  }));

  const keys = ['pop', 'gdp', 'gdppc', 'growth', 'life', 'urban', 'unemp', 'fert', 'internet', 'age65', 'area'];
  const rows = keys.map((key) => {
    const ind = INDICATORS.find((i) => i.key === key);
    const cells = picked.map((country) => `<td>${fmtValue(key, country[key])}</td>`).join('');
    const best = picked.reduce((top, country) => (country[key] > top[key] ? country : top), picked[0]);
    const marks = picked.map((country) => `<td>${country.code === best.code ? '<strong>Highest</strong>' : '&mdash;'}</td>`).join('');
    return `<tr><th scope="row">${escapeHtml(ind.label)} <span class="unit">(${escapeHtml(ind.unit)})</span></th>${cells}</tr>\n<tr class="best-row"><th scope="row"><span class="unit">Highest of the three</span></th>${marks}</tr>`;
  }).join('\n');

  return `<h1>Compare countries</h1>
<p class="lede">Pick any three countries and put their headline figures side by side. Bars are scaled within each indicator, so unlike units never mix.</p>
<section class="panel">
<div class="pickers" id="pickers">
${picker('pick-a', a.code, 'First country')}
${picker('pick-b', b.code, 'Second country')}
${picker('pick-c', c.code, 'Third country')}
</div>
<p class="note">Changing a picker reloads the comparison. <a href="#/country/${a.code}">Profile: ${escapeHtml(a.name)}</a> &middot; <a href="#/country/${b.code}">${escapeHtml(b.name)}</a> &middot; <a href="#/country/${c.code}">${escapeHtml(c.name)}</a></p>
</section>
<section class="panel">
<h2>At a glance</h2>
${groupedBars(glance)}
</section>
<section class="panel">
<h2>Every headline figure</h2>
<table class="compare-table">
<thead><tr><th scope="col">Indicator</th>${picked.map((country) => `<th scope="col"><a href="#/country/${country.code}">${escapeHtml(country.name)}</a></th>`).join('')}</tr></thead>
<tbody>${rows}</tbody>
</table>
<p class="note">${SOURCE} Density and ranks are on each country’s profile page.</p>
</section>`;
}

// ---- Rankings -------------------------------------------------------------

export function rankings(key) {
  const ind = INDICATORS.find((i) => i.key === key) || INDICATORS[0];
  const rows = sortedBy(ind.key);
  const leader = rows[0][ind.key];
  const pills = INDICATORS.map(
    (i) => `<li><a href="#/rankings/${i.key}"${i.key === ind.key ? ' class="active" aria-current="true"' : ''}>${escapeHtml(i.label)}</a></li>`,
  ).join('');
  const tableRows = rows.map((c, i) =>
    `<tr><td>${i + 1}</td><td><a href="#/country/${c.code}">${escapeHtml(c.name)}</a></td><td>${fmtValue(ind.key, c[ind.key])}</td><td class="bar-cell"><span class="mini-bar" style="width:${((c[ind.key] / leader) * 100).toFixed(1)}%"></span></td></tr>`,
  ).join('\n');
  return `<h1>Rankings</h1>
<p class="lede">All twelve countries, ordered by one indicator at a time. Pick an indicator to re-rank the table.</p>
<ul class="pills">${pills}</ul>
<section class="panel">
<h2>${escapeHtml(ind.label)} &mdash; ${escapeHtml(ind.unit)}, ${DATA_YEAR}</h2>
<p>${escapeHtml(ind.about)}</p>
<table class="rank-table">
<thead><tr><th scope="col">Rank</th><th scope="col">Country</th><th scope="col">Value</th><th scope="col"><span class="visually-hidden">Share of the leader</span></th></tr></thead>
<tbody>${tableRows}</tbody>
</table>
<p class="note">${SOURCE} World Bank code ${escapeHtml(ind.code)}. Rankings cover only the twelve countries in this atlas, not the whole world.</p>
</section>`;
}

// ---- Indicators -----------------------------------------------------------

export function indicators() {
  const cards = INDICATORS.map(
    (i) => `<article class="indicator-card">
<h2>${escapeHtml(i.label)}</h2>
<p class="indicator-meta">${escapeHtml(i.unit)} &middot; World Bank code ${escapeHtml(i.code)}</p>
<p>${escapeHtml(i.about)}</p>
<p><a href="#/rankings/${i.key}">Rank the twelve countries by ${escapeHtml(i.label.toLowerCase())} &rarr;</a></p>
</article>`,
  ).join('\n');
  return `<h1>Indicators, explained</h1>
<p class="lede">Eleven headline indicators, each with what it measures, how it is counted, and its World Bank code so you can check the original series. All figures in this atlas are the ${DATA_YEAR} values of these series.</p>
<div class="indicator-grid">${cards}</div>
<p class="note">A note on honesty: unemployment misses informal work, urban shares use each country’s own definition, and the internet series was revised in 2023, which is why some countries jump between years. The numbers are the World Bank’s as published; the caveats are ours.</p>`;
}

// ---- About ----------------------------------------------------------------

export function about() {
  return `<h1>About NationScope</h1>
<p class="lede">NationScope is a small, independent atlas of national statistics: twelve countries, eleven headline indicators, and a decade of population and GDP history for each &mdash; with every figure sourced and dated.</p>
<section class="panel">
<h2>What it covers</h2>
<ul>
<li><strong>Twelve countries:</strong> India, China, the United States, Indonesia, Brazil, Japan, Germany, the United Kingdom, France, South Korea, Australia and Nigeria &mdash; together home to just over half of humanity.</li>
<li><strong>Eleven indicators:</strong> population, GDP, GDP per person, GDP growth, life expectancy, urban share, unemployment, fertility, internet use, share aged 65+, and land area.</li>
<li><strong>A decade of change:</strong> population and GDP series from 2015 to ${DATA_YEAR} for every country, drawn as charts on each profile.</li>
</ul>
</section>
<section class="panel">
<h2>Sources and method</h2>
<p>Every figure comes from the World Bank’s World Development Indicators, downloaded on 26 November 2026. The indicator codes are listed on the <a href="#/indicators">indicators page</a>, and the source and year sit beside every figure. World population for context is about 8.2 billion in ${DATA_YEAR} (UN World Population Prospects 2024).</p>
<p>Nothing on this site is fetched from another server: the data, the charts and the styles all live in the site’s own files, so it works offline and loads fast. Figures are shown as published; where the World Bank revised a series, the revised value is used and the break is noted.</p>
</section>
<section class="panel">
<h2>What it is not</h2>
<p>NationScope is not an official statistics office and it covers twelve countries, not the world. Ranks are among those twelve only. For a country’s own official numbers, its national statistics office is the authority; for the global series behind these figures, the World Bank’s databank is.</p>
</section>
<section class="panel">
<h2>Built how</h2>
<p>A static site: one HTML page, a stylesheet, and small JavaScript modules that draw the charts and switch pages by address. No framework, no tracking, no cookies, no network requests at run time.</p>
</section>`;
}

export function missing() {
  return `<h1>Not found</h1>
<p>There is no page at this address. Try the <a href="#/">dashboard</a>, the <a href="#/rankings/pop">rankings</a>, or a country profile such as <a href="#/country/ID">Indonesia</a>.</p>`;
}
