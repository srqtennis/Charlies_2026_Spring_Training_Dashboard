import { useState } from 'react';
import { drills } from '../data/seed/drills';

export default function DrillLibraryPage() {
  const [tierFilter, setTierFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tiers = [...new Set(drills.map(d => d.tier))];
  const domains = [...new Set(drills.map(d => d.skillDomain))];
  const phases = [...new Set(drills.map(d => d.sessionPhase))];

  const filtered = drills
    .filter(d => tierFilter === 'all' || d.tier === tierFilter)
    .filter(d => domainFilter === 'all' || d.skillDomain === domainFilter)
    .filter(d => phaseFilter === 'all' || d.sessionPhase === phaseFilter)
    .filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-navy mb-2">Drill Library</h1>
      <p className="text-muted-text mb-6">{drills.length} drills in the SRQ system</p>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-med-gray mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search drills..."
            className="px-3 py-2 rounded-lg border border-med-gray text-sm" />
          <select value={tierFilter} onChange={e => setTierFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-med-gray text-sm">
            <option value="all">All Tiers</option>
            {tiers.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-med-gray text-sm">
            <option value="all">All Domains</option>
            {domains.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={phaseFilter} onChange={e => setPhaseFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-med-gray text-sm">
            <option value="all">All Phases</option>
            {phases.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Drill Cards */}
      <div className="space-y-3">
        {filtered.map(drill => {
          const isExpanded = expandedId === drill.id;
          return (
            <div key={drill.id} className="bg-white rounded-xl border border-med-gray overflow-hidden">
              <button onClick={() => setExpandedId(isExpanded ? null : drill.id)}
                className="w-full p-4 text-left hover:bg-blue-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-text">{drill.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                        drill.tier.includes('1') ? 'bg-green-100 text-green-700' :
                        drill.tier.includes('2') ? 'bg-blue-100 text-blue-700' :
                        drill.tier.includes('3') ? 'bg-purple-100 text-purple-700' :
                        'bg-red-100 text-red-700'
                      }`}>{drill.tier}</span>
                      {drill.coreDrill && <span className="text-xs bg-navy text-white px-2 py-0.5 rounded">Core</span>}
                    </div>
                    <h3 className="font-bold text-navy">{drill.name}</h3>
                    <p className="text-sm text-muted-text mt-1">{drill.skillDomain} | {drill.sessionPhase} | {drill.strokeFocus}</p>
                  </div>
                  <span className="text-muted-text text-lg">{isExpanded ? '-' : '+'}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-light-gray pt-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><span className="text-muted-text">Duration:</span> <span className="font-semibold">{drill.duration}</span></div>
                    <div><span className="text-muted-text">Players:</span> <span className="font-semibold">{drill.players}</span></div>
                    <div><span className="text-muted-text">Age Group:</span> <span className="font-semibold">{drill.ageGroup}</span></div>
                    <div><span className="text-muted-text">Skill Level:</span> <span className="font-semibold">{drill.skillLevel}</span></div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-navy mb-1">Objective</h4>
                    <p className="text-sm text-dark-text">{drill.objective}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-navy mb-1">Setup</h4>
                    <p className="text-sm text-dark-text">{drill.setupInstructions}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-navy mb-1">Steps</h4>
                    <p className="text-sm text-dark-text whitespace-pre-wrap">{drill.stepByStepInstructions}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-navy mb-1">Target Standard</h4>
                      <p className="text-sm text-dark-text">{drill.targetStandard}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy mb-1">Coaching Cues</h4>
                      <p className="text-sm text-dark-text">{drill.coachingCues}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-green-600 mb-1">Progression</h4>
                      <p className="text-sm text-dark-text">{drill.progression}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-srq-red mb-1">Regression</h4>
                      <p className="text-sm text-dark-text">{drill.regression}</p>
                    </div>
                  </div>

                  <div className="bg-light-gray rounded-lg p-3">
                    <h4 className="text-xs font-bold text-navy mb-1">Primary Pillar: {drill.primaryPillar}</h4>
                    {drill.supportPillars && <p className="text-xs text-muted-text">Support: {drill.supportPillars}</p>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-med-gray text-center text-muted-text">
          No drills match your filters
        </div>
      )}
    </div>
  );
}
