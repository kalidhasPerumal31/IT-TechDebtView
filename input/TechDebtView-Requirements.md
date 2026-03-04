# Tech Debt Posture & Lifecycle Manager — Product Use Case & Requirements

**Document owner:** Kalidhas Perumal  
**Last updated:** 03 Mar 2026 (GMT)  
**Status:** Draft for engineering kickoff

---

## 1. Overview

The **Tech Debt Posture & Lifecycle Manager** is a **standalone web application with its own database** that replaces the current spreadsheet-based process for tracking technology support posture across **applications** and their **infrastructure/app‑dependency components**. It ingests authoritative **current-version** data from **ServiceNow**, enriches lifecycle facts from **online End‑of‑Life (EoL) APIs**, and computes a **RAG** posture using deterministic rules. It also links to the **Azure DevOps (AzDO) Risk Board** via **Risk ID** and provides **IBS-aware** views using the **IBS** flag. The design aligns with fields and layout patterns present in the `App List` workbook sheet. 

---

## 2. Objectives & Success Criteria

### 2.1 Objectives
- Establish a **single source of truth** for **support/lifecycle posture** across app and infra layers. 
- **Automate** RAG posture using vendor EoL data and provide **forecasting** (“as of” any future date, e.g., +24 months).
- Provide **IBS-focused** risk visibility and **AzDO Risk Board** linkage via **Risk ID**. 

### 2.2 Success metrics
- **Coverage:** ≥95% of applications have complete lifecycle posture (no “Unknown” components).
- **Remediation lead time:** ≥90% of Amber → Green transitions completed before hitting Red.
- **Forecast adoption:** Product used monthly by PMO/Leadership to review **IBS** posture at +12/+24 months.

---

## 3. Key Concepts (aligned to workbook)

- **Application**: Logical service/product line (one row per app in portfolio views). Fields such as **IBS**, **RISK ID**, **Type** (In‑house/SaaS/Third‑Party) originate from the workbook and become first‑class attributes.
- **Component**: Technical element attached to an application (OS, DB, Middleware, App Dependency, Device/Network/Storage), each with **current version** (from ServiceNow) and lifecycle attributes (via EoL APIs). The workbook’s per‑application “blocks” with sub‑rows map to multiple Components under a single Application.   
- **Lifecycle facts**: Latest version, support status, and end‑of‑support (EoS) dates **not** provided by ServiceNow—fetched from online EoL sources and stored in the app. Mirrors the “Latest Version / Support Status / Out of support date” columns in the sheet.  
- **RAG posture**: Computed across infra and app‑dependency layers per deterministic rules described below; supports **time‑shifted evaluation** (forecast). 

---

## 4. Data Flow & Integrations

1. **ServiceNow (Read‑only) → App DB**  
   - Import **Applications**, **infrastructure details**, **application dependencies**, and **current versions** (authoritative “as‑is” estate). The app does not write back to ServiceNow. 

2. **Online EoL APIs → App DB**  
   - Enrich each Component with **latest version**, **support status**, and **EoS date**. Store **source URL**, **vendor**, **fetched_at**, and **confidence**.

3. **Azure DevOps (Risk Board) → App DB**  
   - Using **Risk ID** from the workbook/Application record, fetch **risk work item** fields (title, state, severity/impact, owner, due date) and store as **Risk Snapshots** for aligned reporting with posture dates.

---

## 5. RAG Rules & Forecasting

- **Evaluation date:** All posture calculations are performed **as of a chosen date** (default: today). Users can change this to future dates (e.g., **today + 24 months**) to run a **forecast**. 

- **Component status (at evaluation date)**  
  - **Out of Support:** `end_of_support_date` < `evaluation_date`.  
  - **Near EoS:** 0 < (`end_of_support_date` − `evaluation_date`) ≤ **180 days** (≈ 6 months).  
  - **In Support:** otherwise (or vendor status explicitly in-support).  
  - **Unknown:** no EoL mapping/data. 

- **Layer posture**  
  - **Infra RAG:** derived from components of type **OS/DB/Middleware/Device/Network/Storage**.  
  - **App‑Dependency RAG:** derived from components of type **AppDependency**.  
  - **Rule:** **Red** if *any* component is Out of Support; **Amber** if none Red but *any* component is Near EoS; **Green** otherwise (Grey if all Unknown). 

- **Application overall RAG**  
  - **Red** if **Infra RAG** or **App‑Dependency RAG** is Red.  
  - **Amber** if none Red and **any** layer is Amber.  
  - **Green** otherwise (Grey if unknown dominates). 

- **Earliest EoS**: minimum `end_of_support_date` across all components (useful for runway/alerts). 

---

## 6. Database Schema (Normalized)

> Designed from the workbook’s *App List* block pattern (multiple component rows per app; merged header cells), but **flattened** to eliminate any dependency on Excel layout. 

### 6.1 Entities

