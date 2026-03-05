# Compliance Mapping

This document maps requirements to compliance obligations for Tech Debt Posture & Lifecycle Manager, per AG-REQ-01.

---

## ISO/IEC 12207 (Software Lifecycle Processes)
- All requirements, ADRs, and RTM are version-controlled and traceable.
- Structured requirements, design, implementation, testing, and maintenance processes are followed.

## ISO/IEC 27001 (Information Security Management)
- Security controls for data confidentiality, integrity, and availability are implemented.
- Access is restricted via Entra ID SSO and RBAC.
- Regular risk assessments and access reviews are performed.

## ISO/IEC 27701 (Privacy Information Management)
- Personal data is handled in accordance with privacy impact assessments.
- Data subject rights (access, rectification, erasure) are supported.

## GDPR (General Data Protection Regulation)
- Data minimization and purpose limitation principles are enforced.
- Data exports and reports are logged; data subject requests are fulfilled within statutory timelines.

## NIST SP 800-218 (Secure Software Development Framework)
- Secure development practices are followed, including code review, dependency management, and vulnerability scanning.
- All third-party components are inventoried and monitored for EoL/EoS status.

## ISO/IEC 42001 (AI Management, if applicable)
- If AI/ML is used, explainability and auditability controls are implemented.
- AI models are validated and monitored for drift and bias.

## OWASP ASVS Level 2 (Application Security)
- Authentication, authorization, input validation, and secure session management are enforced.
- Regular penetration testing and static code analysis are performed.

## Audit and Evidence
- All compliance artefacts (logs, reports, risk registers) are retained and available for audit.
- Compliance mapping is updated annually or upon regulatory change.
