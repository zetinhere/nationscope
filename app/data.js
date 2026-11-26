// NationScope data — World Bank World Development Indicators.
// Every figure below was pulled from api.worldbank.org on 26 November 2026.
// Each value carries the year it belongs to (2024 unless noted); a null means
// the World Bank reports no value for that country and indicator.
export const SOURCE_NAME = "World Bank, World Development Indicators";
export const DATA_FETCHED = "26 November 2026";
export const SERIES_YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const INDICATORS = [
  { id: "pop", label: "Population", unit: "people", code: "SP.POP.TOTL", kind: "count",
    blurb: "Everyone counted as usually resident in the country, mid-year estimate." },
  { id: "gdp", label: "GDP", unit: "current US$", code: "NY.GDP.MKTP.CD", kind: "money",
    blurb: "The market value of everything produced in a year, in current US dollars." },
  { id: "gdpcap", label: "GDP per capita", unit: "current US$", code: "NY.GDP.PCAP.CD", kind: "money",
    blurb: "GDP divided by mid-year population — the average output per person." },
  { id: "gdpgrow", label: "GDP growth", unit: "% per year", code: "NY.GDP.MKTP.KD.ZG", kind: "percent",
    blurb: "How much real GDP grew or shrank compared with the previous year." },
  { id: "infl", label: "Inflation", unit: "% per year", code: "FP.CPI.TOTL.ZG", kind: "percent",
    blurb: "How fast consumer prices rose, measured by the consumer price index." },
  { id: "unemp", label: "Unemployment", unit: "% of labour force", code: "SL.UEM.TOTL.ZS", kind: "percent",
    blurb: "The share of the labour force without work but available and looking for it (ILO modelled estimate)." },
  { id: "lifeexp", label: "Life expectancy", unit: "years", code: "SP.DYN.LE00.IN", kind: "years",
    blurb: "How long a newborn could expect to live if today's death rates stayed the same." },
  { id: "exports", label: "Exports", unit: "% of GDP", code: "NE.EXP.GNFS.ZS", kind: "percent",
    blurb: "Goods and services sold abroad, as a share of the whole economy." },
  { id: "internet", label: "Internet users", unit: "% of population", code: "IT.NET.USER.ZS", kind: "percent",
    blurb: "People who used the internet in the last three months, as a share of everyone." },
  { id: "forest", label: "Forest area", unit: "% of land area", code: "AG.LND.FRST.ZS", kind: "percent",
    blurb: "Land covered by forest, as a share of the country's total land area." },
  { id: "eduspend", label: "Education spending", unit: "% of GDP", code: "SE.XPD.TOTL.GD.ZS", kind: "percent",
    blurb: "What government spends on education, as a share of the whole economy. Latest year reported varies by country." },
];

