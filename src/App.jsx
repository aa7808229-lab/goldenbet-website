import { useEffect, useMemo, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { supabase } from "../lib/supabase";
import { marketGroups } from "./markets";
import AdminDashboard from "./AdminDashboard";
import PaymentCard from "./PaymentCard";

/* =========================================================
   COUNTRIES
   ========================================================= */

const countries = [
  {
    id: "iraq",
    name: "Iraq",
    flag: "🇮🇶",
    currency: "IQD",
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
    flag: "🇬🇧",
    currency: "GBP",
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
    flag: "🇪🇸",
    currency: "EUR",
    leagues: ["La Liga", "Segunda Division"],
  },
  {
    id: "italy",
    name: "Italy",
    flag: "🇮🇹",
    currency: "EUR",
    leagues: ["Serie A", "Serie B"],
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    leagues: ["Bundesliga", "2. Bundesliga"],
  },
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    currency: "EUR",
    leagues: ["Ligue 1", "Ligue 2"],
  },
  {
    id: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    currency: "TRY",
    leagues: ["Super Lig", "1. Lig"],
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    currency: "SAR",
    leagues: ["Saudi Pro League"],
  },
  {
    id: "uae",
    name: "UAE",
    flag: "🇦🇪",
    currency: "AED",
    leagues: ["UAE Pro League"],
  },
  {
    id: "qatar",
    name: "Qatar",
    flag: "🇶🇦",
    currency: "QAR",
    leagues: ["Qatar Stars League"],
  },
  {
    id: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    currency: "EUR",
    leagues: ["Eredivisie"],
  },
  {
    id: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    currency: "EUR",
    leagues: ["Primeira Liga"],
  },
  {
    id: "usa",
    name: "USA",
    flag: "🇺🇸",
    currency: "USD",
    leagues: ["MLS"],
  },
];

/* =========================================================
   SPORTS
   ========================================================= */

const sports = [
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
  {
    id: "american-football",
    name: "American Football",
    icon: "🏈",
  },
  { id: "darts", name: "Darts", icon: "🎯" },
  { id: "golf", name: "Golf", icon: "⛳" },
  {
    id: "table-tennis",
    name: "Table Tennis",
    icon: "🏓",
  },
  { id: "esports", name: "Esports", icon: "🎮" },
  { id: "formula-1", name: "Formula 1", icon: "🏎️" },
  {
    id: "horse-racing",
    name: "Horse Racing",
    icon: "🏇",
  },
];

/* =========================================================
   DEMO MATCH DATA
   ========================================================= */

const matches = [
  {
    id: 1,
    home: "Real Madrid",
    away: "Barcelona",
    country: "Spain",
    league: "La Liga",
    time: "20:00",
    date: "Today",
    status: "upcoming",
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
    time: "21:00",
    date: "Today",
    status: "upcoming",
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
    time: "19:30",
    date: "Today",
    status: "upcoming",
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
    time: "20:30",
    date: "Tomorrow",
    status: "upcoming",
    odds: {
      home: 1.95,
      draw: 3.2,
      away: 3.7,
    },
  },
  {
    id: 5,
    home: "Liverpool",
    away: "Manchester City",
    country: "England",
    league: "Premier League",
    time: "22:00",
    date: "Tomorrow",
    status: "upcoming",
    odds: {
      home: 2.3,
      draw: 3.5,
      away: 2.8,
    },
  },
  {
    id: 6,
    home: "Bayern Munich",
    away: "Dortmund",
    country: "Germany",
    league: "Bundesliga",
    time: "21:30",
    date: "Tomorrow",
    status: "upcoming",
    odds: {
      home: 1.65,
      draw: 4.1,
      away: 4.8,
    },
  },
];

/* =========================================================
   LIVE MATCHES
   ========================================================= */

const liveMatches = [
  {
    id: 101,
    home: "Duhok",
    away: "Erbil",
    country: "Iraq",
    league: "Iraq Stars League",
    minute: "67'",
    score: "1 - 0",
    status: "live",
  },
  {
    id: 102,
    home: "Arsenal",
    away: "Chelsea",
    country: "England",
    league: "Premier League",
    minute: "54'",
    score: "1 - 1",
    status: "live",
  },
];

/* =========================================================
   CASINO
   ========================================================= */

const casinoGames = [
  {
    id: 1,
    name: "Golden Roulette",
    category: "Roulette",
    image: "/roulette.jpg",
  },
  {
    id: 2,
    name: "GoldenBet Casino",
    category: "Casino",
    image: "/goldenbet.jpg",
  },
  {
    id: 3,
    name: "Golden Football",
    category: "Sports Game",
    image: "/football.jpg",
  },
];

const liveCasinoGames = [
  "Evolution",
  "Ezugi",
  "Pragmatic Play Live",
  "TVBet",
];

const goldenGames = [
  "Golden Crash",
  "Golden Dice",
  "Golden Wheel",
  "Golden Mines",
  "Golden Cards",
  "Golden Jackpot",
];

/* =========================================================
   ODDS
   ========================================================= */

const oddsMap = {
  home: 2.1,
  draw: 3.4,
  away: 3.1,

  "1x": 1.4,
  "12": 1.35,
  x2: 1.5,

  "over-0-5": 1.1,
  "over-1-5": 1.35,
  "over-2-5": 1.8,

  "under-2-5": 1.9,
  "under-3-5": 1.35,

  "btts-yes": 1.7,
  "btts-no": 2.05,

  "home-over-0-5": 1.25,
  "home-over-1-5": 1.75,

  "away-over-0-5": 1.3,
  "away-over-1-5": 1.9,

  "ht-home": 2.3,
  "ht-draw": 2.2,
  "ht-away": 3.2,

  "corners-over-7-5": 1.65,
  "corners-over-8-5": 1.85,
  "corners-over-9-5": 2.05,
  "corners-under-10-5": 1.55,

  "cards-over-2-5": 1.45,
  "cards-over-3-5": 1.7,
  "cards-over-4-5": 2.05,
  "cards-under-5-5": 1.55,

  "goals-0-1": 2.4,
  "goals-2-3": 1.8,
  "goals-4-5": 3.2,
  "goals-6-plus": 8.5,

  "score-1-0": 6.5,
  "score-2-0": 8,
  "score-2-1": 7,
  "score-1-1": 5.5,
  "score-2-2": 10,
  "score-0-0": 8.5,
};

