// NationScope — the numbers.
//
// Twelve countries, eleven headline indicators, every figure from the World
// Bank's World Development Indicators (WDI) as published for 2024, pulled on
// 26 November 2026. The two decade series run 2015-2024: population in
// millions of people, GDP in billions of current US dollars. Headline
// populations are people; headline GDP is current US dollars.
//
// World Bank series used: SP.POP.TOTL, NY.GDP.MKTP.CD, NY.GDP.PCAP.CD,
// NY.GDP.MKTP.KD.ZG, SP.DYN.LE00.IN, SP.URB.TOTL.IN.ZS, SL.UEM.TOTL.ZS,
// SP.DYN.TFRT.IN, IT.NET.USER.ZS, SP.POP.65UP.TO.ZS, AG.SRF.TOTL.K2.
// World population 2024 is about 8.2 billion (UN World Population
// Prospects 2024).

export const DATA_YEAR = 2024;
export const WORLD_POPULATION_2024 = 8200000000;

// One row per country. Columns, in order:
//   0 code, 1 name, 2 region, 3 capital, 4 currency, 5 one-line portrait,
//   6 population, 7 GDP (US$), 8 GDP per person (US$), 9 life expectancy (yrs),
//   10 urban share (%), 11 unemployment (%), 12 fertility (children/woman),
//   13 internet users (%), 14 land area (sq km), 15 aged 65+ (%),
//   16 GDP growth (%/yr), 17 population 2015-2024 (millions),
//   18 GDP 2015-2024 (US$ billions).
const ROWS = [
  ['IN', 'India', 'South Asia', 'New Delhi', 'Indian rupee (INR)',
   'The world’s most populous country since 2023, and its fastest-growing large economy in 2024.',
   1450935791, 3760813470501, 2592, 72.2, 35.4, 4.2, 1.96, 64.9, 3287263, 7.2, 7.1,
   [1328.0, 1343.9, 1359.7, 1374.7, 1389.0, 1402.6, 1414.2, 1425.4, 1438.1, 1450.9],
   [2104, 2295, 2651, 2703, 2836, 2675, 3167, 3250, 3501, 3761]],
  ['CN', 'China', 'East Asia', 'Beijing', 'Chinese yuan (CNY)',
   'The world’s second-largest economy and its biggest manufacturer, with a population that has begun to shrink.',
   1408975000, 18729668435848, 13293, 78.0, 65.9, 4.6, 1.01, 92.0, 9562910, 14.7, 5.0,
   [1380.0, 1387.8, 1396.2, 1402.8, 1407.7, 1411.1, 1412.4, 1412.2, 1410.7, 1409.0],
   [11281, 11456, 12538, 14148, 14560, 14996, 18202, 18317, 18270, 18730]],
  ['US', 'United States', 'North America', 'Washington, D.C.', 'US dollar (USD)',
   'The world’s largest economy by a wide margin, and the richest large country per person in this atlas.',
   340003797, 29298013000000, 86170, 78.9, 80.1, 4.0, 1.63, 94.7, 9831510, 17.9, 2.8,
   [321.8, 324.4, 326.6, 328.5, 330.2, 331.6, 332.1, 334.0, 336.8, 340.0],
   [18295, 18805, 19612, 20657, 21540, 21375, 23726, 26055, 27812, 29298]],
  ['ID', 'Indonesia', 'Southeast Asia', 'Jakarta', 'Indonesian rupiah (IDR)',
   'The world’s fourth-largest country by people and its largest island nation, growing at about 5% a year.',
   283487931, 1396301788462, 4925, 71.3, 58.8, 3.3, 2.12, 72.8, 1916907, 7.3, 5.0,
   [261.8, 264.6, 267.3, 270.0, 272.5, 274.8, 276.8, 278.8, 281.2, 283.5],
   [861, 932, 1016, 1042, 1119, 1059, 1187, 1319, 1371, 1396]],
  ['BR', 'Brazil', 'South America', 'Brasília', 'Brazilian real (BRL)',
   'South America’s giant: the most urbanised country in this atlas after Japan, and a farming and energy exporter.',
   211998573, 2185821610689, 10311, 76.0, 87.9, 6.8, 1.61, 84.5, 8510420, 11.1, 3.4,
   [201.7, 203.2, 204.7, 206.1, 207.5, 208.7, 209.6, 210.3, 211.1, 212.0],
   [1802, 1796, 2064, 1917, 1873, 1476, 1671, 1952, 2191, 2186]],
  ['JP', 'Japan', 'East Asia', 'Tokyo', 'Japanese yen (JPY)',
   'The longest-lived people on earth and the oldest population in this atlas: nearly 3 in 10 residents are 65 or older.',
   123975371, 4190008188359, 33797, 84.0, 92.2, 2.5, 1.15, 85.5, 377975, 29.8, -0.2,
   [127.1, 127.1, 127.0, 126.8, 126.6, 126.3, 125.7, 125.1, 124.5, 124.0],
   [4534, 5110, 5038, 5154, 5246, 5189, 5226, 4448, 4385, 4190]],
  ['DE', 'Germany', 'Western Europe', 'Berlin', 'Euro (EUR)',
   'Europe’s largest economy, built on manufacturing and exports, with one of the world’s oldest populations.',
   83516593, 4685592577805, 56104, 80.8, 82.0, 3.4, 1.36, 93.5, 357680, 23.2, -0.5,
   [81.7, 82.3, 82.7, 82.9, 83.1, 83.2, 83.2, 83.2, 83.3, 83.5],
   [3425, 3537, 3765, 4055, 3960, 3941, 4355, 4201, 4562, 4686]],
  ['GB', 'United Kingdom', 'Northern Europe', 'London', 'Pound sterling (GBP)',
   'A services-led economy centred on London, with the highest internet use in this atlas after South Korea.',
   69281000, 3695539513534, 53341, 81.4, 83.2, 4.4, 1.55, 95.5, 243610, 19.5, 1.1,
   [65.1, 65.6, 66.0, 66.3, 66.6, 66.7, 67.0, 67.6, 68.5, 69.3],
   [2946, 2707, 2699, 2897, 2876, 2724, 3195, 3181, 3421, 3696]],
  ['FR', 'France', 'Western Europe', 'Paris', 'Euro (EUR)',
   'Europe’s second-largest economy, with the highest fertility in Western Europe and a long-lived population.',
   68551653, 3160442622465, 46103, 83.0, 78.8, 7.4, 1.61, 88.7, 606410, 22.2, 1.2,
   [66.5, 66.7, 66.9, 67.2, 67.4, 67.6, 67.8, 68.2, 68.4, 68.6],
   [2442, 2470, 2589, 2782, 2723, 2648, 2966, 2795, 3056, 3160]],
  ['KR', 'South Korea', 'East Asia', 'Seoul', 'South Korean won (KRW)',
   'The most connected country in this atlas and the lowest fertility on earth: 0.75 children per woman in 2024.',
   51751065, 1875388209407, 36239, 83.6, 81.2, 2.8, 0.75, 97.9, 100460, 19.3, 2.0,
   [51.0, 51.2, 51.4, 51.6, 51.8, 51.8, 51.8, 51.7, 51.7, 51.8],
   [1539, 1579, 1710, 1824, 1751, 1744, 1942, 1799, 1845, 1875]],
  ['AU', 'Australia', 'Oceania', 'Canberra', 'Australian dollar (AUD)',
   'A continent-sized country with only 27 million people, and the second-highest income per person in this atlas.',
   27194286, 1757022451653, 64610, 83.1, 87.6, 3.9, 1.48, 96.1, 7741220, 17.7, 1.4,
   [23.8, 24.2, 24.6, 25.0, 25.3, 25.6, 25.7, 26.0, 26.7, 27.2],
   [1357, 1212, 1331, 1433, 1398, 1333, 1561, 1696, 1734, 1757]],
  ['NG', 'Nigeria', 'West Africa', 'Abuja', 'Nigerian naira (NGN)',
   'Africa’s most populous country and its youngest: the highest fertility and the lowest life expectancy in this atlas.',
   232679478, 252261880140, 1084, 54.6, 63.0, 3.0, 4.38, 41.2, 923768, 3.1, 4.1,
   [190.7, 195.4, 200.3, 204.9, 209.5, 214.0, 218.5, 223.2, 227.9, 232.7],
   [493, 405, 376, 422, 668, 599, 609, 647, 487, 252]],
];

