import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5000);

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

const SPORTS_API_URL =
  process.env.SPORTS_API_URL || "https://v3.football.api-sports.io";

const SPORTS_API_KEY = process.env.SPORTS_API_KEY || "";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "";

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      )
    : null;

app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "GoldenBet API",
    status: "running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    server: "online",
    sportsApi: Boolean(SPORTS_API_KEY),
    supabase: Boolean(supabase),
  });
});

app.get("/api/sports/fixtures", async (req, res) => {
  if (!SPORTS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SPORTS_API_KEY is missing.",
    });
  }

  try {
    const params = new URLSearchParams();

    Object.entries(req.query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.append(key, String(value));
      }
    });

    const url = `${SPORTS_API_URL}/fixtures${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": SPORTS_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Sports API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Fixtures error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load football fixtures.",
    });
  }
});

app.get("/api/sports/live", async (req, res) => {
  if (!SPORTS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SPORTS_API_KEY is missing.",
    });
  }

  try {
    const url = `${SPORTS_API_URL}/fixtures?live=all`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": SPORTS_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Sports API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Live fixtures error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load live matches.",
    });
  }
});

app.get("/api/sports/leagues", async (req, res) => {
  if (!SPORTS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SPORTS_API_KEY is missing.",
    });
  }

  try {
    const params = new URLSearchParams();

    Object.entries(req.query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.append(key, String(value));
      }
    });

    const url = `${SPORTS_API_URL}/leagues${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": SPORTS_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Sports API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Leagues error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load leagues.",
    });
  }
});

app.get("/api/sports/teams", async (req, res) => {
  if (!SPORTS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SPORTS_API_KEY is missing.",
    });
  }

  try {
    const params = new URLSearchParams();

    Object.entries(req.query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.append(key, String(value));
      }
    });

    const url = `${SPORTS_API_URL}/teams${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": SPORTS_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Sports API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Teams error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load teams.",
    });
  }
});

app.get("/api/sports/standings", async (req, res) => {
  if (!SPORTS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SPORTS_API_KEY is missing.",
    });
  }

  try {
    const params = new URLSearchParams();

    Object.entries(req.query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.append(key, String(value));
      }
    });

    const url = `${SPORTS_API_URL}/standings${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": SPORTS_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Sports API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Standings error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load standings.",
    });
  }
});

app.get("/api/sports/odds", async (req, res) => {
  if (!SPORTS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SPORTS_API_KEY is missing.",
    });
  }

  try {
    const params = new URLSearchParams();

    Object.entries(req.query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.append(key, String(value));
      }
    });

    const url = `${SPORTS_API_URL}/odds${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": SPORTS_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Sports API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Odds error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load odds.",
    });
  }
});

app.get("/api/sports/events", async (req, res) => {
  if (!SPORTS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SPORTS_API_KEY is missing.",
    });
  }

  try {
    const params = new URLSearchParams();

    Object.entries(req.query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.append(key, String(value));
      }
    });

    const url = `${SPORTS_API_URL}/fixtures/events${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": SPORTS_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Sports API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Events error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load match events.",
    });
  }
});

app.get("/api/sports/statistics", async (req, res) => {
  if (!SPORTS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SPORTS_API_KEY is missing.",
    });
  }

  try {
    const params = new URLSearchParams();

    Object.entries(req.query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.append(key, String(value));
      }
    });

    const url = `${SPORTS_API_URL}/fixtures/statistics${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": SPORTS_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Sports API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Statistics error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load match statistics.",
    });
  }
});

app.get("/api/sports/head-to-head", async (req, res) => {
  if (!SPORTS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SPORTS_API_KEY is missing.",
    });
  }

  try {
    const params = new URLSearchParams();

    Object.entries(req.query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.append(key, String(value));
      }
    });

    const url = `${SPORTS_API_URL}/fixtures/headtohead${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": SPORTS_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Sports API request failed.",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Head-to-head error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load head-to-head data.",
    });
  }
});

app.get("/api/profile/:userId", async (req, res) => {
  if (!supabase) {
    return res.status(500).json({
      success: false,
      error: "Supabase server configuration is missing.",
    });
  }

  const userId = String(req.params.userId || "").trim();

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: "User ID is required.",
    });
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Profile error:", error);

      return res.status(500).json({
        success: false,
        error: "Unable to load profile.",
      });
    }

    return res.json({
      success: true,
      profile: data,
    });
  } catch (error) {
    console.error("Profile request error:", error);

    return res.status(500).json({
      success: false,
      error: "Server error.",
    });
  }
});

app.get("/api/bets/:userId", async (req, res) => {
  if (!supabase) {
    return res.status(500).json({
      success: false,
      error: "Supabase server configuration is missing.",
    });
  }

  const userId = String(req.params.userId || "").trim();

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: "User ID is required.",
    });
  }

  try {
    const { data, error } = await supabase
      .from("bets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Bets error:", error);

      return res.status(500).json({
        success: false,
        error: "Unable to load bets.",
      });
    }

    return res.json({
      success: true,
      bets: data || [],
    });
  } catch (error) {
    console.error("Bets request error:", error);

    return res.status(500).json({
      success: false,
      error: "Server error.",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "API route not found.",
    path: req.path,
  });
});

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    error: "Internal server error.",
  });
});

app.listen(PORT, () => {
  console.log(`GoldenBet API running on port ${PORT}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
  console.log(`Sports API: ${SPORTS_API_KEY ? "configured" : "missing"}`);
  console.log(`Supabase: ${supabase ? "configured" : "missing"}`);
});