function getMarketOdds(id, index = 0) {
  if (oddsMap[id]) {
    return oddsMap[id];
  }

  return Number((1.5 + index * 0.4).toFixed(2));
}

const marketGroupsList = Object.entries(
  marketGroups || {}
).flatMap(([groupKey, groups]) =>
  Array.isArray(groups)
    ? groups.map((group) => ({
        id: `${groupKey}-${group.id}`,
        title: group.name,
        markets: Array.isArray(group.markets)
          ? group.markets.map((market, index) => ({
              id: market.id,
              title: market.label,
              selections: [
                {
                  key: market.id,
                  name: market.label,
                  odds: getMarketOdds(market.id, index),
                },
              ],
            }))
          : [],
      }))
    : []
);

/* =========================================================
   HELPERS
   ========================================================= */

function safeOdds(value, fallback = 1.01) {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 1) {
    return fallback;
  }

  return number;
}

function getCountry(id) {
  return countries.find(
    (country) => String(country.id) === String(id)
  );
}

function TeamLogo({ name }) {
  const initials = String(name || "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="team-logo" title={name}>
      {initials || "GB"}
    </div>
  );
}

/* =========================================================
   HEADER
   ========================================================= */

function GoldenBetHeader({ bets = [] }) {
  return (
    <>
      <header className="golden-top-header">
        <div className="golden-top-visual">
          <div className="golden-side-image golden-side-left">
            <span>🎰</span>
          </div>

          <Link
            to="/"
            className="golden-center-logo"
            aria-label="GoldenBet Home"
          >
            GOLDENBET
          </Link>

          <div className="golden-side-image golden-side-right">
            <span>⚽</span>
          </div>
        </div>

        <nav className="golden-main-nav">
          <Link to="/sports">Sports</Link>
          <Link to="/live">Live</Link>
          <Link to="/casino">Casino</Link>
          <Link to="/casino/live">Live Casino</Link>
          <Link to="/golden-games">Golden Games</Link>
          <Link to="/promotions">Promotions</Link>
          <Link to="/my-country">My Country</Link>
        </nav>
      </header>

      <nav
        className="golden-bottom-nav"
        aria-label="Main navigation"
      >
        <Link to="/sports" className="golden-bottom-item">
          <span className="golden-bottom-icon">⚽</span>
          <span>Sports</span>
        </Link>

        <Link to="/bet-slip" className="golden-bottom-item">
          <span className="golden-bottom-icon">
            🎟️
          </span>

          <span>Bet Slip</span>

          {bets.length > 0 && (
            <b className="golden-bet-count">
              {bets.length}
            </b>
          )}
        </Link>

        <Link to="/deposit" className="golden-bottom-item">
          <span className="golden-bottom-icon">💰</span>
          <span>Deposit</span>
        </Link>

        <Link to="/casino" className="golden-bottom-item">
          <span className="golden-bottom-icon">🎰</span>
          <span>Casino</span>
        </Link>
      </nav>
    </>
  );
}

/* =========================================================
   HOME
   ========================================================= */

function Home({ session }) {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <span className="golden-badge">
              GOLDENBET
            </span>

            <h1>
              The Ultimate
              <br />
              Sports & Casino
              <br />
              Experience
            </h1>

            <p>
              Football, live matches, casino games and
              Golden Games in one professional platform.
            </p>

            <div className="home-hero-actions">
              <Link
                to="/sports"
                className="golden-primary-button"
              >
                ⚽ View Sports
              </Link>

              <Link
                to="/live"
                className="golden-secondary-button"
              >
                🔴 Live
              </Link>

              {!session && (
                <Link
                  to="/register"
                  className="golden-secondary-button"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="home-showcase">
        <div className="section-heading">
          <span>GOLDENBET</span>
          <h2>Choose Your Game</h2>
        </div>

        <div className="home-showcase-grid">
          <Link
            to="/casino"
            className="showcase-card"
          >
            <img
              src="/roulette.jpg"
              alt="Roulette"
            />

            <div>
              <span>CASINO</span>
              <strong>Roulette</strong>
            </div>
          </Link>

          <Link
            to="/golden-games"
            className="showcase-card"
          >
            <img
              src="/goldenbet.jpg"
              alt="Golden Games"
            />

            <div>
              <span>GOLDEN GAMES</span>
              <strong>Play Now</strong>
            </div>
          </Link>

          <Link
            to="/sports"
            className="showcase-card"
          >
            <img
              src="/football.jpg"
              alt="Football"
            />

            <div>
              <span>SPORTS</span>
              <strong>Football</strong>
            </div>
          </Link>
        </div>
      </section>

      <section className="home-feature-grid">
        <Link
          to="/live"
          className="home-feature-card"
        >
          <span>🔴</span>
          <strong>Live Betting</strong>
          <small>
            Follow live matches and markets
          </small>
        </Link>

        <Link
          to="/promotions"
          className="home-feature-card"
        >
          <span>🎁</span>
          <strong>Promotions</strong>
          <small>
            Special GoldenBet offers
          </small>
        </Link>

        <Link
          to="/casino/live"
          className="home-feature-card"
        >
          <span>🎰</span>
          <strong>Live Casino</strong>
          <small>
            Play with live dealers
          </small>
        </Link>

        <Link
          to="/my-country"
          className="home-feature-card"
        >
          <span>🌍</span>
          <strong>My Country</strong>
          <small>
            Local leagues and matches
          </small>
        </Link>
      </section>
    </main>
  );
}

/* =========================================================
   SPORTS
   ========================================================= */

function SportsPage({ addBet }) {
  const { sport } = useParams();

  const [selectedCountry, setSelectedCountry] =
    useState("");

  const [selectedLeague, setSelectedLeague] =
    useState("");

  const selectedSport = sports.find(
    (item) => item.id === sport
  );

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const countryMatch =
        !selectedCountry ||
        match.country.toLowerCase() ===
          selectedCountry.toLowerCase();

      const leagueMatch =
        !selectedLeague ||
        match.league.toLowerCase() ===
          selectedLeague.toLowerCase();

      return countryMatch && leagueMatch;
    });
  }, [selectedCountry, selectedLeague]);

  const country = getCountry(selectedCountry);

  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            GOLDENBET SPORTS
          </span>

          <h1>
            {selectedSport
              ? selectedSport.name
              : "Sports"}
          </h1>
        </div>

        <Link
          to="/live"
          className="live-button"
        >
          🔴 Live
        </Link>
      </div>

      <div className="sports-list">
        {sports.map((item) => (
          <Link
            key={item.id}
            to={`/sports/${item.id}`}
            className={
              item.id === sport
                ? "sport-card active"
                : "sport-card"
            }
          >
            <span className="sport-icon">
              {item.icon}
            </span>

            <strong>{item.name}</strong>
          </Link>
        ))}
      </div>

      <div className="sports-filter">
        <select
          value={selectedCountry}
          onChange={(event) => {
            setSelectedCountry(
              event.target.value
            );
            setSelectedLeague("");
          }}
        >
          <option value="">
            All Countries
          </option>

          {countries.map((item) => (
            <option
              key={item.id}
              value={item.name}
            >
              {item.flag} {item.name}
            </option>
          ))}
        </select>

        <select
          value={selectedLeague}
          onChange={(event) =>
            setSelectedLeague(
              event.target.value
            )
          }
          disabled={!country}
        >
          <option value="">
            All Leagues
          </option>

          {country?.leagues.map(
            (league) => (
              <option
                key={league}
                value={league}
              >
                {league}
              </option>
            )
          )}
        </select>
      </div>

      <div className="sports-list">
        {filteredMatches.length === 0 ? (
          <div className="empty-state">
            <span>⚽</span>

            <h3>No matches found</h3>

            <p>
              Try another country or league.
            </p>
          </div>
        ) : (
          filteredMatches.map(
            (match) => (
              <MatchCard
                key={match.id}
                match={match}
                addBet={addBet}
              />
            )
          )
        )}
      </div>
    </main>
  );
}

