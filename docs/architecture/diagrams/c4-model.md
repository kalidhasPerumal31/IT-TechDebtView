# C4 Model Diagram

## C4 Context Diagram (Mermaid)
```mermaid
graph TD
	User[User Roles]
	System[Tech Debt Posture & Lifecycle Manager]
	ServiceNow[ServiceNow]
	EoL[endoflife.date API]
	AzDO[Azure DevOps]
	User --> System
	System --> ServiceNow
	System --> EoL
	System --> AzDO
```

## C4 Container Diagram (Mermaid)
```mermaid
graph TD
	WebUI[Web UI (AdminLTE, jQuery)]
	AppLayer[Application Layer (Node.js/Express.js)]
	Domain[Domain Layer]
	Infra[Infrastructure Layer (PostgreSQL, Integrations)]
	WebUI --> AppLayer
	AppLayer --> Domain
	Infra --> Domain
```

## C4 Component Diagram (Mermaid)
```mermaid
graph TD
	UI[UI Module]
	UseCases[Use Case Module]
	RBAC[RBAC Module]
	Posture[Posture Computation]
	Risk[Risk Rules]
	DB[Database]
	Integrations[Integrations]
	UI --> UseCases
	UseCases --> RBAC
	UseCases --> Posture
	UseCases --> Risk
	Posture --> DB
	Risk --> Integrations
```
