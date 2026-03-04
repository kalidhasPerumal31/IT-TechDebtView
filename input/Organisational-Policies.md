# Organisational Policies for Tech Debt Posture & Lifecycle Manager

## 1. Information Security Policy
- All application and infrastructure data must be handled in accordance with ISO/IEC 27001 controls.
- Access to the Tech Debt Posture & Lifecycle Manager is restricted to authorized personnel via Entra ID SSO.
- Data in transit and at rest must be encrypted using industry-standard protocols.

## 2. Data Retention and Disposal
- Lifecycle and support data will be retained for a minimum of 7 years to meet audit and regulatory requirements.
- Data disposal must follow secure erasure procedures and be logged for audit purposes.

## 3. Change Management
- All changes to the application, posture rules, or integrations must be tracked in Azure DevOps and approved by the Change Advisory Board (CAB).
- Emergency changes must be documented and reviewed post-implementation.

## 4. Access Control
- Role-based access control (RBAC) is enforced: Owner, Platform, Risk, PMO, Admin.
- Access reviews are conducted quarterly; any access anomalies are remediated within 5 business days.

## 5. Incident Response
- Security incidents must be reported within 1 hour to the Information Security team.
- Incident logs are maintained and reviewed monthly.

## 6. Vendor and Third-Party Management
- All SaaS and third-party components must be assessed for security and compliance before integration.
- Vendor EoL data sources must be reviewed annually for accuracy and reliability.

## 7. Acceptable Use
- The system is to be used solely for lifecycle management, risk posture analysis, and compliance reporting.
- Any misuse or unauthorized data extraction is strictly prohibited and subject to disciplinary action.

## 8. Audit and Monitoring
- All user and system activities are logged and retained for at least 12 months.
- Regular audits are conducted to ensure compliance with internal and external requirements.

---
These policies are binding for all users and administrators of the Tech Debt Posture & Lifecycle Manager.