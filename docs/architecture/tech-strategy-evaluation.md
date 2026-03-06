# Technology Strategy Evaluation

This document evaluates technology strategy categories for Tech Debt Posture & Lifecycle Manager, strictly per upstream requirements and Clean Architecture rules.

---

## Backend
- Category: Web application server
- Requirement: Node.js with Express.js (binding from upstream ADR)

## Database
- Category: Relational database
- Requirement: PostgreSQL (binding from upstream ADR)

## Frontend
- Category: Web UI framework
- Requirement: HTML5, CSS3, JavaScript, jQuery (binding from upstream ADR)

## UI Framework
- Category: Admin dashboard UI
- Requirement: AdminLTE (Bootstrap 5) (binding from upstream ADR)

## Templating
- Category: Server-side rendering
- Requirement: EJS or Handlebars (binding from upstream ADR)

## Integration
- ServiceNow (data ingest)
- endoflife.date API (enrichment)
- Azure DevOps (risk linkage)

## Security
- RBAC, SSO (Entra ID), encryption in transit and at rest

## Compliance
- All architecture must enforce ISO/IEC 27001, GDPR, NIST SSDF, OWASP ASVS 4.0, and other relevant anchors
