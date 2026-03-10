import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/player', icon: '🏠', label: 'Home' },
  { to: '/player/stats', icon: '📊', label: 'My Numbers' },
  { to: '/player/achievements', icon: '🏆', label: 'Badges' },
  { to: '/player/practice', icon: '✅', label: 'Practice' },
];

export default function PlayerBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-med-gray z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/player'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all ${
                isActive
                  ? 'bg-navy text-white scale-105'
                  : 'text-gray-500 hover:text-navy'
              }`
            }
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span className="text-[10px] font-semibold mt-0.5">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
