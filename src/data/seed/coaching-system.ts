import { Pillar, ResearchConcept, Framework, CoachingCue, PracticeItem } from '../../types';

export const pillars: Pillar[] = [
  {
    number: 1, name: 'Accuracy Before Everything',
    tagline: 'Accuracy creates confidence. Confidence creates speed. Speed creates weapons.',
    description: 'Every drill starts with accuracy targets. Speed is earned by proving control first. If you cannot hit the target slowly, you cannot hit it fast. Every session tracks numbers.',
    applicationExamples: ['Targets present in every drill', 'Streak counting before pace increase', 'Accuracy percentage tracked every session', '"You are a rifle, not a shotgun. Pick your target."']
  },
  {
    number: 2, name: 'Live Ball Is the Method',
    tagline: 'Real skill is reading incoming balls that dip, kick, and skid.',
    description: 'The majority of court time is live ball. Fed drills are scaffolding — the goal is always to get to live rally situations where players must read, react, and decide. No ball machine teaches you to read the game.',
    applicationExamples: ['Transition from fed ball to live within each block', 'Rally counting as primary metric', 'Pattern play in live ball conditions', 'Live ball starts within first 15 minutes of tennis work']
  },
  {
    number: 3, name: 'Technique Is Geometry',
    tagline: 'Two things determine where a ball goes: where the racket face points and the direction it moves through the ball.',
    description: 'We coach the contact, not the choreography. Two Laws of reliable ball-striking: center contact + square face. Everything else serves these two jobs. Arrow Alignment: face it, then chase it.',
    applicationExamples: ['Arrow Alignment cues in every technical block', 'Contact geometry focus over swing path', 'Face direction drills', '"It is not about your backswing. It is about what happens at contact."']
  },
  {
    number: 4, name: 'Confidence Is Built, Not Given',
    tagline: 'We never say "Great job!" without proof. We say "You hit 7 out of 10. Yesterday it was 4."',
    description: 'Confidence comes from evidence — tracked numbers, PR records, visible improvement. The Confidence Chain: Practice Accuracy -> See Results -> Trust Results -> Swing with Conviction. Facts build belief.',
    applicationExamples: ['Numbers tracked every session', 'PR records maintained and celebrated', 'Reflection block reviews proof', '"Confidence is not a feeling. It is math."']
  },
  {
    number: 5, name: 'Conditioning in the Right Order',
    tagline: 'Joint mobility first, then muscle activation, then high-impact. Never start with jogging.',
    description: 'Every session opens with RAMP: joint mobility bottom-to-top (ankles, hips, thoracic spine, shoulders, wrists), then muscle activation, then athletic movement. Dynamic movement, no static stretching. Light feet before fast swings.',
    applicationExamples: ['RAMP warm-up opens every session', 'ABC Athletic Development block (30 min) follows RAMP', 'No jogging warmups', 'Joint cleaning before any ball work']
  },
  {
    number: 6, name: 'Channel the Fire',
    tagline: 'Competitive fire is fuel, not a problem. When Charlie gets frustrated, we don\'t shut it down — we redirect it.',
    description: 'Frustration is energy. Use it or waste it. The Between Point Routine (BPR) gives Charlie a system: Breathe -> Turn around -> Check strings -> Choose target -> Execute. "You\'re angry because you know you\'re better. Prove it."',
    applicationExamples: ['BPR practiced every competitive block', 'Emotional moments coached in real-time', '"Prove it on the next ball" as redirect', 'Reset routine: breathe, turn around, check strings, go']
  }
];

