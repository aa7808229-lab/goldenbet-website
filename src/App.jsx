import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { LanguageContext } from "./main";
import { t } from "./translations";
import AdminDashboard from "./AdminDashboard";
import { marketGroups } from "./markets";
import PaymentCard from "./PaymentCard";
import { supabase } from "../lib/supabase";

/* =========================
   SPORTS
========================= */

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
  "All Sports",
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
    name: "Golden Dice",
    category: "Table Games",
    image: "🎲",
  },
];

const liveGames = [
  {
    name: "Live Roulette",
    provider: "Evolution",
    image: "🎡",
  },
  {
    name: "Live Blackjack",
    provider: "Evolution",
    image: "🃏",
  },
  {
    name: "Live Baccarat",
    provider: "Ezugi",
    image: "♠️",
  },
  {
    name: "Live Game Show",
    provider: "Pragmatic Play Live",
    image: "🎤",
  },
  {
    name: "Live Dragon Tiger",
    provider: "Evolution",
    image: "🐉",
  },
  {
    name: "Live Sic Bo",
    provider: "Ezugi",
    image: "🎲",
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

/* =========================
   MATCHES
========================= */

const matches = [
  {
    id: 1,
    home: "Real Madrid",
    away: "Barcelona",
    time: "21:00",
    date: "Today",
    league: "La Liga",
  },
  {
    id: 2,
    home: "Arsenal",
    away: "Chelsea",
    time: "20:30",
    date: "Today",
    league: "Premier League",
  },
  {
    id: 3,
    home: "Inter Milan",
    away: "AC Milan",
    time: "21:45",
    date: "Today",
    league: "Serie A",
  },
  {
    id: 4,
    home: "Bayern Munich",
    away: "Dortmund",
    time: "22:00",
    date: "Today",
    league: "Bundesliga",
  },
];

/* =========================
   APP
========================= */

export default function App() {
  const { language, setLanguage } =
    useContext(LanguageContext);

  const [bets, setBets] = useState([]);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const {
        data,
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(
          "Session error:",
          error
        );
      }

      if (mounted) {
        setSession(data?.session ?? null);
        setAuthLoading(false);
      }
    }

    loadSession();

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(
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
      const exists = current.find(
        (item) =>
          item.matchId === bet.matchId &&
          item.marketId === bet.marketId
      );

      if (exists) {
        return current.map((item) =>
          item.matchId === bet.matchId &&
          item.marketId === bet.marketId
            ? bet
            : item
        );
      }

      if (current.length >= 20) {
        alert(
          "Maximum 20 selections allowed."
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
      <Header
        language={language}
        setLanguage={setLanguage}
        betCount={bets.length}
        session={session}
        logout={logout}
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

/* =========================
   HEADER
========================= */

function Header({
  language,
  setLanguage,
  betCount,
  session,
  logout,
}) {
  const userEmail =
    session?.user?.email || "";

  return (
    <header className="header">
      <div className="header-inner">
        <Link
          to="/"
          className="logo"
        >
          <span className="logo-gold">
            GOLDEN
          </span>

          <span className="logo-white">
            BET
          </span>
        </Link>

        <nav className="nav">
          <Link to="/">
            {t(language, "home")}
          </Link>

          <Link to="/sports">
            Sports
          </Link>

          <Link to="/live">
            Live
          </Link>

          <Link to="/casino">
            Casino
          </Link>

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

        <div className="header-actions">
          <select
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
            className="language-select"
          >
            <option value="en">
              English
            </option>

            <option value="ku">
              کوردی
            </option>

            <option value="ar">
              العربية
            </option>

            <option value="fa">
              فارسی
            </option>

            <option value="tr">
              Türkçe
            </option>

            <option value="es">
              Español
            </option>

            <option value="fr">
              Français
            </option>

            <option value="de">
              Deutsch
            </option>

            <option value="ru">
              Русский
            </option>

            <option value="it">
              Italiano
            </option>

            <option value="pt">
              Português
            </option>
          </select>

          {session ? (
            <>
              <Link
                to="/profile"
                className="btn btn-outline"
              >
                👤{" "}
                {userEmail || "Profile"}
              </Link>

              <button
                className="btn btn-gold"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-gold"
              >
                Register
              </Link>
            </>
          )}

          <div className="bet-slip-top">
            🧾 {betCount}/20
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================
   HOME
========================= */

function Home({
  bets,
  addBet,
  removeBet,
  clearBets,
}) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            GOLDENBET
          </span>

          <h1>
            Sports, Casino & Live Betting
          </h1>

          <p>
            Explore matches, markets and
            betting opportunities.
          </p>

          <div className="hero-buttons">
            <Link
              to="/sports"
              className="btn btn-gold"
            >
              Explore Sports
            </Link>

            <Link
              to="/casino"
              className="btn btn-outline"
            >
              Casino
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>
            Popular Matches
          </h2>
        </div>

        <div className="home-layout">
          <div className="matches-grid">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                bets={bets}
                addBet={addBet}
              />
            ))}
          </div>

          <BetSlip
            bets={bets}
            removeBet={removeBet}
            clearBets={clearBets}
          />
        </div>
      </section>
    </div>
  );
}

/* =========================
   MATCH CARD
========================= */

function MatchCard({
  match,
  bets,
  addBet,
}) {
  const selectedCount =
    bets.filter(
      (bet) =>
        bet.matchId === match.id
    ).length;

  return (
    <div className="match-card">
      <div className="match-top">
        <span>
          {match.league}
        </span>

        <span>
          {match.date} • {match.time}
        </span>
      </div>

      <div className="match-teams">
        <strong>
          {match.home}
        </strong>

        <span className="vs">
          VS
        </span>

        <strong>
          {match.away}
        </strong>
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

      <Link
        to={`/match/${match.id}`}
        className="view-all-markets"
      >
        {selectedCount > 0
          ? `✓ ${selectedCount} selected — View all markets`
          : "View all markets →"}
      </Link>
    </div>
  );
}

/* =========================
   MATCH PAGE
========================= */

function MatchPage({
  bets,
  addBet,
}) {
  const path =
    window.location.pathname;

  const id =
    Number(path.split("/").pop());

  const match =
    matches.find(
      (item) => item.id === id
    ) || matches[0];

  if (!match) {
    return (
      <div className="page section">
        Match not found.
      </div>
    );
  }

  const selectedCount =
    bets.filter(
      (bet) =>
        bet.matchId === match.id
    ).length;

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
          {match.league}
        </div>

        <h1>
          {match.home}
          <span> VS </span>
          {match.away}
        </h1>

        <div className="match-detail-time">
          📅 {match.date}
          <span> • </span>
          ⏰ {match.time}
        </div>

        <div className="selected-count">
          🧾 {selectedCount} selections
        </div>
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

      <div className="mobile-bet-slip-link">
        <Link
          to="/"
          className="btn btn-gold"
        >
          🧾 Open Bet Slip (
          {bets.length}/20)
        </Link>
      </div>
    </div>
  );
}

/* =========================
   MARKET GROUP
========================= */

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

/* =========================
   MARKET
========================= */

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
      match: `${match.home} vs ${match.away}`,
      home: match.home,
      away: match.away,
      league: match.league,
      time: match.time,
      groupId: group.id,
      groupTitle: group.title,
      marketId: market.id,
      marketTitle: market.title,
      selectionKey: selection.key,
      selection: selection.name,
      label: selection.label,
      odds: selection.odds,
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

/* =========================
   BET SLIP
========================= */

function BetSlip({
  bets,
  removeBet,
  clearBets,
}) {
  const [stake, setStake] =
    useState("");

  const totalOdds =
    useMemo(() => {
      if (!bets.length) {
        return "0.00";
      }

      return bets
        .reduce(
          (total, bet) =>
            total *
            Number(bet.odds),
          1
        )
        .toFixed(2);
    }, [bets]);

  const potentialReturn =
    Number(stake) > 0
      ? (
          Number(stake) *
          Number(totalOdds)
        ).toFixed(2)
      : "0.00";

  function placeBet() {
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

    alert(
      `Selections: ${bets.length}\nTotal Odds: ${totalOdds}\nStake: ${stake}\nPotential Return: ${potentialReturn}`
    );
  }

  return (
    <aside className="bet-slip">
      <div className="bet-slip-header">
        <div>
          <h3>
            🧾 Bet Slip
          </h3>

          <span>
            {bets.length}/20
          </span>
        </div>

        {bets.length > 0 && (
          <button
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
            Choose any market from a match.
          </p>

          <small>
            Maximum 20 selections.
          </small>
        </div>
      ) : (
        <>
          <div className="bet-list">
            {bets.map(
              (bet, index) => (
                <div
                  className="bet-item"
                  key={bet.id}
                >
                  <div className="bet-number">
                    {index + 1}
                  </div>

                  <div className="bet-info">
                    <strong>
                      {bet.home}
                      {" vs "}
                      {bet.away}
                    </strong>

                    <span>
                      {bet.marketTitle}
                    </span>

                    <span className="bet-selection">
                      {bet.selection}
                    </span>

                    <b>
                      @ {bet.odds}
                    </b>
                  </div>

                  <button
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
              )
            )}
          </div>

          <div className="bet-summary">
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
              {potentialReturn}
            </strong>
          </div>

          <button
            className="place-bet-btn"
            onClick={placeBet}
          >
            Place Bet
          </button>
        </>
      )}
    </aside>
  );
}

/* =========================
   SPORTS
========================= */

function Sports({
  bets,
  addBet,
}) {
  return (
    <div className="page section">
      <div className="page-heading">
        <h1>
          Sports
        </h1>

        <p>
          All sports and matches.
        </p>
      </div>

      <div className="sports-grid">
        {sports.map((sport) => (
          <Link
            key={sport}
            to="/sports"
            className="sport-card"
          >
            ⚽
            <span>
              {sport}
            </span>
          </Link>
        ))}
      </div>

      <div className="section">
        <h2>
          Today's Matches
        </h2>

        <div className="matches-grid">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              bets={bets}
              addBet={addBet}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================
   LIVE
========================= */

function Live() {
  return (
    <div className="page section">
      <div className="page-heading">
        <h1>
          🔴 Live Matches
        </h1>

        <p>
          Live matches and live markets.
        </p>
      </div>

      <div className="live-grid">
        {matches
          .slice(0, 3)
          .map((match) => (
            <div
              className="live-card"
              key={match.id}
            >
              <div className="live-badge">
                LIVE
              </div>

              <span>
                {match.league}
              </span>

              <h3>
                {match.home}
              </h3>

              <div className="live-score">
                1 - 0
              </div>

              <h3>
                {match.away}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
}

/* =========================
   CASINO
========================= */

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
    <div className="page section">
      <div className="page-heading">
        <h1>
          🎰 Casino
        </h1>
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

            <button className="btn btn-gold">
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   LIVE CASINO
========================= */

function LiveCasino() {
  const [category, setCategory] =
    useState("All Live Games");

  const games =
    category === "All Live Games"
      ? liveGames
      : liveGames.filter(
          (game) =>
            game.provider ===
            category
        );

  return (
    <div className="page section">
      <div className="page-heading">
        <h1>
          🔴 Live Casino
        </h1>
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

            <button className="btn btn-gold">
              Play Live
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   GOLDEN GAMES
========================= */

function GoldenGames() {
  return (
    <div className="page section">
      <div className="page-heading">
        <h1>
          🟡 Golden Games
        </h1>
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

              <button className="btn btn-gold">
                Play
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* =========================
   PROMOTIONS
========================= */

function Promotions() {
  return (
    <div className="page section">
      <div className="page-heading">
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

/* =========================
   LOGIN
========================= */

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
          Login
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

/* =========================
   REGISTER
========================= */

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
          Register
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

/* =========================
   PROFILE
========================= */

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
          "username, full_name, avatar_url, balance"
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
          Profile
        </h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          👤
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

        <Link
          to="/settings"
          className="btn btn-gold"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}

/* =========================
   BALANCE
========================= */

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

/* =========================
   DEPOSIT
========================= */

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

/* =========================
   WITHDRAW
========================= */

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
      `Withdrawal request prepared.\nAmount: ${amount} IQD\nMethod: ${method}`
    );
  }

  return (
    <div className="page section">
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

/* =========================
   MY BETS
========================= */

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
          "id, stake, total_odds, potential_win, status, selections, created_at"
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
          My Bets
        </h1>
      </div>

      {!bets.length ? (
        <div className="empty-state">
          🧾

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
          {bets.map((bet) => (
            <div
              className="bet-history-card"
              key={bet.id}
            >
              <div>
                <strong>
                  Bet #{bet.id}
                </strong>

                <p>
                  Status:{" "}
                  {bet.status}
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
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================
   SETTINGS
========================= */

function Settings() {
  return (
    <div className="page section">
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

        <button className="btn btn-gold">
          Save Settings
        </button>
      </div>
    </div>
  );
}

/* =========================
   NOT FOUND
========================= */

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

/* =========================
   FOOTER
========================= */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="logo">
            <span className="logo-gold">
              GOLDEN
            </span>

            <span className="logo-white">
              BET
            </span>
          </div>

          <p>
            GoldenBet sports and casino platform.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/sports">
            Sports
          </Link>

          <Link to="/casino">
            Casino
          </Link>

          <Link to="/live-casino">
            Live Casino
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
