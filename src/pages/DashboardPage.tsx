import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { phases, weeks } from '../data/seed/training-plan';
import { getCurrentWeek, getCurrentPhase, formatDate } from '../utils/date';
import { PHASE_COLORS, PHASE_NAMES } from '../utils/constants';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const { state } = useAppContext();
  const currentWeek = getCurrentWeek();
  const currentPhase = getCurrentPhase();
  const week = weeks.find(w => w.weekNumber === currentWeek);
  const phase = phases.find(p => p.number === currentPhase);
  const phaseColor = PHASE_COLORS[currentPhase];

  const completedSessions = state.sessionLogs.length;
  const totalPlannedSoFar = currentWeek * 5;
  const completionRate = totalPlannedSoFar > 0 ? Math.round((completedSessions / totalPlannedSoFar) * 100) : 0;

  const recentSessions = [...state.sessionLogs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const phaseProgress = ((currentWeek - (phase?.startWeek || 1)) / 4) * 100;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-navy">Charlie Alden — Training Dashboard</h1>
        <p className="text-muted-text mt-1">March 9 – May 31, 2026 | 12-Week Development Plan</p>
      </div>

      {/* This Week Card */}
      <div className={`rounded-xl p-6 mb-6 text-white ${phaseColor.bg}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm opacity-80">Week {currentWeek} of 12 — Phase {currentPhase}</div>
            <h2 className="text-xl font-bold mt-1">{PHASE_NAMES[currentPhase]}</h2>
            <p className="text-sm mt-2 opacity-90">{week?.dateRange}</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-3xl font-bold">{Math.round(phaseProgress)}%</div>
            <div className="text-sm opacity-80">Phase Progress</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs opacity-80">Tennis Focus</div>
            <div className="text-sm font-semibold mt-1">{week?.tennisFocusTheme}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs opacity-80">ABC Focus</div>
            <div className="text-sm font-semibold mt-1">{week?.abcFocusTheme}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Link to="/session/start" className="bg-srq-red text-white rounded-xl p-4 text-center font-bold hover:bg-red-700 transition-colors">
          Start Session
        </Link>
        <Link to="/plan" className="bg-white border border-med-gray rounded-xl p-4 text-center font-semibold text-navy hover:border-navy transition-colors">
          View Plan
        </Link>
        <Link to="/metrics" className="bg-white border border-med-gray rounded-xl p-4 text-center font-semibold text-navy hover:border-navy transition-colors">
          View Metrics
        </Link>
        <Link to="/lessons" className="bg-white border border-med-gray rounded-xl p-4 text-center font-semibold text-navy hover:border-navy transition-colors">
          Lesson Plans
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metrics Overview */}
        <div className="bg-white rounded-xl p-6 border border-med-gray">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-navy">Key Metrics</h3>
            <Link to="/metrics/compare" className="text-sm text-srq-red hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {state.metrics.slice(0, 5).map(metric => {
              const historyData = metric.history.map((h, i) => ({ x: i, y: parseFloat(h.value) || 0 }));
              return (
                <Link key={metric.id} to={`/metrics/${metric.id}`} className="flex items-center justify-between py-2 border-b border-light-gray last:border-0 hover:bg-light-gray rounded px-2 -mx-2 transition-colors">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-dark-text">{metric.name}</div>
                    <div className="text-xs text-muted-text">Target: {metric.finalTarget}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8">
                      {historyData.length > 1 && (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={historyData}>
                            <Line type="monotone" dataKey="y" stroke="#002E5D" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-navy">{metric.currentValue}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Sessions + Milestones */}
        <div className="space-y-6">
          {/* Recent Sessions */}
          <div className="bg-white rounded-xl p-6 border border-med-gray">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy">Recent Sessions</h3>
              <Link to="/sessions" className="text-sm text-srq-red hover:underline">View All</Link>
            </div>
            {recentSessions.length === 0 ? (
              <div className="text-center py-8 text-muted-text">
                <p className="text-lg mb-2">No sessions logged yet</p>
                <Link to="/session/start" className="text-srq-red font-semibold hover:underline">Start your first session</Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recentSessions.map(session => (
                  <Link key={session.id} to={`/sessions/${session.id}`} className="block p-3 rounded-lg border border-light-gray hover:border-navy transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">{formatDate(session.date)}</span>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded ${session.sessionType === 'private' ? 'bg-navy text-white' : 'bg-srq-red text-white'}`}>
                          {session.sessionType}
                        </span>
                      </div>
                    </div>
                    {session.keyWins.length > 0 && (
                      <p className="text-xs text-muted-text mt-1 truncate">{session.keyWins[0]}</p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Milestone Checklist */}
          <div className="bg-white rounded-xl p-6 border border-med-gray">
            <h3 className="font-bold text-navy mb-4">Phase {currentPhase} Milestones</h3>
            <div className="space-y-2">
              {phase?.milestones.map((milestone, i) => {
                const isCompleted = state.completedMilestones.includes(`p${currentPhase}-m${i}`);
                return (
                  <label key={i} className="flex items-center gap-3 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      readOnly
                      className="w-5 h-5 rounded border-med-gray accent-navy"
                    />
                    <span className={`text-sm ${isCompleted ? 'line-through text-muted-text' : 'text-dark-text'}`}>
                      {milestone}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Session Completion */}
          <div className="bg-white rounded-xl p-6 border border-med-gray">
            <h3 className="font-bold text-navy mb-2">Session Completion</h3>
            <div className="flex items-end gap-4">
              <div className="text-4xl font-bold text-navy">{completedSessions}</div>
              <div className="text-sm text-muted-text mb-1">of {totalPlannedSoFar} planned ({completionRate}%)</div>
            </div>
            <div className="mt-3 bg-light-gray rounded-full h-3">
              <div className="bg-navy rounded-full h-3 transition-all" style={{ width: `${Math.min(completionRate, 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
