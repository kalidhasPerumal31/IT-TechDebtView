import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CATEGORY_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'];
const PRIORITY_COLORS = { Critical: '#ef4444', High: '#f97316', Medium: '#eab308', Low: '#22c55e' };

export default function Charts({ metrics }) {
  const categoryData = Object.entries(metrics.byCategory).map(([name, value]) => ({ name, value }));
  const priorityData = Object.entries(metrics.byPriority).map(([name, value]) => ({
    name,
    value,
    fill: PRIORITY_COLORS[name] || '#6b7280',
  }));
  const statusData = [
    { name: 'Open', value: metrics.open, fill: '#ef4444' },
    { name: 'In Progress', value: metrics.inProgress, fill: '#f59e0b' },
    { name: 'Resolved', value: metrics.resolved, fill: '#10b981' },
  ];

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3 className="chart-title">Items by Category</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {categoryData.map((entry, index) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Items by Priority</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={priorityData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" name="Items">
              {priorityData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Items by Status</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={statusData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Items">
              {statusData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
