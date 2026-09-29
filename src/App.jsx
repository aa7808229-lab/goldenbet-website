import { useEffect, useMemo, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import AdminDashboard from "./AdminDashboard";
import { marketGroups } from "./markets";
import PaymentCard from "./PaymentCard";
import { supabase } from "../lib/supabase";

/* =========================================================
   DATA
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
    leagues: ["Iraq Stars League", "Kurdistan Premier League"],
  },
  {
    name: "England",
    flag: "🏴",
    leagues: ["Premier League", "Championship", "League One"],
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    leagues: ["La Liga", "Segunda Division"],
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    leagues: ["Serie A", "Serie B"],
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    leagues: ["Bundesliga", "2. Bundesliga"],
  },
  {
    name: "France",
    flag: "🇫🇷",
    leagues: ["Ligue 1", "Ligue 2"],
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    leagues: ["Super Lig", "1. Lig"],
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    leagues: ["Saudi Pro League"],
  },
  {
    name: "UAE",
    flag: "🇦🇪",
    leagues: ["UAE Pro League"],
  },
  {
    name: "Qatar",
    flag: "🇶🇦",
    leagues: ["Qatar Stars League"],
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    leagues: ["Eredivisie"],
  },
  {
    name: "Portugal",
    flag: "🇵🇹",
    leagues: ["Primeira Liga"],
  },
  {
    name: "Belgium",
    flag: "🇧🇪",
    leagues: ["Pro League"],
  },
  {
    name: "Scotland",
    flag: "🏴",
    leagues: ["Premiership"],
  },
  {
    name: "Greece",
    flag: "🇬🇷",
    leagues: ["Super League"],
  },
  {
    name: "USA",
    flag: "🇺🇸",
    leagues: ["MLS"],
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    leagues: ["Serie A"],
  },
  {
    name: "Argentina",
    flag: "🇦🇷",
    leagues: ["Liga Profesional"],
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    leagues: ["Liga MX"],
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    leagues: ["J1 League"],
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    leagues: ["K League 1"],
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    leagues: ["A-League"],
  },
  {
    name: "International",
    flag: "🌍",
    leagues: ["International"],
  },
];

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
  { name: "Golden Fortune", category: "Slots", icon: "🎰" },
  { name: "Golden Roulette", category: "Roulette", icon: "🎡" },
  { name: "Golden Blackjack", category: "Blackjack", icon: "🃏" },
  { name: "Golden Baccarat", category: "Baccarat", icon: "♦️" },
  { name: "Golden Poker", category: "Poker", icon: "♠️" },
  { name: "Golden Crash", category: "Crash Games", icon: "🚀" },
  { name: "Golden Jackpot", category: "Jackpot", icon: "💰" },
  { name: "Golden Wheel", category: "Game Shows", icon: "🎡" },
  { name: "Golden Dice", category: "Table Games", icon: "🎲" },
  { name: "Golden Arcade", category: "Arcade", icon: "🕹️" },
  { name: "Golden Cards", category: "Instant Games", icon: "🃏" },
  { name: "Golden Mines", category: "Instant Games", icon: "💎" },
];

const liveGames = [
  { name: "Live Roulette", provider: "Evolution", icon: "🎡" },
  { name: "Live Blackjack", provider: "Evolution", icon: "🃏" },
  { name: "Live Baccarat", provider: "Ezugi", icon: "♦️" },
  { name: "Live Game Show", provider: "Pragmatic Play Live", icon: "🎤" },
  { name: "Live Dragon Tiger", provider: "TVBet", icon: "🐉" },
  { name: "Live Sic Bo", provider: "Ezugi", icon: "🎲" },
  { name: "Live Wheel", provider: "Evolution", icon: "🎡" },
  { name: "Live Poker", provider: "Ezugi", icon: "♠️" },
];

const goldenGames = [
  { name: "Golden Crash", icon: "🚀" },
  { name: "Golden Dice", icon: "🎲" },
  { name: "Golden Wheel", icon: "🎡" },
  { name: "Golden Mines", icon: "💎" },
  { name: "Golden Cards", icon: "🃏" },
  { name: "Golden Jackpot", icon: "💰" },
];

const matches = [
  {
    id: 1,
    home: "Real Madrid",
    away: "Barcelona",
    homeCode: "RMA",
    awayCode: "BAR",
    league: "La Liga",
    country: "Spain",
    time: "21:00",
    date: "Today",
  },
  {
    id: 2,
    home: "Arsenal",
    away: "Chelsea",
    homeCode: "ARS",
    awayCode: "CHE",
    league: "Premier League",
    country: "England",
    time: "20:30",
    date: "Today",
  },
  {
    id: 3,
    home: "Inter Milan",
    away: "AC Milan",
    homeCode: "INT",
    awayCode: "MIL",
    league: "Serie A",
    country: "Italy",
    time: "21:45",
    date: "Today",
  },
  {
    id: 4,
    home: "Bayern Munich",
    away: "Dortmund",
    homeCode: "BAY",
    awayCode: "BVB",
    league: "Bundesliga",
    country: "Germany",
    time: "22:00",
    date: "Today",
  },
  {
    id: 5,
    home: "Al-Shorta",
    away: "Al-Zawraa",
    homeCode: "SHR",
    awayCode: "ZWR",
    league: "Iraq Stars League",
    country: "Iraq",
    time: "19:30",
    date: "Today",
  },
  {
    id: 6,
    home: "Duhok",
    away: "Erbil",
    homeCode: "DUH",
    awayCode: "ERB",
    league: "Kurdistan Premier League",
    country: "Iraq",
    time: "20:00",
    date: "Today",
  },
  {
    id: 7,
    home: "Liverpool",
    away: "Manchester City",
    homeCode: "LIV",
    awayCode: "MCI",
    league: "Premier League",
    country: "England",
    time: "20:00",
    date: "Today",
  },
  {
    id: 8,
    home: "Manchester United",
    away: "Tottenham",
    homeCode: "MUN",
    awayCode: "TOT",
    league: "Premier League",
    country: "England",
    time: "21:00",
    date: "Today",
  },
  {
    id: 9,
    home: "Juventus",
    away: "Napoli",
    homeCode: "JUV",
    awayCode: "NAP",
    league: "Serie A",
    country: "Italy",
    time: "21:45",
    date: "Today",
  },
  {
    id: 10,
    home: "PSG",
    away: "Marseille",
    homeCode: "PSG",
    awayCode: "MAR",
    league: "Ligue 1",
    country: "France",
    time: "22:00",
    date: "Today",
  },
  {
    id: 11,
    home: "Galatasaray",
    away: "Fenerbahce",
    homeCode: "GAL",
    awayCode: "FEN",
    league: "Super Lig",
    country: "Turkey",
    time: "20:00",
    date: "Today",
  },
  {
    id: 12,
    home: "Al-Hilal",
    away: "Al-Nassr",
    homeCode: "HIL",
    awayCode: "NAS",
    league: "Saudi Pro League",
    country: "Saudi Arabia",
    time: "21:00",
    date: "Today",
  },
  {
    id: 13,
    home: "Ajax",
    away: "PSV",
    homeCode: "AJA",
    awayCode: "PSV",
    league: "Eredivisie",
    country: "Netherlands",
    time: "19:45",
    date: "Today",
  },
  {
    id: 14,
    home: "Benfica",
    away: "Porto",
    homeCode: "BEN",
    awayCode: "POR",
    league: "Primeira Liga",
    country: "Portugal",
    time: "21:15",
    date: "Today",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getSelectionStatus(bet) {
  return bet?.result || bet?.selectionResult || "pending";
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

function safeOdds(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 1;
}

function TeamLogo({ name, code, src, size = 48 }) {
  const [failed, setFailed] = useState(false);

  const initials =
    code ||
    String(name || "TM")
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();

  if (!src || failed) {
    return (
      <div
        style={{
          width: size,
          height: size,
          minWidth: size,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#1c1c1c,#080808)",
          border: "1px solid rgba(255,215,0,.3)",
          color: "#f2c94c",
          fontWeight: 800,
          fontSize: Math.max(10, size / 4),
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{
        objectFit: "contain",
        borderRadius: 12,
      }}
    />
  );
}

/* =========================================================
   HEADER
========================================================= */

function GoldenBetHeader({ bets = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSession, setHeaderSession] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setHeaderSession(data?.session || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHeaderSession(session || null);
    });

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  if (location.pathname === "/") return null;

  async function logout() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(8,8,8,.96)",
        borderBottom: "1px solid rgba(242,201,76,.2)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#f2c94c",
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: 1,
            whiteSpace: "nowrap",
          }}
        >
          GOLDENBET
        </Link>

        <nav
          style={{
            display: "flex",
            gap: 6,
            flex: 1,
            overflowX: "auto",
          }}
        >
          <HeaderLink to="/" label="Home" />
          <HeaderLink to="/sports" label="Sports" />
          <HeaderLink to="/live" label="Live" />
          <HeaderLink to="/casino" label="Casino" />
          <HeaderLink to="/live-casino" label="Live Casino" />
          <HeaderLink to="/golden-games" label="Golden Games" />
          <HeaderLink to="/promotions" label="Promotions" />
        </nav>

        <Link
          to="/bet-slip"
          style={{
            textDecoration: "none",
            color: "#111",
            background: "#f2c94c",
            padding: "9px 13px",
            borderRadius: 10,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          🎫 {bets.length}
        </Link>

        {headerSession ? (
          <>
            <Link
              to="/profile"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Profile
            </Link>

            <button
              onClick={logout}
              style={{
                background: "transparent",
                color: "#f2c94c",
                border: "1px solid rgba(242,201,76,.4)",
                borderRadius: 9,
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "#111",
                background: "#f2c94c",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: 9,
                fontWeight: 800,
              }}
            >
              Register
            </Link>
          </>
        )}

        <button
          onClick={() => setMenuOpen((value) => !value)}
          style={{
            display: "none",
            background: "transparent",
            border: 0,
            color: "#fff",
            fontSize: 24,
            cursor: "pointer",
          }}
          className="mobile-menu-button"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            padding: 15,
            borderTop: "1px solid rgba(255,255,255,.08)",
            background: "#0b0b0b",
          }}
        >
          {[
            ["/", "🏠 Home"],
            ["/sports", "⚽ Sports"],
            ["/live", "🔴 Live Sports"],
            ["/casino", "🎰 Casino"],
            ["/live-casino", "🎥 Live Casino"],
            ["/golden-games", "💎 Golden Games"],
            ["/promotions", "🎁 Promotions"],
            ["/bet-slip", `🎫 Bet Slip (${bets.length})`],
            ["/profile", "👤 Profile"],
            ["/balance", "💰 Balance"],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 5px",
                color: "#fff",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,.05)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function HeaderLink({ to, label }) {
  return (
    <Link
      to={to}
      style={{
        color: "#ddd",
        textDecoration: "none",
        padding: "8px 10px",
        borderRadius: 8,
        whiteSpace: "nowrap",
        fontSize: 14,
      }}
    >
      {label}
    </Link>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [bets, setBets] = useState([]);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (mounted) {
          setSession(data?.session || null);
          setAuthLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setAuthLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) setSession(nextSession || null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  function addBet(bet) {
    if (!bet) return;

    setBets((current) => {
      const sameSelection = current.some(
        (item) =>
          String(item.matchId) === String(bet.matchId) &&
          String(item.marketId) === String(bet.marketId)
      );

      if (sameSelection) {
        return current.map((item) =>
          String(item.matchId) === String(bet.matchId) &&
          String(item.marketId) === String(bet.marketId)
            ? bet
            : item
        );
      }

      const uniqueMatches = new Set(
        current.map((item) => String(item.matchId))
      );

      if (
        !uniqueMatches.has(String(bet.matchId)) &&
        uniqueMatches.size >= 20
      ) {
        alert("Maximum 20 matches are allowed in one bet slip.");
        return current;
      }

      return [...current, bet];
    });
  }

  function removeBet(id) {
    setBets((current) =>
      current.filter((bet) => String(bet.id) !== String(id))
    );
  }

  function clearBets() {
    setBets([]);
  }

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#070707",
          color: "#f2c94c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        GOLDENBET
      </div>
    );
  }

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#fff",
      }}
    >
      <GoldenBetHeader bets={bets} />

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
          element={<Sports bets={bets} addBet={addBet} />}
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
          element={<MatchPage bets={bets} addBet={addBet} />}
        />

        <Route path="/live" element={<Live />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/live-casino" element={<LiveCasino />} />
        <Route path="/golden-games" element={<GoldenGames />} />
        <Route path="/promotions" element={<Promotions />} />

        <Route
          path="/login"
          element={<Login setSession={setSession} />}
        />

        <Route
          path="/register"
          element={<Register setSession={setSession} />}
        />

        <Route path="/profile" element={<Profile session={session} />} />
        <Route path="/balance" element={<Balance session={session} />} />
        <Route path="/deposit" element={<Deposit session={session} />} />
        <Route path="/withdraw" element={<Withdraw session={session} />} />
        <Route path="/my-bets" element={<MyBets session={session} />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/super-admin" element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home({
  bets = [],
  addBet,
  removeBet,
  clearBets,
  session,
}) {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 60px)",
        background:
          "radial-gradient(circle at top, rgba(242,201,76,.16), transparent 30%), #050505",
        paddingBottom: 90,
      }}
    >
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "45px 18px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                color: "#f2c94c",
                fontWeight: 900,
                fontSize: 13,
                letterSpacing: 3,
              }}
            >
              PREMIUM BETTING
            </div>

            <h1
              style={{
                margin: "10px 0 8px",
                fontSize: "clamp(34px,6vw,70px)",
                lineHeight: 1,
                fontWeight: 950,
              }}
            >
              GOLDEN<span style={{ color: "#f2c94c" }}>BET</span>
            </h1>

            <p
              style={{
                color: "#aaa",
                maxWidth: 620,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Sports betting, live matches, casino and Golden Games in one
              place.
            </p>
          </div>

          <div
            style={{
              border: "1px solid rgba(242,201,76,.3)",
              borderRadius: 18,
              padding: 18,
              background: "rgba(255,255,255,.035)",
              minWidth: 180,
            }}
          >
            <div style={{ fontSize: 28 }}>👑</div>
            <strong style={{ color: "#f2c94c" }}>GOLDEN VIP</strong>
            <div style={{ color: "#aaa", marginTop: 5, fontSize: 13 }}>
              Premium experience
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 15,
            marginTop: 35,
          }}
        >
          <HomeImageCard
            image="/roulette.jpg"
            title="Casino"
            text="Explore casino games"
            to="/casino"
          />

          <HomeImageCard
            image="/goldenbet.jpg"
            title="Golden Games"
            text="Play Golden exclusive games"
            to="/golden-games"
          />

          <HomeImageCard
            image="/football.jpg"
            title="Sports"
            text="Bet on today's matches"
            to="/sports"
          />
        </div>

        <section style={{ marginTop: 35 }}>
          <h2 style={{ marginBottom: 15 }}>Quick Access</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,minmax(0,1fr))",
              gap: 12,
            }}
          >
            <HomeQuickButton to="/sports" icon="⚽" label="Sports" />
            <HomeQuickButton
              to="/bet-slip"
              icon="🎫"
              label="Coupons"
              count={bets.length}
            />
            <HomeQuickButton
              to="/golden-games"
              icon="💎"
              label="Golden Games"
            />
            <HomeQuickButton to="/casino" icon="🎰" label="Casino" />
          </div>
        </section>

        {!session && (
          <section
            style={{
              marginTop: 35,
              padding: 25,
              borderRadius: 18,
              background:
                "linear-gradient(135deg,rgba(242,201,76,.18),rgba(255,255,255,.03))",
              border: "1px solid rgba(242,201,76,.25)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32 }}>👑</div>
            <h2>Join GoldenBet</h2>
            <p style={{ color: "#aaa" }}>
              Create your account and start using GoldenBet.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn btn-primary" to="/register">
                Register
              </Link>

              <Link className="btn" to="/login">
                Login
              </Link>
            </div>
          </section>
        )}
      </section>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          background: "rgba(8,8,8,.97)",
          borderTop: "1px solid rgba(242,201,76,.2)",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          padding: "8px 5px",
          backdropFilter: "blur(12px)",
        }}
      >
        <HomeBottomButton to="/sports" icon="⚽" label="Sports" />
        <HomeBottomButton
          to="/bet-slip"
          icon="🎫"
          label="Coupons"
          count={bets.length}
        />
        <HomeBottomButton
          to="/golden-games"
          icon="💎"
          label="Golden"
        />
        <HomeBottomButton to="/casino" icon="🎰" label="Casino" />
      </div>
    </main>
  );
}

