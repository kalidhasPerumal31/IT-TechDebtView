# Migrations Overview

This document provides an overview of the database migrations for Tech Debt Posture & Lifecycle Manager (AG-IMP-B2-05 Phase 3).

- Baseline migration: 001_baseline.migration (creates all tables and relationships)
- Rollback migration: 001_baseline.migration (drops all tables)
- All migrations are idempotent and checksummed.
- Migrations are located under:
    /Data/Migrations/PostgreSQL/forward/
    /Data/Migrations/PostgreSQL/rollback/

All artefacts conform to Clean Architecture, RTM, and ADRs.

---
*End of Migrations Overview*