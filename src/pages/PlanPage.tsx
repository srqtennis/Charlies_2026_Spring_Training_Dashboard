import { Link } from 'react-router-dom';
import { useState } from 'react';
import { phases, weeks } from '../data/seed/training-plan';
import { getCurrentWeek } from '../utils/date';
import { PHASE_COLORS, PHASE_NAMES } from '../utils/constants';

export default function PlanPage() {
  const currentWeek = getCurrentWeek();
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | null>(null);

  const filteredWeeks = activePhase ? weeks.filter(w => w.phaseNumber === activePhase) : weeks;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-navy">Charlie Alden — 12-Week Development Plan</h1>
        <p className="text-muted-text mt-1">March 9 – May 31, 2026</p>
      </div>

      {/* Schedule Summary */}
      <div className="bg-white rounded-xl p-4 md:p-6 border border-med-gray mb-6">
        <h3 className="font-bold text-navy mb-3">Weekly Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-light-gray rounded-lg p-3">
            <div className="font-semibold text-navy">Private Sessions</div>
            <div className="text-muted-text">3x per week, 2 hours each</div>
          </div>
          <div className="bg-light-gray rounded-lg p-3">
            <div className="font-semibold text-navy">Group Sessions</div>
            <div className="text-muted-text">2x per week, 1.5 hours each</div>
          </div>
          <div className="bg-light-gray rounded-lg p-3">
            <div className="font-semibold text-navy">Total Weekly</div>
            <div className="text-muted-text">9 hours of training</div>
          </div>
        </div>
      </div>

      {/* Phase Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setActivePhase(null)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
            activePhase === null ? 'bg-navy text-white' : 'bg-white text-navy border border-med-gray hover:border-navy'
          }`}
        >
          All Weeks
        </button>
        {([1, 2, 3] as const).map(pn => (
          <button
            key={pn}
            onClick={() => setActivePhase(pn)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              activePhase === pn ? `${PHASE_COLORS[pn].bg} text-white` : 'bg-white text-navy border border-med-gray hover:border-navy'
            }`}
          >
            Phase {pn}: {PHASE_NAMES[pn]}
          </button>
        ))}
      </div>

      {/* Week Table */}
      <div className="bg-white rounded-xl border border-med-gray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-navy text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold w-16">Wk</th>
                <th className="text-left py-3 px-4 text-sm font-semibold w-28">Dates</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Tennis Focus</th>
                <th className="text-left py-3 px-4 text-sm font-semibold hidden md:table-cell">ABC Focus</th>
                <th className="text-left py-3 px-4 text-sm font-semibold hidden lg:table-cell">Milestone</th>
              </tr>
            </thead>
            <tbody>
              {filteredWeeks.map((week, i) => {
                const isCurrentWeek = week.weekNumber === currentWeek;
                const phase = phases.find(p => p.number === week.phaseNumber)!;
                const showPhaseBanner = i === 0 || filteredWeeks[i - 1]?.phaseNumber !== week.phaseNumber;

                return (
                  <Link key={week.weekNumber} to={`/plan/week/${week.weekNumber}`} className="contents">
                    {showPhaseBanner && !activePhase && (
                      <tr className={`${PHASE_COLORS[week.phaseNumber].bg}`}>
                        <td colSpan={5} className="py-2 px-4 text-white font-bold text-sm">
                          PHASE {phase.number}: {phase.name.toUpperCase()} ({phase.dateRange})
                        </td>
                      </tr>
                    )}
                    <tr className={`border-b border-light-gray hover:bg-blue-50 cursor-pointer transition-colors ${
                      isCurrentWeek ? 'bg-blue-50 border-l-4 border-l-navy' : i % 2 === 0 ? 'bg-white' : 'bg-light-gray'
                    }`}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-navy">{week.weekNumber}</span>
                          {isCurrentWeek && (
                            <span className="text-[10px] bg-navy text-white px-1.5 py-0.5 rounded font-bold">NOW</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-dark-text">{week.dateRange}</td>
                      <td className="py-3 px-4 text-sm text-dark-text">{week.tennisFocusTheme}</td>
                      <td className="py-3 px-4 text-sm text-muted-text hidden md:table-cell">{week.abcFocusTheme}</td>
                      <td className="py-3 px-4 text-sm text-muted-text hidden lg:table-cell">{week.milestone}</td>
                    </tr>
                  </Link>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
