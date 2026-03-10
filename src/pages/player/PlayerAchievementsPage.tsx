import { useAppContext } from '../../store/AppContext';
import { usePlayerStats } from '../../hooks/usePlayerStats';

export default function PlayerAchievementsPage() {
  const { state } = useAppContext();
  const stats = usePlayerStats();

  const earned = state.achievements.filter(a => a.earned);
  const locked = state.achievements.filter(a => !a.earned);

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-black text-navy">🏆 My Badges</h2>
        <p className="text-sm text-muted-text">Collect them all!</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-2xl p-5 text-center mb-6 shadow-lg">
        <p className="text-4xl font-black">{stats.earnedBadgeCount} of {stats.totalBadgeCount}</p>
        <p className="text-sm font-semibold opacity-90">Badges Earned!</p>
        <div className="bg-white/30 rounded-full h-3 mt-3 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${(stats.earnedBadgeCount / stats.totalBadgeCount) * 100}%` }}
          />
        </div>
        {stats.earnedBadgeCount === stats.totalBadgeCount ? (
          <p className="text-xs mt-2 font-semibold">🎉 LEGENDARY! You earned them all!</p>
        ) : (
          <p className="text-xs mt-2 opacity-80">
            {stats.totalBadgeCount - stats.earnedBadgeCount} more to go — you got this!
          </p>
        )}
      </div>

      {/* Earned Badges */}
      {earned.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
            <span>🌟</span> Earned!
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {earned.map(badge => (
              <div
                key={badge.id}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-4 text-center shadow-md"
              >
                <span className="text-5xl block mb-2">{badge.icon}</span>
                <h4 className="font-bold text-navy text-sm">{badge.name}</h4>
                <p className="text-[11px] text-muted-text mt-1">{badge.description}</p>
                {badge.earnedDate && (
                  <p className="text-[10px] text-amber-600 font-semibold mt-2">
                    ✨ Earned {new Date(badge.earnedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {locked.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
            <span>🔒</span> Keep Going!
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {locked.map(badge => (
              <div
                key={badge.id}
                className="bg-gray-100 border-2 border-gray-200 rounded-2xl p-4 text-center"
              >
                <div className="relative inline-block">
                  <span className="text-5xl block mb-2 grayscale opacity-50">{badge.icon}</span>
                  <span className="absolute -top-1 -right-1 text-lg">🔒</span>
                </div>
                <h4 className="font-bold text-gray-500 text-sm">{badge.name}</h4>
                <p className="text-[11px] text-gray-400 mt-1">{badge.description}</p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5 mt-2">
                  <p className="text-[10px] text-amber-700">
                    🎯 <span className="font-semibold">{badge.criteria}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Footer */}
      <div className="text-center py-6">
        <p className="text-sm text-muted-text italic">
          "Confidence is not a feeling. It is math." 💪
        </p>
      </div>
    </div>
  );
}
