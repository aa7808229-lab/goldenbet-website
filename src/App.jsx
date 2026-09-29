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
  useLocation,
} from "react-router-dom";

import AdminDashboard from "./AdminDashboard";
import { marketGroups } from "./markets";
import PaymentCard from "./PaymentCard";
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
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "14px",
        background:
          "linear-gradient(145deg,rgba(212,175,55,.3),#090909)",
        border:
          "1px solid rgba(212,175,55,.55)",
        display: "grid",
        placeItems: "center",
        color: "#f6d66a",
        fontWeight: 900,
        fontSize: size * 0.25,
      }}
    >
      {initials}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function GoldenBetHeader({ bets }) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [session, setSession] =
    useState(null);

  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function getSession() {
      const { data } =
        await supabase.auth.getSession();

      if (mounted) {
        setSession(
          data?.session ?? null
        );
      }
    }

    getSession();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          if (mounted) {
            setSession(newSession);
          }
        }
      );

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    setSession(null);
    setMenuOpen(false);
  }

  /*
    Home has its own new design.
    Therefore the old global header is hidden only on "/".
  */
  if (location.pathname === "/") {
    return null;
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background:
          "rgba(5,5,5,.96)",
        backdropFilter:
          "blur(12px)",
        borderBottom:
          "1px solid rgba(212,175,55,.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: 900,
            fontSize: "21px",
          }}
        >
          <span>👑</span>
          <span style={{ color: "#d4af37" }}>
            GOLDEN
          </span>
          <span style={{ color: "#fff" }}>
            BET
          </span>
        </Link>

        <nav
          className="goldenbet-main-nav"
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/sports">Sports</Link>
          <Link to="/live">Live</Link>
          <Link to="/casino">Casino</Link>
          <Link to="/live-casino">
            Live Casino
          </Link>
          <Link to="/golden-games">
            Golden Games
          </Link>
          <Link to="/promotions">
            Promotions
          </Link>
        </nav>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Link
            to="/bet-slip"
            className="btn btn-gold"
            style={{
              padding: "8px 12px",
              textDecoration: "none",
            }}
          >
            🧾 {bets.length}
          </Link>

          {session ? (
            <>
              <Link
                to="/profile"
                className="btn btn-outline"
                style={{
                  padding: "8px 12px",
                  textDecoration: "none",
                }}
              >
                👤
              </Link>

              <button
                type="button"
                className="btn btn-outline"
                onClick={handleLogout}
                style={{
                  padding: "8px 12px",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline"
                style={{
                  padding: "8px 12px",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-gold"
                style={{
                  padding: "8px 12px",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (value) => !value
              )
            }
            style={{
              padding: "8px",
              borderRadius: "8px",
              background: "#111",
              color: "#fff",
              border:
                "1px solid rgba(212,175,55,.3)",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          style={{
            padding: "12px 18px 18px",
            borderTop:
              "1px solid rgba(212,175,55,.15)",
            display: "grid",
            gap: "10px",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/sports">Sports</Link>
          <Link to="/live">Live Sports</Link>
          <Link to="/casino">Casino</Link>
          <Link to="/live-casino">
            Live Casino
          </Link>
          <Link to="/golden-games">
            Golden Games
          </Link>
          <Link to="/promotions">
            Promotions
          </Link>
          <Link to="/profile">Profile</Link>
          <Link to="/balance">Balance</Link>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [bets, setBets] =
    useState([]);

  const [session, setSession] =
    useState(null);

  const [authLoading, setAuthLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data, error } =
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
      } catch (error) {
        console.error(
          "Unexpected session error:",
          error
        );

        if (mounted) {
          setSession(null);
          setAuthLoading(false);
        }
      }
    }

    loadSession();

    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          if (mounted) {
            setSession(newSession);
            setAuthLoading(false);
          }
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
            (item) =>
              item.matchId
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
      <GoldenBetHeader bets={bets} />

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
              <Profile session={session} />
            }
          />

          <Route
            path="/balance"
            element={
              <Balance session={session} />
            }
          />

          <Route
            path="/deposit"
            element={
              <Deposit session={session} />
            }
          />

          <Route
            path="/withdraw"
            element={
              <Withdraw session={session} />
            }
          />

          <Route
            path="/my-bets"
            element={
              <MyBets session={session} />
            }
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/super-admin"
            element={
              <AdminDashboard />
            }
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
   NEW GOLDENBET HOME
========================================================= */

function Home({ session }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#19140a 0%,#080808 38%,#030303 100%)",
        color: "#fff",
        paddingBottom: "105px",
      }}
    >
      {/* TOP BAR */}

      <div
        style={{
          width: "100%",
          padding:
            "18px 16px 14px",
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          alignItems: "center",
          gap: "10px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-start",
          }}
        >
          <Link
            to="/profile"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "14px",
              display: "grid",
              placeItems: "center",
              textDecoration: "none",
              color: "#fff",
              fontSize: "21px",
              background:
                "linear-gradient(145deg,#1c1c1c,#0b0b0b)",
              border:
                "1px solid rgba(212,175,55,.4)",
              boxShadow:
                "0 5px 25px rgba(0,0,0,.45)",
            }}
          >
            👤
          </Link>
        </div>

        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "center",
            gap: "3px",
            whiteSpace:
              "nowrap",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              marginRight: "2px",
            }}
          >
            👑
          </span>

          <span
            style={{
              color: "#e1b93e",
              fontSize: "24px",
              fontWeight: 1000,
              letterSpacing: "1px",
            }}
          >
            GOLDEN
          </span>

          <span
            style={{
              color: "#fff",
              fontSize: "24px",
              fontWeight: 1000,
              letterSpacing: "1px",
            }}
          >
            BET
          </span>
        </Link>

        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-end",
          }}
        >
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "#050505",
              fontWeight: 900,
              fontSize: "12px",
              padding:
                "11px 13px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#ffe89a,#d4af37)",
              boxShadow:
                "0 7px 24px rgba(212,175,55,.18)",
              whiteSpace:
                "nowrap",
            }}
          >
            Register
          </Link>
        </div>
      </div>

      {/* WELCOME TEXT */}

      <div
        style={{
          textAlign: "center",
          padding:
            "8px 18px 18px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding:
              "6px 12px",
            borderRadius: "30px",
            background:
              "rgba(212,175,55,.08)",
            border:
              "1px solid rgba(212,175,55,.2)",
            color: "#d4af37",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "1.5px",
          }}
        >
          PREMIUM BETTING EXPERIENCE
        </div>
      </div>

      {/* THREE MAIN IMAGE CARDS */}

      <section
        style={{
          padding:
            "0 14px 20px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,minmax(0,1fr))",
            gap: "10px",
          }}
        >
          {/* ROULETTE */}

          <Link
            to="/casino"
            style={{
              position: "relative",
              overflow: "hidden",
              display: "block",
              minWidth: 0,
              aspectRatio:
                "1 / 1.22",
              borderRadius: "18px",
              textDecoration:
                "none",
              background:
                "linear-gradient(145deg,#1c1407,#090909)",
              border:
                "1px solid rgba(212,175,55,.4)",
              boxShadow:
                "0 12px 35px rgba(0,0,0,.55)",
            }}
          >
            <img
              src="/roulette.jpg"
              alt="Roulette"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg,transparent 35%,rgba(0,0,0,.9) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "10px",
                right: "10px",
                bottom: "10px",
                color: "#fff",
                fontWeight: 900,
                fontSize: "13px",
              }}
            >
              🎰 Roulette
            </div>
          </Link>

          {/* GOLDENBET */}

          <Link
            to="/golden-games"
            style={{
              position: "relative",
              overflow: "hidden",
              display: "block",
              minWidth: 0,
              aspectRatio:
                "1 / 1.22",
              borderRadius: "18px",
              textDecoration:
                "none",
              background:
                "linear-gradient(145deg,#241b08,#090909)",
              border:
                "1px solid rgba(212,175,55,.55)",
              boxShadow:
                "0 12px 40px rgba(212,175,55,.12)",
            }}
          >
            <img
              src="/goldenbet.jpg"
              alt="GoldenBet"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg,transparent 30%,rgba(0,0,0,.92) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "10px",
                right: "10px",
                bottom: "10px",
                color: "#d4af37",
                fontWeight: 1000,
                fontSize: "13px",
              }}
            >
              👑 GoldenBet
            </div>
          </Link>

          {/* FOOTBALL */}

          <Link
            to="/sports"
            style={{
              position: "relative",
              overflow: "hidden",
              display: "block",
              minWidth: 0,
              aspectRatio:
                "1 / 1.22",
              borderRadius: "18px",
              textDecoration:
                "none",
              background:
                "linear-gradient(145deg,#07150a,#090909)",
              border:
                "1px solid rgba(212,175,55,.4)",
              boxShadow:
                "0 12px 35px rgba(0,0,0,.55)",
            }}
          >
            <img
              src="/football.jpg"
              alt="Football"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg,transparent 35%,rgba(0,0,0,.92) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "10px",
                right: "10px",
                bottom: "10px",
                color: "#fff",
                fontWeight: 900,
                fontSize: "13px",
              }}
            >
              ⚽ Football
            </div>
          </Link>
        </div>
      </section>

      {/* QUICK ACCESS */}

      <section
        style={{
          padding:
            "4px 14px 22px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 900,
            marginBottom: "12px",
            color: "#d4af37",
          }}
        >
          QUICK ACCESS
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,minmax(0,1fr))",
            gap: "8px",
          }}
        >
          <HomeQuickButton
            to="/sports"
            icon="⚽"
            title="Sports"
          />

          <HomeQuickButton
            to="/bet-slip"
            icon="🎫"
            title="Coupons"
            count={bets?.length || 0}
          />

          <HomeQuickButton
            to="/golden-games"
            icon="🎮"
            title="Golden Games"
          />

          <HomeQuickButton
            to="/casino"
            icon="🎰"
            title="Casino"
          />
        </div>
      </section>

      {/* LOGIN PROMO */}

      {!session && (
        <section
          style={{
            margin:
              "0 14px 25px",
            padding:
              "18px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#171207,#0b0b0b)",
            border:
              "1px solid rgba(212,175,55,.25)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              marginBottom: "7px",
            }}
          >
            👑
          </div>

          <h3
            style={{
              margin:
                "0 0 5px",
            }}
          >
            Join GoldenBet
          </h3>

          <p
            style={{
              margin:
                "0 0 13px",
              opacity: 0.7,
              fontSize: "13px",
            }}
          >
            Create your account and
            start your GoldenBet
            experience.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              gap: "8px",
            }}
          >
            <Link
              to="/register"
              className="btn btn-gold"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="btn btn-outline"
            >
              Login
            </Link>
          </div>
        </section>
      )}

      {/* MOBILE BOTTOM NAV */}

      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2000,
          padding:
            "8px 10px calc(8px + env(safe-area-inset-bottom))",
          background:
            "rgba(4,4,4,.97)",
          backdropFilter:
            "blur(18px)",
          borderTop:
            "1px solid rgba(212,175,55,.25)",
          boxShadow:
            "0 -8px 30px rgba(0,0,0,.45)",
        }}
      >
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: "5px",
          }}
        >
          <HomeBottomButton
            to="/sports"
            icon="⚽"
            title="Sports"
          />

          <HomeBottomButton
            to="/bet-slip"
            icon="🎫"
            title="Coupons"
            count={bets?.length || 0}
          />

          <HomeBottomButton
            to="/golden-games"
            icon="🎮"
            title="Golden Games"
          />

          <HomeBottomButton
            to="/casino"
            icon="🎰"
            title="Casino"
          />
        </div>
      </div>
    </div>
  );
}

