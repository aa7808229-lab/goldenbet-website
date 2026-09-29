import { Link } from "react-router-dom";

export default function GoldenBetHeader({
  bets = [],
}) {
  return (
    <>
      <header className="golden-top-header">
        <div className="golden-top-visual">

          <div className="golden-side-image golden-side-left">
            <img
              src="/golden-roulette.svg"
              alt="Golden Roulette"
            />
          </div>

          <Link
            to="/"
            className="golden-center-logo"
            aria-label="GoldenBet Home"
          >
            GOLDENBET
          </Link>

          <div className="golden-side-image golden-side-right">
            <img
              src="/golden-football.svg"
              alt="Golden Football"
            />
          </div>

        </div>
      </header>

      <nav
        className="golden-bottom-nav"
        aria-label="Main navigation"
      >

        <Link
          to="/sports"
          className="golden-bottom-item"
        >
          <span className="golden-bottom-icon">
            ⚽
          </span>

          <span>
            Sports
          </span>
        </Link>

        <Link
          to="/bet-slip"
          className="golden-bottom-item"
        >
          <span className="golden-bottom-icon">
            🎟️
          </span>

          <span>
            Bet Slip
          </span>

          {bets.length > 0 && (
            <b className="golden-bet-count">
              {bets.length}
            </b>
          )}
        </Link>

        <Link
          to="/deposit"
          className="golden-bottom-item"
        >
          <span className="golden-bottom-icon">
            💰
          </span>

          <span>
            Deposit
          </span>
        </Link>

        <Link
          to="/casino"
          className="golden-bottom-item"
        >
          <span className="golden-bottom-icon">
            🎰
          </span>

          <span>
            Casino
          </span>
        </Link>

      </nav>
    </>
  );
}
