import { StatusCard } from '../components/StatusCard.jsx';

export function DashboardPage({ currentUser }) {
  return (
    <section className="panel">
      <div className="panel__header">
        <p className="eyebrow">Protected Dashboard</p>
        <h2>Authenticated users can now reach this route.</h2>
      </div>

      <div className="dashboard-grid">
        <StatusCard label="Auth State" value="Active" tone="accent" />
        <StatusCard label="Task CRUD" value="Backend Ready" tone="accent" />
        <StatusCard label="Signed In As" value={currentUser?.role || 'user'} />
      </div>

      <div className="placeholder-block">
        <p className="muted-text">
          {currentUser?.name
            ? `${currentUser.name} is authenticated. In the next step this page will be upgraded into the full task CRUD workspace.`
            : 'This page will become the full task workspace in the next step.'}
        </p>
      </div>
    </section>
  );
}
