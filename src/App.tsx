import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from './components/layout/header';
import { Sidebar } from './components/layout/sidebar';
import { Footer } from './components/layout/footer';
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
import { AddPersonPage } from './pages/people/add';
import { SettingsPage } from './pages/settings';

// Mock authentication state
const isAuthenticated = true; // This should be replaced with actual auth logic

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to html element
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Don't show header/footer/sidebar on auth pages and landing page
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {!isAuthPage && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        <div className="flex flex-1">
          {!isAuthPage && <Sidebar />}
          <main className={`flex-1 ${!isAuthPage ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' : ''}`}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/inventory" element={<PrivateRoute><InventoryListPage /></PrivateRoute>} />
              <Route path="/inventory/new" element={<PrivateRoute><NewItemPage /></PrivateRoute>} />
              <Route path="/borrowing" element={<PrivateRoute><BorrowingListPage /></PrivateRoute>} />
              <Route path="/borrowing/new" element={<PrivateRoute><NewBorrowingPage /></PrivateRoute>} />
              <Route path="/damage-reports" element={<PrivateRoute><DamageReportListPage /></PrivateRoute>} />
              <Route path="/damage-reports/new" element={<PrivateRoute><NewDamageReportPage /></PrivateRoute>} />
              <Route path="/people" element={<PrivateRoute><PeoplePage /></PrivateRoute>} />
              <Route path="/people/add" element={<PrivateRoute><AddPersonPage /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
}