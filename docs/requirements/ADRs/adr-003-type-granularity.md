# ADR-003: Type Granularity

## Status
Decision-Required

## Context
Unclear if segmentation is only at application level or if component overrides are allowed for hybrids.

## Decision
Support application-level segmentation with optional component overrides for hybrid cases. This balances simplicity and accuracy.

## Consequences
- Application-level: Simpler, but may miss hybrid risk.
- Component overrides: More accurate, but increases complexity.
