import { LessonPlan, LessonBlock, DrillAssignment } from '../types';
import { weeks } from '../data/seed/training-plan';
import { drills } from '../data/seed/drills';
import { nanoid } from 'nanoid';

// Real 2-hour private session structure (matches actual session plans)
// ABC Athletic Development (30 min) = RAMP warm-up + athletic movement
// Tennis Skill Development (45 min) = 3 progressive drills
// Live Ball / Competition (30 min) = point play + competitive games
// Serve Work (15 min) = dedicated serve block
// Cool-Down & Reflection (5 min) = numbers review + evidence check
const PRIVATE_BLOCKS = [
  { name: 'ABC Athletic Development', duration: 30, focus: 'RAMP warm-up (joint mobility -> muscle activation -> athletic movement) + ABC athletic development (agility, balance, speed, coordination). Joint cleaning bottom-to-top: ankles, hips, thoracic spine, shoulders, wrists.' },
  { name: 'Tennis Skill Development', duration: 45, focus: '3 progressive drills aligned to weekly theme. Targets always present. Two Laws enforced: center contact + square face. Arrow Alignment: face it, then chase it.' },
  { name: 'Live Ball / Competition', duration: 30, focus: 'Live ball rallies, point play, competitive games. Pattern play with decision-making. BPR on every point. Mistakes Math applied.' },
  { name: 'Serve Work', duration: 15, focus: 'Same motion both serves. Place don\'t toss. Accuracy to targets. Confidence Arithmetic: "one of two" is nearly guaranteed.' },
  { name: 'Cool-Down & Reflection', duration: 5, focus: 'What did you prove today? Show the numbers. Stretch + cool-down. Player leaves with evidence, not opinions.' },
];

// Real 1.5-hour group session structure
const GROUP_BLOCKS = [
  { name: 'ABC Athletic Development', duration: 25, focus: 'RAMP warm-up (joint mobility -> activation -> movement) + group ABC games: relay races, cone tag, partner reaction drills. Competitive energy from peers.' },
  { name: 'Rally Foundation', duration: 20, focus: 'Cross-court rally building, depth targets, rally counting. Cooperative first, then competitive. Two Laws enforced. Coaching hierarchy: direction -> height -> depth -> spin -> power.' },
  { name: 'Live Ball / Tactical', duration: 20, focus: 'Pattern play with peers, decision-making in live rallies. Real match scenarios. Players push each other.' },
  { name: 'Competitive Games', duration: 20, focus: 'King of the Court, team challenges, serve competitions. Mistakes Math scoring. Pressure with peers. BPR required.' },
  { name: 'Reflection', duration: 5, focus: 'Success challenge: what worked? What is your best number today? End with visible proof.' },
];

// ABC Athletic Development focus per week
const abcFocusPerWeek: Record<number, string> = {
  1: 'RAMP warm-up + ladder agility + single-leg balance challenges. Track balance hold time.',
  2: 'RAMP warm-up + cone reaction drills + hand-eye coordination (2-ball juggle, ball toss patterns).',
  3: 'RAMP warm-up + speed starts (5-10m) + directional change drills. Split step reaction games.',
  4: 'RAMP warm-up + balance challenges under movement + lateral shuffle speed test. Phase 1 ABC assessment.',
  5: 'RAMP warm-up + explosive first step drills + agility combos. First-step quickness measured.',
  6: 'RAMP warm-up + multi-directional speed + coordination combos (footwork + catch).',
  7: 'RAMP warm-up + quick feet + deceleration control + dynamic balance.',
  8: 'RAMP warm-up + acceleration/deceleration patterns + agility. Phase 2 ABC assessment.',
  9: 'RAMP warm-up + match-specific movement patterns + rally-recovery movement.',
  10: 'RAMP warm-up + power movements + coordination combos (movement + stroke timing).',
  11: 'RAMP warm-up + speed endurance (repeated sprints) + recovery movement patterns.',
  12: 'RAMP warm-up + full ABC battery test. All components measured and recorded.',
};

