# Authentication Pipeline

This document describes the authentication protocol and token pipeline for Tech Debt Posture & Lifecycle Manager (AG-IMP-B1-04 Phase 2).

- Web/API: authHandler for OIDC/OAuth2/SAML/mTLS protocol handling (src/web/auth/authHandler.js)
- Infrastructure: TokenValidator for token validation/issuance (src/infrastructure/security/TokenValidator.js)
- Infrastructure: extractClaims utility for claims extraction (src/infrastructure/security/extractClaims.js)
- Infrastructure: handleClockSkew for clock-skew handling (src/infrastructure/security/handleClockSkew.js)
- Web/API: signInOut for sign-in/out stubs (src/web/auth/signInOut.js)
- Web/API: clientCredentialsHandler for M2M stubs (src/web/auth/clientCredentialsHandler.js)

All artefacts are stubs/placeholders and conform to Clean Architecture and module contracts.

---
*End of Authentication Pipeline*