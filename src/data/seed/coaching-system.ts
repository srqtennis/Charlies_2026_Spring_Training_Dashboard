import { Pillar, ResearchConcept, Framework, CoachingCue, PracticeItem } from '../../types';

export const pillars: Pillar[] = [
  {
    number: 1, name: 'Accuracy Before Everything',
    tagline: 'Accuracy creates confidence. Confidence creates speed. Speed creates weapons.',
    description: 'Every drill starts with accuracy targets. Speed is earned by proving control first. If you cannot hit the target slowly, you cannot hit it fast.',
    applicationExamples: ['Targets present in every drill', 'Streak counting before pace increase', 'Accuracy percentage tracked every session']
  },
  {
    number: 2, name: 'Live Ball Is the Method',
    tagline: 'Real skill is reading incoming balls.',
    description: 'Majority of court time is live ball. Fed drills are scaffolding — the goal is always to get to live rally situations where players must read, react, and decide.',
    applicationExamples: ['Transition from fed ball to live within each block', 'Rally counting as primary metric', 'Pattern play in live ball conditions']
  },
  {
    number: 3, name: 'Technique Is Geometry',
    tagline: 'Racket face direction + movement toward target. Coach the contact, not the choreography.',
    description: 'Two Laws of reliable ball-striking: center contact + square face. Everything else serves these two jobs. Arrow Alignment: face it, then chase it.',
    applicationExamples: ['Arrow Alignment cues in every technical block', 'Contact geometry focus over swing path', 'Face direction drills']
  },
  {
    number: 4, name: 'Confidence Is Built, Not Given',
    tagline: 'Track numbers. Show proof.',
    description: 'Confidence comes from evidence. "You hit 7 out of 10. Yesterday it was 4." The Confidence Chain: Practice Accuracy → See Results → Trust Results → Swing with Conviction.',
    applicationExamples: ['Numbers tracked every session', 'PR records maintained', 'Reflection block reviews proof']
  },
  {
    number: 5, name: 'Conditioning in the Right Order',
    tagline: 'Joint cleaning → muscle activation → high-impact. Never start with jogging.',
    description: 'Every session opens with Joint Preparation: bottom-to-top joint cleaning. Ankles, hips, thoracic spine, shoulders, wrists. Dynamic movement, no static stretching.',
    applicationExamples: ['Joint Prep block opens every session', 'ABC block follows joint prep', 'No jogging warmups']
  },
  {
    number: 6, name: 'Channel the Fire',
    tagline: 'Competitive fire is fuel. Redirect frustration into focus.',
    description: 'Frustration is energy. Use it or waste it. The Between Point Routine gives Charlie a system for channeling emotion: Breathe → Cue Word → Choose Target → Visualize → Execute.',
    applicationExamples: ['BPR practiced every competitive block', 'Emotional moments coached in real-time', '"Prove it on the next ball" as redirect']
  }
];

export const researchConcepts: ResearchConcept[] = [
  { name: 'Arrow Alignment', summary: 'Face it, then chase it. Set racket face toward target, adjust prep to the ball, drive through target line.', application: 'Used in every technical block — Charlie learns to set his racket face first, then move to the ball.' },
  { name: 'Two Laws of Reliable Ball-Striking', summary: 'Center contact + square face. Everything else serves these two jobs.', application: 'Simplifies technique coaching — Charlie focuses on contact quality, not swing choreography.' },
  { name: 'Swing Speed Allocation', summary: 'Swing speed buys ball speed and spin. Choose the split. Don\'t slow the swing — change the wrap.', application: 'Phase 3: Charlie learns to allocate swing speed between pace and spin based on situation.' },
  { name: 'High-to-Low Serve Continuity', summary: 'Same motion both serves. Change aim, not motion. "Change the bowling lane, not your roll."', application: 'Serve development in Phase 1-2: Charlie builds one reliable motion that works for both serves.' },
  { name: 'Toss Targeting', summary: '"Place, don\'t toss." Pick a toss target in space matched to service aim.', application: 'Serve accuracy improvement — Charlie learns to place the ball rather than toss it randomly.' },
  { name: 'Confidence Arithmetic', summary: 'One motion trains both serves every point. "One of Two" is nearly guaranteed.', application: 'Reduces serve anxiety — Charlie understands the math of having two chances with the same motion.' },
  { name: 'Overspin and Cover', summary: 'Contact above the ball\'s equator. Prepare higher than intended contact.', application: 'Phase 2 forehand weapon development — adding topspin for margin and depth.' },
  { name: 'Play the Ten, Not the Five', summary: 'Choose the highest-quality shot your setup supports.', application: 'Decision-making framework — Charlie learns to assess his position and choose the best available shot.' },
  { name: '85% Quality Baseline', summary: 'Consistent quality limits opponents\' angles and time.', application: 'Phase 3 competition prep — Charlie builds a reliable baseline game before adding risk.' },
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
    name: 'SRQ Between Point Routine',
    description: 'A repeatable system for managing emotion between points.',
    steps: ['Breathe', 'Cue Word', 'Choose Target', 'Visualize', 'Execute']
  },
  {
    name: 'SRQ Coaching Standard',
    description: 'Every drill must answer three questions.',
    steps: ['What skill are we developing?', 'How are we measuring success?', 'How does it transfer to match play?']
  }
];