// Week-by-week session descriptions (3 private + 2 group per week)
const weekSessionDescriptions: Record<number, string[]> = {
  1: [
    'Footwork foundation — split step timing, ready position, first-step quickness. Forehand spacing: arm\'s distance contact point. "Push on my hand" feeling.',
    'Arrow Alignment introduction with forehand. Contact geometry: center contact + square face. Live ball rallies with footwork emphasis.',
    'Cross-court forehand rally building. Forehand spacing under live ball. Streak counting — track best rally.',
    'Footwork games + rally building with peers. Split step competition: who can split on every ball?',
    'Competitive rally games. King of the Court with footwork emphasis. Rally counting competition.',
  ],
  2: [
    'Backhand grip shadow work -> live ball. Grip-find time trials (target: < 2 sec). Cross-court BH rally targets.',
    'Combined FH/BH rally building. Contact geometry: Two Laws focus. Coaching hierarchy: direction -> height -> depth.',
    'Full rally sessions — rally consistency as the measure. Backhand grip speed under pressure.',
    'Partner rally challenges. Backhand cooperative drills with peers.',
    'Rally count competitions. Team relay with BH emphasis. Best streak wins.',
  ],
  3: [
    'Serve introduction — same motion both serves. Place don\'t toss. Toss targeting. Shadow work -> ball work.',
    'Serve accuracy to large targets. High-to-Low continuity. Confidence Arithmetic: "one of two" is nearly guaranteed.',
    'Topspin development — brush up over the ball. Compact backswing: "Keep racket where you can see it." Cross-court topspin rallies.',
    'Serve target competitions with peers. Team serving challenges.',
    'Serve + rally games. BPR introduction in competitive points. Reset routine practice.',
  ],
  4: [
    'Arrow Alignment + Two Laws full integration. Live ball with contact geometry focus. All strokes measured.',
    'Phase 1 formal assessment — FH streak, BH streak, serve accuracy, split step consistency, grip speed.',
    'Assessment follow-up: PR attempts on any metric. Topspin rally work. Compact backswing enforcement.',
    'Live ball rally tournament with peers. Contact geometry coaching throughout.',
    'Fun competitive day — all Phase 1 skills tested through games. Celebration of PRs.',
  ],
  5: [
    'Forehand depth development. Overspin cover introduction: contact above the ball\'s equator. Deep target work past service line.',
    'Forehand pace with accuracy. Live ball forehand weapon building. "No flat balls" — topspin on every ball.',
    'Forehand weapon integration. Full-court patterns. "Earn the Right" drill: 3 cross-court before DTL.',
    'Group forehand depth challenges. Peer competition with depth targets.',
    'Competitive rallies emphasizing forehand depth and placement. Streak counting.',
  ],
  6: [
    'Serve placement introduction: Wide and Body targets. Confidence Arithmetic reinforced. Pre-serve routine.',
    'Serve placement: T targets + deuce/ad side accuracy. 4-zone serve ladder.',
    'Serve + point play. Call placement before serving. Decision-making under pressure.',
    'Group serve placement games. Team serve accuracy challenges.',
    'Competitive serve games. Points starting from serve with called placement. "One of Two" game.',
  ],
  7: [
    'Net approach introduction. Short ball recognition. Approach shot DTL then split at net.',
    'Volley contact fundamentals. Split step at net. Closing patterns. Approach-volley sequences.',
    'Full approach-volley patterns. 5x sequence challenge. Live ball transitions to net.',
    'Group net play games. Partner approach-volley challenges.',
    'Competitive approach-volley games. Points with net play emphasis. King of the Net.',
  ],
  8: [
    'Pattern play: cross-court building to DTL attack. "Earn the Right" pattern. Mistakes Math introduction.',
    'Two-ball pattern play. Decision-making in rally sequences. Play the Ten, not the Five.',
    'Phase 2 formal assessment — all metrics measured. PR attempts. Tactical decision tracking.',
    'Group pattern play challenges. Peer-driven decision games.',
    'Competitive pattern play day — all Phase 2 skills tested through games.',
  ],
  9: [
    'Match situations: pressure points starting 3-5 down. Play the Ten decision-making. BPR every point.',
    'Pressure point play with BPR on every changeover. Score management. Unforced error tracking.',
    'Full match play with tracking sheet. UE count, BPR usage, tactical decisions scored.',
    'Group pressure point games. Team-based match situations.',
    'Competitive match play day with full tracking and BPR enforcement.',
  ],
  10: [
    'Yellow ball introduction. Swing speed allocation: spin vs. pace. Contact adjustment drills.',
    'Yellow ball rally building. Adaptation drills. Depth and height window work with yellow ball.',
    '15-ball yellow ball rally challenge. Full-court yellow ball work. Streak counting.',
    'Group yellow ball games. Peer rallies with yellow ball.',
    'Competitive yellow ball rally challenges. Mixed ball games.',
  ],
  11: [
    'Tournament prep: game plan creation. 85% quality baseline practice. Drill-to-point transfer work.',
    'Execute game plan in practice sets. Decision tracking. BPR mandatory every point.',
    'Full practice match with game plan execution. Tournament simulation. Confidence loading.',
    'Group tournament simulation. Practice sets with peers.',
    'Competitive tournament day — game plans, sets, pressure. Celebration of growth.',
  ],
  12: [
    'Full assessment: all stroke metrics measured. FH streak, BH streak, volley streak. PR attempts.',
    'Full assessment: serve accuracy (4 zones), tactical decisions, BPR usage, UE count.',
    'Final assessment day. Yellow ball readiness evaluation. All numbers recorded. Celebration.',
    'Group celebration day + assessment games with peers.',
    'Final competitive games and achievement ceremony. Evidence review: where we started vs. where we are.',
  ],
};

