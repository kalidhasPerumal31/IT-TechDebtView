import { CATEGORIES, PRIORITIES, STATUSES } from '../data/techDebtData';

export default function Filters({ filters, onFilterChange, searchQuery, onSearchChange }) {
  return (
    <div className="filters-bar">
      <input
        type="search"
        className="search-input"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search tech debt items"
      />
      <select
        className="filter-select"
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
        aria-label="Filter by category"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
        ))}
      </select>
      <select
        className="filter-select"
        value={filters.priority}
        onChange={(e) => onFilterChange('priority', e.target.value)}
        aria-label="Filter by priority"
      >
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</option>
        ))}
      </select>
      <select
        className="filter-select"
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        aria-label="Filter by status"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
        ))}
      </select>
    </div>
  );
}