export const researchConcepts: ResearchConcept[] = [
  { name: 'Arrow Alignment', summary: 'Face it, then chase it. Set racket face toward target, adjust prep to the ball, drive through target line. You cannot correct the tip of the arrow (the incoming ball). Move the back (your preparation).', application: 'Used in every technical block — Charlie learns to set his racket face first, then move to the ball.' },
  { name: 'Two Laws of Reliable Ball-Striking', summary: 'Center contact + square face. Everything else serves these two jobs.', application: 'Simplifies technique coaching — Charlie focuses on contact quality, not swing choreography.' },
  { name: 'Swing Speed Allocation', summary: 'Swing speed buys two things: ball speed and spin. You choose the split. Don\'t slow the swing to save the point — change the wrap around the ball.', application: 'Phase 2-3: Charlie learns to allocate swing speed between pace and spin based on situation.' },
  { name: 'High-to-Low Serve Continuity', summary: 'Same motion both serves. The second serve changes aim and spin ratio, not the motion. "Change the bowling lane, not your roll."', application: 'Serve development: Charlie builds one reliable motion that works for both first and second serves.' },
  { name: 'Toss Targeting', summary: '"Place, don\'t toss." Pick a toss target in space matched to your service aim. Pros look up before they toss. Amateurs hope.', application: 'Serve accuracy improvement — Charlie learns to place the ball rather than toss it randomly.' },
  { name: 'Confidence Arithmetic', summary: 'With one motion on both serves and ~70-75% first-serve percentage, "one of two" is nearly guaranteed. Fear drops. Aggressive second serves rise.', application: 'Reduces serve anxiety — Charlie understands the math of having two chances with the same motion.' },
  { name: 'Overspin and Cover', summary: 'Contact above the ball\'s equator for downward curvature. Prepare higher than intended contact. Play flat with cover — not low-to-high religion.', application: 'Phase 2 forehand weapon development — adding topspin for margin and depth.' },
  { name: 'Play the Ten, Not the Five', summary: 'Choose the highest-quality shot your setup supports. Don\'t flip a ten crosscourt into a five down-the-line at the last second out of fear.', application: 'Decision-making framework — Charlie learns to assess his position and choose the best available shot.' },
  { name: '85% Quality Baseline', summary: 'Consistent quality limits opponents\' angles and time. Without it, they hit clean winners in one shot. Quality, not heroics, keeps you alive.', application: 'Phase 3 competition prep — Charlie builds a reliable baseline game before adding risk.' },
  { name: 'Coaching Hierarchy', summary: 'Direction -> Height -> Depth -> Spin -> Power. Fix these in order. Don\'t chase power when direction isn\'t solved.', application: 'Every drill correction follows this hierarchy — direction is always addressed first, power is last.' },
  { name: 'Drill-to-Point Transfer', summary: 'The #1 gap: fundamentals disappear when scoring starts. Bridge with progressive complexity: rally with targets -> rally with targets + scoring -> full points.', application: 'Transition drills bridge the gap between cooperative drilling and competitive point play.' },
];

export const frameworks: Framework[] = [
  {
    name: 'Confidence Chain',
    description: 'The pathway from practice to match confidence.',
    steps: ['Practice Accuracy', 'See Results', 'Trust Results', 'Swing with Conviction', 'Better Shots', 'More Results', 'More Confidence']
  },
  {
    name: 'Mistakes Math',
    description: 'One mistake costs three points minimum.',
    steps: ['Opponent gains one point', 'You need two points to pull even', 'Confidence drops making recovery harder', 'Teaches shot selection: "Was that miss worth three points?"']
  },
  {
    name: 'SRQ Between Point Routine (BPR)',
    description: 'A repeatable system for managing emotion between points. The reset routine that actually clicked in session on 3/25.',
    steps: ['Take a deep breath', 'Turn around', 'Check your strings', 'Choose your target', 'Execute']
  },
  {
    name: 'SRQ Coaching Standard',
    description: 'Every drill must answer three questions.',
    steps: ['What skill are we developing?', 'How are we measuring success?', 'How does it transfer to match play?']
  },
  {
    name: 'RAMP Warm-Up Protocol',
    description: 'The SRQ warm-up system. Joint mobility first, then activation, then athletic movement. 10-15 minutes, every session, no exceptions.',
    steps: [
      'Phase 1 — Joint Mobility (3 min): Ankle circles, knee circles, hip circles, thoracic rotation, shoulder circles, neck rolls',
      'Phase 2 — Muscle Activation (4 min): Mini band lateral walks, glute bridges, plank + shoulder taps',
      'Phase 3 — Athletic Movement (5-7 min): Split step reaction, lateral shuffle + catch, shuffle-to-crossover, forward sprint + backpedal'
    ]
  },
  {
    name: 'Five-Phase Session Model',
    description: 'The SRQ Universal Session Framework. Every session follows this arc.',
    steps: ['Prepare (RAMP + ABC Athletic Development)', 'Calibrate (Ball control, rally building, contact awareness)', 'Build (Technical work, skill development drills)', 'Compete (Live ball, pressure points, match situations)', 'Reflect (Numbers review, cool-down, evidence check)']
  }
];

