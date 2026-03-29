import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { SessionLog, LessonPlan, AssessmentMetric, Achievement, PracticeCheckoff } from '../types';
import { loadFromStorage, saveToStorage, StorageData } from './storage';
import { generateAllLessonPlans } from '../utils/lesson-generator';
import { assessmentMetrics } from '../data/seed/metrics';
import { achievements as achievementSeed } from '../data/seed/coaching-system';

export interface AppState {
  initialized: boolean;
  sessionLogs: SessionLog[];
  lessonPlans: LessonPlan[];
  metrics: AssessmentMetric[];
  achievements: Achievement[];
  completedMilestones: string[];
  activeSessionId: string | null;
  practiceCheckoffs: PracticeCheckoff[];
}

type Action =
  | { type: 'INITIALIZE'; payload: StorageData }
  | { type: 'ADD_SESSION_LOG'; payload: SessionLog }
  | { type: 'UPDATE_SESSION_LOG'; payload: SessionLog }
  | { type: 'UPDATE_LESSON_PLAN'; payload: LessonPlan }
  | { type: 'UPDATE_METRIC'; payload: AssessmentMetric }
  | { type: 'TOGGLE_MILESTONE'; payload: string }
  | { type: 'SET_ACTIVE_SESSION'; payload: string | null }
  | { type: 'EARN_ACHIEVEMENT'; payload: string }
  | { type: 'TOGGLE_PRACTICE_CHECKOFF'; payload: { date: string; exercise: string } }
  | { type: 'CLEAR_PRACTICE_DAY'; payload: string }
  | { type: 'RESET_DATA' };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        initialized: true,
        sessionLogs: action.payload.sessionLogs,
        lessonPlans: action.payload.lessonPlans,
        metrics: action.payload.metrics,
        achievements: action.payload.achievements,
        completedMilestones: action.payload.completedMilestones,
        practiceCheckoffs: action.payload.practiceCheckoffs || [],
      };
    case 'ADD_SESSION_LOG':
      return { ...state, sessionLogs: [...state.sessionLogs, action.payload] };
    case 'UPDATE_SESSION_LOG':
      return {
        ...state,
        sessionLogs: state.sessionLogs.map(s => s.id === action.payload.id ? action.payload : s),
      };
    case 'UPDATE_LESSON_PLAN':
      return {
        ...state,
        lessonPlans: state.lessonPlans.map(lp => lp.id === action.payload.id ? action.payload : lp),
      };
    case 'UPDATE_METRIC':
      return {
        ...state,
        metrics: state.metrics.map(m => m.id === action.payload.id ? action.payload : m),
      };
    case 'TOGGLE_MILESTONE': {
      const milestones = state.completedMilestones.includes(action.payload)
        ? state.completedMilestones.filter(m => m !== action.payload)
        : [...state.completedMilestones, action.payload];
      return { ...state, completedMilestones: milestones };
    }
    case 'SET_ACTIVE_SESSION':
      return { ...state, activeSessionId: action.payload };
    case 'EARN_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(a =>
          a.id === action.payload ? { ...a, earned: true, earnedDate: new Date().toISOString().split('T')[0] } : a
        ),
      };
    case 'TOGGLE_PRACTICE_CHECKOFF': {
      const { date, exercise } = action.payload;
      const existing = state.practiceCheckoffs.find(
        pc => pc.date === date && pc.exercise === exercise
      );
      if (existing) {
        // Toggle existing
        return {
          ...state,
          practiceCheckoffs: state.practiceCheckoffs.map(pc =>
            pc.date === date && pc.exercise === exercise
              ? { ...pc, completed: !pc.completed }
              : pc
          ),
        };
      } else {
        // Create new (default to completed=true on first tap)
        return {
          ...state,
          practiceCheckoffs: [...state.practiceCheckoffs, { date, exercise, completed: true }],
        };
      }
    }
    case 'CLEAR_PRACTICE_DAY':
      return {
        ...state,
        practiceCheckoffs: state.practiceCheckoffs.filter(pc => pc.date !== action.payload),
      };
    case 'RESET_DATA':
      return { ...initialState, initialized: false };
    default:
      return state;
  }
}

const initialState: AppState = {
  initialized: false,
  sessionLogs: [],
  lessonPlans: [],
  metrics: [],
  achievements: [],
  completedMilestones: [],
  activeSessionId: null,
  practiceCheckoffs: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored.initialized) {
      dispatch({ type: 'INITIALIZE', payload: stored });
    } else {
      // Fresh init or v2→v3 migration (initialized set to false, but may have user data)
      const lessonPlans = generateAllLessonPlans();
      const initData: StorageData = {
        version: 3,
        initialized: true,
        sessionLogs: stored.sessionLogs || [],
        lessonPlans,
        metrics: stored.metrics?.length ? stored.metrics : assessmentMetrics,
        achievements: achievementSeed,
        completedMilestones: stored.completedMilestones || [],
        practiceCheckoffs: stored.practiceCheckoffs || [],
      };
      saveToStorage(initData);
      dispatch({ type: 'INITIALIZE', payload: initData });
    }
  }, []);

  useEffect(() => {
    if (state.initialized) {
      saveToStorage({
        version: 3,
        initialized: true,
        sessionLogs: state.sessionLogs,
        lessonPlans: state.lessonPlans,
        metrics: state.metrics,
        achievements: state.achievements,
        completedMilestones: state.completedMilestones,
        practiceCheckoffs: state.practiceCheckoffs,
      });
    }
  }, [state.sessionLogs, state.lessonPlans, state.metrics, state.achievements, state.completedMilestones, state.practiceCheckoffs, state.initialized]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
