import { SessionLog, LessonPlan, AssessmentMetric, Achievement, PracticeCheckoff } from '../types';

const STORAGE_KEY = 'charlie-training-dashboard';
const STORAGE_VERSION = 2;

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
    // Migrate from v1 → v2: add practiceCheckoffs
    if (parsed.version === 1) {
      const migrated: StorageData = {
        ...parsed,
        version: 2,
        practiceCheckoffs: [],
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
