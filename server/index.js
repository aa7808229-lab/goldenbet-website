import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env:
// server/server/.env
dotenv.config({
  path: path.join(__dirname, "server", ".env"),
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ======================================================
// API SPORTS CONFIG
// ======================================================

const API_KEY =
  process.env.SPORTS_API_KEY ||
  process.env.FOOTBALL_API_KEY ||
  "";

const SPORTS_APIS = {
  football: {
    name: "Football",
    url: "https://v3.football.api-sports.io",
  },

  basketball: {
    name: "Basketball",
    url: "https://v1.basketball.api-sports.io",
  },

  nba: {
    name: "NBA",
    url: "https://v2.nba.api-sports.io",
  },

  nfl: {
    name: "NFL",
    url: "https://v1.american-football.api-sports.io",
  },

  baseball: {
    name: "Baseball",
    url: "https://v1.baseball.api-sports.io",
  },

  hockey: {
    name: "Hockey",
    url: "https://v1.hockey.api-sports.io",
  },

  volleyball: {
    name: "Volleyball",
    url: "https://v1.volleyball.api-sports.io",
  },

  handball: {
    name: "Handball",
    url: "https://v1.handball.api-sports.io",
  },

  rugby: {
    name: "Rugby",
    url: "https://v1.rugby.api-sports.io",
  },

  mma: {
    name: "MMA",
    url: "https://v1.mma.api-sports.io",
  },

  formula1: {
    name: "Formula 1",
    url: "https://v1.formula-1.api-sports.io",
  },

  afl: {
    name: "AFL",
    url: "https://v1.afl.api-sports.io",
  },
};

// ======================================================
// API REQUEST
// ======================================================

async function apiRequest(baseUrl, endpoint) {
  if (!API_KEY) {
    throw new Error("SPORTS_API_KEY / FOOTBALL_API_KEY is missing");
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: {
      "x-apisports-key": API_KEY,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `API error ${response.status}: ${response.statusText}`
    );
  }

  return data;
}

// ======================================================
// ROOT
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "GoldenBet API",
    version: "4.0.0",
    status: "online",
  });
});

// ======================================================
// HEALTH
// ======================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "GoldenBet API",
    status: "online",
    apiKeyConfigured: Boolean(API_KEY),
    time: new Date().toISOString(),
    sports: Object.keys(SPORTS_APIS),
  });
});

// ======================================================
// SPORTS LIST
// ======================================================

app.get("/api/sports", (req, res) => {
  res.json({
    success: true,
    sports: Object.entries(SPORTS_APIS).map(
      ([id, sport]) => ({
        id,
        name: sport.name,
        url: sport.url,
      })
    ),
  });
});

// ======================================================
// GENERIC SPORT ENDPOINT
//
// Example:
// /api/sports/football?path=/fixtures?live=all
// ======================================================

app.get("/api/sports/:sport", async (req, res) => {
  try {
    const { sport } = req.params;
    const { path: apiPath } = req.query;

    const config = SPORTS_APIS[sport];

    if (!config) {
      return res.status(404).json({
        success: false,
        error: `Sport "${sport}" is not configured.`,
        availableSports: Object.keys(SPORTS_APIS),
      });
    }

    if (!apiPath) {
      return res.status(400).json({
        success: false,
        error: "Missing path query.",
        example:
          "/api/sports/football?path=/fixtures?live=all",
      });
    }

    if (!String(apiPath).startsWith("/")) {
      return res.status(400).json({
        success: false,
        error: "API path must start with /",
      });
    }

    const data = await apiRequest(
      config.url,
      apiPath
    );

    res.json({
      success: true,
      sport,
      sportName: config.name,
      data,
    });
  } catch (error) {
    console.error(
      `Sport API error [${req.params.sport}]:`,
      error
    );

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// FOOTBALL
// ======================================================

// Live football
app.get("/api/football/live", async (req, res) => {
  try {
    const data = await apiRequest(
      SPORTS_APIS.football.url,
      "/fixtures?live=all"
    );

    res.json({
      success: true,
      sport: "football",
      count: data.response?.length || 0,
      matches: data.response || [],
    });
  } catch (error) {
    console.error("Football live error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Today's football
app.get("/api/football/today", async (req, res) => {
  try {
    const today = new Date()
      .toISOString()
      .slice(0, 10);

    const data = await apiRequest(
      SPORTS_APIS.football.url,
      `/fixtures?date=${today}`
    );

    res.json({
      success: true,
      sport: "football",
      date: today,
      count: data.response?.length || 0,
      matches: data.response || [],
    });
  } catch (error) {
    console.error("Football today error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Football fixture
app.get(
  "/api/football/match/:fixtureId",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await apiRequest(
        SPORTS_APIS.football.url,
        `/fixtures?id=${fixtureId}`
      );

      res.json({
        success: true,
        match: data.response?.[0] || null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Football statistics
app.get(
  "/api/football/match/:fixtureId/statistics",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await apiRequest(
        SPORTS_APIS.football.url,
        `/fixtures/statistics?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        statistics: data.response || [],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Football events
app.get(
  "/api/football/match/:fixtureId/events",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await apiRequest(
        SPORTS_APIS.football.url,
        `/fixtures/events?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        events: data.response || [],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Football lineups
app.get(
  "/api/football/match/:fixtureId/lineups",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await apiRequest(
        SPORTS_APIS.football.url,
        `/fixtures/lineups?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        lineups: data.response || [],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Football players
app.get(
  "/api/football/match/:fixtureId/players",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await apiRequest(
        SPORTS_APIS.football.url,
        `/fixtures/players?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        players: data.response || [],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Football pre-match odds
app.get(
  "/api/football/match/:fixtureId/odds",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await apiRequest(
        SPORTS_APIS.football.url,
        `/odds?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        odds: data.response || [],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Football live odds
app.get(
  "/api/football/match/:fixtureId/live-odds",
  async (req, res) => {
    try {
      const { fixtureId } = req.params;

      const data = await apiRequest(
        SPORTS_APIS.football.url,
        `/odds/live?fixture=${fixtureId}`
      );

      res.json({
        success: true,
        odds: data.response || [],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Football leagues
app.get("/api/football/leagues", async (req, res) => {
  try {
    const data = await apiRequest(
      SPORTS_APIS.football.url,
      "/leagues"
    );

    res.json({
      success: true,
      leagues: data.response || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// LIVE ALL SPORTS
// ======================================================

app.get("/api/live/:sport", async (req, res) => {
  try {
    const { sport } = req.params;

    const config = SPORTS_APIS[sport];

    if (!config) {
      return res.status(404).json({
        success: false,
        error: `Sport "${sport}" is not configured.`,
      });
    }

    let endpoint;

    switch (sport) {
      case "football":
        endpoint = "/fixtures?live=all";
        break;

      default:
        endpoint = req.query.path;

        if (!endpoint) {
          return res.status(400).json({
            success: false,
            error:
              "This sport requires an API path.",
            example:
              `/api/live/${sport}?path=/games`,
          });
        }
    }

    const data = await apiRequest(
      config.url,
      endpoint
    );

    res.json({
      success: true,
      sport,
      sportName: config.name,
      data,
    });
  } catch (error) {
    console.error(
      `Live ${req.params.sport} error:`,
      error
    );

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {
  console.log(
    `GoldenBet API running on port ${PORT}`
  );

  console.log(
    "Configured sports:",
    Object.keys(SPORTS_APIS).join(", ")
  );

  console.log(
    "API key:",
    API_KEY ? "CONFIGURED" : "MISSING"
  );
});
