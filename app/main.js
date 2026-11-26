// Router and page wiring for NationScope (hash routes, no framework).
import { header, footer, dashboardView, countryView, compareView, rankingsView, indicatorsView, aboutView, notFoundView } from "./views.js";
import { countryByCode } from "./data.js";

const app = document.getElementById("app");

function render() {
  const hash = window.location.hash || "#/";
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  let html;
  let active = "home";
  if (parts.length === 0) {
    html = dashboardView();
  } else if (parts[0] === "country" && parts[1]) {
    html = countryView(parts[1].toUpperCase());
  } else if (parts[0] === "compare") {
    html = compareView(parts.slice(1).map((c) => c.toUpperCase()));
  } else if (parts[0] === "rankings") {
    active = "rankings";
    html = rankingsView(parts[1] || "gdp");
  } else if (parts[0] === "indicators") {
    active = "indicators";
    html = indicatorsView();
  } else if (parts[0] === "about") {
    active = "about";
    html = aboutView();
  } else {
    html = notFoundView();
  }
  app.innerHTML = header(active) + `<main>${html}</main>` + footer();
  window.scrollTo(0, 0);
  wirePage(parts);
}

function wirePage(parts) {
  const search = document.getElementById("country-search");
  if (search) {
    const grid = document.getElementById("country-grid");
    const empty = document.getElementById("search-empty");
    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      grid.querySelectorAll(".country-card").forEach((card) => {
        const match = !query || card.dataset.name.includes(query);
        card.style.display = match ? "" : "none";
        if (match) visible += 1;
      });
      empty.hidden = visible !== 0;
    });
  }
  const pickers = document.querySelectorAll("select[data-picker]");
  if (pickers.length) {
    pickers.forEach((select) => {
      select.addEventListener("change", () => {
        const codes = [...document.querySelectorAll("select[data-picker]")].map((s) => s.value);
        window.location.hash = `#/compare/${codes.join("/")}`;
      });
    });
  }
}

window.addEventListener("hashchange", render);
render();
