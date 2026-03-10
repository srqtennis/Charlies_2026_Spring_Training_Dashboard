import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { drills } from '../data/seed/drills';
import { formatDateFull } from '../utils/date';
import { weeks } from '../data/seed/training-plan';

export default function LessonDetailPage() {
  const { id } = useParams();
  const { state } = useAppContext();
  const lesson = state.lessonPlans.find(lp => lp.id === id);

  if (!lesson) return <div className="p-8 text-center text-muted-text">Lesson plan not found</div>;

  const week = weeks.find(w => w.weekNumber === lesson.weekNumber);
  const hasSession = state.sessionLogs.some(s => s.lessonPlanId === lesson.id);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <Link to="/lessons" className="text-sm text-navy hover:underline mb-4 inline-block">&larr; Back to Lessons</Link>

      {/* Header */}
      <div className={`rounded-xl p-6 mb-6 ${lesson.sessionType === 'private' ? 'bg-navy' : 'bg-srq-red'} text-white`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <div className="text-sm opacity-80">
              Week {lesson.weekNumber} — {lesson.sessionType === 'private' ? 'Private' : 'Group'} Session #{lesson.sessionNumber <= 3 ? lesson.sessionNumber : lesson.sessionNumber - 3}
            </div>
            <h1 className="text-xl font-bold mt-1">{lesson.theme}</h1>
            <p className="text-sm mt-2 opacity-90">{formatDateFull(lesson.date)} — {lesson.duration} min — {lesson.location}</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            {!hasSession && (
              <Link to={`/session/start?lesson=${lesson.id}`}
                className="bg-white text-navy font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                Start Session
              </Link>
            )}
            {hasSession && <span className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold">Completed</span>}
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 border border-med-gray">
          <div className="text-xs text-muted-text">Pillar Focus</div>
          <div className="text-sm font-semibold text-navy mt-1">{lesson.pillarFocus}</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-med-gray">
          <div className="text-xs text-muted-text">Phase</div>
          <div className="text-sm font-semibold text-navy mt-1">Phase {lesson.phaseNumber}</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-med-gray">
          <div className="text-xs text-muted-text">Tennis Focus</div>
          <div className="text-sm font-semibold text-navy mt-1">{week?.tennisFocusTheme?.slice(0, 30)}...</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-med-gray">
          <div className="text-xs text-muted-text">ABC Focus</div>
          <div className="text-sm font-semibold text-navy mt-1">{week?.abcFocusTheme?.slice(0, 30)}...</div>
        </div>
      </div>

      {/* Session Blocks */}
      <div className="bg-white rounded-xl border border-med-gray overflow-hidden">
        <div className="bg-navy text-white py-3 px-6">
          <h3 className="font-bold">Session Blocks ({lesson.blocks.length})</h3>
        </div>
        <div className="divide-y divide-light-gray">
          {lesson.blocks.map((block, i) => (
            <div key={block.id} className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <h4 className="font-bold text-navy">{block.name}</h4>
                </div>
                <span className="text-sm text-muted-text">{block.duration} min</span>
              </div>
              <p className="text-sm text-dark-text ml-11 mb-3">{block.focus}</p>

              {/* Drills in this block */}
              {block.drills.length > 0 && (
                <div className="ml-11 space-y-2">
                  {block.drills.map(da => {
                    const drill = drills.find(d => d.id === da.drillId);
                    return (
                      <div key={da.drillId} className="bg-light-gray rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-mono text-muted-text">{da.drillId}</span>
                            <h5 className="text-sm font-semibold text-navy">{da.drillName}</h5>
                          </div>
                          <span className="text-xs text-muted-text">{da.duration} min</span>
                        </div>
                        {drill && (
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-dark-text"><strong>Target:</strong> {drill.targetStandard}</p>
                            <p className="text-xs text-dark-text"><strong>Cues:</strong> {drill.coachingCues}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