export const coachingCues: CoachingCue[] = [
  {
    category: 'Accuracy',
    cues: [
      'Racket face toward the target. Move toward the target. That is technique.',
      'You are a rifle, not a shotgun. Pick your target.',
      'Accuracy first. Speed follows. Always.',
      'If you cannot hit the target slowly, you definitely cannot hit it fast.',
      'Direction first, then height, then depth, then spin, then power.'
    ]
  },
  {
    category: 'Confidence',
    cues: [
      'You just hit 7 out of 10. That is proof. Trust the proof.',
      'Stop hoping your shots will go in. Know they will. You have done the reps.',
      'Confidence is not a feeling. It is math.',
      'Yesterday it was 4. Today it is 7. That is not luck. That is work.'
    ]
  },
  {
    category: 'Mistakes / Shot Selection',
    cues: [
      'That miss just cost you three points. Was it worth it?',
      'Stop beating yourself. Your opponent is not doing anything — you are giving away points.',
      'The smartest shot is the one you can make.',
      'Play the ten, not the five. Choose the highest-quality shot your setup supports.'
    ]
  },
  {
    category: 'Fire / Mental',
    cues: [
      'Good. You are angry because you know you are better than that. Now prove it.',
      'Frustration is energy. Use it or waste it. Your choice.',
      'Reset. Next ball. That is the only one that matters.',
      'Take a deep breath. Turn around. Check your strings. Pick your target. Go.'
    ]
  },
  {
    category: 'Technique (Geometry)',
    cues: [
      'Where is your racket face pointing? That is where the ball is going.',
      'It is not about your backswing. It is about what happens at contact.',
      'Face it, then chase it.',
      'Change the bowling lane, not your roll.',
      'Keep your racket where you can see it. Compact backswing.'
    ]
  },
  {
    category: 'Movement / Footwork',
    cues: [
      'Think soccer — feet never stop.',
      'Split step before every shot. Land light, push first step, eyes early.',
      'Hit, recover, reset. Every ball.',
      'When your feet are set, everything clicks. When they are not, even your best strokes break down.'
    ]
  },
  {
    category: 'Topspin / Shape',
    cues: [
      'Brush up over the ball. Let it dip.',
      'No flat balls. Topspin on every ball.',
      'Racket head has to come over the ball, not pull back.',
      'Cross, lift, recover.'
    ]
  }
];

