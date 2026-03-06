# Architecture Specification

This document consolidates all architectural artefacts, decisions, and compliance mappings for the Tech Debt Posture & Lifecycle Manager, as required by AG-ARC-02 Phase 6.

## System Blueprint
See: [system-blueprint.md](system-blueprint.md)

## Layered Architecture
See: [layered-architecture.md](layered-architecture.md)

## Integration Design
See: [integration-design.md](integration-design.md)

## Module Contracts
See: [module-contracts.md](module-contracts.md)

## ADR Index
- [adr-architecture-style.md](ADRs/adr-architecture-style.md)
- [adr-tech-strategy-backend.md](ADRs/adr-tech-strategy-backend.md)
- [adr-tech-strategy-frontend.md](ADRs/adr-tech-strategy-frontend.md)
- [adr-tech-strategy-database.md](ADRs/adr-tech-strategy-database.md)
- [adr-tech-strategy-templating.md](ADRs/adr-tech-strategy-templating.md)
- [adr-tech-strategy-ui-framework.md](ADRs/adr-tech-strategy-ui-framework.md)

## Compliance Mapping
See: [../../requirements/compliance-mapping.md](../../requirements/compliance-mapping.md)

## Diagram Index
- [C4 Model](diagrams/c4-model.md)
- [Sequence Diagrams](diagrams/sequence-diagrams.md)
- [ERD High Level](diagrams/erd-high-level.md)
- [Deployment Architecture](diagrams/deployment-architecture.md)

## Tech Stack Reference
See: [stack-definition.json](stack-definition.json)

## Traceability
All requirements, ADRs, and architecture artefacts are fully traceable to upstream requirements and compliance obligations. See [../../requirements/rtm.md](../../requirements/rtm.md).

## Clean Architecture Rule Compliance
All dependencies point inward: Web → Application → Domain ← Infrastructure. No direct dependencies from Web to Infrastructure. All compliance, security, and anti-drift rules enforced.

---
*End of Architecture Specification*