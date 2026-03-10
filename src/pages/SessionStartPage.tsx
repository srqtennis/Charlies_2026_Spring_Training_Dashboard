import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { nanoid } from 'nanoid';
import { SessionLog, PlayerEnergy, PlayerMood } from '../types';
import { getCurrentWeek, formatDate } from '../utils/date';

export default function SessionStartPage() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('lesson');

  const currentWeek = getCurrentWeek();
  const weekLessons = state.lessonPlans.filter(lp => lp.weekNumber === currentWeek);
  const [selectedLessonId, setSelectedLessonId] = useState(preselectedId || weekLessons[0]?.id || '');
  const [energy, setEnergy] = useState<PlayerEnergy>('medium');
  const [mood, setMood] = useState<PlayerMood>('focused');
  const [location, setLocation] = useState('Potter Park');
  const [weather, setWeather] = useState('Sunny');

  const selectedLesson = state.lessonPlans.find(lp => lp.id === selectedLessonId);

  function startSession() {
    if (!selectedLesson) return;
    const session: SessionLog = {
      id: nanoid(),
      lessonPlanId: selectedLesson.id,
      date: new Date().toISOString().split('T')[0],
      startTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      endTime: '',
      sessionType: selectedLesson.sessionType,
      location,
      weather,
      playerEnergy: energy,
      playerMood: mood,
      metrics: [],
      drillResults: [],
      coachNotes: '',
      keyWins: [],
      areasToWatch: [],
      homeAssignments: [],
      emotionalNotes: '',
      betweenPointRoutine: 'not_used',
      parentSummary: '',
    };
    dispatch({ type: 'ADD_SESSION_LOG', payload: session });
    dispatch({ type: 'SET_ACTIVE_SESSION', payload: session.id });
    navigate(`/session/active/${session.id}`);
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <Link to="/dashboard" className="text-sm text-navy hover:underline mb-4 inline-block">&larr; Back</Link>
      <h1 className="text-2xl font-bold text-navy mb-6">Start a Session</h1>

      {/* Lesson Selection */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-4">
        <h3 className="font-bold text-navy mb-3">Select Lesson Plan</h3>
        <select value={selectedLessonId} onChange={e => setSelectedLessonId(e.target.value)}
          className="w-full px-3 py-3 rounded-lg border border-med-gray text-sm">
          <option value="">-- Choose a lesson plan --</option>
          {state.lessonPlans.map(lp => (
            <option key={lp.id} value={lp.id}>
              Wk {lp.weekNumber} - {lp.sessionType === 'private' ? 'Priv' : 'Group'} #{lp.sessionNumber} — {formatDate(lp.date)} — {lp.theme.slice(0, 50)}
            </option>
          ))}
        </select>
        {selectedLesson && (
          <div className="mt-3 p-3 bg-light-gray rounded-lg text-sm">
            <p className="font-semibold text-navy">{selectedLesson.theme}</p>
            <p className="text-muted-text mt-1">{selectedLesson.duration} min — {selectedLesson.blocks.length} blocks</p>
          </div>
        )}
      </div>

      {/* Session Setup */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-4 space-y-4">
        <h3 className="font-bold text-navy">Session Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-text block mb-1">Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-med-gray text-sm">
              <option>Potter Park</option>
              <option>Pineview School</option>
              <option>Brookside</option>
              <option>Home Court</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-text block mb-1">Weather</label>
            <select value={weather} onChange={e => setWeather(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-med-gray text-sm">
              <option>Sunny</option>
              <option>Cloudy</option>
              <option>Hot</option>
              <option>Windy</option>
              <option>Light Rain</option>
            </select>
          </div>
        </div>
      </div>

      {/* Energy & Mood */}
      <div className="bg-white rounded-xl p-6 border border-med-gray mb-6 space-y-4">
        <h3 className="font-bold text-navy">Charlie's State</h3>
        <div>
          <label className="text-sm text-muted-text block mb-2">Energy Level</label>
          <div className="flex gap-2">
            {(['high', 'medium', 'low'] as const).map(e => (
              <button key={e} onClick={() => setEnergy(e)}
                className={`flex-1 py-3 rounded-lg text-sm font-semibold capitalize transition-colors ${
                  energy === e ? 'bg-navy text-white' : 'bg-light-gray text-dark-text hover:bg-med-gray'
                }`}>{e}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm text-muted-text block mb-2">Mood</label>
          <div className="grid grid-cols-2 gap-2">
            {(['focused', 'fired_up', 'frustrated', 'flat'] as const).map(m => (
              <button key={m} onClick={() => setMood(m)}
                className={`py-3 rounded-lg text-sm font-semibold capitalize transition-colors ${
                  mood === m ? 'bg-navy text-white' : 'bg-light-gray text-dark-text hover:bg-med-gray'
                }`}>{m.replace('_', ' ')}</button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={startSession} disabled={!selectedLessonId}
        className="w-full bg-srq-red text-white font-bold py-4 rounded-xl text-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        Start Session
      </button>
    </div>
  );
}
