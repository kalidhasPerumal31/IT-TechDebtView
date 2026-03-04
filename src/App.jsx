import { useState, useMemo } from 'react';
import { techDebtItems, getMetrics } from './data/techDebtData';
import MetricCard from './components/MetricCard';
import Charts from './components/Charts';
import Filters from './components/Filters';
import TechDebtTable from './components/TechDebtTable';
import ItemDetailModal from './components/ItemDetailModal';
import './App.css';

const DEFAULT_FILTERS = { category: 'All', priority: 'All', status: 'All' };

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const filteredItems = useMemo(() => {
    return techDebtItems.filter((item) => {
      const matchesCategory = filters.category === 'All' || item.category === filters.category;
      const matchesPriority = filters.priority === 'All' || item.priority === filters.priority;
      const matchesStatus = filters.status === 'All' || item.status === filters.status;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.team.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesPriority && matchesStatus && matchesSearch;
    });
  }, [filters, searchQuery]);

  const metrics = useMemo(() => getMetrics(techDebtItems), []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <span className="header-icon">🔧</span>
            <div>
              <h1 className="header-title">IT TechDebt View</h1>
              <p className="header-subtitle">Track and manage your technical debt backlog</p>
            </div>
          </div>
          <div className="header-meta">
            <span className="header-count">{metrics.total} items tracked</span>
          </div>
        </div>
        <nav className="app-nav">
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'nav-tab-active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-tab ${activeTab === 'items' ? 'nav-tab-active' : ''}`}
            onClick={() => setActiveTab('items')}
          >
            📋 All Items
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'dashboard' && (
          <>
            <section className="metrics-section" aria-label="Summary metrics">
              <MetricCard
                title="Total Items"
                value={metrics.total}
                colorClass="metric-blue"
                icon="📌"
              />
              <MetricCard
                title="Open"
                value={metrics.open}
                subtitle="Needs attention"
                colorClass="metric-red"
                icon="🔴"
              />
              <MetricCard
                title="In Progress"
                value={metrics.inProgress}
                subtitle="Being worked on"
                colorClass="metric-yellow"
                icon="🟡"
              />
              <MetricCard
                title="Resolved"
                value={metrics.resolved}
                subtitle="Completed"
                colorClass="metric-green"
                icon="✅"
              />
              <MetricCard
                title="Critical Open"
                value={metrics.critical}
                subtitle="Urgent action needed"
                colorClass="metric-orange"
                icon="⚠️"
              />
            </section>

            <section className="charts-section" aria-label="Charts">
              <Charts metrics={metrics} />
            </section>

            <section className="recent-section">
              <div className="section-header">
                <h2 className="section-title">Critical &amp; High Priority Items</h2>
              </div>
              <TechDebtTable
                items={techDebtItems.filter(
                  (i) => (i.priority === 'Critical' || i.priority === 'High') && i.status !== 'Resolved'
                )}
                onSelect={setSelectedItem}
              />
            </section>
          </>
        )}

        {activeTab === 'items' && (
          <section className="items-section">
            <div className="section-header">
              <h2 className="section-title">
                Tech Debt Items
                <span className="result-count">{filteredItems.length} of {techDebtItems.length}</span>
              </h2>
            </div>
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <TechDebtTable items={filteredItems} onSelect={setSelectedItem} />
          </section>
        )}
      </main>

      <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
