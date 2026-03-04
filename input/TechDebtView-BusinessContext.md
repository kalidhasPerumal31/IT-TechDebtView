# Tech Debt Posture & Lifecycle Manager
## Business Context Document

**Document owner:** Kalidhas Perumal  
**Last updated:** 03 Mar 2026 (GMT)  
**Status:** Draft

---

### 1. Executive Summary
The organization requires a single source of truth for application and infrastructure support posture. Today, lifecycle and support data is maintained in spreadsheets and disparate tools, making it hard to identify risks, plan upgrades, and align change with business priorities. The **Tech Debt Posture & Lifecycle Manager** will be a **standalone application** with its own database that ingests **authoritative “current version” and dependency data from ServiceNow**, enriches it with **online End‑of‑Life (EoL) APIs**, and computes a **RAG posture** using clear, deterministic rules. It adds business‑critical lenses—**Important Business Service (IBS)** and **Risk ID** (Azure DevOps)—to enable prioritized, auditable decision‑making across the portfolio. The functional scope and field design are aligned to the current workbook’s “App List” structure and newly added columns (IBS, Risk ID, Type). 

---

### 2. Business Problem & Drivers
- **Fragmented lifecycle data:** Application/infra versions, support status, and vendor EoS are spread across spreadsheets and tribal knowledge, leading to late discoveries and emergency changes. mobileredirect=true)  
- **Regulatory and risk pressure:** Out‑of‑support components increase security and operational risk; regulators expect proactive lifecycle management, especially for services that underpin **IBS**. 
- **Limited forecasting:** Leadership cannot reliably see posture **12–24 months ahead** to budget and schedule change windows. 
- **Inefficient prioritization:** Without IBS and Risk Board context, remediation effort does not always align to business impact. 

---

### 3. Target Outcomes
- **Single source of truth** for posture: one application, one view, one set of lifecycle facts.  
- **Deterministic posture rules** and **time‑shifted forecasts** (e.g., “as of +24 months”).
- **IBS‑aware prioritization** and **AzDO Risk** linkage for streamlined governance.  
- **Reduction in Red/Amber exposure** and fewer unplanned outages or emergency changes.

---

### 4. Scope (What the product will do)
1) **Ingest authoritative “current state”** (apps, infra, dependencies, current versions) from **ServiceNow** (read‑only).  
2) **Enrich lifecycle facts** (latest versions, support status, end‑of‑support dates) from **online EoL APIs**.  
3) **Compute RAG posture** per application with these rules:  
   - **Red:** if any infra or app‑dependency is out of support on the evaluation date.  
   - **Amber:** if none Red, but any component reaches EoS within **6 months** from the evaluation date.  
   - **Green:** otherwise.  
4) **Forecasting:** recompute RAG for a future **evaluation date** (e.g., +24 months) to inform budget and change calendars.  
5) **IBS lens & Risk linkage:** filter & report IBS posture, and use **Risk ID** to pull **Azure DevOps Risk Board** details (title, severity, owner, due date) for each application.  
6) **Portfolio reporting & alerts:** portfolio grid, drill‑downs, earliest EoS, and alerts at 180/90/60/30‑day thresholds (IBS elevated).  
7) **Segmentation by Type:** support **In‑house / SaaS / Third‑Party** filtering, reporting and policy differences using the new **Type** column.

---

### 5. Out of Scope (Phase‑1)
- Writing back to ServiceNow or changing CMDB records.  
- Automated agent‑based discovery (may be considered later).  
- Complex financial modeling beyond roadmap/effort summaries.

---

### 6. Stakeholders & Value Proposition
- **Technology Leadership:** consolidated, forecastable risk posture to steer investment.  
- **Risk & Compliance:** IBS‑aware, audit‑ready lifecycle evidence; reduce out‑of‑support exposure.  
- **Service/Application Owners:** clear next actions; fewer escalations and firefights.  
- **Platform/Infra Owners:** prioritized upgrade/migration plan informed by business criticality.  
- **PMO/Portfolio:** predictable pipeline of change, fewer schedule collisions.

---

### 7. Success Metrics
- **Coverage:** ≥95% apps with complete lifecycle mapping (no “Unknown” components).  
- **Time to remediate:** ≥90% of Amber items resolved before they become Red.  
- **Forecast usage:** monthly +12/+24‑month posture reviews at LT/PMO.  
- **Risk alignment:** ≥90% of IBS Red/Amber apps have an active AzDO risk entry and remediation plan.

---

### 8. Constraints & Assumptions
- **ServiceNow is the system of record** for current versions; this app is **read‑only** against SN.  
- EoL data quality depends on **external providers**; we will support multiple sources with admin overrides.  
- Workbook import is **one‑time bootstrap**; steady‑state posture relies on SN + EoL APIs thereafter.  
- The **IBS** and **Risk ID** fields are maintained in the portfolio layer (SN or this app, per governance).

---