import { Outlet, Link } from 'react-router-dom';
import PlayerBottomNav from './PlayerBottomNav';

export default function PlayerShell() {
  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <header className="bg-navy text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <h1 className="text-lg font-bold tracking-tight">Charlie's Dashboard</h1>
        </div>
        <Link
          to="/dashboard"
          className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-white transition-colors"
        >
          Coach View
        </Link>
      </header>

      {/* Page Content */}
      <main className="pb-24 min-h-[calc(100vh-56px)]">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <PlayerBottomNav />
    </div>
  );
}