// Drill assignments per block per week — aligned to actual session structure
function getDrillsForBlock(blockName: string, weekNumber: number, sessionIndex: number): DrillAssignment[] {
  const phase = weekNumber <= 4 ? 1 : weekNumber <= 8 ? 2 : 3;
  const selectedDrills: DrillAssignment[] = [];

  if (blockName === 'Tennis Skill Development') {
    // 3 progressive drills per session based on weekly theme
    const drillSets = getTennisSkillDrills(weekNumber, sessionIndex);
    return drillSets;
  }

  if (blockName === 'Rally Foundation') {
    // Group sessions: rally building drills
    const rallyDrills = drills.filter(d => d.skillDomain === 'Ball Control');
    const idx = (weekNumber + sessionIndex) % rallyDrills.length;
    const pick = rallyDrills[idx];
    if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 10, notes: pick.targetStandard });
    const idx2 = (weekNumber + sessionIndex + 2) % rallyDrills.length;
    const pick2 = rallyDrills[idx2];
    if (pick2 && pick2.id !== pick?.id) selectedDrills.push({ drillId: pick2.id, drillName: pick2.name, duration: 10, notes: '' });
    return selectedDrills;
  }

  if (blockName === 'Live Ball / Competition' || blockName === 'Live Ball / Tactical') {
    if (phase === 1) {
      // Phase 1: rally-based live ball with targets
      const pick = drills.find(d => d.id === 'SRQ-DR-002'); // Crosscourt Track
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 15, notes: 'Live ball — rally with targets, then add scoring' });
      if (weekNumber >= 3) {
        selectedDrills.push({ drillId: 'SRQ-DR-021', drillName: 'Between Point Routine', duration: 10, notes: 'BPR on every point in competitive rallies' });
      }
    } else if (phase === 2) {
      const tacticalDrills = drills.filter(d => d.skillDomain === 'Tactical');
      const pick = tacticalDrills[(weekNumber + sessionIndex) % tacticalDrills.length];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 15, notes: pick.targetStandard });
      selectedDrills.push({ drillId: 'SRQ-DR-021', drillName: 'Between Point Routine', duration: 10, notes: 'BPR mandatory every point' });
    } else {
      const compDrills = drills.filter(d => d.skillDomain === 'Competitive');
      const pick = compDrills[(weekNumber + sessionIndex) % compDrills.length];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 15, notes: pick.targetStandard });
      selectedDrills.push({ drillId: 'SRQ-DR-021', drillName: 'Between Point Routine', duration: 10, notes: 'BPR + UE tracking every set' });
    }
    return selectedDrills;
  }

  if (blockName === 'Competitive Games') {
    if (phase >= 2) {
      const compDrills = drills.filter(d => d.skillDomain === 'Competitive');
      const pick = compDrills[(weekNumber + sessionIndex) % compDrills.length];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 15, notes: pick.targetStandard });
    } else {
      selectedDrills.push({ drillId: 'SRQ-DR-020', drillName: 'King of the Court', duration: 15, notes: 'Adapted for Phase 1 — rally-based scoring' });
    }
    return selectedDrills;
  }

  if (blockName === 'Serve Work') {
    const serveDrills = drills.filter(d => d.skillDomain === 'Serve');
    if (phase === 1) {
      // Phase 1: rhythm and basic accuracy
      if (weekNumber <= 2) {
        const pick = drills.find(d => d.id === 'SRQ-DR-011'); // Toss Rhythm
        if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 10, notes: 'Smooth toss, same motion' });
      } else {
        const pick = drills.find(d => d.id === 'SRQ-DR-009'); // Target Ladder
        if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 10, notes: '4-zone accuracy: deuce wide, deuce T, ad wide, ad T' });
      }
    } else if (phase === 2) {
      // Phase 2: placement + Confidence Arithmetic
      const idx = (weekNumber + sessionIndex) % serveDrills.length;
      const pick = serveDrills[idx];
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 10, notes: 'Call placement before serving' });
    } else {
      // Phase 3: pressure serves
      const pick = drills.find(d => d.id === 'SRQ-DR-010'); // One of Two
      if (pick) selectedDrills.push({ drillId: pick.id, drillName: pick.name, duration: 10, notes: '"One of Two" game — pressure serves at 30-40' });
    }
    return selectedDrills;
  }

  // Assessment weeks: add assessment drills
  if (weekNumber === 4 || weekNumber === 8 || weekNumber === 12) {
    const assessDrills = drills.filter(d => d.skillDomain === 'Assessment');
    if (assessDrills.length > 0 && sessionIndex === 2) {
      // Assessment day is session 3 of the week
      for (const ad of assessDrills) {
        selectedDrills.push({ drillId: ad.id, drillName: ad.name, duration: 15, notes: 'Assessment — record all numbers' });
      }
    }
  }

  return selectedDrills;
}

