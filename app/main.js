// NationScope router: hash routes for the dashboard, one profile per
// country, the comparison tool, the rankings table, the indicator guide
// and about.
//
//   #/                     dashboard
//   #/country/<code>       one country's profile
//   #/compare/<a>/<b>/<c>  three countries side by side
//   #/rankings/<indicator> rankings table, re-ranked by indicator
//   #/indicators           what each indicator measures
//   #/about                sources and method
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { dashboard, country, compare, rankings, indicators, about, missing } from "./views.js";
import { COUNTRIES } from "./data.js";

const app = document.getElementById("app");

// Each route is [matches, title, render]. The first route whose match
// passes wins; the segments are the hash split on "/".
const ROUTES = [
  [
    (p) => p.length === 0,
    () => "NationScope — National Statistics Explorer",
    () => dashboard(),
  ],
  [
    (p) => p[0] === "country" && p[1],
    (p) => {
      const found = COUNTRIES.find((c) => c.code === p[1].toUpperCase());
      return `${found ? found.name : "Not found"} · NationScope`;
    },
    (p) => country(p[1].toUpperCase()),
  ],
  [
    (p) => p[0] === "compare",
    () => "Compare countries · NationScope",
    (p) => compare(p.slice(1)),
  ],
  [
    (p) => p[0] === "rankings",
    () => "Rankings · NationScope",
    (p) => rankings(p[1] || "pop"),
  ],
  [
    (p) => p[0] === "indicators",
    () => "Indicators, explained · NationScope",
    () => indicators(),
  ],
  [
    (p) => p[0] === "about",
    () => "About · NationScope",
    () => about(),
  ],
];

function render() {
  window.__shotReady = false;
  const parts = (location.hash || "#/").slice(2).split("/").filter(Boolean);
  const route = ROUTES.find(([matches]) => matches(parts));
  if (route) {
    const [, title, view] = route;
    document.title = title(parts);
    app.innerHTML = view(parts);
  } else {
    document.title = "Not found · NationScope";
    app.innerHTML = missing();
  }
  highlightNav(parts[0] || "");
  bindSearch();
  bindPickers();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function highlightNav(section) {
  document.querySelectorAll("header nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.section === section);
  });
}

// Dashboard search: filters the country cards as you type.
function bindSearch() {
  const input = document.getElementById("country-search");
  if (!input) return;
  const grid = document.getElementById("country-grid");
  const empty = document.getElementById("search-empty");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    grid.querySelectorAll(".country-card").forEach((card) => {
      const hit = !q || card.textContent.toLowerCase().includes(q);
      card.hidden = !hit;
      if (hit) visible += 1;
    });
    empty.hidden = visible !== 0;
  });
}

// Compare pickers: changing one reloads the comparison at the new address.
function bindPickers() {
  const pickers = document.getElementById("pickers");
  if (!pickers) return;
  pickers.querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", () => {
      const a = document.getElementById("pick-a").value;
      const b = document.getElementById("pick-b").value;
      const c = document.getElementById("pick-c").value;
      location.hash = `#/compare/${a}/${b}/${c}`;
    });
  });
}

window.addEventListener("hashchange", render);
render();