const KEYS = ['code', 'name', 'region', 'capital', 'currency', 'blurb', 'pop', 'gdp',
  'gdppc', 'life', 'urban', 'unemp', 'fert', 'internet', 'area', 'age65', 'growth',
  'popSeries', 'gdpSeries'];

export const COUNTRIES = ROWS.map((row) => Object.fromEntries(KEYS.map((k, i) => [k, row[i]])));

// One row per indicator: key, display label, unit, World Bank code, plain-language
// explanation of what the series measures. Shown on the Indicators page and in
// the source line under each figure.
const INDICATOR_ROWS = [
  ['pop', 'Population', 'people', 'SP.POP.TOTL',
   'All residents of the country at mid-year, regardless of citizenship. The World Bank builds it from censuses, civil registration and the UN’s population estimates.'],
  ['gdp', 'GDP', 'current US$', 'NY.GDP.MKTP.CD',
   'Gross domestic product at market prices: the value of everything produced inside the country in a year, converted to US dollars at the market exchange rate.'],
  ['gdppc', 'GDP per person', 'current US$', 'NY.GDP.PCAP.CD',
   'GDP divided by the mid-year population. A rough gauge of average income, not of how that income is shared.'],
  ['growth', 'GDP growth', '% per year', 'NY.GDP.MKTP.KD.ZG',
   'How much the economy grew in real terms, after stripping out price rises. A negative number means the economy shrank that year.'],
  ['life', 'Life expectancy', 'years', 'SP.DYN.LE00.IN',
   'How long a newborn would live if death rates at each age stayed as they are today. It summarises health, nutrition and medical care in one number.'],
  ['urban', 'Urban population', '% of total', 'SP.URB.TOTL.IN.ZS',
   'The share of people living in places each country’s own statistics office counts as urban. Definitions differ, so small gaps between countries mean little.'],
  ['unemp', 'Unemployment', '% of labour force', 'SL.UEM.TOTL.ZS',
   'People without work who are available for and looking for a job, as a share of the labour force. It misses informal work, which is large in several countries here.'],
  ['fert', 'Fertility rate', 'children per woman', 'SP.DYN.TFRT.IN',
   'The average number of children a woman would have over her lifetime at today’s birth rates. About 2.1 keeps a population steady without migration.'],
  ['internet', 'Internet users', '% of population', 'IT.NET.USER.ZS',
   'People who used the internet in the last three months, from any device. The World Bank series was revised in 2023, which is why some countries jump between years.'],
  ['age65', 'Aged 65 and over', '% of population', 'SP.POP.65UP.TO.ZS',
   'The share of the population aged 65 or older. High values mean an ageing society, with more pensions and care to fund from fewer workers.'],
  ['area', 'Land area', 'sq. km', 'AG.SRF.TOTL.K2',
   'The country’s land surface, excluding inland water. Divide population by it to get people per square kilometre.'],
];

export const INDICATORS = INDICATOR_ROWS.map(([key, label, unit, code, about]) =>
  ({ key, label, unit, code, about }));

export function byCode(code) {
  return COUNTRIES.find((c) => c.code === code);
}

export function density(country) {
  return country.pop / country.area;
}

// A country's rank (1 = highest) on one indicator, among the twelve.
export function rankOf(country, key) {
  return sortedBy(key).findIndex((c) => c.code === country.code) + 1;
}

export function sortedBy(key) {
  return [...COUNTRIES].sort((a, b) => b[key] - a[key]);
}
