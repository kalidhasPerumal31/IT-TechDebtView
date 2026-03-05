# Tech Debt Posture & Lifecycle Manager — Product Use Case & Requirements

**Document owner:** Kalidhas Perumal  
**Last updated:** 04 Mar 2026 (GMT)  
**Status:** Final for engineering kickoff

---

## 1. Overview

The **Tech Debt Posture & Lifecycle Manager** is a **standalone web application with its own database** that replaces the current spreadsheet-based process for tracking technology support posture across **applications** and their **infrastructure/app‑dependency components**. 

The application will:
- Maintain its own database as the system of record
- Receive application/component data from an external job that extracts from ServiceNow
- Enrich lifecycle facts using the **endoflife.date API**
- Compute **RAG** posture using deterministic rules
- Link with **Azure DevOps** to display risk details via **Risk ID**
- Provide **IBS-aware** views and forecasting capabilities
- Present data through a professional dashboard interface
- Align with fields and layout patterns present in the `App List` workbook sheet

---

## 2. Objectives & Success Criteria

### 2.1 Objectives
- Establish a **single source of truth** for **support/lifecycle posture** across app and infra layers
- **Automate** RAG posture using vendor EoL data and provide **forecasting** ("as of" any future date, e.g., +24 months)
- Provide **IBS-focused** risk visibility and **AzDO Risk Board** linkage via **Risk ID**

### 2.2 Success Metrics
- **Coverage:** ≥95% of applications have complete lifecycle posture (no "Unknown" components)
- **Remediation lead time:** ≥90% of Amber → Green transitions completed before hitting Red
- **Forecast adoption:** Product used monthly by PMO/Leadership to review **IBS** posture at +12/+24 months

---

## 3. Technical Stack Requirements

### 3.1 Mandatory Technologies
| Layer | Technology |
|-------|------------|
| **Backend** | Node.js with Express.js |
| **Database** | PostgreSQL |
| **Frontend** | HTML5, CSS3, JavaScript, jQuery |
| **UI Framework** | AdminLTE (Bootstrap 5 version) - must resemble https://adminlte.io/themes/AdminLTE/index2.html - reference git repo:https://github.com/ColorlibHQ/AdminLTE|
| **Templating** | EJS or Handlebars |

### 3.2 Integration Requirements
| Integration | Direction | Data Frequency |
|-------------|-----------|----------------|
| **ServiceNow** | External job → Our DB | Daily (external job) |
| **endoflife.date API** | Our App → API | Nightly |
| **Azure DevOps** | Our App → API | Hourly or on-demand |

---

## 4. Key Concepts (aligned to workbook)

- **Application**: Logical service/product line (one row per app in portfolio views). Fields such as **IBS**, **RISK ID**, **Type** (In‑house/SaaS/Third‑Party) originate from the workbook and become first‑class attributes.
- **Component**: Technical element attached to an application (OS, DB, Middleware, App Dependency, Device/Network/Storage), each with **current version** (from ServiceNow) and lifecycle attributes (via endoflife.date API). The workbook's per‑application "blocks" with sub‑rows map to multiple Components under a single Application.
- **Lifecycle facts**: Latest version, support status, and end‑of‑support (EoS) dates—fetched from endoflife.date API and stored in the app. Mirrors the "Latest Version / Support Status / Out of support date" columns in the sheet.
- **RAG posture**: Computed across infra and app‑dependency layers per deterministic rules; supports **time‑shifted evaluation** (forecast).

---

## 5. Data Management

### 5.1 Data Sources

**ServiceNow (via External Job)**
- An external process will populate our database with:
  - Application records (name, business function, owner, criticality, type, IBS flag, Risk ID)
  - Component records (type, vendor, product, current version, hosting model)
- Our application never calls ServiceNow directly
- Source system references (ServiceNow sys_id) stored for traceability

