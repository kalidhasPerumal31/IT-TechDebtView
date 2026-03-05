# Categorized Requirements

All requirements from /input/ sources, categorized by type.

---

## Business Requirements
- Single source of truth for lifecycle posture
- Reliable forecasting for +12/+24 months
- IBS and Risk Board linkage for governance
- Reduction in Red/Amber exposure

## Functional Requirements
- Ingest data from ServiceNow
- Enrich with endoflife.date API
- Compute RAG posture (Red/Amber/Green)
- Provide dashboard, drill-downs, alerts
- Export to planning tools
- Segmentation by Type (In-house/SaaS/Third-Party)

## Non-Functional Requirements
- Security: ISO/IEC 27001 controls, RBAC, SSO
- Privacy: GDPR, ISO/IEC 27701 compliance
- Audit: Evidence retention, audit logging
- Performance: Timely posture computation, dashboard responsiveness
- Availability: High uptime, disaster recovery

## Operational Requirements
- Change management via AzDO, CAB approval
- Incident response and audit
- Vendor/third-party assessment
- Data retention and secure erasure

## Compliance Requirements
- ISO/IEC 12207, 27001, 27701, GDPR, NIST SP 800-218, ISO/IEC 42001 (if AI), OWASP ASVS L2
- Security controls, privacy impact, data subject rights
- Secure development, EoL/EoS monitoring, audit evidence
