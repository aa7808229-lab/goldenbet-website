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
          { key: "under05", label: "Under 0.5", name: "Under 0.5 Goals", odds: 4.5 },
          { key: "over15", label: "Over 1.5", name: "Over 1.5 Goals", odds: 1.5 },
          { key: "under15", label: "Under 1.5", name: "Under 1.5 Goals", odds: 2.6 },
          { key: "over25", label: "Over 2.5", name: "Over 2.5 Goals", odds: 1.8 },
          { key: "under25", label: "Under 2.5", name: "Under 2.5 Goals", odds: 1.9 },
          { key: "over35", label: "Over 3.5", name: "Over 3.5 Goals", odds: 2.5 },
          { key: "under35", label: "Under 3.5", name: "Under 3.5 Goals", odds: 1.5 },
        ],
      },
      {
        id: "btts",
        title: "Both Teams To Score",
        selections: [
          { key: "bttsYes", label: "Yes", name: "Both Teams To Score - Yes", odds: 1.7 },
          { key: "bttsNo", label: "No", name: "Both Teams To Score - No", odds: 2.0 },
        ],
      },
      {
        id: "team-goals",
        title: "Team Goals",
        selections: [
          { key: "home-over05", label: "Over 0.5", name: "Home Team Over 0.5", odds: 1.25 },
          { key: "home-over15", label: "Over 1.5", name: "Home Team Over 1.5", odds: 1.8 },
          { key: "home-over25", label: "Over 2.5", name: "Home Team Over 2.5", odds: 2.5 },
          { key: "away-over05", label: "Over 0.5", name: "Away Team Over 0.5", odds: 1.3 },
          { key: "away-over15", label: "Over 1.5", name: "Away Team Over 1.5", odds: 2.0 },
          { key: "away-over25", label: "Over 2.5", name: "Away Team Over 2.5", odds: 2.8 },
        ],
      },
      {
        id: "half-time",
        title: "Half Time Result",
        selections: [
          { key: "htHome", label: "1", name: "Half Time Home", odds: 2.1 },
          { key: "htDraw", label: "X", name: "Half Time Draw", odds: 2.2 },
          { key: "htAway", label: "2", name: "Half Time Away", odds: 3.0 },
        ],
      },
    ],
  },

  {
    id: "corners",
    title: "Corners",
    markets: [
      {
        id: "total-corners",
        title: "Total Corners",
        selections: [
          { key: "cornersOver75", label: "Over 7.5", name: "Over 7.5 Corners", odds: 1.7 },
          { key: "cornersOver85", label: "Over 8.5", name: "Over 8.5 Corners", odds: 1.9 },
          { key: "cornersOver95", label: "Over 9.5", name: "Over 9.5 Corners", odds: 2.1 },
          { key: "cornersUnder95", label: "Under 9.5", name: "Under 9.5 Corners", odds: 1.7 },
        ],
      },
    ],
  },

  {
    id: "cards",
    title: "Cards",
    markets: [
      {
        id: "total-cards",
        title: "Total Cards",
        selections: [
          { key: "cardsOver25", label: "Over 2.5", name: "Over 2.5 Cards", odds: 1.65 },
          { key: "cardsOver35", label: "Over 3.5", name: "Over 3.5 Cards", odds: 1.85 },
          { key: "cardsOver45", label: "Over 4.5", name: "Over 4.5 Cards", odds: 2.1 },
          { key: "cardsUnder45", label: "Under 4.5", name: "Under 4.5 Cards", odds: 1.7 },
        ],
      },
    ],
  },

  {
    id: "goals",
    title: "Goals",
    markets: [
      {
        id: "first-goal",
        title: "First Goal",
        selections: [
          { key: "firstHome", label: "Home", name: "Home To Score First", odds: 1.75 },
          { key: "firstAway", label: "Away", name: "Away To Score First", odds: 2.2 },
          { key: "noGoal", label: "No Goal", name: "No Goal", odds: 8.0 },
        ],
      },
      {
        id: "clean-sheet",
        title: "Clean Sheet",
        selections: [
          { key: "homeClean", label: "Home", name: "Home Clean Sheet", odds: 2.3 },
          { key: "awayClean", label: "Away", name: "Away Clean Sheet", odds: 3.0 },
        ],
      },
    ],
  },
];
