import { useMemo } from 'react';
import { useAppContext } from '../store/AppContext';
import { PLAYER_LEVELS } from '../utils/constants';
import { practiceItems } from '../data/seed/coaching-system';

interface LevelInfo {
  level: number;
  name: string;
  xpRequired: number;
}

export interface PlayerStats {
  totalSessions: number;
  totalXP: number;
  currentLevel: LevelInfo;
  nextLevel: LevelInfo | null;
  xpToNextLevel: number;
  xpProgress: number; // 0-100 percentage
  earnedBadgeCount: number;
  totalBadgeCount: number;
  practiceStreak: number;
  todayPracticeCompleted: number;
  todayPracticeTotal: number;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getDayOfWeek(dateStr: string): number {
  return new Date(dateStr + 'T12:00:00').getDay(); // 0=Sun, 1=Mon, ...
}

function getPracticeItemsForDate(dateStr: string) {
  const dow = getDayOfWeek(dateStr);
  const isWeeklyDay = dow === 1 || dow === 3 || dow === 5; // Mon, Wed, Fri
  return practiceItems.filter(item => {
    if (item.frequency === 'daily') return true;
    if (item.frequency === 'weekly' && isWeeklyDay) return true;
    return false;
  });
}

export function usePlayerStats(): PlayerStats {
  const { state } = useAppContext();

  return useMemo(() => {
    // Count completed sessions
    const totalSessions = state.sessionLogs.length;

    // Count earned badges
    const earnedBadgeCount = state.achievements.filter(a => a.earned).length;
    const totalBadgeCount = state.achievements.length;

    // Count completed milestones
    const milestonesCompleted = state.completedMilestones.length;

    // Count unique practice days (days where all daily items are completed)
    const practiceByDate = new Map<string, Set<string>>();
    for (const pc of state.practiceCheckoffs) {
      if (pc.completed) {
        if (!practiceByDate.has(pc.date)) {
          practiceByDate.set(pc.date, new Set());
        }
        practiceByDate.get(pc.date)!.add(pc.exercise);
      }
    }

    // Count fully completed practice days (all daily items done)
    const dailyItems = practiceItems.filter(p => p.frequency === 'daily');
    const completePracticeDays: string[] = [];
    for (const [date, exercises] of practiceByDate.entries()) {
      const allDailyDone = dailyItems.every(item => exercises.has(item.exercise));
      if (allDailyDone) {
        completePracticeDays.push(date);
      }
    }

    // Calculate practice streak (consecutive days ending today or yesterday)
    let practiceStreak = 0;
    if (completePracticeDays.length > 0) {
      const sorted = [...completePracticeDays].sort().reverse();
      const today = getToday();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      // Streak must start from today or yesterday
      if (sorted[0] === today || sorted[0] === yesterdayStr) {
        practiceStreak = 1;
        for (let i = 1; i < sorted.length; i++) {
          const prevDate = new Date(sorted[i - 1] + 'T12:00:00');
          const currDate = new Date(sorted[i] + 'T12:00:00');
          const diffDays = (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24);
          if (diffDays === 1) {
            practiceStreak++;
          } else {
            break;
          }
        }
      }
    }

    // Calculate XP
    const sessionXP = totalSessions * 20;
    const badgeXP = earnedBadgeCount * 50;
    const milestoneXP = milestonesCompleted * 30;
    const practiceXP = completePracticeDays.length * 10;
    const totalXP = sessionXP + badgeXP + milestoneXP + practiceXP;

    // Determine level
    let currentLevel: LevelInfo = PLAYER_LEVELS[0];
    let nextLevel: LevelInfo | null = PLAYER_LEVELS[1];
    for (let i = PLAYER_LEVELS.length - 1; i >= 0; i--) {
      if (totalXP >= PLAYER_LEVELS[i].xpRequired) {
        currentLevel = PLAYER_LEVELS[i];
        nextLevel = i < PLAYER_LEVELS.length - 1 ? PLAYER_LEVELS[i + 1] : null;
        break;
      }
    }

    const xpToNextLevel = nextLevel ? nextLevel.xpRequired - totalXP : 0;
    const xpProgress = nextLevel
      ? ((totalXP - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
      : 100;

    // Today's practice
    const today = getToday();
    const todayItems = getPracticeItemsForDate(today);
    const todayCheckoffs = state.practiceCheckoffs.filter(
      pc => pc.date === today && pc.completed
    );
    const todayPracticeCompleted = todayCheckoffs.length;
    const todayPracticeTotal = todayItems.length;

    return {
      totalSessions,
      totalXP,
      currentLevel,
      nextLevel,
      xpToNextLevel,
      xpProgress: Math.min(100, Math.max(0, xpProgress)),
      earnedBadgeCount,
      totalBadgeCount,
      practiceStreak,
      todayPracticeCompleted,
      todayPracticeTotal,
    };
  }, [state.sessionLogs, state.achievements, state.completedMilestones, state.practiceCheckoffs]);
}

export { getPracticeItemsForDate };
