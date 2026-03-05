# Implementation Constraints

Implementation-related requirements classified by binding level.

---

## Implementation-Binding
- Backend: Node.js with Express.js
- Database: PostgreSQL
- Frontend: HTML5, CSS3, JavaScript, jQuery
- UI Framework: AdminLTE (Bootstrap 5)
- Templating: EJS or Handlebars
- Data encrypted in transit and at rest
- Access via Entra ID SSO, RBAC enforced
- Data retained 7 years, secure erasure

## Implementation-Optional
- Automated agent-based discovery (future)
- Financial modeling beyond roadmap/effort summaries (future)
- AI/ML for posture analysis (if applicable)

## Decision-Required
- Policy for “Limited/Extended Support” (Green or Amber)
- IBS source of truth (ServiceNow or app)
- Type granularity (application vs. component)
- EoL provider prioritization
- Alert thresholds and escalation policy
