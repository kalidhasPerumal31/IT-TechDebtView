# IT TechDebt View

A web application for tracking and managing IT technical debt across your engineering organisation.

## Features

- **Dashboard** — Summary metrics cards (total, open, in-progress, resolved, critical items) and three interactive charts (by category, priority, and status)
- **All Items** — Filterable and searchable table of every tech debt item
- **Item Detail** — Click any row to open a detailed modal with full description, metadata and tags
- **Filtering** — Filter by category, priority and status; free-text search across title, description, team and tags
- **Overdue Highlighting** — Due dates that have passed are highlighted in red when items are still open

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (bundled with Node.js)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview   # serves the production build locally
```

### Lint

```bash
npm run lint
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite 7](https://vite.dev/) |
| Charts | [Recharts 3](https://recharts.org/) |
| Linting | ESLint 9 |

## Project Structure

```
src/
├── components/
│   ├── Charts.jsx          # Pie & bar charts using Recharts
│   ├── Filters.jsx         # Search input + dropdown filters
│   ├── ItemDetailModal.jsx # Full-screen detail modal
│   ├── MetricCard.jsx      # Single KPI summary card
│   └── TechDebtTable.jsx   # Sortable items table
├── data/
│   └── techDebtData.js     # Sample data & helper functions
├── App.jsx                 # Root component with routing tabs
├── App.css                 # Application styles
└── main.jsx                # React entry point
```