// 3 progressive drills per Tennis Skill Development block
function getTennisSkillDrills(weekNumber: number, sessionIndex: number): DrillAssignment[] {
  const result: DrillAssignment[] = [];

  // Week 1: Footwork + forehand spacing
  if (weekNumber === 1) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-008', drillName: 'Split Step Chase', duration: 15, notes: 'Split step timing — land light, push first step' });
      result.push({ drillId: 'SRQ-DR-001', drillName: 'Mini Rally Track', duration: 15, notes: 'Contact quality at arm\'s distance' });
      result.push({ drillId: 'SRQ-DR-006', drillName: 'Contact and Recover', duration: 15, notes: 'Move, hit, recover to home base' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-008', drillName: 'Split Step Chase', duration: 10, notes: 'Split step reaction — eyes early' });
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 20, notes: 'Arrow Alignment: face it, then chase it' });
      result.push({ drillId: 'SRQ-DR-003', drillName: 'Height Window Rally', duration: 15, notes: 'Forehand spacing focus — arm\'s distance' });
    } else {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Cross-court forehand rally — streak counting' });
      result.push({ drillId: 'SRQ-DR-004', drillName: 'Depth Window Rally', duration: 15, notes: 'Depth targets past service line' });
      result.push({ drillId: 'SRQ-DR-006', drillName: 'Contact and Recover', duration: 15, notes: 'Footwork under live ball conditions' });
    }
  }
  // Week 2: Backhand grip automation + rally building
  else if (weekNumber === 2) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Backhand cross-court — grip-find time trials' });
      result.push({ drillId: 'SRQ-DR-003', drillName: 'Height Window Rally', duration: 15, notes: 'BH height window — brush up, clear high' });
      result.push({ drillId: 'SRQ-DR-004', drillName: 'Depth Window Rally', duration: 15, notes: 'Combined FH/BH rally building' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-001', drillName: 'Mini Rally Track', duration: 10, notes: 'Contact geometry warm-up — Two Laws' });
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 20, notes: 'FH/BH alternating cross-court' });
      result.push({ drillId: 'SRQ-DR-005', drillName: 'Wall Rhythm Two Bounce', duration: 15, notes: 'Backhand grip speed under rally pressure' });
    } else {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Full rally consistency — best streak' });
      result.push({ drillId: 'SRQ-DR-004', drillName: 'Depth Window Rally', duration: 15, notes: 'BH depth targets' });
      result.push({ drillId: 'SRQ-DR-007', drillName: 'Wide Ball Recover', duration: 15, notes: 'Crossover to wide backhand, recover' });
    }
  }
  // Week 3: Serve rhythm + topspin development + BPR intro
  else if (weekNumber === 3) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-011', drillName: 'Toss Rhythm Serve', duration: 15, notes: 'Same motion concept — place don\'t toss' });
      result.push({ drillId: 'SRQ-DR-009', drillName: 'Serve Target Ladder', duration: 15, notes: 'Accuracy to 4 zones' });
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Topspin cross-court — no flat balls' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-009', drillName: 'Serve Target Ladder', duration: 15, notes: 'High-to-Low continuity + Confidence Arithmetic' });
      result.push({ drillId: 'SRQ-DR-010', drillName: 'One of Two Serve', duration: 10, notes: '"One of two" — same motion both serves' });
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 20, notes: 'Topspin rally — compact backswing: "keep racket where you can see it"' });
    } else {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Topspin cross-court — "Earn the Right" (3 CC before DTL)' });
      result.push({ drillId: 'SRQ-DR-022', drillName: 'Bounce-Hit Focus Reset', duration: 15, notes: 'Focus tracking — say "bounce" and "hit"' });
      result.push({ drillId: 'SRQ-DR-021', drillName: 'Between Point Routine', duration: 15, notes: 'BPR introduction — breathe, turn, strings, target, go' });
    }
  }
  // Week 4: Contact geometry + Phase 1 assessment
  else if (weekNumber === 4) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Arrow Alignment + Two Laws full integration' });
      result.push({ drillId: 'SRQ-DR-003', drillName: 'Height Window Rally', duration: 15, notes: 'Height + depth combo — geometry focus' });
      result.push({ drillId: 'SRQ-DR-007', drillName: 'Wide Ball Recover', duration: 15, notes: 'Contact geometry under movement' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'FH streak measurement — PR attempt' });
      result.push({ drillId: 'SRQ-DR-004', drillName: 'Depth Window Rally', duration: 15, notes: 'BH streak measurement — PR attempt' });
      result.push({ drillId: 'SRQ-DR-008', drillName: 'Split Step Chase', duration: 15, notes: 'Split step consistency test' });
    } else {
      // Assessment day
      result.push({ drillId: 'SRQ-DR-023', drillName: 'Crosscourt Rally Test', duration: 15, notes: 'Phase 1 Assessment — FH and BH streaks' });
      result.push({ drillId: 'SRQ-DR-024', drillName: 'Serve Accuracy Test', duration: 15, notes: 'Phase 1 Assessment — serve accuracy 4 zones' });
      result.push({ drillId: 'SRQ-DR-025', drillName: 'Match Play Assessment', duration: 15, notes: 'Phase 1 Assessment — all numbers recorded' });
    }
  }
  // Week 5: Forehand weapon — depth + overspin
  else if (weekNumber === 5) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-004', drillName: 'Depth Window Rally', duration: 15, notes: 'FH depth — overspin cover: contact above equator' });
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Deep cross-court with topspin — past service line' });
      result.push({ drillId: 'SRQ-DR-003', drillName: 'Height Window Rally', duration: 15, notes: 'Topspin height window — margin for depth' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: '"No flat balls" — topspin on every ball' });
      result.push({ drillId: 'SRQ-DR-004', drillName: 'Depth Window Rally', duration: 15, notes: 'FH pace with accuracy — 8/10 past service line' });
      result.push({ drillId: 'SRQ-DR-015', drillName: 'Crosscourt to Open Court', duration: 15, notes: '"Earn the Right" — 3 CC then change direction' });
    } else {
      result.push({ drillId: 'SRQ-DR-015', drillName: 'Crosscourt to Open Court', duration: 20, notes: 'Full-court patterns with FH weapon' });
      result.push({ drillId: 'SRQ-DR-004', drillName: 'Depth Window Rally', duration: 15, notes: 'FH depth integration under pressure' });
      result.push({ drillId: 'SRQ-DR-006', drillName: 'Contact and Recover', duration: 10, notes: 'Recovery after weapon shots' });
    }
  }
  // Week 6: Serve placement + Confidence Arithmetic
  else if (weekNumber === 6) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-009', drillName: 'Serve Target Ladder', duration: 15, notes: 'Wide and Body targets — call before serving' });
      result.push({ drillId: 'SRQ-DR-010', drillName: 'One of Two Serve', duration: 15, notes: 'Confidence Arithmetic — same motion both serves' });
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Serve + rally point play' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-009', drillName: 'Serve Target Ladder', duration: 15, notes: 'T targets — deuce and ad side accuracy' });
      result.push({ drillId: 'SRQ-DR-012', drillName: 'Second Serve Trust Set', duration: 15, notes: 'Full commitment second serves with routine' });
      result.push({ drillId: 'SRQ-DR-019', drillName: 'First Strike Set', duration: 15, notes: 'Serve + 1 pattern play' });
    } else {
      result.push({ drillId: 'SRQ-DR-009', drillName: 'Serve Target Ladder', duration: 10, notes: 'Call placement before every serve' });
      result.push({ drillId: 'SRQ-DR-013', drillName: 'Block Return Window', duration: 15, notes: 'Return accuracy to deep targets' });
      result.push({ drillId: 'SRQ-DR-019', drillName: 'First Strike Set', duration: 20, notes: 'Serve-plus-one or return-plus-one' });
    }
  }
  // Week 7: Net approach + volley
  else if (weekNumber === 7) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-016', drillName: 'Approach and Finish', duration: 20, notes: 'Short ball recognition → approach DTL → split at net' });
      result.push({ drillId: 'SRQ-DR-015', drillName: 'Crosscourt to Open Court', duration: 15, notes: 'Build rally then approach on short ball' });
      result.push({ drillId: 'SRQ-DR-006', drillName: 'Contact and Recover', duration: 10, notes: 'Net movement patterns' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-016', drillName: 'Approach and Finish', duration: 20, notes: 'Volley contact fundamentals — split step at net' });
      result.push({ drillId: 'SRQ-DR-017', drillName: 'Two-Ball Pattern Play', duration: 15, notes: 'Approach + volley sequences' });
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 10, notes: 'Rally building before approach opportunity' });
    } else {
      result.push({ drillId: 'SRQ-DR-016', drillName: 'Approach and Finish', duration: 15, notes: '5x approach-volley sequence challenge' });
      result.push({ drillId: 'SRQ-DR-015', drillName: 'Crosscourt to Open Court', duration: 15, notes: 'Live ball transitions to net' });
      result.push({ drillId: 'SRQ-DR-018', drillName: 'Pressure Point Play', duration: 15, notes: 'Points with net play emphasis' });
    }
  }
  // Week 8: Pattern play + Phase 2 assessment
  else if (weekNumber === 8) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-015', drillName: 'Crosscourt to Open Court', duration: 15, notes: '"Earn the Right" — CC until short then change direction' });
      result.push({ drillId: 'SRQ-DR-017', drillName: 'Two-Ball Pattern Play', duration: 15, notes: 'Two-shot sequences — plan before the feed' });
      result.push({ drillId: 'SRQ-DR-022', drillName: 'Bounce-Hit Focus Reset', duration: 15, notes: 'Mistakes Math — was that miss worth 3 points?' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-017', drillName: 'Two-Ball Pattern Play', duration: 15, notes: 'Play the Ten, not the Five — decision quality' });
      result.push({ drillId: 'SRQ-DR-016', drillName: 'Approach and Finish', duration: 15, notes: 'Pattern integration — rally → approach → finish' });
      result.push({ drillId: 'SRQ-DR-018', drillName: 'Pressure Point Play', duration: 15, notes: 'Pressure points with BPR' });
    } else {
      result.push({ drillId: 'SRQ-DR-023', drillName: 'Crosscourt Rally Test', duration: 15, notes: 'Phase 2 Assessment — FH and BH streaks' });
      result.push({ drillId: 'SRQ-DR-024', drillName: 'Serve Accuracy Test', duration: 15, notes: 'Phase 2 Assessment — serve accuracy 4 zones' });
      result.push({ drillId: 'SRQ-DR-025', drillName: 'Match Play Assessment', duration: 15, notes: 'Phase 2 Assessment — tactical decisions scored' });
    }
  }
  // Week 9: Match situations + pressure
  else if (weekNumber === 9) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-018', drillName: 'Pressure Point Play', duration: 20, notes: 'Start 3-5 down — must come back. BPR every point.' });
      result.push({ drillId: 'SRQ-DR-015', drillName: 'Crosscourt to Open Court', duration: 15, notes: 'Play the Ten — highest quality shot your setup supports' });
      result.push({ drillId: 'SRQ-DR-021', drillName: 'Between Point Routine', duration: 10, notes: 'BPR on every changeover' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-018', drillName: 'Pressure Point Play', duration: 15, notes: 'Score management — track UE count' });
      result.push({ drillId: 'SRQ-DR-019', drillName: 'First Strike Set', duration: 15, notes: 'Serve + 1 under pressure' });
      result.push({ drillId: 'SRQ-DR-022', drillName: 'Bounce-Hit Focus Reset', duration: 15, notes: 'Focus under competitive pressure' });
    } else {
      result.push({ drillId: 'SRQ-DR-025', drillName: 'Match Play Assessment', duration: 20, notes: 'Full match — UE tracking + BPR usage + decision scoring' });
      result.push({ drillId: 'SRQ-DR-018', drillName: 'Pressure Point Play', duration: 15, notes: 'Tiebreak situations' });
      result.push({ drillId: 'SRQ-DR-021', drillName: 'Between Point Routine', duration: 10, notes: 'BPR integration assessment' });
    }
  }
  // Week 10: Yellow ball adaptation
  else if (weekNumber === 10) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-001', drillName: 'Mini Rally Track', duration: 15, notes: 'Yellow ball introduction — contact adjustment' });
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Yellow ball cross-court — swing speed allocation' });
      result.push({ drillId: 'SRQ-DR-003', drillName: 'Height Window Rally', duration: 15, notes: 'Yellow ball height window — more spin needed' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Yellow ball rally building — spin vs. pace balance' });
      result.push({ drillId: 'SRQ-DR-004', drillName: 'Depth Window Rally', duration: 15, notes: 'Yellow ball depth adaptation' });
      result.push({ drillId: 'SRQ-DR-015', drillName: 'Crosscourt to Open Court', duration: 15, notes: 'Yellow ball pattern play' });
    } else {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: '15-ball yellow ball rally challenge' });
      result.push({ drillId: 'SRQ-DR-004', drillName: 'Depth Window Rally', duration: 15, notes: 'Yellow ball full-court depth' });
      result.push({ drillId: 'SRQ-DR-018', drillName: 'Pressure Point Play', duration: 15, notes: 'Yellow ball competitive points' });
    }
  }
  // Week 11: Tournament prep
  else if (weekNumber === 11) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: '85% quality baseline — consistent quality, not heroics' });
      result.push({ drillId: 'SRQ-DR-015', drillName: 'Crosscourt to Open Court', duration: 15, notes: 'Game plan execution — Play the Ten' });
      result.push({ drillId: 'SRQ-DR-017', drillName: 'Two-Ball Pattern Play', duration: 15, notes: 'Drill-to-point transfer work' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-018', drillName: 'Pressure Point Play', duration: 15, notes: 'Practice set — game plan execution + BPR' });
      result.push({ drillId: 'SRQ-DR-019', drillName: 'First Strike Set', duration: 15, notes: 'Serve patterns in match context' });
      result.push({ drillId: 'SRQ-DR-021', drillName: 'Between Point Routine', duration: 15, notes: 'BPR mandatory — confidence loading' });
    } else {
      result.push({ drillId: 'SRQ-DR-025', drillName: 'Match Play Assessment', duration: 20, notes: 'Tournament simulation — full match with tracking' });
      result.push({ drillId: 'SRQ-DR-018', drillName: 'Pressure Point Play', duration: 15, notes: 'Pressure situations — start down in score' });
      result.push({ drillId: 'SRQ-DR-009', drillName: 'Serve Target Ladder', duration: 10, notes: 'Confidence-loading serve accuracy' });
    }
  }
  // Week 12: Full assessment
  else if (weekNumber === 12) {
    if (sessionIndex === 0) {
      result.push({ drillId: 'SRQ-DR-023', drillName: 'Crosscourt Rally Test', duration: 20, notes: 'Final Assessment — FH streak, BH streak PR attempts' });
      result.push({ drillId: 'SRQ-DR-002', drillName: 'Crosscourt Track', duration: 15, notes: 'Volley streak measurement' });
      result.push({ drillId: 'SRQ-DR-008', drillName: 'Split Step Chase', duration: 10, notes: 'Split step consistency final test' });
    } else if (sessionIndex === 1) {
      result.push({ drillId: 'SRQ-DR-024', drillName: 'Serve Accuracy Test', duration: 20, notes: 'Final Assessment — 4-zone serve accuracy' });
      result.push({ drillId: 'SRQ-DR-025', drillName: 'Match Play Assessment', duration: 15, notes: 'Final Assessment — tactical + mental + BPR' });
      result.push({ drillId: 'SRQ-DR-021', drillName: 'Between Point Routine', duration: 10, notes: 'BPR usage final assessment' });
    } else {
      result.push({ drillId: 'SRQ-DR-023', drillName: 'Crosscourt Rally Test', duration: 15, notes: 'Final PR attempts — all strokes' });
      result.push({ drillId: 'SRQ-DR-024', drillName: 'Serve Accuracy Test', duration: 15, notes: 'Yellow ball serve accuracy' });
      result.push({ drillId: 'SRQ-DR-025', drillName: 'Match Play Assessment', duration: 15, notes: 'Yellow ball readiness evaluation — celebration!' });
    }
  }

  return result;
}

