import { SessionLog, LessonPlan, AssessmentMetric, Achievement, PracticeCheckoff } from '../types';

const STORAGE_KEY = 'charlie-training-dashboard';
const STORAGE_VERSION = 3;

export interface StorageData {
  version: number;
  initialized: boolean;
  sessionLogs: SessionLog[];
  lessonPlans: LessonPlan[];
  metrics: AssessmentMetric[];
  achievements: Achievement[];
  completedMilestones: string[];
  practiceCheckoffs: PracticeCheckoff[];
}

const defaultData: StorageData = {
  version: STORAGE_VERSION,
  initialized: false,
  sessionLogs: [],
  lessonPlans: [],
  metrics: [],
  achievements: [],
  completedMilestones: [],
  practiceCheckoffs: [],
};

export function loadFromStorage(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);

    // Migrate v1 → v2: add practiceCheckoffs
    if (parsed.version === 1) {
      const migrated: StorageData = {
        ...parsed,
        version: 2,
        practiceCheckoffs: [],
      };
      saveToStorage(migrated);
      return loadFromStorage(); // re-enter to apply v2→v3 migration
    }

    // Migrate v2 → v3: rebuild lesson plans + achievements from updated seed data
    // Preserve user data: session logs, metrics history, practice checkoffs, milestones
    if (parsed.version === 2) {
      const migrated: StorageData = {
        ...parsed,
        version: 3,
        // Mark as NOT initialized so AppProvider will regenerate lesson plans
        // and achievements from updated seed, while preserving session data
        initialized: false,
        // Carry forward user-entered data
        sessionLogs: parsed.sessionLogs || [],
        metrics: parsed.metrics || [],
        completedMilestones: parsed.completedMilestones || [],
        practiceCheckoffs: parsed.practiceCheckoffs || [],
      };
      saveToStorage(migrated);
      return migrated;
    }

    if (parsed.version !== STORAGE_VERSION) return defaultData;
    return parsed as StorageData;
  } catch {
    return defaultData;
  }
}

export function saveToStorage(data: StorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}
