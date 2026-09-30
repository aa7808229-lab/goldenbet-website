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
   SPORTS DATA
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
];

const matches = [
  {
    id: 1,
    sport: "Football",
    country: "Spain",
    league: "La Liga",
    home: "Real Madrid",
    away: "Barcelona",
    time: "21:00",
  },
  {
    id: 2,
    sport: "Football",
    country: "England",
    league: "Premier League",
    home: "Arsenal",
    away: "Chelsea",
    time: "20:30",
  },
  {
    id: 3,
    sport: "Football",
    country: "Italy",
    league: "Serie A",
    home: "Inter Milan",
    away: "AC Milan",
    time: "21:45",
  },
  {
    id: 4,
    sport: "Football",
    country: "Germany",
    league: "Bundesliga",
    home: "Bayern Munich",
    away: "Dortmund",
    time: "22:00",
  },
  {
    id: 5,
    sport: "Football",
    country: "Iraq",
    league: "Iraq Stars League",
    home: "Al-Shorta",
    away: "Al-Zawraa",
    time: "19:30",
  },
  {
    id: 6,
    sport: "Football",
    country: "Iraq",
    league: "Kurdistan Premier League",
    home: "Duhok",
    away: "Erbil",
    time: "20:00",
  },
  {
    id: 7,
    sport: "Football",
    country: "England",
    league: "Premier League",
    home: "Liverpool",
    away: "Manchester City",
    time: "20:00",
  },
  {
    id: 8,
    sport: "Football",
    country: "England",
    league: "Premier League",
    home: "Manchester United",
    away: "Tottenham",
    time: "21:00",
  },
  {
    id: 9,
    sport: "Football",
    country: "Italy",
    league: "Serie A",
    home: "Juventus",
    away: "Napoli",
    time: "21:45",
  },
  {
    id: 10,
    sport: "Football",
    country: "France",
    league: "Ligue 1",
    home: "PSG",
    away: "Marseille",
    time: "22:00",
  },
  {
    id: 11,
    sport: "Football",
    country: "Turkey",
    league: "Super Lig",
    home: "Galatasaray",
    away: "Fenerbahce",
    time: "20:00",
  },
  {
    id: 12,
    sport: "Football",
    country: "Saudi Arabia",
    league: "Saudi Pro League",
    home: "Al-Hilal",
    away: "Al-Nassr",
    time: "21:00",
  },
  {
    id: 13,
    sport: "Football",
    country: "Netherlands",
    league: "Eredivisie",
    home: "Ajax",
    away: "PSV",
    time: "19:45",
  },
  {
    id: 14,
    sport: "Football",
    country: "Portugal",
    league: "Primeira Liga",
    home: "Benfica",
    away: "Porto",
    time: "21:15",
  },
];

/* =========================================================
   CASINO DATA
========================================================= */

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

const liveGames = [
  {
    id: "live-1",
    name: "Live Roulette",
    category: "Live Roulette",
    provider: "Evolution",
    icon: "🎡",
  },
  {
    id: "live-2",
    name: "Live Blackjack",
    category: "Live Blackjack",
    provider: "Evolution",
    icon: "🃏",
  },
  {
    id: "live-3",
    name: "Live Baccarat",
    category: "Live Baccarat",
    provider: "Ezugi",
    icon: "♦️",
  },
  {
    id: "live-4",
    name: "Dragon Tiger",
    category: "Live Dragon Tiger",
    provider: "Pragmatic Play Live",
    icon: "🐉",
  },
];

