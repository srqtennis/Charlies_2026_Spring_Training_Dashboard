import { useState } from 'react';
import { pillars, researchConcepts, frameworks, coachingCues, practiceItems } from '../data/seed/coaching-system';

type Tab = 'pillars' | 'research' | 'frameworks' | 'cues' | 'practice';

export default function PillarsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('pillars');
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);
  const [cueCategory, setCueCategory] = useState('all');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'pillars', label: 'Six Pillars' },
    { key: 'research', label: 'Research' },
    { key: 'frameworks', label: 'Frameworks' },
    { key: 'cues', label: 'Coaching Cues' },
    { key: 'practice', label: 'At-Home Practice' },
  ];

  const cueCategories = ['all', ...coachingCues.map(c => c.category)];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-navy mb-2">SRQ Coaching System</h1>
      <p className="text-muted-text mb-6">Integrated coaching philosophy and reference materials</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.key ? 'bg-navy text-white' : 'bg-white text-navy border border-med-gray hover:border-navy'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pillars */}
      {activeTab === 'pillars' && (
        <div className="space-y-3">
          {pillars.map(pillar => {
            const isExpanded = expandedPillar === pillar.number;
            return (
              <div key={pillar.number} className="bg-white rounded-xl border border-med-gray overflow-hidden">
                <button onClick={() => setExpandedPillar(isExpanded ? null : pillar.number)}
                  className="w-full p-5 text-left hover:bg-blue-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg">
                      {pillar.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-navy text-lg">{pillar.name}</h3>
                      <p className="text-sm text-muted-text">{pillar.tagline}</p>
                    </div>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-light-gray pt-4">
                    <p className="text-sm text-dark-text mb-4">{pillar.description}</p>
                    <h4 className="text-xs font-bold text-navy mb-2">Application Examples</h4>
                    <ul className="space-y-1">
                      {pillar.applicationExamples.map((ex, i) => (
                        <li key={i} className="text-sm text-dark-text flex items-start gap-2">
                          <span className="text-navy mt-0.5">-</span> {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Research */}
      {activeTab === 'research' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {researchConcepts.map(concept => (
            <div key={concept.name} className="bg-white rounded-xl p-5 border border-med-gray">
              <h3 className="font-bold text-navy mb-2">{concept.name}</h3>
              <p className="text-sm text-dark-text mb-3">{concept.summary}</p>
              <div className="bg-light-gray rounded-lg p-3">
                <div className="text-xs font-bold text-navy mb-1">Application</div>
                <p className="text-sm text-dark-text">{concept.application}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Frameworks */}
      {activeTab === 'frameworks' && (
        <div className="space-y-4">
          {frameworks.map(fw => (
            <div key={fw.name} className="bg-white rounded-xl p-6 border border-med-gray">
              <h3 className="font-bold text-navy text-lg mb-2">{fw.name}</h3>
              <p className="text-sm text-dark-text mb-4">{fw.description}</p>
              <div className="space-y-2">
                {fw.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-dark-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coaching Cues */}
      {activeTab === 'cues' && (
        <div>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {cueCategories.map(cat => (
              <button key={cat} onClick={() => setCueCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  cueCategory === cat ? 'bg-srq-red text-white' : 'bg-white text-dark-text border border-med-gray'
                }`}>
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {coachingCues
              .filter(cc => cueCategory === 'all' || cc.category === cueCategory)
              .map(cc => (
                <div key={cc.category} className="bg-white rounded-xl p-5 border border-med-gray">
                  <h3 className="font-bold text-navy mb-3">{cc.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cc.cues.map((cue, i) => (
                      <div key={i} className="bg-light-gray rounded-lg px-3 py-2 text-sm text-dark-text">
                        "{cue}"
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* At-Home Practice */}
      {activeTab === 'practice' && (
        <div className="bg-white rounded-xl border border-med-gray overflow-hidden">
          <div className="bg-navy text-white py-3 px-6">
            <h3 className="font-bold">At-Home Practice Program</h3>
          </div>
          <div className="divide-y divide-light-gray">
            {practiceItems.map((item, i) => (
              <div key={i} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-navy text-sm">{item.exercise}</h4>
                  <p className="text-xs text-muted-text mt-1">{item.purpose}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-dark-text">{item.reps}</div>
                  <div className={`text-xs mt-1 px-2 py-0.5 rounded ${
                    item.frequency === 'daily' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>{item.frequency}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
