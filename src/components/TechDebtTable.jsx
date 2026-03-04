const NOW = new Date();

const isOverdue = (dueDate, status) => status !== 'Resolved' && new Date(dueDate) < NOW;

const PRIORITY_CLASSES = {
  Critical: 'badge badge-critical',
  High: 'badge badge-high',
  Medium: 'badge badge-medium',
  Low: 'badge badge-low',
};

const STATUS_CLASSES = {
  Open: 'badge badge-open',
  'In Progress': 'badge badge-inprogress',
  Resolved: 'badge badge-resolved',
};

export default function TechDebtTable({ items, onSelect }) {
  if (items.length === 0) {
    return <div className="empty-state">No items match your filters.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="debt-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Effort</th>
            <th>Team</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onClick={() => onSelect(item)} className="table-row">
              <td className="cell-title">{item.title}</td>
              <td>{item.category}</td>
              <td>
                <span className={PRIORITY_CLASSES[item.priority] || 'badge'}>{item.priority}</span>
              </td>
              <td>
                <span className={STATUS_CLASSES[item.status] || 'badge'}>{item.status}</span>
              </td>
              <td>{item.effort}</td>
              <td>{item.team}</td>
              <td className={isOverdue(item.dueDate, item.status) ? 'overdue' : ''}>
                {item.dueDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
