import { LessonPlan, LessonBlock, DrillAssignment } from '../types';
import { weeks } from '../data/seed/training-plan';
import { drills } from '../data/seed/drills';
import { nanoid } from 'nanoid';

const PRIVATE_BLOCKS = [
  { name: 'Joint Preparation', duration: 10, focus: 'Joint cleaning bottom-to-top: ankles, hips, thoracic spine, shoulders, wrists. Dynamic movement.' },
  { name: 'Athletic Movement (ABC)', duration: 20, focus: 'ABC rotation: agility, balance, speed, coordination challenges.' },
  { name: 'Ball Control', duration: 15, focus: 'Mini tennis, rally building, contact point awareness. Targets present.' },
  { name: 'Technical Work', duration: 20, focus: 'Weekly theme focus. Arrow Alignment: face it, then chase it.' },
  { name: 'Live Ball Tactical', duration: 25, focus: 'Pattern play, decision-making in live rallies.' },
  { name: 'Competitive Play', duration: 15, focus: 'Match situations, pressure points. Mistakes Math applied.' },
  { name: 'Reflection', duration: 5, focus: 'What did you prove today? Show the numbers. Cool-down.' },
];

const GROUP_BLOCKS = [
  { name: 'Joint Preparation', duration: 10, focus: 'Same joint-first protocol. Bottom-to-top.' },
  { name: 'Athletic Movement (ABC)', duration: 20, focus: 'Group ABC games: relay races, cone tag, partner reaction drills.' },
  { name: 'Rally Foundation', duration: 15, focus: 'Cross-court rally building, depth targets, rally counting.' },
  { name: 'Live Ball / Tactical', duration: 20, focus: 'Pattern play with peers, decision-making in live rallies.' },
  { name: 'Competitive Games', duration: 20, focus: 'King of the Court, team challenges, serve competitions.' },
  { name: 'Reflection', duration: 5, focus: 'Success challenge: what worked? Best number today?' },
];

const weekSessionDescriptions: Record<number, string[]> = {
  1: [
    'Footwork foundation — split step timing, ready position, first-step quickness. FH spacing introduction.',
    'Arrow Alignment introduction with forehand. Arm\'s distance contact point. Live ball rallies with footwork focus.',
    'Cross-court rally building. Forehand spacing under live ball conditions. Accuracy targets.',
    'Footwork games + rally building with peers. Split step competitions.',
    'Competitive rally games. King of the Court with footwork emphasis.'
  ],
  2: [
    'Backhand grip shadow work → live ball. Grip-find time trials. Cross-court BH rally targets.',
    'Combined FH/BH rally building. Contact geometry: Two Laws focus. Rally counting.',
    'Full rally sessions — rally consistency as the measure. Backhand grip under pressure.',
    'Partner rally challenges. Backhand cooperative drills.',
    'Rally count competitions. Team relay with BH emphasis.'
  ],
  3: [
    'Serve introduction — same motion concept. Place don\'t toss. Shadow work → ball work.',
    'Serve accuracy to large targets. High-to-Low continuity. Confidence Arithmetic intro.',
    'Serve + rally combination. Serve then play the point. Streak counting.',
    'Serve target competitions. Team serving challenges.',
    'Serve and rally games. Competitive points starting with serve.'
  ],
  4: [
    'Arrow Alignment + Two Laws full integration. Live ball with geometry focus.',
    'Full session focused on contact quality — all strokes. Measurement day for FH, BH streaks.',
    'Phase 1 formal assessment. All metrics measured and recorded.',
    'Live ball rally tournament. Contact geometry coaching throughout.',
    'Fun competitive day — all Phase 1 skills tested through games.'
  ],
  5: [
    'Forehand depth development. Overspin cover introduction. Deep target work.',
    'Forehand pace with accuracy. Live ball forehand weapon building.',
    'Forehand weapon integration. Full-court patterns with forehand focus.',
    'Group forehand depth challenges. Peer competition with targets.',
    'Competitive rallies emphasizing forehand depth and placement.'
  ],
  6: [
    'Serve placement introduction: Wide and Body targets. Confidence Arithmetic applied.',
    'Serve placement: T targets. Pre-serve routine establishment.',
    'Serve + point play. Call placement before serving. Decision-making.',
    'Group serve placement games. Team serve accuracy challenges.',
    'Competitive serve games. Points starting from serve with called placement.'
  ],
  7: [
    'Net approach introduction. Short ball recognition. Approach shot DTL.',
    'Volley contact fundamentals. Split step at net. Closing patterns.',
    'Full approach-volley patterns. 5x sequence challenge.',
    'Group net play games. Partner approach-volley challenges.',
    'Competitive approach-volley games. Points with net play emphasis.'
  ],
  8: [
    'Pattern play: cross-court building to DTL attack. Mistakes Math introduction.',
    'Two-ball pattern play. Decision-making in rally sequences.',
    'Phase 2 formal assessment. All metrics measured and recorded.',
    'Group pattern play challenges. Peer-driven decision games.',
    'Competitive pattern play day — all Phase 2 skills tested through games.'
  ],
  9: [
    'Match situations: pressure points. Play the Ten decision-making.',
    'Pressure point play with BPR on every changeover. Score management.',
    'Full match play with tracking. Unforced error counting introduced.',
    'Group pressure point games. Team-based match situations.',
    'Competitive match play day with full tracking and BPR.'
  ],
  10: [
    'Yellow ball introduction. Swing speed allocation: spin vs. pace.',
    'Yellow ball rally building. Adaptation drills. Contact adjustment.',
    '15-ball yellow ball rally challenge. Full-court yellow ball work.',
    'Group yellow ball games. Peer rallies with yellow ball.',
    'Competitive yellow ball rally challenges and games.'
  ],
  11: [
    'Tournament prep: game plan creation. 85% quality baseline practice.',
    'Execute game plan in practice sets. Decision tracking.',
    'Full practice match with game plan execution. Tournament simulation.',
    'Group tournament simulation. Practice sets with peers.',
    'Competitive tournament day — game plans, sets, pressure.'
  ],
  12: [
    'Full assessment: all stroke metrics measured. PR attempts.',
    'Full assessment: serve, tactical, and mental metrics.',
    'Final assessment day. Yellow ball readiness evaluation. Celebration.',
    'Group celebration day + assessment games.',
    'Final competitive games and achievement ceremony.'
  ],
};

