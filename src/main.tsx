import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import AppShell from './components/layout/AppShell';
import DashboardPage from './pages/DashboardPage';
import PlanPage from './pages/PlanPage';
import WeekDetailPage from './pages/WeekDetailPage';
import PhaseDetailPage from './pages/PhaseDetailPage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import SessionStartPage from './pages/SessionStartPage';
import SessionActivePage from './pages/SessionActivePage';
import SessionCompletePage from './pages/SessionCompletePage';
import SessionHistoryPage from './pages/SessionHistoryPage';
import SessionRecapPage from './pages/SessionRecapPage';
import MetricsPage from './pages/MetricsPage';
import MetricDetailPage from './pages/MetricDetailPage';
import MetricComparePage from './pages/MetricComparePage';
import DrillLibraryPage from './pages/DrillLibraryPage';
import PillarsPage from './pages/PillarsPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/plan/week/:weekNumber" element={<WeekDetailPage />} />
            <Route path="/plan/phase/:phaseNumber" element={<PhaseDetailPage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/lessons/:id" element={<LessonDetailPage />} />
            <Route path="/session/start" element={<SessionStartPage />} />
            <Route path="/session/active/:id" element={<SessionActivePage />} />
            <Route path="/session/complete/:id" element={<SessionCompletePage />} />
            <Route path="/sessions" element={<SessionHistoryPage />} />
            <Route path="/sessions/:id" element={<SessionRecapPage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            <Route path="/metrics/compare" element={<MetricComparePage />} />
            <Route path="/metrics/:id" element={<MetricDetailPage />} />
            <Route path="/drills" element={<DrillLibraryPage />} />
            <Route path="/system/pillars" element={<PillarsPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </HashRouter>
  </StrictMode>,
);