```text
Application
- app_id (PK)
- name
- business_function
- owner
- criticality
- type                 -- InHouse | SaaS | ThirdParty   (from the sheet's "Type" column)
- is_ibs               -- bool (from the sheet's IBS column)
- source_system_ref    -- ServiceNow sys_id (read-only linkage)
- risk_id              -- AzDO risk work item id (from sheet)
- risk_board_url       -- computed deep link
- created_at, updated_at
``

Component
- component_id (PK)
- app_id (FK -> Application)
- type                 -- OS | DB | Middleware | AppDependency | Device | Network | Storage
- vendor
- product_family
- product_name
- current_version      -- from ServiceNow
- hosting_model        -- OnPrem | Cloud | SaaS | ThirdParty
- source_system_ref    -- ServiceNow CI/sys_id
- created_at, updated_at

LifecycleFact
- lifecycle_id (PK)
- vendor
- product_family
- product_name
- version_pattern      -- semver/regex for matching current_version
- latest_version
- support_status       -- InSupport | Limited | OutOfSupport | Unknown
- end_of_support_date
- source_vendor
- source_url
- fetched_at
- confidence           -- 0..1; supports manual override
``

ComponentLifecycleLink
- link_id (PK)
- component_id (FK)
- lifecycle_id (FK)
- match_score
- override_flag
- override_reason

PostureSnapshot
- snapshot_id (PK)
- app_id (FK)
- evaluation_date
- infra_rag            -- Red | Amber | Green | Grey
- appdep_rag           -- Red | Amber | Green | Grey
- overall_rag          -- Red | Amber | Green | Grey
- earliest_eos_date
- computed_at

RiskSnapshot
- risk_snapshot_id (PK)
- app_id (FK)
- risk_id
- evaluation_date
- risk_title
- risk_state
- severity
- owner
- due_date
- azdo_url
- fetched_at

Alert
- alert_id (PK)
- app_id (FK) / component_id (FK nullable)
- evaluation_date
- alert_type          -- EoS_30 | EoS_60 | EoS_90 | EoS_180 | Turned_Red | Turned_Amber
- priority            -- elevated if Application.is_ibs = true
- status              -- Open | Suppressed | Resolved
- created_at, resolved_at

7. Ingestion & Normalization

Workbook bootstrap: One‑time import from the current Excel to seed Applications (incl. Type, IBS, Risk ID) and preliminary Components. The importer flattens merged cells by grouping on application headers and forward‑filling the app name across child rows, creating one Application and N Component records. 
ServiceNow sync (authoritative): Scheduled read to refresh current_version and component inventory. If conflicts exist with spreadsheet bootstrap, ServiceNow wins after cutover. 
EoL data sync: Nightly jobs call EoL providers by (vendor, product, current_version), update LifecycleFact, and re‑link components using version_pattern + match_score. Admins can override mappings where vendors use non‑standard naming.
AzDO risk sync: Using Risk ID, pull risk fields and store RiskSnapshot (time‑aligned with posture snapshots for consistent “as of” reporting). 


8. Core User Stories


Application posture (Owner)

As an App Owner, I can view my application portfolio row with Overall/Infra/App‑Dep RAG, earliest EoS, and risk status; filter by IBS and forecast the posture at +6/+12/+24 months.



Component drill‑down (Owner/Platform)

As a Platform Owner, I can drill into an app to see each component’s current version (from SN), matched EoL facts (latest version/EoS), and the exact reason a component is Red/Amber. 



IBS dashboard (Risk/Leadership)

As a Risk Analyst, I can toggle an IBS‑only view that overlays AzDO risk severity/state, showing which Important Business Services are at risk within the next 6 months. 



Alerts & runway (Owner/PMO)

As a PMO lead, I receive alerts at 180/90/60/30‑day windows before EoS, with IBS items elevated in priority and deep links to AzDO risk and SN CIs. 



Forecast reporting (Leadership)

As an Executive, I can set the evaluation date two years ahead and export the forecasted portfolio posture for budgeting and change calendar planning. 




9. UI / Reports


Portfolio grid (default):
Columns: Application, Owner, Type (In‑house/SaaS/Third‑Party), IBS badge, Overall RAG, Infra RAG, App‑Dep RAG, Earliest EoS, #OutOfSupport, #≤180d, Risk ID (chip with state/severity). Filters: function, owner, platform, Type, IBS, RAG, Evaluation Date. 


IBS dashboard:
KPIs: #IBS in Red/Amber, Top IBS risks (by severity, time‑to‑EoS), IBS Red by function/owner; forecast toggle (+6/+12/+24 months). 


Application detail:
Tabs: Components (current vs latest & EoS with source links), Risks (AzDO list), Runway (timeline to EoS), Activity (alerts/overrides), Evidence (links to vendor EoL pages). 


Exports: CSV/XLSX with consistent ISO‑8601 dates. 



10. Non‑Functional Requirements

Security & access: Entra ID SSO, RBAC (Owner/Platform/Risk/PMO/Admin), audit logs.
Data quality: Standardized vendor/product vocabularies; ISO‑8601 dates; name normalization consistent with workbook semantics.
Reliability: Nightly EoL refresh; posture recomputation on schedule; retry/backoff; data freshness indicators. 
Scalability: Thousands of applications and components; posture recalculation for an enterprise portfolio within minutes.


11. Acceptance Criteria (samples)


RAG rule conformance

If any component is Out of Support on evaluation_date ⇒ Overall RAG = Red.
Else if any component’s EoS is ≤ 180 days from evaluation_date ⇒ Overall RAG = Amber.
Else ⇒ Overall RAG = Green. 



Forecasting

When evaluation_date = today + 24 months, posture uses EoS schedules to compute future state; results persist as PostureSnapshot.



IBS filter

Toggling IBS only shows exclusively Application.is_ibs = true rows; alerts for these apps show elevated priority. 



Risk linkage

Given a valid risk_id, the system fetches and displays AzDO risk fields (title, state, severity, owner, due date) and a deep link to the work item.



Normalization from workbook

Importer correctly converts merged blocks into 1 Application + N Components; no reliance on Excel merges persists after import.