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
   GOLDENBET - SPORTS DATA
========================================================= */

const sports = [
  { id: "football", name: "Football", icon: "⚽" },
  { id: "tennis", name: "Tennis", icon: "🎾" },
  { id: "basketball", name: "Basketball", icon: "🏀" },
  { id: "volleyball", name: "Volleyball", icon: "🏐" },
  { id: "ice-hockey", name: "Ice Hockey", icon: "🏒" },
  { id: "cricket", name: "Cricket", icon: "🏏" },
  { id: "boxing", name: "Boxing", icon: "🥊" },
  { id: "mma", name: "MMA", icon: "🥋" },
  { id: "esports", name: "Esports", icon: "🎮" },
  { id: "table-tennis", name: "Table Tennis", icon: "🏓" },
  { id: "formula-1", name: "Formula 1", icon: "🏎️" },
  { id: "horse-racing", name: "Horse Racing", icon: "🏇" },
  { id: "handball", name: "Handball", icon: "🤾" },
  { id: "rugby", name: "Rugby", icon: "🏉" },
  { id: "baseball", name: "Baseball", icon: "⚾" },
  { id: "american-football", name: "American Football", icon: "🏈" },
  { id: "darts", name: "Darts", icon: "🎯" },
  { id: "golf", name: "Golf", icon: "⛳" },
  { id: "cycling", name: "Cycling", icon: "🚴" },
];

const sportsCountries = [
  {
    id: "iraq",
    name: "Iraq",
    leagues: ["Iraq Stars League", "Kurdistan Premier League"],
  },
  {
    id: "england",
    name: "England",
    leagues: ["Premier League", "Championship", "League One"],
  },
  {
    id: "spain",
    name: "Spain",
    leagues: ["La Liga", "La Liga 2"],
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
    id: "belgium",
    name: "Belgium",
    leagues: ["Belgian Pro League"],
  },
  {
    id: "scotland",
    name: "Scotland",
    leagues: ["Scottish Premiership"],
  },
  {
    id: "greece",
    name: "Greece",
    leagues: ["Super League Greece"],
  },
  {
    id: "usa",
    name: "USA",
    leagues: ["MLS"],
  },
  {
    id: "brazil",
    name: "Brazil",
    leagues: ["Serie A"],
  },
  {
    id: "argentina",
    name: "Argentina",
    leagues: ["Liga Profesional"],
  },
  {
    id: "mexico",
    name: "Mexico",
    leagues: ["Liga MX"],
  },
  {
    id: "japan",
    name: "Japan",
    leagues: ["J1 League"],
  },
  {
    id: "south-korea",
    name: "South Korea",
    leagues: ["K League 1"],
  },
  {
    id: "australia",
    name: "Australia",
    leagues: ["A-League"],
  },
  {
    id: "international",
    name: "International",
    leagues: ["Champions League", "Europa League", "World Cup"],
  },
];

/* =========================================================
   CASINO DATA
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
    id: "golden-roulette",
    name: "Golden Roulette",
    category: "Roulette",
    icon: "🎡",
  },
  {
    id: "royal-slots",
    name: "Royal Slots",
    category: "Slots",
    icon: "🎰",
  },
  {
    id: "diamond-slots",
    name: "Diamond Slots",
    category: "Slots",
    icon: "💎",
  },
  {
    id: "blackjack-pro",
    name: "Blackjack Pro",
    category: "Blackjack",
    icon: "🃏",
  },
  {
    id: "golden-baccarat",
    name: "Golden Baccarat",
    category: "Baccarat",
    icon: "♠️",
  },
  {
    id: "poker-stars",
    name: "Poker Stars",
    category: "Poker",
    icon: "♣️",
  },
  {
    id: "golden-crash",
    name: "Golden Crash",
    category: "Crash Games",
    icon: "🚀",
  },
  {
    id: "mega-jackpot",
    name: "Mega Jackpot",
    category: "Jackpot",
    icon: "🏆",
  },
  {
    id: "fortune-wheel",
    name: "Fortune Wheel",
    category: "Game Shows",
    icon: "🎡",
  },
  {
    id: "arcade-gold",
    name: "Arcade Gold",
    category: "Arcade",
    icon: "🕹️",
  },
  {
    id: "gold-table",
    name: "Gold Table",
    category: "Table Games",
    icon: "🎲",
  },
  {
    id: "instant-win",
    name: "Instant Win",
    category: "Instant Games",
    icon: "⚡",
  },
];

const liveGames = [
  {
    id: "live-roulette",
    name: "Live Roulette",
    category: "Live Roulette",
    provider: "Evolution",
    icon: "🎡",
  },
  {
    id: "live-blackjack",
    name: "Live Blackjack",
    category: "Live Blackjack",
    provider: "Evolution",
    icon: "🃏",
  },
  {
    id: "live-baccarat",
    name: "Live Baccarat",
    category: "Live Baccarat",
    provider: "Ezugi",
    icon: "♠️",
  },
  {
    id: "live-poker",
    name: "Live Poker",
    category: "Live Poker",
    provider: "Pragmatic Play Live",
    icon: "♣️",
  },
  {
    id: "dragon-tiger",
    name: "Dragon Tiger",
    category: "Live Dragon Tiger",
    provider: "Ezugi",
    icon: "🐉",
  },
  {
    id: "sic-bo",
    name: "Live Sic Bo",
    category: "Live Sic Bo",
    provider: "Evolution",
    icon: "🎲",
  },
  {
    id: "live-wheel",
    name: "Live Wheel",
    category: "Live Wheel",
    provider: "Pragmatic Play Live",
    icon: "🎡",
  },
  {
    id: "live-game-show",
    name: "Live Game Show",
    category: "Live Game Shows",
    provider: "TVBet",
    icon: "📺",
  },
];

const goldenGames = [
  {
    id: "golden-wheel",
    name: "Golden Wheel",
    icon: "🎡",
    description: "Spin and win",
  },
  {
    id: "golden-crash",
    name: "Golden Crash",
    icon: "🚀",
    description: "Catch the multiplier",
  },
  {
    id: "golden-mines",
    name: "Golden Mines",
    icon: "💰",
    description: "Find the gold",
  },
  {
    id: "golden-dice",
    name: "Golden Dice",
    icon: "🎲",
    description: "Roll your luck",
  },
  {
    id: "golden-cards",
    name: "Golden Cards",
    icon: "🃏",
    description: "Play the cards",
  },
  {
    id: "golden-jackpot",
    name: "Golden Jackpot",
    icon: "🏆",
    description: "Win big",
  },
];

/* =========================================================
   FOOTBALL MATCHES
========================================================= */