/* =========================================================
   MATCH CARD
   ========================================================= */

function MatchCard({ match, addBet }) {
  const odds = match.odds || {};

  return (
    <article className="match-card">
      <div className="match-card-header">
        <div>
          <span className="match-country">
            {match.country} • {match.league}
          </span>

          <span className="match-date">
            {match.date} • {match.time}
          </span>
        </div>

        <Link
          to={`/match/${match.id}`}
          className="match-more"
        >
          More →
        </Link>
      </div>

      <div className="match-teams">
        <div className="match-team">
          <TeamLogo name={match.home} />

          <strong>
            {match.home}
          </strong>
        </div>

        <div className="match-vs">
          <span>VS</span>
          <small>{match.time}</small>
        </div>

        <div className="match-team">
          <TeamLogo name={match.away} />

          <strong>
            {match.away}
          </strong>
        </div>
      </div>

      <div className="odds-grid">
        <button
          onClick={() =>
            addBet({
              matchId: match.id,
              matchName: `${match.home} vs ${match.away}`,
              market: "Match Winner",
              selection: match.home,
              odds: safeOdds(odds.home),
            })
          }
        >
          <span>1</span>
          <b>
            {safeOdds(odds.home).toFixed(2)}
          </b>
        </button>

        <button
          onClick={() =>
            addBet({
              matchId: match.id,
              matchName: `${match.home} vs ${match.away}`,
              market: "Match Winner",
              selection: "Draw",
              odds: safeOdds(odds.draw),
            })
          }
        >
          <span>X</span>
          <b>
            {safeOdds(odds.draw).toFixed(2)}
          </b>
        </button>

        <button
          onClick={() =>
            addBet({
              matchId: match.id,
              matchName: `${match.home} vs ${match.away}`,
              market: "Match Winner",
              selection: match.away,
              odds: safeOdds(odds.away),
            })
          }
        >
          <span>2</span>
          <b>
            {safeOdds(odds.away).toFixed(2)}
          </b>
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   MATCH DETAILS
   ========================================================= */

function MatchPage({ addBet }) {
  const { id } = useParams();

  const match = matches.find(
    (item) =>
      String(item.id) === String(id)
  );

  if (!match) {
    return <NotFound />;
  }

  return (
    <main className="page-container">
      <Link
        to="/sports"
        className="back-link"
      >
        ← Back to Sports
      </Link>

      <section className="match-detail-card">
        <div className="match-detail-top">
          <span>
            {match.country} • {match.league}
          </span>

          <span>
            {match.date} • {match.time}
          </span>
        </div>

        <div className="match-detail-teams">
          <div>
            <TeamLogo name={match.home} />

            <h2>
              {match.home}
            </h2>
          </div>

          <strong>VS</strong>

          <div>
            <TeamLogo name={match.away} />

            <h2>
              {match.away}
            </h2>
          </div>
        </div>
      </section>

      <section className="markets-section">
        <div className="section-heading">
          <span>
            BETTING MARKETS
          </span>

          <h2>
            Available Markets
          </h2>
        </div>

        {marketGroupsList.map(
          (group) => (
            <div
              key={group.id}
              className="market-group"
            >
              <h3>
                {group.title}
              </h3>

              <div className="market-grid">
                {group.markets.map(
                  (market) =>
                    market.selections.map(
                      (selection) => (
                        <button
                          key={`${market.id}-${selection.key}`}
                          className="market-selection"
                          onClick={() =>
                            addBet({
                              matchId: match.id,
                              matchName: `${match.home} vs ${match.away}`,
                              market:
                                market.title,
                              selection:
                                selection.name,
                              odds: safeOdds(
                                selection.odds
                              ),
                            })
                          }
                        >
                          <span>
                            {market.title}

                            <small>
                              {
                                selection.name
                              }
                            </small>
                          </span>

                          <b>
                            {safeOdds(
                              selection.odds
                            ).toFixed(2)}
                          </b>
                        </button>
                      )
                    )
                )}
              </div>
            </div>
          )
        )}
      </section>
    </main>
  );
}

/* =========================================================
   LIVE
   ========================================================= */

function LivePage({ addBet }) {
  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            LIVE SPORTS
          </span>

          <h1>
            Live Matches
          </h1>
        </div>

        <span className="live-status-badge">
          ● LIVE
        </span>
      </div>

      <div className="live-list">
        {liveMatches.map(
          (match) => (
            <article
              key={match.id}
              className="live-match-card"
            >
              <div className="live-match-header">
                <span>
                  {match.country} •{" "}
                  {match.league}
                </span>

                <strong>
                  {match.minute}
                </strong>
              </div>

              <div className="live-match-main">
                <div>
                  <TeamLogo
                    name={match.home}
                  />

                  <strong>
                    {match.home}
                  </strong>
                </div>

                <div className="live-score">
                  <b>
                    {match.score}
                  </b>

                  <span>
                    LIVE
                  </span>
                </div>

                <div>
                  <TeamLogo
                    name={match.away}
                  />

                  <strong>
                    {match.away}
                  </strong>
                </div>
              </div>

              <div className="live-actions">
                <button
                  onClick={() =>
                    addBet({
                      matchId: match.id,
                      matchName: `${match.home} vs ${match.away}`,
                      market: "Live",
                      selection:
                        match.home,
                      odds: 2.1,
                    })
                  }
                >
                  {match.home} 2.10
                </button>

                <button
                  onClick={() =>
                    addBet({
                      matchId: match.id,
                      matchName: `${match.home} vs ${match.away}`,
                      market: "Live",
                      selection: "Draw",
                      odds: 3.2,
                    })
                  }
                >
                  Draw 3.20
                </button>

                <button
                  onClick={() =>
                    addBet({
                      matchId: match.id,
                      matchName: `${match.home} vs ${match.away}`,
                      market: "Live",
                      selection:
                        match.away,
                      odds: 3.4,
                    })
                  }
                >
                  {match.away} 3.40
                </button>
              </div>
            </article>
          )
        )}
      </div>
    </main>
  );
}

/* =========================================================
   MY COUNTRY
   ========================================================= */

function MyCountryPage({ addBet }) {
  const [countryId, setCountryId] =
    useState(
      () =>
        localStorage.getItem(
          "goldenbet-country"
        ) || "iraq"
    );

  const country =
    getCountry(countryId);

  const countryMatches =
    matches.filter(
      (match) =>
        match.country.toLowerCase() ===
        String(
          country?.name || ""
        ).toLowerCase()
    );

  function changeCountry(event) {
    const value =
      event.target.value;

    setCountryId(value);

    localStorage.setItem(
      "goldenbet-country",
      value
    );
  }

  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            LOCAL SPORTS
          </span>

          <h1>
            My Country
          </h1>
        </div>
      </div>

      <div className="country-selector">
        <label>
          Select Country
        </label>

        <select
          value={countryId}
          onChange={changeCountry}
        >
          {countries.map(
            (item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.flag}{" "}
                {item.name}
              </option>
            )
          )}
        </select>
      </div>

      <section className="country-leagues">
        <div className="section-heading">
          <span>
            {country?.flag}
          </span>

          <h2>
            {country?.name} Leagues
          </h2>
        </div>

        <div className="league-list">
          {country?.leagues.map(
            (league) => (
              <div
                key={league}
                className="league-card"
              >
                <span>🏆</span>

                <strong>
                  {league}
                </strong>
              </div>
            )
          )}
        </div>
      </section>

      <section className="sports-list">
        {countryMatches.length > 0 ? (
          countryMatches.map(
            (match) => (
              <MatchCard
                key={match.id}
                match={match}
                addBet={addBet}
              />
            )
          )
        ) : (
          <div className="empty-state">
            <span>⚽</span>

            <h3>
              No local matches
            </h3>

            <p>
              More matches will appear
              here when available.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   CASINO
   ========================================================= */

function CasinoPage() {
  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            GOLDENBET
          </span>

          <h1>Casino</h1>
        </div>
      </div>

      <div className="casino-grid">
        {casinoGames.map(
          (game) => (
            <Link
              key={game.id}
              to="/casino/vip"
              className="casino-card"
            >
              <img
                src={game.image}
                alt={game.name}
              />

              <div className="casino-card-overlay">
                <span>
                  {game.category}
                </span>

                <strong>
                  {game.name}
                </strong>

                <b>
                  Play Now
                </b>
              </div>
            </Link>
          )
        )}
      </div>
    </main>
  );
}

/* =========================================================
   LIVE CASINO
   ========================================================= */

function LiveCasinoPage() {
  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            LIVE DEALERS
          </span>

          <h1>
            Live Casino
          </h1>
        </div>
      </div>

      <div className="provider-grid">
        {liveCasinoGames.map(
          (provider) => (
            <Link
              key={provider}
              to="/casino/vip"
              className="provider-card"
            >
              <span>🎰</span>

              <strong>
                {provider}
              </strong>

              <small>
                Explore Games
              </small>
            </Link>
          )
        )}
      </div>
    </main>
  );
}

/* =========================================================
   GOLDEN GAMES
   ========================================================= */

function GoldenGamesPage() {
  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            GOLDENBET ORIGINALS
          </span>

          <h1>
            Golden Games
          </h1>
        </div>
      </div>

      <div className="golden-games-grid">
        {goldenGames.map(
          (game) => (
            <div
              key={game}
              className="golden-game-card"
            >
              <div className="golden-game-icon">
                ✨
              </div>

              <strong>
                {game}
              </strong>

              <span>
                Play Demo
              </span>
            </div>
          )
        )}
      </div>
    </main>
  );
}

