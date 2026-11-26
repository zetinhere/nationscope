// Page views for NationScope. Each view returns an HTML string for #app.
import { COUNTRIES, INDICATORS, SOURCE_NAME, DATA_FETCHED, SERIES_YEARS, indicatorById, countryByCode, rankOf, sortedBy } from "./data.js";
import { formatValue, shortValue, shortCount, shortMoney } from "./format.js";
import { barChart, lineChart, groupedBars, escapeHtml } from "./charts.js";

export function header(active) {
  const link = (href, label, key) => `<a href="${href}" class="${active === key ? "nav-active" : ""}">${label}</a>`;
  return `<header class="site-header"><div class="wrap header-inner">
    <a class="brand" href="#/"><span class="brand-mark">N</span> NationScope</a>
    <nav class="site-nav">
      ${link("#/", "Countries", "home")}
      ${link("#/rankings/gdp", "Rankings", "rankings")}
      ${link("#/indicators", "Indicators", "indicators")}
      ${link("#/about", "About the data", "about")}
    </nav>
  </div></header>`;
}

export function footer() {
  return `<footer class="site-footer"><div class="wrap">
    <p>Figures: ${SOURCE_NAME}, fetched ${DATA_FETCHED}. Every figure on this site names its year.</p>
    <p>NationScope is an independent explorer built for looking up national statistics. It is not affiliated with the World Bank.</p>
  </div></footer>`;
}

function statCard(country, indicator) {
  const value = country.v[indicator.id];
  const rank = rankOf(country, indicator.id);
  const rankText = rank ? `#${rank} of 12` : "—";
  return `<a class="stat-card" href="#/rankings/${indicator.id}">
    <span class="stat-label">${escapeHtml(indicator.label)}</span>
    <span class="stat-value">${escapeHtml(formatValue(indicator, value))}</span>
    <span class="stat-meta">${rankText} · ${escapeHtml(country.y[indicator.id] ? String(country.y[indicator.id]) : "")}</span>
  </a>`;
}

function countryCard(country) {
  const pop = indicatorById("pop");
  const gdp = indicatorById("gdp");
  const gdpcap = indicatorById("gdpcap");
  return `<a class="country-card" href="#/country/${country.code}" data-name="${escapeHtml(country.name.toLowerCase())}">
    <span class="country-code">${escapeHtml(country.code)}</span>
    <span class="country-name">${escapeHtml(country.name)}</span>
    <span class="country-region">${escapeHtml(country.region)}</span>
    <span class="country-figures">
      <span><b>${escapeHtml(shortCount(country.v.pop))}</b> people</span>
      <span><b>${escapeHtml(shortMoney(country.v.gdp))}</b> GDP</span>
      <span><b>${escapeHtml(shortMoney(country.v.gdpcap))}</b> per person</span>
    </span>
  </a>`;
}

export function dashboardView() {
  const topPop = sortedBy("pop").slice(0, 5).map((c) => ({
    label: c.name, value: c.v.pop, display: shortCount(c.v.pop),
  }));
  const topGdp = sortedBy("gdp").slice(0, 5).map((c) => ({
    label: c.name, value: c.v.gdp, display: shortMoney(c.v.gdp),
  }));
  const popInd = indicatorById("pop");
  const gdpInd = indicatorById("gdp");
  const cards = COUNTRIES.map(countryCard).join("");
  return `
  <section class="hero"><div class="wrap">
    <p class="eyebrow">Twelve countries · Eleven indicators · One source</p>
    <h1>National statistics, explored.</h1>
    <p class="lede">Real figures for the world's biggest economies and populations — population, GDP, prices, jobs, health and more — from the World Bank, with every figure dated.</p>
    <p class="hero-stats"><span><b>12</b> countries</span><span><b>11</b> indicators</span><span><b>132</b> figures</span><span><b>2015–2024</b> trends</span></p>
  </div></section>
  <div class="wrap">
    <section class="chart-duo">
      <article class="panel"><h2>Biggest populations, 2024</h2>${barChart(topPop, popInd)}<p class="panel-note"><a href="#/rankings/pop">See the full population ranking →</a></p></article>
      <article class="panel"><h2>Biggest economies, 2024</h2>${barChart(topGdp, gdpInd)}<p class="panel-note"><a href="#/rankings/gdp">See the full GDP ranking →</a></p></article>
    </section>
    <section class="findings"><h2>Three things the numbers say</h2><ol>
      <li><b>India is now the most populous country.</b> At 1.45 billion people in 2024 it sits ahead of China (1.41 billion), whose population fell for a third straight year. <a href="#/country/IN">India's profile →</a></li>
      <li><b>Nigeria's prices rose 33% in a single year.</b> Inflation of 33.24% in 2024 dwarfs every other country here — the next highest, Brazil, is 4.37%. <a href="#/country/NG">Nigeria's profile →</a></li>
      <li><b>Life expectancy spans almost 30 years.</b> A newborn in Japan can expect 84.0 years; in Nigeria, 54.6. <a href="#/rankings/lifeexp">The life-expectancy ranking →</a></li>
    </ol></section>
    <section class="countries"><h2>All twelve countries</h2>
      <label class="search-label" for="country-search">Search countries</label>
      <input id="country-search" class="search" type="search" placeholder="Type a country name — try “Japan”" autocomplete="off">
      <p class="search-empty" id="search-empty" hidden>No country matches that search.</p>
      <div class="country-grid" id="country-grid">${cards}</div>
    </section>
  </div>`;
}

