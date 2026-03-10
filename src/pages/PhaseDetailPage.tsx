import { useParams, Link } from 'react-router-dom';
import { phases, weeks, abcProgressions } from '../data/seed/training-plan';
import { useAppContext } from '../store/AppContext';
import { PHASE_COLORS } from '../utils/constants';

export default function PhaseDetailPage() {
  const { phaseNumber } = useParams();
  const pn = parseInt(phaseNumber || '1') as 1 | 2 | 3;
  const phase = phases.find(p => p.number === pn);
  const { state, dispatch } = useAppContext();

  if (!phase) return <div className="p-8 text-center text-muted-text">Phase not found</div>;

  const phaseWeeks = weeks.filter(w => w.phaseNumber === pn);
  const phaseColor = PHASE_COLORS[pn];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <Link to="/plan" className="text-sm text-navy hover:underline mb-4 inline-block">&larr; Back to Plan</Link>

      <div className={`rounded-xl p-6 mb-6 text-white ${phaseColor.bg}`}>
        <div className="text-sm opacity-80">Phase {pn} of 3</div>
        <h1 className="text-2xl font-bold mt-1">{phase.name}</h1>
        <p className="text-sm mt-2 opacity-90">{phase.dateRange} (Weeks {phase.startWeek}–{phase.endWeek})</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-med-gray mb-6">
        <h3 className="font-bold text-navy mb-2">Phase Description</h3>
        <p className="text-dark-text text-sm leading-relaxed">{phase.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-med-gray">
          <h3 className="font-bold text-navy mb-3">Tennis Focus Areas</h3>
          <ul className="space-y-2">
            {phase.tennisFocus.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-dark-text">
                <span className="text-srq-red font-bold mt-0.5">-</span> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl p-6 border border-med-gray">
          <h3 className="font-bold text-navy mb-3">ABC Focus Areas</h3>
          <ul className="space-y-2">
            {phase.abcFocus.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-dark-text">
                <span className="text-srq-red font-bold mt-0.5">-</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-6">
        <h3 className="font-bold text-navy mb-4">Phase Milestones</h3>
        <div className="space-y-2">
          {phase.milestones.map((m, i) => {
            const key = `p${pn}-m${i}`;
            const isCompleted = state.completedMilestones.includes(key);
            return (
              <label key={i} className="flex items-center gap-3 cursor-pointer py-2 hover:bg-light-gray rounded px-2 -mx-2">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => dispatch({ type: 'TOGGLE_MILESTONE', payload: key })}
                  className="w-5 h-5 rounded accent-navy"
                />
                <span className={`text-sm ${isCompleted ? 'line-through text-muted-text' : 'text-dark-text'}`}>{m}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ABC Progressions */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-6">
        <h3 className="font-bold text-navy mb-4">ABC Progressions — Phase {pn}</h3>
        <div className="space-y-3">
          {abcProgressions.map(abc => (
            <div key={abc.component} className="p-3 bg-light-gray rounded-lg">
              <div className="font-semibold text-navy text-sm">{abc.component}</div>
              <p className="text-xs text-dark-text mt-1">
                {pn === 1 ? abc.phase1 : pn === 2 ? abc.phase2 : abc.phase3}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weeks in Phase */}
      <div className="bg-white rounded-xl p-6 border border-med-gray">
        <h3 className="font-bold text-navy mb-4">Weeks in Phase {pn}</h3>
        <div className="space-y-2">
          {phaseWeeks.map(w => (
            <Link key={w.weekNumber} to={`/plan/week/${w.weekNumber}`}
              className="block p-3 rounded-lg border border-med-gray hover:border-navy transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-navy">Week {w.weekNumber}</span>
                <span className="text-sm text-muted-text">{w.dateRange}</span>
              </div>
              <p className="text-sm text-dark-text mt-1">{w.tennisFocusTheme}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
