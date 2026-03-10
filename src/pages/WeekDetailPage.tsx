import { useParams, Link } from 'react-router-dom';
import { weeks, phases } from '../data/seed/training-plan';
import { useAppContext } from '../store/AppContext';
import { PHASE_COLORS } from '../utils/constants';
import { formatDate } from '../utils/date';

export default function WeekDetailPage() {
  const { weekNumber } = useParams();
  const wn = parseInt(weekNumber || '1');
  const week = weeks.find(w => w.weekNumber === wn);
  const phase = phases.find(p => p.number === week?.phaseNumber);
  const { state } = useAppContext();

  if (!week || !phase) return <div className="p-8 text-center text-muted-text">Week not found</div>;

  const weekLessons = state.lessonPlans.filter(lp => lp.weekNumber === wn);
  const weekSessions = state.sessionLogs.filter(s => {
    const lp = state.lessonPlans.find(l => l.id === s.lessonPlanId);
    return lp?.weekNumber === wn;
  });
  const phaseColor = PHASE_COLORS[week.phaseNumber];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <Link to="/plan" className="text-sm text-navy hover:underline mb-4 inline-block">&larr; Back to Plan</Link>

      <div className={`rounded-xl p-6 mb-6 text-white ${phaseColor.bg}`}>
        <div className="text-sm opacity-80">Phase {phase.number} — {phase.name}</div>
        <h1 className="text-2xl font-bold mt-1">Week {wn}: {week.dateRange}</h1>
        <p className="text-sm mt-2 opacity-90">{week.tennisFocusTheme}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-med-gray">
          <h3 className="font-bold text-navy mb-2">Tennis Focus</h3>
          <p className="text-sm text-dark-text">{week.tennisFocusTheme}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-med-gray">
          <h3 className="font-bold text-navy mb-2">ABC Focus</h3>
          <p className="text-sm text-dark-text">{week.abcFocusTheme}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-med-gray mb-6">
        <h3 className="font-bold text-navy mb-2">Milestone</h3>
        <p className="text-dark-text">{week.milestone}</p>
      </div>

      {/* Sessions */}
      <div className="bg-white rounded-xl p-6 border border-med-gray">
        <h3 className="font-bold text-navy mb-4">Sessions This Week ({weekLessons.length} planned, {weekSessions.length} completed)</h3>
        <div className="space-y-3">
          {weekLessons.map(lesson => {
            const hasLog = state.sessionLogs.some(s => s.lessonPlanId === lesson.id);
            return (
              <Link key={lesson.id} to={`/lessons/${lesson.id}`}
                className={`block p-4 rounded-lg border transition-colors hover:border-navy ${
                  lesson.sessionType === 'private' ? 'border-l-4 border-l-navy' : 'border-l-4 border-l-srq-red'
                } ${hasLog ? 'bg-green-50' : 'bg-white'} border-med-gray`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      lesson.sessionType === 'private' ? 'bg-navy text-white' : 'bg-srq-red text-white'
                    }`}>
                      {lesson.sessionType === 'private' ? 'Private' : 'Group'} #{lesson.sessionNumber <= 3 ? lesson.sessionNumber : lesson.sessionNumber - 3}
                    </span>
                    <span className="ml-2 text-sm text-muted-text">{formatDate(lesson.date)} — {lesson.duration} min</span>
                  </div>
                  {hasLog && <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">Completed</span>}
                </div>
                <p className="text-sm text-dark-text mt-2">{lesson.theme}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