const goldenGames = [
  {
    id: "golden-1",
    name: "Golden Wheel",
    description: "Exclusive GoldenBet game",
    icon: "👑",
  },
  {
    id: "golden-2",
    name: "Golden Fortune",
    description: "Premium rewards",
    icon: "💎",
  },
  {
    id: "golden-3",
    name: "Royal Jackpot",
    description: "Exclusive jackpot game",
    icon: "🎰",
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

function getSelectionStatus(
  bets,
  matchId,
  marketId,
  selectionKey
) {
  return bets.some(
    (bet) =>
      String(bet.matchId) === String(matchId) &&
      String(bet.marketId) === String(marketId) &&
      String(bet.selectionKey) ===
        String(selectionKey)
  );
}

/* =========================================================
   TEAM LOGO
========================================================= */

function TeamLogo({ name, size = 48 }) {
  const first =
    String(name || "?").charAt(0).toUpperCase();

  return (
    <div
      className="team-logo"
      style={{
        width: size,
        height: size,
      }}
    >
      {first}
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (mounted) {
          setSession(currentSession);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (location.pathname === "/") {
    return null;
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link
            to="/"
            className="brand"
            onClick={() => setMenuOpen(false)}
          >
            <span className="brand-mark">G</span>

            <span className="brand-text">
              <strong>GOLDEN</strong>
              <span>BET</span>
            </span>
          </Link>

          <nav className="desktop-nav">
            <HeaderLink to="/sports">
              Sports
            </HeaderLink>

            <HeaderLink to="/live">
              Live
            </HeaderLink>

            <HeaderLink to="/casino">
              Casino
            </HeaderLink>

            <HeaderLink to="/live-casino">
              Live Casino
            </HeaderLink>

            <HeaderLink to="/golden-games">
              Golden Games
            </HeaderLink>

            <HeaderLink to="/promotions">
              Promotions
            </HeaderLink>
          </nav>

          <div className="header-actions">
            <Link
              to="/bet-slip"
              className="header-bets"
            >
              🎫
              {bets.length > 0 && (
                <b>{bets.length}</b>
              )}
            </Link>

            {session ? (
              <div className="profile-menu">
                <Link
                  to="/profile"
                  className="header-profile"
                >
                  👤
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className="header-login"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="header-auth">
                <Link
                  to="/login"
                  className="header-login"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="header-register"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() =>
                setMenuOpen((value) => !value)
              }
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <Link
            to="/sports"
            onClick={() => setMenuOpen(false)}
          >
            ⚽ Sports
          </Link>

          <Link
            to="/live"
            onClick={() => setMenuOpen(false)}
          >
            🔴 Live
          </Link>

          <Link
            to="/casino"
            onClick={() => setMenuOpen(false)}
          >
            🎰 Casino
          </Link>

          <Link
            to="/live-casino"
            onClick={() => setMenuOpen(false)}
          >
            🎲 Live Casino
          </Link>

          <Link
            to="/golden-games"
            onClick={() => setMenuOpen(false)}
          >
            👑 Golden Games
          </Link>

          <Link
            to="/promotions"
            onClick={() => setMenuOpen(false)}
          >
            🎁 Promotions
          </Link>
        </div>
      )}
    </>
  );
}

function HeaderLink({ to, children }) {
  const location = useLocation();

  const active =
    location.pathname === to ||
    location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={active ? "active" : ""}
    >
      {children}
    </Link>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [bets, setBets] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addBet = (bet) => {
    setBets((current) => {
      const exists = current.some(
        (item) =>
          String(item.matchId) ===
            String(bet.matchId) &&
          String(item.marketId) ===
            String(bet.marketId) &&
          String(item.selectionKey) ===
            String(bet.selectionKey)
      );

      if (exists) {
        return current.filter(
          (item) =>
            !(
              String(item.matchId) ===
                String(bet.matchId) &&
              String(item.marketId) ===
                String(bet.marketId) &&
              String(item.selectionKey) ===
                String(bet.selectionKey)
            )
        );
      }

      const matchIds = new Set(
        current.map((item) => String(item.matchId))
      );

      if (
        !matchIds.has(String(bet.matchId)) &&
        matchIds.size >= 20
      ) {
        alert(
          "You can select a maximum of 20 matches."
        );

        return current;
      }

      return [...current, bet];
    });
  };

  const removeBet = (
    matchId,
    marketId,
    selectionKey
  ) => {
    setBets((current) =>
      current.filter(
        (bet) =>
          !(
            String(bet.matchId) ===
              String(matchId) &&
            String(bet.marketId) ===
              String(marketId) &&
            String(bet.selectionKey) ===
              String(selectionKey)
          )
      )
    );
  };

  const clearBets = () => {
    setBets([]);
  };

  return (
    <div className="app">
      <GoldenBetHeader bets={bets} />

      <Routes>
        <Route
          path="/"
          element={<Home bets={bets} />}
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
            session ? (
              <Profile session={session} />
            ) : (
              <LoginRequired />
            )
          }
        />

        <Route
          path="/balance"
          element={
            session ? (
              <Balance session={session} />
            ) : (
              <LoginRequired />
            )
          }
        />

        <Route
          path="/deposit"
          element={
            session ? (
              <Deposit session={session} />
            ) : (
              <LoginRequired />
            )
          }
        />

        <Route
          path="/withdraw"
          element={
            session ? (
              <Withdraw session={session} />
            ) : (
              <LoginRequired />
            )
          }
        />

        <Route
          path="/my-bets"
          element={
            session ? (
              <MyBets session={session} />
            ) : (
              <LoginRequired />
            )
          }
        />

        <Route
          path="/settings"
          element={
            session ? (
              <Settings />
            ) : (
              <LoginRequired />
            )
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

      <MobileBottomNav bets={bets} />

      <Footer />
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  const navigate = useNavigate();

  const quickCards = [
    {
      icon: "⚽",
      title: "Sports",
      text: "Bet on your favorite sports",
      path: "/sports",
    },
    {
      icon: "🔴",
      title: "Live Betting",
      text: "Real-time action and better odds",
      path: "/live",
    },
    {
      icon: "🎰",
      title: "Casino",
      text: "Play Now",
      path: "/casino",
    },
    {
      icon: "👩‍💼",
      title: "Live Casino",
      text: "Live dealer games",
      path: "/live-casino",
    },
    {
      icon: "👑",
      title: "Golden Games",
      text: "Exclusive games",
      path: "/golden-games",
    },
    {
      icon: "🎁",
      title: "Promotions",
      text: "Special offers",
      path: "/promotions",
    },
  ];

  const quickAccess = [
    {
      icon: "⚽",
      title: "Sports",
      path: "/sports",
    },
    {
      icon: "🔴",
      title: "Live Betting",
      path: "/live",
    },
    {
      icon: "🎰",
      title: "Casino",
      path: "/casino",
    },
    {
      icon: "👑",
      title: "Golden Games",
      path: "/golden-games",
    },
    {
      icon: "🎁",
      title: "Promotions",
      path: "/promotions",
    },
  ];

  return (
    <div className="home-page">
      {/* HEADER */}
      <section className="home-topbar">
        <Link to="/" className="home-brand">
          <span className="home-logo">G</span>

          <span className="home-brand-name">
            GOLDEN<span>BET</span>
          </span>
        </Link>

        <div className="premium-badge">
          PREMIUM SPORTSBOOK 👑
        </div>
      </section>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-crown">
            👑
          </span>

          <h1>
            SPORTS BETTING
            <br />
            <span>LIVE MATCHES</span>
          </h1>

          <p>
            AND EXCLUSIVE GOLDEN GAMES
          </p>

          <button
            type="button"
            className="hero-button"
            onClick={() => navigate("/sports")}
          >
            Start Betting
            <span>›</span>
          </button>
        </div>

        <div className="hero-ball">
          ⚽
        </div>

        <div className="hero-dots">
          <span className="active" />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="home-content">
        {/* SIX CARDS */}
        <section className="home-card-grid">
          {quickCards.map((item) => (
            <button
              type="button"
              className="home-feature-card"
              key={item.title}
              onClick={() => navigate(item.path)}
            >
              <div className="feature-icon">
                {item.icon}
              </div>

              <div className="feature-content">
                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </div>

              <span className="feature-arrow">
                ›
              </span>
            </button>
          ))}
        </section>

        {/* QUICK ACCESS */}
        <section className="quick-section">
          <h2>Quick Access</h2>

          <div className="quick-access-grid">
            {quickAccess.map((item) => (
              <button
                type="button"
                key={item.title}
                className="quick-access-card"
                onClick={() => navigate(item.path)}
              >
                <span>{item.icon}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
        </section>

        {/* VIP */}
        <section className="vip-banner">
          <div className="vip-content">
            <span className="vip-small">
              GOLDENBET
            </span>

            <h2>
              EXCLUSIVE VIP EXPERIENCE
            </h2>

            <p>
              Special promotions, premium predictions
              and exclusive offers.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/promotions")
              }
            >
              Explore VIP
              <span>›</span>
            </button>
          </div>

          <div className="vip-crown">
            👑
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   SPORTS
========================================================= */

function Sports({ bets, addBet }) {
  const [sport, setSport] =
    useState("Football");

  const [search, setSearch] =
    useState("");

  const navigate = useNavigate();

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const sportMatch =
        match.sport === sport;

      const searchMatch =
        !search.trim() ||
        `${match.home} ${match.away} ${match.league} ${match.country}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return sportMatch && searchMatch;
    });
  }, [sport, search]);

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              GOLDENBET SPORTS
            </span>

            <h1>Sports</h1>

            <p>
              Choose a sport and select your predictions.
            </p>
          </div>
        </div>

        <div className="sports-tabs">
          {sports.map((item) => (
            <button
              type="button"
              key={item}
              className={
                sport === item
                  ? "sport-tab active"
                  : "sport-tab"
              }
              onClick={() => setSport(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <input
          className="input sports-search"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search team, league or country..."
        />

        {sport !== "Football" ? (
          <div className="empty-state card">
            <div className="empty-icon">
              🏆
            </div>

            <h2>{sport}</h2>

            <p>
              This sport is ready for API integration.
              Football demo matches are currently
              available.
            </p>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">
              🔎
            </div>

            <h2>No Matches Found</h2>

            <p>
              Try another search.
            </p>
          </div>
        ) : (
          <div className="matches-grid">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                bets={bets}
                addBet={addBet}
                onOpen={() =>
                  navigate(
                    `/match/${match.id}`
                  )
                }
              />
            ))}
          </div>
        )}
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
  onOpen,
}) {
  const group = marketGroups?.[0];
  const market = group?.markets?.[0];

  const selections =
    market?.selections || [];

  const selectedBets = bets.filter(
    (bet) =>
      String(bet.matchId) ===
      String(match.id)
  );

  return (
    <div className="match-card card">
      <div className="match-card-top">
        <span>
          🏆 {match.league}
        </span>

        <span>
          🕐 {match.time}
        </span>
      </div>

      <div className="match-teams">
        <div>
          <TeamLogo
            name={match.home}
            size={48}
          />
          <strong>{match.home}</strong>
        </div>

        <span>VS</span>

        <div>
          <TeamLogo
            name={match.away}
            size={48}
          />
          <strong>{match.away}</strong>
        </div>
      </div>

      {market && (
        <div className="match-odds">
          {selections
            .slice(0, 3)
            .map((selection) => {
              const selected =
                getSelectionStatus(
                  bets,
                  match.id,
                  market.id,
                  selection.key
                );

              return (
                <button
                  type="button"
                  key={selection.key}
                  className={
                    selected
                      ? "odds-button selected"
                      : "odds-button"
                  }
                  onClick={() =>
                    addBet({
                      matchId: match.id,
                      matchName: `${match.home} vs ${match.away}`,
                      sport: match.sport,
                      league: match.league,
                      marketId: market.id,
                      marketTitle:
                        market.title,
                      selectionKey:
                        selection.key,
                      selectionName:
                        selection.name ||
                        selection.label,
                      odds: safeOdds(
                        selection.odds
                      ),
                    })
                  }
                >
                  <span>
                    {selection.label ||
                      selection.name}
                  </span>

                  <strong>
                    {safeOdds(
                      selection.odds
                    ).toFixed(2)}
                  </strong>
                </button>
              );
            })}
        </div>
      )}

      {selectedBets.length > 0 && (
        <div className="selected-count">
          ✓ {selectedBets.length} selected
        </div>
      )}

      <button
        type="button"
        className="view-markets-button"
        onClick={onOpen}
      >
        View All Markets →
      </button>
    </div>
  );
}

/* =========================================================
   MATCH PAGE
========================================================= */

function MatchPage({
  bets,
  addBet,
  removeBet,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const match = matches.find(
    (item) => String(item.id) === String(id)
  );

  if (!match) {
    return <NotFound />;
  }

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

        <div className="match-detail card">
          <span className="section-kicker">
            {match.league}
          </span>

          <h1>
            {match.home} vs {match.away}
          </h1>

          <p>
            {match.country} • {match.time}
          </p>
        </div>

        <div className="markets-page">
          {marketGroups?.map((group) => (
            <MarketGroup
              key={group.id}
              group={group}
              match={match}
              bets={bets}
              addBet={addBet}
              removeBet={removeBet}
            />
          ))}
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
  const [open, setOpen] =
    useState(true);

  return (
    <section className="market-group card">
      <button
        type="button"
        className="market-group-header"
        onClick={() =>
          setOpen((value) => !value)
        }
      >
        <strong>
          📊 {group.title}
        </strong>

        <span>
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="market-group-content">
          {group.markets?.map((market) => (
            <div
              className="market-card"
              key={market.id}
            >
              <h3>{market.title}</h3>

              <div className="market-selections">
                {market.selections?.map(
                  (selection) => {
                    const selected =
                      getSelectionStatus(
                        bets,
                        match.id,
                        market.id,
                        selection.key
                      );

                    return (
                      <button
                        type="button"
                        key={
                          selection.key
                        }
                        className={
                          selected
                            ? "selection-button selected"
                            : "selection-button"
                        }
                        onClick={() =>
                          addBet({
                            matchId:
                              match.id,
                            matchName: `${match.home} vs ${match.away}`,
                            sport:
                              match.sport,
                            league:
                              match.league,
                            marketId:
                              market.id,
                            marketTitle:
                              market.title,
                            selectionKey:
                              selection.key,
                            selectionName:
                              selection.name ||
                              selection.label,
                            odds: safeOdds(
                              selection.odds
                            ),
                          })
                        }
                      >
                        <span>
                          {selection.label ||
                            selection.name}
                        </span>

                        <strong>
                          {safeOdds(
                            selection.odds
                          ).toFixed(2)}
                        </strong>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
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

  const [stake, setStake] =
    useState("");

  const [placing, setPlacing] =
    useState(false);

  const totalOdds = useMemo(() => {
    if (!bets.length) return 0;

    return bets.reduce(
      (total, bet) =>
        total * safeOdds(bet.odds),
      1
    );
  }, [bets]);

  const potentialWin =
    (Number(stake) || 0) * totalOdds;

  const placeBet = async () => {
    if (!session) {
      navigate("/login");
      return;
    }

    if (!bets.length) {
      alert("Your bet slip is empty.");
      return;
    }

    if (
      !Number(stake) ||
      Number(stake) <= 0
    ) {
      alert("Enter a valid stake.");
      return;
    }

    setPlacing(true);

    try {
      const matchNames = bets
        .map(
          (bet) => bet.matchName
        )
        .filter(Boolean)
        .join(" | ");

      const { error } =
        await supabase
          .from("bets")
          .insert({
            user_id:
              session.user.id,
            match_name:
              matchNames,
            stake: Number(stake),
            total_odds: Number(
              totalOdds.toFixed(2)
            ),
            potential_win: Number(
              potentialWin.toFixed(2)
            ),
            status: "pending",
          });

      if (error) {
        throw error;
      }

      alert(
        "Bet placed successfully!"
      );

      clearBets();
      setStake("");
    } catch (error) {
      alert(
        error?.message ||
          "Could not place bet."
      );
    } finally {
      setPlacing(false);
    }
  };

  if (!bets.length) {
    return (
      <div className="page">
        <div className="page-container">
          <div className="empty-state card">
            <div className="empty-icon">
              🎫
            </div>

            <h1>Bet Slip Is Empty</h1>

            <p>
              Select odds from Sports to add them
              here.
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
          </div>

          <button
            type="button"
            className="btn btn-danger"
            onClick={clearBets}
          >
            Clear
          </button>
        </div>

        <div className="betslip-layout">
          <div>
            {bets.map((bet, index) => (
              <div
                className="betslip-item card"
                key={`${bet.matchId}-${bet.marketId}-${bet.selectionKey}-${index}`}
              >
                <div>
                  <small>
                    {bet.marketTitle}
                  </small>

                  <h3>
                    {bet.matchName}
                  </h3>

                  <strong>
                    {bet.selectionName}
                  </strong>
                </div>

                <div className="betslip-right">
                  <b>
                    {safeOdds(
                      bet.odds
                    ).toFixed(2)}
                  </b>

                  <button
                    type="button"
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

          <aside className="betslip-summary card">
            <h2>Bet Summary</h2>

            <div className="summary-row">
              <span>Selections</span>
              <strong>
                {bets.length}
              </strong>
            </div>

            <div className="summary-row">
              <span>Total Odds</span>
              <strong>
                {totalOdds.toFixed(2)}
              </strong>
            </div>

            <label
              className="form-label"
              htmlFor="stake"
            >
              Stake
            </label>

            <input
              id="stake"
              className="input"
              type="number"
              min="0"
              value={stake}
              onChange={(event) =>
                setStake(
                  event.target.value
                )
              }
              placeholder="0"
            />

            <div className="summary-row potential">
              <span>Potential Win</span>

              <strong>
                {potentialWin.toLocaleString()} IQD
              </strong>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-full"
              disabled={placing}
              onClick={placeBet}
            >
              {placing
                ? "Placing..."
                : session
                ? "Place Bet"
                : "Login to Place Bet"}
            </button>
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
  const games = [
    [
      "Real Madrid",
      "Barcelona",
      "1 - 1",
      "67'",
    ],
    [
      "Arsenal",
      "Chelsea",
      "2 - 0",
      "54'",
    ],
    [
      "Inter Milan",
      "AC Milan",
      "0 - 0",
      "32'",
    ],
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
          </div>

          <span className="live-indicator">
            🔴 LIVE
          </span>
        </div>

        <div className="live-list">
          {games.map(
            (
              [
                home,
                away,
                score,
                minute,
              ],
              index
            ) => (
              <div
                className="live-match-card card"
                key={index}
              >
                <div className="live-top">
                  <span>
                    Football
                  </span>

                  <b>
                    {minute}
                  </b>
                </div>

                <div className="live-teams">
                  <div>
                    <TeamLogo
                      name={home}
                    />
                    <strong>
                      {home}
                    </strong>
                  </div>

                  <div className="live-score">
                    <strong>
                      {score}
                    </strong>
                    <small>
                      LIVE
                    </small>
                  </div>

                  <div>
                    <TeamLogo
                      name={away}
                    />
                    <strong>
                      {away}
                    </strong>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CASINO
========================================================= */

function Casino() {
  return (
    <GamePage
      title="Casino"
      kicker="GOLDENBET CASINO"
      description="Play premium casino games."
      games={casinoGames}
    />
  );
}

function LiveCasino() {
  return (
    <GamePage
      title="Live Casino"
      kicker="LIVE CASINO"
      description="Live dealer casino games."
      games={liveGames}
    />
  );
}

function GamePage({
  title,
  kicker,
  description,
  games,
}) {
  const [category, setCategory] =
    useState("All");

  const categories = [
    "All",
    ...new Set(
      games.map(
        (game) =>
          game.category
      )
    ),
  ];

  const filtered =
    category === "All"
      ? games
      : games.filter(
          (game) =>
            game.category ===
            category
        );

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-heading">
          <div>
            <span className="section-kicker">
              {kicker}
            </span>

            <h1>{title}</h1>

            <p>{description}</p>
          </div>
        </div>

        <div className="category-scroll">
          {categories.map(
            (item) => (
              <button
                type="button"
                key={item}
                className={
                  category === item
                    ? "filter-btn filter-active"
                    : "filter-btn"
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

        <div className="game-grid">
          {filtered.map(
            (game) => (
              <div
                className="game-card card"
                key={game.id}
              >
                <div className="game-icon">
                  {game.icon}
                </div>

                <div className="game-info">
                  <span>
                    {game.category}
                  </span>

                  <h3>
                    {game.name}
                  </h3>

                  {"provider" in
                    game && (
                    <small>
                      {game.provider}
                    </small>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    alert(
                      "Game demo. Connect your game provider to enable gameplay."
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
    </div>
  );
}

/* =========================================================
   GOLDEN GAMES
========================================================= */

function GoldenGames() {
  return (
    <GamePage
      title="Golden Games"
      kicker="EXCLUSIVE GOLDENBET"
      description="Exclusive games created for GoldenBet."
      games={goldenGames}
    />
  );
}

/* =========================================================
   PROMOTIONS
========================================================= */

function Promotions() {
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
              Special offers and exclusive
              promotions.
            </p>
          </div>
        </div>

        <div className="promotion-grid">
          <div className="promotion-card card">
            <span>👑</span>
            <h2>Golden VIP</h2>
            <p>
              Premium predictions and exclusive
              offers.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                alert(
                  "VIP section coming soon."
                )
              }
            >
              Explore VIP
            </button>
          </div>

          <div className="promotion-card card">
            <span>🎁</span>
            <h2>Welcome Bonus</h2>
            <p>
              Join GoldenBet and explore the
              platform.
            </p>

            <Link
              to="/register"
              className="btn btn-primary"
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
   LOGIN
========================================================= */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter email and password."
      );
      return;
    }

    setLoading(true);

    try {
      const { error } =
        await supabase.auth.signInWithPassword(
          {
            email,
            password,
          }
        );

      if (error) throw error;

      navigate("/profile");
    } catch (error) {
      setError(
        error?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          G
        </div>

        <span className="section-kicker">
          GOLDENBET
        </span>

        <h1>Login</h1>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <label className="form-label">
            Email
          </label>

          <input
            className="input"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="Email"
          />

          <label className="form-label">
            Password
          </label>

          <input
            className="input"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Password"
          />

          <button
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="auth-switch">
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
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirm, setConfirm] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !username ||
      !email ||
      !password
    ) {
      setError(
        "Please fill all fields."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirm) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signUp(
          {
            email,
            password,
            options: {
              data: {
                username,
              },
            },
          }
        );

      if (error) throw error;

      if (data.session) {
        navigate("/profile");
      } else {
        alert(
          "Account created. Check your email if confirmation is required."
        );

        navigate("/login");
      }
    } catch (error) {
      setError(
        error?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          G
        </div>

        <span className="section-kicker">
          JOIN GOLDENBET
        </span>

        <h1>Create Account</h1>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <label className="form-label">
            Username
          </label>

          <input
            className="input"
            value={username}
            onChange={(event) =>
              setUsername(
                event.target.value
              )
            }
            placeholder="Username"
          />

          <label className="form-label">
            Email
          </label>

          <input
            className="input"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="Email"
          />

          <label className="form-label">
            Password
          </label>

          <input
            className="input"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Password"
          />

          <label className="form-label">
            Confirm Password
          </label>

          <input
            className="input"
            type="password"
            value={confirm}
            onChange={(event) =>
              setConfirm(
                event.target.value
              )
            }
            placeholder="Confirm password"
          />

          <button
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
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

function Profile({ session }) {
  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    supabase
      .from("profiles")
      .select(
        "username, full_name, avatar_text, balance"
      )
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        setProfile(data);
      });
  }, [session]);

  const username =
    profile?.username ||
    session?.user?.user_metadata
      ?.username ||
    session?.user?.email ||
    "GoldenBet User";

  return (
    <div className="page">
      <div className="page-container">
        <div className="profile-hero card">
          <div className="avatar">
            {String(username)
              .charAt(0)
              .toUpperCase()}
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

        <div className="profile-grid">
          <Link
            to="/balance"
            className="card-link"
          >
            💰
            <strong>Balance</strong>
            <small>
              View balance
            </small>
          </Link>

          <Link
            to="/deposit"
            className="card-link"
          >
            ➕
            <strong>Deposit</strong>
            <small>
              Add funds
            </small>
          </Link>

          <Link
            to="/withdraw"
            className="card-link"
          >
            💸
            <strong>Withdraw</strong>
            <small>
              Withdraw funds
            </small>
          </Link>

          <Link
            to="/my-bets"
            className="card-link"
          >
            📋
            <strong>My Bets</strong>
            <small>
              Betting history
            </small>
          </Link>

          <Link
            to="/settings"
            className="card-link"
          >
            ⚙️
            <strong>Settings</strong>
            <small>
              Preferences
            </small>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BALANCE
========================================================= */

function Balance({ session }) {
  const [balance, setBalance] =
    useState(0);

  useEffect(() => {
    if (!session?.user?.id) return;

    supabase
      .from("profiles")
      .select("balance")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        setBalance(
          Number(data?.balance || 0)
        );
      });
  }, [session]);

  return (
    <div className="page">
      <div className="page-container narrow-container">
        <div className="balance-card card">
          <span>
            Available Balance
          </span>

          <strong>
            {balance.toLocaleString()}{" "}
            <small>IQD</small>
          </strong>

          <div>
            <Link
              to="/deposit"
              className="btn btn-primary"
            >
              Deposit
            </Link>

            <Link
              to="/withdraw"
              className="btn btn-secondary"
            >
              Withdraw
            </Link>
          </div>
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
        <div className="form-card card">
          <h1>Deposit</h1>

          <p>
            Add funds to your account.
          </p>

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

function Withdraw() {
  const [amount, setAmount] =
    useState("");

  const submit = (event) => {
    event.preventDefault();

    if (
      !amount ||
      Number(amount) <= 0
    ) {
      alert(
        "Enter a valid amount."
      );
      return;
    }

    alert(
      "Withdrawal request demo. Connect your backend/payment provider to process it."
    );

    setAmount("");
  };

  return (
    <div className="page">
      <div className="page-container narrow-container">
        <form
          className="form-card card"
          onSubmit={submit}
        >
          <h1>Withdraw</h1>

          <label className="form-label">
            Amount
          </label>

          <input
            className="input"
            type="number"
            value={amount}
            onChange={(event) =>
              setAmount(
                event.target.value
              )
            }
            placeholder="Amount in IQD"
          />

          <button className="btn btn-primary btn-full">
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

function MyBets({ session }) {
  const [bets, setBets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    supabase
      .from("bets")
      .select(
        "id, match_name, stake, total_odds, potential_win, status, created_at"
      )
      .eq(
        "user_id",
        session.user.id
      )
      .order("created_at", {
        ascending: false,
      })
      .then(({ data }) => {
        setBets(data || []);
        setLoading(false);
      });
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
          </div>
        </div>

        {loading ? (
          <div className="loading-box card">
            Loading...
          </div>
        ) : bets.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">
              📋
            </div>

            <h2>
              No Bets Yet
            </h2>

            <Link
              to="/sports"
              className="btn btn-primary"
            >
              Start Betting
            </Link>
          </div>
        ) : (
          <div className="my-bets-list">
            {bets.map((bet) => (
              <div
                className="bet-history-card card"
                key={bet.id}
              >
                <div>
                  <small>
                    {bet.created_at
                      ? new Date(
                          bet.created_at
                        ).toLocaleString()
                      : ""}
                  </small>

                  <h3>
                    {bet.match_name}
                  </h3>
                </div>

                <span
                  className={`status-badge ${getStatusColor(
                    bet.status
                  )}`}
                >
                  {getStatusIcon(
                    bet.status
                  )}{" "}
                  {bet.status}
                </span>

                <div className="bet-history-details">
                  <span>
                    Stake:{" "}
                    <b>
                      {Number(
                        bet.stake || 0
                      ).toLocaleString()}{" "}
                      IQD
                    </b>
                  </span>

                  <span>
                    Odds:{" "}
                    <b>
                      {Number(
                        bet.total_odds ||
                          0
                      ).toFixed(2)}
                    </b>
                  </span>

                  <span>
                    Potential:{" "}
                    <b>
                      {Number(
                        bet.potential_win ||
                          0
                      ).toLocaleString()}{" "}
                      IQD
                    </b>
                  </span>
                </div>
              </div>
            ))}
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
  const [
    notifications,
    setNotifications,
  ] = useState(true);

  const [
    darkMode,
    setDarkMode,
  ] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme =
      darkMode
        ? "dark"
        : "default";
  }, [darkMode]);

  return (
    <div className="page">
      <div className="page-container narrow-container">
        <div className="settings-card card">
          <h1>Settings</h1>

          <div className="settings-row">
            <div>
              <strong>
                Notifications
              </strong>

              <span>
                Account notifications
              </span>
            </div>

            <button
              type="button"
              className={
                notifications
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setNotifications(
                  (value) =>
                    !value
                )
              }
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
                Dark appearance
              </span>
            </div>

            <button
              type="button"
              className={
                darkMode
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setDarkMode(
                  (value) =>
                    !value
                )
              }
            >
              <span />
            </button>
          </div>
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
          <div className="empty-icon">
            🔐
          </div>

          <h1>
            Login Required
          </h1>

          <Link
            to="/login"
            className="btn btn-primary"
          >
            Login
          </Link>
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
          <div className="empty-icon">
            404
          </div>

          <h1>
            Page Not Found
          </h1>

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

  if (
    location.pathname === "/login" ||
    location.pathname ===
      "/register"
  ) {
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
        <span>⌂</span>
        <small>Home</small>
      </Link>

      <Link
        to="/sports"
        className={
          location.pathname.startsWith(
            "/sports"
          )
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
          location.pathname.startsWith(
            "/live"
          )
            ? "active"
            : ""
        }
      >
        <span>◉</span>
        <small>Live</small>
      </Link>

      <Link
        to="/casino"
        className={
          location.pathname ===
          "/casino"
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
          location.pathname ===
          "/bet-slip"
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
            <span className="brand-mark">
              G
            </span>

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
            Sports
          </Link>

          <Link to="/live">
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
        © {new Date().getFullYear()} GoldenBet
      </div>
    </footer>
  );
}