export const practiceItems: PracticeItem[] = [
  // RAMP Phase 1 — Joint Mobility
  { exercise: 'RAMP: Ankle & Knee Circles', reps: '10 each direction', purpose: 'Joint mobility — wake up lower body joints', frequency: 'daily' },
  { exercise: 'RAMP: Hip Circles & Thoracic Rotation', reps: '10 each side', purpose: 'Joint mobility — hips and spine', frequency: 'daily' },
  // RAMP Phase 2 — Activation
  { exercise: 'RAMP: Glute Bridges + Plank Shoulder Taps', reps: '10 bridges + 20 taps', purpose: 'Muscle activation before court work', frequency: 'daily' },
  // Tennis shadow work
  { exercise: 'Backhand Grip Shadow Swings', reps: '50 reps', purpose: 'Make grip change automatic — no looking, no thinking', frequency: 'daily' },
  { exercise: 'Forehand Spacing Drill (self-feed)', reps: '25 self-feeds', purpose: 'Arm\'s distance contact point — "push on my hand" feeling', frequency: 'daily' },
  { exercise: 'Split Step Practice', reps: '5 min', purpose: 'Split step before every shot — automatic, no reminders', frequency: 'daily' },
  { exercise: 'Serve Shadow Swings', reps: '20 reps', purpose: 'Same motion both serves, smooth rhythm', frequency: 'daily' },
  // Weekly extras
  { exercise: 'Single-leg balance (eyes closed)', reps: '30 sec each leg', purpose: 'Balance + ankle strength', frequency: 'weekly' },
  { exercise: 'Jump rope', reps: '5 min', purpose: 'Coordination, rhythm, ankle strength', frequency: 'weekly' },
  { exercise: 'Wall Rally (if wall available)', reps: '5 min', purpose: 'Contact quality and rally rhythm', frequency: 'weekly' },
];

export const achievements = [
  { id: 'ach-100-club', name: '100 Club', description: 'Hit 100+ in any rally streak', icon: '💯', criteria: 'Rally streak >= 100', earned: true, earnedDate: '2026-03-09' },
  { id: 'ach-volley-machine', name: 'Volley Machine', description: 'Volley streak PR over 100', icon: '🎯', criteria: 'Volley streak >= 100', earned: true, earnedDate: '2026-03-09' },
  { id: 'ach-fh-11', name: 'Forehand Eleven', description: '11+ consecutive forehands with shape', icon: '🔥', criteria: 'FH shaping streak >= 11', earned: true, earnedDate: '2026-03-25' },
  { id: 'ach-reset-master', name: 'Reset Master', description: 'Used the reset routine in a real match and came back', icon: '🧘', criteria: 'BPR used in match — came back from frustration', earned: true, earnedDate: '2026-03-25' },
  { id: 'ach-target-locked', name: 'Target Locked', description: '8/10 accuracy in any drill', icon: '🔒', criteria: '8/10 accuracy in a drill', earned: false, earnedDate: '' },
  { id: 'ach-fire-channeler', name: 'Fire Channeler', description: 'Used BPR every point in a competitive set', icon: '🔥', criteria: 'BPR every point in a set', earned: false, earnedDate: '' },
  { id: 'ach-grip-master', name: 'Grip Master', description: 'Backhand grip found under 2 seconds', icon: '✊', criteria: 'Grip time < 2 sec', earned: false, earnedDate: '' },
  { id: 'ach-yellow-ready', name: 'Yellow Ball Ready', description: 'Completed yellow ball transition', icon: '🎾', criteria: 'Yellow ball match ready', earned: false, earnedDate: '' },
  { id: 'ach-streak-15', name: 'Forehand Fifteen', description: '15+ consecutive forehands with topspin shape', icon: '💪', criteria: 'FH streak >= 15 with topspin', earned: false, earnedDate: '' },
  { id: 'ach-serve-7', name: 'Serve Sniper', description: '7/10 serves to target zone', icon: '🎯', criteria: 'Serve accuracy >= 7/10', earned: false, earnedDate: '' },
  { id: 'ach-rally-50', name: 'Rally Warrior', description: '50+ full court rally', icon: '⚔️', criteria: 'Full court rally >= 50', earned: false, earnedDate: '' },
  { id: 'ach-split-auto', name: 'Split Step Pro', description: 'Split step automatic — no reminders needed', icon: '👟', criteria: 'Unprompted split step streak 10+', earned: false, earnedDate: '' },
  { id: 'ach-topspin-default', name: 'Topspin Machine', description: 'Topspin on every ball in a full drill', icon: '🌀', criteria: 'Topspin on every ball — zero flat shots in drill', earned: false, earnedDate: '' },
  { id: 'ach-compact-bk', name: 'Compact Backswing', description: 'Maintained compact backswing through entire drill', icon: '🎯', criteria: 'Compact backswing maintained entire drill', earned: false, earnedDate: '' },
];
