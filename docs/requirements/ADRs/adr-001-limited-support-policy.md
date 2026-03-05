# ADR-001: Limited/Extended Support Policy

## Status
Decision-Required

## Context
The policy for how "Limited/Extended Support" is treated (Green or Amber) impacts audit stance, alerting, and risk posture.

## Decision
Treat "Limited/Extended Support" as Amber for posture and alerting. This is more conservative and aligns with risk management best practices.

## Consequences
- If Green: Simpler for users, but may understate risk for audit.
- If Amber: More conservative, aligns with risk posture, but may increase alert volume.
