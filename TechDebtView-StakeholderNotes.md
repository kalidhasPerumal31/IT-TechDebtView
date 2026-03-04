# Tech Debt Posture & Lifecycle Manager
## Stakeholder Notes & Engagement Plan

**Document owner:** Kalidhas Perumal  
**Last updated:** 03 Mar 2026 (GMT)  
**Status:** Working draft

---

### 1. Stakeholder Map

| Role / Group | Primary Needs | What They Get from the Product | Engagement Cadence |
|---|---|---|---|
| **Technology Leadership (CIO/Directors)** | Portfolio risk clarity; forward view; IBS posture | Executive dashboard; +12/+24‑month forecast; IBS exposure and trend | Monthly LT review; QBR |
| **Risk & Compliance** | Audit‑ready evidence; IBS control; policy alignment | IBS‑only lens; lifecycle sources and EoS evidence; alerts & waivers | Fortnightly risk sync; audit prep |
| **Service/Application Owners** | Clear status and next actions; fewer escalations | App‑level RAG; component drill‑downs; earliest EoS; alerting | Weekly ops review; change boards |
| **Platform/Infra Owners** | Sequenced upgrades; authoritative versions | Platform slice; vendor EoL mapping; override tools; Teams/email alerts | Weekly platform stand‑up |
| **PMO / Portfolio** | Prioritized backlog; predictable delivery | Red/Amber queues; runway; export to planning tools | Sprint/PI planning |
| **Vendor Management** | Contracts aligned to lifecycle | Type = SaaS/Third‑Party views; renewal runway | Monthly vendor review |

*The stakeholder scope and needs reflect fields and structures defined in the current workbook (App List, IBS, Risk ID, Type) that the new app will operationalize.* 
---

### 2. RACI (High‑Level)

- **Responsible:** Product Team (build/run posture engine, integrations, UI).  
- **Accountable:** Technology Leadership (policy, prioritization, funding).  
- **Consulted:** Risk & Compliance; Platform/Infra Owners; PMO.  
- **Informed:** Service/Application Owners; Vendor Management. 

---

### 3. Key Decisions Required

1) **Policy for “Limited/Extended Support”:** treat as **In Support** (Green) or **Amber** by policy? (Impacts audit stance and alerting.) 
2) **IBS source of truth:** whether IBS is mastered in ServiceNow or in this app (with sync backlogs).
3) **Type granularity:** Application‑level only (In‑house/SaaS/Third‑Party) vs. allowing Component overrides for hybrids.  
4) **EoL providers:** prioritize initial vendor families (e.g., Windows Server, RHEL, Oracle DB, JDK, middleware). 
5) **Alert thresholds & escalation:** confirm 180/90/60/30 days; IBS elevated routing (Ops leadership distro). 

---

### 4. Engagement Plan & Milestones

**Phase 0: Alignment & Data Readiness (Weeks 0–2)**  
- Validate field mapping (App, Components, IBS, Risk ID, Type).  
- Confirm SN endpoints, EoL providers, AzDO Risk query.  
- Define final RAG policy (incl. “limited support”).

**Phase 1: MVP Build (Weeks 3–8)**  
- SN read‑only ingest; EoL adapter #1; posture engine; portfolio & detail views.  
- IBS filters and badges; AzDO Risk linkage via Risk ID.  
- Alerts at 180/90/60/30 (IBS elevated).  
- Workbook bootstrap import (one‑time). 
**Phase 2: Scale & Integrations (Weeks 9–20)**  
- Additional EoL providers; Teams notifications; optional push of change/epics.  
- Power BI semantic model; waivers/exceptions workflow; RBAC hardening.

---

### 5. Communications & Change Management

- **Steering updates:** Monthly leadership pack with RAG trend and IBS outlook.  
- **Ops comms:** Weekly note of top Red/Amber moves and 90‑day runway.  
- **Training:** 1‑hour sessions for App Owners and Platform teams (UI, drill‑downs, overrides).  
- **Runbook:** Playbook for EoL mapping overrides, risk linking, and alert handling. 

---

### 6. Risks & Mitigations

- **Ambiguous vendor/product names** → mapping UI, confidence scores, manual overrides.  
- **EoL data gaps** → multiple providers, allow local lifecycle entries with expiry.  
- **Data drift vs. ServiceNow** → SN is authoritative for current versions; nightly syncs.  
- **Alert fatigue** → IBS elevation, dedupe rules, batched digests, suppress/waiver flow.
---

### 7. Acceptance Readiness (Go/No‑Go)

- Portfolio coverage ≥95% (no “Unknowns” for IBS apps).  
- Policy decisions documented (limited support, thresholds).  
- Alerts verified on test apps across Red/Amber conditions.  
- Forecast validated at +12/+24 months against sample EoS calendars.

---