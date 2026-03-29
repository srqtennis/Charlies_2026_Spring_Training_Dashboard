import { Phase, Week, ABCProgression } from '../../types';

export const phases: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    name: 'Movement & Contact Quality',
    startWeek: 1,
    endWeek: 4,
    dateRange: 'March 9 – April 5',
    description: 'Build the physical and technical foundation. Footwork is the #1 priority — when Charlie\'s feet are set, everything clicks. Every session opens with RAMP warm-up + ABC athletic development (30 min). Contact geometry is internalized through Arrow Alignment and the Two Laws of reliable ball-striking. BPR introduced in Week 3.',
    tennisFocus: [
      'Footwork foundation + forehand spacing (arm\'s distance)',
      'Backhand grip automation + cross-court rally building',
      'Serve rhythm + topspin development + BPR introduction',
      'Contact geometry: Arrow Alignment + Two Laws in live ball'
    ],
    abcFocus: [
      'RAMP warm-up + ladder agility + single-leg balance',
      'RAMP warm-up + cone reaction drills + hand-eye coordination',
      'RAMP warm-up + speed starts + directional change',
      'RAMP warm-up + balance challenges + lateral shuffle speed'
    ],
    milestones: [
      'Split step without reminders',
      'Backhand grip found < 2 sec',
      '5 consecutive serves in box',
      'Phase 1 numbers assessment completed'
    ]
  },
  {
    id: 'phase-2',
    number: 2,
    name: 'Weapons & Decision-Making',
    startWeek: 5,
    endWeek: 8,
    dateRange: 'April 6 – May 3',
    description: 'Transform reliable strokes into weapons. Forehand becomes a depth-and-pace tool with overspin cover. Serve placement becomes intentional with Confidence Arithmetic. Net approach patterns introduced. Pattern play teaches decision-making: Play the Ten, not the Five.',
    tennisFocus: [
      'Forehand weapon: depth + overspin cover + pace with accuracy',
      'Serve placement (Wide/Body/T) + Confidence Arithmetic',
      'Net approach + volley contact + closing patterns',
      'Pattern play: cross-court building to DTL attack + Mistakes Math'
    ],
    abcFocus: [
      'RAMP warm-up + explosive first step + agility combos',
      'RAMP warm-up + multi-directional speed + coordination',
      'RAMP warm-up + quick feet + deceleration + balance',
      'RAMP warm-up + acceleration/deceleration + agility'
    ],
    milestones: [
      '8/10 FH past service line',
      'Call placement before serve',
      'Approach-volley pattern 5x',
      'Phase 2 numbers assessment completed'
    ]
  },
  {
    id: 'phase-3',
    number: 3,
    name: 'Competition & Yellow Ball Prep',
    startWeek: 9,
    endWeek: 12,
    dateRange: 'May 4 – May 31',
    description: 'Everything comes together under competitive pressure. Match situations test decision-making and BPR usage. Yellow ball transition begins with swing speed allocation. Tournament prep focuses on 85% quality baseline and game plan execution. Final assessment measures all progress.',
    tennisFocus: [
      'Match situations: pressure points + Play the Ten',
      'Yellow ball adaptation + swing speed allocation',
      'Tournament prep: game plans + 85% quality baseline',
      'Full assessment + yellow ball readiness'
    ],
    abcFocus: [
      'RAMP warm-up + match-specific movement + endurance',
      'RAMP warm-up + power movements + coordination combos',
      'RAMP warm-up + speed endurance + recovery movement',
      'RAMP warm-up + full ABC battery test'
    ],
    milestones: [
      'Track unforced errors in sets',
      '15-ball yellow ball rally',
      'Execute game plan in practice set',
      'Final assessment day completed'
    ]
  }
];

