// NationScope data: twelve countries, eleven World Bank indicators.
//
// Every headline figure is the World Bank's World Development Indicators
// value for 2024, pulled on 26 November 2026. The decade series cover
// 2015-2024: population in millions of people, GDP in billions of current
// US dollars. Headline population is people; headline GDP is current US
// dollars.
//
// Series used: SP.POP.TOTL, NY.GDP.MKTP.CD, NY.GDP.PCAP.CD,
// NY.GDP.MKTP.KD.ZG, SP.DYN.LE00.IN, SP.URB.TOTL.IN.ZS, SL.UEM.TOTL.ZS,
// SP.DYN.TFRT.IN, IT.NET.USER.ZS, SP.POP.65UP.TO.ZS, AG.SRF.TOTL.K2.
// World population in 2024 is about 8.2 billion (UN World Population
// Prospects 2024).

export const DATA_YEAR = 2024;
export const WORLD_POPULATION_2024 = 8200000000;

export const COUNTRIES = [
  {
    code: "IN", name: "India", region: "South Asia", capital: "New Delhi",
    currency: "Indian rupee (INR)",
    blurb: "The world’s most populous country since 2023, and its fastest-growing large economy in 2024.",
    pop: 1450935791, gdp: 3760813470501, gdppc: 2592, life: 72.2, urban: 35.4,
    unemp: 4.2, fert: 1.96, internet: 64.9, area: 3287263, age65: 7.2, growth: 7.1,
    popSeries: [1328.0, 1343.9, 1359.7, 1374.7, 1389.0, 1402.6, 1414.2, 1425.4, 1438.1, 1450.9],
    gdpSeries: [2104, 2295, 2651, 2703, 2836, 2675, 3167, 3250, 3501, 3761],
  },
  {
    code: "CN", name: "China", region: "East Asia", capital: "Beijing",
    currency: "Chinese yuan (CNY)",
    blurb: "The world’s second-largest economy and its biggest manufacturer, with a population that has begun to shrink.",
    pop: 1408975000, gdp: 18729668435848, gdppc: 13293, life: 78.0, urban: 65.9,
    unemp: 4.6, fert: 1.01, internet: 92.0, area: 9562910, age65: 14.7, growth: 5.0,
    popSeries: [1380.0, 1387.8, 1396.2, 1402.8, 1407.7, 1411.1, 1412.4, 1412.2, 1410.7, 1409.0],
    gdpSeries: [11281, 11456, 12538, 14148, 14560, 14996, 18202, 18317, 18270, 18730],
  },
  {
    code: "US", name: "United States", region: "North America", capital: "Washington, D.C.",
    currency: "US dollar (USD)",
    blurb: "The world’s largest economy by a wide margin, and the richest large country per person in this atlas.",
    pop: 340003797, gdp: 29298013000000, gdppc: 86170, life: 78.9, urban: 80.1,
    unemp: 4.0, fert: 1.63, internet: 94.7, area: 9831510, age65: 17.9, growth: 2.8,
    popSeries: [321.8, 324.4, 326.6, 328.5, 330.2, 331.6, 332.1, 334.0, 336.8, 340.0],
    gdpSeries: [18295, 18805, 19612, 20657, 21540, 21375, 23726, 26055, 27812, 29298],
  },
  {
    code: "ID", name: "Indonesia", region: "Southeast Asia", capital: "Jakarta",
    currency: "Indonesian rupiah (IDR)",
    blurb: "The world’s fourth-largest country by people and its largest island nation, growing at about 5% a year.",
    pop: 283487931, gdp: 1396301788462, gdppc: 4925, life: 71.3, urban: 58.8,
    unemp: 3.3, fert: 2.12, internet: 72.8, area: 1916907, age65: 7.3, growth: 5.0,
    popSeries: [261.8, 264.6, 267.3, 270.0, 272.5, 274.8, 276.8, 278.8, 281.2, 283.5],
    gdpSeries: [861, 932, 1016, 1042, 1119, 1059, 1187, 1319, 1371, 1396],
  },
  {
    code: "BR", name: "Brazil", region: "South America", capital: "Brasília",
    currency: "Brazilian real (BRL)",
    blurb: "South America’s giant: the most urbanised country in this atlas after Japan, and a farming and energy exporter.",
    pop: 211998573, gdp: 2185821610689, gdppc: 10311, life: 76.0, urban: 87.9,
    unemp: 6.8, fert: 1.61, internet: 84.5, area: 8510420, age65: 11.1, growth: 3.4,
    popSeries: [201.7, 203.2, 204.7, 206.1, 207.5, 208.7, 209.6, 210.3, 211.1, 212.0],
    gdpSeries: [1802, 1796, 2064, 1917, 1873, 1476, 1671, 1952, 2191, 2186],
  },
  {
    code: "JP", name: "Japan", region: "East Asia", capital: "Tokyo",
    currency: "Japanese yen (JPY)",
    blurb: "The longest-lived people on earth and the oldest population in this atlas: nearly 3 in 10 residents are 65 or older.",
    pop: 123975371, gdp: 4190008188359, gdppc: 33797, life: 84.0, urban: 92.2,
    unemp: 2.5, fert: 1.15, internet: 85.5, area: 377975, age65: 29.8, growth: -0.2,
    popSeries: [127.1, 127.1, 127.0, 126.8, 126.6, 126.3, 125.7, 125.1, 124.5, 124.0],
    gdpSeries: [4534, 5110, 5038, 5154, 5246, 5189, 5226, 4448, 4385, 4190],
  },
  {
    code: "DE", name: "Germany", region: "Western Europe", capital: "Berlin",
    currency: "Euro (EUR)",
    blurb: "Europe’s largest economy, built on manufacturing and exports, with one of the world’s oldest populations.",
    pop: 83516593, gdp: 4685592577805, gdppc: 56104, life: 80.8, urban: 82.0,
    unemp: 3.4, fert: 1.36, internet: 93.5, area: 357680, age65: 23.2, growth: -0.5,
    popSeries: [81.7, 82.3, 82.7, 82.9, 83.1, 83.2, 83.2, 83.2, 83.3, 83.5],
    gdpSeries: [3425, 3537, 3765, 4055, 3960, 3941, 4355, 4201, 4562, 4686],
  },
  {
    code: "GB", name: "United Kingdom", region: "Northern Europe", capital: "London",
    currency: "Pound sterling (GBP)",
    blurb: "A services-led economy centred on London, with the highest internet use in this atlas after South Korea.",
    pop: 69281000, gdp: 3695539513534, gdppc: 53341, life: 81.4, urban: 83.2,
    unemp: 4.4, fert: 1.55, internet: 95.5, area: 243610, age65: 19.5, growth: 1.1,
    popSeries: [65.1, 65.6, 66.0, 66.3, 66.6, 66.7, 67.0, 67.6, 68.5, 69.3],
    gdpSeries: [2946, 2707, 2699, 2897, 2876, 2724, 3195, 3181, 3421, 3696],
  },
  {
    code: "FR", name: "France", region: "Western Europe", capital: "Paris",
    currency: "Euro (EUR)",
    blurb: "Europe’s second-largest economy, with the highest fertility in Western Europe and a long-lived population.",
    pop: 68551653, gdp: 3160442622465, gdppc: 46103, life: 83.0, urban: 78.8,
    unemp: 7.4, fert: 1.61, internet: 88.7, area: 606410, age65: 22.2, growth: 1.2,
    popSeries: [66.5, 66.7, 66.9, 67.2, 67.4, 67.6, 67.8, 68.2, 68.4, 68.6],
    gdpSeries: [2442, 2470, 2589, 2782, 2723, 2648, 2966, 2795, 3056, 3160],
  },
  {
    code: "KR", name: "South Korea", region: "East Asia", capital: "Seoul",
    currency: "South Korean won (KRW)",
    blurb: "The most connected country in this atlas and the lowest fertility on earth: 0.75 children per woman in 2024.",
    pop: 51751065, gdp: 1875388209407, gdppc: 36239, life: 83.6, urban: 81.2,
    unemp: 2.8, fert: 0.75, internet: 97.9, area: 100460, age65: 19.3, growth: 2.0,
    popSeries: [51.0, 51.2, 51.4, 51.6, 51.8, 51.8, 51.8, 51.7, 51.7, 51.8],
    gdpSeries: [1539, 1579, 1710, 1824, 1751, 1744, 1942, 1799, 1845, 1875],
  },
  {
    code: "AU", name: "Australia", region: "Oceania", capital: "Canberra",
    currency: "Australian dollar (AUD)",
    blurb: "A continent-sized country with only 27 million people, and the second-highest income per person in this atlas.",
    pop: 27194286, gdp: 1757022451653, gdppc: 64610, life: 83.1, urban: 87.6,
    unemp: 3.9, fert: 1.48, internet: 96.1, area: 7741220, age65: 17.7, growth: 1.4,
    popSeries: [23.8, 24.2, 24.6, 25.0, 25.3, 25.6, 25.7, 26.0, 26.7, 27.2],
    gdpSeries: [1357, 1212, 1331, 1433, 1398, 1333, 1561, 1696, 1734, 1757],
  },
  {
    code: "NG", name: "Nigeria", region: "West Africa", capital: "Abuja",
    currency: "Nigerian naira (NGN)",
    blurb: "Africa’s most populous country and its youngest: the highest fertility and the lowest life expectancy in this atlas.",
    pop: 232679478, gdp: 252261880140, gdppc: 1084, life: 54.6, urban: 63.0,
    unemp: 3.0, fert: 4.38, internet: 41.2, area: 923768, age65: 3.1, growth: 4.1,
    popSeries: [190.7, 195.4, 200.3, 204.9, 209.5, 214.0, 218.5, 223.2, 227.9, 232.7],
    gdpSeries: [493, 405, 376, 422, 668, 599, 609, 647, 487, 252],
  },
];

