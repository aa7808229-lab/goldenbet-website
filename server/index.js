import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const FOOTBALL_API_URL = "https://v3.football.api-sports.io";

const footballHeaders = {
  "x-apisports-key": process.env.FOOTBALL_API_KEY,
};

// =========================
// HEALTH
// =========================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "GoldenBet API",
    status: "online",
    time: new Date().toISOString(),
  });
});

app.get("/api", (req, res) => {
  res.json({
    name: "GoldenBet API",
    version: "2.0.0",
    status: "online",
    football: "enabled",
  });
});

// =========================
// FOOTBALL API HELPER
// =========================

async function footballRequest(endpoint) {
  if (!process.env.FOOTBALL_API_KEY) {
    throw new Error("FOOTBALL_API_KEY is missing");
  }

  const response = await fetch(`${FOOTBALL_API_URL}${endpoint}`, {
    method: "GET",
    headers: footballHeaders,
  });

  if (!response.ok) {
    throw new Error(
      `Football API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// =========================
// LIVE FOOTBALL
// =========================

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

// =========================
// TODAY'S FOOTBALL
// =========================

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

// =========================
// MATCH DETAILS
// =========================

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

// =========================
// MATCH STATISTICS
// =========================

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

// =========================
// MATCH EVENTS
// =========================

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

// =========================
// PRE-MATCH ODDS
// =========================

app.get("/api/football/match/:fixtureId/odds", async (req, res) => {
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
});

// =========================
// LIVE ODDS
// =========================

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

// =========================
// FOOTBALL LEAGUES
// =========================

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

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(`GoldenBet API running on port ${PORT}`);
});
