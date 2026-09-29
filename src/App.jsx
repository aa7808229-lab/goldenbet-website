import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import { LanguageContext } from "./main";
import { t } from "./translations";
import AdminDashboard from "./AdminDashboard";
import { marketGroups } from "./markets";
import PaymentCard from "./PaymentCard";
import GoldenBetHeader from "./GoldenBetHeader";
import { supabase } from "../lib/supabase";

/* =========================================================
   GOLDENBET DATA
========================================================= */

const sports = [
  "Football",
  "Tennis",
  "Basketball",
  "Volleyball",
  "Ice Hockey",
  "Cricket",
  "Boxing",
  "MMA",
  "Esports",
  "Table Tennis",
  "Formula 1",
  "Horse Racing",
  "Handball",
  "Rugby",
  "Baseball",
  "American Football",
  "Darts",
  "Golf",
  "Cycling",
];

const sportsCountries = [
  {
    name: "Iraq",
    flag: "🇮🇶",
    leagues: [
      "Iraq Stars League",
      "Iraq Premier League",
      "Kurdistan Premier League",
      "Kurdistan Regional League",
    ],
  },
  {
    name: "England",
    flag: "🏴",
    leagues: [
      "Premier League",
      "Championship",
      "League One",
      "League Two",
    ],
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    leagues: [
      "La Liga",
      "La Liga 2",
      "Primera RFEF",
    ],
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    leagues: [
      "Serie A",
      "Serie B",
      "Serie C",
    ],
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    leagues: [
      "Bundesliga",
      "2. Bundesliga",
      "3. Liga",
    ],
  },
  {
    name: "France",
    flag: "🇫🇷",
    leagues: [
      "Ligue 1",
      "Ligue 2",
      "National",
    ],
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    leagues: [
      "Super Lig",
      "1. Lig",
    ],
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    leagues: [
      "Saudi Pro League",
      "Saudi First Division",
    ],
  },
  {
    name: "UAE",
    flag: "🇦🇪",
    leagues: [
      "UAE Pro League",
      "UAE First Division",
    ],
  },
  {
    name: "Qatar",
    flag: "🇶🇦",
    leagues: [
      "Qatar Stars League",
      "Qatar Second Division",
    ],
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    leagues: [
      "Eredivisie",
      "Eerste Divisie",
    ],
  },
  {
    name: "Portugal",
    flag: "🇵🇹",
    leagues: [
      "Primeira Liga",
      "Liga Portugal 2",
    ],
  },
  {
    name: "Belgium",
    flag: "🇧🇪",
    leagues: [
      "Belgian Pro League",
      "Challenger Pro League",
    ],
  },
  {
    name: "Scotland",
    flag: "🏴",
    leagues: [
      "Scottish Premiership",
      "Scottish Championship",
    ],
  },
  {
    name: "Greece",
    flag: "🇬🇷",
    leagues: [
      "Super League Greece",
      "Super League 2",
    ],
  },
  {
    name: "USA",
    flag: "🇺🇸",
    leagues: [
      "MLS",
      "USL Championship",
    ],
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    leagues: [
      "Brasileirão Serie A",
      "Brasileirão Serie B",
    ],
  },
  {
    name: "Argentina",
    flag: "🇦🇷",
    leagues: [
      "Liga Profesional",
      "Primera Nacional",
    ],
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    leagues: [
      "Liga MX",
      "Liga de Expansion",
    ],
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    leagues: [
      "J1 League",
      "J2 League",
    ],
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    leagues: [
      "K League 1",
      "K League 2",
    ],
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    leagues: [
      "A-League",
    ],
  },
  {
    name: "International",
    flag: "🌍",
    leagues: [
      "UEFA Champions League",
      "UEFA Europa League",
      "UEFA Conference League",
      "World Cup",
      "International Friendlies",
    ],
  },
];

/* =========================================================
   CASINO
========================================================= */

const casinoCategories = [
  "All Games",
  "Slots",
  "Roulette",
  "Blackjack",
  "Baccarat",
  "Poker",
  "Crash Games",
  "Jackpot",
  "Game Shows",
  "Arcade",
  "Table Games",
  "Instant Games",
];

const liveCasinoCategories = [
  "All Live Games",
  "Evolution",
  "Ezugi",
  "Pragmatic Play Live",
  "TVBet",
  "Live Roulette",
  "Live Blackjack",
  "Live Baccarat",
  "Live Poker",
  "Live Game Shows",
  "Live Dragon Tiger",
  "Live Sic Bo",
  "Live Wheel",
];

const casinoGames = [
  {
    name: "Golden Fortune",
    category: "Slots",
    image: "🎰",
  },
  {
    name: "Golden Roulette",
    category: "Roulette",
    image: "🎡",
  },
  {
    name: "Golden Blackjack",
    category: "Blackjack",
    image: "🃏",
  },
  {
    name: "Golden Baccarat",
    category: "Baccarat",
    image: "♠️",
  },
  {
    name: "Golden Poker",
    category: "Poker",
    image: "♣️",
  },
  {
    name: "Golden Crash",
    category: "Crash Games",
    image: "🚀",
  },
  {
    name: "Golden Jackpot",
    category: "Jackpot",
    image: "💰",
  },
  {
    name: "Golden Wheel",
    category: "Game Shows",
    image: "🎡",
  },
  {
    name: "Golden Dice",
    category: "Table Games",
    image: "🎲",
  },
  {
    name: "Golden Arcade",
    category: "Arcade",
    image: "🕹️",
  },
  {
    name: "Golden Cards",
    category: "Instant Games",
    image: "🃏",
  },
  {
    name: "Golden Mines",
    category: "Instant Games",
    image: "💎",
  },
];

