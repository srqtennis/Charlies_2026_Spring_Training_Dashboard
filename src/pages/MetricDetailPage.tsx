import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { formatDate } from '../utils/date';

export default function MetricDetailPage() {
  const { id } = useParams();
  const { state, dispatch } = useAppContext();
  const metric = state.metrics.find(m => m.id === id);

  const [newValue, setNewValue] = useState('');
  const [newNotes, setNewNotes] = useState('');

  if (!metric) return <div className="p-8 text-center text-muted-text">Metric not found</div>;

  const chartData = metric.history.map(h => ({
    date: formatDate(h.date),
    value: parseFloat(h.value) || 0,
  }));

  const baselineNum = parseFloat(metric.currentValue) || 0;
  const midNum = parseFloat(metric.midpointTarget) || 0;
  const finalNum = parseFloat(metric.finalTarget) || 0;

  const addEntry = () => {
    if (!newValue.trim()) return;
    const entry = {
      date: new Date().toISOString().split('T')[0],
      value: newValue,
      sessionId: '',
      notes: newNotes,
    };
    const updated = {
      ...metric,
      currentValue: newValue,
      history: [...metric.history, entry],
    };
    dispatch({ type: 'UPDATE_METRIC', payload: updated });
    setNewValue('');
    setNewNotes('');
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <Link to="/metrics" className="text-sm text-navy hover:underline mb-4 inline-block">&larr; Back to Metrics</Link>

      <div className="bg-white rounded-xl p-6 border border-med-gray mb-6">
        <h1 className="text-2xl font-bold text-navy">{metric.name}</h1>
        <p className="text-muted-text mt-1">{metric.unit}</p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-light-gray rounded-lg p-3 text-center">
            <div className="text-xs text-muted-text">Current</div>
            <div className="text-xl font-bold text-navy">{metric.currentValue}</div>
          </div>
          <div className="bg-light-gray rounded-lg p-3 text-center">
            <div className="text-xs text-muted-text">Midpoint Target</div>
            <div className="text-xl font-bold text-dark-text">{metric.midpointTarget}</div>
          </div>
          <div className="bg-light-gray rounded-lg p-3 text-center">
            <div className="text-xs text-muted-text">Final Target</div>
            <div className="text-xl font-bold text-green-600">{metric.finalTarget}</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-6">
        <h3 className="font-bold text-navy mb-4">Progress Chart</h3>
        {chartData.length > 0 ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <ReferenceLine y={baselineNum} stroke="#888" strokeDasharray="3 3" label={{ value: 'Baseline', position: 'left', fontSize: 10 }} />
                {midNum > 0 && <ReferenceLine y={midNum} stroke="#E4002B" strokeDasharray="3 3" label={{ value: 'Mid', position: 'left', fontSize: 10 }} />}
                {finalNum > 0 && <ReferenceLine y={finalNum} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'Final', position: 'left', fontSize: 10 }} />}
                <Line type="monotone" dataKey="value" stroke="#002E5D" strokeWidth={3} dot={{ fill: '#002E5D', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72 flex items-center justify-center text-muted-text">No data points yet. Add your first measurement below.</div>
        )}
      </div>

      {/* Add Measurement */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-6">
        <h3 className="font-bold text-navy mb-3">Log Measurement</h3>
        <div className="flex gap-3">
          <input value={newValue} onChange={e => setNewValue(e.target.value)}
            placeholder="Value" type="text"
            className="flex-1 px-3 py-2 rounded-lg border border-med-gray text-sm" />
          <input value={newNotes} onChange={e => setNewNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="flex-1 px-3 py-2 rounded-lg border border-med-gray text-sm" />
          <button onClick={addEntry}
            className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition-colors">
            Add
          </button>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-xl p-6 border border-med-gray">
        <h3 className="font-bold text-navy mb-3">History ({metric.history.length} entries)</h3>
        {metric.history.length === 0 ? (
          <p className="text-muted-text text-sm">No entries yet</p>
        ) : (
          <div className="space-y-2">
            {[...metric.history].reverse().map((entry, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-light-gray last:border-0">
                <div>
                  <span className="text-sm font-medium text-dark-text">{formatDate(entry.date)}</span>
                  {entry.notes && <span className="text-xs text-muted-text ml-2">— {entry.notes}</span>}
                </div>
                <span className="text-sm font-bold text-navy">{entry.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
