import { Link } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { usePlayerStats } from '../../hooks/usePlayerStats';
import { getCurrentWeek, getCurrentPhase } from '../../utils/date';
import { PHASE_NAMES } from '../../utils/constants';
import { weeks } from '../../data/seed/training-plan';

export default function PlayerHomePage() {
  const { state } = useAppContext();
  const stats = usePlayerStats();
  const currentWeek = getCurrentWeek();
  const currentPhase = getCurrentPhase();
  const weekData = weeks.find(w => w.weekNumber === currentWeek);

  const recentBadges = state.achievements
    .filter(a => a.earned)
    .sort((a, b) => b.earnedDate.localeCompare(a.earnedDate))
    .slice(0, 3);

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-navy to-blue-800 text-white rounded-2xl p-6 text-center shadow-lg">
        <p className="text-sm opacity-80 mb-1">Level {stats.currentLevel.level}</p>
        <h2 className="text-3xl font-black mb-1">{stats.currentLevel.name}</h2>
        <p className="text-5xl font-black my-3">{stats.totalXP} <span className="text-lg font-normal">XP</span></p>

        {/* XP Progress Bar */}
        {stats.nextLevel && (
          <div className="mt-3">
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.xpProgress}%` }}
              />
            </div>
            <p className="text-xs mt-1 opacity-70">
              {stats.xpToNextLevel} XP to Level {stats.nextLevel.level} — {stats.nextLevel.name}
            </p>
          </div>
        )}
      </div>

      {/* Streak + Sessions Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <span className="text-3xl">🔥</span>
          <p className="text-2xl font-black text-navy mt-1">{stats.practiceStreak}</p>
          <p className="text-xs text-muted-text">Day Streak</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <span className="text-3xl">🎾</span>
          <p className="text-2xl font-black text-navy mt-1">{stats.totalSessions}</p>
          <p className="text-xs text-muted-text">Sessions Done</p>
        </div>
      </div>

      {/* This Week's Focus */}
      {weekData && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📅</span>
            <h3 className="font-bold text-navy">Week {currentWeek} — Phase {currentPhase}</h3>
          </div>
          <p className="text-sm font-semibold text-dark-text">{weekData.tennisFocusTheme}</p>
          <p className="text-xs text-muted-text mt-1">{PHASE_NAMES[currentPhase]}</p>
          <p className="text-xs text-muted-text">{weekData.dateRange}</p>
        </div>
      )}

      {/* Today's Practice Quick View */}
      <Link to="/player/practice" className="block">
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <h3 className="font-bold text-navy">Today's Practice</h3>
            </div>
            <div className="flex items-center gap-2">
              {/* Mini progress ring */}
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18" cy="18" r="15.9"
                    fill="none" stroke="#E0E0E0" strokeWidth="3"
                  />
                  <circle
                    cx="18" cy="18" r="15.9"
                    fill="none" stroke="#002E5D" strokeWidth="3"
                    strokeDasharray={`${stats.todayPracticeTotal > 0 ? (stats.todayPracticeCompleted / stats.todayPracticeTotal) * 100 : 0} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-navy">
                  {stats.todayPracticeCompleted}/{stats.todayPracticeTotal}
                </span>
              </div>
            </div>
          </div>
          {stats.todayPracticeCompleted === stats.todayPracticeTotal && stats.todayPracticeTotal > 0 ? (
            <p className="text-sm text-green-600 font-semibold mt-2">All done today! Great job! 🌟</p>
          ) : (
            <p className="text-sm text-muted-text mt-2">
              {stats.todayPracticeTotal - stats.todayPracticeCompleted} exercises left — tap to check them off!
            </p>
          )}
        </div>
      </Link>

      {/* Recent Badges */}
      {recentBadges.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h3 className="font-bold text-navy">Recent Badges</h3>
            </div>
            <Link to="/player/achievements" className="text-xs text-navy font-semibold">
              See All →
            </Link>
          </div>
          <div className="flex gap-3">
            {recentBadges.map(badge => (
              <div key={badge.id} className="flex-1 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                <span className="text-3xl">{badge.icon}</span>
                <p className="text-xs font-bold text-navy mt-1">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges Progress */}
      <Link to="/player/achievements" className="block">
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⭐</span>
            <h3 className="font-bold text-navy">
              {stats.earnedBadgeCount} of {stats.totalBadgeCount} Badges Earned!
            </h3>
          </div>
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all"
              style={{ width: `${(stats.earnedBadgeCount / stats.totalBadgeCount) * 100}%` }}
            />
          </div>
        </div>
      </Link>

      {/* Motivational Footer */}
      <div className="text-center py-4">
        <p className="text-sm text-muted-text italic">
          "Accuracy first. Speed follows. Always." 🎾
        </p>
      </div>
    </div>
  );
}
