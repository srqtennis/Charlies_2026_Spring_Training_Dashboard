import { SessionLog, LessonPlan, AssessmentMetric, Achievement } from '../types';

const STORAGE_KEY = 'charlie-training-dashboard';
const STORAGE_VERSION = 1;

export interface StorageData {
  version: number;
  initialized: boolean;
  sessionLogs: SessionLog[];
  lessonPlans: LessonPlan[];
  metrics: AssessmentMetric[];
  achievements: Achievement[];
  completedMilestones: string[];
}

const defaultData: StorageData = {
  version: STORAGE_VERSION,
  initialized: false,
  sessionLogs: [],
  lessonPlans: [],
  metrics: [],
  achievements: [],
  completedMilestones: [],
};

export function loadFromStorage(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw) as StorageData;
    if (parsed.version !== STORAGE_VERSION) return defaultData;
    return parsed;
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
