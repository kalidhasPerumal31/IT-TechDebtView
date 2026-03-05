# Tradeoff Analysis

Analysis of tradeoffs and rationale for key decisions required for Tech Debt Posture & Lifecycle Manager.

---

## Limited/Extended Support Policy
- Green (In Support): Simpler for users, but may understate risk for audit.
- Amber: More conservative, aligns with risk posture, but may increase alert volume.

## IBS Source of Truth
- ServiceNow: Aligns with existing CMDB, but may lag updates.
- Application: More agile, but risks data drift and sync issues.

## Type Granularity
- Application-level: Simpler, but may miss hybrid risk.
- Component overrides: More accurate, but increases complexity.

## EoL Provider Prioritization
- Focus on major vendors (Windows Server, RHEL, Oracle DB, JDK, middleware) for MVP; expand later.

## Alert Thresholds
- 180/90/60/30 days: Standard, but may need tuning for business needs.
- IBS elevated routing: Ensures critical services get attention, but may increase noise.

## Manual Override Process
- Streamlined process needed for urgent cases; too much friction slows remediation.

## Handling “Unknown” Status
- Escalate to platform/ops leadership; masking risk is unacceptable.
