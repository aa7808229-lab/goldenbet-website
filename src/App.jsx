import { useContext, useMemo, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { LanguageContext } from "./main";
import { t } from "./translations";

const sports = [
  ["⚽", "Football"],
  ["🎾", "Tennis"],
  ["🏀", "Basketball"],
  ["🏐", "Volleyball"],
  ["🏒", "Ice Hockey"],
  ["🏏", "Cricket"],
  ["🥊", "Boxing"],
  ["🥋", "MMA"],
  ["🎮", "Esports"],
  ["🏓", "Table Tennis"],
  ["🏎️", "Formula 1"],
  ["🏇", "Horse Racing"],
  ["🤾", "Handball"],
  ["🏉", "Rugby"],
  ["⚾", "Baseball"],
  ["🏈", "American Football"],
  ["🎯", "Darts"],
  ["⛳", "Golf"],
  ["🚴", "Cycling"],
  ["🏆", "All Sports"],
];

const casinoCategories = [
  ["🎰", "All Games"],
  ["🎰", "Slots"],
  ["🎡", "Roulette"],
  ["🃏", "Blackjack"],
  ["♦️", "Baccarat"],
  ["♠️", "Poker"],
  ["🚀", "Crash Games"],
  ["💰", "Jackpot"],
  ["🎁", "Game Shows"],
  ["🎮", "Arcade"],
  ["🎲", "Table Games"],
  ["⚡", "Instant Games"],
];

const liveCasinoCategories = [
  ["🔥", "All Live Games"],
  ["🌟", "Evolution"],
  ["🎥", "Ezugi"],
  ["⚡", "Pragmatic Play Live"],
  ["📺", "TVBet"],
  ["🎡", "Live Roulette"],
  ["🃏", "Live Blackjack"],
  ["♦️", "Live Baccarat"],
  ["♠️", "Live Poker"],
  ["🎁", "Live Game Shows"],
  ["🐉", "Live Dragon Tiger"],
  ["🎲", "Live Sic Bo"],
  ["🎯", "Live Wheel"],
];

const casinoGames = [
  ["Royal Roulette", "🎡", "Roulette"],
  ["Blackjack VIP", "🃏", "Blackjack"],
  ["Golden Slots", "🎰", "Slots"],
  ["Lucky Baccarat", "♦️", "Baccarat"],
  ["Jackpot Gold", "💰", "Jackpot"],
  ["Golden Poker", "♠️", "Poker"],
  ["Rocket Crash", "🚀", "Crash Games"],
  ["Golden Wheel", "🎡", "Game Shows"],
];

const liveGames = [
  ["Evolution Roulette", "🎡", "Evolution"],
  ["Evolution Blackjack", "🃏", "Evolution"],
  ["Evolution Baccarat", "♦️", "Evolution"],
  ["Ezugi Roulette", "🎡", "Ezugi"],
  ["Pragmatic Live Roulette", "🎡", "Pragmatic Play Live"],
  ["TVBet Football", "⚽", "TVBet"],
];

const matches = [
  {
    league: "Premier League",
    home: "Arsenal",
    away: "Chelsea",
    time: "20:30",
    odds: ["1.72", "3.80", "4.60"],
  },
  {
    league: "La Liga",
    home: "Barcelona",
    away: "Real Madrid",
    time: "21:00",
    odds: ["2.10", "3.60", "3.10"],
  },
  {
    league: "Serie A",
    home: "Inter Milan",
    away: "AC Milan",
    time: "21:45",
    odds: ["1.90", "3.50", "3.90"],
  },
  {
    league: "Bundesliga",
    home: "Bayern Munich",
    away: "Dortmund",
    time: "22:00",
    odds: ["1.55", "4.50", "5.20"],
  },
];

function Header() {
  const { language, setLanguage } = useContext(LanguageContext);
  const location = useLocation();

  const nav = [
    ["/", "🏠", t(language, "home")],
    ["/sports", "⚽", "Sports"],
    ["/live", "🔴", "Live"],
    ["/casino", "🎰", "Casino"],
    ["/live-casino", "🎥", "Live Casino"],
    ["/golden-games", "🎮", "Golden Games"],
    ["/promotions", "🎁", "Promotions"],
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">G</span>
          <span>
            <strong>Golden</strong>
            <b>Bet</b>
          </span>
        </Link>

        <nav className="main-nav">
          {nav.map(([path, icon, label]) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? "active" : ""}
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="en">EN</option>
            <option value="ku">KU</option>
            <option value="ar">AR</option>
            <option value="fa">FA</option>
            <option value="tr">TR</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            <option value="ru">RU</option>
            <option value="it">IT</option>
            <option value="pt">PT</option>
          </select>

          <Link to="/login" className="outline-button">
            Login
          </Link>

          <Link to="/register" className="gold-button">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

function BetSlip() {
  const [bets, setBets] = useState([
    {
      id: 1,
      match: "Arsenal vs Chelsea",
      selection: "Arsenal",
      odds: "1.72",
    },
  ]);

  const [stake, setStake] = useState("");

  const totalOdds = useMemo(() => {
    return bets.reduce((total, bet) => total * Number(bet.odds), 1).toFixed(2);
  }, [bets]);

  const potentialReturn =
    stake && Number(stake) > 0
      ? (Number(stake) * Number(totalOdds)).toFixed(2)
      : "0.00";

  function removeBet(id) {
    setBets((current) => current.filter((bet) => bet.id !== id));
  }

  return (
    <aside className="betslip">
      <div className="betslip-header">
        <h3>🎟️ Bet Slip</h3>
        <span>{bets.length}</span>
      </div>

      {bets.length === 0 ? (
        <div className="empty-state">
          <div>🎟️</div>
          <p>Your Bet Slip is empty</p>
          <small>Select odds to add a bet.</small>
        </div>
      ) : (
        <>
          {bets.map((bet) => (
            <div className="bet-item" key={bet.id}>
              <div>
                <strong>{bet.match}</strong>
                <span>{bet.selection}</span>
              </div>

              <div className="bet-item-right">
                <b>{bet.odds}</b>
                <button onClick={() => removeBet(bet.id)}>×</button>
              </div>
            </div>
          ))}

          <div className="bet-summary">
            <div>
              <span>Total Odds</span>
              <strong>{totalOdds}</strong>
            </div>

            <label>
              Stake
              <input
                type="number"
                min="0"
                placeholder="0.00"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
              />
            </label>

            <div>
              <span>Potential Return</span>
              <strong>{potentialReturn}</strong>
            </div>

            <button className="gold-button full-button">
              Place Bet
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">WELCOME TO GOLDENBET</span>
          <h1>
            Your World of
            <span> Sports & Casino</span>
          </h1>
          <p>
            Sports betting, casino games and live entertainment in one premium
            GoldenBet platform.
          </p>

          <div className="hero-buttons">
            <Link to="/sports" className="gold-button">
              ⚽ Explore Sports
            </Link>

            <Link to="/casino" className="outline-button">
              🎰 Casino
            </Link>

            <Link to="/live-casino" className="outline-button">
              🎥 Live Casino
            </Link>
          </div>
        </div>
      </section>

      <section className="quick-menu container">
        <QuickButton to="/sports" icon="⚽" title="Sports" />
        <QuickButton to="/live" icon="🔴" title="Live" />
        <QuickButton to="/casino" icon="🎰" title="Casino" />
        <QuickButton to="/live-casino" icon="🎥" title="Live Casino" />
        <QuickButton to="/golden-games" icon="🎮" title="Golden Games" />
        <QuickButton to="/promotions" icon="🎁" title="Promotions" />
      </section>

      <section className="content-with-sidebar container">
        <main>
          <SectionTitle title="🔥 Popular Matches" />

          <div className="match-grid">
            {matches.map((match) => (
              <MatchCard match={match} key={`${match.home}-${match.away}`} />
            ))}
          </div>

          <SectionTitle title="🎰 Casino" />

          <div className="game-grid">
            {casinoGames.slice(0, 6).map(([name, icon, category]) => (
              <GameCard
                key={name}
                name={name}
                icon={icon}
                category={category}
              />
            ))}
          </div>
        </main>

        <BetSlip />
      </section>
    </>
  );
}

function QuickButton({ to, icon, title }) {
  return (
    <Link to={to} className="quick-button">
      <span>{icon}</span>
      <strong>{title}</strong>
      <small>Open</small>
    </Link>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      <span></span>
    </div>
  );
}

function MatchCard({ match }) {
  return (
    <div className="match-card">
      <div className="match-top">
        <span>{match.league}</span>
        <small>Today · {match.time}</small>
      </div>

      <div className="teams">
        <strong>{match.home}</strong>
        <span>VS</span>
        <strong>{match.away}</strong>
      </div>

      <div className="odds-row">
        <button>1 <b>{match.odds[0]}</b></button>
        <button>X <b>{match.odds[1]}</b></button>
        <button>2 <b>{match.odds[2]}</b></button>
      </div>

      <Link to="/sports/football" className="match-details">
        View Markets →
      </Link>
    </div>
  );
}

function GameCard({ name, icon, category }) {
  return (
    <div className="game-card">
      <div className="game-icon">{icon}</div>
      <div>
        <strong>{name}</strong>
        <span>{category}</span>
      </div>
      <button>PLAY</button>
    </div>
  );
}

function Sports() {
  return (
    <PageLayout title="⚽ Sports" subtitle="Choose a sport">
      <div className="sports-grid">
        {sports.map(([icon, name]) => (
          <Link
            to={
              name === "All Sports"
                ? "/sports/all"
                : `/sports/${name.toLowerCase().replaceAll(" ", "-")}`
            }
            className="sport-card"
            key={name}
          >
            <span>{icon}</span>
            <strong>{name}</strong>
            <small>View matches →</small>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}

function SportPage({ sport }) {
  const sportName =
    sport.charAt(0).toUpperCase() + sport.slice(1).replaceAll("-", " ");

  return (
    <PageLayout
      title={`${getSportIcon(sport)} ${sportName}`}
      subtitle={`Leagues, matches, markets and odds`}
    >
      <div className="sub-menu">
        <button className="active">All Matches</button>
        <button>Live</button>
        <button>Today</button>
        <button>Tomorrow</button>
        <button>Top Leagues</button>
      </div>

      <div className="league-block">
        <div className="league-heading">
          <strong>🏆 {getLeagueName(sport)}</strong>
          <span>›</span>
        </div>

        <div className="sport-match">
          <div>
            <small>Today · 20:30</small>
            <strong>Team A</strong>
            <strong>Team B</strong>
          </div>

          <div className="market-buttons">
            <button>1 <b>1.80</b></button>
            <button>X <b>3.40</b></button>
            <button>2 <b>4.20</b></button>
            <button>+25 Markets</button>
          </div>
        </div>

        <div className="sport-match">
          <div>
            <small>Today · 21:45</small>
            <strong>Team C</strong>
            <strong>Team D</strong>
          </div>

          <div className="market-buttons">
            <button>1 <b>2.10</b></button>
            <button>X <b>3.20</b></button>
            <button>2 <b>3.10</b></button>
            <button>+30 Markets</button>
          </div>
        </div>
      </div>

      <div className="info-panel">
        <h3>Markets & Odds</h3>
        <p>
          Match markets will be connected to the sportsbook feed/API when the
          real sports provider is integrated.
        </p>
      </div>
    </PageLayout>
  );
}

function getSportIcon(sport) {
  const found = sports.find(
    ([, name]) => name.toLowerCase().replaceAll(" ", "-") === sport
  );
  return found ? found[0] : "🏆";
}

function getLeagueName(sport) {
  const names = {
    football: "Premier League",
    tennis: "ATP / WTA",
    basketball: "NBA",
    volleyball: "World Volleyball",
    "ice-hockey": "NHL",
    cricket: "International Cricket",
    boxing: "World Boxing",
    mma: "UFC",
    esports: "Esports",
    "table-tennis": "World Table Tennis",
    "formula-1": "Formula 1",
    "horse-racing": "Horse Racing",
  };

  return names[sport] || "Featured League";
}

function Live() {
  return (
    <PageLayout title="🔴 Live" subtitle="Live sports happening now">
      <div className="live-banner">
        <span className="live-dot"></span>
        LIVE NOW
      </div>

      <div className="match-grid">
        {matches.slice(0, 3).map((match) => (
          <MatchCard match={match} key={`${match.home}-${match.away}`} />
        ))}
      </div>
    </PageLayout>
  );
}

function Casino() {
  const [category, setCategory] = useState("All Games");

  const filtered =
    category === "All Games"
      ? casinoGames
      : casinoGames.filter((game) => game[2] === category);

  return (
    <PageLayout
      title="🎰 Casino"
      subtitle="Casino is completely separate from Live Casino"
    >
      <div className="category-menu">
        {casinoCategories.map(([icon, name]) => (
          <button
            key={name}
            className={category === name ? "active" : ""}
            onClick={() => setCategory(name)}
          >
            {icon} {name}
          </button>
        ))}
      </div>

      <div className="game-grid large">
        {filtered.length > 0 ? (
          filtered.map(([name, icon, gameCategory]) => (
            <GameCard
              key={name}
              name={name}
              icon={icon}
              category={gameCategory}
            />
          ))
        ) : (
          <div className="info-panel">
            <h3>{category}</h3>
            <p>Games will appear here after the provider integration.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

function LiveCasino() {
  const [category, setCategory] = useState("All Live Games");

  const filtered =
    category === "All Live Games"
      ? liveGames
      : liveGames.filter((game) => game[2] === category);

  return (
    <PageLayout
      title="🎥 Live Casino"
      subtitle="A completely independent Live Casino section"
    >
      <div className="live-casino-hero">
        <div>
          <span className="eyebrow">LIVE CASINO</span>
          <h2>Real-time casino entertainment</h2>
          <p>
            Live Roulette, Blackjack, Baccarat, Poker and Game Shows.
          </p>
        </div>
      </div>

      <div className="category-menu">
        {liveCasinoCategories.map(([icon, name]) => (
          <button
            key={name}
            className={category === name ? "active" : ""}
            onClick={() => setCategory(name)}
          >
            {icon} {name}
          </button>
        ))}
      </div>

      <div className="game-grid large">
        {filtered.map(([name, icon, provider]) => (
          <GameCard
            key={name}
            name={name}
            icon={icon}
            category={provider}
          />
        ))}
      </div>

      <div className="info-panel">
        <h3>Provider Integration</h3>
        <p>
          Evolution, Ezugi, Pragmatic Play Live and other providers will be
          connected after official commercial, licensing and technical
          onboarding.
        </p>
      </div>
    </PageLayout>
  );
}

function GoldenGames() {
  return (
    <PageLayout
      title="🎮 Golden Games"
      subtitle="GoldenBet's own games section"
    >
      <div className="game-grid large">
        {[
          ["Golden Crash", "🚀"],
          ["Golden Dice", "🎲"],
          ["Golden Wheel", "🎡"],
          ["Golden Mines", "💎"],
          ["Golden Cards", "🃏"],
          ["Golden Jackpot", "💰"],
        ].map(([name, icon]) => (
          <GameCard key={name} name={name} icon={icon} category="Golden Games" />
        ))}
      </div>
    </PageLayout>
  );
}

function Promotions() {
  return (
    <PageLayout title="🎁 Promotions" subtitle="GoldenBet promotions">
      <div className="promo-grid">
        <div className="promo-card">
          <span>🎉</span>
          <h3>Welcome Bonus</h3>
          <p>Promotional offers can be displayed here.</p>
          <button className="gold-button">View Offer</button>
        </div>

        <div className="promo-card">
          <span>⚽</span>
          <h3>Sports Promotion</h3>
          <p>Sports promotions and campaigns.</p>
          <button className="gold-button">View Offer</button>
        </div>

        <div className="promo-card">
          <span>🎰</span>
          <h3>Casino Promotion</h3>
          <p>Casino promotions and campaigns.</p>
          <button className="gold-button">View Offer</button>
        </div>
      </div>
    </PageLayout>
  );
}

function AccountPage({ title, children }) {
  return (
    <PageLayout title={`👤 ${title}`} subtitle="GoldenBet Account">
      <div className="account-layout">
        <aside className="account-menu">
          <Link to="/profile">👤 Profile</Link>
          <Link to="/balance">💰 Balance</Link>
          <Link to="/deposit">💳 Deposit</Link>
          <Link to="/withdraw">💸 Withdraw</Link>
          <Link to="/transactions">🧾 Transactions</Link>
          <Link to="/my-bets">🎟️ My Bets</Link>
          <Link to="/settings">⚙️ Settings</Link>
        </aside>

        <div className="account-content">{children}</div>
      </div>
    </PageLayout>
  );
}

function Login() {
  return (
    <PageLayout title="🔐 Login" subtitle="Welcome back to GoldenBet">
      <AuthForm type="login" />
    </PageLayout>
  );
}

function Register() {
  return (
    <PageLayout title="👤 Register" subtitle="Create your GoldenBet account">
      <AuthForm type="register" />
    </PageLayout>
  );
}

function AuthForm({ type }) {
  const navigate = useNavigate();

  return (
    <form
      className="auth-card"
      onSubmit={(e) => {
        e.preventDefault();
        navigate("/profile");
      }}
    >
      {type === "register" && (
        <label>
          Username
          <input type="text" required placeholder="Username" />
        </label>
      )}

      <label>
        Email
        <input type="email" required placeholder="email@example.com" />
      </label>

      <label>
        Password
        <input type="password" required placeholder="Password" />
      </label>

      {type === "register" && (
        <label>
          Confirm Password
          <input type="password" required placeholder="Confirm password" />
        </label>
      )}

      <button className="gold-button full-button" type="submit">
        {type === "login" ? "Login" : "Create Account"}
      </button>

      <p className="auth-note">
        {type === "login"
          ? "Authentication will be connected to Supabase Auth."
          : "Your account system will be connected to Supabase Auth."}
      </p>
    </form>
  );
}

function Profile() {
  return (
    <AccountPage title="Profile">
      <div className="profile-card">
        <div className="avatar">G</div>
        <div>
          <h2>GoldenBet User</h2>
          <p>user@goldenbet.com</p>
        </div>
      </div>
    </AccountPage>
  );
}

function Balance() {
  return (
    <AccountPage title="Balance">
      <div className="balance-box">
        <span>Available Balance</span>
        <strong>$0.00</strong>
      </div>

      <div className="two-columns">
        <Link to="/deposit" className="gold-button">
          💳 Deposit
        </Link>
        <Link to="/withdraw" className="outline-button">
          💸 Withdraw
        </Link>
      </div>
    </AccountPage>
  );
}

function SimpleAccountPage({ title, text }) {
  return (
    <AccountPage title={title}>
      <div className="info-panel">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </AccountPage>
  );
}

function Settings() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <AccountPage title="Settings">
      <div className="settings-card">
        <label>
          Language
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ku">کوردی</option>
            <option value="ar">العربية</option>
            <option value="fa">فارسی</option>
            <option value="tr">Türkçe</option>
          </select>
        </label>
      </div>
    </AccountPage>
  );
}

function PageLayout({ title, subtitle, children }) {
  return (
    <>
      <section className="page-heading">
        <div className="container">
          <span className="eyebrow">GOLDENBET</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>

      <main className="container page-content">{children}</main>
    </>
  );
}

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/sports" element={<Sports />} />
        <Route
          path="/sports/:sport"
          element={<SportRoute />}
        />

        <Route path="/live" element={<Live />} />

        <Route path="/casino" element={<Casino />} />

        <Route path="/live-casino" element={<LiveCasino />} />

        <Route path="/golden-games" element={<GoldenGames />} />

        <Route path="/promotions" element={<Promotions />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/balance" element={<Balance />} />

        <Route
          path="/deposit"
          element={
            <SimpleAccountPage
              title="Deposit"
              text="Deposit methods will be connected here."
            />
          }
        />

        <Route
          path="/withdraw"
          element={
            <SimpleAccountPage
              title="Withdraw"
              text="Withdrawal methods will be connected here."
            />
          }
        />

        <Route
          path="/transactions"
          element={
            <SimpleAccountPage
              title="Transactions"
              text="Your transaction history will appear here."
            />
          }
        />

        <Route
          path="/my-bets"
          element={
            <SimpleAccountPage
              title="My Bets"
              text="Your placed bets will appear here."
            />
          }
        />

        <Route path="/settings" element={<Settings />} />
      </Routes>

      <Footer />
    </div>
  );
}

function SportRoute() {
  const location = useLocation();
  const sport = location.pathname.split("/").filter(Boolean)[1] || "all";

  return <SportPage sport={sport} />;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">G</span>
            <span>
              <strong>Golden</strong>
              <b>Bet</b>
            </span>
          </div>

          <p>
            Premium sportsbook and casino platform.
          </p>
        </div>

        <div>
          <h4>Sports</h4>
          <Link to="/sports">All Sports</Link>
          <Link to="/sports/football">Football</Link>
          <Link to="/sports/tennis">Tennis</Link>
          <Link to="/sports/basketball">Basketball</Link>
        </div>

        <div>
          <h4>Casino</h4>
          <Link to="/casino">Casino</Link>
          <Link to="/live-casino">Live Casino</Link>
          <Link to="/golden-games">Golden Games</Link>
        </div>

        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/balance">Balance</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} GoldenBet. All rights reserved.
      </div>
    </footer>
  );
}

export default App;
