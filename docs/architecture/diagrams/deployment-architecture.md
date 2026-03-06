# Deployment Architecture

## Deployment Diagram (Mermaid)
```mermaid
graph TD
	Web[Web Server (Node.js/Express.js)]
	DB[Database Server (PostgreSQL)]
	SN[ServiceNow]
	EoL[endoflife.date API]
	AzDO[Azure DevOps]
	SSO[Entra ID SSO]
	Web --> DB
	Web --> SN
	Web --> EoL
	Web --> AzDO
	Web --> SSO
```