/* =========================================================
   CASINO VIP
   ========================================================= */

function CasinoVipPage() {
  return (
    <main className="page-container">
      <div className="casino-vip-banner">
        <span>
          GOLDENBET VIP
        </span>

        <h1>
          Premium Casino
        </h1>

        <p>
          Premium casino content and
          live gaming experience.
        </p>
      </div>

      <div className="empty-state">
        <span>🎰</span>

        <h3>
          Casino Integration Ready
        </h3>

        <p>
          Licensed casino provider
          integration can be connected
          here.
        </p>
      </div>
    </main>
  );
}

/* =========================================================
   BET SLIP
   ========================================================= */

function BetSlip({
  bets,
  removeBet,
  clearBets,
  session,
}) {
  const navigate =
    useNavigate();

  const totalOdds =
    bets.length > 0
      ? bets.reduce(
          (total, bet) =>
            total *
            safeOdds(
              bet.odds
            ),
          1
        )
      : 0;

  const [
    stake,
    setStake,
  ] = useState("");

  const potentialWin =
    Number(stake || 0) *
    totalOdds;

  async function placeBet() {
    if (!session?.user?.id) {
      alert(
        "Please login first."
      );

      navigate("/login");

      return;
    }

    if (!bets.length) {
      alert(
        "Your bet slip is empty."
      );

      return;
    }

    if (
      !Number(stake) ||
      Number(stake) <= 0
    ) {
      alert(
        "Enter a valid stake."
      );

      return;
    }

    try {
      const matchNames =
        bets
          .map(
            (bet) =>
              bet.matchName
          )
          .join(" | ");

      const {
        error,
      } = await supabase
        .from("bets")
        .insert({
          user_id:
            session.user.id,

          match_name:
            matchNames,

          selection:
            bets,

          stake:
            Number(stake),

          potential_win:
            Number(
              potentialWin.toFixed(
                2
              )
            ),

          total_odds:
            Number(
              totalOdds.toFixed(
                2
              )
            ),

          status:
            "pending",
        });

      if (error) {
        throw error;
      }

      alert(
        "Bet placed successfully."
      );

      clearBets();
      setStake("");
    } catch (error) {
      console.error(
        error
      );

      alert(
        error?.message ||
          "Could not place the bet."
      );
    }
  }

  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            GOLDENBET
          </span>

          <h1>
            Bet Slip
          </h1>
        </div>

        {bets.length > 0 && (
          <button
            className="danger-button"
            onClick={clearBets}
          >
            Clear
          </button>
        )}
      </div>

      {bets.length === 0 ? (
        <div className="empty-state">
          <span>🎟️</span>

          <h3>
            Your Bet Slip is Empty
          </h3>

          <p>
            Select odds from Sports
            to add bets.
          </p>

          <Link
            to="/sports"
            className="golden-primary-button"
          >
            Browse Sports
          </Link>
        </div>
      ) : (
        <section className="bet-slip-card">
          <div className="bet-slip-items">
            {bets.map(
              (bet, index) => (
                <div
                  key={`${bet.matchId}-${bet.selection}-${index}`}
                  className="bet-slip-item"
                >
                  <div>
                    <strong>
                      {bet.matchName}
                    </strong>

                    <span>
                      {bet.market}
                    </span>

                    <small>
                      {bet.selection}
                    </small>
                  </div>

                  <div className="bet-slip-odd">
                    <b>
                      {safeOdds(
                        bet.odds
                      ).toFixed(2)}
                    </b>

                    <button
                      onClick={() =>
                        removeBet(
                          index
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="bet-slip-summary">
            <div>
              <span>
                Selections
              </span>

              <strong>
                {bets.length}
              </strong>
            </div>

            <div>
              <span>
                Total Odds
              </span>

              <strong>
                {totalOdds.toFixed(
                  2
                )}
              </strong>
            </div>

            <label>
              <span>
                Stake
              </span>

              <input
                type="number"
                min="0"
                step="1"
                value={stake}
                onChange={(event) =>
                  setStake(
                    event.target
                      .value
                  )
                }
                placeholder="0"
              />
            </label>

            <div>
              <span>
                Potential Return
              </span>

              <strong>
                {potentialWin.toFixed(
                  2
                )}
              </strong>
            </div>

            <button
              className="golden-primary-button full-width"
              onClick={
                placeBet
              }
            >
              Place Bet
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

/* =========================================================
   PROMOTIONS
   ========================================================= */

function Promotions() {
  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            GOLDENBET OFFERS
          </span>

          <h1>
            Promotions
          </h1>
        </div>
      </div>

      <div className="promotion-grid">
        <div className="promotion-card">
          <span>🎁</span>

          <h2>
            Welcome Bonus
          </h2>

          <p>
            Special offers for new
            GoldenBet members.
          </p>
        </div>

        <div className="promotion-card">
          <span>⚽</span>

          <h2>
            Football Promotion
          </h2>

          <p>
            Follow your favorite
            football leagues.
          </p>
        </div>

        <div className="promotion-card">
          <span>🎰</span>

          <h2>
            Casino Offers
          </h2>

          <p>
            Premium casino promotions
            and events.
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   LOGIN
   ========================================================= */

function Login({ onLogin }) {
  const navigate =
    useNavigate();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  async function submit(
    event
  ) {
    event.preventDefault();

    setLoading(true);

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    setLoading(false);

    if (error) {
      alert(
        error.message
      );

      return;
    }

    onLogin(
      data.session
    );

    navigate("/");
  }

  return (
    <main className="auth-page">
      <form
        className="auth-card"
        onSubmit={submit}
      >
        <div className="auth-logo">
          GOLDENBET
        </div>

        <h1>
          Login
        </h1>

        <p>
          Welcome back to GoldenBet.
        </p>

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(
              event.target
                .value
            )
          }
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target
                .value
            )
          }
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="golden-primary-button full-width"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>
      </form>
    </main>
  );
}

/* =========================================================
   REGISTER
   ========================================================= */

function Register({
  onRegister,
}) {
  const navigate =
    useNavigate();

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    country,
    setCountry,
  ] = useState("Iraq");

  const [
    loading,
    setLoading,
  ] = useState(false);

  async function submit(
    event
  ) {
    event.preventDefault();

    setLoading(true);

    const {
      data,
      error,
    } =
      await supabase.auth.signUp(
        {
          email,
          password,

          options: {
            data: {
              username,
              full_name:
                fullName,
              country,
            },
          },
        }
      );

    if (error) {
      setLoading(false);

      alert(
        error.message
      );

      return;
    }

    if (data.user) {
      const {
        error:
          profileError,
      } =
        await supabase
          .from(
            "profiles"
          )
          .upsert({
            id: data.user.id,
            username,
            full_name:
              fullName,
            country,
            balance: 0,
          });

      if (profileError) {
        console.error(
          profileError
        );
      }
    }

    setLoading(false);

    if (data.session) {
      onRegister(
        data.session
      );

      navigate("/");
    } else {
      alert(
        "Account created. Please check your email if confirmation is required."
      );

      navigate("/login");
    }
  }

  return (
    <main className="auth-page">
      <form
        className="auth-card"
        onSubmit={submit}
      >
        <div className="auth-logo">
          GOLDENBET
        </div>

        <h1>
          Create Account
        </h1>

        <p>
          Join GoldenBet today.
        </p>

        <input
          value={username}
          onChange={(event) =>
            setUsername(
              event.target
                .value
            )
          }
          placeholder="Username"
          required
        />

        <input
          value={fullName}
          onChange={(event) =>
            setFullName(
              event.target
                .value
            )
          }
          placeholder="Full Name"
        />

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(
              event.target
                .value
            )
          }
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target
                .value
            )
          }
          placeholder="Password"
          minLength={6}
          required
        />

        <select
          value={country}
          onChange={(event) =>
            setCountry(
              event.target
                .value
            )
          }
        >
          {countries.map(
            (item) => (
              <option
                key={item.id}
                value={item.name}
              >
                {item.flag}{" "}
                {item.name}
              </option>
            )
          )}
        </select>

        <button
          type="submit"
          className="golden-primary-button full-width"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

/* =========================================================
   PROFILE
   ========================================================= */

function Profile({
  session,
}) {
  const [
    profile,
    setProfile,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    country,
    setCountry,
  ] = useState("Iraq");

  const [
    saving,
    setSaving,
  ] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const {
        data,
        error,
      } =
        await supabase
          .from("profiles")
          .select(
            "id, username, full_name, avatar_text, balance, country"
          )
          .eq(
            "id",
            session.user.id
          )
          .maybeSingle();

      if (!error && data) {
        setProfile(data);

        setCountry(
          data.country ||
            "Iraq"
        );
      }

      setLoading(false);
    }

    loadProfile();
  }, [session]);

  async function saveCountry() {
    if (!session?.user?.id) {
      return;
    }

    setSaving(true);

    const {
      error,
    } =
      await supabase
        .from("profiles")
        .update({
          country,

          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          session.user.id
        );

    setSaving(false);

    if (error) {
      alert(
        error.message
      );

      return;
    }

    setProfile(
      (current) => ({
        ...(current || {}),
        country,
      })
    );

    alert(
      "Profile updated."
    );
  }

  if (!session) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <span>👤</span>

          <h3>
            Login Required
          </h3>

          <Link
            to="/login"
            className="golden-primary-button"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="page-container">
        <div className="loading-state">
          Loading profile...
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            ACCOUNT
          </span>

          <h1>
            Profile
          </h1>
        </div>
      </div>

      <section className="profile-card">
        <div className="profile-avatar">
          {profile?.avatar_text ||
            profile?.username
              ?.slice(0, 1)
              ?.toUpperCase() ||
            "G"}
        </div>

        <div className="profile-info">
          <h2>
            {profile?.username ||
              "GoldenBet User"}
          </h2>

          <p>
            {session.user.email}
          </p>

          <span>
            Balance:{" "}
            {Number(
              profile?.balance ||
                0
            ).toFixed(2)}{" "}
            IQD
          </span>
        </div>
      </section>

      <section className="settings-card">
        <h2>
          Country
        </h2>

        <select
          value={country}
          onChange={(event) =>
            setCountry(
              event.target
                .value
            )
          }
        >
          {countries.map(
            (item) => (
              <option
                key={item.id}
                value={item.name}
              >
                {item.flag}{" "}
                {item.name}
              </option>
            )
          )}
        </select>

        <button
          className="golden-primary-button"
          onClick={
            saveCountry
          }
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Country"}
        </button>
      </section>
    </main>
  );
}

/* =========================================================
   BALANCE
   ========================================================= */

function Balance({
  session,
}) {
  const [
    balance,
    setBalance,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    async function loadBalance() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const {
        data,
      } =
        await supabase
          .from("profiles")
          .select(
            "balance"
          )
          .eq(
            "id",
            session.user.id
          )
          .maybeSingle();

      setBalance(
        Number(
          data?.balance ||
            0
        )
      );

      setLoading(false);
    }

    loadBalance();
  }, [session]);

  if (!session) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <span>💰</span>

          <h3>
            Login Required
          </h3>

          <Link
            to="/login"
            className="golden-primary-button"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            ACCOUNT
          </span>

          <h1>
            Balance
          </h1>
        </div>
      </div>

      <div className="balance-card">
        <span>
          Available Balance
        </span>

        <strong>
          {loading
            ? "Loading..."
            : balance.toFixed(2)}
        </strong>

        <small>
          IQD
        </small>
      </div>

      <div className="account-actions">
        <Link
          to="/deposit"
          className="golden-primary-button"
        >
          Deposit
        </Link>

        <Link
          to="/withdraw"
          className="golden-secondary-button"
        >
          Withdraw
        </Link>
      </div>
    </main>
  );
}

