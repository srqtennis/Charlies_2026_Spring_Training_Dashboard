import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { formatDateFull } from '../utils/date';

export default function SessionRecapPage() {
  const { id } = useParams();
  const { state } = useAppContext();
  const session = state.sessionLogs.find(s => s.id === id);
  const lesson = state.lessonPlans.find(lp => lp.id === session?.lessonPlanId);

  if (!session || !lesson) return <div className="p-8 text-center text-muted-text">Session not found</div>;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <Link to={`/sessions`} className="text-sm text-navy hover:underline mb-4 inline-block">&larr; Back</Link>

      {/* Recap Card */}
      <div className="bg-white rounded-xl border border-med-gray overflow-hidden">
        {/* Header */}
        <div className={`p-6 text-white ${session.sessionType === 'private' ? 'bg-navy' : 'bg-srq-red'}`}>
          <div className="text-sm opacity-80">{formatDateFull(session.date)} | {session.startTime} - {session.endTime}</div>
          <h1 className="text-xl font-bold mt-1">{lesson.theme}</h1>
          <div className="flex gap-3 mt-2 text-sm opacity-80">
            <span>{session.location}</span>
            <span>{session.weather}</span>
            <span>Wk {lesson.weekNumber}</span>
          </div>
        </div>

        {/* State */}
        <div className="grid grid-cols-2 gap-3 p-6 border-b border-light-gray">
          <div className="bg-light-gray rounded-lg p-3 text-center">
            <div className="text-xs text-muted-text">Energy</div>
            <div className="text-sm font-bold text-navy capitalize">{session.playerEnergy}</div>
          </div>
          <div className="bg-light-gray rounded-lg p-3 text-center">
            <div className="text-xs text-muted-text">Mood</div>
            <div className="text-sm font-bold text-navy capitalize">{session.playerMood.replace('_', ' ')}</div>
          </div>
        </div>

        {/* Drill Results */}
        {session.drillResults.length > 0 && (
          <div className="p-6 border-b border-light-gray">
            <h3 className="font-bold text-navy mb-3">Drill Results</h3>
            <div className="space-y-2">
              {session.drillResults.map(dr => (
                <div key={dr.drillId} className="flex justify-between items-center py-2 border-b border-light-gray last:border-0">
                  <span className="text-sm">{dr.drillName}</span>
                  <div className="flex gap-4 text-sm">
                    {dr.streakBest !== null && dr.streakBest > 0 && (
                      <span className="bg-navy text-white px-2 py-0.5 rounded text-xs">Streak: {dr.streakBest}</span>
                    )}
                    {dr.attempts !== null && dr.attempts > 0 && (
                      <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                        {Math.round(((dr.accuracy || 0) / dr.attempts) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Wins */}
        {session.keyWins.length > 0 && (
          <div className="p-6 border-b border-light-gray">
            <h3 className="font-bold text-navy mb-2">Key Wins</h3>
            <ul className="space-y-1">
              {session.keyWins.map((win, i) => (
                <li key={i} className="text-sm text-dark-text flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">+</span> {win}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas to Watch */}
        {session.areasToWatch.length > 0 && (
          <div className="p-6 border-b border-light-gray">
            <h3 className="font-bold text-navy mb-2">Areas to Watch</h3>
            <ul className="space-y-1">
              {session.areasToWatch.map((area, i) => (
                <li key={i} className="text-sm text-dark-text flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">!</span> {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Home Assignments */}
        {session.homeAssignments.length > 0 && (
          <div className="p-6 border-b border-light-gray">
            <h3 className="font-bold text-navy mb-2">Home Assignments</h3>
            <ul className="space-y-1">
              {session.homeAssignments.map((hw, i) => (
                <li key={i} className="text-sm text-dark-text flex items-start gap-2">
                  <span className="text-navy">-</span> {hw}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BPR + Notes */}
        <div className="p-6 border-b border-light-gray grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-text mb-1">Between Point Routine</div>
            <div className="text-sm font-semibold text-navy capitalize">{session.betweenPointRoutine.replace(/_/g, ' ')}</div>
          </div>
          {session.emotionalNotes && (
            <div>
              <div className="text-xs text-muted-text mb-1">Emotional Notes</div>
              <div className="text-sm text-dark-text">{session.emotionalNotes}</div>
            </div>
          )}
        </div>

        {/* Coach Notes */}
        {session.coachNotes && (
          <div className="p-6 border-b border-light-gray">
            <h3 className="font-bold text-navy mb-2">Coach Notes</h3>
            <p className="text-sm text-dark-text whitespace-pre-wrap">{session.coachNotes}</p>
          </div>
        )}

        {/* Parent Summary */}
        {session.parentSummary && (
          <div className="p-6 bg-light-gray">
            <h3 className="font-bold text-navy mb-2">Parent Summary</h3>
            <p className="text-sm text-dark-text">{session.parentSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
