import React, { useContext, useMemo, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { LanguageContext } from "./main";
import { t } from "./translations";

const matches = [
  {
    id: 1,
    league: "Premier League",
    time: "18:30",
    home: "Arsenal",
    away: "Chelsea",
    odds: ["1.72", "3.80", "4.40"],
    live: false,
  },
  {
    id: 2,
    league: "La Liga",
    time: "20:00",
    home: "Barcelona",
    away: "Real Madrid",
    odds: ["2.10", "3.60", "2.90"],
    live: true,
  },
  {
    id: 3,
    league: "Serie A",
    time: "21:45",
    home: "Inter Milan",
    away: "AC Milan",
    odds: ["1.85", "3.50", "3.90"],
    live: false,
  },
  {
    id: 4,
    league: "Bundesliga",
    time: "22:00",
    home: "Bayern",
    away: "Dortmund",
    odds: ["1.55", "4.60", "5.20"],
    live: false,
  },
];

const casinoGames = [
  { name: "Royal Roulette", icon: "🎡" },
  { name: "Blackjack VIP", icon: "🃏" },
  { name: "Golden Slots", icon: "🎰" },
  { name: "Lucky Baccarat", icon: "♠️" },
  { name: "Jackpot Gold", icon: "💰" },
  { name: "Live Casino", icon: "🎥" },
];

function Header() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">G</span>
          <span>
            <strong>GOLDEN</strong>
            <small>BET</small>
          </span>
        </Link>

        <nav className="main-nav">
          <Link to="/">{t(language, "home")}</Link>
          <Link to="/football">⚽ {t(language, "football")}</Link>
          <Link to="/live">🔴 {t(language, "live")}</Link>
          <Link to="/casino">🎰 Casino</Link>
          <Link to="/leagues">{t(language, "leagues")}</Link>
        </nav>

        <div className="header-actions">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="en">EN</option>
            <option value="ku">کوردی</option>
            <option value="ar">العربية</option>
            <option value="fa">فارسی</option>
            <option value="tr">TR</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            <option value="ru">RU</option>
            <option value="it">IT</option>
            <option value="pt">PT</option>
          </select>

          <Link to="/login" className="outline-button">
            {t(language, "login")}
          </Link>

          <Link to="/register" className="gold-button">
            {t(language, "register")}
          </Link>
        </div>
      </div>
    </header>
  );
}

function MatchCard({ match, onAdd }) {
  return (
    <div className="match-card">
      <div className="match-top">
        <span>{match.league}</span>
        {match.live ? (
          <span className="live-badge">LIVE</span>
        ) : (
          <span>{match.time}</span>
        )}
      </div>

      <div className="teams">
        <div>
          <div className="team-icon">⚽</div>
          <strong>{match.home}</strong>
        </div>

        <span className="vs">VS</span>

        <div>
          <div className="team-icon">⚽</div>
          <strong>{match.away}</strong>
        </div>
      </div>

      <div className="odds-row">
        <button onClick={() => onAdd(match, "1", match.odds[0])}>
          <small>1</small>
          {match.odds[0]}
        </button>

        <button onClick={() => onAdd(match, "X", match.odds[1])}>
          <small>X</small>
          {match.odds[1]}
        </button>

        <button onClick={() => onAdd(match, "2", match.odds[2])}>
          <small>2</small>
          {match.odds[2]}
        </button>
      </div>
    </div>
  );
}

function BetSlip({ selections, setSelections }) {
  const totalOdds = selections.reduce(
    (total, item) => total * Number(item.odds),
    1
  );

  const remove = (id) => {
    setSelections(selections.filter((item) => item.id !== id));
  };

  return (
    <aside className="betslip">
      <div className="betslip-header">
        <div>
          <span className="gold-text">GOLDEN</span>
          <strong> BET SLIP</strong>
        </div>
        <span className="slip-count">{selections.length}</span>
      </div>

      {selections.length === 0 ? (
        <div className="empty-slip">
          <div className="empty-icon">🎟️</div>
          <h3>Your Bet Slip</h3>
          <p>Select odds from any match to add your prediction here.</p>
        </div>
      ) : (
        <>
          <div className="slip-items">
            {selections.map((item) => (
              <div className="slip-item" key={item.id}>
                <div>
                  <strong>
                    {item.home} vs {item.away}
                  </strong>
                  <small>
                    Selection: {item.selection} · Odds {item.odds}
                  </small>
                </div>

                <button onClick={() => remove(item.id)}>×</button>
              </div>
            ))}
          </div>

          <div className="slip-summary">
            <div>
              <span>Total Odds</span>
              <strong>{totalOdds.toFixed(2)}</strong>
            </div>

            <div>
              <span>Stake</span>
              <strong>$10.00</strong>
            </div>

            <div className="potential">
              <span>Potential Win</span>
              <strong>${(10 * totalOdds).toFixed(2)}</strong>
            </div>
          </div>

          <button className="place-bet">PLACE BET</button>
        </>
      )}
    </aside>
  );
}

