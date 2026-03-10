import { AssessmentMetric } from '../../types';

export const assessmentMetrics: AssessmentMetric[] = [
  {
    id: 'metric-fh-streak',
    name: 'Forehand shaping streak',
    category: 'stroke',
    unit: 'consecutive',
    currentValue: '11',
    midpointTarget: '18',
    finalTarget: '25+',
    history: [{ date: '2026-03-09', value: '11', sessionId: 'baseline', notes: 'Initial assessment' }]
  },
  {
    id: 'metric-bh-streak',
    name: 'Backhand streak',
    category: 'stroke',
    unit: 'consecutive',
    currentValue: '7',
    midpointTarget: '12',
    finalTarget: '20+',
    history: [{ date: '2026-03-09', value: '7', sessionId: 'baseline', notes: 'Initial assessment' }]
  },
  {
    id: 'metric-volley-streak',
    name: 'Volley streak',
    category: 'stroke',
    unit: 'consecutive',
    currentValue: '103',
    midpointTarget: '120+',
    finalTarget: '150+',
    history: [{ date: '2026-03-09', value: '103', sessionId: 'baseline', notes: 'PR at initial assessment' }]
  },
  {
    id: 'metric-serve-acc',
    name: 'Serve accuracy (10 to target)',
    category: 'serve',
    unit: 'out_of_10',
    currentValue: '5/10',
    midpointTarget: '7/10',
    finalTarget: '8/10',
    history: [{ date: '2026-03-09', value: '5', sessionId: 'baseline', notes: 'Initial assessment' }]
  },
  {
    id: 'metric-rally-full',
    name: 'Live ball rally (full court)',
    category: 'rally',
    unit: 'consecutive',
    currentValue: '100 (mini tennis)',
    midpointTarget: '50+ full court',
    finalTarget: '75+ full court',
    history: [{ date: '2026-03-09', value: '100', sessionId: 'baseline', notes: 'Mini tennis only' }]
  },
  {
    id: 'metric-bh-grip',
    name: 'Backhand grip find time',
    category: 'movement',
    unit: 'seconds',
    currentValue: '3-4',
    midpointTarget: '1-2',
    finalTarget: 'Automatic',
    history: [{ date: '2026-03-09', value: '3.5', sessionId: 'baseline', notes: 'Initial assessment' }]
  },
  {
    id: 'metric-split-step',
    name: 'Split step consistency',
    category: 'movement',
    unit: 'quality',
    currentValue: 'With reminders',
    midpointTarget: 'Most balls',
    finalTarget: 'Automatic',
    history: [{ date: '2026-03-09', value: '2', sessionId: 'baseline', notes: 'Needs reminders - rated 2/5' }]
  },
  {
    id: 'metric-bpr',
    name: 'Between Point Routine in play',
    category: 'mental',
    unit: 'quality',
    currentValue: 'Not yet started',
    midpointTarget: 'Most points',
    finalTarget: 'Every point',
    history: [{ date: '2026-03-09', value: '0', sessionId: 'baseline', notes: 'Not yet introduced' }]
  },
  {
    id: 'metric-ue',
    name: 'Unforced errors per practice set',
    category: 'tactical',
    unit: 'count',
    currentValue: 'Not yet tracking',
    midpointTarget: 'Baseline established',
    finalTarget: 'Reduce by 30%',
    history: [{ date: '2026-03-09', value: '0', sessionId: 'baseline', notes: 'Not yet tracking' }]
  },
  {
    id: 'metric-yellow',
    name: 'Yellow ball readiness',
    category: 'tactical',
    unit: 'quality',
    currentValue: 'Not started',
    midpointTarget: 'Introduced',
    finalTarget: 'Match ready',
    history: [{ date: '2026-03-09', value: '0', sessionId: 'baseline', notes: 'Not started' }]
  }
];
