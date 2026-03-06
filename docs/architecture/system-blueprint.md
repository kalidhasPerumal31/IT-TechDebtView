# System Blueprint

This document provides the technology-aware system blueprint for Tech Debt Posture & Lifecycle Manager, strictly per upstream requirements and Clean Architecture rules.

---

## Overview
- Layered architecture: Web (UI), Application, Domain, Infrastructure
- Backend: Node.js with Express.js
- Database: PostgreSQL
- Frontend: HTML5, CSS3, JavaScript, jQuery
- UI Framework: AdminLTE (Bootstrap 5)
- Templating: EJS or Handlebars
- Integrations: ServiceNow, endoflife.date API, Azure DevOps

## Key Flows
- Data ingest from ServiceNow to database
- Lifecycle enrichment via endoflife.date API
- Risk linkage via Azure DevOps
- User authentication via Entra ID SSO
- RBAC enforced at application layer

## Clean Architecture Enforcement
- Web → Application → Domain ← Infrastructure
- No direct dependencies from Web to Infrastructure
- All compliance, security, and anti-drift rules enforced