function Home() {
  const [selections, setSelections] = useState([]);

  const addSelection = (match, selection, odds) => {
    setSelections((current) => {
      const filtered = current.filter((item) => item.matchId !== match.id);

      return [
        ...filtered,
        {
          id: `${match.id}-${selection}`,
          matchId: match.id,
          home: match.home,
          away: match.away,
          selection,
          odds,
        },
      ];
    });
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">✦ PREMIUM SPORTSBOOK</span>

          <h1>
            BET SMART.
            <br />
            <span>WIN GOLD.</span>
          </h1>

          <p>
            Experience the next generation of sports betting with live odds,
            premium markets and a powerful betting experience.
          </p>

          <div className="hero-buttons">
            <Link to="/football" className="gold-button large">
              ⚽ Explore Sports
            </Link>

            <Link to="/register" className="outline-button large">
              Create Account
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>500+</strong>
              <span>Leagues</span>
            </div>
            <div>
              <strong>10K+</strong>
              <span>Markets</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Live Betting</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="gold-circle"></div>
          <div className="hero-card">
            <span>LIVE MATCH</span>
            <strong>BARCELONA</strong>
            <div className="hero-score">2 : 1</div>
            <strong>REAL MADRID</strong>
            <div className="hero-odds">
              <b>1.85</b>
              <b>3.50</b>
              <b>4.20</b>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">TOP MARKETS</span>
            <h2>Popular Matches</h2>
          </div>

          <Link to="/football" className="view-all">
            View all →
          </Link>
        </div>

        <div className="sports-layout">
          <div className="matches-grid">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onAdd={addSelection}
              />
            ))}
          </div>

          <BetSlip
            selections={selections}
            setSelections={setSelections}
          />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">ENTERTAINMENT</span>
            <h2>Casino</h2>
          </div>

          <Link to="/casino" className="view-all">
            Explore Casino →
          </Link>
        </div>

        <div className="casino-grid">
          {casinoGames.map((game) => (
            <div className="casino-card" key={game.name}>
              <div className="casino-icon">{game.icon}</div>
              <div>
                <span>GOLDEN</span>
                <h3>{game.name}</h3>
              </div>
              <button>PLAY</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Football() {
  const [selections, setSelections] = useState([]);

  const addSelection = (match, selection, odds) => {
    setSelections((current) => [
      ...current.filter((x) => x.matchId !== match.id),
      {
        id: `${match.id}-${selection}`,
        matchId: match.id,
        home: match.home,
        away: match.away,
        selection,
        odds,
      },
    ]);
  };

  return (
    <Page title="Football" subtitle="All football matches and markets">
      <div className="sports-layout">
        <div className="matches-grid">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onAdd={addSelection}
            />
          ))}
        </div>

        <BetSlip
          selections={selections}
          setSelections={setSelections}
        />
      </div>
    </Page>
  );
}

function Live() {
  const liveMatches = matches.filter((match) => match.live);

  return (
    <Page title="Live Matches" subtitle="Watch and bet on live action">
      <div className="live-banner">
        <span className="live-badge">LIVE</span>
        <strong>Live Betting</strong>
        <span>Markets are updated in real time.</span>
      </div>

      <div className="matches-grid">
        {liveMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onAdd={() => {}}
          />
        ))}
      </div>
    </Page>
  );
}

function Casino() {
  return (
    <Page title="Casino" subtitle="Premium casino entertainment">
      <div className="casino-grid large">
        {casinoGames.map((game) => (
          <div className="casino-card big" key={game.name}>
            <div className="casino-icon">{game.icon}</div>
            <span>GOLDEN CASINO</span>
            <h3>{game.name}</h3>
            <button>ENTER GAME</button>
          </div>
        ))}
      </div>
    </Page>
  );
}

function Leagues() {
  const leagues = [
    ["🇬🇧", "Premier League", "England"],
    ["🇪🇸", "La Liga", "Spain"],
    ["🇮🇹", "Serie A", "Italy"],
    ["🇩🇪", "Bundesliga", "Germany"],
    ["🇫🇷", "Ligue 1", "France"],
    ["🌍", "Champions League", "Europe"],
  ];

  return (
    <Page title="Leagues" subtitle="Explore football leagues">
      <div className="leagues-grid">
        {leagues.map(([flag, name, country]) => (
          <div className="league-card" key={name}>
            <span className="league-flag">{flag}</span>
            <div>
              <strong>{name}</strong>
              <small>{country}</small>
            </div>
            <span>→</span>
          </div>
        ))}
      </div>
    </Page>
  );
}

function Login() {
  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Login to your GoldenBet account"
      button="LOGIN"
      footerText="Don't have an account?"
      footerLink="Register"
      footerTo="/register"
    />
  );
}

