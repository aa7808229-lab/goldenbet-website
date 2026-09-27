import React, { useContext, useMemo, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

import { LanguageContext } from "./main";
import { languages, t } from "./translations";

const matches = [
  {
    id: 1,
    league: "premierLeague",
    home: "Arsenal",
    away: "Chelsea",
    time: "18:30",
    odds: ["1.85", "3.60", "4.20"],
  },
  {
    id: 2,
    league: "laLiga",
    home: "Barcelona",
    away: "Real Madrid",
    time: "21:00",
    odds: ["2.10", "3.40", "3.10"],
  },
  {
    id: 3,
    league: "serieA",
    home: "Inter",
    away: "AC Milan",
    time: "20:45",
    odds: ["1.75", "3.70", "4.80"],
  },
  {
    id: 4,
    league: "bundesliga",
    home: "Bayern",
    away: "Dortmund",
    time: "19:30",
    odds: ["1.55", "4.20", "5.50"],
  },
  {
    id: 5,
    league: "ligue1",
    home: "PSG",
    away: "Lyon",
    time: "22:00",
    odds: ["1.60", "4.00", "5.20"],
  },
];

function Layout({ children }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <div
          className="brand"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
        >
          <span className="brand-icon">G</span>
          <span>
            Golden<span>Bet</span>
          </span>
        </div>

        <nav className="desktop-nav">
          <NavLink to="/" className="nav-link">
            {t(language, "home")}
          </NavLink>

          <NavLink to="/football" className="nav-link">
            {t(language, "football")}
          </NavLink>

          <NavLink to="/live" className="nav-link">
            {t(language, "live")}
          </NavLink>

          <NavLink to="/leagues" className="nav-link">
            {t(language, "leagues")}
          </NavLink>

          <NavLink to="/search" className="nav-link">
            {t(language, "search")}
          </NavLink>
        </nav>

        <div className="header-actions">
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>

          <button
            className="outline-button"
            onClick={() => navigate("/login")}
          >
            {t(language, "login")}
          </button>

          <button
            className="gold-button"
            onClick={() => navigate("/register")}
          >
            {t(language, "register")}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div>
          <strong>GoldenBet</strong>
          <p>{t(language, "footerText")}</p>
        </div>

        <p>
          © {new Date().getFullYear()} GoldenBet.{" "}
          {t(language, "allRights")}
        </p>
      </footer>
    </div>
  );
}

function MatchCard({ match }) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="match-card">
      <div className="match-top">
        <span>{t(language, match.league)}</span>
        <span>{match.time}</span>
      </div>

      <div className="teams">
        <div>
          <div className="team-logo">{match.home.charAt(0)}</div>
          <strong>{match.home}</strong>
        </div>

        <span className="vs">{t(language, "vs")}</span>

        <div>
          <div className="team-logo">{match.away.charAt(0)}</div>
          <strong>{match.away}</strong>
        </div>
      </div>

      <div className="odds">
        <button>
          1 <span>{match.odds[0]}</span>
        </button>

        <button>
          X <span>{match.odds[1]}</span>
        </button>

        <button>
          2 <span>{match.odds[2]}</span>
        </button>
      </div>
    </div>
  );
}

