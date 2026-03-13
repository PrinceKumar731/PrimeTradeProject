import { StatusCard } from '../components/StatusCard.jsx';

export function DashboardPage() {
  return (
    <section className="panel">
      <div className="panel__header">
        <p className="eyebrow">Step 11 Preview</p>
        <h2>Dashboard shell for protected task management.</h2>
      </div>

      <div className="dashboard-grid">
        <StatusCard label="Auth State" value="Pending UI" />
        <StatusCard label="Task CRUD" value="Backend Ready" tone="accent" />
        <StatusCard label="Filters" value="Planned" />
      </div>

      <div className="placeholder-block">
        <p className="muted-text">
          This page will become the protected task dashboard. The service layer
          is ready, but the forms and task list UI are intentionally deferred to
          the next step.
        </p>
      </div>
    </section>
  );
}