**endoflife.date API**
- Primary source for lifecycle information (https://endoflife.date/docs/api/v1/)
- Provides for each product/version:
  - Latest version available
  - End-of-support dates
  - Support status
- Store source URL, vendor, fetched_at, and confidence score

**Azure DevOps**
- Source for risk information
- Using **Risk ID** from Application record, fetch:
  - Risk title, state, severity/impact
  - Owner, due date
  - Store as Risk Snapshots aligned with posture evaluation dates

### 5.2 Core Data Entities

| Entity | Description | Source | Workbook Mapping |
|--------|-------------|--------|------------------|
| **Application** | Logical service/product line | ServiceNow (external) | One row per app |
| **Component** | Technical element (OS, DB, etc.) | ServiceNow (external) | Sub-rows under each app |
| **Lifecycle Fact** | EoL dates, latest versions | endoflife.date API | "Latest Version / Support Status / Out of support date" columns |
| **Posture Snapshot** | Historical RAG calculations | System-generated | For time-series analysis |
| **Risk Snapshot** | AzDO risk data | Azure DevOps API | Linked via Risk ID |
| **Alert** | EoS notifications | System-generated | For proactive notifications |

---

## 6. RAG Rules & Forecasting

### 6.1 Core RAG Calculation

The system must calculate RAG status based on end-of-support dates:

| Condition | Component Status | Layer RAG | Overall RAG |
|-----------|-----------------|-----------|-------------|
| EoS date < evaluation date | Out of Support | **Red** if *any* component is Out of Support | **Red** if Infra RAG or App‑Dependency RAG is Red |
| 0 < (EoS date - evaluation date) ≤ 180 days | Near EoS | **Amber** if none Red but *any* component is Near EoS | **Amber** if none Red and **any** layer is Amber |
| EoS date > 180 days (or vendor status explicitly in-support) | In Support | **Green** otherwise | **Green** otherwise |
| No EoS data available | Unknown | **Grey** if all Unknown | **Grey** if unknown dominates |

**Layer Definitions:**
- **Infra RAG**: Derived from components of type OS, DB, Middleware, Device, Network, Storage
- **App‑Dependency RAG**: Derived from components of type AppDependency
- **Earliest EoS**: Minimum `end_of_support_date` across all components (for runway/alerts)

### 6.2 Forecasting
- All posture calculations are performed **as of a chosen date** (default: today)
- Users can change this to future dates (e.g., **today + 6, 12, 24 months**) to run a **forecast**
- Forecast uses same RAG rules but with evaluation date shifted forward
- Forecast results are persisted as Posture Snapshots for historical comparison

---

## 7. Functional Requirements (User Stories)

### 7.1 Application Posture (Owner)
As an App Owner, I can view my application portfolio row with:
- Overall/Infra/App‑Dep RAG, earliest EoS, and risk status
- Filter by IBS and forecast the posture at +6/+12/+24 months
- See counts of out-of-support and near-EoS components

### 7.2 Component Drill‑down (Owner/Platform)
As a Platform Owner, I can drill into an app to see:
- Each component's current version (from ServiceNow)
- Matched EoL facts (latest version, EoS date, support status)
- Exact reason a component is Red/Amber
- Source links to endoflife.date for verification

### 7.3 IBS Dashboard (Risk/Leadership)
As a Risk Analyst, I can:
- Toggle an **IBS‑only view** that overlays AzDO risk severity/state
- See which Important Business Services are at risk within the next 6 months
- View KPIs: #IBS in Red/Amber, Top IBS risks (by severity, time‑to‑EoS)

### 7.4 Alerts & Runway (Owner/PMO)
As a PMO lead, I receive alerts at:
- 180/90/60/30‑day windows before EoS
- IBS items elevated in priority
- Deep links to AzDO risk and component details

### 7.5 Forecast Reporting (Leadership)
As an Executive, I can:
- Set the evaluation date two years ahead
- Export the forecasted portfolio posture
- Use data for budgeting and change calendar planning

---

## 8. User Interface Requirements

### 8.1 Portfolio Grid (Default View)

**Columns must include:**
- Application, Owner, Type (In‑house/SaaS/Third‑Party)
- IBS badge, Overall RAG, Infra RAG, App‑Dep RAG
- Earliest EoS, #OutOfSupport, #≤180d
- Risk ID (chip with state/severity linking to AzDO)

**Filters:**
- Function, owner, platform, Type, IBS, RAG
- Evaluation Date selector (for forecasting)

**Visual Requirements:**
- RAG status with appropriate colors (Red/Danger, Amber/Warning, Green/Success, Grey/Secondary)
- IBS indicator as star or special badge
- Responsive design that works on desktop and tablet

### 8.2 IBS Dashboard

**Must include:**
- KPI cards showing: #IBS in Red, #IBS in Amber, #IBS with risks
- Top IBS risks table with severity and due date
- IBS Red distribution by business function/owner
- Forecast toggle (+6/+12/+24 months)

### 8.3 Application Detail View

**Tabbed interface with:**

| Tab | Content |
|-----|---------|
| **Components** | List all components with current vs latest version, EoS date, days remaining, RAG status, source links |
| **Risks** | AzDO risk details (title, state, severity, owner, due date) with deep link |
| **Runway** | Visual timeline showing when components reach EoS |
| **Activity** | History of alerts and overrides |
| **Evidence** | Links to endoflife.date pages for verification |

### 8.4 Exports
- CSV/XLSX with consistent ISO‑8601 dates
- Export current view or forecast results

### 8.5 UI/UX Requirements
- Must use AdminLTE design system consistently (reference: https://adminlte.io/themes/AdminLTE/index2.html)
- Consistent color coding for RAG status
- Loading indicators for async operations
- Confirmation dialogs for destructive actions (e.g., overrides)

---

## 9. Integration Requirements

### 9.1 ServiceNow (External Data Push)

**Requirements:**
- External job will populate applications and components tables
- Our database is the system of record for the application
- Store source_system_ref (ServiceNow sys_id) for traceability
- If conflicts exist between workbook bootstrap and ServiceNow, ServiceNow wins after cutover

### 9.2 endoflife.date API Integration

**Requirements:**
- Nightly jobs call API by (vendor, product, current_version)
- Update LifecycleFact table with results
- Re‑link components using version matching logic
- Store source_url, fetched_at, and confidence score
- Support manual override where vendors use non‑standard naming

**API Details:**
- Base URL: https://endoflife.date/api
- Key endpoints: `GET /{product}.json`, `GET /{product}/{cycle}.json`
- Must handle rate limiting gracefully

### 9.3 Azure DevOps Integration

**Requirements:**
- Using Risk ID from Application record, fetch risk work item fields
- Store as RiskSnapshot time‑aligned with posture snapshots
- Fields to store: title, state, severity/impact, owner, due date
- Provide deep link to AzDO work item

### 9.4 Workbook Bootstrap (One-time)

**Requirements:**
- One‑time import from current Excel to seed Applications and Components
- Flatten merged cells by grouping on application headers
- Forward‑fill app name across child rows
- Create one Application and N Component records
- Preserve all fields: Type, IBS, Risk ID, etc.

---

## 10. Non‑Functional Requirements

### 10.1 Security & Access
- Entra ID SSO integration required
- Role-based access control:
  - **Owner**: View own applications
  - **Platform**: View all components, manage overrides
  - **Risk**: Access IBS dashboard
  - **PMO**: View alerts and forecasts
  - **Admin**: System configuration
- Audit logs for all data modifications
- No storage of ServiceNow credentials

### 10.2 Performance
- Portfolio grid loads in <3 seconds for 5,000+ applications
- API response times <500ms for common operations
- Background jobs must not impact UI performance
- Posture recalculation for entire portfolio within minutes

### 10.3 Data Quality
- Standardized vendor/product vocabularies
- ISO‑8601 dates throughout
- Confidence scoring for automated lifecycle matches
- Data freshness indicators on all pages

### 10.4 Reliability
- Nightly EoL refresh with retry/backoff logic
- Failed API calls must not break the application
- Graceful degradation when external APIs unavailable
- Database connection pooling

### 10.5 Scalability
- Support for thousands of applications and components
- Support for multiple concurrent users
- Ability to run forecast calculations for entire portfolio

---

## 11. Acceptance Criteria

### 11.1 RAG Rule Conformance

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| R1 | If any component is Out of Support on evaluation_date ⇒ Overall RAG = Red | Test with sample data |
| R2 | Else if any component's EoS is ≤ 180 days from evaluation_date ⇒ Overall RAG = Amber | Test with sample data |
| R3 | Else ⇒ Overall RAG = Green | Test with sample data |
| R4 | If all components Unknown ⇒ Overall RAG = Grey | Test with sample data |

### 11.2 Forecasting

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| F1 | When evaluation_date = today + 24 months, posture uses EoS schedules to compute future state | Test with known future dates |
| F2 | Results persist as PostureSnapshot | Verify in database |

### 11.3 IBS Filter

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| I1 | Toggling IBS only shows Application.is_ibs = true rows | Verify count matches database |
| I2 | Alerts for IBS apps show elevated priority | Test with IBS vs non-IBS |

### 11.4 Risk Linkage

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| L1 | Given a valid risk_id, system fetches and displays AzDO risk fields | Test with real AzDO work items |
| L2 | Deep link to work item is provided | Verify URL construction |

### 11.5 Workbook Normalization

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| W1 | Importer correctly converts merged blocks into 1 Application + N Components | Test with sample workbook |
| W2 | No reliance on Excel merges persists after import | Verify database structure |

---

## 12. Constraints & Assumptions

### 12.1 Constraints
- ServiceNow integration is **read-only** via external job only
- Application does not write back to ServiceNow
- Must use endoflife.date as primary EoL data source
- Must use AdminLTE for UI (not custom CSS framework)
- Must use Node.js/Express/PostgreSQL stack

### 12.2 Assumptions
- External job will provide clean, validated data from ServiceNow
- endoflife.date API will remain available and free
- Azure DevOps API access will be available with appropriate PAT
- Users have modern browsers (Chrome, Firefox, Edge, Safari)
- Initial workbook data is reasonably clean

---

## 13. Out of Scope

- Direct ServiceNow API integration (handled by external job)
- Writing data back to ServiceNow
- Automated remediation of technical debt
- Integration with other EoL data sources beyond endoflife.date
- Mobile app (responsive web only)
- Real-time sync with any external system
- Machine learning for predictions (deterministic rules only)

---

## 14. Glossary

| Term | Definition |
|------|------------|
| **RAG** | Red/Amber/Green status indicator |
| **IBS** | Important Business Service - special flag for critical applications |
| **EoL/EoS** | End of Life / End of Support |
| **Component** | Technical element (OS, database, middleware, app dependency, device, network, storage) |
| **Posture** | Support status of a component or application |
| **Forecast** | View of posture at a future date |
| **Snapshot** | Stored record of posture at a specific point in time |
| **Risk ID** | Azure DevOps work item identifier for associated risks |
| **Type** | Application classification: In-house, SaaS, or Third-Party |