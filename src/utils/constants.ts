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
