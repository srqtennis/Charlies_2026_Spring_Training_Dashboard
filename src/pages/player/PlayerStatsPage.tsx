import { useAppContext } from '../../store/AppContext';
import { PLAYER_METRIC_NAMES, METRIC_CATEGORY_COLORS } from '../../utils/constants';

function parseNumericValue(val: string): number | null {
  // Handle formats like "5/10", "103", "3-4", "100 (mini tennis)"
  const match = val.match(/^(\d+(?:\.\d+)?)/);
  if (match) return parseFloat(match[1]);
  return null;
}

function parseFinalTarget(val: string): number | null {
  // Handle "25+", "8/10", "150+", etc.
  const match = val.match(/(\d+(?:\.\d+)?)/);
  if (match) return parseFloat(match[1]);
  return null;
}

function getTrend(history: { value: string }[]): 'up' | 'down' | 'same' {
  if (history.length < 2) return 'same';
  const recent = history.slice(-3);
  const older = history.slice(-6, -3);
  if (older.length === 0) return 'same';

  const recentAvg = recent.reduce((sum, e) => sum + (parseNumericValue(e.value) || 0), 0) / recent.length;
  const olderAvg = older.reduce((sum, e) => sum + (parseNumericValue(e.value) || 0), 0) / older.length;

  if (recentAvg > olderAvg * 1.05) return 'up';
  if (recentAvg < olderAvg * 0.95) return 'down';
  return 'same';
}

function isPR(history: { value: string }[]): boolean {
  if (history.length < 2) return false;
  const values = history.map(h => parseNumericValue(h.value)).filter((v): v is number => v !== null);
  if (values.length < 2) return false;
  const latest = values[values.length - 1];
  const previousMax = Math.max(...values.slice(0, -1));
  return latest > previousMax;
}

const trendIcons = {
  up: '⬆️',
  down: '⬇️',
  same: '➡️',
};

const trendColors = {
  up: 'text-green-600',
  down: 'text-orange-500',
  same: 'text-blue-500',
};

const trendLabels = {
  up: 'Improving!',
  down: 'Keep Working!',
  same: 'Steady',
};

export default function PlayerStatsPage() {
  const { state } = useAppContext();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-black text-navy">📊 My Numbers</h2>
        <p className="text-sm text-muted-text">Track your progress — every number counts!</p>
      </div>

      <div className="space-y-3">
        {state.metrics.map(metric => {
          const friendlyName = PLAYER_METRIC_NAMES[metric.name] || metric.name;
          const currentNum = parseNumericValue(metric.currentValue);
          const targetNum = parseFinalTarget(metric.finalTarget);
          const trend = getTrend(metric.history);
          const isPersonalRecord = isPR(metric.history);
          const catColor = METRIC_CATEGORY_COLORS[metric.category] || 'bg-gray-500';

          // Progress calculation
          let progress = 0;
          if (currentNum !== null && targetNum !== null && targetNum > 0) {
            // For "grip find time" (lower is better), invert
            if (metric.name.includes('grip find time')) {
              progress = Math.min(100, Math.max(0, ((4 - currentNum) / (4 - 1)) * 100));
            } else {
              progress = Math.min(100, (currentNum / targetNum) * 100);
            }
          }

          return (
            <div key={metric.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${catColor}`} />
                    <h3 className="font-bold text-navy text-sm">{friendlyName}</h3>
                  </div>
                </div>
                {isPersonalRecord && (
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    🏅 NEW PR!
                  </span>
                )}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-navy">{metric.currentValue}</p>
                  <p className="text-[11px] text-muted-text">Target: {metric.finalTarget}</p>
                </div>
                <div className={`text-right ${trendColors[trend]}`}>
                  <span className="text-2xl">{trendIcons[trend]}</span>
                  <p className="text-[10px] font-semibold">{trendLabels[trend]}</p>
                </div>
              </div>

              {/* Progress Bar */}
              {targetNum !== null && (
                <div className="mt-3">
                  <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        progress >= 100 ? 'bg-green-500' : progress >= 50 ? 'bg-blue-500' : 'bg-navy'
                      }`}
                      style={{ width: `${Math.max(5, progress)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-text mt-0.5 text-right">
                    {Math.round(progress)}% to goal
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center py-6">
        <p className="text-sm text-muted-text">
          Numbers updated by Coach Michael after each session 📝
        </p>
      </div>
    </div>
  );
}
