import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppShell } from './components/AppShell.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { AuthPage } from './pages/AuthPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { getCurrentUser } from './services/auth.js';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from './utils/session.js';
import { clearToken, getToken } from './utils/token.js';

function App() {
  const [session, setSession] = useState({
    token: getToken(),
    user: getStoredUser(),
  });

  useEffect(() => {
    const syncStoredSession = async () => {
      if (!session.token || session.user) {
        return;
      }

      try {
        const payload = await getCurrentUser();
        setStoredUser(payload.data);
        setSession((current) => ({
          ...current,
          user: payload.data,
        }));
      } catch (error) {
        clearToken();
        clearStoredUser();
        setSession({
          token: null,
          user: null,
        });
      }
    };

    syncStoredSession();
  }, [session.token, session.user]);

  const handleAuthSuccess = ({ token, user }) => {
    setSession({
      token,
      user,
    });
  };

  const handleLogout = () => {
    clearToken();
    clearStoredUser();
    setSession({
      token: null,
      user: null,
    });
  };

  return (
    <AppShell currentUser={session.user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={<AuthPage onAuthSuccess={handleAuthSuccess} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage currentUser={session.user} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
