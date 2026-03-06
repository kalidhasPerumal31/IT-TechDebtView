# Layered Architecture

Describes the Clean Architecture layering for Tech Debt Posture & Lifecycle Manager.

---

## Layers
- Web Layer: UI, routing, static assets (AdminLTE, jQuery)
- Application Layer: Use cases, RBAC, orchestration
- Domain Layer: Business logic, posture computation, risk rules
- Infrastructure Layer: Database (PostgreSQL), integrations (ServiceNow, endoflife.date API, Azure DevOps)

## Dependency Rules
- Web → Application → Domain ← Infrastructure
- No direct Web → Infrastructure dependencies
- All cross-layer interactions via Application layer