// The eleven headline indicators: key, label, unit, World Bank code, and a
// plain-language note on what the series counts. The Indicators page shows
// these, and each figure on the site names its source beside it.
export const INDICATORS = [
  { key: "pop", label: "Population", unit: "people", code: "SP.POP.TOTL",
    about: "All residents of the country at mid-year, regardless of citizenship. The World Bank builds it from censuses, civil registration and the UN’s population estimates." },
  { key: "gdp", label: "GDP", unit: "current US$", code: "NY.GDP.MKTP.CD",
    about: "Gross domestic product at market prices: the value of everything produced inside the country in a year, converted to US dollars at the market exchange rate." },
  { key: "gdppc", label: "GDP per person", unit: "current US$", code: "NY.GDP.PCAP.CD",
    about: "GDP divided by the mid-year population. A rough gauge of average income, not of how that income is shared." },
  { key: "growth", label: "GDP growth", unit: "% per year", code: "NY.GDP.MKTP.KD.ZG",
    about: "How much the economy grew in real terms, after stripping out price rises. A negative number means the economy shrank that year." },
  { key: "life", label: "Life expectancy", unit: "years", code: "SP.DYN.LE00.IN",
    about: "How long a newborn would live if death rates at each age stayed as they are today. It summarises health, nutrition and medical care in one number." },
  { key: "urban", label: "Urban population", unit: "% of total", code: "SP.URB.TOTL.IN.ZS",
    about: "The share of people living in places each country’s own statistics office counts as urban. Definitions differ, so small gaps between countries mean little." },
  { key: "unemp", label: "Unemployment", unit: "% of labour force", code: "SL.UEM.TOTL.ZS",
    about: "People without work who are available for and looking for a job, as a share of the labour force. It misses informal work, which is large in several countries here." },
  { key: "fert", label: "Fertility rate", unit: "children per woman", code: "SP.DYN.TFRT.IN",
    about: "The average number of children a woman would have over her lifetime at today’s birth rates. About 2.1 keeps a population steady without migration." },
  { key: "internet", label: "Internet users", unit: "% of population", code: "IT.NET.USER.ZS",
    about: "People who used the internet in the last three months, from any device. The World Bank series was revised in 2023, which is why some countries jump between years." },
  { key: "age65", label: "Aged 65 and over", unit: "% of population", code: "SP.POP.65UP.TO.ZS",
    about: "The share of the population aged 65 or older. High values mean an ageing society, with more pensions and care to fund from fewer workers." },
  { key: "area", label: "Land area", unit: "sq. km", code: "AG.SRF.TOTL.K2",
    about: "The country’s land surface, excluding inland water. Divide population by it to get people per square kilometre." },
];

export function byCode(code) {
  return COUNTRIES.find((c) => c.code === code);
}

export function density(country) {
  return country.pop / country.area;
}

// A country's rank (1 = highest) on one indicator, among the twelve.
export function rankOf(country, key) {
  const ordered = sortedBy(key);
  return ordered.findIndex((c) => c.code === country.code) + 1;
}

export function sortedBy(key) {
  return [...COUNTRIES].sort((a, b) => b[key] - a[key]);
}