function Register() {
  return (
    <AuthCard
      title="Create Account"
      subtitle="Join GoldenBet today"
      button="CREATE ACCOUNT"
      footerText="Already have an account?"
      footerLink="Login"
      footerTo="/login"
      register
    />
  );
}

function AuthCard({
  title,
  subtitle,
  button,
  footerText,
  footerLink,
  footerTo,
  register = false,
}) {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span>G</span>
        </div>

        <span className="section-kicker">GOLDENBET</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>

        {register && (
          <input
            type="text"
            placeholder="Full Name"
            className="form-input"
          />
        )}

        {register && (
          <input
            type="text"
            placeholder="Username"
            className="form-input"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="form-input"
        />

        {register && (
          <input
            type="tel"
            placeholder="Phone Number"
            className="form-input"
          />
        )}

        <input
          type="password"
          placeholder="Password"
          className="form-input"
        />

        {register && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-input"
          />
        )}

        {register && (
          <label className="terms">
            <input type="checkbox" />
            <span>I agree to the Terms & Conditions</span>
          </label>
        )}

        <button className="gold-button auth-button">{button}</button>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <p className="auth-footer">
          {footerText} <Link to={footerTo}>{footerLink}</Link>
        </p>
      </div>
    </main>
  );
}

function Profile() {
  return (
    <Page title="My Profile" subtitle="Manage your GoldenBet account">
      <div className="dashboard-grid">
        <div className="dashboard-card profile-card">
          <div className="profile-avatar">G</div>
          <h2>GoldenBet User</h2>
          <p>user@goldenbet.com</p>
          <button className="gold-button">Edit Profile</button>
        </div>

        <div className="dashboard-card">
          <span>AVAILABLE BALANCE</span>
          <strong className="big-number">$0.00</strong>
          <Link to="/deposit" className="gold-button">
            Deposit
          </Link>
        </div>

        <div className="dashboard-card">
          <span>ACTIVE BETS</span>
          <strong className="big-number">0</strong>
          <Link to="/my-bets" className="outline-button">
            My Bets
          </Link>
        </div>
      </div>
    </Page>
  );
}

function Balance() {
  return (
    <Page title="Wallet" subtitle="Manage your balance">
      <div className="wallet-card">
        <span>AVAILABLE BALANCE</span>
        <strong>$0.00</strong>

        <div className="wallet-actions">
          <Link to="/deposit" className="gold-button">
            + Deposit
          </Link>
          <Link to="/withdraw" className="outline-button">
            Withdraw
          </Link>
        </div>
      </div>
    </Page>
  );
}

function SimplePage({ title, subtitle }) {
  return (
    <Page title={title} subtitle={subtitle}>
      <div className="empty-page">
        <div>✦</div>
        <h2>{title}</h2>
        <p>This section is ready for the GoldenBet backend.</p>
      </div>
    </Page>
  );
}

function Page({ title, subtitle, children }) {
  return (
    <main className="page">
      <div className="page-heading">
        <span className="section-kicker">GOLDENBET</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {children}
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="brand footer-brand">
          <span className="brand-mark">G</span>
          <span>
            <strong>GOLDEN</strong>
            <small>BET</small>
          </span>
        </div>
        <p>Premium sports betting and entertainment platform.</p>
      </div>

      <div>
        <h4>Sports</h4>
        <Link to="/football">Football</Link>
        <Link to="/live">Live</Link>
        <Link to="/leagues">Leagues</Link>
      </div>

      <div>
        <h4>Casino</h4>
        <Link to="/casino">Casino</Link>
        <Link to="/casino">Live Casino</Link>
      </div>

      <div>
        <h4>Account</h4>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <div className="footer-bottom">
        © 2026 GoldenBet. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  const location = useLocation();

  const showLayout = useMemo(() => {
    return location.pathname !== "/login" && location.pathname !== "/register";
  }, [location.pathname]);

  return (
    <div className="app">
      {showLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/football" element={<Football />} />
        <Route path="/live" element={<Live />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/leagues" element={<Leagues />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/balance"
          element={
            <Balance />
          }
        />

        <Route
          path="/deposit"
          element={
            <SimplePage
              title="Deposit"
              subtitle="Add funds to your wallet"
            />
          }
        />

        <Route
          path="/withdraw"
          element={
            <SimplePage
              title="Withdraw"
              subtitle="Withdraw your available balance"
            />
          }
        />

        <Route
          path="/my-bets"
          element={
            <SimplePage
              title="My Bets"
              subtitle="View your betting history"
            />
          }
        />

        <Route
          path="/settings"
          element={
            <SimplePage
              title="Settings"
              subtitle="Manage your preferences"
            />
          }
        />

        <Route
          path="*"
          element={<Home />}
        />
      </Routes>

      {showLayout && <Footer />}
    </div>
  );
}
