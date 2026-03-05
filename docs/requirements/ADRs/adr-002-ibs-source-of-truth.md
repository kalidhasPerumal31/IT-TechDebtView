# ADR-002: IBS Source of Truth

## Status
Decision-Required

## Context
Unclear whether IBS is mastered in ServiceNow or in this application. Impacts data governance, sync, and reporting.

## Decision
<!-- Set IBS source of truth as ServiceNow for initial implementation, with periodic sync to the application. This leverages existing CMDB governance. -->
IBS information should be present in our data in our database, telling if an application is part of an IBS. This data will be poulated into our database thorugh an external job that pulls data from servicenow and pushes to our database. 

## Consequences
- ServiceNow: Aligns with existing CMDB, but may lag updates.
- Application: More agile, but risks data drift and sync issues.
