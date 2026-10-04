const API_BASE_URL = "https://v3.football.api-sports.io";

const getApiKey = () => {
  return import.meta.env.VITE_SPORTS_API_KEY || "";
};

export async function sportsApi(endpoint, params = {}) {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("Sports API key is missing.");
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();

  const url = `${API_BASE_URL}${endpoint}${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-apisports-key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Sports API request failed: ${response.status}`);
  }

  const data = await response.json();

  if (data?.errors && Object.keys(data.errors).length > 0) {
    console.error("Sports API errors:", data.errors);
  }

  return data;
}

export async function getFootballFixtures(params = {}) {
  return sportsApi("/fixtures", params);
}

export async function getLiveFootball() {
  return sportsApi("/fixtures", {
    live: "all",
  });
}

export async function getFootballLeagues(params = {}) {
  return sportsApi("/leagues", params);
}

export async function getTeams(params = {}) {
  return sportsApi("/teams", params);
}

export async function getStandings(params = {}) {
  return sportsApi("/standings", params);
}

export async function getFootballOdds(params = {}) {
  return sportsApi("/odds", params);
}

export async function getFixtureEvents(params = {}) {
  return sportsApi("/fixtures/events", params);
}

export async function getFixtureStatistics(params = {}) {
  return sportsApi("/fixtures/statistics", params);
}

export async function getHeadToHead(params = {}) {
  return sportsApi("/fixtures/headtohead", params);
}

export const marketGroups = {
  main: [
    {
      id: "match-winner",
      name: "Match Winner",
      markets: [
        { id: "home", label: "Home" },
        { id: "draw", label: "Draw" },
        { id: "away", label: "Away" },
      ],
    },
    {
      id: "double-chance",
      name: "Double Chance",
      markets: [
        { id: "1x", label: "1X" },
        { id: "12", label: "12" },
        { id: "x2", label: "X2" },
      ],
    },
    {
      id: "over-under",
      name: "Over / Under",
      markets: [
        { id: "over-0-5", label: "Over 0.5" },
        { id: "over-1-5", label: "Over 1.5" },
        { id: "over-2-5", label: "Over 2.5" },
        { id: "under-2-5", label: "Under 2.5" },
        { id: "under-3-5", label: "Under 3.5" },
      ],
    },
    {
      id: "btts",
      name: "Both Teams To Score",
      markets: [
        { id: "btts-yes", label: "Yes" },
        { id: "btts-no", label: "No" },
      ],
    },
    {
      id: "team-goals",
      name: "Team Goals",
      markets: [
        { id: "home-over-0-5", label: "Home Over 0.5" },
        { id: "home-over-1-5", label: "Home Over 1.5" },
        { id: "away-over-0-5", label: "Away Over 0.5" },
        { id: "away-over-1-5", label: "Away Over 1.5" },
      ],
    },
    {
      id: "half-time",
      name: "Half Time Result",
      markets: [
        { id: "ht-home", label: "Home" },
        { id: "ht-draw", label: "Draw" },
        { id: "ht-away", label: "Away" },
      ],
    },
  ],

  corners: [
    {
      id: "corners-total",
      name: "Total Corners",
      markets: [
        { id: "corners-over-7-5", label: "Over 7.5" },
        { id: "corners-over-8-5", label: "Over 8.5" },
        { id: "corners-over-9-5", label: "Over 9.5" },
        { id: "corners-under-10-5", label: "Under 10.5" },
      ],
    },
  ],

  cards: [
    {
      id: "cards-total",
      name: "Total Cards",
      markets: [
        { id: "cards-over-2-5", label: "Over 2.5" },
        { id: "cards-over-3-5", label: "Over 3.5" },
        { id: "cards-over-4-5", label: "Over 4.5" },
        { id: "cards-under-5-5", label: "Under 5.5" },
      ],
    },
  ],

  goals: [
    {
      id: "total-goals",
      name: "Total Goals",
      markets: [
        { id: "goals-0-1", label: "0-1" },
        { id: "goals-2-3", label: "2-3" },
        { id: "goals-4-5", label: "4-5" },
        { id: "goals-6-plus", label: "6+" },
      ],
    },
    {
      id: "exact-score",
      name: "Exact Score",
      markets: [
        { id: "score-1-0", label: "1-0" },
        { id: "score-2-0", label: "2-0" },
        { id: "score-2-1", label: "2-1" },
        { id: "score-1-1", label: "1-1" },
        { id: "score-2-2", label: "2-2" },
        { id: "score-0-0", label: "0-0" },
      ],
    },
  ],
};

