# nationscope

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/zetinhere/nationscope/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/zetinhere/nationscope/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NationScope is a national statistics explorer: twelve countries, eleven World Bank indicators for 2024, a decade of population and GDP charts, a three-country comparison tool and rankings for every indicator — all as static files that work offline.

## What's inside

- **Dashboard** — the twelve countries at a glance, the biggest populations and economies, a search box and three findings from the numbers.
- **Country profiles** — ten headline figures with ranks, a 2015–2024 population chart and a GDP chart for each country.
- **Compare** — pick any three countries and see their figures side by side, with grouped bar charts and a full table.
- **Rankings** — all twelve countries ordered by any of the eleven indicators.
- **Indicators** — what each series measures, with its World Bank code.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. No build step, no network requests at run time: the data lives in `app/data.js`, and every figure comes from the World Bank's World Development Indicators, 2024.

---

<sub>Entered on [make.fun](https://make.fun/?ref=jc69fpy6&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
