export const PHASE_COLORS = {
  1: { bg: 'bg-blue-900', text: 'text-white', border: 'border-blue-900', light: 'bg-blue-50' },
  2: { bg: 'bg-red-600', text: 'text-white', border: 'border-red-600', light: 'bg-red-50' },
  3: { bg: 'bg-amber-600', text: 'text-white', border: 'border-amber-600', light: 'bg-amber-50' },
} as const;

export const PHASE_NAMES = {
  1: 'Movement & Contact Quality',
  2: 'Weapons & Decision-Making',
  3: 'Competition & Yellow Ball Prep',
} as const;

export const SESSION_TYPE_LABELS = {
  private: 'Private Session',
  group: 'Group Session',
} as const;

export const SESSION_TYPE_COLORS = {
  private: 'border-l-navy',
  group: 'border-l-srq-red',
} as const;

export const LOCATIONS = [
  'Potter Park',
  'Pineview School',
  'Brookside',
  'Home Court',
];

export const PLAYER_METRIC_NAMES: Record<string, string> = {
  'Forehand shaping streak': 'Forehand Streaks 🎾',
  'Backhand streak': 'Backhand Streaks 🏓',
  'Volley streak': 'Net Ninja Rating 🥷',
  'Serve accuracy (10 to target)': 'Serve Sniper Score 🎯',
  'Live ball rally (full court)': 'Rally Champion 💪',
  'Backhand grip find time': 'Grip Speed ⚡',
  'Split step consistency': 'Speed Score 👟',
  'Between Point Routine in play': 'Focus Power 🧠',
  'Unforced errors per practice set': 'Smart Shots 🧩',
  'Yellow ball readiness': 'Match Ready Score 🏆',
};

export const PLAYER_LEVELS = [
  { level: 1, name: 'Beginner', xpRequired: 0 },
  { level: 2, name: 'Ball Buddy', xpRequired: 100 },
  { level: 3, name: 'Rally Rookie', xpRequired: 250 },
  { level: 4, name: 'Court Climber', xpRequired: 450 },
  { level: 5, name: 'Target Tracker', xpRequired: 700 },
  { level: 6, name: 'Streak Machine', xpRequired: 1000 },
  { level: 7, name: 'Net Ninja', xpRequired: 1400 },
  { level: 8, name: 'Ace Attacker', xpRequired: 1900 },
  { level: 9, name: 'Match Master', xpRequired: 2500 },
  { level: 10, name: 'Tennis Champion', xpRequired: 3200 },
] as const;

export const METRIC_CATEGORY_COLORS: Record<string, string> = {
  stroke: 'bg-blue-500',
  serve: 'bg-green-500',
  rally: 'bg-purple-500',
  movement: 'bg-orange-500',
  mental: 'bg-rose-500',
  tactical: 'bg-amber-500',
};