const liveGames = [
  {
    name: "Live Roulette",
    provider: "Evolution",
    category: "Live Roulette",
    image: "🎡",
  },
  {
    name: "Live Blackjack",
    provider: "Evolution",
    category: "Live Blackjack",
    image: "🃏",
  },
  {
    name: "Live Baccarat",
    provider: "Ezugi",
    category: "Live Baccarat",
    image: "♠️",
  },
  {
    name: "Live Game Show",
    provider: "Pragmatic Play Live",
    category: "Live Game Shows",
    image: "🎤",
  },
  {
    name: "Live Dragon Tiger",
    provider: "Evolution",
    category: "Live Dragon Tiger",
    image: "🐉",
  },
  {
    name: "Live Sic Bo",
    provider: "Ezugi",
    category: "Live Sic Bo",
    image: "🎲",
  },
  {
    name: "Live Wheel",
    provider: "TVBet",
    category: "Live Wheel",
    image: "🎡",
  },
  {
    name: "Live Poker",
    provider: "Evolution",
    category: "Live Poker",
    image: "♣️",
  },
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
   FOOTBALL MATCHES
========================================================= */

const matches = [
  {
    id: 1,
    home: "Real Madrid",
    away: "Barcelona",
    homeCode: "RMA",
    awayCode: "BAR",
    time: "21:00",
    date: "Today",
    league: "La Liga",
    country: "Spain",
  },
  {
    id: 2,
    home: "Arsenal",
    away: "Chelsea",
    homeCode: "ARS",
    awayCode: "CHE",
    time: "20:30",
    date: "Today",
    league: "Premier League",
    country: "England",
  },
  {
    id: 3,
    home: "Inter Milan",
    away: "AC Milan",
    homeCode: "INT",
    awayCode: "ACM",
    time: "21:45",
    date: "Today",
    league: "Serie A",
    country: "Italy",
  },
  {
    id: 4,
    home: "Bayern Munich",
    away: "Dortmund",
    homeCode: "BAY",
    awayCode: "BVB",
    time: "22:00",
    date: "Today",
    league: "Bundesliga",
    country: "Germany",
  },
  {
    id: 5,
    home: "Al-Shorta",
    away: "Al-Zawraa",
    homeCode: "ALS",
    awayCode: "ALZ",
    time: "19:30",
    date: "Today",
    league: "Iraq Stars League",
    country: "Iraq",
  },
  {
    id: 6,
    home: "Duhok",
    away: "Erbil",
    homeCode: "DUH",
    awayCode: "ERB",
    time: "20:00",
    date: "Today",
    league: "Kurdistan Premier League",
    country: "Iraq",
  },
  {
    id: 7,
    home: "Liverpool",
    away: "Manchester City",
    homeCode: "LIV",
    awayCode: "MCI",
    time: "20:00",
    date: "Today",
    league: "Premier League",
    country: "England",
  },
  {
    id: 8,
    home: "Manchester United",
    away: "Tottenham",
    homeCode: "MUN",
    awayCode: "TOT",
    time: "21:00",
    date: "Today",
    league: "Premier League",
    country: "England",
  },
  {
    id: 9,
    home: "Juventus",
    away: "Napoli",
    homeCode: "JUV",
    awayCode: "NAP",
    time: "21:45",
    date: "Today",
    league: "Serie A",
    country: "Italy",
  },
  {
    id: 10,
    home: "PSG",
    away: "Marseille",
    homeCode: "PSG",
    awayCode: "OM",
    time: "22:00",
    date: "Today",
    league: "Ligue 1",
    country: "France",
  },
  {
    id: 11,
    home: "Galatasaray",
    away: "Fenerbahce",
    homeCode: "GAL",
    awayCode: "FEN",
    time: "20:00",
    date: "Today",
    league: "Super Lig",
    country: "Turkey",
  },
  {
    id: 12,
    home: "Al-Hilal",
    away: "Al-Nassr",
    homeCode: "HIL",
    awayCode: "NAS",
    time: "21:00",
    date: "Today",
    league: "Saudi Pro League",
    country: "Saudi Arabia",
  },
  {
    id: 13,
    home: "Ajax",
    away: "PSV",
    homeCode: "AJA",
    awayCode: "PSV",
    time: "19:45",
    date: "Today",
    league: "Eredivisie",
    country: "Netherlands",
  },
  {
    id: 14,
    home: "Benfica",
    away: "Porto",
    homeCode: "BEN",
    awayCode: "POR",
    time: "21:15",
    date: "Today",
    league: "Primeira Liga",
    country: "Portugal",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getSelectionStatus(bet) {
  return (
    bet?.result ||
    bet?.selectionResult ||
    "pending"
  );
}

function getStatusIcon(status) {
  if (status === "won") return "🟢";
  if (status === "lost") return "🔴";
  return "🟡";
}

function getStatusColor(status) {
  if (status === "won") return "#35d06f";
  if (status === "lost") return "#ff4d4f";
  return "#f2c94c";
}

function getStatusLabel(status) {
  if (status === "won") return "WON";
  if (status === "lost") return "LOST";
  return "PENDING";
}

/* =========================================================
   TEAM LOGO
========================================================= */

function TeamLogo({
  name,
  code,
  src,
  size = 48,
}) {
  const [failed, setFailed] =
    useState(false);

  const initials =
    code ||
    name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 3)
      .join("")
      .toUpperCase();

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        title={name}
        onError={() =>
          setFailed(true)
        }
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          borderRadius: "14px",
          background: "#111",
          border:
            "1px solid rgba(212,175,55,.45)",
          padding: "5px",
          flex: "0 0 auto",
        }}
      />
    );
  }

  return (
    <div
      title={name}
      aria-label={name}
      style={{
        width: size,
        height: size,
        borderRadius:
          "14px 14px 18px 18px",
        background:
          "linear-gradient(145deg, rgba(212,175,55,.32), rgba(8,8,8,.98))",
        border:
          "1px solid rgba(212,175,55,.55)",
        display: "grid",
        placeItems: "center",
        color: "#f6d66a",
        fontWeight: 900,
        fontSize: size * 0.25,
        boxShadow:
          "0 0 18px rgba(212,175,55,.15)",
        flex: "0 0 auto",
      }}
    >
      {initials}
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const {
    language,
    setLanguage,
  } = useContext(LanguageContext);

  const [bets, setBets] = useState([]);
  const [session, setSession] =
    useState(null);
  const [authLoading, setAuthLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const {
        data,
        error,
      } =
        await supabase.auth.getSession();

      if (error) {
        console.error(
          "Session error:",
          error
        );
      }

      if (mounted) {
        setSession(
          data?.session ?? null
        );
        setAuthLoading(false);
      }
    }

    loadSession();

    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          setSession(newSession);
          setAuthLoading(false);
        }
      );

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  function addBet(bet) {
    setBets((current) => {
      const sameMarket =
        current.find(
          (item) =>
            item.matchId ===
              bet.matchId &&
            item.marketId ===
              bet.marketId
        );

      if (sameMarket) {
        return current.map(
          (item) =>
            item.matchId ===
              bet.matchId &&
            item.marketId ===
              bet.marketId
              ? bet
              : item
        );
      }

      const uniqueMatchIds =
        new Set(
          current.map(
            (item) => item.matchId
          )
        );

      if (
        !uniqueMatchIds.has(
          bet.matchId
        ) &&
        uniqueMatchIds.size >= 20
      ) {
        alert(
          "Maximum 20 matches allowed in the Bet Slip."
        );

        return current;
      }

      return [...current, bet];
    });
  }

  function removeBet(id) {
    setBets((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  function clearBets() {
    setBets([]);
  }

  async function logout() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    setSession(null);
    setBets([]);
  }

  if (authLoading) {
    return (
      <div className="app">
        <div className="page section">
          <div className="empty-state">
            <h2>
              Loading GoldenBet...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <GoldenBetHeader
        bets={bets}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                bets={bets}
                addBet={addBet}
                removeBet={removeBet}
                clearBets={clearBets}
                session={session}
              />
            }
          />

          <Route
            path="/sports"
            element={
              <Sports
                bets={bets}
                addBet={addBet}
              />
            }
          />

          <Route
            path="/bet-slip"
            element={
              <BetSlipPage
                bets={bets}
                removeBet={removeBet}
                clearBets={clearBets}
                session={session}
              />
            }
          />

          <Route
            path="/match/:id"
            element={
              <MatchPage
                bets={bets}
                addBet={addBet}
              />
            }
          />

          <Route
            path="/live"
            element={<Live />}
          />

          <Route
            path="/casino"
            element={<Casino />}
          />

          <Route
            path="/live-casino"
            element={<LiveCasino />}
          />

          <Route
            path="/golden-games"
            element={<GoldenGames />}
          />

          <Route
            path="/promotions"
            element={<Promotions />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={
              <Profile
                session={session}
              />
            }
          />

          <Route
            path="/balance"
            element={
              <Balance
                session={session}
              />
            }
          />

          <Route
            path="/deposit"
            element={
              <Deposit
                session={session}
              />
            }
          />

          <Route
            path="/withdraw"
            element={
              <Withdraw
                session={session}
              />
            }
          />

          <Route
            path="/my-bets"
            element={
              <MyBets
                session={session}
              />
            }
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/super-admin"
            element={<AdminDashboard />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

/* =========================================================
   BET SLIP PAGE
========================================================= */

function BetSlipPage({
  bets,
  removeBet,
  clearBets,
  session,
}) {
  return (
    <div className="page section">
      <div className="page-heading">
        <span className="section-kicker">
          GOLDENBET
        </span>

        <h1>
          🧾 Bet Slip
        </h1>

        <p>
          Review your selections,
          choose your stake and place
          your bet.
        </p>
      </div>

      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        <BetSlip
          bets={bets}
          removeBet={removeBet}
          clearBets={clearBets}
          session={session}
        />
      </div>
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home({
  bets,
  addBet,
  removeBet,
  clearBets,
  session,
}) {
  const [search, setSearch] =
    useState("");

  const filteredMatches =
    matches.filter((match) =>
      `${match.home} ${match.away} ${match.league} ${match.country}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="page">
      <section
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.42), rgba(0,0,0,.78)), url('/goldenbet-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-content">
          <span className="hero-badge">
            👑 GOLDENBET
          </span>

          <h1>
            Sports, Casino & Live Betting
          </h1>

          <p>
            Premium sports betting,
            casino games and live
            entertainment.
          </p>

          <div className="hero-buttons">
            <Link
              to="/sports"
              className="btn btn-gold"
            >
              ⚽ Explore Sports
            </Link>

            <Link
              to="/casino"
              className="btn btn-outline"
            >
              🎰 Casino
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>
            🔥 Popular Matches
          </h2>

          <Link
            to="/sports"
            className="view-all-markets"
          >
            All Sports →
          </Link>
        </div>

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <input
            type="search"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="🔎 Search team, league or country..."
            style={{
              width: "100%",
              maxWidth: "520px",
            }}
          />
        </div>

        <div className="home-layout">
          <div className="matches-grid">
            {filteredMatches.map(
              (match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  bets={bets}
                  addBet={addBet}
                />
              )
            )}

            {!filteredMatches.length && (
              <div className="empty-state">
                <h3>
                  No matches found
                </h3>
              </div>
            )}
          </div>

          <BetSlip
            bets={bets}
            removeBet={removeBet}
            clearBets={clearBets}
            session={session}
          />
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   MATCH CARD
========================================================= */

function MatchCard({
  match,
  bets,
  addBet,
}) {
  const selectedBets =
    bets.filter(
      (bet) =>
        bet.matchId === match.id
    );

  const combinedOdds =
    selectedBets.length
      ? selectedBets
          .reduce(
            (total, bet) =>
              total *
              Number(bet.odds),
            1
          )
          .toFixed(2)
      : "0.00";

  return (
    <div
      className={`match-card ${
        selectedBets.length
          ? "has-bet-builder"
          : ""
      }`}
    >
      <div className="match-top">
        <span>
          {match.country &&
            `${match.country} • `}
          {match.league}
        </span>

        <span>
          {match.date} •{" "}
          {match.time}
        </span>
      </div>

      <div
        className="match-teams"
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          alignItems: "center",
          gap: "12px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TeamLogo
            name={match.home}
            code={match.homeCode}
            size={50}
          />

          <strong>
            {match.home}
          </strong>
        </div>

        <span
          className="vs"
          style={{
            fontWeight: 900,
            color: "#d4af37",
          }}
        >
          VS
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TeamLogo
            name={match.away}
            code={match.awayCode}
            size={50}
          />

          <strong>
            {match.away}
          </strong>
        </div>
      </div>

      <div className="match-markets-preview">
        <MarketGroup
          group={marketGroups[0]}
          match={match}
          bets={bets}
          addBet={addBet}
          compact
        />
      </div>

      {selectedBets.length > 0 && (
        <div
          className="match-bet-builder"
          style={{
            marginTop: "14px",
            padding: "12px",
            borderRadius: "10px",
            background: "#111",
            border:
              "1px solid rgba(212,175,55,.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <strong>
              🎯 Bet Builder
            </strong>

            <span>
              {selectedBets.length}{" "}
              selections
            </span>
          </div>

          {selectedBets.map((bet) => {
            const status =
              getSelectionStatus(bet);

            return (
              <div
                key={bet.id}
                style={{
                  padding: "7px 0",
                  borderTop:
                    "1px solid rgba(255,255,255,.08)",
                  color:
                    getStatusColor(
                      status
                    ),
                }}
              >
                {getStatusIcon(status)}{" "}
                <strong>
                  {bet.marketTitle}
                </strong>

                {" — "}

                {bet.selection}

                <span
                  style={{
                    marginLeft: "6px",
                  }}
                >
                  @ {bet.odds}
                </span>
              </div>
            );
          })}

          <div
            style={{
              marginTop: "10px",
              paddingTop: "8px",
              borderTop:
                "1px solid rgba(255,255,255,.08)",
              display: "flex",
              justifyContent:
                "space-between",
            }}
          >
            <span>
              Combined Odds
            </span>

            <strong>
              {combinedOdds}
            </strong>
          </div>
        </div>
      )}

      <Link
        to={`/match/${match.id}`}
        className="view-all-markets"
      >
        {selectedBets.length > 0
          ? `✓ ${selectedBets.length} selected — View all markets`
          : "View all markets →"}
      </Link>
    </div>
  );
}

/* =========================================================
   MATCH PAGE
========================================================= */

function MatchPage({
  bets,
  addBet,
}) {
  const { id } = useParams();

  const match =
    matches.find(
      (item) =>
        item.id === Number(id)
    ) || null;

  if (!match) {
    return (
      <div className="page section">
        <div className="empty-state">
          <h2>
            Match not found.
          </h2>

          <Link
            to="/sports"
            className="btn btn-gold"
          >
            Back to Sports
          </Link>
        </div>
      </div>
    );
  }

  const selectedBets =
    bets.filter(
      (bet) =>
        bet.matchId === match.id
    );

  return (
    <div className="page section">
      <div className="match-detail-header">
        <Link
          to="/sports"
          className="back-link"
        >
          ← Back to Sports
        </Link>

        <div className="match-detail-league">
          {match.country} •{" "}
          {match.league}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            gap: "25px",
            flexWrap: "wrap",
            margin:
              "20px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              alignItems:
                "center",
              gap: "8px",
            }}
          >
            <TeamLogo
              name={match.home}
              code={match.homeCode}
              size={72}
            />

            <h2>
              {match.home}
            </h2>
          </div>

          <div
            style={{
              color: "#d4af37",
              fontSize: "22px",
              fontWeight: 900,
            }}
          >
            VS
          </div>

          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              alignItems:
                "center",
              gap: "8px",
            }}
          >
            <TeamLogo
              name={match.away}
              code={match.awayCode}
              size={72}
            />

            <h2>
              {match.away}
            </h2>
          </div>
        </div>

        <div className="match-detail-time">
          📅 {match.date}
          <span> • </span>
          ⏰ {match.time}
        </div>

        {selectedBets.length > 0 && (
          <div className="selected-count">
            🎯{" "}
            {selectedBets.length}{" "}
            selections in Bet Builder
          </div>
        )}
      </div>

      <div className="markets-container">
        {marketGroups.map((group) => (
          <MarketGroup
            key={group.id}
            group={group}
            match={match}
            bets={bets}
            addBet={addBet}
          />
        ))}
      </div>

      {selectedBets.length > 0 && (
        <div
          className="match-detail-builder"
          style={{
            marginTop: "24px",
            padding: "16px",
            borderRadius: "12px",
            background: "#111",
            border:
              "1px solid rgba(212,175,55,.35)",
          }}
        >
          <h3>
            🎯 Your Bet Builder
          </h3>

          {selectedBets.map((bet) => {
            const status =
              getSelectionStatus(bet);

            return (
              <div
                key={bet.id}
                style={{
                  padding: "8px 0",
                  color:
                    getStatusColor(
                      status
                    ),
                }}
              >
                {getStatusIcon(status)}{" "}
                <strong>
                  {bet.marketTitle}
                </strong>

                {" — "}

                {bet.selection}

                {" @ "}

                {bet.odds}
              </div>
            );
          })}
        </div>
      )}

      <div className="mobile-bet-slip-link">
        <Link
          to="/bet-slip"
          className="btn btn-gold"
        >
          🧾 Open Bet Slip
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   MARKET GROUP
========================================================= */

function MarketGroup({
  group,
  match,
  bets,
  addBet,
  compact = false,
}) {
  return (
    <div
      className={`market-group ${
        compact
          ? "compact-market"
          : ""
      }`}
    >
      <div className="market-group-title">
        <h3>
          {group.title}
        </h3>
      </div>

      {group.markets.map(
        (market) => (
          <Market
            key={market.id}
            market={market}
            group={group}
            match={match}
            bets={bets}
            addBet={addBet}
            compact={compact}
          />
        )
      )}
    </div>
  );
}

/* =========================================================
   MARKET
========================================================= */

function Market({
  market,
  group,
  match,
  bets,
  addBet,
}) {
  const selected = (
    selectionKey
  ) =>
    bets.some(
      (bet) =>
        bet.matchId === match.id &&
        bet.marketId === market.id &&
        bet.selectionKey ===
          selectionKey
    );

  function selectMarket(
    selection
  ) {
    addBet({
      id: `${match.id}-${market.id}-${selection.key}`,

      matchId: match.id,

      match:
        `${match.home} vs ${match.away}`,

      home: match.home,

      away: match.away,

      league: match.league,

      country: match.country,

      time: match.time,

      date: match.date,

      groupId: group.id,

      groupTitle:
        group.title,

      marketId: market.id,

      marketTitle:
        market.title,

      selectionKey:
        selection.key,

      selection:
        selection.name,

      label:
        selection.label,

      odds: Number(
        selection.odds
      ),

      result: "pending",
    });
  }

  return (
    <div className="market">
      <div className="market-title">
        {market.title}
      </div>

      <div className="market-selections">
        {market.selections.map(
          (selection) => (
            <button
              key={selection.key}
              className={`market-selection ${
                selected(
                  selection.key
                )
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                selectMarket(
                  selection
                )
              }
            >
              <span>
                {selection.label}
              </span>

              <strong>
                {selection.odds}
              </strong>
            </button>
          )
        )}
      </div>
    </div>
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
  const [stake, setStake] =
    useState("");

  const [placing, setPlacing] =
    useState(false);

  const groupedBets =
    useMemo(() => {
      const groups = [];

      bets.forEach((bet) => {
        let group =
          groups.find(
            (item) =>
              item.matchId ===
              bet.matchId
          );

        if (!group) {
          group = {
            matchId:
              bet.matchId,
            match:
              bet.match,
            home:
              bet.home,
            away:
              bet.away,
            homeCode:
              matches.find(
                (m) =>
                  m.id ===
                  bet.matchId
              )?.homeCode,
            awayCode:
              matches.find(
                (m) =>
                  m.id ===
                  bet.matchId
              )?.awayCode,
            league:
              bet.league,
            country:
              bet.country,
            time:
              bet.time,
            date:
              bet.date,
            selections: [],
          };

          groups.push(group);
        }

        group.selections.push(
          bet
        );
      });

      return groups;
    }, [bets]);

  const matchOdds =
    useMemo(() => {
      return groupedBets.map(
        (group) => {
          const odds =
            group.selections.reduce(
              (total, bet) =>
                total *
                Number(
                  bet.odds
                ),
              1
            );

          return {
            ...group,
            combinedOdds:
              odds.toFixed(2),
          };
        }
      );
    }, [groupedBets]);

  const totalOdds =
    useMemo(() => {
      if (
        !matchOdds.length
      ) {
        return "0.00";
      }

      const value =
        matchOdds.reduce(
          (total, group) =>
            total *
            Number(
              group.combinedOdds
            ),
          1
        );

      return value.toFixed(2);
    }, [matchOdds]);

  const potentialReturn =
    Number(stake) > 0
      ? (
          Number(stake) *
          Number(totalOdds)
        ).toFixed(2)
      : "0.00";

  const totalSelections =
    bets.length;

  async function placeBet() {
    if (!bets.length) {
      alert(
        "Please select at least one market."
      );
      return;
    }

    if (
      !stake ||
      Number(stake) <= 0
    ) {
      alert(
        "Please enter your stake."
      );
      return;
    }

    if (!session?.user?.id) {
      alert(
        "Please login first."
      );
      return;
    }

    const stakeAmount =
      Number(stake);

    const oddsAmount =
      Number(totalOdds);

    const returnAmount =
      Number(potentialReturn);

    if (
      !Number.isFinite(
        stakeAmount
      ) ||
      !Number.isFinite(
        oddsAmount
      ) ||
      !Number.isFinite(
        returnAmount
      )
    ) {
      alert(
        "Invalid bet amount."
      );
      return;
    }

    setPlacing(true);

    try {
      const matchNames =
        groupedBets
          .map(
            (group) =>
              group.match
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
          stake:
            stakeAmount,
          total_odds:
            oddsAmount,
          potential_win:
            returnAmount,
          status:
            "pending",
        });

      if (error) {
        console.error(
          "Place bet error:",
          error
        );

        alert(
          `Bet failed: ${error.message}`
        );

        return;
      }

      alert(
        `Bet placed successfully!\n\nMatches: ${groupedBets.length}/20\nSelections: ${totalSelections}\nTotal Odds: ${totalOdds}\nStake: ${stakeAmount.toLocaleString()} IQD\nPotential Return: ${returnAmount.toLocaleString()} IQD`
      );

      setStake("");
      clearBets();
    } catch (error) {
      console.error(
        "Unexpected bet error:",
        error
      );

      alert(
        "Something went wrong while placing the bet."
      );
    } finally {
      setPlacing(false);
    }
  }

  return (
    <aside className="bet-slip">
      <div className="bet-slip-header">
        <div>
          <h3>
            🧾 Bet Slip
          </h3>

          <span>
            {groupedBets.length}/20 Matches
          </span>
        </div>

        {bets.length > 0 && (
          <button
            className="clear-bets"
            onClick={clearBets}
            disabled={placing}
          >
            Clear
          </button>
        )}
      </div>

      {!bets.length ? (
        <div className="empty-bets">
          <div className="empty-icon">
            🧾
          </div>

          <h4>
            Your bet slip is empty
          </h4>

          <p>
            Choose markets from a match.
          </p>

          <small>
            Maximum 20 matches.
          </small>

          <Link
            to="/sports"
            className="btn btn-gold"
            style={{
              marginTop: "15px",
              display: "inline-flex",
            }}
          >
            ⚽ Browse Sports
          </Link>
        </div>
      ) : (
        <>
          <div className="bet-list">
            {matchOdds.map(
              (
                group,
                groupIndex
              ) => (
                <div
                  className="bet-match-group"
                  key={
                    group.matchId
                  }
                  style={{
                    marginBottom:
                      "14px",
                    padding:
                      "12px",
                    borderRadius:
                      "12px",
                    background:
                      "#111",
                    border:
                      "1px solid rgba(212,175,55,.25)",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: "10px",
                    }}
                  >
                    <TeamLogo
                      name={
                        group.home
                      }
                      code={
                        group.homeCode
                      }
                      size={36}
                    />

                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontWeight:
                            "700",
                          color:
                            "#d4af37",
                        }}
                      >
                        {groupIndex +
                          1}
                        .{" "}
                        {group.home}{" "}
                        vs{" "}
                        {group.away}
                      </div>

                      <small>
                        {group.country &&
                          `${group.country} • `}
                        {group.league}{" "}
                        •{" "}
                        {group.time}
                      </small>
                    </div>

                    <TeamLogo
                      name={
                        group.away
                      }
                      code={
                        group.awayCode
                      }
                      size={36}
                    />
                  </div>

                  <div
                    style={{
                      marginTop:
                        "10px",
                    }}
                  >
                    <strong>
                      🎯 Bet Builder
                    </strong>
                  </div>

                  {group.selections.map(
                    (bet) => {
                      const status =
                        getSelectionStatus(
                          bet
                        );

                      return (
                        <div
                          className="bet-item"
                          key={
                            bet.id
                          }
                          style={{
                            marginTop:
                              "8px",
                            padding:
                              "8px",
                            borderTop:
                              "1px solid rgba(255,255,255,.07)",
                          }}
                        >
                          <div className="bet-info">
                            <span
                              style={{
                                color:
                                  getStatusColor(
                                    status
                                  ),
                              }}
                            >
                              {getStatusIcon(
                                status
                              )}{" "}
                              <strong>
                                {
                                  bet.marketTitle
                                }
                              </strong>
                            </span>

                            <span>
                              {
                                bet.selection
                              }
                            </span>

                            <b>
                              @{" "}
                              {
                                bet.odds
                              }
                            </b>
                          </div>

                          <button
                            className="remove-bet"
                            onClick={() =>
                              removeBet(
                                bet.id
                              )
                            }
                            disabled={
                              placing
                            }
                          >
                            ×
                          </button>
                        </div>
                      );
                    }
                  )}

                  <div
                    style={{
                      marginTop:
                        "10px",
                      paddingTop:
                        "9px",
                      borderTop:
                        "1px solid rgba(255,255,255,.1)",
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                    }}
                  >
                    <span>
                      Combined Odds
                    </span>

                    <strong>
                      {
                        group.combinedOdds
                      }
                    </strong>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="bet-summary">
            <div>
              <span>
                Matches
              </span>

              <strong>
                {groupedBets.length}
              </strong>
            </div>

            <div>
              <span>
                Selections
              </span>

              <strong>
                {totalSelections}
              </strong>
            </div>

            <div>
              <span>
                Total Odds
              </span>

              <strong>
                {totalOdds}
              </strong>
            </div>
          </div>

          <div className="stake-box">
            <label>
              Stake
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={stake}
              onChange={(e) =>
                setStake(
                  e.target.value
                )
              }
              placeholder="0"
              disabled={placing}
            />
          </div>

          <div className="return-box">
            <span>
              Potential Return
            </span>

            <strong>
              {Number(
                potentialReturn
              ).toLocaleString()}{" "}
              IQD
            </strong>
          </div>

          <button
            className="place-bet-btn"
            onClick={placeBet}
            disabled={placing}
          >
            {placing
              ? "Placing Bet..."
              : "Place Bet"}
          </button>

          {!session && (
            <p
              style={{
                marginTop:
                  "10px",
                textAlign:
                  "center",
              }}
            >
              Please{" "}
              <Link to="/login">
                login
              </Link>{" "}
              before placing a bet.
            </p>
          )}
        </>
      )}
    </aside>
  );
}

/* =========================================================
   SPORTS
========================================================= */

function Sports({
  bets,
  addBet,
}) {
  const [sport, setSport] =
    useState("Football");

  const [country, setCountry] =
    useState(null);

  const [league, setLeague] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const countryData =
    sportsCountries.find(
      (item) =>
        item.name === country
    );

  const visibleMatches =
    matches.filter((match) => {
      if (
        sport !==
        "Football"
      ) {
        return false;
      }

      if (
        country &&
        match.country !==
          country
      ) {
        return false;
      }

      if (
        league &&
        match.league !==
          league
      ) {
        return false;
      }

      if (
        search &&
        !`${match.home} ${match.away} ${match.league} ${match.country}`
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      ) {
        return false;
      }

      return true;
    });

  return (
    <div className="page section sports-page">
      <div className="page-heading">
        <span className="section-kicker">
          GOLDENBET SPORTS
        </span>

        <h1>
          ⚽ Sports
        </h1>

        <p>
          Select sport, country,
          league and match.
        </p>
      </div>

      <div
        className="sports-mode-bar"
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <Link
          to="/live"
          className="btn btn-gold"
        >
          🔴 Live Sports
        </Link>

        <div
          className="sports-mode-title"
          style={{
            padding:
              "10px 16px",
            borderRadius:
              "10px",
            border:
              "1px solid rgba(212,175,55,.35)",
          }}
        >
          ⚽ All Sports
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="🔎 Search teams..."
          style={{
            flex: 1,
            minWidth: "220px",
          }}
        />
      </div>

      <div
        className="sports-layout"
        style={{
          display: "grid",
          gridTemplateColumns:
            "220px 1fr",
          gap: "20px",
        }}
      >
        <aside
          className="sports-sidebar"
          style={{
            padding: "16px",
            borderRadius:
              "14px",
            background:
              "#101010",
            border:
              "1px solid rgba(212,175,55,.2)",
            height:
              "fit-content",
          }}
        >
          <div
            className="sidebar-title"
            style={{
              fontWeight:
                "700",
              marginBottom:
                "12px",
            }}
          >
            🏆 Sports
          </div>

          <div className="sports-list">
            {sports.map(
              (item) => (
                <button
                  key={item}
                  className={
                    sport === item
                      ? "sport-side-item active"
                      : "sport-side-item"
                  }
                  onClick={() => {
                    setSport(item);
                    setCountry(
                      null
                    );
                    setLeague(
                      null
                    );
                  }}
                  style={{
                    width:
                      "100%",
                    textAlign:
                      "left",
                    marginBottom:
                      "6px",
                    padding:
                      "10px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                  }}
                >
                  ⚽ {item}
                </button>
              )
            )}
          </div>
        </aside>

        <div className="sports-content">
          {sport !==
          "Football" ? (
            <div className="sports-panel">
              <div className="empty-state">
                <h2>
                  {sport}
                </h2>

                <p>
                  League and match
                  data can be connected
                  to a live sports API.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div
                className="sports-panel"
                style={{
                  padding:
                    "18px",
                  borderRadius:
                    "14px",
                  background:
                    "#101010",
                  border:
                    "1px solid rgba(212,175,55,.2)",
                  marginBottom:
                    "20px",
                }}
              >
                <div
                  className="sports-panel-head"
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    marginBottom:
                      "15px",
                  }}
                >
                  <div>
                    <span className="section-kicker">
                      WORLDWIDE
                    </span>

                    <h2>
                      🌍 Countries
                    </h2>
                  </div>

                  <span>
                    {
                      sportsCountries.length
                    }{" "}
                    countries
                  </span>
                </div>

                <div
                  className="country-grid"
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill,minmax(150px,1fr))",
                    gap: "10px",
                  }}
                >
                  {sportsCountries.map(
                    (item) => (
                      <button
                        key={
                          item.name
                        }
                        className={
                          country ===
                          item.name
                            ? "country-card active"
                            : "country-card"
                        }
                        onClick={() => {
                          setCountry(
                            item.name
                          );
                          setLeague(
                            null
                          );
                        }}
                        style={{
                          padding:
                            "14px",
                          borderRadius:
                            "10px",
                          cursor:
                            "pointer",
                          textAlign:
                            "left",
                        }}
                      >
                        <span
                          style={{
                            fontSize:
                              "24px",
                            display:
                              "block",
                            marginBottom:
                              "5px",
                          }}
                        >
                          {
                            item.flag
                          }
                        </span>

                        <strong>
                          {
                            item.name
                          }
                        </strong>

                        <small
                          style={{
                            display:
                              "block",
                            opacity:
                              ".7",
                            marginTop:
                              "4px",
                          }}
                        >
                          {
                            item
                              .leagues
                              .length
                          }{" "}
                          leagues
                        </small>
                      </button>
                    )
                  )}
                </div>
              </div>

              {country && (
                <div
                  className="sports-panel"
                  style={{
                    padding:
                      "18px",
                    borderRadius:
                      "14px",
                    background:
                      "#101010",
                    border:
                      "1px solid rgba(212,175,55,.2)",
                    marginBottom:
                      "20px",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      marginBottom:
                        "15px",
                    }}
                  >
                    <div>
                      <span className="section-kicker">
                        {country}
                      </span>

                      <h2>
                        🏆 Leagues
                      </h2>
                    </div>

                    <button
                      className="text-button"
                      onClick={() => {
                        setCountry(
                          null
                        );
                        setLeague(
                          null
                        );
                      }}
                    >
                      All Countries
                    </button>
                  </div>

                  <div
                    className="league-grid"
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill,minmax(180px,1fr))",
                      gap: "10px",
                    }}
                  >
                    {countryData?.leagues.map(
                      (item) => (
                        <button
                          key={
                            item
                          }
                          className={
                            league ===
                            item
                              ? "league-card active"
                              : "league-card"
                          }
                          onClick={() =>
                            setLeague(
                              item
                            )
                          }
                          style={{
                            padding:
                              "13px",
                            borderRadius:
                              "10px",
                            cursor:
                              "pointer",
                            textAlign:
                              "left",
                          }}
                        >
                          🏆{" "}
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              <div
                className="sports-panel"
                style={{
                  padding:
                    "18px",
                  borderRadius:
                    "14px",
                  background:
                    "#101010",
                  border:
                    "1px solid rgba(212,175,55,.2)",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    marginBottom:
                      "15px",
                  }}
                >
                  <div>
                    <span className="section-kicker">
                      {league ||
                        country ||
                        "TODAY"}
                    </span>

                    <h2>
                      🔥 Matches
                    </h2>
                  </div>

                  <span>
                    {
                      visibleMatches.length
                    }{" "}
                    matches
                  </span>
                </div>

                {visibleMatches.length >
                0 ? (
                  <div className="matches-grid">
                    {visibleMatches.map(
                      (
                        match
                      ) => (
                        <MatchCard
                          key={
                            match.id
                          }
                          match={
                            match
                          }
                          bets={
                            bets
                          }
                          addBet={
                            addBet
                          }
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="empty-state">
                    <h3>
                      No matches yet
                    </h3>

                    <p>
                      Select another
                      country or league.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LIVE SPORTS
========================================================= */

function Live() {
  return (
    <div className="page section">
      <div className="page-heading">
        <span className="section-kicker">
          GOLDENBET LIVE
        </span>

        <h1>
          🔴 Live Sports
        </h1>

        <p>
          Live interface preview.
          Real scores require a live
          sports data provider.
        </p>
      </div>

      <div
        style={{
          padding: "12px 16px",
          marginBottom: "18px",
          borderRadius: "10px",
          background:
            "rgba(212,175,55,.08)",
          border:
            "1px solid rgba(212,175,55,.25)",
          color: "#d4af37",
        }}
      >
        ⚠️ Demo live data — scores
        shown here are not live.
      </div>

      <div className="live-grid">
        {matches
          .slice(0, 8)
          .map((match) => (
            <div
              className="live-card"
              key={match.id}
            >
              <div className="live-badge">
                LIVE DEMO
              </div>

              <span>
                {match.country} •{" "}
                {match.league}
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  gap: "15px",
                  margin:
                    "15px 0",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    alignItems:
                      "center",
                    gap: "6px",
                  }}
                >
                  <TeamLogo
                    name={
                      match.home
                    }
                    code={
                      match.homeCode
                    }
                    size={46}
                  />

                  <strong>
                    {match.home}
                  </strong>
                </div>

                <div>
                  <div className="live-score">
                    1 - 0
                  </div>

                  <small>
                    2nd Half
                  </small>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    alignItems:
                      "center",
                    gap: "6px",
                  }}
                >
                  <TeamLogo
                    name={
                      match.away
                    }
                    code={
                      match.awayCode
                    }
                    size={46}
                  />

                  <strong>
                    {match.away}
                  </strong>
                </div>
              </div>

              <Link
                to={`/match/${match.id}`}
                className="btn btn-gold"
              >
                View Markets
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

/* =========================================================
   CASINO
========================================================= */

function Casino() {
  const [category, setCategory] =
    useState("All Games");

  const games =
    category === "All Games"
      ? casinoGames
      : casinoGames.filter(
          (game) =>
            game.category ===
            category
        );

  return (
    <div className="page section casino-page">
      <div
        className="casino-hero"
        style={{
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "22px",
          background:
            "linear-gradient(135deg,#090909,#17120a,#090909)",
          border:
            "1px solid rgba(212,175,55,.35)",
        }}
      >
        <span className="section-kicker">
          GOLDENBET CASINO
        </span>

        <h1>
          🎰 Casino
        </h1>

        <p>
          Roulette, Blackjack,
          Slots, Crash, Jackpot
          and more.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(150px,1fr))",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          {[
            ["🎡", "Roulette"],
            ["🃏", "Blackjack"],
            ["💰", "Jackpot"],
            ["🚀", "Crash"],
          ].map(([icon, name]) => (
            <div
              className="game-card"
              key={name}
            >
              <div className="game-image">
                {icon}
              </div>

              <h3>
                {name}
              </h3>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "18px",
          }}
        >
          <Link
            to="/live-casino"
            className="btn btn-outline"
          >
            🔴 Open Live Casino
          </Link>
        </div>
      </div>

      <div className="category-tabs">
        {casinoCategories.map(
          (item) => (
            <button
              key={item}
              className={
                category === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div
            className="game-card"
            key={game.name}
          >
            <div className="game-image">
              {game.image}
            </div>

            <h3>
              {game.name}
            </h3>

            <span>
              {game.category}
            </span>

            <button
              className="btn btn-gold"
              onClick={() =>
                alert(
                  `${game.name} is a UI demo. A real casino provider integration is required to play.`
                )
              }
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   LIVE CASINO
========================================================= */

function LiveCasino() {
  const [category, setCategory] =
    useState("All Live Games");

  const games =
    category === "All Live Games"
      ? liveGames
      : liveGames.filter(
          (game) =>
            game.provider ===
              category ||
            game.category ===
              category
        );

  return (
    <div className="page section">
      <div
        className="casino-hero"
        style={{
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "22px",
          background:
            "linear-gradient(135deg,#090909,#160d0d,#090909)",
          border:
            "1px solid rgba(212,175,55,.35)",
        }}
      >
        <span className="section-kicker">
          GOLDENBET LIVE CASINO
        </span>

        <h1>
          🔴 Live Casino
        </h1>

        <p>
          Live Roulette, Blackjack,
          Baccarat, Poker and Game
          Shows.
        </p>

        <div
          style={{
            fontSize: "55px",
            marginTop: "15px",
          }}
        >
          🎡 🃏 💰 🎲
        </div>
      </div>

      <div className="category-tabs">
        {liveCasinoCategories.map(
          (item) => (
            <button
              key={item}
              className={
                category === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div
            className="game-card"
            key={game.name}
          >
            <div className="game-image">
              {game.image}
            </div>

            <h3>
              {game.name}
            </h3>

            <span>
              {game.provider}
            </span>

            <button
              className="btn btn-gold"
              onClick={() =>
                alert(
                  `${game.name} is a UI demo. Real live casino integration requires a licensed provider.`
                )
              }
            >
              Play Live
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   GOLDEN GAMES
========================================================= */

function GoldenGames() {
  return (
    <div className="page section">
      <div className="page-heading">
        <span className="section-kicker">
          GOLDENBET ORIGINALS
        </span>

        <h1>
          💎 Golden Games
        </h1>

        <p>
          GoldenBet exclusive game
          collection.
        </p>
      </div>

      <div className="golden-games-grid">
        {goldenGames.map(
          (game) => (
            <div
              className="golden-game-card"
              key={game}
            >
              <div className="golden-icon">
                ⭐
              </div>

              <h3>
                {game}
              </h3>

              <p
                style={{
                  opacity: 0.7,
                }}
              >
                GoldenBet Original
              </p>

              <button
                className="btn btn-gold"
                onClick={() =>
                  alert(
                    `${game} is currently a UI preview.`
                  )
                }
              >
                Play
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PROMOTIONS
========================================================= */

function Promotions() {
  return (
    <div className="page section">
      <div className="page-heading">
        <span className="section-kicker">
          GOLDENBET OFFERS
        </span>

        <h1>
          🎁 Promotions
        </h1>
      </div>

      <div className="promotion-grid">
        <div className="promotion-card">
          <span>
            WELCOME
          </span>

          <h2>
            Welcome Bonus
          </h2>

          <p>
            Special offer for new users.
          </p>

          <Link
            to="/register"
            className="btn btn-gold"
          >
            Register
          </Link>
        </div>

        <div className="promotion-card">
          <span>
            VIP
          </span>

          <h2>
            Golden VIP
          </h2>

          <p>
            Exclusive VIP benefits.
          </p>

          <Link
            to="/register"
            className="btn btn-gold"
          >
            Join VIP
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const {
      error: loginError,
    } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    setLoading(false);

    if (loginError) {
      setError(
        loginError.message
      );
      return;
    }

    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>
          👑 GoldenBet Login
        </h1>

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <form
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            className="btn btn-gold"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   REGISTER
========================================================= */

function Register() {
  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleRegister(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    const {
      data,
      error: signUpError,
    } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

    setLoading(false);

    if (signUpError) {
      setError(
        signUpError.message
      );
      return;
    }

    if (data?.session) {
      navigate("/");
      return;
    }

    setSuccess(
      "Registration successful. Please check your email to confirm your account."
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>
          👑 Create GoldenBet Account
        </h1>

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        {success && (
          <p className="auth-success">
            {success}
          </p>
        )}

        <form
          onSubmit={handleRegister}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            required
          />

          <button
            className="btn btn-gold"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function Profile({
  session,
}) {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const {
        data,
        error,
      } = await supabase
        .from("profiles")
        .select(
          "username, full_name, avatar_text, balance"
        )
        .eq(
          "id",
          session.user.id
        )
        .maybeSingle();

      if (error) {
        console.error(
          "Profile error:",
          error
        );
      }

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [session]);

  if (!session) {
    return (
      <div className="page section">
        <div className="empty-state">
          <h2>
            Please login first.
          </h2>

          <Link
            to="/login"
            className="btn btn-gold"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page section">
        Loading profile...
      </div>
    );
  }

  const username =
    profile?.username ||
    session.user.user_metadata
      ?.username ||
    "GoldenBet User";

  return (
    <div className="page section">
      <div className="page-heading">
        <h1>
          👤 Profile
        </h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {profile?.avatar_text ||
            "👤"}
        </div>

        <h2>
          {username}
        </h2>

        <p>
          {session.user.email}
        </p>

        <p>
          Balance:{" "}
          {Number(
            profile?.balance || 0
          ).toLocaleString()}{" "}
          IQD
        </p>

        <div
          style={{
            display:
              "flex",
            gap: "10px",
            flexWrap:
              "wrap",
            justifyContent:
              "center",
            marginTop:
              "15px",
          }}
        >
          <Link
            to="/balance"
            className="btn btn-gold"
          >
            💰 Balance
          </Link>

          <Link
            to="/my-bets"
            className="btn btn-outline"
          >
            🧾 My Bets
          </Link>

          <Link
            to="/settings"
            className="btn btn-outline"
          >
            ⚙️ Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BALANCE
========================================================= */

function Balance({
  session,
}) {
  const [balance, setBalance] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadBalance() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const {
        data,
        error,
      } = await supabase
        .from("profiles")
        .select("balance")
        .eq(
          "id",
          session.user.id
        )
        .maybeSingle();

      if (error) {
        console.error(
          "Balance error:",
          error
        );
      }

      setBalance(
        Number(data?.balance || 0)
      );

      setLoading(false);
    }

    loadBalance();
  }, [session]);

  if (!session) {
    return (
      <div className="page section">
        <div className="empty-state">
          <h2>
            Please login first.
          </h2>

          <Link
            to="/login"
            className="btn btn-gold"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page section">
      <div className="balance-card">
        <span>
          Available Balance
        </span>

        <strong>
          {loading
            ? "Loading..."
            : `${balance.toLocaleString()} IQD`}
        </strong>

        <div className="balance-actions">
          <Link
            to="/deposit"
            className="btn btn-gold"
          >
            Deposit
          </Link>

          <Link
            to="/withdraw"
            className="btn btn-outline"
          >
            Withdraw
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DEPOSIT
========================================================= */

function Deposit({
  session,
}) {
  if (!session) {
    return (
      <div className="page section">
        <div className="empty-state">
          <h2>
            Please login first.
          </h2>

          <Link
            to="/login"
            className="btn btn-gold"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return <PaymentCard />;
}

/* =========================================================
   WITHDRAW
========================================================= */

function Withdraw({
  session,
}) {
  const [amount, setAmount] =
    useState("");

  const [method, setMethod] =
    useState("Korek");

  if (!session) {
    return (
      <div className="page section">
        <div className="empty-state">
          <h2>
            Please login first.
          </h2>

          <Link
            to="/login"
            className="btn btn-gold"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  function requestWithdrawal(e) {
    e.preventDefault();

    if (
      !amount ||
      Number(amount) <= 0
    ) {
      alert(
        "Please enter a valid amount."
      );
      return;
    }

    alert(
      `Withdrawal request prepared.\nAmount: ${Number(
        amount
      ).toLocaleString()} IQD\nMethod: ${method}`
    );
  }

  return (
    <div className="page section">
      <div className="page-heading">
        <h1>
          💸 Withdraw
        </h1>

        <p>
          Choose your withdrawal
          method.
        </p>
      </div>

      <div className="form-card">
        <form
          onSubmit={
            requestWithdrawal
          }
        >
          <input
            type="number"
            min="1"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            required
          />

          <select
            value={method}
            onChange={(e) =>
              setMethod(
                e.target.value
              )
            }
          >
            <option>
              Korek
            </option>

            <option>
              Zain
            </option>

            <option>
              Zain Cash
            </option>

            <option>
              Asiacell
            </option>

            <option>
              FIB
            </option>

            <option>
              FastPay
            </option>
          </select>

          <button
            className="btn btn-gold"
            type="submit"
          >
            Request Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   MY BETS
========================================================= */

function MyBets({
  session,
}) {
  const [bets, setBets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadBets() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const {
        data,
        error,
      } = await supabase
        .from("bets")
        .select(
          "id, match_name, stake, total_odds, potential_win, status, created_at"
        )
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

      if (error) {
        console.error(
          "Bets error:",
          error
        );
      }

      setBets(data || []);
      setLoading(false);
    }

    loadBets();
  }, [session]);

  if (!session) {
    return (
      <div className="page section">
        <div className="empty-state">
          <h2>
            Please login first.
          </h2>

          <Link
            to="/login"
            className="btn btn-gold"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page section">
        Loading bets...
      </div>
    );
  }

  return (
    <div className="page section">
      <div className="page-heading">
        <h1>
          🧾 My Bets
        </h1>
      </div>

      {!bets.length ? (
        <div className="empty-state">
          <div
            style={{
              fontSize:
                "40px",
            }}
          >
            🧾
          </div>

          <h3>
            No bets yet
          </h3>

          <Link
            to="/sports"
            className="btn btn-gold"
          >
            Browse Sports
          </Link>
        </div>
      ) : (
        <div className="bet-history-list">
          {bets.map((bet) => {
            const status =
              bet.status ||
              "pending";

            return (
              <div
                className="bet-history-card"
                key={bet.id}
              >
                <div>
                  <strong>
                    Bet #{bet.id}
                  </strong>

                  <p>
                    {bet.match_name}
                  </p>

                  <p>
                    Status:{" "}
                    <strong
                      style={{
                        color:
                          status ===
                          "won"
                            ? "#35d06f"
                            : status ===
                              "lost"
                            ? "#ff4d4f"
                            : "#f2c94c",
                      }}
                    >
                      {status.toUpperCase()}
                    </strong>
                  </p>
                </div>

                <div>
                  <span>
                    Stake
                  </span>

                  <strong>
                    {Number(
                      bet.stake || 0
                    ).toLocaleString()}{" "}
                    IQD
                  </strong>
                </div>

                <div>
                  <span>
                    Odds
                  </span>

                  <strong>
                    {bet.total_odds}
                  </strong>
                </div>

                <div>
                  <span>
                    Potential Win
                  </span>

                  <strong>
                    {Number(
                      bet.potential_win ||
                        0
                    ).toLocaleString()}{" "}
                    IQD
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  const [saved, setSaved] =
    useState(false);

  function saveSettings() {
    setSaved(true);

    setTimeout(
      () => setSaved(false),
      2000
    );
  }

  return (
    <div className="page section">
      <div className="page-heading">
        <h1>
          ⚙️ Settings
        </h1>
      </div>

      <div className="settings-card">
        <label>
          Notifications

          <input
            type="checkbox"
            defaultChecked
          />
        </label>

        <label>
          Dark Mode

          <input
            type="checkbox"
            defaultChecked
          />
        </label>

        <button
          className="btn btn-gold"
          onClick={
            saveSettings
          }
        >
          Save Settings
        </button>

        {saved && (
          <p
            style={{
              color:
                "#35d06f",
              marginTop:
                "12px",
            }}
          >
            ✓ Settings saved
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   NOT FOUND
========================================================= */

function NotFound() {
  return (
    <div className="page section">
      <div className="empty-state">
        <h1>
          404
        </h1>

        <p>
          Page not found.
        </p>

        <Link
          to="/"
          className="btn btn-gold"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="logo">
            <span className="logo-mark">
              👑
            </span>

            <span className="logo-gold">
              GOLDEN
            </span>

            <span className="logo-white">
              BET
            </span>
          </div>

          <p>
            GoldenBet sports and casino
            platform.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/sports">
            Sports
          </Link>

          <Link to="/casino">
            Casino
          </Link>

          <Link to="/live">
            Live Sports
          </Link>

          <Link to="/live-casino">
            Live Casino
          </Link>

          <Link to="/golden-games">
            Golden Games
          </Link>

          <Link to="/my-bets">
            My Bets
          </Link>

          <Link to="/promotions">
            Promotions
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 GoldenBet. All rights reserved.
      </div>
    </footer>
  );
}
import { Link } from "react-router-dom";

export default function GoldenBetHeader({
  bets = [],
}) {
  return (
    <>
      <header className="golden-top-header">
        <div className="golden-top-visual">

          <div className="golden-side-image golden-side-left">
            <img
              src="/golden-roulette.svg"
              alt="Golden Roulette"
            />
          </div>

          <Link
            to="/"
            className="golden-center-logo"
            aria-label="GoldenBet Home"
          >
            GOLDENBET
          </Link>

          <div className="golden-side-image golden-side-right">
            <img
              src="/golden-football.svg"
              alt="Golden Football"
            />
          </div>

        </div>
      </header>

      <nav
        className="golden-bottom-nav"
        aria-label="Main navigation"
      >

        <Link
          to="/sports"
          className="golden-bottom-item"
        >
          <span className="golden-bottom-icon">
            ⚽
          </span>

          <span>
            Sports
          </span>
        </Link>

        <Link
          to="/bet-slip"
          className="golden-bottom-item"
        >
          <span className="golden-bottom-icon">
            🎟️
          </span>

          <span>
            Bet Slip
          </span>

          {bets.length > 0 && (
            <b className="golden-bet-count">
              {bets.length}
            </b>
          )}
        </Link>

        <Link
          to="/deposit"
          className="golden-bottom-item"
        >
          <span className="golden-bottom-icon">
            💰
          </span>

          <span>
            Deposit
          </span>
        </Link>

        <Link
          to="/casino"
          className="golden-bottom-item"
        >
          <span className="golden-bottom-icon">
            🎰
          </span>

          <span>
            Casino
          </span>
        </Link>

      </nav>
    </>
  );
}
