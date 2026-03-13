export function StatusCard({ label, value, tone = 'default' }) {
  return (
    <article className={`status-card status-card--${tone}`}>
      <span className="status-card__label">{label}</span>
      <strong className="status-card__value">{value}</strong>
    </article>
  );
}
