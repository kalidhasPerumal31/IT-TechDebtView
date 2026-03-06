# Schema Definition

This document defines the logical schema for Tech Debt Posture & Lifecycle Manager (AG-IMP-B2-05 Phase 2).

Entities, relationships, and constraints are derived from the Domain model and RTM. Governance rules are applied only if ADR-approved.

- Entity: Posture
- Entity: Risk
- Entity: User
- Entity: Application
- Entity: Integration
- Relationships: Application-Posture, Application-Risk, User-Application, Application-Integration
- Constraints: PKs, FKs, unique constraints, not null, etc.

All artefacts conform to Clean Architecture, RTM, and ADRs.

---
*End of Schema Definition*