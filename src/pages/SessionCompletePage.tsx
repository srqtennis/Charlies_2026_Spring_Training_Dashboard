import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { BPRRating } from '../types';

export default function SessionCompletePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const session = state.sessionLogs.find(s => s.id === id);
  const lesson = state.lessonPlans.find(lp => lp.id === session?.lessonPlanId);

  const [keyWins, setKeyWins] = useState<string[]>(session?.keyWins || ['']);
  const [areasToWatch, setAreasToWatch] = useState<string[]>(session?.areasToWatch || ['']);
  const [homeAssignments, setHomeAssignments] = useState<string[]>(session?.homeAssignments || ['']);
  const [emotionalNotes, setEmotionalNotes] = useState(session?.emotionalNotes || '');
  const [bpr, setBpr] = useState<BPRRating>(session?.betweenPointRoutine || 'not_used');
  const [parentSummary, setParentSummary] = useState(session?.parentSummary || '');

  if (!session || !lesson) return <div className="p-8 text-center text-muted-text">Session not found</div>;

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => prev.map((item, i) => i === index ? value : item));
  };

  const saveAndFinish = () => {
    const updated = {
      ...session,
      keyWins: keyWins.filter(w => w.trim()),
      areasToWatch: areasToWatch.filter(a => a.trim()),
      homeAssignments: homeAssignments.filter(h => h.trim()),
      emotionalNotes,
      betweenPointRoutine: bpr,
      parentSummary,
    };
    dispatch({ type: 'UPDATE_SESSION_LOG', payload: updated });
    dispatch({ type: 'SET_ACTIVE_SESSION', payload: null });

    // Mark lesson as completed
    const updatedLesson = { ...lesson, status: 'completed' as const };
    dispatch({ type: 'UPDATE_LESSON_PLAN', payload: updatedLesson });

    navigate(`/sessions/${session.id}`);
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-navy mb-2">Session Complete</h1>
      <p className="text-muted-text mb-6">{lesson.theme}</p>

      {/* Drill Results Summary */}
      {session.drillResults.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-med-gray mb-4">
          <h3 className="font-bold text-navy mb-3">Drill Results</h3>
          <div className="space-y-2">
            {session.drillResults.map(dr => (
              <div key={dr.drillId} className="flex justify-between items-center py-2 border-b border-light-gray last:border-0">
                <span className="text-sm text-dark-text">{dr.drillName}</span>
                <div className="flex gap-3 text-sm">
                  {dr.streakBest !== null && <span className="text-navy font-semibold">Streak: {dr.streakBest}</span>}
                  {dr.attempts !== null && dr.attempts > 0 && (
                    <span className="text-navy font-semibold">
                      {Math.round(((dr.accuracy || 0) / dr.attempts) * 100)}% ({dr.accuracy}/{dr.attempts})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Wins */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-4">
        <h3 className="font-bold text-navy mb-3">Key Wins</h3>
        {keyWins.map((win, i) => (
          <input key={i} value={win} onChange={e => updateItem(setKeyWins, i, e.target.value)}
            placeholder={`Win #${i + 1}`}
            className="w-full px-3 py-2 rounded-lg border border-med-gray text-sm mb-2" />
        ))}
        <button onClick={() => addItem(setKeyWins)} className="text-sm text-navy hover:underline">+ Add win</button>
      </div>

      {/* Areas to Watch */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-4">
        <h3 className="font-bold text-navy mb-3">Areas to Watch</h3>
        {areasToWatch.map((area, i) => (
          <input key={i} value={area} onChange={e => updateItem(setAreasToWatch, i, e.target.value)}
            placeholder={`Area #${i + 1}`}
            className="w-full px-3 py-2 rounded-lg border border-med-gray text-sm mb-2" />
        ))}
        <button onClick={() => addItem(setAreasToWatch)} className="text-sm text-navy hover:underline">+ Add area</button>
      </div>

      {/* Home Assignments */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-4">
        <h3 className="font-bold text-navy mb-3">Home Assignments</h3>
        {homeAssignments.map((hw, i) => (
          <input key={i} value={hw} onChange={e => updateItem(setHomeAssignments, i, e.target.value)}
            placeholder={`Assignment #${i + 1}`}
            className="w-full px-3 py-2 rounded-lg border border-med-gray text-sm mb-2" />
        ))}
        <button onClick={() => addItem(setHomeAssignments)} className="text-sm text-navy hover:underline">+ Add assignment</button>
      </div>

      {/* Between Point Routine */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-4">
        <h3 className="font-bold text-navy mb-3">Between Point Routine</h3>
        <div className="grid grid-cols-2 gap-2">
          {(['not_used', 'sometimes', 'most_points', 'every_point'] as const).map(r => (
            <button key={r} onClick={() => setBpr(r)}
              className={`py-3 rounded-lg text-sm font-semibold capitalize transition-colors ${
                bpr === r ? 'bg-navy text-white' : 'bg-light-gray text-dark-text hover:bg-med-gray'
              }`}>{r.replace(/_/g, ' ')}</button>
          ))}
        </div>
      </div>

      {/* Emotional Notes */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-4">
        <h3 className="font-bold text-navy mb-3">Emotional/Behavioral Notes</h3>
        <textarea value={emotionalNotes} onChange={e => setEmotionalNotes(e.target.value)}
          placeholder="How was Charlie's attitude, focus, and energy throughout?"
          rows={3} className="w-full px-3 py-2 rounded-lg border border-med-gray text-sm resize-none" />
      </div>

      {/* Parent Summary */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-6">
        <h3 className="font-bold text-navy mb-3">Parent Summary</h3>
        <textarea value={parentSummary} onChange={e => setParentSummary(e.target.value)}
          placeholder="Quick summary for Charlie's parents..."
          rows={3} className="w-full px-3 py-2 rounded-lg border border-med-gray text-sm resize-none" />
      </div>

      <button onClick={saveAndFinish}
        className="w-full bg-navy text-white font-bold py-4 rounded-xl text-lg hover:bg-blue-900 transition-colors">
        Save & Complete
      </button>
    </div>
  );
}
