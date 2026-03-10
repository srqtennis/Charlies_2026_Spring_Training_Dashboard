import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-light-gray">
      <Sidebar />
      <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}