export const demoMatches = [
  {
    id: 1,
    home: "Real Madrid",
    away: "Barcelona",
    country: "Spain",
    league: "La Liga",
    status: "upcoming",
    time: "20:00",
    date: "Today",
    odds: {
      home: 2.1,
      draw: 3.4,
      away: 3.1,
    },
  },
  {
    id: 2,
    home: "Arsenal",
    away: "Chelsea",
    country: "England",
    league: "Premier League",
    status: "upcoming",
    time: "21:00",
    date: "Today",
    odds: {
      home: 1.85,
      draw: 3.6,
      away: 4.2,
    },
  },
  {
    id: 3,
    home: "Duhok",
    away: "Erbil",
    country: "Iraq",
    league: "Iraq Stars League",
    status: "upcoming",
    time: "19:30",
    date: "Today",
    odds: {
      home: 2.25,
      draw: 3.1,
      away: 2.95,
    },
  },
  {
    id: 4,
    home: "Al-Shorta",
    away: "Al-Zawraa",
    country: "Iraq",
    league: "Iraq Stars League",
    status: "upcoming",
    time: "20:30",
    date: "Tomorrow",
    odds: {
      home: 1.95,
      draw: 3.2,
      away: 3.7,
    },
  },
];

export function getTodayMatches(matches = demoMatches) {
  return matches.filter(
    (match) => String(match.date).toLowerCase() === "today"
  );
}

export function getUpcomingMatches(matches = demoMatches) {
  return matches.filter(
    (match) =>
      match.status === "upcoming" ||
      String(match.date).toLowerCase() === "today" ||
      String(match.date).toLowerCase() === "tomorrow"
  );
}

export function getMatchById(id, matches = demoMatches) {
  return matches.find((match) => String(match.id) === String(id));
}

export function getMatchesByCountry(country, matches = demoMatches) {
  if (!country) {
    return matches;
  }

  return matches.filter(
    (match) =>
      String(match.country).toLowerCase() ===
      String(country).toLowerCase()
  );
}

export function getMatchesByLeague(league, matches = demoMatches) {
  if (!league) {
    return matches;
  }

  return matches.filter(
    (match) =>
      String(match.league).toLowerCase() ===
      String(league).toLowerCase()
  );
}

export const sports = [
  { id: "football", name: "Football", icon: "⚽" },
  { id: "tennis", name: "Tennis", icon: "🎾" },
  { id: "basketball", name: "Basketball", icon: "🏀" },
  { id: "volleyball", name: "Volleyball", icon: "🏐" },
  { id: "boxing", name: "Boxing", icon: "🥊" },
  { id: "mma", name: "MMA", icon: "🥋" },
  { id: "ice-hockey", name: "Ice Hockey", icon: "🏒" },
  { id: "cricket", name: "Cricket", icon: "🏏" },
  { id: "handball", name: "Handball", icon: "🤾" },
  { id: "rugby", name: "Rugby", icon: "🏉" },
  { id: "baseball", name: "Baseball", icon: "⚾" },
  { id: "american-football", name: "American Football", icon: "🏈" },
  { id: "darts", name: "Darts", icon: "🎯" },
  { id: "golf", name: "Golf", icon: "⛳" },
  { id: "table-tennis", name: "Table Tennis", icon: "🏓" },
  { id: "esports", name: "Esports", icon: "🎮" },
  { id: "formula-1", name: "Formula 1", icon: "🏎️" },
  { id: "horse-racing", name: "Horse Racing", icon: "🏇" },
];

export const countries = [
  {
    id: "iraq",
    name: "Iraq",
    leagues: [
      "Iraq Stars League",
      "Iraq Premier League",
      "Kurdistan Premier League",
      "Kurdistan Regional League",
    ],
  },
  {
    id: "england",
    name: "England",
    leagues: [
      "Premier League",
      "Championship",
      "League One",
      "League Two",
    ],
  },
  {
    id: "spain",
    name: "Spain",
    leagues: ["La Liga", "Segunda Division"],
  },
  {
    id: "italy",
    name: "Italy",
    leagues: ["Serie A", "Serie B"],
  },
  {
    id: "germany",
    name: "Germany",
    leagues: ["Bundesliga", "2. Bundesliga"],
  },
  {
    id: "france",
    name: "France",
    leagues: ["Ligue 1", "Ligue 2"],
  },
  {
    id: "turkey",
    name: "Turkey",
    leagues: ["Super Lig", "1. Lig"],
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    leagues: ["Saudi Pro League"],
  },
  {
    id: "uae",
    name: "UAE",
    leagues: ["UAE Pro League"],
  },
  {
    id: "qatar",
    name: "Qatar",
    leagues: ["Qatar Stars League"],
  },
  {
    id: "netherlands",
    name: "Netherlands",
    leagues: ["Eredivisie"],
  },
  {
    id: "portugal",
    name: "Portugal",
    leagues: ["Primeira Liga"],
  },
  {
    id: "usa",
    name: "USA",
    leagues: ["MLS"],
  },
];

export default {
  sportsApi,
  getFootballFixtures,
  getLiveFootball,
  getFootballLeagues,
  getTeams,
  getStandings,
  getFootballOdds,
  getFixtureEvents,
  getFixtureStatistics,
  getHeadToHead,
  marketGroups,
  demoMatches,
  getTodayMatches,
  getUpcomingMatches,
  getMatchById,
  getMatchesByCountry,
  getMatchesByLeague,
  sports,
  countries,
};