function Home() {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="gold-label">GOLDENBET</div>

          <h1>{t(language, "heroTitle")}</h1>

          <p>{t(language, "heroText")}</p>

          <button
            className="hero-button"
            onClick={() => navigate("/football")}
          >
            {t(language, "explore")}
          </button>
        </div>

        <div className="hero-ball">⚽</div>
      </section>

      <section className="page">
        <div className="section-heading">
          <div>
            <span className="gold-label">GOLDENBET</span>
            <h2>{t(language, "popularMatches")}</h2>
          </div>

          <button
            className="outline-button"
            onClick={() => navigate("/football")}
          >
            {t(language, "football")}
          </button>
        </div>

        <div className="match-grid">
          {matches.slice(0, 4).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section className="page">
        <div className="section-heading">
          <div>
            <span className="gold-label">LIVE</span>
            <h2>{t(language, "upcomingMatches")}</h2>
          </div>
        </div>

        <div className="match-grid">
          {matches.slice(1).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </>
  );
}

function Football() {
  const { language } = useContext(LanguageContext);

  return (
    <section className="page">
      <div className="page-title">
        <span className="gold-label">GOLDENBET</span>

        <h1>{t(language, "football")}</h1>

        <p>{t(language, "upcomingMatches")}</p>
      </div>

      <div className="match-grid">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}

function Live() {
  const { language } = useContext(LanguageContext);

  return (
    <section className="page">
      <div className="page-title">
        <span className="gold-label">LIVE</span>

        <h1>{t(language, "live")}</h1>

        <p>{t(language, "liveNow")}</p>
      </div>

      <div className="match-grid">
        {matches.slice(0, 3).map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}

function Leagues() {
  const { language } = useContext(LanguageContext);

  const leagueKeys = [
    "premierLeague",
    "laLiga",
    "serieA",
    "bundesliga",
    "ligue1",
  ];

  return (
    <section className="page">
      <div className="page-title">
        <span className="gold-label">GOLDENBET</span>

        <h1>{t(language, "leagues")}</h1>
      </div>

      <div className="league-grid">
        {leagueKeys.map((league) => (
          <div className="league-card" key={league}>
            <div className="league-icon">⚽</div>

            <h3>{t(language, league)}</h3>

            <p>{t(language, "football")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Search() {
  const { language } = useContext(LanguageContext);
  const [query, setQuery] = useState("");

  const filteredMatches = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) {
      return matches;
    }

    return matches.filter(
      (match) =>
        match.home.toLowerCase().includes(value) ||
        match.away.toLowerCase().includes(value) ||
        t(language, match.league)
          .toLowerCase()
          .includes(value)
    );
  }, [query, language]);

  return (
    <section className="page">
      <div className="page-title">
        <span className="gold-label">GOLDENBET</span>

        <h1>{t(language, "search")}</h1>
      </div>

      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t(language, "searchPlaceholder")}
      />

      <div className="match-grid">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <div className="panel empty-panel">
            <div className="empty-icon">🔎</div>

            <h3>{t(language, "noMatches")}</h3>
          </div>
        )}
      </div>
    </section>
  );
}

function Auth({ type }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const isLogin = type === "login";

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">G</div>

        <span className="gold-label">GOLDENBET</span>

        <h1>
          {t(
            language,
            isLogin ? "loginTitle" : "registerTitle"
          )}
        </h1>

        <p>
          {t(
            language,
            isLogin ? "loginText" : "registerText"
          )}
        </p>

        {!isLogin && (
          <input
            className="form-input"
            type="text"
            placeholder={t(language, "username")}
          />
        )}

        <input
          className="form-input"
          type="email"
          placeholder={t(language, "email")}
        />

        <input
          className="form-input"
          type="password"
          placeholder={t(language, "password")}
        />

        {!isLogin && (
          <input
            className="form-input"
            type="password"
            placeholder={t(language, "confirmPassword")}
          />
        )}

        <button
          className="gold-button full-button"
          onClick={() => navigate("/")}
        >
          {t(
            language,
            isLogin ? "submitLogin" : "submitRegister"
          )}
        </button>

        <button
          className="text-button"
          onClick={() =>
            navigate(isLogin ? "/register" : "/login")
          }
        >
          {t(
            language,
            isLogin ? "register" : "login"
          )}
        </button>
      </div>
    </section>
  );
}

function SimplePage({ titleKey, icon }) {
  const { language } = useContext(LanguageContext);

  return (
    <section className="page">
      <div className="page-title">
        <span className="gold-label">GOLDENBET</span>

        <h1>{t(language, titleKey)}</h1>
      </div>

      <div className="panel simple-panel">
        <div className="large-icon">{icon}</div>

        <h2>{t(language, titleKey)}</h2>

        <p>{t(language, "footerText")}</p>
      </div>
    </section>
  );
}

function Settings() {
  const { language, setLanguage } =
    useContext(LanguageContext);

  return (
    <section className="page">
      <div className="page-title">
        <span className="gold-label">GOLDENBET</span>

        <h1>{t(language, "settingsTitle")}</h1>
      </div>

      <div className="panel settings-panel">
        <h3>{t(language, "language")}</h3>

        <select
          className="language-large"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/football"
          element={<Football />}
        />

        <Route path="/live" element={<Live />} />

        <Route
          path="/leagues"
          element={<Leagues />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/login"
          element={<Auth type="login" />}
        />

        <Route
          path="/register"
          element={<Auth type="register" />}
        />

        <Route
          path="/profile"
          element={
            <SimplePage
              titleKey="profile"
              icon="👤"
            />
          }
        />

        <Route
          path="/balance"
          element={
            <SimplePage
              titleKey="balanceTitle"
              icon="💰"
            />
          }
        />

        <Route
          path="/deposit"
          element={
            <SimplePage
              titleKey="depositTitle"
              icon="💳"
            />
          }
        />

        <Route
          path="/withdraw"
          element={
            <SimplePage
              titleKey="withdrawTitle"
              icon="💸"
            />
          }
        />

        <Route
          path="/my-bets"
          element={
            <SimplePage
              titleKey="myBetsTitle"
              icon="🎟️"
            />
          }
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="*"
          element={<Home />}
        />
      </Routes>
    </Layout>
  );
}