function getDrillsForBlock(blockName: string, weekNumber: number, _sessionIndex: number): DrillAssignment[] {
  const phase = weekNumber <= 4 ? 1 : weekNumber <= 8 ? 2 : 3;
  let selectedDrills: DrillAssignment[] = [];

  if (blockName === 'Ball Control' || blockName === 'Rally Foundation') {
    const ballControlDrills = drills.filter(d => d.skillDomain === 'Ball Control');
    const pick = ballControlDrills[weekNumber % ballControlDrills.length];
    if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 10, notes: pick.targetStandard });
    if (ballControlDrills.length > 1) {
      const pick2 = ballControlDrills[(weekNumber + 1) % ballControlDrills.length];
      if (pick2 && pick2.id !== pick?.id) selectedDrills.push({ drillId: pick2.id, drillName: pick2.name, duration: 5, notes: '' });
    }
  } else if (blockName === 'Technical Work') {
    if (weekNumber <= 2) {
      const moveDrills = drills.filter(d => d.skillDomain === 'Movement');
      const pick = moveDrills[weekNumber % moveDrills.length];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 10, notes: pick.targetStandard });
      const bcDrills = drills.filter(d => d.skillDomain === 'Ball Control');
      const pick2 = bcDrills[(weekNumber + 2) % bcDrills.length];
      if (pick2) selectedDrills.push({ drillId: pick2.id, drillName: pick2.name, duration: 10, notes: '' });
    } else if (weekNumber <= 4) {
      const serveDrills = drills.filter(d => d.skillDomain === 'Serve');
      const pick = serveDrills[(weekNumber - 3) % serveDrills.length];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 10, notes: pick.targetStandard });
      const pick2 = serveDrills[(weekNumber - 2) % serveDrills.length];
      if (pick2 && pick2.id !== pick?.id) selectedDrills.push({ drillId: pick2.id, drillName: pick2.name, duration: 10, notes: '' });
    } else {
      const tacticalDrills = drills.filter(d => d.skillDomain === 'Tactical');
      const pick = tacticalDrills[weekNumber % tacticalDrills.length];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 15, notes: pick.targetStandard });
    }
  } else if (blockName === 'Live Ball Tactical' || blockName === 'Live Ball / Tactical') {
    if (phase === 1) {
      const bcDrills = drills.filter(d => d.skillDomain === 'Ball Control');
      const pick = bcDrills[(weekNumber + 3) % bcDrills.length];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 15, notes: 'Live ball focus' });
    } else {
      const tacticalDrills = drills.filter(d => d.skillDomain === 'Tactical');
      const pick = tacticalDrills[(weekNumber + 1) % tacticalDrills.length];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 15, notes: pick.targetStandard });
    }
  } else if (blockName === 'Competitive Play' || blockName === 'Competitive Games') {
    if (phase >= 2) {
      const compDrills = drills.filter(d => d.skillDomain === 'Competitive');
      const pick = compDrills[weekNumber % compDrills.length];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 15, notes: pick.targetStandard });
    } else {
      selectedDrills.push({ drillId: 'SRQ-DR-020', drillName: 'King of the Court', duration: 15, notes: 'Adapted for Phase 1 level' });
    }
  } else if (blockName === 'Athletic Movement (ABC)') {
    const moveDrills = drills.filter(d => d.skillDomain === 'Movement');
    const pick = moveDrills[weekNumber % moveDrills.length];
    if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 10, notes: '' });
  }

  if (weekNumber === 4 || weekNumber === 8 || weekNumber === 12) {
    const assessDrills = drills.filter(d => d.skillDomain === 'Assessment');
    if (assessDrills.length > 0) {
      const existing = selectedDrills.map(d => d.drillId);
      const pick = assessDrills.find(d => !existing.includes(d.id));
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 15, notes: 'Assessment drill' });
    }
  }

  return selectedDrills;
}

