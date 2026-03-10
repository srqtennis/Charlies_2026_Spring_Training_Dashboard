import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { formatDate } from '../utils/date';
import { weeks } from '../data/seed/training-plan';

export default function LessonsPage() {
  const { state } = useAppContext();
  const [filterWeek, setFilterWeek] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'private' | 'group'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'planned' | 'completed'>('all');

  let filtered = state.lessonPlans;
  if (filterWeek) filtered = filtered.filter(lp => lp.weekNumber === filterWeek);
  if (filterType !== 'all') filtered = filtered.filter(lp => lp.sessionType === filterType);
  if (filterStatus !== 'all') filtered = filtered.filter(lp => lp.status === filterStatus);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy">Lesson Plans</h1>
          <p className="text-muted-text mt-1">{state.lessonPlans.length} total lesson plans</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select value={filterWeek || ''} onChange={e => setFilterWeek(e.target.value ? parseInt(e.target.value) : null)}
          className="px-3 py-2 rounded-lg border border-med-gray text-sm bg-white">
          <option value="">All Weeks</option>
          {weeks.map(w => <option key={w.weekNumber} value={w.weekNumber}>Week {w.weekNumber} ({w.dateRange})</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value as typeof filterType)}
          className="px-3 py-2 rounded-lg border border-med-gray text-sm bg-white">
          <option value="all">All Types</option>
          <option value="private">Private</option>
          <option value="group">Group</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
          className="px-3 py-2 rounded-lg border border-med-gray text-sm bg-white">
          <option value="all">All Status</option>
          <option value="planned">Planned</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(lesson => (
          <Link key={lesson.id} to={`/lessons/${lesson.id}`}
            className={`bg-white rounded-xl p-5 border transition-colors hover:border-navy ${
              lesson.sessionType === 'private' ? 'border-l-4 border-l-navy' : 'border-l-4 border-l-srq-red'
            } border-med-gray`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                lesson.sessionType === 'private' ? 'bg-navy text-white' : 'bg-srq-red text-white'
              }`}>
                {lesson.sessionType === 'private' ? 'Private' : 'Group'}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                lesson.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {lesson.status}
              </span>
            </div>
            <h3 className="font-semibold text-navy text-sm mt-2">Week {lesson.weekNumber} — Session {lesson.sessionNumber}</h3>
            <p className="text-xs text-muted-text mt-1">{formatDate(lesson.date)} — {lesson.duration} min</p>
            <p className="text-xs text-dark-text mt-2 line-clamp-2">{lesson.theme}</p>
            <div className="mt-3 text-xs text-muted-text">{lesson.blocks.length} blocks — {lesson.pillarFocus}</div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-text">
          <p>No lesson plans match your filters.</p>
        </div>
      )}
    </div>
  );
}
