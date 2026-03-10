export type SessionType = 'private' | 'group';
export type SessionStatus = 'planned' | 'in_progress' | 'completed';
export type PlayerEnergy = 'high' | 'medium' | 'low';
export type PlayerMood = 'focused' | 'fired_up' | 'frustrated' | 'flat';
export type BPRRating = 'not_used' | 'sometimes' | 'most_points' | 'every_point';
export type MetricCategory = 'stroke' | 'serve' | 'rally' | 'movement' | 'mental' | 'tactical';

export interface Phase {
  id: string;
  number: 1 | 2 | 3;
  name: string;
  startWeek: number;
  endWeek: number;
  dateRange: string;
  description: string;
  tennisFocus: string[];
  abcFocus: string[];
  milestones: string[];
}

export interface Week {
  weekNumber: number;
  phaseNumber: 1 | 2 | 3;
  dateRange: string;
  startDate: string;
  endDate: string;
  tennisFocusTheme: string;
  abcFocusTheme: string;
  milestone: string;
}

export interface LessonPlan {
  id: string;
  weekNumber: number;
  phaseNumber: 1 | 2 | 3;
  sessionType: SessionType;
  sessionNumber: number;
  date: string;
  duration: number;
  location: string;
  theme: string;
  pillarFocus: string;
  objectives: string[];
  equipment: string[];
  blocks: LessonBlock[];
  coachingCues: string[];
  progressions: string;
  regressions: string;
  status: SessionStatus;
}

export interface LessonBlock {
  id: string;
  name: string;
  blockNumber: number;
  duration: number;
  focus: string;
  drills: DrillAssignment[];
}

export interface DrillAssignment {
  drillId: string;
  drillName: string;
  duration: number;
  notes: string;
}

export interface Drill {
  id: string;
  name: string;
  coreDrill: boolean;
  tier: string;
  tierFocus: string;
  developmentStage: string;
  skillDomain: string;
  competencyLinked: string;
  objective: string;
  ageGroup: string;
  skillLevel: string;
  players: string;
  courtSetup: string;
  duration: string;
  equipment: string;
  strokeFocus: string;
  primaryPillar: string;
  supportPillars: string;
  setupInstructions: string;
  stepByStepInstructions: string;
  scoringMethod: string;
  repsDurationDetail: string;
  targetStandard: string;
  coachingCues: string;
  constraints: string;
  progression: string;
  regression: string;
  sessionPhase: string;
  description: string;
  variations: string;
}

export interface SessionLog {
  id: string;
  lessonPlanId: string;
  date: string;
  startTime: string;
  endTime: string;
  sessionType: SessionType;
  location: string;
  weather: string;
  playerEnergy: PlayerEnergy;
  playerMood: PlayerMood;
  metrics: SessionMetricEntry[];
  drillResults: DrillResult[];
  coachNotes: string;
  keyWins: string[];
  areasToWatch: string[];
  homeAssignments: string[];
  emotionalNotes: string;
  betweenPointRoutine: BPRRating;
  parentSummary: string;
}

export interface SessionMetricEntry {
  metricId: string;
  value: string;
  unit: string;
  notes: string;
}

export interface DrillResult {
  drillId: string;
  drillName: string;
  accuracy: number | null;
  attempts: number | null;
  streakBest: number | null;
  notes: string;
}

export interface AssessmentMetric {
  id: string;
  name: string;
  category: MetricCategory;
  unit: string;
  currentValue: string;
  midpointTarget: string;
  finalTarget: string;
  history: MetricEntry[];
}

export interface MetricEntry {
  date: string;
  value: string;
  sessionId: string;
  notes: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earned: boolean;
  earnedDate: string;
}

export interface CoachingCue {
  category: string;
  cues: string[];
}

export interface Pillar {
  number: number;
  name: string;
  tagline: string;
  description: string;
  applicationExamples: string[];
}

export interface ResearchConcept {
  name: string;
  summary: string;
  application: string;
}

export interface Framework {
  name: string;
  description: string;
  steps: string[];
}

export interface ABCProgression {
  component: string;
  phase1: string;
  phase2: string;
  phase3: string;
}

export interface PracticeItem {
  exercise: string;
  reps: string;
  purpose: string;
  frequency: 'daily' | 'weekly';
}

export interface PracticeCheckoff {
  date: string;        // YYYY-MM-DD
  exercise: string;    // matches PracticeItem.exercise
  completed: boolean;
}