function getPillarForWeek(weekNumber: number): string {
  if (weekNumber <= 2) return 'Accuracy Before Pace';
  if (weekNumber <= 4) return 'Technique as Geometry';
  if (weekNumber <= 6) return 'Confidence Through Evidence';
  if (weekNumber <= 8) return 'Live Ball Learning';
  if (weekNumber <= 10) return 'Channel Competitive Emotion';
  return 'Confidence Through Evidence';
}

function getDateForSession(weekStart: string, sessionIndex: number): string {
  const start = new Date(weekStart);
  const dayOffsets = [0, 2, 4, 1, 3];
  const offset = dayOffsets[sessionIndex] || 0;
  const d = new Date(start);
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

export function generateAllLessonPlans(): LessonPlan[] {
  const plans: LessonPlan[] = [];

  for (const week of weeks) {
    for (let sessionIndex = 0; sessionIndex < 5; sessionIndex++) {
      const isPrivate = sessionIndex < 3;
      const sessionType = isPrivate ? 'private' as const : 'group' as const;
      const duration = isPrivate ? 120 : 90;
      const blockTemplates = isPrivate ? PRIVATE_BLOCKS : GROUP_BLOCKS;
      const descriptions = weekSessionDescriptions[week.weekNumber] || [];

      const blocks: LessonBlock[] = blockTemplates.map((bt, i) => ({
        id: nanoid(),
        name: bt.name,
        blockNumber: i + 1,
        duration: bt.duration,
        focus: bt.focus,
        drills: getDrillsForBlock(bt.name, week.weekNumber, sessionIndex),
      }));

      const plan: LessonPlan = {
        id: `lp-w${week.weekNumber}-s${sessionIndex + 1}`,
        weekNumber: week.weekNumber,
        phaseNumber: week.phaseNumber,
        sessionType,
        sessionNumber: sessionIndex + 1,
        date: getDateForSession(week.startDate, sessionIndex),
        duration,
        location: isPrivate ? 'Potter Park' : 'Pineview School',
        theme: descriptions[sessionIndex] || week.tennisFocusTheme,
        pillarFocus: getPillarForWeek(week.weekNumber),
        objectives: [week.tennisFocusTheme, week.abcFocusTheme],
        equipment: ['Cones', 'Targets', 'Red/Orange Balls', 'Mini Net'],
        blocks,
        coachingCues: [],
        progressions: '',
        regressions: '',
        status: 'planned',
      };

      plans.push(plan);
    }
  }

  return plans;
}
