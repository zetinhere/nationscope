# NationScope — National statistics, explored

A static site that puts real national statistics in front of people: twelve
countries, eleven World Bank indicators, every figure dated, with rankings,
side-by-side comparisons, and 2015–2024 trends for population and GDP.

## The site

- **Dashboard** — biggest populations and economies, three findings from the
  numbers, and a searchable grid of all twelve countries.
- **Country profile** — eleven stat cards with each country's rank, plus
  population and GDP line charts for 2015–2024.
- **Compare** — pick any three countries; grouped bars and a full table where
  the highest of the three is highlighted in each row.
- **Rankings** — every indicator as a bar-scaled table, one click per indicator.
- **Indicators** — what each measure means, with its World Bank code.
- **About the data** — sources, method, and the gaps (Nigeria's exports share
  is not reported by the World Bank, so it reads "Not reported").

## Data

All 132 figures come from the World Bank's World Development Indicators,
fetched from the World Bank API on 26 November 2026 and stored with the site
in `app/data.js`. Each value carries its year; most are 2024. The site makes
no network request at runtime.

## Run it

```sh
node serve.ts --port 8080   # then open http://localhost:8080/
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with the kit's `buildDossier`. It is deterministic: two runs
write the same bytes.