export function countryView(code) {
  const country = countryByCode(code);
  if (!country) return notFoundView();
  const cards = INDICATORS.map((ind) => statCard(country, ind)).join("");
  const popInd = indicatorById("pop");
  const gdpInd = indicatorById("gdp");
  const others = COUNTRIES.filter((c) => c.code !== country.code).slice(0, 2);
  const compareHref = `#/compare/${country.code}/${others[0].code}/${others[1].code}`;
  return `<div class="wrap">
    <p class="crumbs"><a href="#/">Countries</a> / ${escapeHtml(country.name)}</p>
    <section class="country-head">
      <span class="country-code big">${escapeHtml(country.code)}</span>
      <div><h1>${escapeHtml(country.name)}</h1><p class="lede">${escapeHtml(country.region)} · All figures ${escapeHtml(SOURCE_NAME)}.</p></div>
    </section>
    <section class="stat-grid">${cards}</section>
    <section class="chart-duo">
      <article class="panel"><h2>Population, 2015–2024</h2>${lineChart(country.popSeries, SERIES_YEARS, "Population")}<p class="panel-note">${escapeHtml(shortCount(country.v.pop))} people in 2024, up from ${escapeHtml(shortCount(country.popSeries[0]))} in 2015.</p></article>
      <article class="panel"><h2>GDP, 2015–2024</h2>${lineChart(country.gdpSeries, SERIES_YEARS, "GDP")}<p class="panel-note">${escapeHtml(shortMoney(country.v.gdp))} in 2024, from ${escapeHtml(shortMoney(country.gdpSeries[0]))} in 2015.</p></article>
    </section>
    <section class="keep-exploring"><h2>Keep exploring</h2>
      <p><a href="${compareHref}">Compare ${escapeHtml(country.name)} with ${escapeHtml(others[0].name)} and ${escapeHtml(others[1].name)} →</a></p>
      <p><a href="#/rankings/gdpcap">Where does ${escapeHtml(country.name)} rank on GDP per person? →</a></p>
      <p><a href="#/indicators">What each indicator measures →</a></p>
    </section>
  </div>`;
}

const COMPARE_IDS = ["pop", "gdp", "gdpcap", "lifeexp", "internet"];

export function compareView(codes) {
  const picked = codes.map(countryByCode).filter(Boolean);
  const unique = [...new Map(picked.map((c) => [c.code, c])).values()];
  while (unique.length < 3) {
    const next = COUNTRIES.find((c) => !unique.includes(c));
    unique.push(next);
  }
  const three = unique.slice(0, 3);
  const option = (selected) => COUNTRIES.map((c) =>
    `<option value="${c.code}"${c.code === selected ? " selected" : ""}>${escapeHtml(c.name)}</option>`).join("");
  const pickers = three.map((c, i) =>
    `<label class="picker">Country ${i + 1}<select data-picker="${i}">${option(c.code)}</select></label>`).join("");
  const chart = groupedBars(COMPARE_IDS.map((id) => ({ id })), three, indicatorById);
  const rows = INDICATORS.map((ind) => {
    const vals = three.map((c) => c.v[ind.id]);
    const best = Math.max(...vals.filter((v) => v !== null && v !== undefined));
    const cells = three.map((c) => {
      const v = c.v[ind.id];
      const isBest = v !== null && v !== undefined && v === best && vals.filter((x) => x === best).length === 1;
      return `<td class="${isBest ? "best" : ""}">${escapeHtml(shortValue(ind, v))}${v !== null && v !== undefined && c.y[ind.id] ? ` <span class="yr">${c.y[ind.id]}</span>` : ""}</td>`;
    }).join("");
    return `<tr><th scope="row">${escapeHtml(ind.label)} <span class="unit">${escapeHtml(ind.unit)}</span></th>${cells}</tr>`;
  }).join("");
  const headCells = three.map((c) => `<th scope="col">${escapeHtml(c.name)}</th>`).join("");
  return `<div class="wrap">
    <p class="crumbs"><a href="#/">Countries</a> / Compare</p>
    <h1>Compare three countries</h1>
    <p class="lede">Pick any three countries. The gold cell in each row is the highest of the three.</p>
    <div class="pickers">${pickers}</div>
    <section class="panel"><h2>At a glance</h2>${chart}</section>
    <section class="panel"><h2>Every indicator, side by side</h2>
      <div class="table-scroll"><table class="data-table"><thead><tr><th scope="col">Indicator</th>${headCells}</tr></thead><tbody>${rows}</tbody></table></div>
      <p class="panel-note">“Not reported” means the World Bank publishes no value for that country and indicator — Nigeria's exports share is one such gap.</p>
    </section>
  </div>`;
}

