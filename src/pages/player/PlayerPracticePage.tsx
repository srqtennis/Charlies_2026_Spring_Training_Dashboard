import { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { usePlayerStats, getPracticeItemsForDate } from '../../hooks/usePlayerStats';

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const today = getToday();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (dateStr === today) return 'Today';
  if (dateStr === yesterdayStr) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export default function PlayerPracticePage() {
  const { state, dispatch } = useAppContext();
  const stats = usePlayerStats();
  const [selectedDate, setSelectedDate] = useState(getToday());

  const todayItems = getPracticeItemsForDate(selectedDate);
  const dailyItems = todayItems.filter(i => i.frequency === 'daily');
  const weeklyItems = todayItems.filter(i => i.frequency === 'weekly');

  const isChecked = (exercise: string): boolean => {
    return state.practiceCheckoffs.some(
      pc => pc.date === selectedDate && pc.exercise === exercise && pc.completed
    );
  };

  const completedCount = todayItems.filter(i => isChecked(i.exercise)).length;
  const totalCount = todayItems.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleToggle = (exercise: string) => {
    dispatch({
      type: 'TOGGLE_PRACTICE_CHECKOFF',
      payload: { date: selectedDate, exercise },
    });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-black text-navy">✅ Practice</h2>
        <p className="text-sm text-muted-text">Check off your exercises every day!</p>
      </div>

      {/* Streak Banner */}
      {stats.practiceStreak > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-4 text-center mb-4 shadow-lg">
          <span className="text-4xl">🔥</span>
          <p className="text-3xl font-black mt-1">{stats.practiceStreak} Day Streak!</p>
          <p className="text-xs opacity-80">Keep it going!</p>
        </div>
      )}

      {/* Date Selector */}
      <div className="flex items-center justify-between bg-white rounded-xl p-3 mb-4 shadow-sm">
        <button
          onClick={() => setSelectedDate(addDays(selectedDate, -1))}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-navy font-bold text-lg"
        >
          ←
        </button>
        <span className="font-bold text-navy">{formatDateLabel(selectedDate)}</span>
        <button
          onClick={() => {
            const next = addDays(selectedDate, 1);
            if (next <= getToday()) setSelectedDate(next);
          }}
          disabled={selectedDate >= getToday()}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold ${
            selectedDate >= getToday()
              ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
              : 'bg-gray-100 hover:bg-gray-200 text-navy'
          }`}
        >
          →
        </button>
      </div>

      {/* Progress Ring */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18" cy="18" r="15.9"
              fill="none" stroke="#E0E0E0" strokeWidth="2.5"
            />
            <circle
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke={completedCount === totalCount && totalCount > 0 ? '#22c55e' : '#002E5D'}
              strokeWidth="2.5"
              strokeDasharray={`${progressPercent} 100`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {completedCount === totalCount && totalCount > 0 ? (
              <>
                <span className="text-3xl">🌟</span>
                <span className="text-xs font-bold text-green-600">All Done!</span>
              </>
            ) : (
              <>
                <span className="text-2xl font-black text-navy">{completedCount}/{totalCount}</span>
                <span className="text-[10px] text-muted-text">completed</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Daily Exercises */}
      {dailyItems.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
            <span>📋</span> Daily Exercises
          </h3>
          <div className="space-y-2">
            {dailyItems.map(item => {
              const checked = isChecked(item.exercise);
              return (
                <button
                  key={item.exercise}
                  onClick={() => handleToggle(item.exercise)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    checked
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200 hover:border-navy'
                  }`}
                >
                  {/* Checkbox */}
                  <div className={`w-[60px] h-[60px] min-w-[60px] rounded-xl flex items-center justify-center text-2xl transition-all ${
                    checked
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {checked ? '✓' : '○'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${checked ? 'text-green-700 line-through' : 'text-navy'}`}>
                      {item.exercise}
                    </p>
                    <p className="text-xs text-muted-text">{item.reps}</p>
                    <p className="text-[10px] text-muted-text">{item.purpose}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekly Exercises */}
      {weeklyItems.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
            <span>🗓️</span> Weekly Exercises (Mon/Wed/Fri)
          </h3>
          <div className="space-y-2">
            {weeklyItems.map(item => {
              const checked = isChecked(item.exercise);
              return (
                <button
                  key={item.exercise}
                  onClick={() => handleToggle(item.exercise)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    checked
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200 hover:border-navy'
                  }`}
                >
                  <div className={`w-[60px] h-[60px] min-w-[60px] rounded-xl flex items-center justify-center text-2xl transition-all ${
                    checked
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {checked ? '✓' : '○'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${checked ? 'text-green-700 line-through' : 'text-navy'}`}>
                      {item.exercise}
                    </p>
                    <p className="text-xs text-muted-text">{item.reps}</p>
                    <p className="text-[10px] text-muted-text">{item.purpose}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No exercises for this day */}
      {todayItems.length === 0 && (
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <span className="text-4xl block mb-2">😎</span>
          <p className="font-bold text-navy">Rest Day!</p>
          <p className="text-sm text-muted-text">No weekly exercises today. Daily exercises apply every day.</p>
        </div>
      )}

      {/* Motivational Footer */}
      <div className="text-center py-6">
        <p className="text-sm text-muted-text italic">
          "Practice doesn't make perfect. Practice makes permanent." 💯
        </p>
      </div>
    </div>
  );
}
