export default function MetricCard({ title, value, subtitle, colorClass, icon }) {
  return (
    <div className={`metric-card ${colorClass}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-body">
        <div className="metric-value">{value}</div>
        <div className="metric-title">{title}</div>
        {subtitle && <div className="metric-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}