export function rankingsView(indicatorId) {
  const indicator = indicatorById(indicatorId);
  const rows = sortedBy(indicator.id);
  const max = Math.max(...rows.map((c) => c.v[indicator.id]));
  const pills = INDICATORS.map((ind) =>
    `<a href="#/rankings/${ind.id}" class="pill${ind.id === indicator.id ? " pill-active" : ""}">${escapeHtml(ind.label)}</a>`).join("");
  const body = rows.map((c, i) => {
    const value = c.v[indicator.id];
    const barW = Math.round((value / max) * 100);
    return `<tr>
      <td class="rank-cell">${i + 1}</td>
      <td><a href="#/country/${c.code}">${escapeHtml(c.name)}</a></td>
      <td class="bar-cell"><span class="bar-track"><span class="bar-fill" style="width:${barW}%"></span></span></td>
      <td class="value-cell">${escapeHtml(shortValue(indicator, value))}</td>
      <td class="yr">${c.y[indicator.id] || ""}</td>
    </tr>`;
  }).join("");
  return `<div class="wrap">
    <p class="crumbs"><a href="#/">Countries</a> / Rankings</p>
    <h1>Rankings: ${escapeHtml(indicator.label)}</h1>
    <p class="lede">${escapeHtml(indicator.blurb)}</p>
    <div class="pills">${pills}</div>
    <section class="panel"><div class="table-scroll"><table class="data-table rankings-table">
      <thead><tr><th scope="col">#</th><th scope="col">Country</th><th scope="col"></th><th scope="col">Value</th><th scope="col" class="yr">Year</th></tr></thead>
      <tbody>${body}</tbody>
    </table></div>
    <p class="panel-note">Source: ${escapeHtml(SOURCE_NAME)} (${escapeHtml(indicator.code)}), fetched ${escapeHtml(DATA_FETCHED)}.</p></section>
  </div>`;
}

export function indicatorsView() {
  const items = INDICATORS.map((ind) => `<article class="indicator-card">
    <h2>${escapeHtml(ind.label)}</h2>
    <p class="indicator-meta">${escapeHtml(ind.unit)} · World Bank code <code>${escapeHtml(ind.code)}</code></p>
    <p>${escapeHtml(ind.blurb)}</p>
    <p><a href="#/rankings/${ind.id}">See the ranking →</a></p>
  </article>`).join("");
  return `<div class="wrap">
    <p class="crumbs"><a href="#/">Countries</a> / Indicators</p>
    <h1>What each indicator measures</h1>
    <p class="lede">Eleven indicators from the World Bank's World Development Indicators — the same dataset national statistics offices report to.</p>
    <div class="indicator-grid">${items}</div>
  </div>`;
}

export function aboutView() {
  return `<div class="wrap narrow">
    <p class="crumbs"><a href="#/">Countries</a> / About</p>
    <h1>About the data</h1>
    <h2>Where the figures come from</h2>
    <p>Every figure on NationScope comes from the World Bank's World Development Indicators, the dataset behind most national statistics reporting. The figures were fetched from the World Bank API on ${escapeHtml(DATA_FETCHED)} and are stored with the site, so every page works with no network request.</p>
    <h2>How to read a figure</h2>
    <p>Each figure names its year. Most are 2024, the latest year the World Bank has published for these indicators. Government education spending is reported more slowly, so its latest year varies by country (2021–2023) and is shown next to each value.</p>
    <h2>What is missing, and why</h2>
    <p>Nigeria has no reported exports share of GDP in the World Bank dataset, so that cell reads “Not reported” rather than guessing. Unemployment figures are the ILO's modelled estimates, which is why they are comparable across countries with different survey methods.</p>
    <h2>Limits</h2>
    <p>Twelve countries cannot cover the world. These are the twelve largest by population and economy among the countries the site tracks, chosen so the comparisons are between peers of a similar scale. Figures are as the World Bank publishes them; they are revised by the Bank from time to time.</p>
    <p><a href="#/">Back to the countries →</a></p>
  </div>`;
}

export function notFoundView() {
  return `<div class="wrap narrow">
    <h1>That page is not here</h1>
    <p class="lede">The country or page you asked for does not exist on NationScope.</p>
    <p><a href="#/">Back to the twelve countries →</a></p>
  </div>`;
}
