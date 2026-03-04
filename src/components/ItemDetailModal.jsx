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

export default function ItemDetailModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Tech debt item details">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{item.title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Category</span>
              <span className="detail-value">{item.category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Priority</span>
              <span className={PRIORITY_CLASSES[item.priority] || 'badge'}>{item.priority}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className={STATUS_CLASSES[item.status] || 'badge'}>{item.status}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Effort</span>
              <span className="detail-value">{item.effort}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Team</span>
              <span className="detail-value">{item.team}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Assignee</span>
              <span className="detail-value">{item.assignee}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Created</span>
              <span className="detail-value">{item.createdDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Due Date</span>
              <span className={`detail-value ${isOverdue(item.dueDate, item.status) ? 'overdue' : ''}`}>
                {item.dueDate}
              </span>
            </div>
          </div>
          <div className="detail-description">
            <span className="detail-label">Description</span>
            <p>{item.description}</p>
          </div>
          <div className="detail-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
