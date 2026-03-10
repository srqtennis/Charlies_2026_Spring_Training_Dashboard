import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const CATEGORY_LABELS: Record<string, string> = {
  stroke: 'Strokes',
  serve: 'Serve',
  rally: 'Rally',
  movement: 'Movement',
  mental: 'Mental',
  tactical: 'Tactical',
};

export default function MetricsPage() {
  const { state } = useAppContext();
  const categories = [...new Set(state.metrics.map(m => m.category))];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Metrics & Assessment</h1>
          <p className="text-muted-text mt-1">Track Charlie's progress across all key areas</p>
        </div>
        <Link to="/metrics/compare" className="bg-navy text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-blue-900 transition-colors">
          Compare All
        </Link>
      </div>

      {categories.map(cat => (
        <div key={cat} className="mb-8">
          <h2 className="text-lg font-bold text-navy mb-3">{CATEGORY_LABELS[cat] || cat}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.metrics.filter(m => m.category === cat).map(metric => {
              const historyData = metric.history.map((h, i) => ({ x: i, y: parseFloat(h.value) || 0 }));
              return (
                <Link key={metric.id} to={`/metrics/${metric.id}`}
                  className="bg-white rounded-xl p-5 border border-med-gray hover:border-navy transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-navy text-sm">{metric.name}</h3>
                      <p className="text-xs text-muted-text mt-1">{metric.unit}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-navy">{metric.currentValue}</div>
                    </div>
                  </div>
                  <div className="h-12 mb-3">
                    {historyData.length > 1 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historyData}>
                          <Line type="monotone" dataKey="y" stroke="#002E5D" strokeWidth={2} dot={false} />
                          <Tooltip />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-muted-text">No trend data yet</div>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-light-gray rounded-lg py-1">
                      <div className="text-muted-text">Baseline</div>
                      <div className="font-semibold text-dark-text">{metric.currentValue}</div>
                    </div>
                    <div className="bg-light-gray rounded-lg py-1">
                      <div className="text-muted-text">Mid</div>
                      <div className="font-semibold text-dark-text">{metric.midpointTarget}</div>
                    </div>
                    <div className="bg-light-gray rounded-lg py-1">
                      <div className="text-muted-text">Final</div>
                      <div className="font-semibold text-dark-text">{metric.finalTarget}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
