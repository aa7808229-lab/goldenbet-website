import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
    version: "1.0.0",
    status: "online",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`GoldenBet API running on port ${PORT}`);
});