const matches = [
  {
    id: 1,
    sport: "football",
    home: "Real Madrid",
    away: "Barcelona",
    league: "La Liga",
    country: "Spain",
    time: "21:00",
    status: "upcoming",
  },
  {
    id: 2,
    sport: "football",
    home: "Arsenal",
    away: "Chelsea",
    league: "Premier League",
    country: "England",
    time: "20:30",
    status: "upcoming",
  },
  {
    id: 3,
    sport: "football",
    home: "Inter Milan",
    away: "AC Milan",
    league: "Serie A",
    country: "Italy",
    time: "21:45",
    status: "upcoming",
  },
  {
    id: 4,
    sport: "football",
    home: "Bayern Munich",
    away: "Dortmund",
    league: "Bundesliga",
    country: "Germany",
    time: "22:00",
    status: "upcoming",
  },
  {
    id: 5,
    sport: "football",
    home: "Al-Shorta",
    away: "Al-Zawraa",
    league: "Iraq Stars League",
    country: "Iraq",
    time: "19:30",
    status: "upcoming",
  },
  {
    id: 6,
    sport: "football",
    home: "Duhok",
    away: "Erbil",
    league: "Kurdistan Premier League",
    country: "Iraq",
    time: "20:00",
    status: "upcoming",
  },
  {
    id: 7,
    sport: "football",
    home: "Liverpool",
    away: "Manchester City",
    league: "Premier League",
    country: "England",
    time: "20:00",
    status: "upcoming",
  },
  {
    id: 8,
    sport: "football",
    home: "Manchester United",
    away: "Tottenham",
    league: "Premier League",
    country: "England",
    time: "21:00",
    status: "upcoming",
  },
  {
    id: 9,
    sport: "football",
    home: "Juventus",
    away: "Napoli",
    league: "Serie A",
    country: "Italy",
    time: "21:45",
    status: "upcoming",
  },
  {
    id: 10,
    sport: "football",
    home: "PSG",
    away: "Marseille",
    league: "Ligue 1",
    country: "France",
    time: "22:00",
    status: "upcoming",
  },
  {
    id: 11,
    sport: "football",
    home: "Galatasaray",
    away: "Fenerbahce",
    league: "Super Lig",
    country: "Turkey",
    time: "20:00",
    status: "upcoming",
  },
  {
    id: 12,
    sport: "football",
    home: "Al-Hilal",
    away: "Al-Nassr",
    league: "Saudi Pro League",
    country: "Saudi Arabia",
    time: "21:00",
    status: "upcoming",
  },
  {
    id: 13,
    sport: "football",
    home: "Ajax",
    away: "PSV",
    league: "Eredivisie",
    country: "Netherlands",
    time: "19:45",
    status: "upcoming",
  },
  {
    id: 14,
    sport: "football",
    home: "Benfica",
    away: "Porto",
    league: "Primeira Liga",
    country: "Portugal",
    time: "21:15",
    status: "upcoming",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getSelectionStatus = (bets, matchId, marketId, selectionKey) => {
  return bets.some(
    (bet) =>
      String(bet.matchId) === String(matchId) &&
      bet.marketId === marketId &&
      bet.selectionKey === selectionKey
  );
};

const getStatusIcon = (status) => {
  if (status === "won") return "✅";
  if (status === "lost") return "❌";
  if (status === "cancelled") return "🚫";
  return "⏳";
};

const getStatusColor = (status) => {
  if (status === "won") return "success";
  if (status === "lost") return "danger";
  if (status === "cancelled") return "muted";
  return "warning";
};

const safeOdds = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    return 1;
  }

  return number;
};

/* =========================================================
   TEAM LOGO
========================================================= */

