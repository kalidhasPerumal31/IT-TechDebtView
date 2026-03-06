# ADR: Architecture Style

## Status
Binding

## Context
Clean Architecture layering is required to enforce separation of concerns, compliance, and anti-drift contract.

## Decision
Adopt Clean Architecture: Web → Application → Domain ← Infrastructure. All dependencies and flows must respect this structure.

## Consequences
- Ensures maintainability, testability, and compliance.
- Prevents architecture drift and dependency violations.
