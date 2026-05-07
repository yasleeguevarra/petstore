# Implementation Plan: Cart, Wishlist, and Checkout Functionality

**Branch**: `001-petstore-ecommerce` | **Date**: May 7, 2026 | **Spec**: [specs/002-cart-wishlist-checkout/spec.md](specs/002-cart-wishlist-checkout/spec.md)
**Input**: Feature specification from `/specs/002-cart-wishlist-checkout/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

This feature adds cart, wishlist, and checkout functionality to the existing pet store e-commerce website. Users can add pets to a shopping cart, save pets to a wishlist, and complete checkout with order summary. The implementation extends the existing Spring Boot backend with new entities and APIs, and the React frontend with new components and pages, maintaining fullstack alignment and using the established tech stack.

## Technical Context

**Language/Version**: Java 17 (Spring Boot), JavaScript (ES2020+ for React)  
**Primary Dependencies**: Spring Boot 3.x, Spring Data JPA, React 18, Tailwind CSS, Material-UI, PostgreSQL JDBC Driver  
**Storage**: PostgreSQL database  
**Testing**: JUnit 5 with Mockito for backend unit tests; Jest with React Testing Library for frontend unit tests  
**Target Platform**: Modern web browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Project Type**: Full-stack web application (e-commerce)  
**Performance Goals**: Add to cart operation <5 seconds, checkout process <10 seconds, cart/wishlist persistence across sessions  
**Constraints**: Render free-tier deployment (512MB RAM, 750 hours/month), containerized with Docker, API paths must include `/guevarra/`, Java packages must include `guevarra`  
**Scale/Scope**: Small pet store application, expected <1000 concurrent users, <10,000 pets in inventory

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Product-first commerce**: ✅ PASSES - Feature directly supports pet commerce by enabling cart, wishlist, and checkout functionality for purchasing pets.

**Fullstack alignment**: ✅ PASSES - Implementation will synchronize backend API endpoints, frontend components, and database schema as one cohesive application.

**Maintainable platform**: ✅ PASSES - Uses required stack: Java Spring Boot backend, React frontend with Tailwind CSS and MUI, PostgreSQL database.

**Operational readiness**: ✅ PASSES - Solution will be containerized with Docker and designed for Render free-tier deployment.

**Data, security, and naming discipline**: ✅ PASSES - All backend API paths will include `/guevarra/`, Java packages will include `guevarra`, data will reside in PostgreSQL with proper validation and security practices.

**Technical Constraints**: ✅ PASSES - Architecture satisfies all constraints: Spring Boot, PostgreSQL, React with Tailwind/MUI, Docker containerization, Render deployment target, guevarra naming conventions.

**Development Workflow**: ✅ PASSES - Feature work will follow PR-based delivery with tests, constitution validation, and container-friendly configuration.

No violations identified. Feature aligns with all constitutional principles and constraints.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

## Project Structure

### Documentation (this feature)

```text
specs/002-cart-wishlist-checkout/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/main/java/com/guevarra/petstore/
│   ├── entity/
│   │   ├── Pet.java
│   │   ├── Cart.java          # NEW: User's shopping cart
│   │   ├── CartItem.java      # NEW: Individual cart item
│   │   ├── Wishlist.java      # NEW: User's wishlist
│   │   ├── WishlistItem.java  # NEW: Individual wishlist item
│   │   ├── Order.java         # NEW: Completed order
│   │   └── User.java          # NEW: User entity for authentication
│   ├── repository/
│   │   ├── PetRepository.java
│   │   ├── CartRepository.java         # NEW
│   │   ├── CartItemRepository.java     # NEW
│   │   ├── WishlistRepository.java     # NEW
│   │   ├── WishlistItemRepository.java # NEW
│   │   ├── OrderRepository.java        # NEW
│   │   └── UserRepository.java         # NEW
│   ├── service/
│   │   ├── PetService.java
│   │   ├── CartService.java            # NEW
│   │   ├── WishlistService.java        # NEW
│   │   └── OrderService.java           # NEW
│   ├── controller/
│   │   ├── PetController.java
│   │   ├── CartController.java         # NEW
│   │   ├── WishlistController.java     # NEW
│   │   └── OrderController.java        # NEW
│   └── config/
│       ├── CorsConfig.java
│       ├── SecurityConfig.java         # NEW: For authentication
│       └── WebConfig.java
├── src/test/java/com/guevarra/petstore/
│   ├── controller/
│   ├── service/
│   └── repository/
└── src/main/resources/
    ├── application.properties
    └── data.sql

frontend/
├── src/
│   ├── components/
│   │   ├── PetCard.jsx
│   │   ├── PetGallery.jsx
│   │   ├── SearchFilter.jsx
│   │   ├── CartIcon.jsx        # NEW
│   │   ├── CartItem.jsx        # NEW
│   │   ├── WishlistIcon.jsx    # NEW
│   │   ├── WishlistItem.jsx    # NEW
│   │   ├── OrderSummary.jsx    # NEW
│   │   └── CheckoutForm.jsx    # NEW
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── PetDetailPage.jsx
│   │   ├── CartPage.jsx        # NEW
│   │   ├── WishlistPage.jsx    # NEW
│   │   └── CheckoutPage.jsx    # NEW
│   ├── services/
│   │   ├── petApi.js
│   │   ├── cartApi.js          # NEW
│   │   ├── wishlistApi.js      # NEW
│   │   └── orderApi.js         # NEW
│   ├── hooks/
│   │   ├── useAuth.js          # NEW
│   │   ├── useCart.js          # NEW
│   │   └── useWishlist.js      # NEW
│   ├── utils/
│   └── App.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

**Structure Decision**: Extends the existing full-stack web application structure. Backend additions include new entities, repositories, services, and controllers following Spring Boot conventions. Frontend additions include new components, pages, API services, and custom hooks following React best practices. All new code integrates with existing structure without disrupting current functionality.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