function getPillarForWeek(weekNumber: number): string {
  if (weekNumber <= 2) return 'Accuracy Before Everything';
  if (weekNumber <= 3) return 'Technique Is Geometry';
  if (weekNumber <= 4) return 'Confidence Is Built, Not Given';
  if (weekNumber <= 6) return 'Conditioning in the Right Order';
  if (weekNumber <= 8) return 'Live Ball Is the Method';
  if (weekNumber <= 10) return 'Channel the Fire';
  return 'Confidence Is Built, Not Given';
}

function getDateForSession(weekStart: string, sessionIndex: number): string {
  const start = new Date(weekStart + 'T12:00:00');
  // Mon, Wed, Fri = private; Tue, Thu = group
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

      const blocks: LessonBlock[] = blockTemplates.map((bt, i) => {
        const blockDrills = getDrillsForBlock(bt.name, week.weekNumber, sessionIndex);

        // Customize ABC block focus per week
        let focus = bt.focus;
        if (bt.name === 'ABC Athletic Development') {
          focus = abcFocusPerWeek[week.weekNumber] || bt.focus;
        }

        return {
          id: nanoid(),
          name: bt.name,
          blockNumber: i + 1,
          duration: bt.duration,
          focus,
          drills: blockDrills,
        };
      });

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
        equipment: ['Cones', 'Targets', 'Red/Orange Balls', 'Mini Net', 'Mini Bands'],
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
