import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GoldenBet Backend is running!",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`GoldenBet Backend running on port ${PORT}`);
});
