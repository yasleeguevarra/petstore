<!--
Sync Impact Report
- Version change: uninitialized -> 1.0.0
- Modified principles: added product-first commerce, fullstack alignment, maintainable platform, operational readiness, data and security
- Added sections: Technical Constraints, Development Workflow
- Removed sections: none
- Templates requiring updates: ✅ .specify/templates/plan-template.md, ✅ .specify/templates/spec-template.md, ✅ .specify/templates/tasks-template.md, ✅ .specify/templates/checklist-template.md
- Follow-up TODOs: none
-->

# PetStore Constitution

## Core Principles

### I. Product-first commerce
Every architectural and user-experience decision MUST support a secure, discoverable pet commerce experience for dogs, cats, birds, and fish. Product definitions, ordering flows, pricing, and inventory visibility are non-negotiable; every feature must clearly advance the petstore marketplace goal.

### II. Fullstack alignment
Backend, frontend, data model, and deployment MUST be designed as one cohesive application, not separate proof-of-concepts. UI behavior, API contracts, and deployment artifacts MUST stay synchronized through the project lifecycle.

### III. Maintainable platform
The solution MUST use Java Spring Boot for server logic, React for the frontend, Tailwind and MUI for styling, and Postgres for persistent state. Code MUST be organized for readability, modularity, and long-term maintenance.

### IV. Operational readiness
The project MUST be containerized with Docker and built for Render free-tier deployment. Infrastructure decisions MUST prioritize reproducible, cost-conscious deployment and clearly defined configuration for development, staging, and production.

### V. Data, security, and naming discipline
Petstore data MUST reside in Postgres and sensitive behavior MUST be protected by validation, error handling, and least-privilege practices. All backend API paths MUST use the surname segment `guevarra`, and Java packages MUST include `guevarra` to keep the implementation consistent and traceable.

## Technical Constraints
The application architecture MUST satisfy these constraints:
- Backend language: Java Spring Boot
- Database: PostgreSQL
- Frontend: React with Tailwind CSS and MUI
- Containerization: Docker for both backend and frontend
- Deployment target: Render free-tier services only
- API path convention: include `/guevarra/` in route prefixes
- Java package convention: include `guevarra` in package names, e.g. `com.guevarra.petstore`
- No proprietary hosting assumptions: design for the limitations of free-tier Render services

## Development Workflow
All production work MUST follow these workflow rules:
- Changes MUST be delivered through pull requests with review and approval
- Unit and integration tests MUST accompany backend and frontend changes
- Feature work MUST be validated against the constitution at key checkpoints
- Environment configuration MUST be explicit and container-friendly
- Documentation of deployment and configuration MUST be kept with source code

## Governance
This constitution supersedes informal practices for the PetStore project.
Amendments require documented rationale, approval by the project team, and an update to this file.
Compliance reviews MUST occur before major milestones and before any Render deployment.
Decisions that affect architecture, deployment, or stack constraints MUST be captured in project documentation.

**Version**: 1.0.0 | **Ratified**: 2026-05-06 | **Last Amended**: 2026-05-06
