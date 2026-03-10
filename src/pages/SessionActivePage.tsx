import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { drills } from '../data/seed/drills';
import { DrillResult } from '../types';

export default function SessionActivePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();

  const session = state.sessionLogs.find(s => s.id === id);
  const lesson = state.lessonPlans.find(lp => lp.id === session?.lessonPlanId);

  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [blockElapsed, setBlockElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const [drillResults, setDrillResults] = useState<Record<string, DrillResult>>({});
  const [coachNotes, setCoachNotes] = useState('');

  // Timer
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setElapsed(e => e + 1);
      setBlockElapsed(b => b + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentBlock = lesson?.blocks[currentBlockIndex];
  const blockDurationSecs = (currentBlock?.duration || 0) * 60;
  const blockTimeRemaining = Math.max(0, blockDurationSecs - blockElapsed);

  const getDrillResult = useCallback((drillId: string): DrillResult => {
    return drillResults[drillId] || { drillId, drillName: '', accuracy: null, attempts: null, streakBest: null, notes: '' };
  }, [drillResults]);

  const updateDrillResult = (drillId: string, drillName: string, field: keyof DrillResult, value: number | string | null) => {
    setDrillResults(prev => ({
      ...prev,
      [drillId]: { ...getDrillResult(drillId), drillId, drillName, [field]: value },
    }));
  };

  const incrementStreak = (drillId: string, drillName: string) => {
    const current = getDrillResult(drillId);
    updateDrillResult(drillId, drillName, 'streakBest', (current.streakBest || 0) + 1);
  };

  const incrementAccuracy = (drillId: string, drillName: string, hit: boolean) => {
    const current = getDrillResult(drillId);
    const attempts = (current.attempts || 0) + 1;
    const acc = hit ? (current.accuracy || 0) + 1 : (current.accuracy || 0);
    setDrillResults(prev => ({
      ...prev,
      [drillId]: { ...current, drillId, drillName, attempts, accuracy: acc },
    }));
  };

  const nextBlock = () => {
    if (!lesson) return;
    if (currentBlockIndex < lesson.blocks.length - 1) {
      setCurrentBlockIndex(i => i + 1);
      setBlockElapsed(0);
    }
  };

  const prevBlock = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(i => i - 1);
      setBlockElapsed(0);
    }
  };

  const endSession = () => {
    if (!session) return;
    const allResults = Object.values(drillResults);
    const updated = {
      ...session,
      endTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      drillResults: allResults,
      coachNotes,
    };
    dispatch({ type: 'UPDATE_SESSION_LOG', payload: updated });
    navigate(`/session/complete/${session.id}`);
  };

  if (!session || !lesson) {
    return <div className="p-8 text-center text-muted-text">Session not found</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/dashboard" className="text-sm text-navy hover:underline">&larr; Exit</Link>
        <div className="text-center">
          <div className="text-2xl font-bold text-navy font-mono">{formatTime(elapsed)}</div>
          <div className="text-xs text-muted-text">Total Time</div>
        </div>
        <button onClick={() => setRunning(r => !r)}
          className={`px-3 py-1 rounded-lg text-sm font-bold ${running ? 'bg-yellow-500 text-white' : 'bg-green-600 text-white'}`}>
          {running ? 'Pause' : 'Resume'}
        </button>
      </div>

      {/* Block Navigation */}
      <div className="flex items-center justify-between bg-navy text-white rounded-xl p-4 mb-4">
        <button onClick={prevBlock} disabled={currentBlockIndex === 0}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 text-lg font-bold">
          &larr;
        </button>
        <div className="text-center">
          <div className="text-sm opacity-80">Block {currentBlockIndex + 1} of {lesson.blocks.length}</div>
          <div className="text-lg font-bold">{currentBlock?.name}</div>
          <div className="text-sm opacity-80">{currentBlock?.focus}</div>
        </div>
        <button onClick={nextBlock} disabled={currentBlockIndex === lesson.blocks.length - 1}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 text-lg font-bold">
          &rarr;
        </button>
      </div>

      {/* Block Timer */}
      <div className="bg-white rounded-xl p-4 border border-med-gray mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-text">Block Time</span>
          <span className={`text-lg font-mono font-bold ${blockTimeRemaining === 0 ? 'text-srq-red' : 'text-navy'}`}>
            {formatTime(blockTimeRemaining)}
          </span>
        </div>
        <div className="bg-light-gray rounded-full h-3">
          <div
            className={`rounded-full h-3 transition-all ${blockTimeRemaining === 0 ? 'bg-srq-red' : 'bg-navy'}`}
            style={{ width: `${Math.min((blockElapsed / blockDurationSecs) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Drills */}
      {currentBlock?.drills.map(da => {
        const drill = drills.find(d => d.id === da.drillId);
        const result = getDrillResult(da.drillId);
        const accPercent = result.attempts && result.attempts > 0
          ? Math.round(((result.accuracy || 0) / result.attempts) * 100)
          : null;

        return (
          <div key={da.drillId} className="bg-white rounded-xl p-4 border border-med-gray mb-3">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-navy">{da.drillName}</h4>
                <p className="text-xs text-muted-text">{da.duration} min — {drill?.targetStandard}</p>
              </div>
            </div>

            {drill && (
              <div className="bg-light-gray rounded-lg p-2 mb-3 text-xs text-dark-text">
                <strong>Cues:</strong> {drill.coachingCues}
              </div>
            )}

            {/* Streak Counter */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center">
                <div className="text-xs text-muted-text mb-1">Streak</div>
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => incrementStreak(da.drillId, da.drillName)}
                    className="w-16 h-16 rounded-xl bg-navy text-white text-2xl font-bold active:bg-blue-800 transition-colors select-none">
                    {result.streakBest || 0}
                  </button>
                  <button onClick={() => updateDrillResult(da.drillId, da.drillName, 'streakBest', 0)}
                    className="text-xs text-muted-text hover:text-srq-red">Reset</button>
                </div>
              </div>

              {/* Accuracy Tracker */}
              <div className="text-center">
                <div className="text-xs text-muted-text mb-1">
                  Accuracy {accPercent !== null ? `(${accPercent}%)` : ''}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => incrementAccuracy(da.drillId, da.drillName, true)}
                    className="w-16 h-16 rounded-xl bg-green-600 text-white text-sm font-bold active:bg-green-700 transition-colors select-none">
                    Make<br />{result.accuracy || 0}
                  </button>
                  <button onClick={() => incrementAccuracy(da.drillId, da.drillName, false)}
                    className="w-16 h-16 rounded-xl bg-srq-red text-white text-sm font-bold active:bg-red-700 transition-colors select-none">
                    Miss<br />{(result.attempts || 0) - (result.accuracy || 0)}
                  </button>
                </div>
              </div>
            </div>

            {/* Drill Notes */}
            <input
              type="text"
              placeholder="Quick note on this drill..."
              value={result.notes}
              onChange={e => updateDrillResult(da.drillId, da.drillName, 'notes', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-med-gray text-sm"
            />
          </div>
        );
      })}

      {/* Coach Notes */}
      <div className="bg-white rounded-xl p-4 border border-med-gray mb-4">
        <h4 className="font-bold text-navy mb-2">Coach Notes</h4>
        <textarea
          value={coachNotes}
          onChange={e => setCoachNotes(e.target.value)}
          placeholder="Observations, adjustments, things to remember..."
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-med-gray text-sm resize-none"
        />
      </div>

      {/* End Session */}
      <button onClick={endSession}
        className="w-full bg-srq-red text-white font-bold py-4 rounded-xl text-lg hover:bg-red-700 transition-colors">
        End Session
      </button>
    </div>
  );
}
