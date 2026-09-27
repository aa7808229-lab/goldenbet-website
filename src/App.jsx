import React, { useContext, useMemo, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { LanguageContext } from "./main";
import { languages, t } from "./translations";

const matches = [
  {
    id: 1,
    home: "Arsenal",
    away: "Chelsea",
    league: "Premier League",
    time: "18:30",
    odds: ["1.85", "3.60", "4.20"],
  },
  {
    id: 2,
    home: "Barcelona",
    away: "Real Madrid",
    league: "La Liga",
    time: "21:00",
    odds: ["2.10", "3.40", "3.10"],
  },
  {
    id: 3,
    home: "Inter",
    away: "AC Milan",
    league: "Serie A",
    time: "20:45",
    odds: ["1.75", "3.70", "4.80"],
  },
  {
    id: 4,
    home: "Bayern",
    away: "Dortmund",
    league: "Bundesliga",
    time: "19:30",
    odds: ["1.55", "4.20", "5.50"],
  },
  {
    id: 5,
    home: "PSG",
    away: "Lyon",
    league: "Ligue 1",
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
        <div className="brand" onClick={() => navigate("/")}>
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

        <p>{t(language, "allRights")}</p>
      </footer>
    </div>
  );
}

function MatchCard({ match }) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="match-card">
      <div className="match-top">
        <span>{match.league}</span>
        <span>🕐 {match.time}</span>
      </div>

      <div className="teams">
        <div>
          <div className="team-logo">
            {match.home.charAt(0)}
          </div>
          <strong>{match.home}</strong>
        </div>

        <span className="vs">{t(language, "vs")}</span>

        <div>
          <div className="team-logo">
            {match.away.charAt(0)}
          </div>
          <strong>{match.away}</strong>
        </div>
      </div>

      <div className="odds">
        <button>
          <span>1</span>
          <span>{match.odds[0]}</span>
        </button>

        <button>
          <span>X</span>
          <span>{match.odds[1]}</span>
        </button>

        <button>
          <span>2</span>
          <span>{match.odds[2]}</span>
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
          <span className="gold-label">GOLDENBET</span>

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
          <h2>{t(language, "popularMatches")}</h2>

          <button
            className="text-button"
            onClick={() => navigate("/football")}
          >
            {t(language, "football")} →
          </button>
        </div>

        <div className="match-grid">
          {matches.slice(0, 4).map((match) => (
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
        <h1>{t(language, "live")}</h1>
        <p>{t(language, "liveNow")}</p>
      </div>

      <div className="empty-panel panel">
        <div className="empty-icon">🔴</div>
        <h2>{t(language, "live")}</h2>
        <p>{t(language, "noMatches")}</p>
      </div>
    </section>
  );
}

function Leagues() {
  const { language } = useContext(LanguageContext);

  const leagues = [
    ["⚽", t(language, "premierLeague")],
    ["🇪🇸", t(language, "laLiga")],
    ["🇮🇹", t(language, "serieA")],
    ["🇩🇪", t(language, "bundesliga")],
    ["🇫🇷", t(language, "ligue1")],
  ];

  return (
    <section className="page">
      <div className="page-title">
        <h1>{t(language, "leagues")}</h1>
        <p>{t(language, "popularLeagues")}</p>
      </div>

      <div className="league-grid">
        {leagues.map(([icon, name]) => (
          <div className="league-card" key={name}>
            <div className="league-icon">{icon}</div>
            <h3>{name}</h3>
            <p>GoldenBet</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Search() {
  const { language } = useContext(LanguageContext);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) return matches;

    return matches.filter(
      (match) =>
        match.home.toLowerCase().includes(value) ||
        match.away.toLowerCase().includes(value) ||
        match.league.toLowerCase().includes(value)
    );
  }, [query]);

  return (
    <section className="page">
      <div className="page-title">
        <h1>{t(language, "search")}</h1>
      </div>

      <input
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t(language, "searchPlaceholder")}
      />

      <div className="match-grid">
        {filtered.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-panel panel">
          <div className="empty-icon">🔎</div>
          <p>{t(language, "noMatches")}</p>
        </div>
      )}
    </section>
  );
}

function Auth({ register = false }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (register) {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      localStorage.setItem(
        "goldenbet-user",
        JSON.stringify({
          username: form.username,
          email: form.email,
        })
      );

      navigate("/profile");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("goldenbet-user") || "null"
    );

    if (savedUser) {
      navigate("/profile");
    } else {
      alert("Please create an account first.");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">G</div>

        <h1>
          {t(
            language,
            register ? "registerTitle" : "loginTitle"
          )}
        </h1>

        <p>
          {t(
            language,
            register ? "registerText" : "loginText"
          )}
        </p>

        <form onSubmit={handleSubmit}>
          {register && (
            <input
              className="form-input"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder={t(language, "username")}
              required
            />
          )}

          <input
            className="form-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t(language, "email")}
            required
          />

          <input
            className="form-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={t(language, "password")}
            required
          />

          {register && (
            <input
              className="form-input"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder={t(language, "confirmPassword")}
              required
            />
          )}

          <button className="gold-button full-button" type="submit">
            {t(
              language,
              register ? "submitRegister" : "submitLogin"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function Profile() {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const savedUser = JSON.parse(
    localStorage.getItem("goldenbet-user") || "null"
  );

  if (!savedUser) {
    return (
      <section className="page">
        <div className="panel simple-panel">
          <div>
            <div className="large-icon">👤</div>
            <h2>{t(language, "login")}</h2>
            <button
              className="gold-button"
              onClick={() => navigate("/login")}
            >
              {t(language, "login")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-title">
        <h1>{t(language, "profile")}</h1>
      </div>

      <div className="panel">
        <h2>{savedUser.username}</h2>
        <p>{savedUser.email}</p>

        <br />

        <button
          className="gold-button"
          onClick={() => navigate("/balance")}
        >
          {t(language, "balance")}
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
        <h1>{t(language, titleKey)}</h1>
      </div>

      <div className="panel simple-panel">
        <div>
          <div className="large-icon">{icon}</div>
          <h2>{t(language, titleKey)}</h2>
          <p>GoldenBet</p>
        </div>
      </div>
    </section>
  );
}

function Settings() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <section className="page">
      <div className="page-title">
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

function App() {
  const location = useLocation();

  return (
    <Layout>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/football" element={<Football />} />
        <Route path="/live" element={<Live />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/balance"
          element={<SimplePage titleKey="balanceTitle" icon="💰" />}
        />

        <Route
          path="/deposit"
          element={<SimplePage titleKey="depositTitle" icon="💳" />}
        />

        <Route
          path="/withdraw"
          element={<SimplePage titleKey="withdrawTitle" icon="🏦" />}
        />

        <Route
          path="/my-bets"
          element={<SimplePage titleKey="myBetsTitle" icon="🎟️" />}
        />

        <Route path="/settings" element={<Settings />} />

        <Route
          path="*"
          element={<Home />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
