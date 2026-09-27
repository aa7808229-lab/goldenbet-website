import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { translations } from './translations';
import Navigation from './components/Navigation';
import LanguageSwitcher from './components/LanguageSwitcher';
import CountryCurrencySwitcher from './components/CountryCurrencySwitcher';
import BettingSlip from './components/BettingSlip';
import Home from './pages/Home';
import Football from './pages/Football';
import LiveMatches from './pages/LiveMatches';
import Leagues from './pages/Leagues';
import MatchDetails from './pages/MatchDetails';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Balance from './pages/Balance';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import MyBets from './pages/MyBets';
import Settings from './pages/Settings';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('UK');
  const [currency, setCurrency] = useState('GBP');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bettingSlip, setBettingSlip] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isRTL = ['ku', 'ar', 'fa'].includes(language);
  const t = translations[language] || translations.en;

  const addToBettingSlip = (match, oddType, oddValue) => {
    const selection = {
      id: `${match.id}-${oddType}`,
      match,
      oddType,
      oddValue,
      timestamp: new Date().getTime(),
    };

    setBettingSlip((prev) => {
      const exists = prev.find((s) => s.id === selection.id);
      if (exists) return prev;
      return [...prev, selection];
    });
  };

  const removeFromBettingSlip = (selectionId) => {
    setBettingSlip((prev) => prev.filter((s) => s.id !== selectionId));
  };

  const clearBettingSlip = () => {
    setBettingSlip([]);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return (
    <div className={`app ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <Link to="/" className="logo">
              <span className="logo-text">GoldenBet</span>
              <span className="logo-accent">⚡</span>
            </Link>
          </div>

          <div className="header-center">
            <Link to="/search" className="search-link">
              <span className="search-icon">🔍</span>
              <span>{t.search}</span>
            </Link>
          </div>

          <div className="header-right">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
            <CountryCurrencySwitcher
              country={country}
              setCountry={setCountry}
              currency={currency}
              setCurrency={setCurrency}
              t={t}
            />
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn-small btn-secondary">
                  {t.login}
                </Link>
                <Link to="/register" className="btn-small btn-primary">
                  {t.register}
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="btn-small btn-secondary">
                  {t.profile}
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="btn-small btn-secondary"
                >
                  {t.logout}
                </button>
              </>
            )}
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className="main-layout">
        <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          <Navigation t={t} />
          <div className="sidebar-close-btn">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="close-btn"
            >
              ✕
            </button>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home t={t} addToBettingSlip={addToBettingSlip} />} />
            <Route path="/football" element={<Football t={t} addToBettingSlip={addToBettingSlip} />} />
            <Route path="/live" element={<LiveMatches t={t} addToBettingSlip={addToBettingSlip} />} />
            <Route path="/leagues" element={<Leagues t={t} addToBettingSlip={addToBettingSlip} />} />
            <Route path="/match/:id" element={<MatchDetails t={t} addToBettingSlip={addToBettingSlip} />} />
            <Route path="/search" element={<Search t={t} addToBettingSlip={addToBettingSlip} />} />
            <Route path="/login" element={<Login t={t} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register t={t} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/profile" element={<Profile t={t} isLoggedIn={isLoggedIn} />} />
            <Route path="/balance" element={<Balance t={t} isLoggedIn={isLoggedIn} currency={currency} />} />
            <Route path="/deposit" element={<Deposit t={t} isLoggedIn={isLoggedIn} currency={currency} />} />
            <Route path="/withdraw" element={<Withdraw t={t} isLoggedIn={isLoggedIn} currency={currency} />} />
            <Route path="/my-bets" element={<MyBets t={t} isLoggedIn={isLoggedIn} currency={currency} />} />
            <Route path="/settings" element={<Settings t={t} isLoggedIn={isLoggedIn} language={language} setLanguage={setLanguage} />} />
          </Routes>
        </main>

        <aside className="betting-slip-sidebar">
          <BettingSlip
            selections={bettingSlip}
            onRemove={removeFromBettingSlip}
            onClear={clearBettingSlip}
            t={t}
            currency={currency}
          />
        </aside>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{t.aboutUs}</h4>
            <p>GoldenBet - Premium Sports Betting Platform</p>
          </div>
          <div className="footer-section">
            <h4>{t.contact}</h4>
            <p>Email: support@goldenbet.com</p>
          </div>
          <div className="footer-section">
            <h4>{t.legal}</h4>
            <p>© 2024 GoldenBet. {t.allRightsReserved}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