export const coachingCues: CoachingCue[] = [
  {
    category: 'Accuracy',
    cues: [
      'Racket face toward the target. Move toward the target. That is technique.',
      'You are a rifle, not a shotgun. Pick your target.',
      'Accuracy first. Speed follows. Always.',
      'If you cannot hit the target slowly, you definitely cannot hit it fast.'
    ]
  },
  {
    category: 'Confidence',
    cues: [
      'You just hit 7 out of 10. That is proof. Trust the proof.',
      'Stop hoping your shots will go in. Know they will. You have done the reps.',
      'Confidence is not a feeling. It is math.'
    ]
  },
  {
    category: 'Mistakes / Shot Selection',
    cues: [
      'That miss just cost you three points. Was it worth it?',
      'Stop beating yourself. Your opponent is not doing anything — you are giving away points.',
      'The smartest shot is the one you can make.'
    ]
  },
  {
    category: 'Fire / Mental',
    cues: [
      'Good. You are angry because you know you are better than that. Now prove it.',
      'Frustration is energy. Use it or waste it. Your choice.',
      'Reset. Next ball. That is the only one that matters.'
    ]
  },
  {
    category: 'Technique (Geometry)',
    cues: [
      'Where is your racket face pointing? That is where the ball is going.',
      'It is not about your backswing. It is about what happens at contact.',
      'Face it, then chase it.',
      'Change the bowling lane, not your roll.'
    ]
  }
];

export const practiceItems: PracticeItem[] = [
  { exercise: 'Backhand Grip Shadow Swings', reps: '50 reps', purpose: 'Make grip change automatic', frequency: 'daily' },
  { exercise: 'Forehand Spacing Drill', reps: '25 self-feeds', purpose: 'Arm\'s distance contact point', frequency: 'daily' },
  { exercise: 'Split Step Practice', reps: '5 min', purpose: 'Movement before every shot', frequency: 'daily' },
  { exercise: 'Soccer Footwork', reps: '5 min', purpose: 'Feet never stop', frequency: 'daily' },
  { exercise: 'Serve Shadow Swings', reps: '20 reps', purpose: 'Same motion, smooth rhythm', frequency: 'daily' },
  { exercise: 'Wall Rally (if available)', reps: '5 min', purpose: 'Accuracy and match rhythm', frequency: 'daily' },
  { exercise: 'Single-leg balance (eyes closed)', reps: '3x/week', purpose: 'Balance improvement, track time', frequency: 'weekly' },
  { exercise: 'Jump rope', reps: '5 min, 3x/week', purpose: 'Coordination, rhythm, ankle strength', frequency: 'weekly' },
  { exercise: '2-ball juggle', reps: '3x/week', purpose: 'Hand-eye coordination, track catches', frequency: 'weekly' },
];

export const achievements = [
  { id: 'ach-100-club', name: '100 Club', description: 'Hit 100+ in any rally streak', icon: '💯', criteria: 'Rally streak >= 100', earned: true, earnedDate: '2026-03-09' },
  { id: 'ach-volley-machine', name: 'Volley Machine', description: 'Volley streak PR over 100', icon: '🎯', criteria: 'Volley streak >= 100', earned: true, earnedDate: '2026-03-09' },
  { id: 'ach-target-locked', name: 'Target Locked', description: '8/10 accuracy in any drill', icon: '🔒', criteria: '8/10 accuracy', earned: false, earnedDate: '' },
  { id: 'ach-fire-channeler', name: 'Fire Channeler', description: 'Used Between Point Routine every point in a competitive session', icon: '🔥', criteria: 'BPR every point', earned: false, earnedDate: '' },
  { id: 'ach-grip-master', name: 'Grip Master', description: 'Backhand grip under 2 seconds', icon: '✊', criteria: 'Grip time < 2 sec', earned: false, earnedDate: '' },
  { id: 'ach-yellow-ready', name: 'Yellow Ball Ready', description: 'Completed yellow ball transition', icon: '🎾', criteria: 'Yellow ball match ready', earned: false, earnedDate: '' },
  { id: 'ach-streak-15', name: 'Forehand Fifteen', description: '15+ consecutive forehands with shape', icon: '💪', criteria: 'FH streak >= 15', earned: false, earnedDate: '' },
  { id: 'ach-serve-7', name: 'Serve Sniper', description: '7/10 serves to target', icon: '🎯', criteria: 'Serve accuracy >= 7/10', earned: false, earnedDate: '' },
  { id: 'ach-rally-50', name: 'Rally Warrior', description: '50+ full court rally', icon: '⚔️', criteria: 'Full court rally >= 50', earned: false, earnedDate: '' },
  { id: 'ach-split-auto', name: 'Split Step Pro', description: 'Split step automatic — no reminders needed', icon: '👟', criteria: 'Split step automatic', earned: false, earnedDate: '' },
];
