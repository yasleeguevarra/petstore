# Research Findings: PetStore E-commerce Website

**Date**: 2026-05-06
**Plan**: [specs/001-petstore-ecommerce/plan.md](specs/001-petstore-ecommerce/plan.md)

## Testing Framework Research

**Decision**: Use JUnit 5 + Mockito for Spring Boot backend unit/integration tests, Jest + React Testing Library for React frontend component tests, Playwright for end-to-end browser tests.

**Rationale**: JUnit 5 is the standard for Spring Boot testing with excellent Spring integration. Mockito provides clean mocking for dependencies. Jest is built into Vite and React ecosystem. React Testing Library encourages testing user interactions over implementation details. Playwright provides reliable cross-browser E2E testing suitable for Render deployment validation.

**Alternatives Considered**:
- TestNG instead of JUnit: Rejected due to weaker Spring Boot integration and smaller community
- Cypress instead of Playwright: Rejected due to slower execution and less reliable in headless environments
- Enzyme instead of React Testing Library: Rejected due to focus on implementation details rather than user behavior

## Scale/Scope Research

**Decision**: Target 50-100 concurrent users, 1000+ pets in catalog, with response times under 500ms for API calls and 2-3 seconds for initial page loads.

**Rationale**: Render free-tier provides adequate resources for small-scale e-commerce with PostgreSQL. Performance goals from spec (3s gallery load, 1s search) are achievable. Scale supports MVP validation without over-engineering for non-existent traffic.

**Alternatives Considered**:
- Microservices architecture: Rejected due to complexity overhead for small scale
- CDN for static assets: Rejected as overkill for initial deployment, can be added later if needed
- Database connection pooling beyond defaults: Rejected until performance monitoring shows need

## Spring Boot + React Integration Patterns

**Decision**: Use separate backend and frontend deployments with CORS configuration, API-first design with OpenAPI documentation.

**Rationale**: Clean separation allows independent scaling and deployment. CORS enables secure cross-origin requests from frontend to backend. API-first ensures backend can be developed and tested independently.

**Alternatives Considered**:
- Monolithic Spring Boot with Thymeleaf: Rejected due to poor frontend developer experience and coupling
- Next.js fullstack: Rejected due to moving away from specified React + Spring Boot stack
- GraphQL instead of REST: Rejected due to added complexity for simple CRUD operations

## Docker Configuration for Render

**Decision**: Multi-stage Docker builds for both backend and frontend, with docker-compose for local development.

**Rationale**: Multi-stage builds minimize image size for Render deployment. Docker-compose simplifies local development with PostgreSQL. Aligns with Render's container deployment requirements.

**Alternatives Considered**:
- Single Dockerfile for both services: Rejected due to larger images and deployment complexity
- Heroku buildpacks: Rejected due to Render-specific requirements
- Kubernetes: Rejected due to overkill for free-tier scale