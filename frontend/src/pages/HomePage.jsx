import { Link } from 'react-router-dom';

import { StatusCard } from '../components/StatusCard.jsx';

export function HomePage() {
  return (
    <section className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">Frontend Setup</p>
        <h2>Simple and minimal React UI for the backend workflow.</h2>
        <p className="muted-text">
          This frontend is intentionally lean. It gives us routing, shared API
          plumbing, and a clean shell before we build the actual auth and task
          screens.
        </p>

        <div className="cta-row">
          <Link className="button button--primary" to="/auth">
            Continue to Auth UI
          </Link>
          <Link className="button button--ghost" to="/dashboard">
            View Dashboard Shell
          </Link>
        </div>
      </div>

      <div className="status-grid">
        <StatusCard label="Framework" value="React + Vite" />
        <StatusCard label="Routing" value="Ready" tone="accent" />
        <StatusCard label="API Client" value="Configured" />
        <StatusCard label="UI Direction" value="Minimal" tone="accent" />
      </div>
    </section>
  );
}
