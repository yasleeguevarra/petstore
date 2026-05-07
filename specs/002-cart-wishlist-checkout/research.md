# Research Findings: Cart, Wishlist, and Checkout Functionality

**Date**: May 7, 2026  
**Feature**: specs/002-cart-wishlist-checkout/spec.md  
**Researcher**: Speckit Plan Agent

This document captures research findings for unknowns identified in the Technical Context and architectural decisions required for the cart, wishlist, and checkout feature implementation.

## Decision: Implement JWT-based authentication for user sessions

**Rationale**: The feature specification requires authenticated users for cart and wishlist functionality, but the existing pet store application (001) does not include authentication. JWT provides stateless, secure user sessions suitable for web applications and aligns with Spring Boot security best practices. This enables persistent cart/wishlist across sessions while maintaining security.

**Alternatives considered**:
- Session-based authentication: Rejected due to complexity in distributed/containerized environments and poorer REST API fit.
- OAuth2 with external provider: Rejected due to added complexity and dependency on external services not suitable for free-tier deployment.
- No authentication: Rejected as it violates the specification requirement for authenticated access to cart/wishlist.

## Decision: Use database-persisted cart and wishlist for authenticated users only

**Rationale**: Specification assumes authenticated users, and database persistence ensures cart/wishlist survive across devices and sessions. This provides better user experience than localStorage-only solutions and enables features like cart recovery and analytics.

**Alternatives considered**:
- LocalStorage for all users: Rejected as it doesn't meet persistence requirements and fails for non-logged-in users per edge case.
- Session-based storage: Rejected due to poor scalability and inability to persist across browser sessions.
- Hybrid approach (localStorage + DB sync): Rejected due to added complexity without clear benefit over DB-only for authenticated users.

## Decision: Implement cart with quantity support and wishlist with unique items

**Rationale**: Standard e-commerce pattern where cart allows multiple quantities of same item (for bulk purchases) while wishlist maintains unique items to avoid duplicates. This matches user expectations from major e-commerce platforms.

**Alternatives considered**:
- Cart and wishlist both unique items: Rejected as it prevents legitimate bulk cart additions.
- Wishlist with quantities: Rejected as wishlists are typically for "save for later" without quantity commitment.

## Decision: Checkout creates order record without payment processing

**Rationale**: Specification focuses on order summary and confirmation, not payment integration. This keeps scope manageable and allows future payment integration. Order records capture purchase intent and enable order history features.

**Alternatives considered**:
- Integrate payment gateway (Stripe/PayPal): Rejected due to added complexity, external dependencies, and specification focus on order summary rather than payment.
- No order creation: Rejected as it violates FR-009 (create and store order records).

## Decision: Extend existing Spring Boot backend with new entities and REST APIs

**Rationale**: Maintains fullstack alignment by building on existing PetController patterns. Uses Spring Data JPA for data access, follows existing package structure, and ensures API consistency with guevarra path convention.

**Alternatives considered**:
- Microservices architecture: Rejected due to overkill for feature scope and violation of maintainable platform principle.
- GraphQL API: Rejected due to added complexity and existing REST API investment.

## Decision: React frontend with Context API for cart/wishlist state management

**Rationale**: Context API provides simple, React-native state management for cart/wishlist without external libraries. Integrates well with existing React components and hooks pattern.

**Alternatives considered**:
- Redux: Rejected due to added complexity and library dependency for simple state needs.
- Local component state: Rejected as it prevents sharing cart/wishlist across components.

## Decision: Performance goals alignment with existing application

**Rationale**: Add to cart <5s aligns with spec SC-001. Checkout <10s provides reasonable user experience. Cart/wishlist persistence leverages existing DB performance expectations.

**Alternatives considered**:
- Stricter goals (<2s): Rejected as unrealistic for database operations in free-tier constraints.
- No specific goals: Rejected as spec defines measurable outcomes.

## Decision: Scale assumptions based on small pet store context

**Rationale**: <1000 concurrent users and <10k pets aligns with free-tier Render limits and typical small business scale. Allows for efficient database design without premature optimization.

**Alternatives considered**:
- Enterprise scale (10k+ users): Rejected due to mismatch with free-tier deployment target.
- Micro scale (<100 users): Rejected as too conservative for e-commerce application.

## Decision: Testing strategy with unit and integration tests

**Rationale**: JUnit/Mockito for backend ensures service reliability. Jest/React Testing Library for frontend ensures UI component correctness. Follows existing testing patterns in the codebase.

**Alternatives considered**:
- End-to-end testing only: Rejected due to slower feedback and higher maintenance cost.
- No frontend testing: Rejected due to UI complexity requiring validation.

## Integration Points Identified

- **Existing Pet Entity**: Cart/Wishlist reference existing Pet entities
- **Existing API Structure**: New controllers follow PetController patterns with /api/guevarra/ paths
- **Existing Frontend**: New components integrate with existing PetCard and routing
- **Existing Database**: New tables added to existing PostgreSQL schema
- **Existing Docker Setup**: No changes needed, containers will include new code

## Security Considerations

- User authentication required for cart/wishlist access
- Input validation on all API endpoints
- SQL injection prevention via JPA
- CORS configuration maintained
- No sensitive data exposure in APIs

## Deployment Considerations

- No changes to Docker configuration needed
- Database migrations handled via Spring Boot
- Render free-tier resource limits considered in performance design
- Stateless design supports container scaling</content>
<parameter name="filePath">C:\petstore\PetStore\specs\002-cart-wishlist-checkout\research.md