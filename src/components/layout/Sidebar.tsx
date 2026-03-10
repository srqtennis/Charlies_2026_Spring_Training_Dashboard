import { NavLink } from 'react-router-dom';
import { getCurrentWeek } from '../../utils/date';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/plan', label: 'Training Plan', icon: '📋' },
  { to: '/lessons', label: 'Lesson Plans', icon: '📝' },
  { to: '/sessions', label: 'Sessions', icon: '🎾' },
  { to: '/metrics', label: 'Metrics', icon: '📈' },
  { to: '/drills', label: 'Drill Library', icon: '🏋️' },
  { to: '/system/pillars', label: 'Coaching System', icon: '⚡' },
];

export default function Sidebar() {
  const currentWeek = getCurrentWeek();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-navy text-white min-h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-white/20">
        <h1 className="text-lg font-bold">SRQ Tennis</h1>
        <p className="text-sm text-white/70 mt-1">Charlie Alden</p>
        <div className="mt-2 bg-white/10 rounded px-2 py-1 text-xs inline-block">
          Week {currentWeek} of 12
        </div>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm text-white transition-colors ${
                isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <NavLink
          to="/session/start"
          className="block w-full text-center bg-srq-red hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Start Session
        </NavLink>
      </div>
    </aside>
  );
}
