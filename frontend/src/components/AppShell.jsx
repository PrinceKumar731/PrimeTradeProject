import { NavLink } from 'react-router-dom';

export function AppShell({ children, currentUser, onLogout }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Scalable REST API</p>
          <h1 className="brand">Task Manager</h1>
        </div>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/auth">Auth</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>

        <div className="session-box">
          {currentUser ? (
            <>
              <div className="session-copy">
                <span className="session-name">{currentUser.name}</span>
                <span className="session-role">{currentUser.role}</span>
              </div>
              <button className="button button--ghost button--small" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <span className="session-role">Not signed in</span>
          )}
        </div>
      </header>

      <main className="page-content">{children}</main>
    </div>
  );
}