function TeamLogo({ name, size = 42 }) {
  const initials = String(name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="team-logo"
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: Math.max(11, size * 0.28),
      }}
      aria-label={name}
      title={name}
    >
      {initials || "GB"}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function GoldenBetHeader({ bets = [] }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session || null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession || null);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileMenu(false);
    navigate("/login");
  };

  if (location.pathname === "/") {
    return null;
  }

  const betCount = bets.length;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          to="/"
          className="brand"
          onClick={() => setMobileMenu(false)}
        >
          <span className="brand-mark">G</span>
          <span className="brand-text">
            <strong>GOLDEN</strong>
            <span>BET</span>
          </span>
        </Link>

        <nav className="desktop-nav">
          <HeaderLink to="/sports">⚽ Sports</HeaderLink>
          <HeaderLink to="/live">🔴 Live</HeaderLink>
          <HeaderLink to="/casino">🎰 Casino</HeaderLink>
          <HeaderLink to="/live-casino">🎥 Live Casino</HeaderLink>
          <HeaderLink to="/golden-games">👑 Golden Games</HeaderLink>
          <HeaderLink to="/promotions">🎁 Promotions</HeaderLink>
        </nav>

        <div className="header-actions">
          <Link to="/bet-slip" className="header-bet-slip">
            🎫
            {betCount > 0 && (
              <span className="bet-count">{betCount}</span>
            )}
          </Link>

          {session ? (
            <div className="header-user">
              <Link to="/profile" className="header-profile">
                👤
                <span className="header-user-name">
                  {session.user?.user_metadata?.username ||
                    session.user?.email?.split("@")[0] ||
                    "Profile"}
                </span>
              </Link>

              <button
                type="button"
                className="header-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="header-auth">
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenu((value) => !value)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="mobile-menu">
          <HeaderLink
            to="/sports"
            onClick={() => setMobileMenu(false)}
          >
            ⚽ Sports
          </HeaderLink>

          <HeaderLink
            to="/live"
            onClick={() => setMobileMenu(false)}
          >
            🔴 Live
          </HeaderLink>

          <HeaderLink
            to="/casino"
            onClick={() => setMobileMenu(false)}
          >
            🎰 Casino
          </HeaderLink>

          <HeaderLink
            to="/live-casino"
            onClick={() => setMobileMenu(false)}
          >
            🎥 Live Casino
          </HeaderLink>

          <HeaderLink
            to="/golden-games"
            onClick={() => setMobileMenu(false)}
          >
            👑 Golden Games
          </HeaderLink>

          <HeaderLink
            to="/promotions"
            onClick={() => setMobileMenu(false)}
          >
            🎁 Promotions
          </HeaderLink>

          <HeaderLink
            to="/bet-slip"
            onClick={() => setMobileMenu(false)}
          >
            🎫 Bet Slip {betCount > 0 ? `(${betCount})` : ""}
          </HeaderLink>

          {session && (
            <>
              <HeaderLink
                to="/profile"
                onClick={() => setMobileMenu(false)}
              >
                👤 Profile
              </HeaderLink>

              <HeaderLink
                to="/my-bets"
                onClick={() => setMobileMenu(false)}
              >
                📋 My Bets
              </HeaderLink>

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {!session && (
            <div className="mobile-auth-buttons">
              <Link
                to="/login"
                className="btn btn-secondary"
                onClick={() => setMobileMenu(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary"
                onClick={() => setMobileMenu(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function HeaderLink({ to, children, onClick }) {
  const location = useLocation();

  const active =
    location.pathname === to ||
    (to !== "/" && location.pathname.startsWith(`${to}/`));

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`header-link ${active ? "active" : ""}`}
    >
      {children}
    </Link>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [bets, setBets] = useState([]);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Supabase session error:", error);
        setSession(null);
      } else {
        setSession(data.session || null);
      }

      setAuthLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession || null);
        setAuthLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const addBet = (bet) => {
    setBets((current) => {
      const duplicate = current.some(
        (item) =>
          String(item.matchId) === String(bet.matchId) &&
          item.marketId === bet.marketId &&
          item.selectionKey === bet.selectionKey
      );

      if (duplicate) {
        return current;
      }

      const sameMatchCount = current.filter(
        (item) => String(item.matchId) === String(bet.matchId)
      ).length;

      if (sameMatchCount >= 20) {
        return current;
      }

      return [
        ...current,
        {
          ...bet,
          odds: safeOdds(bet.odds),
          addedAt: Date.now(),
        },
      ];
    });
  };

  const removeBet = (matchId, marketId, selectionKey) => {
    setBets((current) =>
      current.filter(
        (item) =>
          !(
            String(item.matchId) === String(matchId) &&
            item.marketId === marketId &&
            item.selectionKey === selectionKey
          )
      )
    );
  };

  const clearBets = () => {
    setBets([]);
  };

  if (authLoading) {
    return (
      <div className="app-loading">
        <div className="loading-logo">G</div>
        <div className="loading-text">GOLDENBET</div>
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="app">
      <GoldenBetHeader bets={bets} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                session={session}
                bets={bets}
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
                session={session}
                removeBet={removeBet}
                clearBets={clearBets}
              />
            }
          />

          <Route
            path="/match/:id"
            element={
              <MatchPage
                bets={bets}
                addBet={addBet}
                removeBet={removeBet}
              />
            }
          />

          <Route path="/live" element={<Live />} />

          <Route path="/casino" element={<Casino />} />

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
              <ProtectedRoute session={session}>
                <Profile session={session} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/balance"
            element={
              <ProtectedRoute session={session}>
                <Balance session={session} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/deposit"
            element={
              <ProtectedRoute session={session}>
                <Deposit session={session} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/withdraw"
            element={
              <ProtectedRoute session={session}>
                <Withdraw session={session} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bets"
            element={
              <ProtectedRoute session={session}>
                <MyBets session={session} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute session={session}>
                <Settings />
              </ProtectedRoute>
            }
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

      <MobileBottomNav bets={bets} />
    </div>
  );
}

/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ session, children }) {
  if (!session) {
    return <LoginRequired />;
  }

  return children;
}

/* =========================================================
   HOME
========================================================= */

function Home({ session, bets }) {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-badge">👑 PREMIUM SPORTSBOOK</div>

          <h1>
            <span>GOLDEN</span>
            <strong>BET</strong>
          </h1>

          <p>
            Sports betting, live matches, casino games and
            exclusive Golden Games.
          </p>

          <div className="hero-buttons">
            <Link to="/sports" className="btn btn-primary btn-large">
              ⚽ Start Betting
            </Link>

            {!session && (
              <Link
                to="/register"
                className="btn btn-outline btn-large"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="page-container">
        <section className="vip-banner card">
          <div className="vip-content">
            <span className="vip-icon">👑</span>

            <div>
              <span className="vip-label">GOLDEN VIP</span>
              <h2>Exclusive VIP Experience</h2>
              <p>
                Special promotions, premium predictions and
                exclusive offers.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/promotions")}
          >
            Explore VIP
          </button>
        </section>

        <section className="home-images">
          <div className="home-image-card">
            <img
              src="/roulette.jpg"
              alt="Roulette"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="home-image-overlay">
              <span>🎰</span>
              <h3>Casino</h3>
              <Link to="/casino">Play Now</Link>
            </div>
          </div>

          <div className="home-image-card">
            <img
              src="/goldenbet.jpg"
              alt="GoldenBet"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="home-image-overlay">
              <span>👑</span>
              <h3>Golden Games</h3>
              <Link to="/golden-games">Explore</Link>
            </div>
          </div>

          <div className="home-image-card">
            <img
              src="/football.jpg"
              alt="Football"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="home-image-overlay">
              <span>⚽</span>
              <h3>Sports</h3>
              <Link to="/sports">Bet Now</Link>
            </div>
          </div>
        </section>

        <section className="quick-access-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">GOLDENBET</span>
              <h2>Quick Access</h2>
            </div>
          </div>

          <div className="quick-grid">
            <Link to="/sports" className="quick-card">
              <span className="quick-icon">⚽</span>
              <strong>Sports</strong>
              <small>Bet on matches</small>
            </Link>

            <Link to="/live" className="quick-card">
              <span className="quick-icon">🔴</span>
              <strong>Live Betting</strong>
              <small>Live matches</small>
            </Link>

            <Link to="/casino" className="quick-card">
              <span className="quick-icon">🎰</span>
              <strong>Casino</strong>
              <small>Play casino games</small>
            </Link>

            <Link
              to="/live-casino"
              className="quick-card"
            >
              <span className="quick-icon">🎥</span>
              <strong>Live Casino</strong>
              <small>Live dealers</small>
            </Link>

            <Link
              to="/golden-games"
              className="quick-card"
            >
              <span className="quick-icon">👑</span>
              <strong>Golden Games</strong>
              <small>Exclusive games</small>
            </Link>

            <Link
              to="/promotions"
              className="quick-card"
            >
              <span className="quick-icon">🎁</span>
              <strong>Promotions</strong>
              <small>Special offers</small>
            </Link>
          </div>
        </section>

        {!session && (
          <section className="register-prompt card">
            <div>
              <span className="section-kicker">
                JOIN GOLDENBET
              </span>

              <h2>Create your account</h2>

              <p>
                Register now and access sports betting,
                casino and all GoldenBet features.
              </p>
            </div>

            <div className="register-prompt-actions">
              <Link
                to="/register"
                className="btn btn-primary"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="btn btn-secondary"
              >
                Login
              </Link>
            </div>
          </section>
        )}

        {bets.length > 0 && (
          <section className="home-bets-preview card">
            <div>
              <span className="section-kicker">
                YOUR BET SLIP
              </span>

              <h2>{bets.length} selections</h2>

              <p>
                You have selections waiting in your bet
                slip.
              </p>
            </div>

            <Link
              to="/bet-slip"
              className="btn btn-primary"
            >
              Open Bet Slip
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SPORTS
========================================================= */

function Sports({ bets, addBet }) {
  const navigate = useNavigate();

  const [selectedSport, setSelectedSport] =
    useState("football");

  const [selectedCountry, setSelectedCountry] =
    useState("all");

  const [selectedLeague, setSelectedLeague] =
    useState("all");

  const [search, setSearch] = useState("");

  const leagues = useMemo(() => {
    if (selectedCountry === "all") {
      return [
        "all",
        ...sportsCountries.flatMap(
          (country) => country.leagues
        ),
      ];
    }

    const country = sportsCountries.find(
      (item) => item.id === selectedCountry
    );

    return ["all", ...(country?.leagues || [])];
  }, [selectedCountry]);

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const sportMatch =
        match.sport === selectedSport;

      const countryMatch =
        selectedCountry === "all" ||
        match.country ===
          sportsCountries.find(
            (country) => country.id === selectedCountry
          )?.name;

      const leagueMatch =
        selectedLeague === "all" ||
        match.league === selectedLeague;

      const searchValue = search.trim().toLowerCase();

      const searchMatch =
        !searchValue ||
        match.home.toLowerCase().includes(searchValue) ||
        match.away.toLowerCase().includes(searchValue) ||
        match.league.toLowerCase().includes(searchValue);

      return (
        sportMatch &&
        countryMatch &&
        leagueMatch &&
        searchMatch
      );
    });
  }, [
    selectedSport,
    selectedCountry,
    selectedLeague,
    search,
  ]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedLeague("all");
  };

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              GOLDENBET SPORTS
            </span>

            <h1>Sports Betting</h1>

            <p>
              Choose a sport, league and match to place
              your prediction.
            </p>
          </div>

          <Link
            to="/bet-slip"
            className="btn btn-primary"
          >
            🎫 Bet Slip ({bets.length})
          </Link>
        </div>

        <div className="sports-tabs category-scroll">
          {sports.map((sport) => (
            <button
              key={sport.id}
              type="button"
              className={`filter-btn ${
                selectedSport === sport.id
                  ? "filter-active"
                  : ""
              }`}
              onClick={() => {
                setSelectedSport(sport.id);
                setSelectedCountry("all");
                setSelectedLeague("all");
              }}
            >
              <span>{sport.icon}</span>
              {sport.name}
            </button>
          ))}
        </div>

        <div className="sports-filters card">
          <div className="filter-field">
            <label htmlFor="country-filter">
              Country
            </label>

            <select
              id="country-filter"
              value={selectedCountry}
              onChange={(event) =>
                handleCountryChange(event.target.value)
              }
              className="input"
            >
              <option value="all">All Countries</option>

              {sportsCountries.map((country) => (
                <option
                  key={country.id}
                  value={country.id}
                >
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="league-filter">
              League
            </label>

            <select
              id="league-filter"
              value={selectedLeague}
              onChange={(event) =>
                setSelectedLeague(event.target.value)
              }
              className="input"
            >
              <option value="all">All Leagues</option>

              {leagues
                .filter((league) => league !== "all")
                .map((league) => (
                  <option key={league} value={league}>
                    {league}
                  </option>
                ))}
            </select>
          </div>

          <div className="filter-field search-field">
            <label htmlFor="match-search">
              Search
            </label>

            <input
              id="match-search"
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search team or league..."
              className="input"
            />
          </div>
        </div>

        {selectedSport !== "football" ? (
          <div className="empty-state card">
            <div className="empty-icon">
              {sports.find(
                (sport) => sport.id === selectedSport
              )?.icon || "🏆"}
            </div>

            <h2>
              {
                sports.find(
                  (sport) =>
                    sport.id === selectedSport
                )?.name
              }
            </h2>

            <p>
              This sport is ready for API connection.
              Football demo markets are currently
              available.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setSelectedSport("football")}
            >
              View Football
            </button>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">🔎</div>
            <h2>No matches found</h2>
            <p>
              Try another country, league or search term.
            </p>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCountry("all");
                setSelectedLeague("all");
                setSearch("");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="matches-list">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                bets={bets}
                addBet={addBet}
                onOpen={() =>
                  navigate(`/match/${match.id}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}/* =========================================================
   MATCH CARD
========================================================= */

function MatchCard({ match, bets, addBet, onOpen }) {
  const firstGroup = marketGroups?.[0];

  const firstMarket = firstGroup?.markets?.[0];

  const selections = firstMarket?.selections || [];

  const matchBets = bets.filter(
    (bet) => String(bet.matchId) === String(match.id)
  );

  const selectedKeys = new Set(
    matchBets.map(
      (bet) =>
        `${bet.marketId}:${bet.selectionKey}`
    )
  );

  const matchOdds = matchBets.reduce(
    (total, bet) =>
      total * safeOdds(bet.odds),
    1
  );

  return (
    <div className="match-card card">
      <div className="match-card-top">
        <div className="match-league">
          <span>🏆</span>
          <span>{match.league}</span>
          <span>•</span>
          <span>{match.country}</span>
        </div>

        <div className="match-time">
          🕐 {match.time}
        </div>
      </div>

      <div className="match-main">
        <div className="team-side">
          <TeamLogo name={match.home} size={48} />
          <strong>{match.home}</strong>
        </div>

        <div className="match-vs">
          <span>VS</span>
        </div>

        <div className="team-side">
          <TeamLogo name={match.away} size={48} />
          <strong>{match.away}</strong>
        </div>
      </div>

      {firstMarket && (
        <div className="quick-markets">
          <div className="quick-market-title">
            {firstMarket.title}
          </div>

          <div className="quick-market-buttons">
            {selections.slice(0, 3).map((selection) => {
              const key = `${firstMarket.id}:${selection.key}`;

              const selected = selectedKeys.has(key);

              return (
                <button
                  key={key}
                  type="button"
                  className={`odds-button ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() =>
                    addBet({
                      matchId: match.id,
                      matchName: `${match.home} vs ${match.away}`,
                      sport: match.sport,
                      league: match.league,
                      marketId: firstMarket.id,
                      marketTitle: firstMarket.title,
                      selectionKey: selection.key,
                      selectionName:
                        selection.name ||
                        selection.label,
                      odds: safeOdds(selection.odds),
                    })
                  }
                >
                  <span>
                    {selection.label ||
                      selection.name}
                  </span>

                  <strong>
                    {safeOdds(selection.odds).toFixed(2)}
                  </strong>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {matchBets.length > 0 && (
        <div className="match-selected-info">
          <span>
            ✅ {matchBets.length} selection
            {matchBets.length > 1 ? "s" : ""}
          </span>

          <strong>
            Combined Odds: {matchOdds.toFixed(2)}
          </strong>
        </div>
      )}

      <div className="match-card-footer">
        <button
          type="button"
          className="btn btn-secondary btn-full"
          onClick={onOpen}
        >
          View All Markets →
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MATCH PAGE
========================================================= */

function MatchPage({ bets, addBet, removeBet }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const match = matches.find(
    (item) => String(item.id) === String(id)
  );

  if (!match) {
    return <NotFound />;
  }

  const matchBets = bets.filter(
    (bet) => String(bet.matchId) === String(match.id)
  );

  return (
    <div className="page">
      <div className="page-container">
        <button
          type="button"
          className="back-link"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="match-page-header card">
          <div className="match-page-league">
            🏆 {match.league} • {match.country}
          </div>

          <div className="match-page-time">
            🕐 {match.time}
          </div>

          <div className="match-page-teams">
            <div className="match-page-team">
              <TeamLogo
                name={match.home}
                size={72}
              />
              <h2>{match.home}</h2>
            </div>

            <div className="match-page-vs">
              <span>VS</span>
            </div>

            <div className="match-page-team">
              <TeamLogo
                name={match.away}
                size={72}
              />
              <h2>{match.away}</h2>
            </div>
          </div>
        </div>

        {matchBets.length > 0 && (
          <div className="selected-bets card">
            <div className="section-heading">
              <div>
                <span className="section-kicker">
                  SELECTED
                </span>
                <h2>Your Selections</h2>
              </div>

              <Link
                to="/bet-slip"
                className="btn btn-primary"
              >
                🎫 Bet Slip
              </Link>
            </div>

            <div className="selected-bet-list">
              {matchBets.map((bet) => (
                <div
                  className="selected-bet-row"
                  key={`${bet.marketId}-${bet.selectionKey}`}
                >
                  <div>
                    <strong>
                      {bet.marketTitle}
                    </strong>

                    <span>
                      {bet.selectionName}
                    </span>
                  </div>

                  <div className="selected-bet-actions">
                    <strong>
                      {safeOdds(bet.odds).toFixed(2)}
                    </strong>

                    <button
                      type="button"
                      className="remove-selection"
                      onClick={() =>
                        removeBet(
                          bet.matchId,
                          bet.marketId,
                          bet.selectionKey
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="markets-page">
          {Array.isArray(marketGroups) &&
          marketGroups.length > 0 ? (
            marketGroups.map((group) => (
              <MarketGroup
                key={group.id}
                group={group}
                match={match}
                bets={bets}
                addBet={addBet}
              />
            ))
          ) : (
            <div className="empty-state card">
              <div className="empty-icon">📊</div>

              <h2>No Markets Available</h2>

              <p>
                No betting markets have been configured
                yet.
              </p>
            </div>
          )}
        </div>
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
}) {
  const [open, setOpen] = useState(true);

  if (!group) {
    return null;
  }

  const markets = Array.isArray(group.markets)
    ? group.markets
    : [];

  return (
    <section className="market-group card">
      <button
        type="button"
        className="market-group-header"
        onClick={() => setOpen((value) => !value)}
      >
        <div>
          <span className="market-group-icon">
            📊
          </span>

          <div>
            <strong>
              {group.title || "Markets"}
            </strong>

            <small>
              {markets.length} market
              {markets.length !== 1 ? "s" : ""}
            </small>
          </div>
        </div>

        <span className="market-toggle">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="market-group-content">
          {markets.map((market) => (
            <Market
              key={market.id}
              market={market}
              match={match}
              bets={bets}
              addBet={addBet}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   MARKET
========================================================= */

function Market({
  market,
  match,
  bets,
  addBet,
}) {
  const selections = Array.isArray(
    market?.selections
  )
    ? market.selections
    : [];

  return (
    <div className="market-card">
      <div className="market-title">
        <span>{market?.title || "Market"}</span>
      </div>

      <div className="market-selections">
        {selections.map((selection) => {
          const selected = getSelectionStatus(
            bets,
            match.id,
            market.id,
            selection.key
          );

          return (
            <button
              key={selection.key}
              type="button"
              className={`selection-button ${
                selected ? "selected" : ""
              }`}
              onClick={() =>
                addBet({
                  matchId: match.id,
                  matchName: `${match.home} vs ${match.away}`,
                  sport: match.sport,
                  league: match.league,
                  marketId: market.id,
                  marketTitle: market.title,
                  selectionKey: selection.key,
                  selectionName:
                    selection.name ||
                    selection.label ||
                    selection.key,
                  odds: safeOdds(selection.odds),
                })
              }
            >
              <span>
                {selection.label ||
                  selection.name ||
                  selection.key}
              </span>

              <strong>
                {safeOdds(selection.odds).toFixed(2)}
              </strong>

              {selected && (
                <span className="selected-check">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   BET SLIP
========================================================= */

function BetSlipPage({
  bets,
  session,
  removeBet,
  clearBets,
}) {
  const navigate = useNavigate();

  const [stake, setStake] = useState("");
  const [placing, setPlacing] = useState(false);

  const groupedBets = useMemo(() => {
    const groups = new Map();

    bets.forEach((bet) => {
      const key = String(bet.matchId);

      if (!groups.has(key)) {
        groups.set(key, {
          matchId: bet.matchId,
          match:
            bet.matchName ||
            "Unknown Match",
          league: bet.league || "",
          bets: [],
        });
      }

      groups.get(key).bets.push(bet);
    });

    return Array.from(groups.values());
  }, [bets]);

  const totalOdds = useMemo(() => {
    if (bets.length === 0) {
      return 0;
    }

    return bets.reduce(
      (total, bet) =>
        total * safeOdds(bet.odds),
      1
    );
  }, [bets]);

  const stakeNumber = Number(stake) || 0;

  const potentialReturn =
    stakeNumber * totalOdds;

  const handlePlaceBet = async () => {
    if (!session?.user?.id) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (bets.length === 0) {
      alert("Please select at least one prediction.");
      return;
    }

    if (!stakeNumber || stakeNumber <= 0) {
      alert("Please enter a valid stake.");
      return;
    }

    setPlacing(true);

    try {
      const matchNames = groupedBets
        .map((group) => group.match)
        .join(" | ");

      const {
        error,
      } = await supabase
        .from("bets")
        .insert({
          user_id: session.user.id,
          match_name: matchNames,
          stake: stakeNumber,
          total_odds: Number(
            totalOdds.toFixed(4)
          ),
          potential_win: Number(
            potentialReturn.toFixed(2)
          ),
          status: "pending",
        });

      if (error) {
        throw error;
      }

      alert("Your bet has been placed successfully.");

      clearBets();
      setStake("");
    } catch (error) {
      console.error("Place bet error:", error);

      alert(
        error?.message ||
          "Unable to place your bet. Please try again."
      );
    } finally {
      setPlacing(false);
    }
  };

  if (bets.length === 0) {
    return (
      <div className="page">
        <div className="page-container">
          <div className="empty-state card">
            <div className="empty-icon">🎫</div>

            <h1>Your Bet Slip Is Empty</h1>

            <p>
              Select odds from the sports section to add
              predictions to your bet slip.
            </p>

            <Link
              to="/sports"
              className="btn btn-primary"
            >
              Browse Sports
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              GOLDENBET
            </span>

            <h1>Bet Slip</h1>

            <p>
              Review your selections before placing
              your bet.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-danger"
            onClick={clearBets}
          >
            Clear All
          </button>
        </div>

        <div className="betslip-layout">
          <div className="betslip-selections">
            {groupedBets.map((group) => {
              const groupOdds = group.bets.reduce(
                (total, bet) =>
                  total * safeOdds(bet.odds),
                1
              );

              return (
                <div
                  className="betslip-match card"
                  key={group.matchId}
                >
                  <div className="betslip-match-header">
                    <div>
                      <span className="section-kicker">
                        {group.league}
                      </span>

                      <h2>{group.match}</h2>
                    </div>

                    <strong>
                      {groupOdds.toFixed(2)}
                    </strong>
                  </div>

                  <div className="betslip-selection-list">
                    {group.bets.map((bet) => (
                      <div
                        className="betslip-selection"
                        key={`${bet.marketId}-${bet.selectionKey}`}
                      >
                        <div>
                          <small>
                            {bet.marketTitle}
                          </small>

                          <strong>
                            {bet.selectionName}
                          </strong>
                        </div>

                        <div className="betslip-selection-right">
                          <span>
                            {safeOdds(
                              bet.odds
                            ).toFixed(2)}
                          </span>

                          <button
                            type="button"
                            className="remove-selection"
                            onClick={() =>
                              removeBet(
                                bet.matchId,
                                bet.marketId,
                                bet.selectionKey
                              )
                            }
                            aria-label="Remove selection"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="betslip-summary card">
            <div className="summary-title">
              <span className="section-kicker">
                BET SUMMARY
              </span>

              <h2>Place Bet</h2>
            </div>

            <div className="summary-row">
              <span>Selections</span>
              <strong>{bets.length}</strong>
            </div>

            <div className="summary-row">
              <span>Total Odds</span>
              <strong>
                {totalOdds.toFixed(2)}
              </strong>
            </div>

            <label
              htmlFor="stake"
              className="form-label"
            >
              Stake
            </label>

            <div className="stake-input">
              <input
                id="stake"
                type="number"
                min="0"
                step="0.01"
                value={stake}
                onChange={(event) =>
                  setStake(event.target.value)
                }
                placeholder="0.00"
                className="input"
              />

              <span>IQD</span>
            </div>

            <div className="summary-row potential">
              <span>Potential Return</span>

              <strong>
                {potentialReturn.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}{" "}
                IQD
              </strong>
            </div>

            {!session && (
              <div className="warning-box">
                Please login before placing a bet.
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary btn-full btn-large"
              disabled={placing}
              onClick={handlePlaceBet}
            >
              {placing
                ? "Placing..."
                : session
                ? "Place Bet"
                : "Login to Place Bet"}
            </button>

            {!session && (
              <Link
                to="/login"
                className="btn btn-secondary btn-full"
              >
                Login
              </Link>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LIVE
========================================================= */

function Live() {
  const liveMatches = [
    {
      id: "live-1",
      home: "Real Madrid",
      away: "Barcelona",
      score: "1 - 1",
      minute: "67'",
      league: "La Liga",
    },
    {
      id: "live-2",
      home: "Arsenal",
      away: "Chelsea",
      score: "2 - 0",
      minute: "54'",
      league: "Premier League",
    },
    {
      id: "live-3",
      home: "Inter Milan",
      away: "AC Milan",
      score: "0 - 0",
      minute: "32'",
      league: "Serie A",
    },
    {
      id: "live-4",
      home: "Bayern Munich",
      away: "Dortmund",
      score: "2 - 1",
      minute: "78'",
      league: "Bundesliga",
    },
  ];

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              LIVE NOW
            </span>

            <h1>Live Betting</h1>

            <p>
              Follow live matches and prepare your next
              prediction.
            </p>
          </div>

          <span className="live-indicator">
            <i />
            LIVE
          </span>
        </div>

        <div className="live-list">
          {liveMatches.map((match) => (
            <div
              className="live-match-card card"
              key={match.id}
            >
              <div className="live-match-top">
                <span>{match.league}</span>

                <span className="live-minute">
                  🔴 {match.minute}
                </span>
              </div>

              <div className="live-match-content">
                <div className="live-team">
                  <TeamLogo
                    name={match.home}
                    size={48}
                  />
                  <strong>{match.home}</strong>
                </div>

                <div className="live-score">
                  <strong>{match.score}</strong>
                  <span>LIVE</span>
                </div>

                <div className="live-team">
                  <TeamLogo
                    name={match.away}
                    size={48}
                  />
                  <strong>{match.away}</strong>
                </div>
              </div>

              <div className="live-demo-markets">
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Live market demo. Connect your sports API to enable real-time betting."
                    )
                  }
                >
                  Match Winner
                  <strong>1.85</strong>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Live market demo. Connect your sports API to enable real-time betting."
                    )
                  }
                >
                  Over 2.5
                  <strong>1.72</strong>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Live market demo. Connect your sports API to enable real-time betting."
                    )
                  }
                >
                  BTTS
                  <strong>1.68</strong>
                </button>
              </div>
            </div>
          ))}
        </div>
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

  const filteredGames = useMemo(() => {
    if (category === "All Games") {
      return casinoGames;
    }

    return casinoGames.filter(
      (game) => game.category === category
    );
  }, [category]);

  const playGame = (game) => {
    alert(
      `${game.name} is a demo game. Connect your casino provider/API to enable real gameplay.`
    );
  };

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              GOLDENBET CASINO
            </span>

            <h1>Casino</h1>

            <p>
              Explore slots, table games, jackpots and
              more.
            </p>
          </div>
        </div>

        <div className="category-scroll">
          {casinoCategories.map((item) => (
            <button
              type="button"
              key={item}
              className={`filter-btn ${
                category === item
                  ? "filter-active"
                  : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="game-grid">
          {filteredGames.map((game) => (
            <div
              className="game-card card"
              key={game.id}
              onClick={() => playGame(game)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  playGame(game);
                }
              }}
            >
              <div className="game-icon">
                {game.icon}
              </div>

              <div className="game-info">
                <span>{game.category}</span>
                <h3>{game.name}</h3>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => {
                  event.stopPropagation();
                  playGame(game);
                }}
              >
                Play
              </button>
            </div>
          ))}
        </div>
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

  const filteredGames = useMemo(() => {
    if (category === "All Live Games") {
      return liveGames;
    }

    return liveGames.filter(
      (game) =>
        game.category === category ||
        game.provider === category
    );
  }, [category]);

  const playGame = (game) => {
    alert(
      `${game.name} is a live casino demo. Connect Evolution, Ezugi, Pragmatic Play Live or another provider to enable gameplay.`
    );
  };

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              LIVE CASINO
            </span>

            <h1>Live Casino</h1>

            <p>
              Live dealer games and premium casino
              tables.
            </p>
          </div>

          <span className="live-indicator">
            <i />
            LIVE
          </span>
        </div>

        <div className="category-scroll">
          {liveCasinoCategories.map((item) => (
            <button
              type="button"
              key={item}
              className={`filter-btn ${
                category === item
                  ? "filter-active"
                  : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="game-grid">
          {filteredGames.map((game) => (
            <div
              className="game-card live-game-card card"
              key={game.id}
              onClick={() => playGame(game)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  playGame(game);
                }
              }}
            >
              <div className="game-icon">
                {game.icon}
              </div>

              <div className="game-info">
                <span className="provider">
                  {game.provider}
                </span>

                <h3>{game.name}</h3>

                <small>🔴 Live Dealer</small>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => {
                  event.stopPropagation();
                  playGame(game);
                }}
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GOLDEN GAMES
========================================================= */

function GoldenGames() {
  const playGame = (game) => {
    alert(
      `${game.name} is a GoldenBet demo game. Connect your game engine to enable gameplay.`
    );
  };

  return (
    <div className="page">
      <div className="page-container">
        <div className="golden-games-hero card">
          <div>
            <span className="section-kicker">
              EXCLUSIVE
            </span>

            <h1>👑 Golden Games</h1>

            <p>
              Exclusive games created for the GoldenBet
              experience.
            </p>
          </div>

          <div className="golden-crown">👑</div>
        </div>

        <div className="game-grid golden-game-grid">
          {goldenGames.map((game) => (
            <div
              className="game-card golden-game-card card"
              key={game.id}
            >
              <div className="game-icon">
                {game.icon}
              </div>

              <div className="game-info">
                <span>GOLDENBET</span>
                <h3>{game.name}</h3>
                <small>{game.description}</small>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => playGame(game)}
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROMOTIONS
========================================================= */

function Promotions() {
  const promotions = [
    {
      icon: "👑",
      title: "Golden VIP",
      text: "Exclusive VIP benefits and premium offers.",
      action: "Join VIP",
    },
    {
      icon: "🎁",
      title: "Welcome Bonus",
      text: "Create an account and explore GoldenBet.",
      action: "Register",
    },
    {
      icon: "⚽",
      title: "Sports Promotions",
      text: "Special promotions for selected sporting events.",
      action: "View Sports",
    },
    {
      icon: "🎰",
      title: "Casino Offers",
      text: "Discover the latest casino promotions.",
      action: "Play Casino",
    },
  ];

  const navigate = useNavigate();

  const actions = [
    () => navigate("/promotions"),
    () => navigate("/register"),
    () => navigate("/sports"),
    () => navigate("/casino"),
  ];

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              GOLDENBET OFFERS
            </span>

            <h1>Promotions</h1>

            <p>
              Discover available GoldenBet promotions
              and special offers.
            </p>
          </div>
        </div>

        <div className="promotion-grid">
          {promotions.map((promotion, index) => (
            <div
              className="promotion-card card"
              key={promotion.title}
            >
              <div className="promotion-icon">
                {promotion.icon}
              </div>

              <span className="section-kicker">
                GOLDENBET
              </span>

              <h2>{promotion.title}</h2>

              <p>{promotion.text}</p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={actions[index]}
              >
                {promotion.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        throw loginError;
      }

      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err?.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <span>G</span>
          <strong>GOLDENBET</strong>
        </div>

        <span className="section-kicker">
          WELCOME BACK
        </span>

        <h1>Login</h1>

        <p className="muted">
          Sign in to access your GoldenBet account.
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="login-email"
            className="form-label"
          >
            Email
          </label>

          <input
            id="login-email"
            type="email"
            className="input"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="you@example.com"
            autoComplete="email"
          />

          <label
            htmlFor="login-password"
            className="form-label"
          >
            Password
          </label>

          <input
            id="login-password"
            type="password"
            className="input"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Your password"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="btn btn-primary btn-full btn-large"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>

          <Link to="/register">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REGISTER
========================================================= */

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !username.trim() ||
      !email.trim() ||
      !password
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const {
        data,
        error: registerError,
      } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: username.trim(),
          },
        },
      });

      if (registerError) {
        throw registerError;
      }

      if (data.session) {
        navigate("/profile");
        return;
      }

      setSuccess(
        "Registration successful. Check your email if confirmation is required."
      );

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Register error:", err);

      setError(
        err?.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <span>G</span>
          <strong>GOLDENBET</strong>
        </div>

        <span className="section-kicker">
          JOIN GOLDENBET
        </span>

        <h1>Create Account</h1>

        <p className="muted">
          Create your account and start your GoldenBet
          experience.
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {success && (
          <div className="success-box">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="register-username"
            className="form-label"
          >
            Username
          </label>

          <input
            id="register-username"
            type="text"
            className="input"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Choose a username"
            autoComplete="username"
          />

          <label
            htmlFor="register-email"
            className="form-label"
          >
            Email
          </label>

          <input
            id="register-email"
            type="email"
            className="input"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="you@example.com"
            autoComplete="email"
          />

          <label
            htmlFor="register-password"
            className="form-label"
          >
            Password
          </label>

          <input
            id="register-password"
            type="password"
            className="input"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="At least 6 characters"
            autoComplete="new-password"
          />

          <label
            htmlFor="register-confirm-password"
            className="form-label"
          >
            Confirm Password
          </label>

          <input
            id="register-confirm-password"
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
            placeholder="Repeat your password"
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="btn btn-primary btn-full btn-large"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>

          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function Profile({ session }) {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      if (!session?.user?.id) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            "username, full_name, avatar_text, balance"
          )
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error(
            "Profile load error:",
            error
          );
        }

        if (mounted) {
          setProfile(data || null);
        }
      } catch (error) {
        console.error(
          "Profile exception:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [session]);

  const username =
    profile?.username ||
    session?.user?.user_metadata?.username ||
    session?.user?.email?.split("@")[0] ||
    "GoldenBet User";

  const avatarText =
    profile?.avatar_text ||
    username.charAt(0).toUpperCase();

  return (
    <div className="page">
      <div className="page-container">
        <div className="profile-hero card">
          <div className="avatar">
            {avatarText}
          </div>

          <div>
            <span className="section-kicker">
              GOLDENBET MEMBER
            </span>

            <h1>{username}</h1>

            <p>
              {session?.user?.email}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="loading-box card">
            Loading profile...
          </div>
        ) : (
          <div className="profile-grid">
            <div className="card profile-info">
              <span className="section-kicker">
                ACCOUNT
              </span>

              <h2>Account Information</h2>

              <div className="info-row">
                <span>Username</span>
                <strong>{username}</strong>
              </div>

              <div className="info-row">
                <span>Email</span>
                <strong>
                  {session?.user?.email || "-"}
                </strong>
              </div>

              <div className="info-row">
                <span>Balance</span>
                <strong>
                  {Number(
                    profile?.balance || 0
                  ).toLocaleString()}{" "}
                  IQD
                </strong>
              </div>
            </div>

            <div className="card-link-grid">
              <Link
                to="/balance"
                className="card-link"
              >
                <span>💰</span>
                <strong>Balance</strong>
                <small>
                  View your balance
                </small>
              </Link>

              <Link
                to="/deposit"
                className="card-link"
              >
                <span>➕</span>
                <strong>Deposit</strong>
                <small>
                  Add funds
                </small>
              </Link>

              <Link
                to="/withdraw"
                className="card-link"
              >
                <span>💸</span>
                <strong>Withdraw</strong>
                <small>
                  Request withdrawal
                </small>
              </Link>

              <Link
                to="/my-bets"
                className="card-link"
              >
                <span>📋</span>
                <strong>My Bets</strong>
                <small>
                  View betting history
                </small>
              </Link>

              <Link
                to="/settings"
                className="card-link"
              >
                <span>⚙️</span>
                <strong>Settings</strong>
                <small>
                  Account settings
                </small>
              </Link>
            </div>
          </div>
        )}

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/sports")}
        >
          ← Back to Sports
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   BALANCE
========================================================= */

function Balance({ session }) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadBalance = async () => {
      if (!session?.user?.id) {
        if (mounted) setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error(
          "Balance load error:",
          error
        );
      }

      if (mounted) {
        setBalance(Number(data?.balance || 0));
        setLoading(false);
      }
    };

    loadBalance();

    return () => {
      mounted = false;
    };
  }, [session]);

  return (
    <div className="page">
      <div className="page-container narrow-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              WALLET
            </span>

            <h1>Balance</h1>
          </div>
        </div>

        <div className="balance-card card">
          <span className="balance-label">
            Available Balance
          </span>

          <strong className="balance-amount">
            {loading
              ? "..."
              : balance.toLocaleString()}{" "}
            <small>IQD</small>
          </strong>

          <div className="balance-actions">
            <Link
              to="/deposit"
              className="btn btn-primary"
            >
              ➕ Deposit
            </Link>

            <Link
              to="/withdraw"
              className="btn btn-secondary"
            >
              💸 Withdraw
            </Link>
          </div>
        </div>

        <div className="wallet-note card">
          <span>ℹ️</span>

          <p>
            Your balance is managed through your
            GoldenBet account. Deposit and withdrawal
            processing can be connected to your payment
            provider.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DEPOSIT
========================================================= */

function Deposit({ session }) {
  return (
    <div className="page">
      <div className="page-container narrow-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              WALLET
            </span>

            <h1>Deposit</h1>

            <p>
              Add funds to your GoldenBet account.
            </p>
          </div>
        </div>

        <div className="form-card card">
          <PaymentCard
            session={session}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WITHDRAW
========================================================= */

function Withdraw({ session }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] =
    useState("Korek");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (event) => {
    event.preventDefault();

    if (!session?.user?.id) {
      alert("Please login first.");
      return;
    }

    const amountNumber = Number(amount);

    if (
      !Number.isFinite(amountNumber) ||
      amountNumber <= 0
    ) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    try {
      alert(
        `Withdrawal request prepared: ${amountNumber.toLocaleString()} IQD via ${method}. Connect your withdrawal backend/payment provider to process it.`
      );

      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-container narrow-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              WALLET
            </span>

            <h1>Withdraw</h1>

            <p>
              Request a withdrawal from your balance.
            </p>
          </div>
        </div>

        <form
          className="form-card card"
          onSubmit={handleWithdraw}
        >
          <label
            htmlFor="withdraw-method"
            className="form-label"
          >
            Payment Method
          </label>

          <select
            id="withdraw-method"
            className="input"
            value={method}
            onChange={(event) =>
              setMethod(event.target.value)
            }
          >
            <option>Korek</option>
            <option>Zain</option>
            <option>Asiacell</option>
            <option>Bank Transfer</option>
          </select>

          <label
            htmlFor="withdraw-amount"
            className="form-label"
          >
            Amount
          </label>

          <input
            id="withdraw-amount"
            type="number"
            min="0"
            className="input"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            placeholder="Enter amount"
          />

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Request Withdrawal"}
          </button>

          <p className="muted">
            Withdrawal processing is currently a
            frontend demo and requires a backend
            payment workflow.
          </p>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   MY BETS
========================================================= */

function MyBets({ session }) {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadBets = async () => {
      if (!session?.user?.id) {
        if (mounted) setLoading(false);
        return;
      }

      const { data, error: betsError } =
        await supabase
          .from("bets")
          .select(
            "id, match_name, stake, total_odds, potential_win, status, created_at"
          )
          .eq("user_id", session.user.id)
          .order("created_at", {
            ascending: false,
          });

      if (betsError) {
        console.error(
          "My bets error:",
          betsError
        );

        if (mounted) {
          setError(betsError.message);
        }
      } else if (mounted) {
        setBets(data || []);
      }

      if (mounted) {
        setLoading(false);
      }
    };

    loadBets();

    return () => {
      mounted = false;
    };
  }, [session]);

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              ACCOUNT
            </span>

            <h1>My Bets</h1>

            <p>
              Your betting history and results.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="loading-box card">
            Loading your bets...
          </div>
        ) : error ? (
          <div className="error-box">
            {error}
          </div>
        ) : bets.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">📋</div>

            <h2>No Bets Yet</h2>

            <p>
              Your placed bets will appear here.
            </p>

            <Link
              to="/sports"
              className="btn btn-primary"
            >
              Start Betting
            </Link>
          </div>
        ) : (
          <div className="my-bets-list">
            {bets.map((bet) => {
              const status =
                String(bet.status || "pending")
                  .toLowerCase();

              return (
                <div
                  className="bet-history-card card"
                  key={bet.id}
                >
                  <div className="bet-history-top">
                    <div>
                      <span className="section-kicker">
                        {bet.created_at
                          ? new Date(
                              bet.created_at
                            ).toLocaleString()
                          : ""}
                      </span>

                      <h2>
                        {bet.match_name}
                      </h2>
                    </div>

                    <span
                      className={`status-badge ${getStatusColor(
                        status
                      )}`}
                    >
                      {getStatusIcon(status)}{" "}
                      {status}
                    </span>
                  </div>

                  <div className="bet-history-details">
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
                      <span>Total Odds</span>
                      <strong>
                        {Number(
                          bet.total_odds || 0
                        ).toFixed(2)}
                      </strong>
                    </div>

                    <div>
                      <span>Potential Win</span>
                      <strong>
                        {Number(
                          bet.potential_win || 0
                        ).toLocaleString()}{" "}
                        IQD
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  const [notifications, setNotifications] =
    useState(() => {
      try {
        return (
          localStorage.getItem(
            "goldenbet_notifications"
          ) !== "false"
        );
      } catch {
        return true;
      }
    });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return (
        localStorage.getItem(
          "goldenbet_dark_mode"
        ) === "true"
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "goldenbet_notifications",
        String(notifications)
      );
    } catch {
      // Ignore localStorage errors.
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "goldenbet_dark_mode",
        String(darkMode)
      );

      document.documentElement.dataset.theme =
        darkMode ? "dark" : "default";
    } catch {
      // Ignore localStorage errors.
    }
  }, [darkMode]);

  return (
    <div className="page">
      <div className="page-container narrow-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              ACCOUNT
            </span>

            <h1>Settings</h1>

            <p>
              Manage your GoldenBet preferences.
            </p>
          </div>
        </div>

        <div className="settings-card card">
          <div className="settings-row">
            <div>
              <strong>
                Notifications
              </strong>

              <span>
                Receive updates and account
                notifications.
              </span>
            </div>

            <button
              type="button"
              className={`toggle ${
                notifications ? "active" : ""
              }`}
              onClick={() =>
                setNotifications(
                  (value) => !value
                )
              }
              aria-label="Toggle notifications"
              aria-pressed={notifications}
            >
              <span />
            </button>
          </div>

          <div className="settings-row">
            <div>
              <strong>
                Dark Mode
              </strong>

              <span>
                Use dark appearance when supported.
              </span>
            </div>

            <button
              type="button"
              className={`toggle ${
                darkMode ? "active" : ""
              }`}
              onClick={() =>
                setDarkMode(
                  (value) => !value
                )
              }
              aria-label="Toggle dark mode"
              aria-pressed={darkMode}
            >
              <span />
            </button>
          </div>
        </div>

        <div className="wallet-note card">
          <span>ℹ️</span>

          <p>
            Settings are currently saved locally on
            this device.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LOGIN REQUIRED
========================================================= */

function LoginRequired() {
  return (
    <div className="page">
      <div className="page-container narrow-container">
        <div className="empty-state card">
          <div className="empty-icon">🔐</div>

          <h1>Login Required</h1>

          <p>
            Please login to access this page.
          </p>

          <div className="empty-actions">
            <Link
              to="/login"
              className="btn btn-primary"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-secondary"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOT FOUND
========================================================= */

function NotFound() {
  return (
    <div className="page">
      <div className="page-container narrow-container">
        <div className="empty-state card">
          <div className="empty-icon">404</div>

          <h1>Page Not Found</h1>

          <p>
            The page you're looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="btn btn-primary"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE BOTTOM NAV
========================================================= */

function MobileBottomNav({ bets }) {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="mobile-bottom-nav">
      <Link
        to="/"
        className={
          location.pathname === "/"
            ? "active"
            : ""
        }
      >
        <span>🏠</span>
        <small>Home</small>
      </Link>

      <Link
        to="/sports"
        className={
          location.pathname.startsWith("/sports")
            ? "active"
            : ""
        }
      >
        <span>⚽</span>
        <small>Sports</small>
      </Link>

      <Link
        to="/live"
        className={
          location.pathname.startsWith("/live")
            ? "active"
            : ""
        }
      >
        <span>🔴</span>
        <small>Live</small>
      </Link>

      <Link
        to="/casino"
        className={
          location.pathname === "/casino"
            ? "active"
            : ""
        }
      >
        <span>🎰</span>
        <small>Casino</small>
      </Link>

      <Link
        to="/bet-slip"
        className={
          location.pathname === "/bet-slip"
            ? "active"
            : ""
        }
      >
        <span className="bottom-bet-icon">
          🎫
          {bets.length > 0 && (
            <b>{bets.length}</b>
          )}
        </span>

        <small>Bets</small>
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
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-mark">G</span>

            <span className="brand-text">
              <strong>GOLDEN</strong>
              <span>BET</span>
            </span>
          </div>

          <p>
            Your GoldenBet destination for sports,
            live betting and casino entertainment.
          </p>
        </div>

        <div className="footer-column">
          <h3>Sports</h3>

          <Link to="/sports">
            Football
          </Link>

          <Link to="/sports">
            Live Betting
          </Link>

          <Link to="/promotions">
            Promotions
          </Link>
        </div>

        <div className="footer-column">
          <h3>Casino</h3>

          <Link to="/casino">
            Casino
          </Link>

          <Link to="/live-casino">
            Live Casino
          </Link>

          <Link to="/golden-games">
            Golden Games
          </Link>
        </div>

        <div className="footer-column">
          <h3>Account</h3>

          <Link to="/profile">
            Profile
          </Link>

          <Link to="/balance">
            Balance
          </Link>

          <Link to="/my-bets">
            My Bets
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} GoldenBet.
          All rights reserved.
        </span>

        <span>
          GoldenBet
        </span>
      </div>
    </footer>
  );
}
