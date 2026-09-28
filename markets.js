export const marketGroups = [
  {
    id: "main",
    title: "Main Markets",
    markets: [
      {
        id: "1x2",
        title: "1X2",
        selections: [
          { key: "home", label: "1", name: "Home", odds: "1.85" },
          { key: "draw", label: "X", name: "Draw", odds: "3.70" },
          { key: "away", label: "2", name: "Away", odds: "3.90" },
        ],
      },
      {
        id: "double-chance",
        title: "Double Chance",
        selections: [
          { key: "1x", label: "1X", name: "Home or Draw", odds: "1.25" },
          { key: "x2", label: "X2", name: "Draw or Away", odds: "1.55" },
          { key: "12", label: "12", name: "Home or Away", odds: "1.30" },
        ],
      },
      {
        id: "draw-no-bet",
        title: "Draw No Bet",
        selections: [
          { key: "dnb-home", label: "1", name: "Home", odds: "1.45" },
          { key: "dnb-away", label: "2", name: "Away", odds: "2.35" },
        ],
      },
    ],
  },

  {
    id: "goals",
    title: "Goals",
    markets: [
      {
        id: "over-under-05",
        title: "Goals 0.5",
        selections: [
          { key: "over05", label: "Over 0.5", name: "Over 0.5", odds: "1.10" },
          { key: "under05", label: "Under 0.5", name: "Under 0.5", odds: "8.00" },
        ],
      },
      {
        id: "over-under-15",
        title: "Goals 1.5",
        selections: [
          { key: "over15", label: "Over 1.5", name: "Over 1.5", odds: "1.35" },
          { key: "under15", label: "Under 1.5", name: "Under 1.5", odds: "3.20" },
        ],
      },
      {
        id: "over-under-25",
        title: "Goals 2.5",
        selections: [
          { key: "over25", label: "Over 2.5", name: "Over 2.5", odds: "1.75" },
          { key: "under25", label: "Under 2.5", name: "Under 2.5", odds: "1.95" },
        ],
      },
      {
        id: "over-under-35",
        title: "Goals 3.5",
        selections: [
          { key: "over35", label: "Over 3.5", name: "Over 3.5", odds: "2.50" },
          { key: "under35", label: "Under 3.5", name: "Under 3.5", odds: "1.45" },
        ],
      },
      {
        id: "over-under-45",
        title: "Goals 4.5",
        selections: [
          { key: "over45", label: "Over 4.5", name: "Over 4.5", odds: "4.20" },
          { key: "under45", label: "Under 4.5", name: "Under 4.5", odds: "1.20" },
        ],
      },
    ],
  },

  {
    id: "btts",
    title: "Both Teams To Score",
    markets: [
      {
        id: "btts",
        title: "BTTS",
        selections: [
          { key: "btts-yes", label: "Yes", name: "Both Teams To Score - Yes", odds: "1.60" },
          { key: "btts-no", label: "No", name: "Both Teams To Score - No", odds: "2.10" },
        ],
      },
    ],
  },

  {
    id: "team-goals",
    title: "Team Goals",
    markets: [
      {
        id: "home-goals-05",
        title: "Home Team Goals 0.5",
        selections: [
          { key: "home-over05", label: "Over 0.5", name: "Home Over 0.5", odds: "1.20" },
          { key: "home-under05", label: "Under 0.5", name: "Home Under 0.5", odds: "4.50" },
        ],
      },
      {
        id: "home-goals-15",
        title: "Home Team Goals 1.5",
        selections: [
          { key: "home-over15", label: "Over 1.5", name: "Home Over 1.5", odds: "1.70" },
          { key: "home-under15", label: "Under 1.5", name: "Home Under 1.5", odds: "2.00" },
        ],
      },
      {
        id: "away-goals-05",
        title: "Away Team Goals 0.5",
        selections: [
          { key: "away-over05", label: "Over 0.5", name: "Away Over 0.5", odds: "1.35" },
          { key: "away-under05", label: "Under 0.5", name: "Away Under 0.5", odds: "3.80" },
        ],
      },
      {
        id: "away-goals-15",
        title: "Away Team Goals 1.5",
        selections: [
          { key: "away-over15", label: "Over 1.5", name: "Away Over 1.5", odds: "2.20" },
          { key: "away-under15", label: "Under 1.5", name: "Away Under 1.5", odds: "1.60" },
        ],
      },
    ],
  },

  {
    id: "corners",
    title: "Corners",
    markets: [
      {
        id: "corners-65",
        title: "Total Corners 6.5",
        selections: [
          { key: "corners-over65", label: "Over 6.5", name: "Over 6.5 Corners", odds: "1.40" },
          { key: "corners-under65", label: "Under 6.5", name: "Under 6.5 Corners", odds: "2.70" },
        ],
      },
      {
        id: "corners-75",
        title: "Total Corners 7.5",
        selections: [
          { key: "corners-over75", label: "Over 7.5", name: "Over 7.5 Corners", odds: "1.55" },
          { key: "corners-under75", label: "Under 7.5", name: "Under 7.5 Corners", odds: "2.35" },
        ],
      },
      {
        id: "corners-85",
        title: "Total Corners 8.5",
        selections: [
          { key: "corners-over85", label: "Over 8.5", name: "Over 8.5 Corners", odds: "1.80" },
          { key: "corners-under85", label: "Under 8.5", name: "Under 8.5 Corners", odds: "1.90" },
        ],
      },
      {
        id: "corners-95",
        title: "Total Corners 9.5",
        selections: [
          { key: "corners-over95", label: "Over 9.5", name: "Over 9.5 Corners", odds: "2.10" },
          { key: "corners-under95", label: "Under 9.5", name: "Under 9.5 Corners", odds: "1.65" },
        ],
      },
    ],
  },

  {
    id: "cards",
    title: "Cards",
    markets: [
      {
        id: "cards-35",
        title: "Total Cards 3.5",
        selections: [
          { key: "cards-over35", label: "Over 3.5", name: "Over 3.5 Cards", odds: "1.70" },
          { key: "cards-under35", label: "Under 3.5", name: "Under 3.5 Cards", odds: "2.00" },
        ],
      },
      {
        id: "cards-45",
        title: "Total Cards 4.5",
        selections: [
          { key: "cards-over45", label: "Over 4.5", name: "Over 4.5 Cards", odds: "2.00" },
          { key: "cards-under45", label: "Under 4.5", name: "Under 4.5 Cards", odds: "1.70" },
        ],
      },
    ],
  },

  {
    id: "first-half",
    title: "First Half",
    markets: [
      {
        id: "ht-1x2",
        title: "Half Time 1X2",
        selections: [
          { key: "ht-home", label: "1", name: "Half Time Home", odds: "2.30" },
          { key: "ht-draw", label: "X", name: "Half Time Draw", odds: "2.20" },
          { key: "ht-away", label: "2", name: "Half Time Away", odds: "4.20" },
        ],
      },
      {
        id: "ht-over05",
        title: "First Half Goals 0.5",
        selections: [
          { key: "ht-over05", label: "Over 0.5", name: "1st Half Over 0.5", odds: "1.35" },
          { key: "ht-under05", label: "Under 0.5", name: "1st Half Under 0.5", odds: "2.80" },
        ],
      },
      {
        id: "ht-over15",
        title: "First Half Goals 1.5",
        selections: [
          { key: "ht-over15", label: "Over 1.5", name: "1st Half Over 1.5", odds: "2.20" },
          { key: "ht-under15", label: "Under 1.5", name: "1st Half Under 1.5", odds: "1.55" },
        ],
      },
    ],
  },

  {
    id: "second-half",
    title: "Second Half",
    markets: [
      {
        id: "2h-over05",
        title: "Second Half Goals 0.5",
        selections: [
          { key: "2h-over05", label: "Over 0.5", name: "2nd Half Over 0.5", odds: "1.30" },
          { key: "2h-under05", label: "Under 0.5", name: "2nd Half Under 0.5", odds: "3.00" },
        ],
      },
      {
        id: "2h-over15",
        title: "Second Half Goals 1.5",
        selections: [
          { key: "2h-over15", label: "Over 1.5", name: "2nd Half Over 1.5", odds: "2.10" },
          { key: "2h-under15", label: "Under 1.5", name: "2nd Half Under 1.5", odds: "1.60" },
        ],
      },
    ],
  },

  {
    id: "correct-score",
    title: "Correct Score",
    markets: [
      {
        id: "correct-score",
        title: "Correct Score",
        selections: [
          { key: "cs-00", label: "0-0", name: "Correct Score 0-0", odds: "9.00" },
          { key: "cs-10", label: "1-0", name: "Correct Score 1-0", odds: "7.00" },
          { key: "cs-01", label: "0-1", name: "Correct Score 0-1", odds: "9.50" },
          { key: "cs-11", label: "1-1", name: "Correct Score 1-1", odds: "6.50" },
          { key: "cs-20", label: "2-0", name: "Correct Score 2-0", odds: "8.50" },
          { key: "cs-02", label: "0-2", name: "Correct Score 0-2", odds: "11.00" },
          { key: "cs-21", label: "2-1", name: "Correct Score 2-1", odds: "8.00" },
          { key: "cs-12", label: "1-2", name: "Correct Score 1-2", odds: "9.00" },
          { key: "cs-22", label: "2-2", name: "Correct Score 2-2", odds: "12.00" },
          { key: "cs-30", label: "3-0", name: "Correct Score 3-0", odds: "15.00" },
          { key: "cs-03", label: "0-3", name: "Correct Score 0-3", odds: "18.00" },
          { key: "cs-31", label: "3-1", name: "Correct Score 3-1", odds: "14.00" },
          { key: "cs-13", label: "1-3", name: "Correct Score 1-3", odds: "16.00" },
          { key: "cs-33", label: "3-3", name: "Correct Score 3-3", odds: "35.00" },
        ],
      },
    ],
  },

  {
    id: "half-full",
    title: "Half Time / Full Time",
    markets: [
      {
        id: "ht-ft",
        title: "Half Time / Full Time",
        selections: [
          { key: "htft-11", label: "1/1", name: "Home/Home", odds: "3.50" },
          { key: "htft-xx", label: "X/X", name: "Draw/Draw", odds: "5.00" },
          { key: "htft-22", label: "2/2", name: "Away/Away", odds: "7.00" },
          { key: "htft-1x", label: "1/X", name: "Home/Draw", odds: "14.00" },
          { key: "htft-x1", label: "X/1", name: "Draw/Home", odds: "5.50" },
          { key: "htft-2x", label: "2/X", name: "Away/Draw", odds: "16.00" },
          { key: "htft-x2", label: "X/2", name: "Draw/Away", odds: "8.50" },
        ],
      },
    ],
  },

  {
    id: "goals-even",
    title: "Goals Odd / Even",
    markets: [
      {
        id: "odd-even",
        title: "Total Goals",
        selections: [
          { key: "odd", label: "Odd", name: "Odd Goals", odds: "1.90" },
          { key: "even", label: "Even", name: "Even Goals", odds: "1.90" },
        ],
      },
    ],
  },

  {
    id: "clean-sheet",
    title: "Clean Sheet",
    markets: [
      {
        id: "clean-sheet",
        title: "Clean Sheet",
        selections: [
          { key: "home-clean", label: "Home", name: "Home Clean Sheet", odds: "2.40" },
          { key: "away-clean", label: "Away", name: "Away Clean Sheet", odds: "3.10" },
        ],
      },
    ],
  },

  {
    id: "win-to-nil",
    title: "Win To Nil",
    markets: [
      {
        id: "win-to-nil",
        title: "Win To Nil",
        selections: [
          { key: "home-wtn", label: "Home", name: "Home Win To Nil", odds: "3.20" },
          { key: "away-wtn", label: "Away", name: "Away Win To Nil", odds: "5.00" },
        ],
      },
    ],
  },

  {
    id: "next-goal",
    title: "Next Goal",
    markets: [
      {
        id: "next-goal",
        title: "Next Goal",
        selections: [
          { key: "next-home", label: "Home", name: "Home Next Goal", odds: "1.90" },
          { key: "next-away", label: "Away", name: "Away Next Goal", odds: "2.20" },
          { key: "next-none", label: "No Goal", name: "No More Goals", odds: "6.00" },
        ],
      },
    ],
  },
];

export function getAllMarkets() {
  return marketGroups.flatMap((group) =>
    group.markets.map((market) => ({
      ...market,
      groupId: group.id,
      groupTitle: group.title,
    }))
  );
}
