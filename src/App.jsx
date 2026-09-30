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
   GOLDENBET DATA
========================================================= */

const countries = [
  { code: "IQ", name: "Iraq", flag: "🇮🇶" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "IR", name: "Iran", flag: "🇮🇷" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "GB", name: "England", flag: "🇬🇧" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "US", name: "USA", flag: "🇺🇸" },
];

const sports = [
  "Football",
  "Tennis",
  "Basketball",
  "Volleyball",
  "Boxing",
  "MMA",
  "Ice Hockey",
  "Cricket",
  "Handball",
  "Rugby",
  "Baseball",
  "American Football",
  "Darts",
  "Golf",
  "Table Tennis",
  "Esports",
  "Formula 1",
  "Horse Racing",
];

const matches = [
  {
    id: "football-1",
    sport: "Football",
    country: "Spain",
    league: "La Liga",
    home: "Real Madrid",
    away: "Barcelona",
    time: "21:00",
  },
  {
    id: "football-2",
    sport: "Football",
    country: "England",
    league: "Premier League",
    home: "Arsenal",
    away: "Chelsea",
    time: "20:30",
  },
  {
    id: "football-3",
    sport: "Football",
    country: "Italy",
    league: "Serie A",
    home: "Inter Milan",
    away: "AC Milan",
    time: "21:45",
  },
  {
    id: "football-4",
    sport: "Football",
    country: "Germany",
    league: "Bundesliga",
    home: "Bayern Munich",
    away: "Dortmund",
    time: "22:00",
  },
  {
    id: "football-5",
    sport: "Football",
    country: "Iraq",
    league: "Iraq Stars League",
    home: "Al-Shorta",
    away: "Al-Zawraa",
    time: "19:30",
  },
  {
    id: "football-6",
    sport: "Football",
    country: "Iraq",
    league: "Kurdistan Premier League",
    home: "Duhok",
    away: "Erbil",
    time: "20:00",
  },
  {
    id: "football-7",
    sport: "Football",
    country: "England",
    league: "Premier League",
    home: "Liverpool",
    away: "Manchester City",
    time: "20:00",
  },
  {
    id: "football-8",
    sport: "Football",
    country: "England",
    league: "Premier League",
    home: "Manchester United",
    away: "Tottenham",
    time: "21:00",
  },
  {
    id: "football-9",
    sport: "Football",
    country: "Italy",
    league: "Serie A",
    home: "Juventus",
    away: "Napoli",
    time: "21:45",
  },
  {
    id: "football-10",
    sport: "Football",
    country: "France",
    league: "Ligue 1",
    home: "PSG",
    away: "Marseille",
    time: "22:00",
  },
  {
    id: "football-11",
    sport: "Football",
    country: "Turkey",
    league: "Super Lig",
    home: "Galatasaray",
    away: "Fenerbahce",
    time: "20:00",
  },
  {
    id: "football-12",
    sport: "Football",
    country: "Saudi Arabia",
    league: "Saudi Pro League",
    home: "Al-Hilal",
    away: "Al-Nassr",
    time: "21:00",
  },
  {
    id: "football-13",
    sport: "Football",
    country: "Netherlands",
    league: "Eredivisie",
    home: "Ajax",
    away: "PSV",
    time: "19:45",
  },
  {
    id: "football-14",
    sport: "Football",
    country: "Portugal",
    league: "Primeira Liga",
    home: "Benfica",
    away: "Porto",
    time: "21:15",
  },

  {
    id: "tennis-1",
    sport: "Tennis",
    country: "Spain",
    league: "ATP",
    home: "Carlos Alcaraz",
    away: "Daniil Medvedev",
    time: "18:00",
  },
  {
    id: "tennis-2",
    sport: "Tennis",
    country: "USA",
    league: "WTA",
    home: "Player A",
    away: "Player B",
    time: "19:30",
  },

  {
    id: "basketball-1",
    sport: "Basketball",
    country: "USA",
    league: "NBA",
    home: "Lakers",
    away: "Warriors",
    time: "03:00",
  },
  {
    id: "basketball-2",
    sport: "Basketball",
    country: "Turkey",
    league: "BSL",
    home: "Fenerbahce",
    away: "Efes",
    time: "20:00",
  },

  {
    id: "volleyball-1",
    sport: "Volleyball",
    country: "Italy",
    league: "SuperLega",
    home: "Perugia",
    away: "Trento",
    time: "19:00",
  },
  {
    id: "volleyball-2",
    sport: "Volleyball",
    country: "Turkey",
    league: "Efeler Ligi",
    home: "Halkbank",
    away: "Ziraat Bank",
    time: "20:30",
  },

  {
    id: "boxing-1",
    sport: "Boxing",
    country: "USA",
    league: "World Boxing",
    home: "Fighter A",
    away: "Fighter B",
    time: "22:00",
  },

  {
    id: "mma-1",
    sport: "MMA",
    country: "USA",
    league: "MMA Main Event",
    home: "Fighter A",
    away: "Fighter B",
    time: "23:00",
  },
];