/* =========================================================
   DEPOSIT
   ========================================================= */

function Deposit() {
  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            ACCOUNT
          </span>

          <h1>
            Deposit
          </h1>
        </div>
      </div>

      <PaymentCard />
    </main>
  );
}

/* =========================================================
   WITHDRAW
   ========================================================= */

function Withdraw({
  session,
}) {
  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            ACCOUNT
          </span>

          <h1>
            Withdraw
          </h1>
        </div>
      </div>

      {!session ? (
        <div className="empty-state">
          <span>💳</span>

          <h3>
            Login Required
          </h3>

          <Link
            to="/login"
            className="golden-primary-button"
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="settings-card">
          <h2>
            Withdraw Funds
          </h2>

          <p>
            Secure withdrawal processing
            will be connected through
            the backend payment system.
          </p>

          <input
            type="number"
            placeholder="Amount IQD"
            min="0"
          />

          <select defaultValue="">
            <option
              value=""
              disabled
            >
              Select method
            </option>

            <option>
              Zain Cash
            </option>

            <option>
              Asiacell
            </option>

            <option>
              Korek
            </option>

            <option>
              FIB
            </option>

            <option>
              FastPay
            </option>

            <option>
              Qi Card
            </option>
          </select>

          <button
            className="golden-primary-button"
            onClick={() =>
              alert(
                "Withdrawal backend integration is required."
              )
            }
          >
            Request Withdrawal
          </button>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   MY BETS
   ========================================================= */

function MyBets({
  session,
}) {
  const [
    bets,
    setBets,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    async function loadBets() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const {
        data,
        error,
      } =
        await supabase
          .from("bets")
          .select("*")
          .eq(
            "user_id",
            session.user.id
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (!error) {
        setBets(
          data || []
        );
      }

      setLoading(false);
    }

    loadBets();
  }, [session]);

  if (!session) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <span>🎟️</span>

          <h3>
            Login Required
          </h3>

          <Link
            to="/login"
            className="golden-primary-button"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            ACCOUNT
          </span>

          <h1>
            My Bets
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          Loading bets...
        </div>
      ) : bets.length === 0 ? (
        <div className="empty-state">
          <span>🎟️</span>

          <h3>
            No Bets Yet
          </h3>

          <p>
            Your placed bets will
            appear here.
          </p>
        </div>
      ) : (
        <div className="my-bets-list">
          {bets.map(
            (bet) => (
              <div
                key={bet.id}
                className="my-bet-card"
              >
                <div>
                  <strong>
                    {bet.match_name}
                  </strong>

                  <span>
                    {new Date(
                      bet.created_at
                    ).toLocaleString()}
                  </span>
                </div>

                <div>
                  <small>
                    Odds
                  </small>

                  <b>
                    {Number(
                      bet.total_odds ||
                        0
                    ).toFixed(2)}
                  </b>
                </div>

                <div>
                  <small>
                    Stake
                  </small>

                  <b>
                    {Number(
                      bet.stake ||
                        0
                    ).toFixed(2)}
                  </b>
                </div>

                <div>
                  <small>
                    Potential Win
                  </small>

                  <b>
                    {Number(
                      bet.potential_win ||
                        0
                    ).toFixed(2)}
                  </b>
                </div>

                <span
                  className={`bet-status status-${String(
                    bet.status ||
                      "pending"
                  ).toLowerCase()}`}
                >
                  {bet.status ||
                    "pending"}
                </span>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */

function Settings() {
  const [
    darkMode,
    setDarkMode,
  ] = useState(
    () =>
      localStorage.getItem(
        "goldenbet-dark"
      ) !== "false"
  );

  useEffect(() => {
    localStorage.setItem(
      "goldenbet-dark",
      String(darkMode)
    );

    document.documentElement.dataset.theme =
      darkMode
        ? "dark"
        : "light";
  }, [darkMode]);

  return (
    <main className="page-container">
      <div className="page-title">
        <div>
          <span className="page-kicker">
            ACCOUNT
          </span>

          <h1>
            Settings
          </h1>
        </div>
      </div>

      <section className="settings-card">
        <div className="setting-row">
          <div>
            <strong>
              Dark Mode
            </strong>

            <span>
              Use the GoldenBet
              dark interface.
            </span>
          </div>

          <button
            className={`toggle-button ${
              darkMode
                ? "active"
                : ""
            }`}
            onClick={() =>
              setDarkMode(
                (value) =>
                  !value
              )
            }
          >
            {darkMode
              ? "ON"
              : "OFF"}
          </button>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              Language
            </strong>

            <span>
              Language selection
              is available in
              application settings.
            </span>
          </div>

          <span className="setting-value">
            English
          </span>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              Currency
            </strong>

            <span>
              Default account
              currency.
            </span>
          </div>

          <span className="setting-value">
            IQD
          </span>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   MOBILE NAV
   ========================================================= */

function MobileBottomNav({
  bets,
}) {
  return (
    <nav className="mobile-bottom-nav">
      <Link to="/sports">
        <span>⚽</span>
        <small>
          Sports
        </small>
      </Link>

      <Link to="/bet-slip">
        <span>
          🎟️

          {bets.length > 0 && (
            <b>
              {bets.length}
            </b>
          )}
        </span>

        <small>
          Coupons
        </small>
      </Link>

      <Link to="/golden-games">
        <span>🎮</span>

        <small>
          Golden Games
        </small>
      </Link>

      <Link to="/casino">
        <span>🎰</span>

        <small>
          Casino
        </small>
      </Link>
    </nav>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        GOLDENBET
      </div>

      <div className="footer-links">
        <Link to="/sports">
          Sports
        </Link>

        <Link to="/casino">
          Casino
        </Link>

        <Link to="/live">
          Live
        </Link>

        <Link to="/promotions">
          Promotions
        </Link>

        <Link to="/profile">
          Profile
        </Link>
      </div>

      <p>
        GoldenBet demo platform.
        Real-money services require
        secure backend integrations
        and applicable licensing.
      </p>
    </footer>
  );
}

/* =========================================================
   404
   ========================================================= */

function NotFound() {
  return (
    <main className="page-container">
      <div className="empty-state">
        <span>
          404
        </span>

        <h1>
          Page Not Found
        </h1>

        <p>
          The page you requested
          does not exist.
        </p>

        <Link
          to="/"
          className="golden-primary-button"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const location =
    useLocation();

  const [
    session,
    setSession,
  ] = useState(null);

  const [
    authLoading,
    setAuthLoading,
  ] = useState(true);

  const [
    bets,
    setBets,
  ] = useState(() => {
    try {
      const saved =
        localStorage.getItem(
          "goldenbet-bets"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    } catch {
      return [];
    }
  });

  /* =====================================================
     SAVE BET SLIP
     ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "goldenbet-bets",
      JSON.stringify(bets)
    );
  }, [bets]);

  /* =====================================================
     SUPABASE SESSION
     ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const {
        data: {
          session:
            currentSession,
        },
      } =
        await supabase.auth.getSession();

      if (mounted) {
        setSession(
          currentSession
        );

        setAuthLoading(
          false
        );
      }
    }

    loadSession();

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        (
          _event,
          currentSession
        ) => {
          setSession(
            currentSession
          );

          setAuthLoading(
            false
          );
        }
      );

    return () => {
      mounted = false;

      subscription.unsubscribe();
    };
  }, []);

  /* =====================================================
     ADD BET
     ===================================================== */

  function addBet(bet) {
    setBets(
      (current) => {
        const alreadyExists =
          current.some(
            (item) =>
              String(
                item.matchId
              ) ===
                String(
                  bet.matchId
                ) &&
              item.selection ===
                bet.selection &&
              item.market ===
                bet.market
          );

        if (alreadyExists) {
          alert(
            "This selection is already in your bet slip."
          );

          return current;
        }

        if (
          current.length >=
          20
        ) {
          alert(
            "Maximum 20 selections allowed."
          );

          return current;
        }

        return [
          ...current,
          {
            ...bet,
            odds: safeOdds(
              bet.odds
            ),
          },
        ];
      }
    );
  }

  /* =====================================================
     REMOVE BET
     ===================================================== */

  function removeBet(
    index
  ) {
    setBets(
      (current) =>
        current.filter(
          (_, itemIndex) =>
            itemIndex !==
            index
        )
    );
  }

  /* =====================================================
     CLEAR BETS
     ===================================================== */

  function clearBets() {
    setBets([]);
  }

  /* =====================================================
     LOGOUT
     ===================================================== */

  async function logout() {
    await supabase.auth.signOut();

    setSession(null);
  }

  /* =====================================================
     AUTH LOADING
     ===================================================== */

  if (authLoading) {
    return (
      <div className="app-loading">
        <div className="loading-logo">
          GOLDENBET
        </div>

        <span>
          Loading...
        </span>
      </div>
    );
  }

  const isHome =
    location.pathname === "/";

  /* =====================================================
     APP UI
     ===================================================== */

  return (
    <div className="app">
      {!isHome && (
        <GoldenBetHeader
          bets={bets}
        />
      )}

      {!isHome && session && (
        <div className="account-bar">
          <Link to="/profile">
            👤{" "}
            {session.user.email}
          </Link>

          <div>
            <Link to="/balance">
              💰 Balance
            </Link>

            <button
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <Routes>
        {/* HOME */}

        <Route
          path="/"
          element={
            <Home
              session={session}
            />
          }
        />

        {/* SPORTS */}

        <Route
          path="/sports"
          element={
            <SportsPage
              addBet={addBet}
            />
          }
        />

        <Route
          path="/sports/:sport"
          element={
            <SportsPage
              addBet={addBet}
            />
          }
        />

        {/* MATCH */}

        <Route
          path="/match/:id"
          element={
            <MatchPage
              addBet={addBet}
            />
          }
        />

        {/* LIVE */}

        <Route
          path="/live"
          element={
            <LivePage
              addBet={addBet}
            />
          }
        />

        {/* COUNTRY */}

        <Route
          path="/my-country"
          element={
            <MyCountryPage
              addBet={addBet}
            />
          }
        />

        {/* CASINO */}

        <Route
          path="/casino"
          element={
            <CasinoPage />
          }
        />

        <Route
          path="/casino/live"
          element={
            <LiveCasinoPage />
          }
        />

        <Route
          path="/casino/vip"
          element={
            <CasinoVipPage />
          }
        />

        <Route
          path="/live-casino"
          element={
            <LiveCasinoPage />
          }
        />

        {/* GOLDEN GAMES */}

        <Route
          path="/golden-games"
          element={
            <GoldenGamesPage />
          }
        />

        {/* BET SLIP */}

        <Route
          path="/bet-slip"
          element={
            <BetSlip
              bets={bets}
              removeBet={
                removeBet
              }
              clearBets={
                clearBets
              }
              session={
                session
              }
            />
          }
        />

        {/* PROMOTIONS */}

        <Route
          path="/promotions"
          element={
            <Promotions />
          }
        />

        {/* AUTH */}

        <Route
          path="/login"
          element={
            <Login
              onLogin={(
                newSession
              ) =>
                setSession(
                  newSession
                )
              }
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              onRegister={(
                newSession
              ) =>
                setSession(
                  newSession
                )
              }
            />
          }
        />

        {/* ACCOUNT */}

        <Route
          path="/profile"
          element={
            <Profile
              session={
                session
              }
            />
          }
        />

        <Route
          path="/balance"
          element={
            <Balance
              session={
                session
              }
            />
          }
        />

        <Route
          path="/deposit"
          element={
            <Deposit />
          }
        />

        <Route
          path="/withdraw"
          element={
            <Withdraw
              session={
                session
              }
            />
          }
        />

        <Route
          path="/my-bets"
          element={
            <MyBets
              session={
                session
              }
            />
          }
        />

        <Route
          path="/settings"
          element={
            <Settings />
          }
        />

        {/* ADMIN */}

        <Route
          path="/super-admin"
          element={
            <AdminDashboard />
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={
            <NotFound />
          }
        />
      </Routes>

      {!isHome && (
        <Footer />
      )}

      {!isHome && (
        <MobileBottomNav
          bets={bets}
        />
      )}
    </div>
  );
}