export const weeks: Week[] = [
  { weekNumber: 1, phaseNumber: 1, dateRange: 'Mar 9–15', startDate: '2026-03-09', endDate: '2026-03-15', tennisFocusTheme: 'Footwork foundation + forehand spacing (arm\'s distance)', abcFocusTheme: 'RAMP warm-up + ladder agility + single-leg balance', milestone: 'Split step without reminders' },
  { weekNumber: 2, phaseNumber: 1, dateRange: 'Mar 16–22', startDate: '2026-03-16', endDate: '2026-03-22', tennisFocusTheme: 'Backhand grip automation + cross-court rally building', abcFocusTheme: 'RAMP warm-up + cone reaction drills + hand-eye coordination', milestone: 'Backhand grip found < 2 sec' },
  { weekNumber: 3, phaseNumber: 1, dateRange: 'Mar 23–29', startDate: '2026-03-23', endDate: '2026-03-29', tennisFocusTheme: 'Serve rhythm + topspin development + BPR introduction', abcFocusTheme: 'RAMP warm-up + speed starts + directional change', milestone: '5 consecutive serves in box' },
  { weekNumber: 4, phaseNumber: 1, dateRange: 'Mar 30–Apr 5', startDate: '2026-03-30', endDate: '2026-04-05', tennisFocusTheme: 'Contact geometry: Arrow Alignment + Two Laws in live ball', abcFocusTheme: 'RAMP warm-up + balance challenges + lateral shuffle speed', milestone: 'Phase 1 numbers assessment' },
  { weekNumber: 5, phaseNumber: 2, dateRange: 'Apr 6–12', startDate: '2026-04-06', endDate: '2026-04-12', tennisFocusTheme: 'Forehand weapon: depth + overspin cover + pace with accuracy', abcFocusTheme: 'RAMP warm-up + explosive first step + agility combos', milestone: '8/10 FH past service line' },
  { weekNumber: 6, phaseNumber: 2, dateRange: 'Apr 13–19', startDate: '2026-04-13', endDate: '2026-04-19', tennisFocusTheme: 'Serve placement (Wide/Body/T) + Confidence Arithmetic', abcFocusTheme: 'RAMP warm-up + multi-directional speed + coordination', milestone: 'Call placement before serve' },
  { weekNumber: 7, phaseNumber: 2, dateRange: 'Apr 20–26', startDate: '2026-04-20', endDate: '2026-04-26', tennisFocusTheme: 'Net approach + volley contact + closing patterns', abcFocusTheme: 'RAMP warm-up + quick feet + deceleration + balance', milestone: 'Approach-volley pattern 5x' },
  { weekNumber: 8, phaseNumber: 2, dateRange: 'Apr 27–May 3', startDate: '2026-04-27', endDate: '2026-05-03', tennisFocusTheme: 'Pattern play: cross-court building to DTL attack + Mistakes Math', abcFocusTheme: 'RAMP warm-up + acceleration/deceleration + agility', milestone: 'Phase 2 numbers assessment' },
  { weekNumber: 9, phaseNumber: 3, dateRange: 'May 4–10', startDate: '2026-05-04', endDate: '2026-05-10', tennisFocusTheme: 'Match situations: pressure points + Play the Ten decision-making', abcFocusTheme: 'RAMP warm-up + match-specific movement + endurance', milestone: 'Track unforced errors in sets' },
  { weekNumber: 10, phaseNumber: 3, dateRange: 'May 11–17', startDate: '2026-05-11', endDate: '2026-05-17', tennisFocusTheme: 'Yellow ball adaptation + swing speed allocation (spin vs. pace)', abcFocusTheme: 'RAMP warm-up + power movements + coordination combos', milestone: '15-ball yellow ball rally' },
  { weekNumber: 11, phaseNumber: 3, dateRange: 'May 18–24', startDate: '2026-05-18', endDate: '2026-05-24', tennisFocusTheme: 'Tournament prep: game plans + 85% quality baseline', abcFocusTheme: 'RAMP warm-up + speed endurance + recovery movement', milestone: 'Execute game plan in practice set' },
  { weekNumber: 12, phaseNumber: 3, dateRange: 'May 25–31', startDate: '2026-05-25', endDate: '2026-05-31', tennisFocusTheme: 'Full assessment + yellow ball readiness', abcFocusTheme: 'RAMP warm-up + full ABC battery test', milestone: 'Final assessment day' },
];

export const abcProgressions: ABCProgression[] = [
  { component: 'RAMP Warm-Up', phase1: 'Phase 1: Joint mobility (ankle, knee, hip circles, thoracic rotation, shoulder circles, neck rolls). Phase 2: Muscle activation (mini band lateral walks, glute bridges, plank shoulder taps). Phase 3: Athletic movement (split step reaction, lateral shuffle + catch).', phase2: 'Same RAMP protocol with increased pace and complexity. Athletic movement phase adds shuffle-to-crossover and rally-specific patterns.', phase3: 'Full RAMP protocol with match-intensity athletic movement. Forward sprint + backpedal patterns. Competition-ready preparation.' },
  { component: 'Agility', phase1: 'Ladder basics, cone weaves, 4-corner shuffle, split step timing games. Focus: land light, push first step, eyes early.', phase2: 'Reaction ladders, multi-directional combos, shadow tennis footwork patterns. Focus: first-step explosion.', phase3: 'Match-specific court coverage, rally-recovery patterns, full-court movement. Focus: movement under fatigue.' },
  { component: 'Balance', phase1: 'Single-leg stands (eyes closed, track time), balance beam walks, ball toss on balance pad.', phase2: 'Dynamic balance in movement, landing stability after split step, deceleration control.', phase3: 'Balance under fatigue, split-step landing quality, recovery balance between shots.' },
  { component: 'Speed', phase1: 'Short sprint starts (5-10m), first-step quickness, lateral shuffle speed. Think soccer — feet never stop.', phase2: 'Explosive first step, acceleration/deceleration, change-of-direction speed. First-step quickness measured.', phase3: 'Speed endurance, repeated sprint ability, match-length movement capacity.' },
  { component: 'Coordination', phase1: 'Hand-eye: 2-ball juggle (track catches), ball toss patterns, skipping with racket, bounce-hit games.', phase2: 'Complex combos: footwork + catch, agility + ball skills, three-in-view tracking.', phase3: 'Sport-specific: movement + stroke timing, serve toss coordination, match rhythm.' },
];
