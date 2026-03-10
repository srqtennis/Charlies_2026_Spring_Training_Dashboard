const PLAN_START = new Date('2026-03-09');
const PLAN_END = new Date('2026-05-31');

export function getCurrentWeek(): number {
  const today = new Date();
  const diffMs = today.getTime() - PLAN_START.getTime();
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;
  return Math.max(1, Math.min(12, diffWeeks));
}

export function getCurrentPhase(): 1 | 2 | 3 {
  const week = getCurrentWeek();
  if (week <= 4) return 1;
  if (week <= 8) return 2;
  return 3;
}

export function isBeforePlan(): boolean {
  return new Date() < PLAN_START;
}

export function isAfterPlan(): boolean {
  return new Date() > PLAN_END;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDateFull(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

export function getWeekStatus(weekNumber: number): 'upcoming' | 'current' | 'completed' {
  const current = getCurrentWeek();
  if (weekNumber < current) return 'completed';
  if (weekNumber === current) return 'current';
  return 'upcoming';
}