function HomeQuickButton({
  to,
  icon,
  title,
  count,
}) {
  return (
    <Link
      to={to}
      style={{
        minWidth: 0,
        minHeight: "85px",
        padding: "8px 4px",
        borderRadius: "15px",
        background:
          "linear-gradient(145deg,#161616,#090909)",
        border:
          "1px solid rgba(212,175,55,.22)",
        textDecoration: "none",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        position: "relative",
      }}
    >
      <span
        style={{
          fontSize: "26px",
        }}
      >
        {icon}
      </span>

      <span
        style={{
          fontSize: "11px",
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "6px",
            right: "7px",
            minWidth: "18px",
            height: "18px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: "#d4af37",
            color: "#050505",
            fontSize: "10px",
            fontWeight: 900,
          }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

function HomeBottomButton({
  to,
  icon,
  title,
  count,
}) {
  return (
    <Link
      to={to}
      style={{
        color: "#fff",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2px",
        minHeight: "50px",
        position: "relative",
        fontSize: "10px",
        fontWeight: 800,
      }}
    >
      <span
        style={{
          fontSize: "21px",
        }}
      >
        {icon}
      </span>

      <span>{title}</span>

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-1px",
            right: "17%",
            minWidth: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#d4af37",
            color: "#050505",
            display: "grid",
            placeItems: "center",
            fontSize: "9px",
            fontWeight: 900,
          }}
        >
          {count}
        </span>
      )}
    </Link>
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

        <h1>🧾 Bet Slip</h1>

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
          {match.date} • {match.time}
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

          <strong>{match.home}</strong>
        </div>

        <span
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

          <strong>{match.away}</strong>
        </div>
      </div>

      <div className="match-markets-preview">
        {marketGroups?.[0] ? (
          <MarketGroup
            group={marketGroups[0]}
            match={match}
            bets={bets}
            addBet={addBet}
            compact
          />
        ) : (
          <div className="empty-state">
            Market data unavailable.
          </div>
        )}
      </div>

      {selectedBets.length > 0 && (
        <div
          style={{
            marginTop: "14px",
            padding: "12px",
            borderRadius: "10px",
            background: "#111",
            border:
              "1px solid rgba(212,175,55,.35)",
          }}
        >
          <strong>
            🎯 Bet Builder
          </strong>

          {selectedBets.map(
            (bet) => {
              const status =
                getSelectionStatus(
                  bet
                );

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
                  {getStatusIcon(
                    status
                  )}{" "}
                  <strong>
                    {
                      bet.marketTitle
                    }
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
            }
          )}

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
          <h2>Match not found.</h2>

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
            justifyContent: "center",
            alignItems: "center",
            gap: "25px",
            flexWrap: "wrap",
            margin: "20px 0",
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
              size={72}
            />

            <h2>{match.home}</h2>
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
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <TeamLogo
              name={match.away}
              code={match.awayCode}
              size={72}
            />

            <h2>{match.away}</h2>
          </div>
        </div>

        <div className="match-detail-time">
          📅 {match.date}
          <span> • </span>
          ⏰ {match.time}
        </div>

        {selectedBets.length > 0 && (
          <div className="selected-count">
            🎯 {selectedBets.length}{" "}
            selections in Bet Builder
          </div>
        )}
      </div>

      <div className="markets-container">
        {(marketGroups || []).map(
          (group) => (
            <MarketGroup
              key={group.id}
              group={group}
              match={match}
              bets={bets}
              addBet={addBet}
            />
          )
        )}
      </div>

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
  if (!group?.markets) {
    return null;
  }

  return (
    <div
      className={`market-group ${
        compact
          ? "compact-market"
          : ""
      }`}
    >
      <div className="market-group-title">
        <h3>{group.title}</h3>
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
    const odds = Number(
      selection.odds
    );

    if (
      !Number.isFinite(odds) ||
      odds <= 0
    ) {
      alert(
        "Invalid market odds."
      );
      return;
    }

    addBet({
      id: `${match.id}-${market.id}-${selection.key}`,
      matchId: match.id,
      match:
        `${match.home} vs ${match.away}`,
      home: match.home,
      away: match.away,
      homeCode: match.homeCode,
      awayCode: match.awayCode,
      league: match.league,
      country: match.country,
      time: match.time,
      date: match.date,
      groupId: group.id,
      groupTitle: group.title,
      marketId: market.id,
      marketTitle: market.title,
      selectionKey: selection.key,
      selection: selection.name,
      label: selection.label,
      odds,
      result: "pending",
    });
  }

  if (!market?.selections) {
    return null;
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
              type="button"
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
          const match =
            matches.find(
              (m) =>
                m.id ===
                bet.matchId
            );

          group = {
            matchId:
              bet.matchId,
            match:
              bet.match ||
              `${bet.home} vs ${bet.away}`,
            home:
              bet.home ||
              match?.home ||
              "",
            away:
              bet.away ||
              match?.away ||
              "",
            homeCode:
              bet.homeCode ||
              match?.homeCode,
            awayCode:
              bet.awayCode ||
              match?.awayCode,
            league:
              bet.league ||
              match?.league ||
              "",
            country:
              bet.country ||
              match?.country ||
              "",
            time:
              bet.time ||
              match?.time ||
              "",
            date:
              bet.date ||
              match?.date ||
              "",
            selections: [],
          };

          groups.push(group);
        }

        group.selections.push(bet);
      });

      return groups;
    }, [bets]);

  const matchOdds =
    useMemo(() => {
      return groupedBets.map(
        (group) => {
          const odds =
            group.selections.reduce(
              (total, bet) => {
                const value =
                  Number(
                    bet.odds
                  );

                return Number.isFinite(
                  value
                ) && value > 0
                  ? total * value
                  : total;
              },
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
      if (!matchOdds.length) {
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

  const stakeNumber =
    Number(stake);

  const potentialReturn =
    Number.isFinite(
      stakeNumber
    ) &&
    stakeNumber > 0
      ? (
          stakeNumber *
          Number(totalOdds)
        ).toFixed(2)
      : "0.00";

  async function placeBet() {
    if (!bets.length) {
      alert(
        "Please select at least one market."
      );
      return;
    }

    if (
      !stake ||
      !Number.isFinite(
        stakeNumber
      ) ||
      stakeNumber <= 0
    ) {
      alert(
        "Please enter a valid stake."
      );
      return;
    }

    if (!session?.user?.id) {
      alert("Please login first.");
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
            stakeNumber,
          total_odds:
            Number(totalOdds),
          potential_win:
            Number(potentialReturn),
          status: "pending",
        });

      if (error) {
        alert(
          `Bet failed: ${error.message}`
        );
        return;
      }

      alert(
        `Bet placed successfully!\n\nTotal Odds: ${totalOdds}\nStake: ${stakeNumber.toLocaleString()} IQD\nPotential Return: ${Number(
          potentialReturn
        ).toLocaleString()} IQD`
      );

      setStake("");
      clearBets();
    } catch (error) {
      console.error(error);

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
          <h3>🧾 Bet Slip</h3>

          <span>
            {groupedBets.length}/20 Matches
          </span>
        </div>

        {bets.length > 0 && (
          <button
            type="button"
            className="clear-bets"
            onClick={clearBets}
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
              (group, index) => (
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
                  <strong
                    style={{
                      color:
                        "#d4af37",
                    }}
                  >
                    {index + 1}.{" "}
                    {group.home} vs{" "}
                    {group.away}
                  </strong>

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
                              {bet.odds}
                            </b>
                          </div>

                          <button
                            type="button"
                            className="remove-bet"
                            onClick={() =>
                              removeBet(
                                bet.id
                              )
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
                        "8px",
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
              <span>Matches</span>
              <strong>
                {groupedBets.length}
              </strong>
            </div>

            <div>
              <span>Selections</span>
              <strong>
                {bets.length}
              </strong>
            </div>

            <div>
              <span>Total Odds</span>
              <strong>
                {totalOdds}
              </strong>
            </div>
          </div>

          <div className="stake-box">
            <label htmlFor="stake">
              Stake
            </label>

            <input
              id="stake"
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
            type="button"
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
                marginTop: "10px",
                textAlign: "center",
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
        sport !== "Football"
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

        <h1>⚽ Sports</h1>

        <p>
          Select sport, country,
          league and match.
        </p>
      </div>

      <div
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
            borderRadius: "14px",
            background: "#101010",
            border:
              "1px solid rgba(212,175,55,.2)",
            height: "fit-content",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            🏆 Sports
          </div>

          {sports.map(
            (item) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setSport(item);
                  setCountry(null);
                  setLeague(null);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  marginBottom: "6px",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ⚽ {item}
              </button>
            )
          )}
        </aside>

        <div>
          {sport !==
          "Football" ? (
            <div className="sports-panel">
              <div className="empty-state">
                <h2>{sport}</h2>
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
                  padding: "18px",
                  borderRadius: "14px",
                  background: "#101010",
                  border:
                    "1px solid rgba(212,175,55,.2)",
                  marginBottom: "20px",
                }}
              >
                <h2>
                  🌍 Countries
                </h2>

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
                        type="button"
                        key={
                          item.name
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
                  <h2>
                    🏆 Leagues
                  </h2>

                  <div
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
                          type="button"
                          key={
                            item
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
                  padding: "18px",
                  borderRadius: "14px",
                  background: "#101010",
                  border:
                    "1px solid rgba(212,175,55,.2)",
                }}
              >
                <h2>
                  🔥 Matches
                </h2>

                {visibleMatches.length >
                0 ? (
                  <div className="matches-grid">
                    {visibleMatches.map(
                      (match) => (
                        <MatchCard
                          key={
                            match.id
                          }
                          match={match}
                          bets={bets}
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
   LIVE
========================================================= */

function Live() {
  return (
    <div className="page section">
      <div className="page-heading">
        <span className="section-kicker">
          GOLDENBET LIVE
        </span>

        <h1>🔴 Live Sports</h1>

        <p>
          Live interface preview.
        </p>
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
                  alignItems: "center",
                  justifyContent:
                    "center",
                  gap: "15px",
                  margin: "15px 0",
                }}
              >
                <TeamLogo
                  name={match.home}
                  code={match.homeCode}
                  size={46}
                />

                <div>
                  <div className="live-score">
                    1 - 0
                  </div>
                  <small>
                    2nd Half
                  </small>
                </div>

                <TeamLogo
                  name={match.away}
                  code={match.awayCode}
                  size={46}
                />
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

        <h1>🎰 Casino</h1>

        <p>
          Roulette, Blackjack,
          Slots, Crash, Jackpot
          and more.
        </p>

        <div
          style={{
            fontSize: "55px",
            marginTop: "15px",
          }}
        >
          🎡 🃏 💰 🚀
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
              type="button"
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
              type="button"
              className="btn btn-gold"
              onClick={() =>
                alert(
                  `${game.name} is a UI demo.`
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

        <h1>🔴 Live Casino</h1>

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
              type="button"
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
              type="button"
              className="btn btn-gold"
              onClick={() =>
                alert(
                  `${game.name} is a UI demo.`
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

              <h3>{game}</h3>

              <p
                style={{
                  opacity: 0.7,
                }}
              >
                GoldenBet Original
              </p>

              <button
                type="button"
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

        <h1>🎁 Promotions</h1>
      </div>

      <div className="promotion-grid">
        <div className="promotion-card">
          <span>WELCOME</span>

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
          <span>VIP</span>

          <h2>Golden VIP</h2>

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

    try {
      const {
        error: loginError,
      } =
        await supabase.auth.signInWithPassword(
          {
            email:
              email.trim(),
            password,
          }
        );

      if (loginError) {
        setError(
          loginError.message
        );
        return;
      }

      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        "Unable to login right now."
      );
    } finally {
      setLoading(false);
    }
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

    try {
      const {
        data,
        error: signUpError,
      } =
        await supabase.auth.signUp({
          email:
            email.trim(),
          password,
          options: {
            data: {
              username:
                username.trim(),
            },
          },
        });

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
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        "Unable to create account right now."
      );
    } finally {
      setLoading(false);
    }
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
    let mounted = true;

    async function loadProfile() {
      if (!session?.user?.id) {
        if (mounted) {
          setLoading(false);
        }
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

      if (mounted) {
        setProfile(data);
        setLoading(false);
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
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
        <h1>👤 Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {profile?.avatar_text ||
            "👤"}
        </div>

        <h2>{username}</h2>

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
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent:
              "center",
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
    let mounted = true;

    async function loadBalance() {
      if (!session?.user?.id) {
        if (mounted) {
          setLoading(false);
        }
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

      if (mounted) {
        setBalance(
          Number(
            data?.balance || 0
          )
        );

        setLoading(false);
      }
    }

    loadBalance();

    return () => {
      mounted = false;
    };
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

    const amountNumber =
      Number(amount);

    if (
      !Number.isFinite(
        amountNumber
      ) ||
      amountNumber <= 0
    ) {
      alert(
        "Please enter a valid amount."
      );
      return;
    }

    alert(
      `Withdrawal request prepared.\nAmount: ${amountNumber.toLocaleString()} IQD\nMethod: ${method}`
    );
  }

  return (
    <div className="page section">
      <div className="page-heading">
        <h1>💸 Withdraw</h1>

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
            <option value="Korek">
              Korek
            </option>

            <option value="Zain">
              Zain
            </option>

            <option value="Zain Cash">
              Zain Cash
            </option>

            <option value="Asiacell">
              Asiacell
            </option>

            <option value="FIB">
              FIB
            </option>

            <option value="FastPay">
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
    let mounted = true;

    async function loadBets() {
      if (!session?.user?.id) {
        if (mounted) {
          setLoading(false);
        }
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

      if (mounted) {
        setBets(data || []);
        setLoading(false);
      }
    }

    loadBets();

    return () => {
      mounted = false;
    };
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
        <h1>🧾 My Bets</h1>
      </div>

      {!bets.length ? (
        <div className="empty-state">
          <div
            style={{
              fontSize: "40px",
            }}
          >
            🧾
          </div>

          <h3>No bets yet</h3>

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
                          getStatusColor(
                            status
                          ),
                      }}
                    >
                      {status.toUpperCase()}
                    </strong>
                  </p>
                </div>

                <div>
                  <span>Stake</span>

                  <strong>
                    {Number(
                      bet.stake || 0
                    ).toLocaleString()}{" "}
                    IQD
                  </strong>
                </div>

                <div>
                  <span>Odds</span>

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
        <h1>⚙️ Settings</h1>
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
          type="button"
          className="btn btn-gold"
          onClick={saveSettings}
        >
          Save Settings
        </button>

        {saved && (
          <p
            style={{
              color: "#35d06f",
              marginTop: "12px",
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
        <h1>404</h1>

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