function HomeImageCard({ image, title, text, to }) {
  return (
    <Link
      to={to}
      style={{
        minHeight: 220,
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
        color: "#fff",
        border: "1px solid rgba(255,255,255,.08)",
        background: "#111",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.65,
        }}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: 20,
          background:
            "linear-gradient(transparent,rgba(0,0,0,.95))",
        }}
      >
        <div
          style={{
            color: "#f2c94c",
            fontWeight: 900,
            fontSize: 21,
          }}
        >
          {title}
        </div>

        <div style={{ color: "#ddd", marginTop: 5 }}>{text}</div>
      </div>
    </Link>
  );
}

function HomeQuickButton({ to, icon, label, count }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#fff",
        padding: 18,
        borderRadius: 15,
        background: "rgba(255,255,255,.045)",
        border: "1px solid rgba(255,255,255,.07)",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div style={{ fontSize: 25 }}>{icon}</div>
      <div style={{ marginTop: 7, fontWeight: 800 }}>{label}</div>

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: 7,
            right: 7,
            background: "#f2c94c",
            color: "#111",
            minWidth: 22,
            height: 22,
            borderRadius: 50,
            display: "grid",
            placeItems: "center",
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

function HomeBottomButton({ to, icon, label, count }) {
  return (
    <Link
      to={to}
      style={{
        position: "relative",
        color: "#ddd",
        textDecoration: "none",
        textAlign: "center",
        fontSize: 12,
        padding: 4,
      }}
    >
      <div style={{ fontSize: 20 }}>{icon}</div>
      <div>{label}</div>

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: 0,
            right: "20%",
            background: "#f2c94c",
            color: "#111",
            borderRadius: 50,
            minWidth: 18,
            height: 18,
            display: "grid",
            placeItems: "center",
            fontSize: 10,
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
   BET SLIP
========================================================= */

function BetSlipPage({
  bets = [],
  removeBet,
  clearBets,
  session,
}) {
  return (
    <main className="page">
      <div className="page-container">
        <BetSlip
          bets={bets}
          removeBet={removeBet}
          clearBets={clearBets}
          session={session}
        />
      </div>
    </main>
  );
}

function BetSlip({
  bets = [],
  removeBet,
  clearBets,
  session,
}) {
  const [stake, setStake] = useState("");
  const [placing, setPlacing] = useState(false);

  const groupedBets = useMemo(() => {
    const groups = new Map();

    for (const bet of bets) {
      const key = String(bet.matchId);

      if (!groups.has(key)) {
        groups.set(key, {
          matchId: bet.matchId,
          match: bet.match,
          league: bet.league,
          time: bet.time,
          selections: [],
        });
      }

      groups.get(key).selections.push(bet);
    }

    return Array.from(groups.values());
  }, [bets]);

  const matchGroups = groupedBets.map((group) => ({
    ...group,
    combinedOdds: group.selections.reduce(
      (total, bet) => total * safeOdds(bet.odds),
      1
    ),
  }));

  const totalOdds = matchGroups.reduce(
    (total, group) => total * group.combinedOdds,
    1
  );

  const stakeNumber = Number(stake);
  const potentialReturn =
    Number.isFinite(stakeNumber) && stakeNumber > 0
      ? stakeNumber * totalOdds
      : 0;

  async function placeBet() {
    if (!bets.length) {
      alert("Your bet slip is empty.");
      return;
    }

    if (!Number.isFinite(stakeNumber) || stakeNumber <= 0) {
      alert("Please enter a valid stake.");
      return;
    }

    if (!session?.user?.id) {
      alert("Please login first.");
      return;
    }

    setPlacing(true);

    try {
      const matchNames = groupedBets
        .map((group) => group.match)
        .join(" | ");

      const { error } = await supabase.from("bets").insert({
        user_id: session.user.id,
        match_name: matchNames,
        stake: stakeNumber,
        total_odds: Number(totalOdds),
        potential_win: Number(potentialReturn),
        status: "pending",
      });

      if (error) {
        throw error;
      }

      alert("Bet placed successfully.");

      setStake("");
      clearBets();
    } catch (error) {
      console.error(error);
      alert(error?.message || "Could not place bet.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 5 }}>Bet Slip</h1>
          <div style={{ color: "#999" }}>
            {bets.length} selection{bets.length === 1 ? "" : "s"}
          </div>
        </div>

        {bets.length > 0 && (
          <button className="btn" onClick={clearBets}>
            Clear All
          </button>
        )}
      </div>

      {!bets.length ? (
        <div className="empty-state">
          <div style={{ fontSize: 50 }}>🎫</div>
          <h2>Your bet slip is empty</h2>
          <p>Select odds from the sports section.</p>
          <Link className="btn btn-primary" to="/sports">
            Browse Sports
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) 330px",
            gap: 20,
          }}
        >
          <div>
            {matchGroups.map((group) => (
              <div className="card" key={group.matchId}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <strong>{group.match}</strong>
                    <div style={{ color: "#888", fontSize: 12 }}>
                      {group.league} • {group.time}
                    </div>
                  </div>

                  <div
                    style={{
                      color: "#f2c94c",
                      fontWeight: 900,
                    }}
                  >
                    {group.combinedOdds.toFixed(2)}
                  </div>
                </div>

                {group.selections.map((bet) => (
                  <div
                    key={bet.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 0",
                      borderTop: "1px solid rgba(255,255,255,.06)",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700 }}>
                        {bet.marketTitle}
                      </div>

                      <div style={{ color: "#aaa", fontSize: 13 }}>
                        {bet.selection}
                        {bet.label ? ` — ${bet.label}` : ""}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <strong style={{ color: "#f2c94c" }}>
                        {safeOdds(bet.odds).toFixed(2)}
                      </strong>

                      <button
                        onClick={() => removeBet(bet.id)}
                        style={{
                          border: 0,
                          background: "rgba(255,77,79,.12)",
                          color: "#ff6464",
                          borderRadius: 7,
                          padding: "5px 8px",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div
            className="card"
            style={{
              height: "fit-content",
              position: "sticky",
              top: 90,
            }}
          >
            <h2 style={{ marginTop: 0 }}>Bet Summary</h2>

            <div className="summary-row">
              <span>Matches</span>
              <strong>{matchGroups.length}</strong>
            </div>

            <div className="summary-row">
              <span>Total selections</span>
              <strong>{bets.length}</strong>
            </div>

            <div className="summary-row">
              <span>Total odds</span>
              <strong style={{ color: "#f2c94c" }}>
                {totalOdds.toFixed(2)}
              </strong>
            </div>

            <label style={{ display: "block", marginTop: 20 }}>
              <span style={{ display: "block", marginBottom: 7 }}>
                Stake
              </span>

              <input
                className="input"
                type="number"
                min="0"
                step="any"
                value={stake}
                onChange={(event) => setStake(event.target.value)}
                placeholder="Enter stake"
              />
            </label>

            <div className="summary-row" style={{ marginTop: 15 }}>
              <span>Potential Win</span>
              <strong style={{ color: "#35d06f", fontSize: 20 }}>
                {potentialReturn.toFixed(2)}
              </strong>
            </div>

            <button
              className="btn btn-primary"
              onClick={placeBet}
              disabled={placing}
              style={{
                width: "100%",
                marginTop: 18,
                opacity: placing ? 0.6 : 1,
              }}
            >
              {placing ? "Placing..." : "Place Bet"}
            </button>

            {!session && (
              <div
                style={{
                  marginTop: 12,
                  color: "#aaa",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                Login is required before placing a bet.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   MATCH CARD
========================================================= */

function MatchCard({ match, bets = [], addBet }) {
  const selectedForMatch = bets.filter(
    (bet) => String(bet.matchId) === String(match.id)
  );

  const combinedOdds = selectedForMatch.reduce(
    (total, bet) => total * safeOdds(bet.odds),
    1
  );

  return (
    <div className="match-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          color: "#999",
          fontSize: 12,
          marginBottom: 15,
        }}
      >
        <span>
          {match.country} • {match.league}
        </span>

        <span>{match.time}</span>
      </div>

      <Link
        to={`/match/${match.id}`}
        style={{
          color: "#fff",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 15,
          }}
        >
          <TeamSide
            name={match.home}
            code={match.homeCode}
            align="right"
          />

          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(242,201,76,.12)",
              display: "grid",
              placeItems: "center",
              color: "#f2c94c",
              fontWeight: 900,
            }}
          >
            VS
          </div>

          <TeamSide
            name={match.away}
            code={match.awayCode}
            align="left"
          />
        </div>
      </Link>

      {marketGroups?.[0] && (
        <div style={{ marginTop: 18 }}>
          <MarketGroup
            group={marketGroups[0]}
            match={match}
            addBet={addBet}
            bets={bets}
            compact
          />
        </div>
      )}

      {selectedForMatch.length > 0 && (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 10,
            background: "rgba(242,201,76,.08)",
            border: "1px solid rgba(242,201,76,.18)",
          }}
        >
          <div
            style={{
              color: "#f2c94c",
              fontWeight: 800,
              marginBottom: 7,
            }}
          >
            Bet Builder
          </div>

          {selectedForMatch.map((bet) => (
            <div
              key={bet.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                fontSize: 13,
                padding: "4px 0",
              }}
            >
              <span>{bet.selection}</span>
              <strong>{safeOdds(bet.odds).toFixed(2)}</strong>
            </div>
          ))}

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,.07)",
              marginTop: 8,
              paddingTop: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Combined</span>
            <strong style={{ color: "#f2c94c" }}>
              {combinedOdds.toFixed(2)}
            </strong>
          </div>
        </div>
      )}

      <Link
        to={`/match/${match.id}`}
        className="btn"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: 15,
        }}
      >
        View All Markets
      </Link>
    </div>
  );
}

function TeamSide({ name, code, align }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        gap: 10,
        textAlign: align,
      }}
    >
      {align === "right" && (
        <strong style={{ fontSize: 14 }}>{name}</strong>
      )}

      <TeamLogo name={name} code={code} size={42} />

      {align === "left" && (
        <strong style={{ fontSize: 14 }}>{name}</strong>
      )}
    </div>
  );
}

/* =========================================================
   MATCH PAGE
========================================================= */

function MatchPage({ bets = [], addBet }) {
  const { id } = useParams();

  const match = matches.find(
    (item) => String(item.id) === String(id)
  );

  if (!match) {
    return <NotFound />;
  }

  const selectedCount = bets.filter(
    (bet) => String(bet.matchId) === String(match.id)
  ).length;

  return (
    <main className="page">
      <div className="page-container">
        <Link to="/sports" className="back-link">
          ← Back to Sports
        </Link>

        <section className="card" style={{ marginTop: 15 }}>
          <div
            style={{
              textAlign: "center",
              color: "#999",
              fontSize: 13,
            }}
          >
            {match.country} • {match.league} • {match.date} • {match.time}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: 20,
              marginTop: 25,
            }}
          >
            <TeamSide
              name={match.home}
              code={match.homeCode}
              align="right"
            />

            <div
              style={{
                textAlign: "center",
                color: "#f2c94c",
                fontWeight: 900,
              }}
            >
              VS
              <div
                style={{
                  marginTop: 5,
                  fontSize: 11,
                  color: "#777",
                }}
              >
                {selectedCount} selected
              </div>
            </div>

            <TeamSide
              name={match.away}
              code={match.awayCode}
              align="left"
            />
          </div>
        </section>

        <div style={{ marginTop: 20 }}>
          {Array.isArray(marketGroups) &&
            marketGroups.map((group) => (
              <MarketGroup
                key={group.id}
                group={group}
                match={match}
                bets={bets}
                addBet={addBet}
              />
            ))}
        </div>

        <Link
          to="/bet-slip"
          className="btn btn-primary"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          🎫 Open Bet Slip ({bets.length})
        </Link>
      </div>
    </main>
  );
}

/* =========================================================
   MARKETS
========================================================= */

function MarketGroup({
  group,
  match,
  bets = [],
  addBet,
  compact = false,
}) {
  if (!group) return null;

  const markets = Array.isArray(group.markets)
    ? group.markets
    : [];

  return (
    <div
      className="market-group"
      style={{
        marginBottom: compact ? 10 : 18,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <h3 style={{ margin: 0 }}>{group.title}</h3>

        {!compact && (
          <span style={{ color: "#777", fontSize: 12 }}>
            {markets.length} markets
          </span>
        )}
      </div>

      {markets.map((market) => (
        <Market
          key={market.id}
          market={market}
          group={group}
          match={match}
          bets={bets}
          addBet={addBet}
          compact={compact}
        />
      ))}
    </div>
  );
}

function Market({
  market,
  group,
  match,
  bets = [],
  addBet,
  compact = false,
}) {
  if (!market) return null;

  const selections = Array.isArray(market.selections)
    ? market.selections
    : [];

  return (
    <div
      className="market-card"
      style={{
        marginBottom: 10,
        padding: compact ? 8 : 12,
      }}
    >
      <div
        style={{
          color: "#aaa",
          fontSize: 12,
          marginBottom: 8,
        }}
      >
        {market.title}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            selections.length > 3
              ? "repeat(2,minmax(0,1fr))"
              : `repeat(${Math.max(
                  selections.length,
                  1
                )},minmax(0,1fr))`,
          gap: 7,
        }}
      >
        {selections.map((selection) => {
          const existing = bets.find(
            (bet) =>
              String(bet.matchId) === String(match.id) &&
              String(bet.marketId) === String(market.id) &&
              String(bet.selectionKey) ===
                String(selection.key)
          );

          const odds = safeOdds(selection.odds);

          const bet = {
            id: `${match.id}-${market.id}-${selection.key}`,
            matchId: match.id,
            match: `${match.home} vs ${match.away}`,
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
          };

          return (
            <button
              key={selection.key}
              onClick={() => addBet?.(bet)}
              style={{
                border: existing
                  ? "1px solid #f2c94c"
                  : "1px solid rgba(255,255,255,.08)",
                background: existing
                  ? "rgba(242,201,76,.16)"
                  : "rgba(255,255,255,.035)",
                color: "#fff",
                borderRadius: 8,
                padding: compact ? "8px 6px" : "10px 7px",
                cursor: "pointer",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selection.name}
              </div>

              <strong
                style={{
                  color: "#f2c94c",
                  display: "block",
                  marginTop: 3,
                }}
              >
                {odds.toFixed(2)}
              </strong>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   SPORTS
========================================================= */

function Sports({ bets = [], addBet }) {
  const [sport, setSport] = useState("Football");
  const [country, setCountry] = useState("All");
  const [league, setLeague] = useState("All");
  const [search, setSearch] = useState("");

  const leagues = useMemo(() => {
    if (country === "All") {
      return sportsCountries.flatMap((item) => item.leagues);
    }

    return (
      sportsCountries.find((item) => item.name === country)
        ?.leagues || []
    );
  }, [country]);

  const filteredMatches = useMemo(() => {
    if (sport !== "Football") return [];

    return matches.filter((match) => {
      const countryMatch =
        country === "All" || match.country === country;

      const leagueMatch =
        league === "All" || match.league === league;

      const query = search.trim().toLowerCase();

      const searchMatch =
        !query ||
        match.home.toLowerCase().includes(query) ||
        match.away.toLowerCase().includes(query) ||
        match.league.toLowerCase().includes(query) ||
        match.country.toLowerCase().includes(query);

      return countryMatch && leagueMatch && searchMatch;
    });
  }, [sport, country, league, search]);

  function changeCountry(value) {
    setCountry(value);
    setLeague("All");
  }

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <h1>Sports</h1>
            <p>Choose a sport and start building your bet.</p>
          </div>

          <Link className="btn btn-primary" to="/bet-slip">
            🎫 Bet Slip ({bets.length})
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 10,
            marginBottom: 15,
          }}
        >
          {sports.map((item) => (
            <button
              key={item}
              className={sport === item ? "filter-active" : "filter-btn"}
              onClick={() => setSport(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {sport === "Football" ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(180px,1fr))",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <select
                className="input"
                value={country}
                onChange={(event) =>
                  changeCountry(event.target.value)
                }
              >
                <option value="All">All Countries</option>

                {sportsCountries.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.flag} {item.name}
                  </option>
                ))}
              </select>

              <select
                className="input"
                value={league}
                onChange={(event) =>
                  setLeague(event.target.value)
                }
              >
                <option value="All">All Leagues</option>

                {leagues.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                className="input"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search team or league..."
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(300px,1fr))",
                gap: 14,
              }}
            >
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  bets={bets}
                  addBet={addBet}
                />
              ))}
            </div>

            {!filteredMatches.length && (
              <div className="empty-state">
                <div style={{ fontSize: 40 }}>🔎</div>
                <h3>No matches found</h3>
                <p>Try another country, league or search.</p>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div style={{ fontSize: 45 }}>🏆</div>
            <h2>{sport}</h2>
            <p>
              Live API markets can be connected here when the sports
              provider is configured.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   LIVE
========================================================= */

function Live() {
  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <h1>🔴 Live Sports</h1>
            <p>Live match interface.</p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: 14,
          }}
        >
          {matches.slice(0, 8).map((match, index) => (
            <Link
              key={match.id}
              to={`/match/${match.id}`}
              className="match-card"
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    color: "#ff4d4f",
                    fontWeight: 900,
                  }}
                >
                  ● LIVE
                </span>

                <span style={{ color: "#777" }}>
                  2nd Half
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>{match.home}</strong>

                <strong
                  style={{
                    color: "#f2c94c",
                    fontSize: 22,
                  }}
                >
                  {index % 2 === 0 ? "1 - 0" : "2 - 1"}
                </strong>

                <strong>{match.away}</strong>
              </div>

              <div
                style={{
                  color: "#777",
                  fontSize: 12,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                LIVE DEMO
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   CASINO
========================================================= */

function Casino() {
  const [category, setCategory] = useState("All Games");

  const games =
    category === "All Games"
      ? casinoGames
      : casinoGames.filter(
          (game) => game.category === category
        );

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <h1>🎰 Casino</h1>
            <p>GoldenBet casino games.</p>
          </div>
        </div>

        <div className="category-scroll">
          {casinoCategories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "filter-active"
                  : "filter-btn"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="game-grid">
          {games.map((game) => (
            <GameCard
              key={game.name}
              icon={game.icon}
              name={game.name}
              category={game.category}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function GameCard({ icon, name, category }) {
  return (
    <div className="game-card">
      <div className="game-icon">{icon}</div>

      <h3>{name}</h3>

      <div
        style={{
          color: "#777",
          fontSize: 12,
          marginBottom: 12,
        }}
      >
        {category}
      </div>

      <button
        className="btn btn-primary"
        style={{ width: "100%" }}
        onClick={() =>
          alert(`${name} is currently a UI demo.`)
        }
      >
        Play
      </button>
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
      : liveGames.filter((game) => {
          if (category.startsWith("Live ")) {
            return game.name === category;
          }

          return game.provider === category;
        });

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <h1>🎥 Live Casino</h1>
            <p>Live casino interface.</p>
          </div>
        </div>

        <div className="category-scroll">
          {liveCasinoCategories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "filter-active"
                  : "filter-btn"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="game-grid">
          {games.map((game) => (
            <div className="game-card" key={game.name}>
              <div className="game-icon">{game.icon}</div>

              <h3>{game.name}</h3>

              <div
                style={{
                  color: "#777",
                  fontSize: 12,
                  marginBottom: 12,
                }}
              >
                {game.provider}
              </div>

              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() =>
                  alert(
                    `${game.name} is currently a UI demo.`
                  )
                }
              >
                Enter
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   GOLDEN GAMES
========================================================= */

function GoldenGames() {
  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <h1>💎 Golden Games</h1>
            <p>Exclusive GoldenBet games.</p>
          </div>
        </div>

        <div className="game-grid">
          {goldenGames.map((game) => (
            <div className="game-card" key={game.name}>
              <div className="game-icon">{game.icon}</div>

              <h3>{game.name}</h3>

              <p style={{ color: "#777", fontSize: 13 }}>
                GoldenBet exclusive
              </p>

              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() =>
                  alert(
                    `${game.name} preview is currently available.`
                  )
                }
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   PROMOTIONS
========================================================= */

function Promotions() {
  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <h1>🎁 Promotions</h1>
            <p>GoldenBet promotional offers.</p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: 18,
          }}
        >
          <div className="card">
            <div style={{ fontSize: 40 }}>🎉</div>
            <h2>Welcome Bonus</h2>
            <p style={{ color: "#aaa", lineHeight: 1.7 }}>
              Welcome promotion interface for new users.
            </p>
            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
          </div>

          <div className="card">
            <div style={{ fontSize: 40 }}>👑</div>
            <h2>Golden VIP</h2>
            <p style={{ color: "#aaa", lineHeight: 1.7 }}>
              Premium VIP experience and special offers.
            </p>
            <Link className="btn btn-primary" to="/register">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   AUTH
========================================================= */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (signInError) throw signInError;

      navigate("/");
    } catch (err) {
      setError(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo">GOLDENBET</div>

        <h1>Login</h1>

        <p style={{ color: "#888" }}>
          Login to your GoldenBet account.
        </p>

        {error && <div className="error-box">{error}</div>}

        <input
          className="input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />

        <input
          className="input"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Password"
          required
        />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ color: "#888", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </main>
  );
}

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              username: username.trim(),
            },
          },
        });

      if (signUpError) throw signUpError;

      if (data?.session) {
        navigate("/");
      } else {
        setMessage(
          "Registration successful. Please check your email if email confirmation is enabled."
        );
      }
    } catch (err) {
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo">GOLDENBET</div>

        <h1>Create Account</h1>

        {error && <div className="error-box">{error}</div>}

        {message && <div className="success-box">{message}</div>}

        <input
          className="input"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          placeholder="Username"
          required
        />

        <input
          className="input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />

        <input
          className="input"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Password"
          required
        />

        <input
          className="input"
          type="password"
          value={confirm}
          onChange={(event) =>
            setConfirm(event.target.value)
          }
          placeholder="Confirm Password"
          required
        />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p style={{ color: "#888", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function Profile({ session }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    let active = true;

    async function loadProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, avatar_text, balance")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!active) return;

      if (error) {
        console.error(error);
      }

      setProfile(data || null);
      setLoading(false);
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [session]);

  if (!session) {
    return <LoginRequired />;
  }

  const username =
    profile?.username ||
    session.user.user_metadata?.username ||
    "Golden User";

  const balance = Number(profile?.balance || 0);

  return (
    <main className="page">
      <div className="page-container">
        <div className="profile-hero">
          <div className="avatar">
            {profile?.avatar_text ||
              username.slice(0, 1).toUpperCase()}
          </div>

          <div>
            <h1 style={{ margin: 0 }}>{username}</h1>
            <p style={{ color: "#888", marginBottom: 0 }}>
              {session.user.email}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">Loading profile...</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: 14,
              marginTop: 18,
            }}
          >
            <div className="card">
              <div style={{ color: "#888" }}>Balance</div>
              <div
                style={{
                  fontSize: 28,
                  color: "#f2c94c",
                  fontWeight: 900,
                  marginTop: 5,
                }}
              >
                {balance.toFixed(2)}
              </div>
            </div>

            <div className="card">
              <div style={{ color: "#888" }}>Email</div>
              <div
                style={{
                  fontWeight: 800,
                  marginTop: 5,
                  wordBreak: "break-word",
                }}
              >
                {session.user.email}
              </div>
            </div>
          </div>
        )}

        <div className="profile-links">
          <Link to="/balance" className="card-link">
            💰 Balance
          </Link>

          <Link to="/deposit" className="card-link">
            ➕ Deposit
          </Link>

          <Link to="/withdraw" className="card-link">
            ➖ Withdraw
          </Link>

          <Link to="/my-bets" className="card-link">
            🎫 My Bets
          </Link>

          <Link to="/settings" className="card-link">
            ⚙️ Settings
          </Link>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   BALANCE
========================================================= */

function Balance({ session }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!session?.user?.id) return;

    async function loadBalance() {
      const { data } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", session.user.id)
        .maybeSingle();

      setBalance(Number(data?.balance || 0));
    }

    loadBalance();
  }, [session]);

  if (!session) {
    return <LoginRequired />;
  }

  return (
    <main className="page">
      <div className="page-container">
        <div className="card balance-card">
          <div style={{ color: "#999" }}>Available Balance</div>

          <div
            style={{
              fontSize: 46,
              fontWeight: 950,
              color: "#f2c94c",
              margin: "8px 0 25px",
            }}
          >
            {balance.toFixed(2)}
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <Link className="btn btn-primary" to="/deposit">
              Deposit
            </Link>

            <Link className="btn" to="/withdraw">
              Withdraw
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   DEPOSIT
========================================================= */

function Deposit({ session }) {
  if (!session) {
    return <LoginRequired />;
  }

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <h1>Deposit</h1>
            <p>Choose your payment method.</p>
          </div>
        </div>

        <PaymentCard />
      </div>
    </main>
  );
}

/* =========================================================
   WITHDRAW
========================================================= */

function Withdraw({ session }) {
  const [method, setMethod] = useState("Korek");
  const [amount, setAmount] = useState("");

  const methods = [
    "Korek",
    "Zain",
    "Zain Cash",
    "Asiacell",
    "FIB",
    "FastPay",
  ];

  function submit(event) {
    event.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    alert(
      `Withdrawal request demo: ${amount} via ${method}.`
    );
  }

  if (!session) {
    return <LoginRequired />;
  }

  return (
    <main className="page">
      <div className="page-container">
        <div className="card form-card">
          <h1>Withdraw</h1>

          <p style={{ color: "#888" }}>
            Withdrawal request interface.
          </p>

          <form onSubmit={submit}>
            <label className="form-label">
              Amount
            </label>

            <input
              className="input"
              type="number"
              min="0"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              placeholder="Amount"
            />

            <label className="form-label">
              Method
            </label>

            <select
              className="input"
              value={method}
              onChange={(event) =>
                setMethod(event.target.value)
              }
            >
              {methods.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button
              className="btn btn-primary"
              type="submit"
              style={{ marginTop: 15 }}
            >
              Request Withdrawal
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   MY BETS
========================================================= */

function MyBets({ session }) {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    let active = true;

    async function loadBets() {
      const { data, error } = await supabase
        .from("bets")
        .select(
          "id, match_name, stake, total_odds, potential_win, status, created_at"
        )
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        console.error(error);
      }

      setBets(data || []);
      setLoading(false);
    }

    loadBets();

    return () => {
      active = false;
    };
  }, [session]);

  if (!session) {
    return <LoginRequired />;
  }

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <h1>My Bets</h1>
            <p>Your betting history.</p>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">Loading...</div>
        ) : !bets.length ? (
          <div className="empty-state">
            <div style={{ fontSize: 45 }}>🎫</div>
            <h2>No bets yet</h2>
            <Link className="btn btn-primary" to="/sports">
              Start Betting
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {bets.map((bet) => {
              const status = String(
                bet.status || "pending"
              ).toLowerCase();

              return (
                <div className="card" key={bet.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <strong>{bet.match_name}</strong>

                      <div
                        style={{
                          color: "#777",
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        {bet.created_at
                          ? new Date(
                              bet.created_at
                            ).toLocaleString()
                          : ""}
                      </div>
                    </div>

                    <div
                      style={{
                        color: getStatusColor(status),
                        fontWeight: 900,
                      }}
                    >
                      {getStatusIcon(status)} {status}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(3,1fr)",
                      gap: 10,
                      marginTop: 15,
                    }}
                  >
                    <div>
                      <div className="muted">Stake</div>
                      <strong>
                        {Number(bet.stake || 0).toFixed(2)}
                      </strong>
                    </div>

                    <div>
                      <div className="muted">Odds</div>
                      <strong>
                        {Number(
                          bet.total_odds || 0
                        ).toFixed(2)}
                      </strong>
                    </div>

                    <div>
                      <div className="muted">
                        Potential Win
                      </div>
                      <strong style={{ color: "#35d06f" }}>
                        {Number(
                          bet.potential_win || 0
                        ).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1800);
  }

  return (
    <main className="page">
      <div className="page-container">
        <div className="card form-card">
          <h1>Settings</h1>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 20,
            }}
          >
            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) =>
                setNotifications(event.target.checked)
              }
            />
            Notifications
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 15,
            }}
          >
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(event) =>
                setDarkMode(event.target.checked)
              }
            />
            Dark Mode
          </label>

          <button
            className="btn btn-primary"
            onClick={save}
            style={{ marginTop: 25 }}
          >
            Save Settings
          </button>

          {saved && (
            <div className="success-box" style={{ marginTop: 15 }}>
              Settings saved.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   LOGIN REQUIRED
========================================================= */

function LoginRequired() {
  return (
    <main className="page">
      <div className="page-container">
        <div className="empty-state">
          <div style={{ fontSize: 45 }}>🔐</div>
          <h2>Login Required</h2>
          <p>Please login to continue.</p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>

            <Link className="btn" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   NOT FOUND
========================================================= */

function NotFound() {
  return (
    <main className="page">
      <div className="page-container">
        <div className="empty-state">
          <div style={{ fontSize: 60 }}>404</div>
          <h1>Page Not Found</h1>
          <p>The page you requested does not exist.</p>

          <Link className="btn btn-primary" to="/">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,.06)",
        padding: "35px 18px 100px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              color: "#f2c94c",
              fontWeight: 950,
              fontSize: 22,
            }}
          >
            GOLDENBET
          </div>

          <p style={{ color: "#666", maxWidth: 400 }}>
            GoldenBet sports, casino and entertainment platform.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 15,
            flexWrap: "wrap",
          }}
        >
          <Link to="/sports">Sports</Link>
          <Link to="/casino">Casino</Link>
          <Link to="/live-casino">Live Casino</Link>
          <Link to="/promotions">Promotions</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "25px auto 0",
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,.05)",
          color: "#555",
          fontSize: 12,
        }}
      >
        © {new Date().getFullYear()} GoldenBet. All rights reserved.
      </div>
    </footer>
  );
}
