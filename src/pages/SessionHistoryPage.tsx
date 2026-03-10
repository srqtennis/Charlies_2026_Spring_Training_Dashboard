import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { formatDate } from '../utils/date';
import { SessionType } from '../types';

export default function SessionHistoryPage() {
  const { state } = useAppContext();
  const [typeFilter, setTypeFilter] = useState<SessionType | 'all'>('all');
  const [weekFilter, setWeekFilter] = useState<number | 0>(0);

  const sessions = [...state.sessionLogs]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(s => typeFilter === 'all' || s.sessionType === typeFilter)
    .filter(s => {
      if (weekFilter === 0) return true;
      const lp = state.lessonPlans.find(l => l.id === s.lessonPlanId);
      return lp?.weekNumber === weekFilter;
    });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Session History</h1>
        <Link to="/session/start" className="bg-srq-red text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
          New Session
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as SessionType | 'all')}
          className="px-3 py-2 rounded-lg border border-med-gray text-sm">
          <option value="all">All Types</option>
          <option value="private">Private</option>
          <option value="group">Group</option>
        </select>
        <select value={weekFilter} onChange={e => setWeekFilter(Number(e.target.value))}
          className="px-3 py-2 rounded-lg border border-med-gray text-sm">
          <option value={0}>All Weeks</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>Week {i + 1}</option>
          ))}
        </select>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-med-gray text-center text-muted-text">
          <p className="text-lg mb-2">No sessions found</p>
          <Link to="/session/start" className="text-srq-red font-semibold hover:underline">Start your first session</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map(session => {
            const lesson = state.lessonPlans.find(lp => lp.id === session.lessonPlanId);
            const drillCount = session.drillResults.length;
            const avgAccuracy = drillCount > 0
              ? Math.round(session.drillResults.reduce((sum, dr) => {
                  if (dr.attempts && dr.attempts > 0) return sum + ((dr.accuracy || 0) / dr.attempts) * 100;
                  return sum;
                }, 0) / drillCount)
              : null;

            return (
              <Link key={session.id} to={`/sessions/${session.id}`}
                className="block bg-white rounded-xl p-5 border border-med-gray hover:border-navy transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-dark-text">{formatDate(session.date)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                        session.sessionType === 'private' ? 'bg-navy text-white' : 'bg-srq-red text-white'
                      }`}>
                        {session.sessionType}
                      </span>
                      {lesson && <span className="text-xs text-muted-text">Wk {lesson.weekNumber}</span>}
                    </div>
                    <p className="text-sm text-dark-text">{lesson?.theme || 'Session'}</p>
                  </div>
                  <div className="text-right text-sm">
                    {session.startTime && <div className="text-muted-text">{session.startTime} - {session.endTime || '...'}</div>}
                    <div className="text-navy font-semibold">{session.location}</div>
                  </div>
                </div>
                <div className="flex gap-4 mt-3 text-xs text-muted-text">
                  <span>Energy: {session.playerEnergy}</span>
                  <span>Mood: {session.playerMood.replace('_', ' ')}</span>
                  {avgAccuracy !== null && <span>Avg Accuracy: {avgAccuracy}%</span>}
                  {session.keyWins.length > 0 && <span>{session.keyWins.length} wins</span>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
