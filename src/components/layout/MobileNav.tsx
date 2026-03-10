import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/dashboard', label: 'Home', icon: '📊' },
  { to: '/plan', label: 'Plan', icon: '📋' },
  { to: '/session/start', label: 'Track', icon: '🎾' },
  { to: '/metrics', label: 'Stats', icon: '📈' },
  { to: '/lessons', label: 'More', icon: '☰' },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-med-gray z-50">
      <div className="flex justify-around">
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs ${
                isActive ? 'text-navy font-bold' : 'text-muted-text'
              }`
            }
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
