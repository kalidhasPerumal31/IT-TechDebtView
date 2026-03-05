# Raw Requirements

Extracted from all /input/ sources for Tech Debt Posture & Lifecycle Manager.

---

## Product Use Case & Requirements
- Maintain standalone database as system of record
- Ingest application/component data from ServiceNow
- Enrich lifecycle facts using endoflife.date API
- Compute RAG posture using deterministic rules
- Link with Azure DevOps Risk Board via Risk ID
- Provide IBS-aware views and forecasting
- Professional dashboard interface aligned to App List workbook

## Objectives
- Single source of truth for support/lifecycle posture
- Automate RAG posture and provide forecasting
- IBS-focused risk visibility and AzDO Risk Board linkage

## Technical Stack (Binding)
- Backend: Node.js with Express.js
- Database: PostgreSQL
- Frontend: HTML5, CSS3, JavaScript, jQuery
- UI Framework: AdminLTE (Bootstrap 5)
- Templating: EJS or Handlebars

## Stakeholder Needs
- Executive dashboard, +12/+24 month forecast, IBS exposure
- Audit-ready evidence, IBS control, policy alignment
- App-level RAG, component drill-downs, earliest EoS, alerting
- Platform slice, vendor EoL mapping, override tools, alerts
- Red/Amber queues, runway, export to planning tools
- SaaS/Third-Party views, renewal runway

## Business Context
- Fragmented lifecycle data, regulatory and risk pressure
- Need for reliable forecasting and prioritization
- Deterministic posture rules, time-shifted forecasts
- IBS-aware prioritization, AzDO Risk linkage
- Reduction in Red/Amber exposure, fewer unplanned outages

## Organisational Policies
- Data handled per ISO/IEC 27001
- Access via Entra ID SSO, RBAC enforced
- Data encrypted in transit and at rest
- Data retained 7 years, secure erasure
- Change management via AzDO, CAB approval
- Incident response and audit logging
- Vendor/third-party assessment, annual EoL review

## Regulatory/Compliance
- ISO/IEC 12207, 27001, 27701, GDPR, NIST SP 800-218, ISO/IEC 42001 (if AI), OWASP ASVS L2
- Security controls, privacy impact, data subject rights
- Secure development, EoL/EoS monitoring, audit evidence
