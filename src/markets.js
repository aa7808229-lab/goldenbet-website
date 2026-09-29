export const marketGroups = [
  {
    id: "main",
    title: "Main Markets",
    markets: [
      {
        id: "1x2",
        title: "1X2",
        selections: [
          { key: "home", label: "1", name: "Home", odds: 1.5 },
          { key: "draw", label: "X", name: "Draw", odds: 3.5 },
          { key: "away", label: "2", name: "Away", odds: 2.2 },
        ],
      },
      {
        id: "double-chance",
        title: "Double Chance",
        selections: [
          { key: "1x", label: "1X", name: "Home or Draw", odds: 1.25 },
          { key: "12", label: "12", name: "Home or Away", odds: 1.3 },
          { key: "x2", label: "X2", name: "Draw or Away", odds: 1.35 },
        ],
      },
      {
        id: "over-under",
        title: "Over / Under",
        selections: [
          { key: "over