const liveMatches = [
  {
    id: "live-football-1",
    sport: "Football",
    country: "England",
    league: "Premier League",
    home: "Liverpool",
    away: "Manchester City",
    homeScore: 1,
    awayScore: 1,
    minute: "67'",
  },
  {
    id: "live-football-2",
    sport: "Football",
    country: "Iraq",
    league: "Iraq Stars League",
    home: "Al-Shorta",
    away: "Al-Zawraa",
    homeScore: 0,
    awayScore: 1,
    minute: "54'",
  },
  {
    id: "live-basketball-1",
    sport: "Basketball",
    country: "USA",
    league: "NBA",
    home: "Lakers",
    away: "Warriors",
    homeScore: 78,
    awayScore: 75,
    minute: "Q3",
  },
  {
    id: "live-tennis-1",
    sport: "Tennis",
    country: "Spain",
    league: "ATP",
    home: "Player A",
    away: "Player B",
    homeScore: 1,
    awayScore: 0,
    minute: "Set 2",
  },
  {
    id: "live-volleyball-1",
    sport: "Volleyball",
    country: "Italy",
    league: "SuperLega",
    home: "Perugia",
    away: "Trento",
    homeScore: 2,
    awayScore: 1,
    minute: "Set 4",
  },
  {
    id: "live-boxing-1",
    sport: "Boxing",
    country: "USA",
    league: "Boxing",
    home: "Fighter A",
    away: "Fighter B",
    homeScore: "-",
    awayScore: "-",
    minute: "Round 7",
  },
  {
    id: "live-mma-1",
    sport: "MMA",
    country: "USA",
    league: "MMA",
    home: "Fighter A",
    away: "Fighter B",
    homeScore: "-",
    awayScore: "-",
    minute: "Round 2",
  },
];

const casinoGames = [
  {
    id: "casino-1",
    name: "Golden Roulette",
    category: "Roulette",
    icon: "🎰",
  },
  {
    id: "casino-2",
    name: "Blackjack VIP",
    category: "Blackjack",
    icon: "🃏",
  },
  {
    id: "casino-3",
    name: "Golden Slots",
    category: "Slots",
    icon: "💰",
  },
  {
    id: "casino-4",
    name: "Royal Baccarat",
    category: "Baccarat",
    icon: "👑",
  },
  {
    id: "casino-5",
    name: "Lucky 777",
    category: "Slots",
    icon: "7️⃣",
  },
  {
    id: "casino-6",
    name: "Golden Crash",
    category: "Crash Games",
    icon: "🚀",
  },
];

const liveCasinoGames = [
  {
    id: "live-casino-1",
    name: "Live Roulette",
    category: "Live Roulette",
    provider: "Evolution",
    icon: "🎡",
  },
  {
    id: "live-casino-2",
    name: "Live Blackjack",
    category: "Live Blackjack",
    provider: "Evolution",
    icon: "🃏",
  },
  {
    id: "live-casino-3",
    name: "Live Baccarat",
    category: "Live Baccarat",
    provider: "Ezugi",
    icon: "♦️",
  },
  {
    id: "live-casino-4",
    name: "Dragon Tiger",
    category: "Live Dragon Tiger",
    provider: "Pragmatic Play Live",
    icon: "🐉",
  },
  {
    id: "live-casino-5",
    name: "Live Game Show",
    category: "Game Show",
    provider: "Live Casino",
    icon: "🎥",
  },
  {
    id: "live-casino-6",
    name: "Live Sic Bo",
    category: "Live Sic Bo",
    provider: "Live Casino",
    icon: "🎲",
  },
];

