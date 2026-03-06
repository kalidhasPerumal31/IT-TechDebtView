# High-Level ERD

## High-Level ERD (Mermaid)
```mermaid
erDiagram
	Application ||--o{ Component : has
	Application ||--o| IBS : part_of
	Application ||--o| Risk : linked_to
	User ||--o{ Application : access
	User { RBAC }
```
