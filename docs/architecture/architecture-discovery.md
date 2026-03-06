# Architecture Discovery

This document summarizes the conceptual architecture discovery for Tech Debt Posture & Lifecycle Manager, based strictly on upstream requirements.

---

## Purpose
Establish the conceptual architecture scope, system context, and key drivers as defined by AG-REQ-01 artefacts.

## Key Drivers
- Single source of truth for lifecycle posture
- Deterministic posture computation and forecasting
- IBS and Risk Board integration
- Security, audit, and compliance as first-class concerns

## Conceptual Architecture
- Standalone web application with layered architecture
- System of record database
- Integration with ServiceNow (data ingest), endoflife.date API (enrichment), Azure DevOps (risk linkage)
- Professional dashboard UI

## Constraints
- All binding requirements, compliance anchors, and anti-drift contract must be enforced
