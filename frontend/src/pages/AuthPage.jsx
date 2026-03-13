import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginUser, registerUser } from '../services/auth.js';
import { setStoredUser } from '../utils/session.js';
import { setToken } from '../utils/token.js';

const initialRegisterForm = {
  name: '',
  email: '',
  password: '',
};

const initialLoginForm = {
  email: '',
  password: '',
};

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.errors?.[0]?.message ||
    'Something went wrong. Please try again.'
  );
};

export function AuthPage({ onAuthSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('login');
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from || '/dashboard';

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((current) => ({ ...current, [name]: value }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((current) => ({ ...current, [name]: value }));
  };

  const handleAuthCompletion = (payload, successMessage) => {
    const { token, user } = payload.data;

    setToken(token);
    setStoredUser(user);
    onAuthSuccess({ token, user });
    setFeedback({
      type: 'success',
      message: successMessage,
    });
    navigate(redirectTo, { replace: true });
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const payload = await registerUser(registerForm);
      setRegisterForm(initialRegisterForm);
      handleAuthCompletion(payload, 'Account created successfully.');
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const payload = await loginUser(loginForm);
      setLoginForm(initialLoginForm);
      handleAuthCompletion(payload, 'Login successful.');
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="panel auth-panel">
        <div className="panel__header">
          <p className="eyebrow">Authentication</p>
          <h2>Register or sign in to access the dashboard.</h2>
          <p className="muted-text">
            The UI stays intentionally simple: one page, two modes, clear
            feedback, and JWT persistence in local storage.
          </p>
        </div>

        <div className="auth-toggle">
          <button
            className={`toggle-chip ${mode === 'login' ? 'toggle-chip--active' : ''}`}
            type="button"
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`toggle-chip ${mode === 'register' ? 'toggle-chip--active' : ''}`}
            type="button"
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        {feedback && (
          <div className={`alert alert--${feedback.type}`}>{feedback.message}</div>
        )}

        {mode === 'login' ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder="prince@example.com"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                placeholder="Password123"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </label>

            <button className="button button--primary button--block" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <label className="field">
              <span>Name</span>
              <input
                name="name"
                type="text"
                placeholder="Prince Kumar"
                value={registerForm.name}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder="prince@example.com"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <button className="button button--primary button--block" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
          </form>
        )}
      </div>

      <aside className="panel auth-aside">
        <div className="panel__header">
          <p className="eyebrow">Included In This Step</p>
          <h2>Session flow is now wired end to end.</h2>
        </div>

        <div className="placeholder-list">
          <span>Register</span>
          <span>Login</span>
          <span>JWT storage</span>
          <span>Route protection</span>
          <span>Error alerts</span>
        </div>

        <div className="placeholder-block">
          <p className="muted-text">
            After successful authentication, the token and user profile are
            stored locally and the app redirects to the protected dashboard.
          </p>
        </div>
      </aside>
    </section>
  );
}
