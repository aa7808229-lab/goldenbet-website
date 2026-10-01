import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env is located at: server/server/.env
dotenv.config({
  path: path.join(__dirname, "server", ".env"),
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ======================================================
// API CONFIG
// ======================================================

const FOOTBALL_API_URL = "https://v3.football.api-sports.io";

// API-Sports uses different base URLs for different sports.
// The same API key can only be used for APIs your account
// actually has access to.
const SPORTS_APIS = {
  football: "https://v3.football.api-sports.io",
  basketball: "https://v1.basketball.api-sports.io",
  tennis: "https://v1.tennis.api-sports.io",
  volleyball: "https://v1.volleyball.api-sports.io",
  hockey: "https://v1.hockey.api-sports.io",
  baseball: "https://v1.baseball.api-sports.io",
  handball: "https://v1.handball.api-sports.io",
  rugby: "https://v1.rugby.api-sports.io",
  formula1: "https://v1.formula-1.api-sports.io",
  mma: "https://v1.mma.api-sports.io",
  golf: "https://v1.golf.api-sports.io",
};

// ======================================================
// HELPERS
// ======================================================

function apiHeaders(apiKey) {
  return {
    "x-apisports-key": apiKey,
  };
}

async function apiRequest(baseUrl, endpoint, apiKey) {
  if (!apiKey) {
    throw new Error("Sports API key is missing");
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: apiHeaders(apiKey),
  });

  if (!response.ok) {
    throw new Error(
      `Sports API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function footballRequest(endpoint) {
  return apiRequest(
    FOOTBALL_API_URL,
    endpoint,
    process.env.FOOTBALL_API_KEY || process.env.SPORTS_API_KEY
  );
}

async function sportsRequest(sport, endpoint) {
  const baseUrl = SPORTS_APIS[sport];

  if (!baseUrl) {
    throw new Error(`Sport "${sport}" is not configured`);
  }

  return apiRequest(
    baseUrl,
    endpoint,
    process.env.SPORTS_API_KEY
  );
}

// ======================================================
// HEALTH
// ======================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "GoldenBet API",
    status: "online",
    time: new Date().toISOString(),
    sports: Object.keys(SPORTS_APIS),
  });
});

app.get("/api", (req, res) => {
  res.json({
    name: "GoldenBet API",
    version: "3.0.0",
    status: "online",
    football: Boolean(
      process.env.FOOTBALL_API_KEY || process.env.SPORTS_API_KEY
    ),
    sports: Boolean(process.env.SPORTS_API_KEY),
    availableSports: Object.keys(SPORTS_APIS),
  });
});

// ======================================================
// FOOTBALL
// ======================================================

// LIVE FOOTBALL
app.get("/api/football/live", async (req, res) => {
  try {
    const data = await footballRequest("/fixtures?live=all");

    res.json({
      success: true,
      count: data.response?.length || 0,
      matches: data.response || [],
    });
  } catch (error) {
    console.error("Live football error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// TODAY FOOTBALL
app.get("/api/football/today", async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const data = await footballRequest(
      `/fixtures?date=${today}`
    );

    res.json({
      success: true,
      date: today,
      count: data.response?.length || 0,
      matches: data.response || [],
    });
  } catch (error) {
    console.error("Today's football error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// FOOTBALL MATCH
app.get("/api/football/match/:fixtureId", async (req, res) => {
  try {
    const { fixtureId } = req.params;

    const data = await footballRequest(
      `/fixtures?id=${fixtureId}`
    );

    res.json({
      success: true,
      match: data.response?.[0] || null,
    });
  } catch (error) {
    console.error("Match details error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// FOOTBALL STATISTICS
app.get(
  "/api/football/match/:fixtureId/statistics",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await footballRequest(
        `/fixtures/statistics?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        statistics: data.response || [],
      });
    } catch (error) {
      console.error("Statistics error:", error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// FOOTBALL EVENTS
app.get(
  "/api/football/match/:fixtureId/events",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await footballRequest(
        `/fixtures/events?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        events: data.response || [],
      });
    } catch (error) {
      console.error("Events error:", error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// FOOTBALL PRE-MATCH ODDS
app.get(
  "/api/football/match/:fixtureId/odds",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await footballRequest(
        `/odds?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        odds: data.response || [],
      });
    } catch (error) {
      console.error("Odds error:", error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// FOOTBALL LIVE ODDS
app.get(
  "/api/football/match/:fixtureId/live-odds",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await footballRequest(
        `/odds/live?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        odds: data.response || [],
      });
    } catch (error) {
      console.error("Live odds error:", error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// FOOTBALL LEAGUES
app.get("/api/football/leagues", async (req, res) => {
  try {
    const data = await footballRequest("/leagues");

    res.json({
      success: true,
      leagues: data.response || [],
    });
  } catch (error) {
    console.error("Leagues error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// OTHER SPORTS
// ======================================================
//
// Generic proxy.
//
// Example:
// /api/sports/basketball?path=/games?date=2026-10-01
//
// The frontend can use this while we build each sport's
// dedicated UI and market mapping.
//

app.get("/api/sports/:sport", async (req, res) => {
  try {
    const { sport } = req.params;

    if (sport === "football") {
      return res.status(400).json({
        success: false,
        error: "Use the football endpoints for football.",
      });
    }

    if (!SPORTS_APIS[sport]) {
      return res.status(404).json({
        success: false,
        error: `Sport "${sport}" is not supported yet.`,
        availableSports: Object.keys(SPORTS_APIS),
      });
    }

    const requestedPath = req.query.path;

    if (!requestedPath) {
      return res.status(400).json({
        success: false,
        error: "Missing path query.",
        example:
          `/api/sports/${sport}?path=/games`,
      });
    }

    if (!requestedPath.startsWith("/")) {
      return res.status(400).json({
        success: false,
        error: "The API path must start with /",
      });
    }

    const data = await sportsRequest(
      sport,
      requestedPath
    );

    res.json({
      success: true,
      sport,
      data,
    });
  } catch (error) {
    console.error("Sports API error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// AVAILABLE SPORTS
// ======================================================

app.get("/api/sports", (req, res) => {
  res.json({
    success: true,
    sports: Object.keys(SPORTS_APIS).map((sport) => ({
      id: sport,
      name:
        sport.charAt(0).toUpperCase() +
        sport.slice(1),
    })),
  });
});

// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {
  console.log(
    `GoldenBet API running on port ${PORT}`
  );

  console.log(
    "Available sports:",
    Object.keys(SPORTS_APIS).join(", ")
  );
});
