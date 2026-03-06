# Integration Design

Describes integration patterns and flows for Tech Debt Posture & Lifecycle Manager.

---

## Integrations
- ServiceNow: External job pulls data and pushes to database
- endoflife.date API: Application layer fetches lifecycle data for enrichment
- Azure DevOps: Application layer links Risk ID to AzDO Risk Board

## Patterns
- All integrations are mediated by the Application layer
- Data validation and transformation at ingestion
- Secure API calls with audit logging
