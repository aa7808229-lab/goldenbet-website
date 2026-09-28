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
          { key: "over05", label: "Over 0.5", name: "Over 0.5 Goals", odds: 1.2 },
          { key: "over15", label: "Over 1.5", name: "Over 1.5 Goals", odds: 1.5 },
          { key: "over25", label: "Over 2.5", name: "Over 2.5 Goals", odds: 1.8 },
          { key: "under25", label: "Under 2.5", name: "Under 2.5 Goals", odds: 1.9 },
          { key: "over35", label: "Over 3.5", name: "Over 3.5 Goals", odds: 2.5 },
        ],
      },
      {
        id: "btts",
        title: "Both Teams To Score",
        selections: [
          { key: "yes", label: "Yes", name: "Both Teams To Score - Yes", odds: 1.7 },
          { key: "no", label: "No", name: "Both Teams To Score - No", odds: 2.0 },
        ],
      },
      {
        id: "team-goals",
        title: "Team Goals",
        selections: [
          { key: "home-over15", label: "Over 1.5", name: "Home Team Over 1.5", odds: 1.8 },
          { key: "away-over15", label: "Over 1.5", name: "Away Team Over 1.5", odds: 2.0 },
          { key: "home-over25", label: "Over 2.5", name: "Home Team Over 2.5", odds: 2.5 },
          { key: "away-over25", label: "Over 2.5", name: "Away Team Over 2.5", odds: 2.8 },
        ],
      },
    ],
  },
];
