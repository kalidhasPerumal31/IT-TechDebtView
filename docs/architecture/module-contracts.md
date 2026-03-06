# Module Contracts

Defines module boundaries and contracts for Tech Debt Posture & Lifecycle Manager.

---

## Modules
- UI Module: AdminLTE, jQuery, routing
- Application Module: Use cases, RBAC, orchestration
- Domain Module: Posture computation, risk rules, business logic
- Infrastructure Module: Database, integrations

## Contracts
- Each module exposes a well-defined interface
- No cross-module data access except via contracts
- All compliance and anti-drift rules enforced
