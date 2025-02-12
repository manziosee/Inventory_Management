import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from './components/layout/header';
import { Sidebar } from './components/layout/sidebar';
import { LandingPage } from './pages/landing';
import { LoginPage } from './pages/auth/login';
import { RegisterPage } from './pages/auth/register';
import { DashboardPage } from './pages/dashboard';
import { InventoryListPage } from './pages/inventory/list';
import { NewItemPage } from './pages/inventory/new';
import { BorrowingListPage } from './pages/borrowing/list';
import { NewBorrowingPage } from './pages/borrowing/new';
import { DamageReportListPage } from './pages/damage-reports/list';
import { NewDamageReportPage } from './pages/damage-reports/new';
import { PeoplePage } from './pages/people';
import { SettingsPage } from './pages/settings';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(true);

  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    // Update landing page state based on path
    setIsLandingPage(window.location.pathname === '/');
  }, []);

  useEffect(() => {
    // Apply dark mode class to html element
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          {!isLandingPage && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          <div className="flex flex-1">
            {!isLandingPage && <Sidebar />}
            <main className={`flex-1 ${!isLandingPage ? 'p-8' : ''}`}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/inventory" element={<InventoryListPage />} />
                <Route path="/inventory/new" element={<NewItemPage />} />
                <Route path="/borrowing" element={<BorrowingListPage />} />
                <Route path="/borrowing/new" element={<NewBorrowingPage />} />
                <Route path="/damage-reports" element={<DamageReportListPage />} />
                <Route path="/damage-reports/new" element={<NewDamageReportPage />} />
                <Route path="/people" element={<PeoplePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App