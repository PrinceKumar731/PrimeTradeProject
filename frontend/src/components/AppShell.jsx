import { NavLink } from 'react-router-dom';

export function AppShell({ children }) {
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
      </header>

      <main className="page-content">{children}</main>
    </div>
  );
}