export const COUNTRIES = [
  { code: "IN", name: "India", region: "South Asia",
    v: { pop: 1450935791, gdp: 3760813470501, gdpcap: 2591.99, gdpgrow: 7.1, infl: 4.95, unemp: 4.17, lifeexp: 72.24, exports: 22.06, internet: 64.94, forest: 24.44, eduspend: 4.1 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2022 },
    popSeries: [1328024498, 1343944296, 1359657400, 1374659064, 1389030312, 1402617695, 1414203896, 1425423212, 1438069596, 1450935791],
    gdpSeries: [2103588360045, 2294796885663, 2651474262755, 2702929641649, 2835606256558, 2674851578587, 3167270623260, 3249938492013, 3500906030645, 3760813470501] },
  { code: "CN", name: "China", region: "East Asia",
    v: { pop: 1408975000, gdp: 18729668435848, gdpcap: 13293.12, gdpgrow: 4.96, infl: 0.22, unemp: 4.59, lifeexp: 78.02, exports: 20.44, internet: 92, forest: 24.02, eduspend: 3.9 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2023 },
    popSeries: [1379860000, 1387790000, 1396215000, 1402760000, 1407745000, 1411100000, 1412360000, 1412175000, 1410710000, 1408975000],
    gdpSeries: [11280814787469, 11456024084962, 12537559062283, 14147765772964, 14560167101283, 14996414166715, 18201698719564, 18316765021690, 18270356654533, 18729668435848] },
  { code: "US", name: "United States", region: "North America",
    v: { pop: 340003797, gdp: 29298013000000, gdpcap: 86169.66, gdpgrow: 2.79, infl: 2.95, unemp: 4.02, lifeexp: 78.89, exports: 10.97, internet: 94.69, forest: 33.78, eduspend: 5.42 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2021 },
    popSeries: [321815121, 324353340, 326608609, 328529577, 330226227, 331578104, 332100166, 333996304, 336755052, 340003797],
    gdpSeries: [18295019000000, 18804913000000, 19612102000000, 20656516000000, 21539982000000, 21375281000000, 23725645000000, 26054614000000, 27811517000000, 29298013000000] },
  { code: "ID", name: "Indonesia", region: "Southeast Asia",
    v: { pop: 283487931, gdp: 1396301788462, gdpcap: 4925.44, gdpgrow: 5.03, infl: 2.18, unemp: 3.3, lifeexp: 71.29, exports: 22.31, internet: 72.78, forest: 50.67, eduspend: 1.28 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2023 },
    popSeries: [261799249, 264627418, 267346658, 269951846, 272489381, 274814866, 276758053, 278830529, 281190067, 283487931],
    gdpSeries: [860854232686, 931877364038, 1015618744160, 1042271532989, 1119099871350, 1059054842698, 1186509691087, 1319101183380, 1371166925750, 1396301788462] },
  { code: "BR", name: "Brazil", region: "South America",
    v: { pop: 211998573, gdp: 2185821610689, gdpcap: 10310.55, gdpgrow: 3.42, infl: 4.37, unemp: 6.8, lifeexp: 76.02, exports: 17.94, internet: 84.46, forest: 58.55, eduspend: 5.62 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2022 },
    popSeries: [201675532, 203218114, 204703445, 206107261, 207455459, 208660842, 209550294, 210306415, 211140729, 211998573],
    gdpSeries: [1802212206815, 1795693482853, 2063514977366, 1916933898011, 1873288205060, 1476107231310, 1670647398905, 1951923942083, 2191131765685, 2185821610689] },
  { code: "JP", name: "Japan", region: "East Asia",
    v: { pop: 123975371, gdp: 4190008188359, gdpcap: 33797.1, gdpgrow: -0.24, infl: 2.74, unemp: 2.5, lifeexp: 84.04, exports: 21.98, internet: 85.54, forest: 68.34, eduspend: 3.34 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2021 },
    popSeries: [127141000, 127076000, 126972000, 126811000, 126633000, 126261000, 125681593, 125124989, 124516650, 123975371],
    gdpSeries: [4534438580495, 5110357383254, 5038231631661, 5154293721630, 5245755000479, 5189197543645, 5225933520753, 4447976207315, 4384854269962, 4190008188359] },
  { code: "DE", name: "Germany", region: "Europe",
    v: { pop: 83516593, gdp: 4685592577805, gdpcap: 56103.73, gdpgrow: -0.5, infl: 2.26, unemp: 3.4, lifeexp: 80.79, exports: 41.43, internet: 93.5, forest: 32.84, eduspend: 5.24 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2022 },
    popSeries: [81686611, 82348669, 82657002, 82905782, 83092962, 83160871, 83196078, 83177813, 83287273, 83516593],
    gdpSeries: [3425099578746, 3536787895179, 3765351626106, 4055433215302, 3959894794039, 3941398957074, 4355251953411, 4201021706479, 4562207532490, 4685592577805] },
  { code: "GB", name: "United Kingdom", region: "Europe",
    v: { pop: 69281000, gdp: 3695539513534, gdpcap: 53341.31, gdpgrow: 1.08, infl: 3.27, unemp: 4.36, lifeexp: 81.39, exports: 31.06, internet: 95.47, forest: 13.5, eduspend: 5.91 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2021 },
    popSeries: [65087000, 65606000, 65964000, 66287000, 66628000, 66740000, 66978000, 67636000, 68526000, 69281000],
    gdpSeries: [2945579890258, 2706807606539, 2699118387873, 2897028009916, 2875710080015, 2724001478305, 3194559188926, 3181244350465, 3420796653789, 3695539513534] },
  { code: "FR", name: "France", region: "Europe",
    v: { pop: 68551653, gdp: 3160442622465, gdpcap: 46103.08, gdpgrow: 1.19, infl: 2, unemp: 7.4, lifeexp: 82.98, exports: 33.89, internet: 88.65, forest: 32.85, eduspend: 5.32 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2022 },
    popSeries: [66548272, 66724104, 66918020, 67158348, 67382061, 67601110, 67842811, 68184457, 68372286, 68551653],
    gdpSeries: [2442483452643, 2470407619777, 2588868323335, 2781576320884, 2722793515172, 2647926055110, 2966433692008, 2794788137067, 3056250648138, 3160442622465] },
  { code: "KR", name: "South Korea", region: "East Asia",
    v: { pop: 51751065, gdp: 1875388209407, gdpcap: 36238.64, gdpgrow: 2, infl: 2.32, unemp: 2.78, lifeexp: 83.63, exports: 44.36, internet: 97.9, forest: 64.37, eduspend: 5.41 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2022 },
    popSeries: [51014947, 51217803, 51361911, 51585058, 51764822, 51836239, 51769539, 51672569, 51712619, 51751065],
    gdpSeries: [1539212301136, 1579150518945, 1710196756713, 1824251454307, 1751045752055, 1744070276373, 1942313560966, 1799363116867, 1844800934392, 1875388209407] },
  { code: "AU", name: "Australia", region: "Oceania",
    v: { pop: 27194286, gdp: 1757022451653, gdpcap: 64609.99, gdpgrow: 1.37, infl: 3.17, unemp: 3.94, lifeexp: 83.05, exports: 24.62, internet: 96.13, forest: 17.37, eduspend: 5.06 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: 2024, internet: 2024, forest: 2024, eduspend: 2022 },
    popSeries: [23815995, 24190907, 24592588, 24963258, 25334826, 25649248, 25685412, 26018721, 26659922, 27194286],
    gdpSeries: [1356805839936, 1211588128418, 1330890554614, 1433144978762, 1398349602956, 1333336461648, 1560617493203, 1695627535476, 1734451264656, 1757022451653] },
  { code: "NG", name: "Nigeria", region: "Africa",
    v: { pop: 232679478, gdp: 252261880140, gdpcap: 1084.16, gdpgrow: 4.07, infl: 33.24, unemp: 3.05, lifeexp: 54.64, exports: null, internet: 41.21, forest: 18.95, eduspend: 0.32 },
    y: { pop: 2024, gdp: 2024, gdpcap: 2024, gdpgrow: 2024, infl: 2024, unemp: 2024, lifeexp: 2024, exports: null, internet: 2024, forest: 2024, eduspend: 2023 },
    popSeries: [190671878, 195443700, 200254579, 204938755, 209485641, 213996181, 218529286, 223150896, 227882945, 232679478],
    gdpSeries: [493026682801, 404649125252, 375745731053, 421739251509, 668219992687, 598586817817, 609147716965, 646950257575, 487387801878, 252261880140] },
];

export function indicatorById(id) {
  return INDICATORS.find((item) => item.id === id) || INDICATORS[0];
}

export function countryByCode(code) {
  return COUNTRIES.find((item) => item.code === code) || null;
}

// Rank of a country on one indicator: 1 is the largest value. Nulls are skipped.
export function rankOf(country, indicatorId) {
  const value = country.v[indicatorId];
  if (value === null || value === undefined) return null;
  let rank = 1;
  for (const other of COUNTRIES) {
    const otherValue = other.v[indicatorId];
    if (otherValue !== null && otherValue !== undefined && otherValue > value) rank += 1;
  }
  return rank;
}

export function sortedBy(indicatorId, descending = true) {
  const rows = COUNTRIES.filter((c) => c.v[indicatorId] !== null && c.v[indicatorId] !== undefined);
  rows.sort((a, b) => descending ? b.v[indicatorId] - a.v[indicatorId] : a.v[indicatorId] - b.v[indicatorId]);
  return rows;
}