const vipGames = [
  {
    id: "vip-1",
    name: "Golden Wheel",
    description: "Exclusive GoldenBet VIP game",
    icon: "👑",
  },
  {
    id: "vip-2",
    name: "Golden Fortune",
    description: "Premium VIP rewards",
    icon: "💎",
  },
  {
    id: "vip-3",
    name: "Royal Jackpot",
    description: "Exclusive jackpot game",
    icon: "🎰",
  },
  {
    id: "vip-4",
    name: "Golden Diamonds",
    description: "VIP exclusive game",
    icon: "💠",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function safeOdds(value) {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    return 1;
  }

  return number;
}

function getCountry(countryName) {
  return countries.find(
    (country) =>
      country.name.toLowerCase() === String(countryName || "").toLowerCase()
  );
}

function getStatusIcon(status) {
  if (status === "won") return "✓";
  if (status === "lost") return "×";
  if (status === "cancelled") return "!";
  return "•";
}

function getStatusColor(status) {
  if (status === "won") return "status-won";
  if (status === "lost") return "status-lost";
  if (status === "cancelled") return "status-cancelled";

  return "status-pending";
}

/* =========================================================
   TEAM LOGO
========================================================= */

function TeamLogo({ name }) {
  return (
    <div className="team-logo">
      {String(name || "?").charAt(0).toUpperCase()}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function GoldenBetHeader({ betsCount = 0 }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (location.pathname === "/") {
    return null;
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">G</span>
          <span className="brand-text">GOLDENBET</span>
        </Link>

        <nav className="desktop-nav">
          <Link
            className={location.pathname === "/sports" ? "active" : ""}
            to="/sports"
          >
            Sports
          </Link>

          <Link
            className={location.pathname === "/live" ? "active" : ""}
            to="/live"
          >
            Live Sports
          </Link>

          <Link
            className={location.pathname === "/my-country" ? "active" : ""}
            to="/my-country"
          >
            My Country
          </Link>

          <Link
            className={location.pathname.startsWith("/casino") ? "active" : ""}
            to="/casino"
          >
            Casino
          </Link>

          <Link
            className={
              location.pathname === "/casino/live" ? "active" : ""
            }
            to="/casino/live"
          >
            Live Casino
          </Link>

          <Link
            className={
              location.pathname === "/casino/vip" ? "active" : ""
            }
            to="/casino/vip"
          >
            VIP Games
          </Link>

          <Link
            className={location.pathname === "/promotions" ? "active" : ""}
            to="/promotions"
          >
            Promotions
          </Link>
        </nav>

        <div className="header-actions">
          <Link className="header-bets" to="/bet-slip">
            Bets
            {betsCount > 0 && (
              <span className="selected-count">{betsCount}</span>
            )}
          </Link>

          <Link className="header-login" to="/login">
            Login
          </Link>

          <Link className="header-profile" to="/profile">
            Profile
          </Link>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((value) => !value)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/sports" onClick={closeMenu}>
            ⚽ Sports
          </Link>

          <Link to="/live" onClick={closeMenu}>
            🔴 Live Sports
          </Link>

          <Link to="/my-country" onClick={closeMenu}>
            🌍 My Country
          </Link>

          <Link to="/casino" onClick={closeMenu}>
            🎰 Casino
          </Link>

          <Link to="/casino/live" onClick={closeMenu}>
            🎥 Live Casino
          </Link>

          <Link to="/casino/vip" onClick={closeMenu}>
            👑 VIP Games
          </Link>

          <Link to="/promotions" onClick={closeMenu}>
            🎁 Promotions
          </Link>

          <Link to="/bet-slip" onClick={closeMenu}>
            🎟️ Bet Slip
          </Link>

          <Link to="/profile" onClick={closeMenu}>
            👤 Profile
          </Link>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [bets, setBets] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const addBet = (bet) => {
    setBets((current) => {
      const exists = current.some(
        (item) =>
          String(item.matchId) === String(bet.matchId) &&
          String(item.marketId) === String(bet.marketId) &&
          String(item.selectionKey) === String(bet.selectionKey)
      );

      if (exists) {
        return current.filter(
          (item) =>
            !(
              String(item.matchId) === String(bet.matchId) &&
              String(item.marketId) === String(bet.marketId) &&
              String(item.selectionKey) === String(bet.selectionKey)
            )
        );
      }

      const matchIds = new Set(
        current.map((item) => String(item.matchId))
      );

      if (!matchIds.has(String(bet.matchId)) && matchIds.size >= 20) {
        alert("Maximum 20 different matches can be added.");
        return current;
      }

      return [...current, bet];
    });
  };

  return (
    <div className="app">
      <GoldenBetHeader betsCount={bets.length} />

      <Routes>
        <Route path="/" element={<Home session={session} />} />

        <Route
          path="/sports"
          element={<Sports addBet={addBet} />}
        />

        <Route
          path="/sports/:sport"
          element={<Sports addBet={addBet} />}
        />

        <Route
          path="/match/:id"
          element={<MatchPage addBet={addBet} />}
        />

        <Route
          path="/live"
          element={<LiveSports />}
        />

        <Route
          path="/my-country"
          element={
            <MyCountry
              session={session}
              addBet={addBet}
            />
          }
        />

        <Route
          path="/casino"
          element={<CasinoHub tab="casino" />}
        />

        <Route
          path="/casino/live"
          element={<CasinoHub tab="live" />}
        />

        <Route
          path="/casino/vip"
          element={<CasinoHub tab="vip" />}
        />

        <Route
          path="/live-casino"
          element={<CasinoHub tab="live" />}
        />

        <Route
          path="/golden-games"
          element={<CasinoHub tab="vip" />}
        />

        <Route
          path="/bet-slip"
          element={
            <BetSlipPage
              bets={bets}
              setBets={setBets}
              session={session}
            />
          }
        />

        <Route path="/promotions" element={<Promotions />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={<Profile session={session} />}
        />

        <Route
          path="/balance"
          element={<Balance session={session} />}
        />

        <Route
          path="/deposit"
          element={<Deposit session={session} />}
        />

        <Route
          path="/withdraw"
          element={<Withdraw session={session} />}
        />

        <Route
          path="/my-bets"
          element={<MyBets session={session} />}
        />

        <Route path="/settings" element={<Settings />} />

        <Route
          path="/super-admin"
          element={<AdminDashboard />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <MobileBottomNav betsCount={bets.length} />
      <Footer />
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home({ session }) {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <section className="home-topbar">
        <div className="home-brand">
          <div className="home-logo">G</div>

          <div>
            <div className="home-brand-name">GOLDENBET</div>
            <small>Sports & Casino</small>
          </div>
        </div>

        <div className="header-auth">
          {session ? (
            <Link to="/profile" className="btn btn-secondary">
              Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="hero-section">
        <div className="hero-overlay">
          <div className="home-content">
            <div className="hero-crown">👑</div>

            <div className="section-kicker">
              GOLDENBET PREMIUM
            </div>

            <h1>Welcome to GoldenBet</h1>

            <p>
              Sports Betting, Live Sports and Premium Casino
            </p>

            <div className="hero-button">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/sports")}
              >
                Start Betting
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-card-grid">
        <button
          type="button"
          className="home-feature-card"
          onClick={() => navigate("/sports")}
        >
          <span className="feature-icon">⚽</span>
          <span className="feature-content">
            <strong>Sports</strong>
            <small>Football & all sports</small>
          </span>
          <span className="feature-arrow">→</span>
        </button>

        <button
          type="button"
          className="home-feature-card"
          onClick={() => navigate("/live")}
        >
          <span className="feature-icon">🔴</span>
          <span className="feature-content">
            <strong>Live Sports</strong>
            <small>Live matches</small>
          </span>
          <span className="feature-arrow">→</span>
        </button>

        <button
          type="button"
          className="home-feature-card"
          onClick={() => navigate("/my-country")}
        >
          <span className="feature-icon">🌍</span>
          <span className="feature-content">
            <strong>My Country</strong>
            <small>Matches for your country</small>
          </span>
          <span className="feature-arrow">→</span>
        </button>

        <button
          type="button"
          className="home-feature-card"
          onClick={() => navigate("/casino")}
        >
          <span className="feature-icon">🎰</span>
          <span className="feature-content">
            <strong>Casino</strong>
            <small>Casino games</small>
          </span>
          <span className="feature-arrow">→</span>
        </button>

        <button
          type="button"
          className="home-feature-card"
          onClick={() => navigate("/casino/live")}
        >
          <span className="feature-icon">🎥</span>
          <span className="feature-content">
            <strong>Live Casino</strong>
            <small>Live casino tables</small>
          </span>
          <span className="feature-arrow">→</span>
        </button>

        <button
          type="button"
          className="home-feature-card"
          onClick={() => navigate("/casino/vip")}
        >
          <span className="feature-icon">👑</span>
          <span className="feature-content">
            <strong>VIP Games</strong>
            <small>GoldenBet exclusive games</small>
          </span>
          <span className="feature-arrow">→</span>
        </button>
      </section>

      <section className="home-visual-showcase">
        <button
          type="button"
          className="showcase-card"
          onClick={() => navigate("/casino")}
        >
          <img src="/roulette.jpg" alt="Golden Roulette" />
          <span>Golden Roulette</span>
        </button>

        <button
          type="button"
          className="showcase-card showcase-main"
          onClick={() => navigate("/")}
        >
          <img src="/goldenbet.jpg" alt="GoldenBet" />
          <span>GOLDENBET</span>
        </button>

        <button
          type="button"
          className="showcase-card"
          onClick={() => navigate("/sports")}
        >
          <img src="/football.jpg" alt="Football Betting" />
          <span>Football Betting</span>
        </button>
      </section>

      <section className="quick-section">
        <div className="page-heading">
          <span className="section-kicker">QUICK ACCESS</span>
          <h2>Choose Your Game</h2>
        </div>

        <div className="quick-access-grid">
          <Link className="quick-access-card" to="/sports">
            ⚽
            <strong>Football</strong>
          </Link>

          <Link className="quick-access-card" to="/sports/Basketball">
            🏀
            <strong>Basketball</strong>
          </Link>

          <Link className="quick-access-card" to="/sports/Tennis">
            🎾
            <strong>Tennis</strong>
          </Link>

          <Link className="quick-access-card" to="/casino">
            🎰
            <strong>Casino</strong>
          </Link>

          <Link className="quick-access-card" to="/casino/live">
            🎥
            <strong>Live Casino</strong>
          </Link>

          <Link className="quick-access-card" to="/casino/vip">
            👑
            <strong>VIP Games</strong>
          </Link>
        </div>
      </section>

      <section className="vip-banner">
        <div className="vip-content">
          <div className="vip-crown">👑</div>

          <div>
            <span className="vip-small">GOLDENBET</span>
            <h2>VIP EXPERIENCE</h2>
            <p>Premium sports and casino experience.</p>
          </div>

          <Link to="/register" className="btn btn-primary">
            Join VIP
          </Link>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SPORTS
========================================================= */

function Sports({ addBet }) {
  const { sport: routeSport } = useParams();

  const [sport, setSport] = useState(routeSport || "Football");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (routeSport) {
      const found = sports.find(
        (item) =>
          item.toLowerCase() === routeSport.toLowerCase()
      );

      if (found) {
        setSport(found);
      }
    }
  }, [routeSport]);

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const correctSport =
        match.sport.toLowerCase() === sport.toLowerCase();

      const query = search.trim().toLowerCase();

      if (!query) {
        return correctSport;
      }

      return (
        correctSport &&
        [
          match.home,
          match.away,
          match.country,
          match.league,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [sport, search]);

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <span className="section-kicker">GOLDENBET SPORTS</span>
          <h1>Sports</h1>
          <p>Select a sport and find available matches.</p>
        </div>

        <div className="sports-tabs">
          {sports.map((item) => (
            <button
              type="button"
              key={item}
              className={sport === item ? "active" : ""}
              onClick={() => setSport(item)}
            >
              {getSportIcon(item)} {item}
            </button>
          ))}
        </div>

        <input
          className="input sports-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={`Search ${sport}, team, country or league...`}
        />

        {filteredMatches.length > 0 ? (
          <div className="matches-grid">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                addBet={addBet}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              {getSportIcon(sport)}
            </div>

            <h3>No matches available</h3>

            <p>
              There are currently no matches for {sport} in the
              available data.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function getSportIcon(sport) {
  const icons = {
    Football: "⚽",
    Tennis: "🎾",
    Basketball: "🏀",
    Volleyball: "🏐",
    Boxing: "🥊",
    MMA: "🥋",
    "Ice Hockey": "🏒",
    Cricket: "🏏",
    Handball: "🤾",
    Rugby: "🏉",
    Baseball: "⚾",
    "American Football": "🏈",
    Darts: "🎯",
    Golf: "⛳",
    "Table Tennis": "🏓",
    Esports: "🎮",
    "Formula 1": "🏎️",
    "Horse Racing": "🏇",
  };

  return icons[sport] || "🏆";
}

/* =========================================================
   MATCH CARD
========================================================= */

function MatchCard({ match, addBet }) {
  const navigate = useNavigate();

  const firstMarket = marketGroups?.[0]?.markets?.[0];

  return (
    <article className="match-card">
      <div className="match-card-top">
        <div>
          <strong>{match.league}</strong>
          <small>
            {getCountry(match.country)?.flag || "🌍"}{" "}
            {match.country}
          </small>
        </div>

        <span>{match.time}</span>
      </div>

      <button
        type="button"
        className="match-teams"
        onClick={() => navigate(`/match/${match.id}`)}
      >
        <div>
          <TeamLogo name={match.home} />
          <span>{match.home}</span>
        </div>

        <strong>VS</strong>

        <div>
          <TeamLogo name={match.away} />
          <span>{match.away}</span>
        </div>
      </button>

      {firstMarket && (
        <div className="match-odds">
          {firstMarket.selections.map((selection) => (
            <button
              type="button"
              key={selection.key}
              onClick={() =>
                addBet({
                  matchId: match.id,
                  matchName: `${match.home} vs ${match.away}`,
                  sport: match.sport,
                  country: match.country,
                  league: match.league,
                  marketId: firstMarket.id,
                  marketTitle: firstMarket.title,
                  selectionKey: selection.key,
                  selectionName: selection.name,
                  odds: safeOdds(selection.odds),
                })
              }
            >
              <span>{selection.label}</span>
              <strong>{safeOdds(selection.odds).toFixed(2)}</strong>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className="view-markets-button"
        onClick={() => navigate(`/match/${match.id}`)}
      >
        View all markets →
      </button>
    </article>
  );
}

/* =========================================================
   MATCH PAGE
========================================================= */

function MatchPage({ addBet }) {
  const { id } = useParams();

  const match = matches.find(
    (item) => String(item.id) === String(id)
  );

  if (!match) {
    return (
      <main className="page">
        <div className="page-container">
          <div className="empty-state">
            <h2>Match not found</h2>
            <Link to="/sports" className="btn btn-primary">
              Back to Sports
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-container narrow-container">
        <Link to="/sports" className="back-link">
          ← Back to Sports
        </Link>

        <section className="match-detail">
          <div className="section-kicker">
            {match.country} · {match.league}
          </div>

          <h1>
            {match.home} vs {match.away}
          </h1>

          <p>
            {getSportIcon(match.sport)} {match.sport} ·{" "}
            {match.time}
          </p>
        </section>

        <div className="markets-page">
          {marketGroups.map((group) => (
            <MarketGroup
              key={group.id}
              group={group}
              match={match}
              addBet={addBet}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function MarketGroup({ group, match, addBet }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="card">
      <button
        type="button"
        className="page-heading"
        onClick={() => setOpen((value) => !value)}
      >
        <h2>{group.title}</h2>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open &&
        group.markets?.map((market) => (
          <div key={market.id} className="card">
            <h3>{market.title}</h3>

            <div className="match-odds">
              {market.selections?.map((selection) => (
                <button
                  type="button"
                  key={selection.key}
                  onClick={() =>
                    addBet({
                      matchId: match.id,
                      matchName: `${match.home} vs ${match.away}`,
                      sport: match.sport,
                      country: match.country,
                      league: match.league,
                      marketId: market.id,
                      marketTitle: market.title,
                      selectionKey: selection.key,
                      selectionName: selection.name,
                      odds: safeOdds(selection.odds),
                    })
                  }
                >
                  <span>{selection.label}</span>
                  <strong>
                    {safeOdds(selection.odds).toFixed(2)}
                  </strong>
                </button>
              ))}
            </div>
          </div>
        ))}
    </section>
  );
}

/* =========================================================
   LIVE SPORTS
========================================================= */

function LiveSports() {
  const [sport, setSport] = useState("All");

  const live = liveMatches.filter(
    (match) => sport === "All" || match.sport === sport
  );

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <span className="section-kicker">LIVE NOW</span>
          <h1>Live Sports</h1>
          <p>
            This section contains live sporting events only.
          </p>
        </div>

        <div className="sports-tabs">
          <button
            type="button"
            className={sport === "All" ? "active" : ""}
            onClick={() => setSport("All")}
          >
            🔴 All
          </button>

          {[
            "Football",
            "Basketball",
            "Tennis",
            "Volleyball",
            "Boxing",
            "MMA",
          ].map((item) => (
            <button
              type="button"
              key={item}
              className={sport === item ? "active" : ""}
              onClick={() => setSport(item)}
            >
              {getSportIcon(item)} {item}
            </button>
          ))}
        </div>

        <div className="live-list">
          {live.map((match) => (
            <LiveMatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </main>
  );
}

function LiveMatchCard({ match }) {
  return (
    <article className="live-match-card">
      <div className="live-indicator">● LIVE</div>

      <div>
        <small>
          {getSportIcon(match.sport)} {match.sport} ·{" "}
          {match.country} · {match.league}
        </small>

        <div className="live-teams">
          <span>{match.home}</span>

          <strong className="live-score">
            {match.homeScore} : {match.awayScore}
          </strong>

          <span>{match.away}</span>
        </div>
      </div>

      <strong>{match.minute}</strong>
    </article>
  );
}

/* =========================================================
   MY COUNTRY
========================================================= */

function MyCountry({ session, addBet }) {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCountry() {
      if (!session?.user?.id) {
        if (mounted) {
          setCountry("");
          setLoading(false);
        }
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("country")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!mounted) return;

      const profileCountry =
        data?.country ||
        session.user.user_metadata?.country ||
        "";

      setCountry(profileCountry);
      setLoading(false);
    }

    loadCountry();

    return () => {
      mounted = false;
    };
  }, [session]);

  if (!session) {
    return (
      <main className="page">
        <div className="page-container">
          <div className="empty-state">
            <div className="empty-icon">🌍</div>
            <h2>My Country</h2>
            <p>
              Login to see matches based on your country.
            </p>

            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="page">
        <div className="page-container">
          <div className="empty-state">
            <h2>Loading your country...</h2>
          </div>
        </div>
      </main>
    );
  }

  const countryInfo = getCountry(country);

  const countryMatches = matches.filter(
    (match) =>
      String(match.country).toLowerCase() ===
      String(country).toLowerCase()
  );

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <span className="section-kicker">PERSONAL SPORTS</span>

          <h1>
            {countryInfo?.flag || "🌍"}{" "}
            {countryInfo?.name || country || "My Country"}
          </h1>

          <p>
            Matches and leagues available for your selected
            country.
          </p>
        </div>

        {!country ? (
          <div className="empty-state">
            <div className="empty-icon">🌍</div>

            <h2>Country not selected</h2>

            <p>
              Open your profile and select your country first.
            </p>

            <Link to="/profile" className="btn btn-primary">
              Open Profile
            </Link>
          </div>
        ) : countryMatches.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {countryInfo?.flag || "🌍"}
            </div>

            <h2>No matches available</h2>

            <p>
              There are currently no matches in the available
              data for {country}.
            </p>
          </div>
        ) : (
          <div className="matches-grid">
            {countryMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                addBet={addBet}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   CASINO HUB
========================================================= */

function CasinoHub({ tab = "casino" }) {
  const navigate = useNavigate();

  const tabs = [
    {
      key: "casino",
      label: "🎰 Casino",
      path: "/casino",
    },
    {
      key: "live",
      label: "🎥 Live Casino",
      path: "/casino/live",
    },
    {
      key: "vip",
      label: "👑 VIP Games",
      path: "/casino/vip",
    },
  ];

  let title = "Casino";
  let subtitle = "Premium casino games";
  let games = casinoGames;

  if (tab === "live") {
    title = "Live Casino";
    subtitle =
      "Real-time casino tables and live casino games only.";
    games = liveCasinoGames;
  }

  if (tab === "vip") {
    title = "VIP Games";
    subtitle =
      "Exclusive GoldenBet premium games.";
    games = vipGames;
  }

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <span className="section-kicker">
            GOLDENBET CASINO
          </span>

          <h1>{title}</h1>

          <p>{subtitle}</p>
        </div>

        <div className="sports-tabs">
          {tabs.map((item) => (
            <button
              type="button"
              key={item.key}
              className={tab === item.key ? "active" : ""}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="game-grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              tab={tab}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function GameCard({ game, tab }) {
  return (
    <article className="game-card">
      <div className="game-icon">{game.icon}</div>

      <div className="game-info">
        <h3>{game.name}</h3>

        <p>
          {game.category ||
            game.description ||
            "GoldenBet game"}
        </p>

        {game.provider && (
          <small>{game.provider}</small>
        )}

        {tab === "vip" && (
          <span className="premium-badge">
            VIP
          </span>
        )}

        {tab === "live" && (
          <span className="live-indicator">
            ● LIVE
          </span>
        )}
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>
          alert(
            `${game.name} will open when the casino provider is connected.`
          )
        }
      >
        Play
      </button>
    </article>
  );
}

/* =========================================================
   BET SLIP
========================================================= */

function BetSlipPage({ bets, setBets, session }) {
  const [stake, setStake] = useState("");
  const [placing, setPlacing] = useState(false);

  const totalOdds = bets.reduce(
    (total, bet) => total * safeOdds(bet.odds),
    1
  );

  const stakeNumber = Number(stake) || 0;
  const potentialWin = stakeNumber * totalOdds;

  const placeBet = async () => {
    if (!session?.user?.id) {
      alert("Please login first.");
      return;
    }

    if (!bets.length) {
      alert("Your bet slip is empty.");
      return;
    }

    if (stakeNumber <= 0) {
      alert("Enter a valid stake.");
      return;
    }

    setPlacing(true);

    try {
      const matchNames = bets
        .map((bet) => bet.matchName)
        .join(" | ");

      const { error } = await supabase.from("bets").insert({
        user_id: session.user.id,
        match_name: matchNames,
        stake: stakeNumber,
        total_odds: totalOdds,
        potential_win: potentialWin,
        status: "pending",
      });

      if (error) {
        throw error;
      }

      alert("Bet placed successfully.");

      setBets([]);
      setStake("");
    } catch (error) {
      alert(error.message || "Could not place bet.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <span className="section-kicker">BETTING</span>
          <h1>Bet Slip</h1>
        </div>

        {bets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎟️</div>
            <h2>Your bet slip is empty</h2>
            <p>
              Select odds from Sports to add them here.
            </p>

            <Link to="/sports" className="btn btn-primary">
              Browse Sports
            </Link>
          </div>
        ) : (
          <div className="betslip-layout">
            <div className="card">
              {bets.map((bet, index) => (
                <div
                  key={`${bet.matchId}-${bet.marketId}-${bet.selectionKey}-${index}`}
                  className="betslip-item"
                >
                  <div>
                    <strong>{bet.matchName}</strong>

                    <small>
                      {bet.marketTitle} ·{" "}
                      {bet.selectionName}
                    </small>
                  </div>

                  <strong>
                    {safeOdds(bet.odds).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      setBets((current) =>
                        current.filter((_, i) => i !== index)
                      )
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <aside className="betslip-right">
              <div className="betslip-summary">
                <div className="summary-row">
                  <span>Selections</span>
                  <strong>{bets.length}</strong>
                </div>

                <div className="summary-row">
                  <span>Total Odds</span>
                  <strong>{totalOdds.toFixed(2)}</strong>
                </div>

                <label className="form-label">
                  Stake
                </label>

                <input
                  className="input"
                  type="number"
                  min="0"
                  value={stake}
                  onChange={(event) =>
                    setStake(event.target.value)
                  }
                  placeholder="Enter stake"
                />

                <div className="summary-row potential">
                  <span>Potential Win</span>
                  <strong>
                    {potentialWin.toLocaleString()}
                  </strong>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-full"
                  onClick={placeBet}
                  disabled={placing}
                >
                  {placing ? "Placing..." : "Place Bet"}
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   AUTH - LOGIN
========================================================= */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    navigate("/profile");
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={login}>
        <div className="auth-logo">G</div>

        <h1>Login</h1>

        <p>Welcome back to GoldenBet.</p>

        {error && (
          <div className="error-box">{error}</div>
        )}

        <label className="form-label">Email</label>

        <input
          className="input"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <label className="form-label">Password</label>

        <input
          className="input"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </div>
      </form>
    </main>
  );
}

/* =========================================================
   AUTH - REGISTER
========================================================= */

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Iraq");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (event) => {
    event.preventDefault();

    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signupError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              country,
            },
          },
        });

      if (signupError) {
        throw signupError;
      }

      if (data?.user?.id) {
        const { error: profileError } =
          await supabase.from("profiles").upsert(
            {
              id: data.user.id,
              username,
              country,
            },
            {
              onConflict: "id",
            }
          );

        if (profileError) {
          console.warn(profileError);
        }
      }

      alert(
        "Registration completed. Please check your email if confirmation is required."
      );

      navigate("/login");
    } catch (signupError) {
      setError(
        signupError.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={register}>
        <div className="auth-logo">G</div>

        <h1>Create Account</h1>

        <p>Join GoldenBet.</p>

        {error && (
          <div className="error-box">{error}</div>
        )}

        <label className="form-label">Username</label>

        <input
          className="input"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          required
        />

        <label className="form-label">Email</label>

        <input
          className="input"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <label className="form-label">
          Country
        </label>

        <select
          className="input"
          value={country}
          onChange={(event) =>
            setCountry(event.target.value)
          }
          required
        >
          {countries.map((item) => (
            <option key={item.code} value={item.name}>
              {item.flag} {item.name}
            </option>
          ))}
        </select>

        <label className="form-label">Password</label>

        <input
          className="input"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          minLength={6}
          required
        />

        <label className="form-label">
          Confirm Password
        </label>

        <input
          className="input"
          type="password"
          value={confirm}
          onChange={(event) =>
            setConfirm(event.target.value)
          }
          minLength={6}
          required
        />

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>
      </form>
    </main>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function Profile({ session }) {
  const [profile, setProfile] = useState(null);
  const [country, setCountry] = useState("Iraq");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      if (!session?.user?.id) {
        if (mounted) {
          setLoading(false);
        }

        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select(
          "username, full_name, avatar_text, balance, country"
        )
        .eq("id", session.user.id)
        .maybeSingle();

      if (!mounted) return;

      setProfile(data);

      setCountry(
        data?.country ||
          session.user.user_metadata?.country ||
          "Iraq"
      );

      setLoading(false);
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [session]);

  const saveCountry = async () => {
    if (!session?.user?.id) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: session.user.id,
          country,
        },
        {
          onConflict: "id",
        }
      );

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Country saved successfully.");
  };

  if (!session) {
    return (
      <main className="page">
        <div className="page-container">
          <div className="empty-state">
            <h2>Please login first.</h2>

            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="page">
        <div className="page-container">
          <div className="empty-state">
            Loading profile...
          </div>
        </div>
      </main>
    );
  }

  const countryInfo = getCountry(country);

  return (
    <main className="page">
      <div className="page-container">
        <div className="profile-hero">
          <div className="avatar">
            {profile?.avatar_text ||
              profile?.username?.charAt(0)?.toUpperCase() ||
              "G"}
          </div>

          <div>
            <span className="section-kicker">
              GOLDENBET PROFILE
            </span>

            <h1>
              {profile?.username ||
                session.user.email}
            </h1>

            <p>{session.user.email}</p>
          </div>
        </div>

        <div className="profile-grid">
          <section className="card">
            <h2>Account</h2>

            <div className="summary-row">
              <span>Username</span>
              <strong>
                {profile?.username || "-"}
              </strong>
            </div>

            <div className="summary-row">
              <span>Email</span>
              <strong>{session.user.email}</strong>
            </div>

            <div className="summary-row">
              <span>Balance</span>
              <strong>
                {Number(profile?.balance || 0).toLocaleString()}
              </strong>
            </div>
          </section>

          <section className="card">
            <h2>Country</h2>

            <p>
              Your country controls the content shown in
              <strong> My Country</strong>.
            </p>

            <label className="form-label">
              Country
            </label>

            <select
              className="input"
              value={country}
              onChange={(event) =>
                setCountry(event.target.value)
              }
            >
              {countries.map((item) => (
                <option
                  key={item.code}
                  value={item.name}
                >
                  {item.flag} {item.name}
                </option>
              ))}
            </select>

            <div className="summary-row">
              <span>Selected</span>
              <strong>
                {countryInfo?.flag || "🌍"} {country}
              </strong>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-full"
              onClick={saveCountry}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Country"}
            </button>

            <Link
              to="/my-country"
              className="btn btn-secondary btn-full"
            >
              Open My Country
            </Link>
          </section>
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
    async function loadBalance() {
      if (!session?.user?.id) return;

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
    return (
      <main className="page">
        <div className="page-container">
          <div className="empty-state">
            <h2>Login required.</h2>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-container narrow-container">
        <section className="balance-card">
          <span>AVAILABLE BALANCE</span>
          <h1>{balance.toLocaleString()}</h1>

          <div>
            <Link to="/deposit" className="btn btn-primary">
              Deposit
            </Link>

            <Link to="/withdraw" className="btn btn-secondary">
              Withdraw
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   DEPOSIT
========================================================= */

function Deposit({ session }) {
  if (!session) {
    return (
      <main className="page">
        <div className="page-container">
          <div className="empty-state">
            <h2>Login required.</h2>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-container narrow-container">
        <div className="page-heading">
          <span className="section-kicker">
            GOLDENBET WALLET
          </span>
          <h1>Deposit</h1>
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
  if (!session) {
    return (
      <main className="page">
        <div className="page-container">
          <div className="empty-state">
            <h2>Login required.</h2>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-container narrow-container">
        <section className="form-card">
          <h1>Withdraw</h1>

          <p>
            Withdrawal functionality can be connected to
            your payment provider.
          </p>

          <input
            className="input"
            type="number"
            placeholder="Amount"
          />

          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={() =>
              alert(
                "Withdrawal request system is ready for provider integration."
              )
            }
          >
            Request Withdrawal
          </button>
        </section>
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
    async function loadBets() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("bets")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", {
          ascending: false,
        });

      setBets(data || []);
      setLoading(false);
    }

    loadBets();
  }, [session]);

  if (!session) {
    return (
      <main className="page">
        <div className="page-container">
          <div className="empty-state">
            <h2>Login required.</h2>

            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <span className="section-kicker">
            ACCOUNT
          </span>

          <h1>My Bets</h1>
        </div>

        {loading ? (
          <div className="empty-state">
            Loading...
          </div>
        ) : bets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎟️</div>
            <h2>No bets yet</h2>

            <Link to="/sports" className="btn btn-primary">
              Browse Sports
            </Link>
          </div>
        ) : (
          <div className="my-bets-list">
            {bets.map((bet) => (
              <article
                className="bet-history-card"
                key={bet.id}
              >
                <div className="bet-history-details">
                  <strong>{bet.match_name}</strong>

                  <span>
                    Stake:{" "}
                    {Number(bet.stake || 0).toLocaleString()}
                  </span>

                  <span>
                    Odds:{" "}
                    {Number(bet.total_odds || 0).toFixed(2)}
                  </span>

                  <span>
                    Potential Win:{" "}
                    {Number(
                      bet.potential_win || 0
                    ).toLocaleString()}
                  </span>
                </div>

                <div
                  className={getStatusColor(
                    bet.status
                  )}
                >
                  {getStatusIcon(bet.status)}{" "}
                  {bet.status || "pending"}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   PROMOTIONS
========================================================= */

function Promotions() {
  const promotions = [
    {
      title: "Welcome Bonus",
      text: "Special offers for new GoldenBet members.",
      icon: "🎁",
    },
    {
      title: "VIP Experience",
      text: "Access premium GoldenBet games and offers.",
      icon: "👑",
    },
    {
      title: "Live Casino",
      text: "Explore live casino tables and games.",
      icon: "🎥",
    },
  ];

  return (
    <main className="page">
      <div className="page-container">
        <div className="page-heading">
          <span className="section-kicker">
            GOLDENBET OFFERS
          </span>

          <h1>Promotions</h1>
        </div>

        <div className="promotion-grid">
          {promotions.map((promotion) => (
            <article
              className="promotion-card"
              key={promotion.title}
            >
              <div className="feature-icon">
                {promotion.icon}
              </div>

              <h2>{promotion.title}</h2>

              <p>{promotion.text}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  const [notifications, setNotifications] =
    useState(true);

  const [darkMode, setDarkMode] = useState(true);

  return (
    <main className="page">
      <div className="page-container narrow-container">
        <div className="page-heading">
          <span className="section-kicker">
            ACCOUNT
          </span>

          <h1>Settings</h1>
        </div>

        <section className="settings-card">
          <div className="settings-row">
            <div>
              <strong>Notifications</strong>
              <p>Receive account notifications.</p>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) =>
                setNotifications(
                  event.target.checked
                )
              }
            />
          </div>

          <div className="settings-row">
            <div>
              <strong>Dark Mode</strong>
              <p>Use GoldenBet dark interface.</p>
            </div>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={(event) =>
                setDarkMode(event.target.checked)
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   MOBILE NAV
========================================================= */

function MobileBottomNav({ betsCount }) {
  const location = useLocation();

  return (
    <nav className="mobile-bottom-nav">
      <Link
        to="/"
        className={
          location.pathname === "/" ? "active" : ""
        }
      >
        🏠
        <span>Home</span>
      </Link>

      <Link
        to="/sports"
        className={
          location.pathname.startsWith("/sports")
            ? "active"
            : ""
        }
      >
        ⚽
        <span>Sports</span>
      </Link>

      <Link
        to="/live"
        className={
          location.pathname === "/live"
            ? "active"
            : ""
        }
      >
        🔴
        <span>Live</span>
      </Link>

      <Link
        to="/casino"
        className={
          location.pathname.startsWith("/casino")
            ? "active"
            : ""
        }
      >
        🎰
        <span>Casino</span>
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
          🎟️
          {betsCount > 0 && (
            <span className="selected-count">
              {betsCount}
            </span>
          )}
        </span>

        <span>Bets</span>
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
        <span className="brand-mark">G</span>
        <strong>GOLDENBET</strong>
      </div>

      <div className="footer-column">
        <strong>Sports</strong>

        <Link to="/sports">Football</Link>
        <Link to="/sports/Tennis">Tennis</Link>
        <Link to="/sports/Basketball">
          Basketball
        </Link>
        <Link to="/live">Live Sports</Link>
      </div>

      <div className="footer-column">
        <strong>Casino</strong>

        <Link to="/casino">Casino</Link>
        <Link to="/casino/live">Live Casino</Link>
        <Link to="/casino/vip">VIP Games</Link>
      </div>

      <div className="footer-column">
        <strong>Account</strong>

        <Link to="/profile">Profile</Link>
        <Link to="/balance">Balance</Link>
        <Link to="/my-bets">My Bets</Link>
        <Link to="/settings">Settings</Link>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} GoldenBet
      </div>
    </footer>
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
          <div className="empty-icon">404</div>

          <h1>Page Not Found</h1>

          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
