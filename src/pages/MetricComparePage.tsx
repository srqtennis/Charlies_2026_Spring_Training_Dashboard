import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';

export default function MetricComparePage() {
  const { state } = useAppContext();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <Link to="/metrics" className="text-sm text-navy hover:underline mb-4 inline-block">&larr; Back to Metrics</Link>
      <h1 className="text-2xl font-bold text-navy mb-6">Assessment Comparison</h1>

      <div className="bg-white rounded-xl border border-med-gray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-navy text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold">Metric</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Category</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Baseline</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Current</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Midpoint Target</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Final Target</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Entries</th>
              </tr>
            </thead>
            <tbody>
              {state.metrics.map((metric, i) => {
                const latestValue = metric.history.length > 0
                  ? metric.history[metric.history.length - 1].value
                  : metric.currentValue;

                return (
                  <tr key={metric.id} className={`border-b border-light-gray hover:bg-blue-50 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-light-gray'
                  }`}>
                    <td className="py-3 px-4">
                      <Link to={`/metrics/${metric.id}`} className="text-sm font-semibold text-navy hover:underline">
                        {metric.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-xs bg-light-gray px-2 py-0.5 rounded capitalize">{metric.category}</span>
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-muted-text">{metric.currentValue}</td>
                    <td className="py-3 px-4 text-center text-sm font-bold text-navy">{latestValue}</td>
                    <td className="py-3 px-4 text-center text-sm text-dark-text">{metric.midpointTarget}</td>
                    <td className="py-3 px-4 text-center text-sm text-green-600 font-semibold">{metric.finalTarget}</td>
                    <td className="py-3 px-4 text-center text-sm text-muted-text">{metric.history.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
